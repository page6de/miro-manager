<template>
  <div>
    <p>{{ defaultText }}</p>
  </div>
</template>

<script lang="ts" setup>
import Vue, { computed, onMounted, ref } from 'vue'

const txt =  ref('hello World')

const defaultText = computed(() => {
  //return browser.i18n.getMessage('extName')
  return txt.value
})

onMounted(() => {
  //browser.runtime.sendMessage({})
  txt.value = txt.value + ' - Mounted!'
})

</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
