import { Router } from 'express';

import Pipedrive from '@modules/opportunities/infra/axios/Pipedrive';
import SyncOpportunitiesServices from '@modules/opportunities/services/SyncOpportunitiesService';

const opportunitiesRouter = Router();

opportunitiesRouter.get('/sync', async (resquest, response) => {
    const pipedrive = new Pipedrive();

    const data = await pipedrive.dealsWon();

    if (!data) {
        return response.status(404).json({
            message:
                'Não foi encontrado oportunidades no pipedrive com status igual a ganho',
        });
    }

    const a = new SyncOpportunitiesServices();

    const res = await a.execute(data);

    return response.json(res);
});

opportunitiesRouter.post('/', async (request, response) => {
    return response.json({});
});

export default opportunitiesRouter;
