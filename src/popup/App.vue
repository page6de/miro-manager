<template>
  <hello-world />
  <BoardList />
</template>

<script lang="ts" setup>

import BoardList from '@/components/BoardList.vue';
import HelloWorld from '@/components/HelloWorld.vue'

</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
