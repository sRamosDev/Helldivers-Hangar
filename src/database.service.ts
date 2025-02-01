import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    await this.delay(1000);
    this.logger.log('DatabaseService has started');
    const isPopulated = await this.isDatabasePopulated();
    if (!isPopulated) {
      const shouldPopulate = await this.askUserToPopulate();
      if (shouldPopulate) {
        this.logger.log('Populating database with demo data');
        await this.populateDatabase();
      } else {
        this.logger.log('Skipping database population');
      }
    } else {
      this.logger.log('Database is already populated');
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async isDatabasePopulated(): Promise<boolean> {
    const result = await this.dataSource.query(
      'SELECT COUNT(*) FROM public.gear_has_passives',
    );
    return result[0].count > 0;
  }

  private async populateDatabase() {
    const sqlFilePath = path.join(__dirname, '../populate-db.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    await this.dataSource.query(sql);
  }

  private askUserToPopulate(): Promise<boolean> {
    return Promise.race([
      new Promise<boolean>((resolve) => {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question(
          'Do you want to populate the database with demo data? (yes/no): ',
          (answer) => {
            rl.close();
            resolve(
              answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y',
            );
          },
        );
      }),
      new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(false), 30000),
      ),
    ]);
  }
}
