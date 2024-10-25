<template>
   <div class="modal" :class="{ 'is-active': tarefaSelecionada }">
      <div class="modal-background"></div>
      <div class="modal-card">
         <header class="modal-card-head">
            <p class="modal-card-title">Editando uma tarefa</p>
            <button class="delete" aria-label="close" @click="$emit('fechar-modal')"></button>
         </header>
         <section class="modal-card-body">
            <label for="txtTarefaSelecionada" class="label">Descrição</label>
            <input 
               type="text" 
               id="txtTarefaSelecionada" 
               class="input"
               v-model="descricao"
            />
         </section>
         <footer class="modal-card-foot">
            <div class="buttons">
               <button class="button is-success" @click="$emit('novo-valor', descricao)">Salvar alterações</button>
               <button class="button" @click="$emit('fechar-modal')">Cancelar</button>
            </div>
         </footer>
      </div>
   </div>
</template>

<script lang="ts">
   import ITarefa from '@/interfaces/ITarefa';
   import { defineComponent, PropType } from 'vue';

   export default defineComponent({
      name: 'ModalTarefa',
      props: {
         tarefaSelecionada: {
            type: Object as PropType<ITarefa>,
            required: true
         }
      },
      data() {
         return({
            descricao: this.tarefaSelecionada.descricao
         });
      },
      emits: ['fechar-modal', 'novo-valor']
   });
</script>