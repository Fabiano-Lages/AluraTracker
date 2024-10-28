<template>
  <main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuro}">
    <div class="column is-one-quarter">
      <BarraLateral />
    </div>
    <div class="column is-three-quarter conteudo">
      <NotificacoesApp />
      <RouterView />
    </div>
  </main>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import BarraLateral from './components/BarraLateral.vue';
  import NotificacoesApp from './components/NotificacoesApp.vue';
  import { useStore } from './store';

  export default defineComponent({
    name: 'App',
    components: {
      BarraLateral, NotificacoesApp
    },
    setup() {
      return({
        modoEscuro: computed(() => useStore().state.modoEscuro)
      });
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