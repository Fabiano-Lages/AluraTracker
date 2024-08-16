<template>
    <header>
        <h1>
            <img src="@/assets/logo.png" alt="Logo do Alura Tracker">
        </h1>
        <button class="button" @click="alterarTema">
            {{ acaoBotao }} modo escuro
        </button>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <RouterLink to="/" class="link">
                        <i class="fas fa-tasks"></i>
                        Tarefas
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/projetos" class="link">
                        <i class="fas fa-project-diagram"></i>
                        Projetos
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'BarraLateral',
        methods: {
            alterarTema() {
                this.$emit('alterarTema');
            }
        },
        props: {
            modoEscuro: Boolean
        },
        emits: ['alterarTema'],
        computed: {
            acaoBotao() : string {
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

    .panel li {
        margin: 8px 0;
        text-align: left;
        padding: 0 1rem;
    }

    .link {
        color: #fff;
    }

    .link:hover {
        color:#FAF0CA;
    }

    .link.router-link-active {
        color:#FAF0CA;
    }

    @media only screen and (max-width: 768px) {
        header {
            padding: 2.5rem;
            height: auto;
        }
    }
</style>