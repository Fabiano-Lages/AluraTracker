<template>
    <FormularioTarefa @tarefaFinalizada="adicionaTarefa" />
    <div class="lista" >
        <BoxTarefa v-if="!listaTarefas.length">Nenhuma tarefa criada</BoxTarefa>
        <TarefaDetalhe v-else v-for="(tarefa, index) in listaTarefas" :key="index" :tarefa="tarefa" />
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent, computed } from 'vue';
    import FormularioTarefa from '@/components/FormularioTarefa.vue';
    import BoxTarefa from '@/components/BoxTarefa.vue';
    import TarefaDetalhe from '@/components/TarefaDetalhe.vue';
    import ITarefa from '@/interfaces/ITarefa';
    import {useStore} from '@/store';
    import { AcaoProjeto, AcaoTarefas } from '@/store/tipo-acoes';
  
    export default defineComponent({
      name: 'TarefasTracker',
      components: {
        FormularioTarefa, TarefaDetalhe, BoxTarefa
      },
      methods: {
          adicionaTarefa(tarefa: ITarefa) {
            this.store.dispatch(AcaoTarefas.CADASTRAR_TAREFA, tarefa);
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