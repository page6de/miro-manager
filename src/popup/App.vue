<template>
  <h1>Stored Miro Boards</h1>
  <BoardList />
</template>

<script lang="ts" setup>

import BoardList from '@/components/BoardList.vue';

</script>

<style>
html {
  width: 400px;
  height: 400px;
  background-color: rgb(242,242,242);
}
h1 {
  margin-left: 1rem;
}
</style>
