import { Router } from 'express';

import OpportunitiesController from '../controllers/OpportunitiesController';

const opportunitiesRouter = Router();
const opportunitiesController = new OpportunitiesController();

opportunitiesRouter.get('/sync', opportunitiesController.sync);

opportunitiesRouter.get('/', opportunitiesController.index);

export default opportunitiesRouter;
