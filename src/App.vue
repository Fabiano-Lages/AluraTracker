<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuro}">
    <div class="column is-one-quarter">
      <BarraLateral @alterarTema="alterarTema" :modoEscuro="modoEscuro" />
    </div>
    <div class="column is-three-quarter conteudo">
      <NotificacoesApp :modoEscuro="modoEscuro" />
      <RouterView />
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BarraLateral from './components/BarraLateral.vue';
  import ITarefa from './interfaces/ITarefa';
  import NotificacoesApp from './components/NotificacoesApp.vue';

  export default defineComponent({
    name: 'App',
    components: {
      BarraLateral, NotificacoesApp
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
        alterarTema() {
          this.modoEscuro = !this.modoEscuro;
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
</style>