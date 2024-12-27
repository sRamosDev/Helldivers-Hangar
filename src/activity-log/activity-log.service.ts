import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './activity-log.entity';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private activityLogRepository: Repository<ActivityLog>,
  ) {}

  async logAction(userId: number, action: string): Promise<void> {
    const log = this.activityLogRepository.create({ userId, action });
    await this.activityLogRepository.save(log);
  }
}
