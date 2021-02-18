import { Request, Response } from 'express';

import Pipedrive from '@modules/opportunities/infra/axios/Pipedrive';
import SyncOpportunitiesServices from '@modules/opportunities/services/SyncOpportunitiesService';

export default class OpportunitiesController {
    public async sync(request: Request, response: Response): Promise<Response> {
        const pipedrive = new Pipedrive();

        const dataPipedrive = await pipedrive.dealsWon();

        if (!dataPipedrive) {
            return response.status(404).json({
                message:
                    'Não foi encontrado oportunidades no pipedrive com status igual a ganho.',
            });
        }

        const syncOpportunitiesServices = new SyncOpportunitiesServices();

        const dataSync = await syncOpportunitiesServices.execute(dataPipedrive);

        if (dataSync.length === 0) {
            return response.status(200).json({
                message: 'Todas as oportunidades estão sincronizadas.',
            });
        }

        return response.status(201).json(dataSync);
    }
}
