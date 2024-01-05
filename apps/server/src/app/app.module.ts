import { Module } from '@nestjs/common'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConfigModule } from '@nestjs/config'
import { ApiModule } from './api/api.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'browser')
    }),
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '..', '..', '..', '.env'), join(__dirname, '..', '..', '.env')]
    }),
    ApiModule
  ]
})
export class AppModule {}
