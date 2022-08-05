import {
	CreateDateColumn,
	Entity,
	Generated,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { News } from 'src/modules/news/entities/news.entity'

@Entity({ name: 'categories' })
export class Category {
	@PrimaryGeneratedColumn('uuid')
	@Generated('uuid')
	id: string

	@OneToMany(() => News, news => news.category, {
		nullable: true,
	})
	news: News[]

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	created_at: Date

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updated_at: Date
}
