import { useMiro } from "./composables/useMiro"
import { useStorage } from "./composables/useStorage"
import { MiroBoard } from "./types/miro-types"

const authReqFilters =  {urls: ['https://miro.com/api/v1/boards/*/public-access-password/verifications']}

let lastPw: string | null = null

const { getBoardById, saveBoard, getBoards } = useStorage()
const { getIdFromUrl } = useMiro()


chrome.webRequest.onBeforeRequest.addListener( (details) => {
  // @ts-ignore
  var postParams = JSON.parse(decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes))))
  lastPw = postParams?.password

  return {}
},authReqFilters, ['requestBody'])

chrome.webRequest.onCompleted.addListener( async (details) => {
  const boardId = getIdFromUrl(details.url)
  if (details.statusCode === 200) {
    if (lastPw) {
      let board = await getBoardById(boardId)
      if (board) {
        if (board.password !== lastPw) {
          board.password = lastPw
          const saveRes = await saveBoard(board)
          lastPw = null
        }
      } else {
        board = {
          id: boardId,
          title: '',
          url: details.url,
          password: lastPw,
          addedAt: new Date()
        }
        const saveRes = await saveBoard(board)
        
        lastPw = null
      }
    }

    //chrome.runtime.sendMessage({loginSuccess: boardId})

  } else {
    lastPw = null
    // Maybe remove Password if URL was Stored 
    // ASK FOR REMOVAL!!!
  }


}, authReqFilters)
