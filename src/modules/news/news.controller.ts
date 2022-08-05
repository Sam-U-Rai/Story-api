import { Controller, Get, HttpException, HttpStatus, Req } from '@nestjs/common'
import { NewsService } from './news.service'
import { Request } from 'express'

@Controller('/news')
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Get()
	async getAll(@Req() req: Request) {
		const page: number = parseInt(req.query.page as any) || 0
		const limit: number = parseInt(req.query.limit as any) || 9
		const search: string = (req.query.limit as any) || ''
		const categoryId: string = req.query.category as any

		if (!categoryId) {
			throw new HttpException(
				"Category  wasn't provided",
				HttpStatus.BAD_REQUEST,
			)
		}

		return await this.newsService.getAll({ page, limit, search, categoryId })
	}
}
