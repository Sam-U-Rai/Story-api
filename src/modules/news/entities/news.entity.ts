import {
	Column,
	CreateDateColumn,
	Entity,
	Generated,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { Category } from 'src/modules/category/entities/category.entity'

@Entity({ name: 'news' })
export class News {
	@PrimaryGeneratedColumn('uuid')
	@Generated('uuid')
	id: string

	@ManyToOne(() => Category, category => category.news, {
		nullable: true,
		onDelete: 'SET NULL',
	})
	category?: Category

	@Column({ nullable: true })
	title: string

	@Column({ nullable: true })
	description: string

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
