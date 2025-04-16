export function useMiro () {
  function getIdFromUrl (url: string): string {
    const reg = /\/([a-zA-z0-9\-]{11})[=]\//
    const matches = reg.exec(decodeURIComponent(url))
    return matches ? matches[1] : '' 
  } 

  return {
    getIdFromUrl
  }
}