import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Event } from '../typeorm/entities/Event';
import { Upload } from '../typeorm/entities/Upload';


import { eventFields, getEventFields } from '../utils';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const eventRepository = getRepository(Event);

    try {
        const events = await eventRepository.find({
            select: eventFields as (keyof Event)[]
        });
        res.send(events);
    } catch (err) {
        return next(err);
    }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const eventRepository = getRepository(Event);
    try {
        const fields: any = getEventFields({...req.body, id: 0});
        console.log(req.body);
        console.log(fields);
        const event = await eventRepository.save(fields);
        res.send({ status: "ok", id: event.id });
    } catch (err) {
        return next();
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const eventRepository = getRepository(Event);
    const uploadsRepository = getRepository(Upload);
    try {
        const { id } = req.params;
        const event: any = getEventFields(req.body);
        await uploadsRepository.delete({event: id});
        await eventRepository.save({ ...event, id: Number(id) });
        res.send({ status: "ok" });
    } catch (err) {
        return next(err);
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const eventRepository = getRepository(Event);
    const uploadsRepository = getRepository(Upload);
    try {
        const { id } = req.params;
        await eventRepository.delete(id);
        await uploadsRepository.delete({event: id});
        res.send({ status: "ok" });
    } catch (err) {
        return next(err);
    }
}
