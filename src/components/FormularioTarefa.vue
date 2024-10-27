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
    import { defineComponent, computed, ref } from 'vue';
    import TempoRizador from './TempoRizador.vue';
    import ITarefa from '@/interfaces/ITarefa';
    import { useStore } from '@/store';

    export default defineComponent({
        name: 'FormularioTarefa',
        components: {
            TempoRizador
        },
        emits: ['tarefaFinalizada'],
        setup(props, {emit}) {
            const store = useStore();

            const lstProjetos = computed(() => store.state.projeto.projetos);

            const descricao = ref("");
            const executando = ref(false);
            const idProjeto = ref(0);

            const finalizarTarefa = (segundos: number) : void => {
                emit('tarefaFinalizada', 
                    {
                        descricao: descricao.value, 
                        duracaoEmSegundos: segundos,
                        projeto: lstProjetos.value.find(prj => prj.id == idProjeto.value)
                    } as ITarefa);
                descricao.value = "";
                executando.value = false;
            }

            const iniciarTarefa = () : void => {
                executando.value = true;
            }

            return({
                lstProjetos,
                descricao,
                executando,
                idProjeto,
                finalizarTarefa,
                iniciarTarefa
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