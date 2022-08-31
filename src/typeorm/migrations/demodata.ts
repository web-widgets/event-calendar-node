import { Calendar } from './../entities/Calendar';
import { Event } from './../entities/Event';
import { MigrationInterface, QueryRunner } from "typeorm";
import { getRepository } from 'typeorm';
import { calendars, events } from "./seedData";

export class seed1636144227878 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const calendarsRepository = getRepository(Calendar);
        const eventsRepository = getRepository(Event);
        
        await calendarsRepository.save(calendars);
        await eventsRepository.save(events);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}