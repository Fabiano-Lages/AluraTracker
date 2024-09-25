import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore} from "vuex";
import { Projeto, Notificacao } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { AcaoProjeto } from "./tipo-acoes";
import clienteHttp from "@/http";
import { HttpStatusCode } from "axios";

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
        [Projeto.DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos;
        },
        [Notificacao.NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes.splice(state.notificacoes.findIndex(ntf => ntf.id == novaNotificacao.id), 1);
            }, 5000);
        }
    },
    actions: {
        [AcaoProjeto.OBTER_PROJETOS]({ commit }) {
            clienteHttp.get('projetos')
                .then(resposta => {
                    commit(Projeto.DEFINIR_PROJETOS, resposta.data);
                });
        },
        [AcaoProjeto.CADASTRAR_PROJETO]({ commit }, nomeDoProjeto: string) {
            return clienteHttp
                .post('projetos', {
                    nome: nomeDoProjeto
                })
                .then(resposta => {
                    commit(Projeto.ADICIONA, nomeDoProjeto);
                    return resposta.data;
                });
        },
        [AcaoProjeto.ALTERAR_PROJETO]({ commit }, projeto: IProjeto) {
            return clienteHttp
                .put(`projetos/${projeto.id}`, projeto)
                .then(() => {
                    commit(Projeto.ALTERA, projeto);
                });
        },
        [AcaoProjeto.REMOVER_PROJETO]({ commit }, id: string) {
            return clienteHttp
                .delete(`projetos/${id}`)
                .then(() => {
                    commit(Projeto.EXCLUI, id);
                }) 
        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}
