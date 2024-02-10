import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import * as sqlite3 from 'sqlite3'

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name)
  private db: sqlite3.Database | null = null
  public onModuleInit(): void {
    this.connect()
  }
  public onModuleDestroy(): void {
    this.disconnect()
  }

  public async query<Value>(sql: string, params: unknown[] = []): Promise<Value[]> {
    if (!this.isConnected) {
      this.connect()
    }

    try {
      return new Promise((resolve, reject) => {
        this.db.all<Value>(sql, params, (err, rows) => {
          if (err) {
            reject(err)
            throw err
          } else {
            resolve(rows)
          }
        })
      })
    } catch (error) {
      this.logger.error('Error executing query:', error)
      throw error
    }
  }

  private connect(): void {
    try {
      this.db = new sqlite3.Database(__dirname + '../../../../database.db', error => {
        if (error) {
          throw error
        } else {
          this.logger.log('Connected to the SQLite database.')
        }
      })
    } catch (error) {
      this.logger.error('Error connecting to database:', error)
    }
  }

  private disconnect(): void {
    try {
      this.db.close(error => {
        if (error) {
          throw error
        } else {
          this.logger.log('Closed the SQLite database connection.')
        }
      })
    } catch (error) {
      this.logger.error('Error closing database:', error)
    }
  }

  private get isConnected(): boolean {
    return this.db !== null
  }
}
