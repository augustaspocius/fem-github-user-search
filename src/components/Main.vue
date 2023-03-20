<script setup lang="ts">
  import Header from './Header.vue';
  import User from './User.vue';
</script>

<template>
  <main class="container main flex flex-col justify-center font-spacemono gap-4 text-lm_darkblue dark:text-dm_white">
      <Header></Header>      
      <User></User>
  </main>
</template>

<style>

.main {
  min-width: 20.4375rem;
  max-width: 45.625rem;
}

</style>
