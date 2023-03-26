export interface DetailedTenant {
    id: string,
    cnpj: string,
    responsavel: string,
    contato: string,
    provedor: {
        nome: string
    },
    database: {
        conectado: boolean
        name: string
        dialect: string
        host: string
        username: string
        password: string
    },
    assinatura: {
        ativa: boolean,
        valor: number,
        data_vencimento: Date,
        dia_vencimento: string
    }
}
