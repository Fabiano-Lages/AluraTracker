<template>
    <section>
        <strong class="display">
            {{ tempo }}
        </strong>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: "MarcaTempo",
        props: {
            segundos: {
                type: Number,
                required: true
            }
        },
        computed: {
            tempo() : string {
                return((new Date(this.segundos * 1000)).toISOString().slice(11, 19));
            }
        }
    });
</script>

<style>
    .display {
        color: var(--texto-primario);
    }
</style>