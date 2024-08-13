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
                    alert("Descrição obrigatória");
                }
            },
            finalizar() {
                clearInterval(this.intervalo);
                this.$emit('aoTempoFinalizado', this.tempoEmSegundos);
                this.tempoEmSegundos = 0;
            }
        }
    });
</script>