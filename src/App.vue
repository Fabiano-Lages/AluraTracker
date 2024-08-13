<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuro}">
    <div class="column is-one-quarter">
      <BarraLateral @alterarTema="alterarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioTarefa @tarefaFinalizada="adicionaTarefa" />
      <div class="lista" >
        <BoxTarefa v-if="!listaTarefas.length">Nenhuma tarefa criada</BoxTarefa>
        <TarefaDetalhe v-else v-for="(tarefa, index) in listaTarefas" :key="index" :tarefa="tarefa" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BarraLateral from './components/BarraLateral.vue';
  import FormularioTarefa from './components/FormularioTarefa.vue';
  import BoxTarefa from './components/BoxTarefa.vue';
  import TarefaDetalhe from './components/TarefaDetalhe.vue';
  import ITarefa from './interfaces/ITarefa';

  export default defineComponent({
    name: 'App',
    components: {
      BarraLateral, FormularioTarefa, TarefaDetalhe, BoxTarefa
    },
    data() {
      return({
        listaTarefas: [] as ITarefa[],
        modoEscuro: false
      });
    },
    methods: {
        adicionaTarefa(tarefa: ITarefa) {
          this.listaTarefas.push(tarefa);
        },
        alterarTema(modoEscuro: boolean) {
          this.modoEscuro = modoEscuro;
        }
    }
  });
</script>

<style>
  main {
    --bg-primario: #fff;
    --texto-primario: #000;
    --bg-secundario: #FAF0CA;
    --texto-secundario: #000;
  }

  main.modo-escuro {
    --bg-primario: #2b2d42;
    --texto-primario: #ddd;
    --bg-secundario: #555;
    --texto-secundario: #fff;
  }

  .conteudo {
    background-color: var(--bg-primario);
    color: var(--texto-primario);
  }

  .lista {
      padding: 1.25rem;
  }
</style>