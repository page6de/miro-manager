# miro-manager

A Browser Extension, that helps with Miro Board Password chaos


## Workflow:


#### Run on unsaved board
- Add Content Script for miro.com/*
- Search for Password Field after load
- Add listener for login -> Ask for saving that borad/PW
  -> Save URL + PW
- after load: Check for title
  -> Save title for saved URL 


#### Run on saved board
 - Wait for page to load
 - Find PW Field
 - Enter PW
 - Submit PW Form

#### Popup:
 - List all saved Boards
 - 
