<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <MarcaTempo :segundos="tempoEmSegundos" />

        <BotaoControle funcao="play" :inativo="executando" @click="iniciar" />

        <BotaoControle funcao="stop" :inativo="!executando" @click="finalizar" />
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import MarcaTempo from './MarcaTempo.vue';
    import BotaoControle from './BotaoControle.vue';
    import { TipoNotificacao } from '@/interfaces/INotificacao';
    import useNotificar from '@/hooks/notificador';

    export default defineComponent({
        name: "TempoRizador",
        components: {
            MarcaTempo, BotaoControle
        },
        props: {
            executando:{
                type: Boolean,
                required: true
            },
            descricao: {
                type: String,
                default: ""
            },
            projeto: {
                type: Number,
                default: 0
            }
        },
        emits: ['aoTempoFinalizado', 'aoIniciarTarefa'],
        setup(props, { emit }) {
            const { notificar } = useNotificar();

            const tempoEmSegundos = ref(0);
            const intervalo = ref(0);
            const inicio = ref(0);

            const iniciar = () : void => {
                if(props.descricao) {
                    intervalo.value = setInterval(() => {
                        const diferenca = (new Date()).getTime() - inicio.value;
                        tempoEmSegundos.value = Math.floor(diferenca / 1000);
                    }, 1000);
                    
                    inicio.value = (new Date()).getTime();
                    emit("aoIniciarTarefa");
                } else {
                    notificar(TipoNotificacao.FALHA, 'Descrição obrigatória', 'O campo descrição deve ser preenchido para iniciar a tarefa');
                }
            }

            const finalizar = () : void => {
                if(props.projeto) {
                    clearInterval(intervalo.value);
                    emit('aoTempoFinalizado', tempoEmSegundos.value);
                    tempoEmSegundos.value = 0;
                } else {
                    notificar(TipoNotificacao.FALHA, 'Projeto obrigatória', 'O campo projeto deve ser preenchido para encerrar esta tarefa');
                }
            }

            return({
                tempoEmSegundos,
                iniciar,
                finalizar
            });
        }
    });
</script>