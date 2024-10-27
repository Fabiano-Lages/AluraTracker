<template>
    <div class="projetos">
        <h1 class="title">Projetos</h1>

        <RouterView />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'ListaProjetos',
    });
</script>

<style scoped>
    .projetos {
        padding: 1.25rem;
        color: var(--texto-primario);
        background-color: var(--bg-primario);
    }

    h1 {
        color: var(--texto-primario);
    }
</style>