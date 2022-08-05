import { Controller, Get, Param, Req } from '@nestjs/common'
import { NewsService } from './news.service'
import { Request } from 'express'
import { extractParamsFromRequestHelper } from 'src/helpers/extract-params-from-request.helper'

@Controller('/news')
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Get()
	async getAll(@Req() req: Request) {
		const { page, limit, search } = extractParamsFromRequestHelper(req)

		return await this.newsService.getAll({
			page,
			limit,
			search,
		})
	}

	@Get(':newsId')
	async getOneById(@Param('newsId') newsId: string) {
		return await this.newsService.getOneById(newsId)
	}

	@Get('category/:categoryId')
	async getAllByCategoryId(
		@Param('categoryId') categoryId: string,
		@Req() req: Request,
	) {
		const { page, limit, search } = extractParamsFromRequestHelper(req)

		return await this.newsService.getAllByCategoryId({
			page,
			limit,
			search,
			categoryId,
		})
	}
}
