<template>
    <BoxTarefa>
        <div class="columns clicavel" @click="tarefaSelecionada">
            <div class="column is-4">
                {{ tarefa.descricao }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto.nome }}
            </div>
            <div class="column">
                <MarcaTempo :segundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </BoxTarefa>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import BoxTarefa from './BoxTarefa.vue';
    import MarcaTempo from './MarcaTempo.vue';
    import ITarefa from '@/interfaces/ITarefa';

    export default defineComponent({
        name: "TarefaDetalhe",
        components: {
            MarcaTempo, BoxTarefa
        },
        props: {
            tarefa: {
                type: Object as PropType<ITarefa>,
                required: true
            }
        },
        methods: {
            tarefaSelecionada() : void {
                this.$emit('tarefa-selecionada', this.tarefa);
            }
        },
        emits: ['tarefa-selecionada']
    });
</script>

<style scoped>
    .clicavel {
        cursor: pointer;
    }
</style>