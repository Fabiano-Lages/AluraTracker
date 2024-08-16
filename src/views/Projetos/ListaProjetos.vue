<template>
    <section>
        <RouterLink to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </RouterLink>

        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in lstProjetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <RouterLink :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </RouterLink>
                        <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

    </section>
</template>

<script lang="ts">
    import { useStore } from '@/store';
    import { Projeto } from '@/store/tipo-mutacoes';
    import { defineComponent, computed } from 'vue';

    export default defineComponent({
        name: 'ListaProjetos',
        methods: {
            excluir(id: string) {
                if(confirm("Confirma a exclusão do projeto?")) {
                    this.store.commit(Projeto.EXCLUI, id);
                }
            }
        },
        setup() {
            const store = useStore();
            return({
                store,
                lstProjetos: computed(() => store.state.projetos)
            });
        }
    })
</script>

<style scoped>
    a.button {
        color: var(--texto-primario);
        background-color: var(--bg-primario);
    }

    button.is-danger {
        color: white;
    }

    table, td, th {
        color: var(--texto-primario) !important;
        background-color: var(--bg-primario);
    }
</style>