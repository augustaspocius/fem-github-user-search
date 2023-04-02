<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        name: {
            type: String as () => string | null,
            required: true,
        },
        login: {
            type: String,
            required: true,
        },
        joinedDate: {
            type: String,
            required: true,
        },
    },
    methods: {
        formatDate(dateString: string): string {
            const date = new Date(dateString);
            return `${date.getUTCDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getUTCFullYear()}`;
        },
    },
});
</script>
  
<template>
    <div class="profile col-start-2 col-end-3 row-end-2 md:gap-0">
        <div class="info lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:col-span-1">
            <div class="name text-base lg:col-span-1 lg:row-span-1 md:text-2xl font-bold text-lm_dark dark:text-dm_white">
                {{ name || login }}
            </div>
            <div class="handle text-xs lg:col-span-1 lg:row-start-2 lg:row-span-1 md:text-sm pb-2 text-primary">
                @{{ login }}
            </div>
            <div class="joined text-xs lg:col-start-2 lg:col-span-full lg:row-span-1 lg:text-right lg:self-center md:text-sm">
                Joined {{ formatDate(joinedDate) }}
            </div>
        </div>
    </div>
</template>
