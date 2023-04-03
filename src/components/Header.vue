<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const toggleDarkMode = () => {
  store.commit('toggleDarkMode');
  document.documentElement.classList.toggle('dark');
};

const isDarkMode = computed(() => store.state.isDarkMode);
</script>

<template>
  <div
    class="header font-bold flex flex-row justify-between items-center pb-5"
  >
    <span class="text-2xl text-lm_dark dark:text-dm_white">devfinder</span>
    <div
      class="uppercase text-sm cursor-pointer"
      @click="toggleDarkMode"
    >
      <a
        class="flex items-center gap-4 text-lm_darkblue hover:text-lm_dark"
        :class="{ 'text-dm_white hover:text-dm_blue': isDarkMode }"
      >
        <span
          class="tracking-widest"
          :class="{ 'text-dm_white hover:text-dm_blue': isDarkMode }"
        >{{ !isDarkMode ? 'Dark' : 'Light' }}</span>
        <img
          class="inline"
          :src="!isDarkMode ? 'assets/icon-moon.svg' : 'assets/icon-sun.svg'"
          alt="theme icon"
        />
      </a>
    </div>
  </div>
</template>
