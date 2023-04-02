<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        props: {
            src: {
                type: String,
                required: true,
            },
        },
    });
</script>

<template>
    <div class="max-w-[117px] col-end-2 row-end-2 m-auto">
      <img class="rounded-full" :src="src" alt="profile image" />
    </div>
</template>