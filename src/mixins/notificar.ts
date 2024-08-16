import { store } from '@/store';
import { Notificacao } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export const notificacaoMixin = {
    methods: {
        notificar(tipo: TipoNotificacao, titulo: string, texto: string) : void {
            store.commit(Notificacao.NOTIFICAR, {
                titulo,
                texto,
                tipo
            });
        }
    }
};