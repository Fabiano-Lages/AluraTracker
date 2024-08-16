<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <MarcaTempo :segundos="tempoEmSegundos" />

        <BotaoControle funcao="play" :inativo="executando" @click="iniciar" />

        <BotaoControle funcao="stop" :inativo="!executando" @click="finalizar" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import MarcaTempo from './MarcaTempo.vue';
    import BotaoControle from './BotaoControle.vue';
    import { TipoNotificacao } from '@/interfaces/INotificacao'; //INotificacao from '@/interfaces/INotificacao';
    import { notificacaoMixin } from '@/mixins/notificar';

    export default defineComponent({
        name: "TempoRizador",
        components: {
            MarcaTempo, BotaoControle
        },
        mixins: [notificacaoMixin],
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
                type: String,
                default: ""
            }
        },
        data() {
            return {
                tempoEmSegundos: 0,
                intervalo: 0
            }  
        },
        emits: ['aoTempoFinalizado', 'aoIniciarTarefa'],
        methods: {
            iniciar() {
                if(this.descricao) {
                    this.intervalo = setInterval(() => {
                        this.tempoEmSegundos ++;
                    }, 1000);
                    this.$emit("aoIniciarTarefa");
                } else {
                    this.notificar(TipoNotificacao.FALHA, 'Descrição obrigatória', 'O campo descrição deve ser preenchido para iniciar a tarefa');
                }
            },
            finalizar() {
                if(this.projeto) {
                    clearInterval(this.intervalo);
                    this.$emit('aoTempoFinalizado', this.tempoEmSegundos);
                    this.tempoEmSegundos = 0;
                } else {
                    this.notificar(TipoNotificacao.FALHA, 'Projeto obrigatória', 'O campo projeto deve ser preenchido para encerrar esta tarefa');
                }
            }
        }
    });
</script>