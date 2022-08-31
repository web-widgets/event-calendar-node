import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Event } from './Event';

@Entity('uploads')
export class Upload {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Event, event => event.img, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true })
    event: Event;

    @Column()
    url?: string;

    @Column({ nullable: true })
    name?: string;
    @Column({ nullable: true })
    isCover?: boolean;

}