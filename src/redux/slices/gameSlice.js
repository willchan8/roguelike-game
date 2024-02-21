import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BFS from '../../utils/BFS';

const initialState = {
  mapHeight: 0,
  mapWidth: 0,
  // 1 dimensional array representing the map
  map: [],

  player: {
    // Index in map array indicating where the player currently is
    position: 0,
    // Player's current health
    hp: 100,
    // How much the player will damage enemies for.
    damage: 1,
  },
  enemies: [
    // {
    //   hp: 5,
    //   damage: 1,
    //   position: index,
    // },
  ],
  log: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    movePlayer: (state, action) => {
      const keyCode = action.payload;

      const mapWidth = state.mapWidth;
      const mapHeight = state.mapHeight;

      // Make copies of individual states to prevent mutating original state
      let log = [...state.log];
      let map = [...state.map];
      let enemies = state.enemies.map((enemy) => Object.assign({}, enemy));
      let player = Object.assign({}, state.player);

      // Player's position at start of turn
      let prevPlayerPosition = player.position;

      let nextPlayerPosition = {
        37: prevPlayerPosition - 1,
        38: prevPlayerPosition - mapWidth,
        39: prevPlayerPosition + 1,
        40: prevPlayerPosition + mapWidth,
      }[keyCode];

      let nextPlayerDirection = {
        37: 'west',
        38: 'north',
        39: 'east',
        40: 'south',
      }[keyCode];

      // Player (@) is only able to move onto any adjacent '.' tile
      if (map[nextPlayerPosition] === '.') {
        // If the player (@) started a turn adjacent to an enemy (e) and moves away, the player (@) gets attacked by that enemy (e).
        enemies.forEach((enemy) => {
          if (
            prevPlayerPosition === enemy.position - 1 ||
            prevPlayerPosition === enemy.position + 1 ||
            prevPlayerPosition === enemy.position - mapWidth ||
            prevPlayerPosition === enemy.position + mapWidth
          ) {
            player.hp -= enemy.damage;
            log.push('enemy attacked player');
          }
        });
        // Update player (@) position and add message to log copy
        player.position = nextPlayerPosition;
        map[player.position] = '@';
        map[prevPlayerPosition] = '.';
        log.push(`player moved ${nextPlayerDirection}`);
      }

      // Player (@) attacks enemies (e)
      if (map[nextPlayerPosition] === 'e') {
        enemies.forEach((enemy) => {
          if (nextPlayerPosition === enemy.position) {
            enemy.hp -= player.damage;
            log.push('player attacked enemy');
          }
          // Remove enemy (e) from game if its health is 0 or less
          if (enemy.hp <= 0) {
            enemies = enemies.filter((enemy) => !(enemy.hp <= 0));
            map[enemy.position] = '.';
          }
        });
      }

      // Move enemies (e) toward player (@) using BFS utility function
      enemies.forEach((enemy) => {
        let enemyMoves = BFS(enemy.position, prevPlayerPosition, map, mapWidth, mapHeight);
        let nextEnemyPosition = enemyMoves[0];
        let prevEnemyPosition = enemy.position;
        // Enemies (e) don't move onto this position if it was previously occupied by the player (@). Also prevents bugs where both enemies would overlap.
        if (map[nextEnemyPosition] === '.' && nextEnemyPosition !== prevPlayerPosition) {
          enemy.position = nextEnemyPosition;
          map[enemy.position] = 'e';
          map[prevEnemyPosition] = '.';
        }
        // Enemies (e) adjacent to the player (@) will attack if player (@) doesn't move
        if (nextEnemyPosition === player.position && prevPlayerPosition === player.position) {
          player.hp -= enemy.damage;
          log.push('enemy attacked player');
        }
      });

      state.map = map;
      state.player = player;
      state.enemies = enemies;
      state.log = log;
    },
    setMapSize: (state, action) => {
      const { height, width } = action.payload;
      let map = [];
      const dimension = height * width;

      for (let i = 0; i < dimension; i++) {
        // Place walls on perimeter of the level
        if (i % width === 0 || (i + 1) % width === 0 || i <= width || i > dimension - width) {
          map.push('#');
        } else {
          map.push('.');
        }
      }
      // Put player in top-left corner
      map[width + 1] = '@';
      // let player = Object.assign({}, state.player);
      state.player.position = width + 1;
      state.mapHeight = height;
      state.mapWidth = width;
      state.map = map;
      // state.player = player;
    },
    addEnemy: (state, action) => {
      const index = action.payload;
      if (state.map[index] !== '@' && state.map[index] !== '#') {
        state.map[index] = 'e';
        state.enemies.push({
          hp: 5,
          damage: 1,
          position: index,
        });
      }
    },
  },
});

export const { movePlayer, setMapSize, addEnemy } = gameSlice.actions;

export default gameSlice.reducer;
