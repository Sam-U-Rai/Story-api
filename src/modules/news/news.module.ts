import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { News } from './entities/news.entity'

import { CategoryModule } from '../category/category.module'
import { NewsService } from './news.service'
import { NewsController } from './news.controller'

@Module({
	imports: [TypeOrmModule.forFeature([News]), forwardRef(() => CategoryModule)],
	controllers: [NewsController],
	providers: [NewsService],
	exports: [NewsService],
})
export class NewsModule {}
