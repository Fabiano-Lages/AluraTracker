import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore} from "vuex";
import { Projeto, Tarefa, Notificacao } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { AcaoProjeto, AcaoTarefas } from "./tipo-acoes";
import clienteHttp from "@/http";
import ITarefa from "@/interfaces/ITarefa";

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas:[],
        notificacoes: []
    },
    mutations: {
        [Projeto.ADICIONA](state, projeto: IProjeto) {
            state.projetos.push(projeto);
        },
        [Projeto.ALTERA](state, projeto: IProjeto) {
            const pos = state.projetos.findIndex(prj => prj.id == projeto.id);
            if(pos != -1) {
                state.projetos[pos] = projeto;
            }
        },
        [Projeto.EXCLUI](state, idProjeto: number) {
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
        },
        [Tarefa.DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },
        [Tarefa.ADICIONA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },
        [Tarefa.ALTERA](state, tarefa: ITarefa) {
            const pos = state.tarefas.findIndex(trf => trf.id == tarefa.id);
            if(pos != -1) {
                state.tarefas[pos] = tarefa;
            }
        },
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
                    id: new Date().getTime(),
                    nome: nomeDoProjeto
                })
                .then(resposta => {
                    commit(Projeto.ADICIONA, resposta.data);
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
        },
        [AcaoTarefas.OBTER_TAREFAS]({ commit }) {
            clienteHttp.get('tarefas')
                .then(resposta => {
                    commit(Tarefa.DEFINIR_TAREFAS, resposta.data);
                });
        },
        [AcaoTarefas.CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            tarefa.id = new Date().getTime();
            return clienteHttp
                .post('tarefas', tarefa)
                .then(resposta => {
                    commit(Tarefa.ADICIONA, resposta.data);
                });
        },
        [AcaoTarefas.ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return clienteHttp
                .put(`tarefas/${tarefa.id}`, tarefa)
                .then(() => {
                    commit(Tarefa.ALTERA, tarefa);
                });
        },
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}
