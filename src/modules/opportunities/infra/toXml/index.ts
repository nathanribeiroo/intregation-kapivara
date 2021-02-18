import toxml from 'jsontoxml';

import IDealsOpportunitiesDTO from '@modules/opportunities/dtos/IDealsOpportunitiesDTO';

export default class ToXml {
    public static execute(deal: IDealsOpportunitiesDTO): string {
        return toxml(
            {
                pedido: [
                    {
                        name: 'cliente',
                        children: [
                            {
                                name: 'nome',
                                text: deal.org_name,
                            },
                        ],
                    },
                    {
                        name: 'volumes',
                        children: [
                            {
                                name: 'volume',
                                children: [{ name: 'servico', text: 'Sedex' }],
                            },
                        ],
                    },
                    {
                        name: 'itens',
                        children: [
                            {
                                name: 'item',
                                children: [
                                    { name: 'codigo', text: 1 },
                                    { name: 'descricao', text: 'api' },
                                    { name: 'qtde', text: 1 },
                                    { name: 'vlr_unit', text: deal.value || 0 },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'parcelas',
                        children: [
                            {
                                name: 'parcela',
                                children: [
                                    { name: 'vlr', text: deal.value || 0 },
                                ],
                            },
                        ],
                    },
                ],
            },
            { xmlHeader: false },
        );
    }
}
