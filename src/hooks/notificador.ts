import { TipoNotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store";
import { Notificacao } from "@/store/tipo-mutacoes";

// Opção ao uso de mixxins

type Notificador = {
    notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void;
}

export default () : Notificador => {
    const notificar = (tipo: TipoNotificacao, titulo: string, texto: string) : void  => {
        store.commit(Notificacao.NOTIFICAR, {
            titulo,
            texto,
            tipo
        });
    };

    return({
        notificar
    });
}