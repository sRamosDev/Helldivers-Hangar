import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    await this.delay(5000);
    this.logger.log('DatabaseService has started');
    const isPopulated = await this.isDatabasePopulated();
    if (!isPopulated) {
      this.logger.log('Database is not populated, populating now');
      await this.populateDatabase();
    } else {
      this.logger.log('Database is already populated');
    }
  }

  private readonly logger = new Logger(DatabaseService.name);

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async isDatabasePopulated(): Promise<boolean> {
    const result = await this.dataSource.query(
      'SELECT COUNT(*) FROM public.armor_has_passives',
    );
    return result[0].count > 0;
  }

  private async populateDatabase() {
    const sqlFilePath = path.join(__dirname, '../populate-db.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    await this.dataSource.query(sql);
  }
}
