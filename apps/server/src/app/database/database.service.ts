import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import mysql from 'mysql2/promise'
import { ConfigService } from '@nestjs/config'
import { CONFIG_KEYS } from '../constants/config-keys'
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name)
  private connection: mysql.Connection | null = null
  public constructor(private readonly config: ConfigService) {}
  public async onModuleInit(): Promise<void> {
    await this.connect()
  }
  public async onModuleDestroy(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.end()
      } catch (error) {
        this.logger.error('Error disconnecting from database:', error)
      }
    }
  }

  public async query(
    query: string,
    values?: unknown[]
  ): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket> {
    if (!this.connection) {
      await this.connect()
    }

    try {
      const [rows] = await this.connection.query(query, values)
      return rows
    } catch (error) {
      this.logger.error('Error executing query:', error)
      throw error
    }
  }

  private async connect() {
    try {
      this.connection = await mysql.createConnection(this.config.get(CONFIG_KEYS.BLOG_CONNECTION_STRING))
    } catch (error) {
      this.logger.error('Error connecting to database:', error)
    }
  }
}
