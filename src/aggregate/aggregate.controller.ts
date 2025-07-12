import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import { AggregateService } from './providers/aggregate.service';

@Controller('aggregate')
export class AggregateController {
  constructor(
    /**
     * injecting the aggregate service
     */
    private readonly aggregateService: AggregateService,
  ) {}

  @Roles(Role.ADMIN)
  @Get('admin-dashboard')
  public getAdminDashboardAggregate() {
    return this.aggregateService.getAdminDashboardService();
  }
}
