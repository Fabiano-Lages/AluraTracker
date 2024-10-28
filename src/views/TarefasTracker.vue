<template>
  <FormularioTarefa @tarefaFinalizada="adicionaTarefa" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="email" placeholder="Digite para filtrar" v-model="filtro" />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <BoxTarefa v-if="!listaTarefas || !listaTarefas.length">Nenhuma tarefa criada</BoxTarefa>
    <TarefaDetalhe 
      v-for="tarefa in listaTarefas" 
      :key="tarefa.id" 
      :tarefa="tarefa"
      @tarefa-selecionada="tarefaClicada" 
    />
  </div>

  <ModalTarefa 
    :mostrar="tarefaSelecionada != null"
    titulo="Editando uma tarefa"
    @fecha-modal="fechaModal"
    :data-theme="(modoEscuro ? 'dark' : 'light')"
  >
    <template v-slot:corpo>
      <label for="txtTarefaSelecionada" class="label">Descrição</label>
      <input 
          type="text" 
          id="txtTarefaSelecionada" 
          class="input"
          v-model="descricao"
      />
    </template>
    <template v-slot:rodape>
      <div class="buttons">
          <button class="button is-success" @click="alteraDescricao">Salvar alterações</button>
          <button class="button" @click="fechaModal">Cancelar</button>
      </div>
    </template>
  </ModalTarefa>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from 'vue';
import FormularioTarefa from '@/components/FormularioTarefa.vue';
import BoxTarefa from '@/components/BoxTarefa.vue';
import TarefaDetalhe from '@/components/TarefaDetalhe.vue';
import ITarefa from '@/interfaces/ITarefa';
import ModalTarefa from '@/components/ModalTarefa.vue';
import { useStore } from '@/store';
import { AcaoProjeto, AcaoTarefas } from '@/store/tipo-acoes';

export default defineComponent({
  name: 'TarefasTracker',
  components: {
    FormularioTarefa, TarefaDetalhe, BoxTarefa, ModalTarefa
  },
  setup() {
    const store = useStore();

    const filtro = ref("");
    const tarefaSelecionada = ref<ITarefa | null>(null);
    const descricao = ref("");

    store.dispatch(AcaoProjeto.OBTER_PROJETOS);
    store.dispatch(AcaoTarefas.OBTER_TAREFAS);

    const adicionaTarefa = (tarefa: ITarefa): void => {
      store.dispatch(AcaoTarefas.CADASTRAR_TAREFA, tarefa);
    }

    const tarefaClicada = (tarefa: ITarefa): void => {
      tarefaSelecionada.value = tarefa;
      descricao.value = tarefa.descricao;
    }

    const fechaModal = (): void => {
      tarefaSelecionada.value = null;
      descricao.value = "";
    }

    const alteraDescricao = (): void => {
      if (tarefaSelecionada.value) {
        tarefaSelecionada.value.descricao = descricao.value;
        store.dispatch(AcaoTarefas.ALTERAR_TAREFA, tarefaSelecionada.value )
          .then(() => fechaModal());
      }
    }
    
    watchEffect(() => {
      store.dispatch(AcaoTarefas.OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefaSelecionada,
      listaTarefas: computed(() => store.state.tarefa.tarefas),
      modoEscuro: computed(() => store.state.modoEscuro),
      adicionaTarefa,
      tarefaClicada,
      fechaModal,
      alteraDescricao,
      filtro,
      descricao
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>