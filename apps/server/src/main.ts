import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app/app.module'
import { ConfigService } from '@nestjs/config'
import { CONFIG_KEYS } from './app/constants/config-keys'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableShutdownHooks()
  const config: ConfigService = app.get(ConfigService)
  const port = Number(config.get(CONFIG_KEYS.PORT))
  await app.listen(port)
  Logger.log(`🚀 Application is running, port ${port}, commit ${config.get(CONFIG_KEYS.GIT_COMMIT)}`)
}

bootstrap()
