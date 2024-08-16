<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input 
                    type="text" 
                    class="input" 
                    v-model="descricao" 
                    placeholder="Qual tarefa você deseja iniciar?" 
                    :readonly="executando" 
                />
            </div>
            <div class="column is-3">
                <div class="select">
                    <select name="drop" id="drop" v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option
                            :value="projeto.id"
                            v-for="projeto in lstProjetos"
                            :key="projeto.id"
                        >
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <TempoRizador 
                    :executando="executando" 
                    :descricao="descricao" 
                    :projeto="idProjeto"
                    @aoTempoFinalizado="finalizarTarefa" 
                    @aoIniciarTarefa="iniciarTarefa" 
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import TempoRizador from './TempoRizador.vue';
    import ITarefa from '@/interfaces/ITarefa';
    import { useStore } from '@/store';

    export default defineComponent({
        name: 'FormularioTarefa',
        components: {
            TempoRizador
        },
        data() {
            return({
                descricao: '',
                executando: false,
                idProjeto: ''
            });
        },
        methods: {
            finalizarTarefa(segundos: number) : void {
                this.$emit('tarefaFinalizada', 
                    {
                        descricao: this.descricao, 
                        duracaoEmSegundos: segundos,
                        projeto: this.lstProjetos.find(prj => prj.id == this.idProjeto)
                    } as ITarefa);
                this.descricao = "";
                this.executando = false;
            },
            iniciarTarefa() {
                this.executando = true;
            }
        },
        emits: ['tarefaFinalizada'],
        setup() {
            const store = useStore();
            return({
                store,
                lstProjetos: computed(() => store.state.projetos)
            });
        }
    });
</script>

<style>
    .input, .select, select {
        color: var(--texto-primario) !important;
        background-color: var(--bg-primario) !important;
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