import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { News } from './modules/news/entities/news.entity'
import { Category } from './modules/category/entities/category.entity'

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					type: 'postgres',
					url: configService.get<string>('LOCAL_RUN')
						? configService.get<string>('DATABASE_MAIN_HOST_LOCAL')
						: configService.get<string>('DATABASE_MAIN_HOST'),
					entities: [Category, News],
					// synchronize: true --- use migrations instead
					relationLoadStrategy: 'query',
				}
			},
		}),
	],
})
export class AppModule {}
