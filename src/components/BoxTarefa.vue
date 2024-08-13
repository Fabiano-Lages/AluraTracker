<template>
    <div class="box has-text-weight-bold">
        <slot />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'BoxTarefa'
    });
</script>

<style scoped>
    .box {
        background-color: var(--bg-secundario);
        color: var(--texto-secundario);
    }
</style>