<template>
    <FormularioTarefa @tarefaFinalizada="adicionaTarefa" />
    <div class="lista" >
        <BoxTarefa v-if="!listaTarefas.length">Nenhuma tarefa criada</BoxTarefa>
        <TarefaDetalhe v-else v-for="(tarefa, index) in listaTarefas" :key="index" :tarefa="tarefa" />
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent } from 'vue';
    import FormularioTarefa from '@/components/FormularioTarefa.vue';
    import BoxTarefa from '@/components/BoxTarefa.vue';
    import TarefaDetalhe from '@/components/TarefaDetalhe.vue';
    import ITarefa from '@/interfaces/ITarefa';
  
    export default defineComponent({
      name: 'TarefasTracker',
      components: {
        FormularioTarefa, TarefaDetalhe, BoxTarefa
      },
      data() {
        return({
          listaTarefas: [] as ITarefa[]
        });
      },
      methods: {
          adicionaTarefa(tarefa: ITarefa) {
            this.listaTarefas.push(tarefa);
          }
      }
    });
  </script>
  
  <style>
    .lista {
        padding: 1.25rem;
    }
  </style>