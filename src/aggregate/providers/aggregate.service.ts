import { Injectable } from '@nestjs/common';
import { GetAdminDashboardProvider } from './get-admin-dashboard.provider';

@Injectable()
export class AggregateService {
  constructor(
    /**
     * injecting the get admin dashboard provider
     */
    private readonly getAdminDashboardProvider: GetAdminDashboardProvider,
  ) {}

  async getAdminDashboardService() {
    return this.getAdminDashboardProvider.getAdminDashboard();
  }
}
