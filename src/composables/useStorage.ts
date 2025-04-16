import { MiroBoard } from "@/types/miro-types"


export function useStorage () {
  
  
  async function getBoards(): Promise<MiroBoard[]> {
    return loadBoardsFromStore()
  }

  async function saveBoard(board: MiroBoard) {
    const boards = await loadBoardsFromStore()
    const index = boards.findIndex( storedBoard => storedBoard.id === board.id)
    if (index > -1) {
      boards[index] = board
    } else {
      boards.push(board)
    }
    return await saveBoards(boards)
  }

  async function deleteBoardById(id: string): Promise<Boolean> {
    const boards = await loadBoardsFromStore()
    const index = boards.findIndex( board => board.id === id)
    if (index > -1) {
      boards.splice(index, 1);
      await saveBoards(boards)
      return true
    }
    return false
  }

  async function getBoardById(id: string): Promise<MiroBoard | null> {
    const boards = await loadBoardsFromStore()
    const index = boards.findIndex( board => board.id === id)
    return index > -1 ? boards[index] : null
  }

  // Private 
  async function loadBoardsFromStore(): Promise<MiroBoard[]> {
    const data = await chrome.storage.local.get('boards')
    return (data && data.boards ? data.boards : []) as MiroBoard[]
  }

  async function saveBoards(boards: MiroBoard[]) {
    return await chrome.storage.local.set({boards: boards})
  }
  
  return {
    getBoardById,
    getBoards,
    saveBoard,
    deleteBoardById
  }
} 