import { useStorage } from "@/composables/useStorage"
import { useMiro } from "@/composables/useMiro"

const { getBoardById, saveBoard } = useStorage()
const { getIdFromUrl } = useMiro()

const boardId = getIdFromUrl(location.href)
const board = await getBoardById(boardId)

function findPwElement(): Promise<HTMLInputElement> {
  return new Promise((resolve, reject) => {
    const pwInput = document.querySelector('input[type=password]')
    if (!pwInput) {
      reject(null)
    }
    resolve(pwInput as HTMLInputElement)
  })
} 

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function checkMiroLoadingState() {
  if (board && board.password) {
    for (let i=0; i<10; i++) {
      let boardTitle = document.querySelector('title')?.textContent
      if (boardTitle && boardTitle !== 'Miro') {
        // Now the board seems loaded and no PW is needed anymore
        if (board.title !== boardTitle) {
          board.title = boardTitle
          await saveBoard(board)
        }
        break;

      } else {
        try {
          const pwInput = await findPwElement()
          if (pwInput.value === '') {
            pwInput.focus()
            document.execCommand('insertText', false, board.password)
            pwInput.dispatchEvent(new Event('change', {bubbles: true}))
            
            await wait(5000)
            checkMiroLoadingState();
          }

          break;
        } catch (e) {
          await wait(2000)
        }
      }
    }
  }
} 


checkMiroLoadingState()

// @ToDo: ON MESSAGE LOGIN SUCCESS
chrome.runtime.onMessage.addListener((message) => {
  if (message.loginSuccess && message.loginSuccess == boardId) {
    if (board?.title === '') {
      for (let i=0; i<10; i++) {
        let boardTitle = document.querySelector('title')?.textContent
        if (boardTitle && boardTitle !== 'Miro') {
          board.title = boardTitle
          saveBoard(board)
          break;
        }
      }
    }
    return true
  }
})


// Condition: IF PASSWORD IS SAVED FOR THIS BOARD!!!
//  - Search for board in local store
//  - If Found
//    - If Title is only "Miro"
//      -> Search for PW Field
//          -> Enter PW if found
//    - ELSE
//      -> STOP searching for PW Field
//      -> Check if Title was Saved already, otherwise -> Save Title to Board!

