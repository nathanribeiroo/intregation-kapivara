import { Request, Response } from 'express';

import Pipedrive from '@modules/opportunities/infra/axios/Pipedrive';
import SyncOpportunitiesServices from '@modules/opportunities/services/SyncOpportunitiesService';
import OrdersRepository from '../../mongoose/repositories/OrdersRepository';

export default class OpportunitiesController {
    public async sync(request: Request, response: Response): Promise<Response> {
        try {
            const pipedrive = new Pipedrive();

            const dataPipedrive = await pipedrive.dealsWon();

            if (!dataPipedrive) {
                return response.status(404).json({
                    message:
                        'Não foi encontrado oportunidades no pipedrive com status igual a ganho.',
                });
            }

            const syncOpportunitiesServices = new SyncOpportunitiesServices();

            const dataSync = await syncOpportunitiesServices.execute(
                dataPipedrive,
            );

            if (dataSync.length === 0) {
                return response.status(200).json({
                    message:
                        'Todas as oportunidades já estão sincronizadas com o bling e o banco mongodb.',
                });
            }

            const ordersRepository = new OrdersRepository();

            const ordersAdded = await ordersRepository.createOrder(dataSync);

            return response.status(201).json(ordersAdded);
        } catch (err) {
            return response.status(500).json(err);
        }
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const ordersRepository = new OrdersRepository();
            const opportunities = await ordersRepository.opportunitiesPerDay();
            return response.status(200).json(opportunities);
        } catch (err) {
            return response.status(500).json(err);
        }
    }
}
