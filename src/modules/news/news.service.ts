import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { News } from './entities/news.entity'

@Injectable()
export class NewsService {
	constructor(
		@InjectRepository(News)
		private readonly newsRepository: Repository<News>,
	) {}

	async getOneById(id: string): Promise<News> {
		const news = await this.newsRepository.findOneBy({ id })

		if (!news) throw new HttpException('body not found', HttpStatus.NOT_FOUND)

		return news
	}

	async getAll({
		page,
		limit,
		search,
	}: {
		page: number
		limit: number
		search: string
	}) {
		const builder = this.newsRepository
			.createQueryBuilder('news')
			.innerJoin('news.category', 'category')

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
	}

	async getAllByCategoryId({
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
			.innerJoin('news.category', 'category', 'category.id = :categoryId', {
				categoryId,
			})

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
	}
}
