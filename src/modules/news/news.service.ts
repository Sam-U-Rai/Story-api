import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { News } from './entities/news.entity'

@Injectable()
export class NewsService {
	constructor(
		@InjectRepository(News)
		private readonly NewsRepository: Repository<News>,
	) {}

	async getAll() {
		const news = await this.NewsRepository.find()
		return news
	}
}
