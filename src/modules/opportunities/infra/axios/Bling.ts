import axios from 'axios';

import configs from '@config/blingConfig';
import IOrdersOpportunitiesDTO from '@modules/opportunities/dtos/IOrdersOpportunitiesDTO';

export default class Bling {
    private api;

    constructor() {
        this.api = axios.create({
            baseURL: configs.baseURL,
        });
    }

    async addOrder(xml: string): Promise<IOrdersOpportunitiesDTO | undefined> {
        const order = await this.api.post(
            `/pedido/json/&apikey=${configs.apiToken}&xml=${xml}`,
        );

        if (order.status === 201) {
            return order.data.retorno.pedidos[0].pedido;
        }

        return undefined;
    }
}
