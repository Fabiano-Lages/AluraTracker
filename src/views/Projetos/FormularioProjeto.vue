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
    import { defineComponent, ref } from 'vue';
    import { useStore } from '@/store';
    import { AcaoProjeto } from '@/store/tipo-acoes';
    import useNotificar from '@/hooks/notificador';
    import { TipoNotificacao } from '@/interfaces/INotificacao';
    import { useRouter } from 'vue-router';

    export default defineComponent({
        name: 'FormularioProjeto',
        props: {
          id: {
            type: Number
          }  
        },
        setup(props) {
            const router = useRouter();
            const store = useStore();
            const nomeDoProjeto = ref("");

            if(props.id) {
                const projeto = store.state.projeto.projetos.find(
                    proj => proj.id == props.id
                );
                nomeDoProjeto.value = projeto?.nome || "";
            }

            const { notificar } = useNotificar();
            
            const salvar = () => {
                let acao = "criado";
                let promessa = null;
                if(props.id) {
                    promessa = store.dispatch(AcaoProjeto.ALTERAR_PROJETO, {id: props.id, nome: nomeDoProjeto.value});
                    acao = "alterado";
                } else {
                    promessa = store.dispatch(AcaoProjeto.CADASTRAR_PROJETO, nomeDoProjeto.value);
                }

                if(promessa) {
                    promessa.then(() => {
                        nomeDoProjeto.value = "";
                        notificar(TipoNotificacao.SUCESSO, `Projeto ${acao}`, `Projeto ${acao} com sucesso! ;)`);
        
                        router.push("/projetos");
                    });
                }
            };

            return { 
                store, 
                nomeDoProjeto,
                salvar
            };
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