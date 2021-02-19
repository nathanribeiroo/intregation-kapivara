import IDealsOpportunitiesDTO from '@modules/opportunities/dtos/IDealsOpportunitiesDTO';
import IOrdersOpportunitiesDTO from '../dtos/IOrdersOpportunitiesDTO';
import Bling from '../infra/axios/Bling';
import toXml from '../infra/toXml';

export default class SyncOpportunitiesServices {
    private order: Bling;

    constructor() {
        this.order = new Bling();
    }

    public async execute(
        deals: IDealsOpportunitiesDTO[],
    ): Promise<IOrdersOpportunitiesDTO[]> {
        return new Promise(resolve => {
            const arrDeals: IOrdersOpportunitiesDTO[] = [];

            deals.map(async (deal, index) => {
                const xmlObject = toXml.execute(deal);
                const data = await this.order.addOrder(xmlObject);

                // if the order was added
                if (data) {
                    data.value = deal.value;
                    data.orgName = deal.org_name;
                    arrDeals.push(data);
                }

                if (deals.length === index + 1) {
                    resolve(arrDeals);
                }
            });
        });
    }
}
