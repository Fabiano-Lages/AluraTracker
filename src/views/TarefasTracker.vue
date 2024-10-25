<template>
    <FormularioTarefa @tarefaFinalizada="adicionaTarefa" />
    <div class="lista" >
        <BoxTarefa v-if="!listaTarefas.length">Nenhuma tarefa criada</BoxTarefa>
        <TarefaDetalhe v-else v-for="(tarefa, index) in listaTarefas" :key="index" :tarefa="tarefa" @tarefa-selecionada="tarefaSelecionada" />
    </div>

    <ModalTarefa 
      v-if="tarefa"
      :tarefaSelecionada="tarefa" 
      @fechar-modal="fechaModal" 
      @novo-valor="alteraDescricao"
    />
  </template>
  
  <script lang="ts">
    import { defineComponent, computed } from 'vue';
    import FormularioTarefa from '@/components/FormularioTarefa.vue';
    import BoxTarefa from '@/components/BoxTarefa.vue';
    import TarefaDetalhe from '@/components/TarefaDetalhe.vue';
    import ITarefa from '@/interfaces/ITarefa';
    import ModalTarefa from '@/components/ModalTarefa.vue';
    import {useStore} from '@/store';
    import { AcaoProjeto, AcaoTarefas } from '@/store/tipo-acoes';
  
    export default defineComponent({
      name: 'TarefasTracker',
      components: {
        FormularioTarefa, TarefaDetalhe, BoxTarefa, ModalTarefa
      },
      data() {
        return({
          tarefa: null as ITarefa | null
        })
      },
      methods: {
          adicionaTarefa(tarefa: ITarefa) : void {
            this.store.dispatch(AcaoTarefas.CADASTRAR_TAREFA, tarefa);
          },
          tarefaSelecionada(tarefa: ITarefa) : void {
            this.tarefa = tarefa;
          },
          fechaModal() : void {
            this.tarefa = null;
          },
          alteraDescricao(descricao: string) : void {
            if(this.tarefa) {
              this.store.dispatch(AcaoTarefas.ALTERAR_TAREFA, {...this.tarefa, descricao});
              this.tarefa = null;
            }
          }
      },
      setup() {
        const store = useStore();
        store.dispatch(AcaoProjeto.OBTER_PROJETOS);
        store.dispatch(AcaoTarefas.OBTER_TAREFAS);
        return {
          store,
          listaTarefas: computed(() => store.state.tarefas)
        }
      }
    });
  </script>
  
  <style>
    .lista {
        padding: 1.25rem;
    }
  </style>