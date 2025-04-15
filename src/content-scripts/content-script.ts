
function findPwElement() {
  const pwInput = document.querySelector('input[type=password]')
  
  if(!pwInput) {
    console.log('No password input found, waiting for 2 Secs')
    setTimeout(findPwElement, 2000);
    return
  }

  console.log('Password input found!!! +++') 
  // 
} 


// Condition: IF PASSWORD IS SAVED FOR THIS BOARD!!!
//  - Search for board in local store
//  - If Found
//    - If Title is only "Miro"
//      -> Search for PW Field
//          -> Enter PW if found
//    - ELSE
//      -> STOP searching for PW Field
//      -> Check if Title was Saved already, otherwise -> Save Title to Board!


setTimeout(findPwElement, 2000);
