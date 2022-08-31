import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { brotliDecompress, brotliDecompressSync } from 'zlib';

import { Calendar } from '../typeorm/entities/Calendar';
import { Event } from '../typeorm/entities/Event';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const calendarsRepository = getRepository(Calendar);

    try {
        const calendars = await calendarsRepository.find({
            select: ['id', 'label', 'active', 'description', 'color'],
        });
        res.send(calendars);
    } catch (err) {
        return next(err);
    }
};
export const add = async (req: Request, res: Response, next: NextFunction) => {
    const calendarsRepository = getRepository(Calendar);

    try {
        const fields = {
            id: 0,
            label: req.body.label,
            description: req.body.description || "",
            color: req.body.color || { background: '#5890DC', border: '#2D74D3' },
            active: true,
        };
        const calendar = await calendarsRepository.save(fields);
        res.send({ ok: true, id: calendar.id });
    } catch (err) {
        return next(err);
    }
};
export const update = async (req: Request, res: Response, next: NextFunction) => {
    const calendarsRepository = getRepository(Calendar);

    try {
        const { id } = req.params;
        const calendar = req.body;
        await calendarsRepository.update(id, calendar);
        res.send({ ok: true });
    } catch (err) {
        return next(err);
    }
};
export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const calendarsRepository = getRepository(Calendar);
    const eventsRepository = getRepository(Event);

    try {
        const { id } = req.params;
        await calendarsRepository.delete(id);
        await eventsRepository.delete({ type: id });
        res.send({ ok: true });
    } catch (err) {
        return next(err);
    }
}
