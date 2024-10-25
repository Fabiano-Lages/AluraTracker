import IProjeto from "./IProjeto";

export default interface ITarefa {
    id: number;
    descricao: string;
    duracaoEmSegundos: number;
    projeto: IProjeto
}