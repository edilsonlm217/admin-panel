export interface Tenant {
    id: string,
    cnpj: string,
    responsavel: string,
    contato: string,
    provedor: {
        nome: string
    },
    database: {
        conectado: boolean
    },
    assinatura: {
        ativa: boolean,
        valor: number,
        data_vencimento: Date,
        dia_vencimento: string,
    }
}
