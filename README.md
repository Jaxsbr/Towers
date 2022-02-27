# Towers
I've always been facinated with tower defence games. This genre got me into programming and thus, I feel very strongly about getting a fun playable game out that everyone can enjoy.
My idea is to get the game 95% polished before doing any art or fancy effects, so dev art will have to do :(


## Play
https://jaxsbr.github.io/Towers/


## Run
```
npm install
npm run dev
```


## Game Plan
- https://www.mindmeister.com/1220984067


## Goal
- Create a fun tower defence with TypeScript
- Learning Webpack, build/bundle
- Host and deploy on AWS
- Open game to public, track scores


## Bugs
- Undefine Bounds error freezes the game
  - Launch the game
  - Open devtools F12
  - Wait until you see an eney moving
  - Right/Left click anyware outside the blue game rectangle
  - bug: Game freezes
  - bug: Console shows a undefine error (reading 'bounds')
  - expectation: Game proceeds without freezing of logging a console error

- Towers on path
  - Launch the game
  - Place a tower on the enemy path
  - bug: tower is placed on path
  - bug: enemies can move through the tower on the path
  - expectation: No tower is placed, enemy path tile below cursor is highlighted in red to show placement is invalid

- Single tower per tile
  - Launch the game
  - Open devtools F12
  - Place a tower on a tile
  - Notice the coordinates for the tower is logged
  - bug: Place another tower on the same tile
  - bug: Notice the coordinates for the 2nd tower is logged at the same position
  - expectation: Hovering over an occupied tile higlights in red to show placement is invalid.
  - expectation: Clicking over an occupied tile does not add another tower, nor logs out coordinates

- Place tower without user selected tower option
  - Click anywhere on the blue game screen
  - bug: A tower is placed
  - expectation: A tower is first selected via a menu item and visually selected. Then on selection a tower is placed
  - expectation: Without a item selection, nothing is added when the game are is clicked
