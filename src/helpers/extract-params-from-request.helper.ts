import { Request } from 'express'

export const extractParamsFromRequestHelper = (
	req: Request,
): { page: number; limit: number; search: string } => {
	const page: number = parseInt(req.query.page as any) || 0
	const limit: number = parseInt(req.query.limit as any) || 9
	const search: string = (req.query.limit as any) || ''

	return {
		page,
		limit,
		search,
	}
}
