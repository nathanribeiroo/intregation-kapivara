import IOrdersOpportunitiesDTO from '@modules/opportunities/dtos/IOrdersOpportunitiesDTO';
import Order from '../entities/Order';

export default class OrdersRepository {
    public async createOrder(
        orders: IOrdersOpportunitiesDTO[],
    ): Promise<IOrdersOpportunitiesDTO[]> {
        const result = await Order.insertMany(orders);
        return result;
    }
}
