<script lang="ts">
import { createApp, ref, defineComponent } from 'vue';

export default defineComponent({
  props: {
    error: {
      type: String,
      required: false,
    },
  },
  setup(_, context) {
    const searchQuery = ref('');
    
    const iconSrc = '/assets/icon-search.svg';

    function search() {
      context.emit('search', searchQuery.value);
    }

    return {
      searchQuery,
      search,
      iconSrc,
    };
  },
});
</script>

<template>
  <div class="search flex flex-row justify-between gap-2 py-2 pl-3 pr-2 rounded-2xl border-0 bg-lm_white dark:bg-dm_darkblue shadow-xl darkfocus:outline-none">
    <img class="object-contain w-6 md:m-4" :src="iconSrc" alt="search icon"/>
    <input
      v-model="searchQuery"
      @keyup.enter="search"
      type="text"
      class="search-input bg-transparent w-full focus:outline-none placeholder:text-xs md:placeholder:text-base placeholder:text-lm_darkblue dark:placeholder:text-lm_white hover:cursor-pointer caret-primary"
      placeholder="Search GitHub username…"
    />
    <span v-if="error" class="flex flex-shrink-0 justify-center items-center text-red-500 text-sm font-bold">{{ error }}</span>
    <button @click="search" class="inline button bg-primary font-bold rounded-xl text-sm md:text-base px-4 md:px-6 py-3 text-lm_white hover:bg-primarydimmed">Search</button>
  </div>
</template>
