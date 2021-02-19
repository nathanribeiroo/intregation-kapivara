import IOrdersOpportunitiesDTO from '../dtos/IOrdersOpportunitiesDTO';

export default interface IOrdersRepository {
    createOrder(
        orders: IOrdersOpportunitiesDTO[],
    ): Promise<IOrdersOpportunitiesDTO[]>;

    opportunitiesPerDay(): Promise<IOrdersOpportunitiesDTO[]>;
}
