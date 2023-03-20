<script lang="ts">
  import { createApp, ref } from 'vue';

  export default {
    setup(_, context) {
      const searchQuery = ref('');

      function search() {
        context.emit('search', searchQuery.value);
      }

      return {
        searchQuery,
        search,
      };
    },
  };
</script>

<template>
  <div class="search flex flex-row justify-between gap-2 py-2 pl-3 pr-2 rounded-2xl border-0 bg-lm_white dark:bg-dm_darkblue shadow-xl darkfocus:outline-none">
    <img class="object-contain w-6" src="assets/icon-search.svg" />
    <input
      v-model="searchQuery"
      @keyup.enter="search"
      type="text"
      class="search-input bg-transparent w-full focus:outline-none placeholder:text-lm_darkblue dark:placeholder:text-lm_white"
      placeholder="Search GitHub username…"
    />
    <button @click="search" class="inline button bg-primary font-bold rounded-xl text-sm px-4 py-3 text-lm_white">Search</button>
  </div>
</template>

<style>

.search-input::placeholder {
  font-size: 13px;
}

</style>
