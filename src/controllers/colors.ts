import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Color } from '../typeorm/entities/Color';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const colorRepository = getRepository(Color);

    try {
        const rows = await colorRepository.find({
            select: ['id', 'background', 'border'],
        });
        res.send(rows);
    } catch (err) {
        return next(err);
    }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const colorRepository = getRepository(Color);

    try {
        const color = req.body;
        await colorRepository.save(color);
        res.send({ ok: true });
    } catch (err) {
        return next(err);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const colorRepository = getRepository(Color);

    try {
        const { id } = req.params;
        const color = req.body;
        await colorRepository.update(id, color);
        res.send({ ok: true });
    } catch (err) {
        return next(err);
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const colorRepository = getRepository(Color);

    try {
        const { id } = req.params;
        await colorRepository.remove(id);
        res.send({ ok: true });
    } catch (err) {
        return next(err);
    }
}