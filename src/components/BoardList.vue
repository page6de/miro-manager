<template>
  <div id="board-list">

    <h1 class="card">Stored Miro Boards</h1>

    <div class="scrollable card">
      <div v-for="board in boards" :key="board.id" class="board-entry">
        <h2>{{ getDisplayName(board) }}</h2>
        <div class="options">
          <a href="#" @click="openBoard(board)">open</a>
          <a href="#" @click="copyClip(board.url)">copy URL</a>
          <a href="#" @click="copyClip(board.password)">copy Password</a>
          <a href="#" @click="deleteBoard(board)" class="delete">delete</a>
        </div>
      </div>

    </div>

   
    <div v-if="noBoardsAvailable" class="card">
      <h2>No Boards are save here yet.</h2>
    </div>
  </div>
    
</template>

<script lang="ts" setup>
import { useStorage } from '@/composables/useStorage';
import { MiroBoard } from '@/types/miro-types';
import { computed, onMounted, ref } from 'vue';

const { getBoards, deleteBoardById } = useStorage()
const boards = ref<MiroBoard[]>([])
const noBoardsAvailable = ref(false)

function getDisplayName(board: MiroBoard): string {
  return board.title ? board.title : board.url
}

function openBoard(board: MiroBoard) {
  window.open(board.url)
}

async function copyClip(string: string) {
  await navigator.clipboard.writeText(string)
}

async function deleteBoard(board: MiroBoard) {
  await deleteBoardById(board.id)
  await updateBoards()
}

async function updateBoards() {
  boards.value = await getBoards()
  if(!boards.value.length) noBoardsAvailable.value = true;
}

onMounted(async () => {
  await updateBoards()
}) 

</script>

<style lang="scss">
h1 {
  display: inline-block;
}

.card {
  background-color: #FFFFFF;
  color: rgb(26,27,30);
  padding: .5rem 1rem;
  border-radius: .5rem;
  margin: .5rem;

  .board-entry {
    padding-bottom: 1rem;
    margin-bottom: 1rem; 
  }

  h2 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .options {
    a {
      font-size: .7rem;
      color: rgb(57, 59, 66);
      text-decoration: none;
      display: inline-block;
      padding: .2rem .4rem;
      margin-right: 2px;
      border-radius: .2rem;
      background-color: #F9F9FA;


      &:hover {
        background-color: rgb(232,	236,	252	);
        color: rgb(56,	89,	255	);
      }
      
      &.delete:hover {
        background-color: rgb(252, 232, 232);
        color: rgb(255, 56, 56);
      }
    }
  }

}
</style>