import clienteHttp from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { AcaoProjeto } from "@/store/tipo-acoes";
import { Projeto } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
   projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
   mutations: {
      [Projeto.ADICIONA](state, projeto: IProjeto) {
         state.projetos.push(projeto);
      },
      [Projeto.ALTERA](state, projeto: IProjeto) {
         const pos = state.projetos.findIndex(prj => prj.id == projeto.id);
         if (pos != -1) {
            state.projetos[pos] = projeto;
         }
      },
      [Projeto.EXCLUI](state, idProjeto: number) {
         const pos = state.projetos.findIndex(prj => prj.id == idProjeto);
         if (pos != -1) {
            state.projetos.splice(pos, 1);
         }
      },
      [Projeto.DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
         state.projetos = projetos;
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
   }
}