
const authReqFilters =  {urls: ['https://miro.com/api/v1/boards/*/public-access-password/verifications']}

let lastPw: string | null = null

chrome.webRequest.onBeforeRequest.addListener( (details) => {
  // @ts-ignore
  var postParams = JSON.parse(decodeURIComponent(String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes))))
  console.log("Request with: ", postParams)
  lastPw = postParams?.password

  return {}
},authReqFilters, ['requestBody'])

chrome.webRequest.onCompleted.addListener( (details) => {
  console.log('Req onComplete', details)
  if (details.statusCode === 200) {
    // GOT CORRECT PASSWORD!!!
    // Save Password and URL!!!
  } else {
    lastPw = null
    // Maybe remove Password if URL was Stored
  }


}, authReqFilters)
