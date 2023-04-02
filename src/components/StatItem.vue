<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
    },
});
</script>
  
<template>
    <div class="flex flex-col justify-center items-center md:items-start gap-2">
        <span class="text-xs md:text-sm">{{ label }}</span>
        <span class="text-base md:text-xl font-bold text-lm_dark dark:text-dm_white">{{ value }}</span>
    </div>
</template>
  