<template>
    <header>
        <h1>
            <img src="@/assets/logo.png" alt="Logo do Alura Tracker">
        </h1>
        <button class="button" @click="alterarTema">
            {{ acaoBotao }} modo escuro
        </button>
    </header>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'BarraLateral',
        methods: {
            alterarTema() {
                this.modoEscuro = !this.modoEscuro;
                this.$emit('alterarTema', this.modoEscuro);
            }
        },
        data() {
            return({
                modoEscuro: false
            });
        },
        emits: ['alterarTema'],
        computed: {
            acaoBotao() : string {
console.log(this.modoEscuro);
                return(this.modoEscuro ? 'Desativar' : 'Ativar');
            }
        }
    });
</script>

<style scoped> 
    header {
        background: #0d3b66;
        width: 100%;
        height: 100vh;
        padding: 1rem;
        text-align: center;
    }

    .button {
        color: var(--texto-secundario);
        background-color: var(--bg-primario);
    }

    @media only screen and (max-width: 768px) {
        header {
            padding: 2.5rem;
            height: auto;
        }
    }
</style>