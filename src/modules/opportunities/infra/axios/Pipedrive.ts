import axios, { AxiosInstance } from 'axios';

import IDealsOpportunitiesDTO from '@modules/opportunities/dtos/IDealsOpportunitiesDTO';

import configs from '@config/pipedriveConfig';

export default class Pipedrive {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: configs.baseURL,
        });
    }

    async dealsWon(): Promise<IDealsOpportunitiesDTO[] | undefined> {
        const dealsWon = await this.api.get(
            `/deals?status=won&start=0&api_token=${configs.apiToken}`,
        );

        if (dealsWon.status === 200) {
            const { data } = dealsWon.data;

            return data.length >= 1 ? data : undefined;
        }

        return undefined;
    }
}
