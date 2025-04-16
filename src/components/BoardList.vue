<template>
  <div id="board-list">
    <table>
      <tr>
        <th>Title</th>
        <th>URL</th>
        <th>&nbsp;</th>
      </tr>
      <tr v-for="board in boards" :key="board.id">
        <td>{{ board.title }}</td>
        <td>{{ board.url }}</td>
        <td>
          <a href="#">open</a>
          <a href="#">copy PW</a>
        </td>
      </tr>
    </table>
    <div v-if="noBoardsAvailable">
      <h3>No Boards are save here yet.</h3>
    </div>
  </div>
    
</template>

<script lang="ts" setup>
import { useStorage } from '@/composables/useStorage';
import { MiroBoard } from '@/types/miro-types';
import { computed, onMounted, ref } from 'vue';

const { getBoards } = useStorage()
const boards = ref<MiroBoard[]>([])
const noBoardsAvailable = ref(false)

onMounted(async () => {
  boards.value = await getBoards()
  if(!boards.value.length) noBoardsAvailable.value = true;
}) 

</script>

<style>

</style>