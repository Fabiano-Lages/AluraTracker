<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input 
                    type="text" 
                    class="input" 
                    v-model="descricao" 
                    placeholder="Qual tarefa você deseja iniciar?" 
                    :readonly="executando" 
                />
            </div>
            <div class="column">
                <TempoRizador 
                    :executando="executando" 
                    :descricao="descricao" 
                    @aoTempoFinalizado="finalizarTarefa" 
                    @aoIniciarTarefa="iniciarTarefa" 
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import TempoRizador from './TempoRizador.vue';
    import ITarefa from '@/interfaces/ITarefa';

    export default defineComponent({
        name: 'FormularioTarefa',
        components: {
            TempoRizador
        },
        data() {
            return({
                descricao: '',
                executando: false
            });
        },
        methods: {
            finalizarTarefa(segundos: number) : void {
                this.$emit('tarefaFinalizada', {descricao: this.descricao, duracaoEmSegundos: segundos} as ITarefa);
                this.descricao = "";
                this.executando = false;
            },
            iniciarTarefa() {
                this.executando = true;
            }
        },
        emits: ['tarefaFinalizada']
    });
</script>

<style>
    .input {
        color: var(--texto-primario);
        background-color: var(--bg-primario);
    }

    .input:read-only {
        cursor: not-allowed;
    }

    .input::placeholder {
        color: var(--texto-primario);
    }

    .formulario {
        color: var(--texto-primario);
        background-color: var(--bg-primario);
    }
</style>