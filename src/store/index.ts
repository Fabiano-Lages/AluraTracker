import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore} from "vuex";
import { Notificacao } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, tarefa } from "./modulos/tarefa";

export interface Estado {
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        projeto: {
            projetos: []
        },
        tarefa: {
            tarefas: []
        }
    },
    mutations: {
        [Notificacao.NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes.splice(state.notificacoes.findIndex(ntf => ntf.id == novaNotificacao.id), 1);
            }, 5000);
        },
    },
    actions: {
    },
    modules: {
        projeto,
        tarefa
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}