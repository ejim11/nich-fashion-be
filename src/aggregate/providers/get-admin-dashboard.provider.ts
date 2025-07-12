import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Role } from 'src/auth/enums/role-type.enum';
import { Order } from 'src/orders/order.entity';
import { paymentStatus } from 'src/payments/enums/paymentStatus.enum';
import { Payment } from 'src/payments/payment.entity';
import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class GetAdminDashboardProvider {
  constructor(
    /**
     * Injecting datasource
     */
    private readonly dataSource: DataSource,
  ) {}

  async getAdminDashboard() {
    // start transaction
    // create Query Runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      // connect query runner to datasource
      await queryRunner.connect();

      // start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('Could not connect to datasource');
    }

    // Define date ranges for today and yesterday
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Midnight today
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // End of today
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(todayStart.getDate() - 1); // Midnight yesterday
    const yesterdayEnd = new Date(todayStart);
    yesterdayEnd.setHours(0, 0, 0, 0); // End of yesterday

    try {
      // Total Sales (Successful Payments)
      const paymentsToday = await queryRunner.manager
        .createQueryBuilder(Payment, 'payment')
        .select('SUM(payment.amount)', 'total')
        .where('payment.status = :status', { status: paymentStatus.SUCCESS })
        .andWhere('payment.createdAt BETWEEN :start AND :end', {
          start: todayStart,
          end: todayEnd,
        })
        .getRawOne();

      const paymentsYesterday = await queryRunner.manager
        .createQueryBuilder(Payment, 'payment')
        .select('SUM(payment.amount)', 'total')
        .where('payment.status = :status', { status: paymentStatus.SUCCESS })
        .andWhere('payment.createdAt BETWEEN :start AND :end', {
          start: yesterdayStart,
          end: yesterdayEnd,
        })
        .getRawOne();

      const totalSalesToday = Number(paymentsToday?.total) || 0;
      const totalSalesYesterday = Number(paymentsYesterday?.total) || 0;
      const totalSalesGrowth =
        totalSalesYesterday === 0
          ? totalSalesToday > 0
            ? 100
            : 0
          : ((totalSalesToday - totalSalesYesterday) / totalSalesYesterday) *
            100;

      // Total Orders
      const ordersToday = await queryRunner.manager
        .createQueryBuilder(Order, 'order')
        .select('SUM(order.totalAmount)', 'total')
        .where('order.createdAt BETWEEN :start AND :end', {
          start: todayStart,
          end: todayEnd,
        })
        .getRawOne();

      const ordersYesterday = await queryRunner.manager
        .createQueryBuilder(Order, 'order')
        .select('SUM(order.totalAmount)', 'total')
        .where('order.createdAt BETWEEN :start AND :end', {
          start: yesterdayStart,
          end: yesterdayEnd,
        })
        .getRawOne();

      const totalOrdersToday = Number(ordersToday?.total) || 0;
      const totalOrdersYesterday = Number(ordersYesterday?.total) || 0;
      const ordersGrowth =
        totalOrdersYesterday === 0
          ? totalOrdersToday > 0
            ? 100
            : 0
          : ((totalOrdersToday - totalOrdersYesterday) / totalOrdersYesterday) *
            100;

      // Total Customers (New users with Role.USER)
      const customersToday = await queryRunner.manager
        .createQueryBuilder(User, 'user')
        .select('COUNT(user.id)', 'total')
        .where('user.role = :role', { role: Role.USER })
        .andWhere('user.createdAt BETWEEN :start AND :end', {
          start: todayStart,
          end: todayEnd,
        })
        .getRawOne();

      const customersYesterday = await queryRunner.manager
        .createQueryBuilder(User, 'user')
        .select('COUNT(user.id)', 'total')
        .where('user.role = :role', { role: Role.USER })
        .andWhere('user.createdAt BETWEEN :start AND :end', {
          start: yesterdayStart,
          end: yesterdayEnd,
        })
        .getRawOne();

      const totalCustomersToday = Number(customersToday?.total) || 0;
      const totalCustomersYesterday = Number(customersYesterday?.total) || 0;
      const customersGrowth =
        totalCustomersYesterday === 0
          ? totalCustomersToday > 0
            ? 100
            : 0
          : ((totalCustomersToday - totalCustomersYesterday) /
              totalCustomersYesterday) *
            100;

      // get the amount of the successful payments
      const successfulPayments = await queryRunner.manager.find(Payment, {
        where: {
          status: paymentStatus.SUCCESS,
        },
        select: {
          amount: true,
        },
      });

      const totalOrders = await queryRunner.manager.find(Order, {
        select: { totalAmount: true },
      });

      const totalUsers = await queryRunner.manager.count(User, {
        where: { role: Role.USER },
      });

      // if successful commit
      // ensures the txn is committed to the db
      await queryRunner.commitTransaction();

      return {
        totalSales: successfulPayments
          .map((payment) => Number(payment.amount))
          .reduce((acc, cur) => acc + cur, 0),
        totalSalesGrowth,
        orders: totalOrders
          .map((order) => Number(order.totalAmount))
          .reduce((acc, cur) => acc + cur, 0),
        ordersGrowth,
        customers: totalUsers,
        customersGrowth,
      };
    } catch (error) {
      // we rollback the txn here if it is not successful
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      // relsease the connection
      // release connection whether it was successful or not
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release the connection', {
          description: String(error),
        });
      }
    }
  }
}
