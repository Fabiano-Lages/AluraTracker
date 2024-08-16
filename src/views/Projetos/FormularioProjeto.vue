<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" id="nomeDoProjeto" v-model="nomeDoProjeto" class="input" />
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
                <button class="button" type="button" @click="$router.push('/projetos')">
                    Cancelar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { useStore } from '@/store';
    import { Notificacao, Projeto } from '@/store/tipo-mutacoes';
    import { TipoNotificacao } from '@/interfaces/INotificacao';

    export default defineComponent({
        name: 'FormularioProjeto',
        props: {
          id: {
            type: String
          }  
        },
        data() {
            return({
                nomeDoProjeto: "",
            });
        },
        methods: {
            salvar() {
                let acao = "criado";
                if(this.id) {
                    this.store.commit(Projeto.ALTERA, {id: this.id, nome: this.nomeDoProjeto});
                    acao = "alterado";
                } else {
                    this.store.commit(Projeto.ADICIONA, this.nomeDoProjeto);
                }
                this.nomeDoProjeto = "";
                this.store.commit(Notificacao.NOTIFICAR, {
                    titulo: `Projeto ${acao}`,
                    texto: `Projeto ${acao} com sucesso! ;)`,
                    tipo: TipoNotificacao.SUCESSO
                });
                this.$router.push("/projetos");
            }
        },
        mounted() {
            if(this.id) {
                const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
                this.nomeDoProjeto = projeto?.nome || "";
            }
        },
        setup() {
            const store = useStore();
            return { store };
        }
    });
</script>

<style scoped>
    label, span, button {
        color: var(--texto-primario);
    }

    button {
        background-color: var(--bg-primario);
    }
</style>