import { Schema, Document, model } from 'mongoose';
import IOrdersOpportunitiesDTO from '@modules/opportunities/dtos/IOrdersOpportunitiesDTO';

interface IOrders extends IOrdersOpportunitiesDTO, Document {}

const Order = new Schema(
    {
        numero: {
            type: String,
            required: true,
            unique: true,
        },
        idPedido: {
            type: Number,
            required: true,
            unique: true,
        },
        value: {
            type: Number,
            required: true,
        },
        orgName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default model<IOrders>('Order', Order);
