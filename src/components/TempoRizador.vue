<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <MarcaTempo :segundos="tempoEmSegundos" />

        <BotaoControle funcao="play" :inativo="executando" @click="iniciar" />

        <BotaoControle funcao="stop" :inativo="!executando" @click="finalizar" />
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import MarcaTempo from './MarcaTempo.vue';
    import BotaoControle from './BotaoControle.vue';
    import { useStore } from '@/store';
    import { Notificacao } from '@/store/tipo-mutacoes';
    import { TipoNotificacao } from '@/interfaces/INotificacao'; //INotificacao from '@/interfaces/INotificacao';

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
            Projeto: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                tempoEmSegundos: 0,
                intervalo: null
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
                    this.store.commit(Notificacao.NOTIFICAR, {
                        titulo: 'Descrição obrigatória',
                        texto: 'O campo descrição deve ser preenchido para iniciar a tarefa',
                        tipo: TipoNotificacao.FALHA
                    });
                }
            },
            finalizar() {
                if(this.Projeto) {
                    clearInterval(this.intervalo);
                    this.$emit('aoTempoFinalizado', this.tempoEmSegundos);
                    this.tempoEmSegundos = 0;
                } else {
                    this.store.commit(Notificacao.NOTIFICAR, {
                        titulo: 'Projeto obrigatória',
                        texto: 'O campo projeto deve ser preenchido para encerrar esta tarefa',
                        tipo: TipoNotificacao.FALHA
                    });
                }
            }
        },
        setup() {
            const store = useStore();
            return ({ store });
        }
    });
</script>