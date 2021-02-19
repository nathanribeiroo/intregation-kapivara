import IOrdersOpportunitiesDTO from '@modules/opportunities/dtos/IOrdersOpportunitiesDTO';
import Order from '../entities/Order';

export default class OrdersRepository {
    public async createOrder(
        orders: IOrdersOpportunitiesDTO[],
    ): Promise<IOrdersOpportunitiesDTO[]> {
        const result = await Order.insertMany(orders);
        return result;
    }

    public async opportunitiesPerDay(): Promise<IOrdersOpportunitiesDTO[]> {
        const orders = await Order.aggregate([
            {
                $sort: {
                    value: -1,
                    numero: 1,
                },
            },
            {
                $project: {
                    numero: '$numero',
                    idPedido: '$idPedido',
                    value: '$value',
                    orgName: '$orgName',
                    date: {
                        $dateToString: {
                            format: '%d/%m/%Y',
                            date: '$createdAt',
                        },
                    },
                },
            },
            {
                $group: {
                    _id: '$date',
                    totalValue: { $sum: '$value' },
                    opportunities: {
                        $push: '$$ROOT',
                    },
                },
            },
        ]);
        return orders;
    }
}
