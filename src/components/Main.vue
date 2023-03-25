<script setup lang="ts">
  import Header from './Header.vue';
  import User from './User.vue';
</script>

<template>
  <main class="container main flex flex-col justify-center font-spacemono gap-4 text-lm_darkblue dark:text-dm_white
                min-w-[20.4375rem] max-w-[45.625rem] mx-auto">
      <Header></Header>      
      <User></User>
  </main>
</template>
