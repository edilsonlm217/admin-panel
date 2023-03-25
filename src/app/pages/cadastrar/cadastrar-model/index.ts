export class CadastrarForm {
    cnpj!: string;
    responsavel!: string;
    contato!: string;

    provedorNome!: string;

    databaseName!: string;
    databaseDialect!: string;
    databaseHost!: string;
    databaseUsername!: string;
    databasePassword!: string;

    assinaturaValor!: number;
    assinaturaDataVencimento!: string;
    assinaturaDiaVencimento!: string;

    constructor() { }
}