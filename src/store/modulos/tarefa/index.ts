import clienteHttp from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { AcaoTarefas } from "@/store/tipo-acoes";
import { Tarefa } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
   tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
   mutations: {
      [Tarefa.DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
         state.tarefas = tarefas;
      },
      [Tarefa.ADICIONA](state, tarefa: ITarefa) {
         state.tarefas.push(tarefa);
      },
      [Tarefa.ALTERA](state, tarefa: ITarefa) {
         const pos = state.tarefas.findIndex(trf => trf.id == tarefa.id);
         if (pos != -1) {
            state.tarefas[pos] = tarefa;
         }
      },
   },
   actions: {
      [AcaoTarefas.OBTER_TAREFAS]({ commit }, filtro : string) {
         let url = 'tarefas';

         if(filtro) {
            url += "?descricao=" + filtro;
         }

         clienteHttp.get(url)
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
}