import { Router } from 'express';

import events from './events';
import calendars from './calendars';
import uploads from './uploads';

const router = Router();

router.use('/events', events);
router.use('/calendars', calendars);
router.use('/uploads', uploads);

export default router;