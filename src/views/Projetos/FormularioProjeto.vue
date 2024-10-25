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
    import { AcaoProjeto } from '@/store/tipo-acoes';
    import { notificacaoMixin } from '@/mixins/notificar';
    import { TipoNotificacao } from '@/interfaces/INotificacao';

    export default defineComponent({
        name: 'FormularioProjeto',
        props: {
          id: {
            type: Number
          }  
        },
        mixins: [notificacaoMixin],
        data() {
            return({
                nomeDoProjeto: "",
            });
        },
        methods: {
            salvar() {
                let acao = "criado";
                let promessa = null;
                if(this.id) {
                    promessa = this.store.dispatch(AcaoProjeto.ALTERAR_PROJETO, {id: this.id, nome: this.nomeDoProjeto});
                    acao = "alterado";
                } else {
                    promessa = this.store.dispatch(AcaoProjeto.CADASTRAR_PROJETO, this.nomeDoProjeto);
                }

                if(promessa) {
                    promessa.then(() => {
                        this.nomeDoProjeto = "";
                        this.notificar(TipoNotificacao.SUCESSO, `Projeto ${acao}`, `Projeto ${acao} com sucesso! ;)`);
        
                        this.$router.push("/projetos");
                    });
                }
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