import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Calendar } from "./Calendar"; 
@Entity('colors')
export class Color {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    background: string;

    @Column()
    border: string;
    
    @OneToMany(type => Calendar, calendar => calendar.color) calendar: Calendar; 
}