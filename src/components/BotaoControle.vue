<template>
    <button class="button" :disabled="inativo" >
        <span class="icon">
            <i :class="'fas fa-' + funcao"></i>
        </span>
        <span>{{ funcao }}</span>
    </button>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: "BotaoControle",
        props: {
            inativo: {
                type: Boolean,
                required: true
            },
            funcao: {
                type: String,
                required: true
            }
        }
    });
</script>

<style scoped>
    button {
        color: var(--texto-primario);
        background-color: var(--bg-primario);
    }

    button:disabled {
        background-color: var(--bg-primario);
    }
</style>