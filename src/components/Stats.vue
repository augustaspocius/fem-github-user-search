<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({});
</script>

<template>
    <div class="stats col-span-full lg:col-start-2 row-start-3 row-end-4 grid grid-cols-3 justify-evenly rounded-2xl bg-lm_whitegrey dark:bg-dm_black py-5 md:py-4 px-4 md:px-8">
        <slot></slot>
    </div>
</template>
