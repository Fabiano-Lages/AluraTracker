import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore} from "vuex";
import { Projeto, Notificacao } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    mutations: {
        [Projeto.ADICIONA](state, nomeDoProjeto: string) {
            state.projetos.push(
                {
                    nome: nomeDoProjeto,
                    id: new Date().toISOString()
                } as IProjeto
            );
        },
        [Projeto.ALTERA](state, projeto: IProjeto) {
            const pos = state.projetos.findIndex(prj => prj.id == projeto.id);
            if(pos != -1) {
                state.projetos[pos] = projeto;
            }
        },
        [Projeto.EXCLUI](state, idProjeto: string) {
            const pos = state.projetos.findIndex(prj => prj.id == idProjeto);
            if(pos != -1) {
                state.projetos.splice(pos, 1);
            }
        },
        [Notificacao.NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes.splice(state.notificacoes.findIndex(ntf => ntf.id == novaNotificacao.id), 1);
            }, 5000);
        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}
