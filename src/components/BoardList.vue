<template>
  <div id="board-list">

    <div class="header">

      <h1 class="card small"> 
        <img class="logo" src="/icons/38.png"/>
        Stored Boards
      </h1>
      <div class="card small search">
        <div class="input-container">
          <input class="search-input" v-model="searchQuery"/>
          <SearchIcon/>
        </div>
      </div>
    </div>

    <div class=" card">
      <div class="scrollable">

        <div v-for="board in filteredBoards" :key="board.id" class="board-entry" :class="{active: board.id==activeMiroId}">
          <h2>{{ getDisplayName(board) }}</h2>
          <div class="url">
            <a href="#" @click="openBoard(board)">
              {{ board.url }}
              <OpenIcon/>
            </a>
          </div>
          <div class="options">
            <a href="#" @click="copyClip(board.url)">
              <CopyIcon/>
              copy URL
            </a>
            <a href="#" @click="copyClip(board.password)">
              <CopyIcon/>
              copy Password
            </a>
            <a href="#" @click="deleteBoard(board)" class="delete">
              <ThrashIcon/>
              delete
            </a>
          </div>
        </div>
      </div>
      
      <h2 v-if="noBoardsAvailable">No Boards are save here yet.</h2>
    </div>
  </div>
    
</template>

<script lang="ts" setup>
import { useStorage } from '@/composables/useStorage';
import { useMiro } from '@/composables/useMiro';
import { MiroBoard } from '@/types/miro-types';
import { computed, onMounted, ref } from 'vue';
import OpenIcon from './OpenIcon.vue';
import CopyIcon from './icons/CopyIcon.vue';
import ThrashIcon from './icons/ThrashIcon.vue';
import SearchIcon from './icons/SearchIcon.vue';

const { getBoards, deleteBoardById } = useStorage()
const { getActiveMiroBoardId } = useMiro()

const searchQuery = ref('')
const boards = ref<MiroBoard[]>([])
const noBoardsAvailable = ref(false)
const activeMiroId = ref('')

const filteredBoards = computed(()=>{
  let filteredBoardList = boards.value
  if (searchQuery.value != '') {
    filteredBoardList = filteredBoardList.filter( 
      (board) => board.title.toLocaleLowerCase().indexOf(searchQuery.value.toLocaleLowerCase()) > -1
    )
  }
  filteredBoardList.sort((a, b) => a.addedAt > b.addedAt ? -1 : 1)
  return filteredBoardList
})

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
  activeMiroId.value = await getActiveMiroBoardId()
}) 

</script>

<style lang="scss">
.header {
  display: flex;

  & > * {
    flex-grow: 1;
  }
}

.search {
  .input-container {
    border: 1px solid #b3b7c7;
    border-radius: 6px;
    padding: 4px .5rem 0;
    height: 22px;
    overflow: hidden;

    svg {
      height: 15px;
      vertical-align: sub;
    }
    .search-input {
      border: 0;
      width: 110px;
      font-size: .8rem;

      &:focus {
        border: 0;
        border-color: transparent;
        outline: none;
      }
    }
  }
}

h1 {
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 500;

  .logo {
    height: 24px;
    vertical-align: sub;
    margin-right: 4px;
    border-radius: 4px;
  }
}

.scrollable {
  overflow-y: scroll;
  height: 350px;
}

.card {
  background-color: #FFFFFF;
  color: rgb(26,27,30);
  padding: 1rem;
  border-radius: .5rem;
  margin: .5rem;

  &.small {
    padding: .5rem;
  }

  .board-entry {
    padding-bottom: 1rem;
    margin-bottom: 1rem; 
    border-radius: .25rem;
    padding: .5rem;

    &.active {
      background-color: rgba(232,	236,	252, .5	);
    }
  }

  h2 {
    font-size: 1rem;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: .25rem;
  }

  .url, .options {
    svg {
      height: .75rem;
      vertical-align: bottom;
    }
  }

  .url {
    margin-bottom: .5rem;

    a {
      text-decoration: none;
      color: rgb(78, 96, 187);

      &:hover {
        color: rgb(56,	89,	255	);
      }
    }
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