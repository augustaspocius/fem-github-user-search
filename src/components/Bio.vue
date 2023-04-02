<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    
    export default defineComponent({
        props: {
            bio: {
            type: String as () => string | null,
                required: true,
            },
        },
    });
</script>
  
<template>
    <div class="col-span-full lg:col-start-2 row-start-2 row-end-3 text-xs md:text-sm leading-6 pt-6 pb-8 lg:mt-[-4rem]">
        {{ bio || 'This profile has no bio.' }}
    </div>
</template>
