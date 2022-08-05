import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { News } from './entities/news.entity'

@Injectable()
export class NewsService {
	constructor(
		@InjectRepository(News)
		private readonly newsRepository: Repository<News>,
	) {}

	async getAll({
		page,
		limit,
		search,
		categoryId,
	}: {
		page: number
		limit: number
		search: string
		categoryId: string
	}) {
		const builder = this.newsRepository
			.createQueryBuilder('news')
			.innerJoin('news.category', 'category', 'category.id = :categoryId')

		if (search) {
			builder.where(
				'news.title LIKE :search OR news.description LIKE :search',
				{ search },
			)
		}

		builder.offset(page * limit).limit(limit)

		const total = await builder.getCount()
		const data = await builder.getMany()

		return {
			data,
			total,
			page,
			limit,
		}

		return
	}
}
