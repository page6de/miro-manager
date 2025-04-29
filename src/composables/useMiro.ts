export function useMiro () {
  function getIdFromUrl (url: string): string {
    const reg = /\/([a-zA-z0-9\-]{11})[=]\//
    const matches = reg.exec(decodeURIComponent(url))
    return matches ? matches[1] : '' 
  } 

  async function getActiveMiroBoardId() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    if (/http(s):\/\/miro\.com.?/.test(tab.url ?? '') ) {
      return getIdFromUrl(tab.url!) 
    }
    return '';
  }

  return {
    getIdFromUrl,
    getActiveMiroBoardId
  }
}