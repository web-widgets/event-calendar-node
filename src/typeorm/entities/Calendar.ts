import { Color } from './Color';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('calendars')
export class Calendar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column({ nullable: true })
    active?: boolean;

    @Column({ nullable: true })
    description: string;
    
    @Column('jsonb')
    color: Color;

}