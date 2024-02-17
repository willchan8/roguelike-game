import React from 'react';
import { connect } from 'react-redux';

/**
 * Convert the map from a 1-D array to a 2-D array.
 *
 * @param {object} mapHeight - the height of the map
 * @param {object} mapWidth - the width of the map
 * @param {array} map - the 1-D array map
 * @return {JSX} a table element representing the 2-D map
 */
function Level({ mapHeight, mapWidth, map }) {
  // Convert 1-D array to 2-D array
  const newMap = [];
  for (let i = 0; i < mapHeight; i++) {
    newMap.push(map.slice(i * mapWidth, (i + 1) * mapWidth));
  }

  // Helper function for mapping characters to CSS classes
  const handleCharacterStyle = (char) => {
    return {
      '@': 'player',
      e: 'enemy',
      '#': 'wall',
      '.': 'text',
    }[char];
  };

  return (
    <table className="table">
      <tbody>
        {newMap.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((square, colIndex) => (
              <td
                className={handleCharacterStyle(square)}
                index={rowIndex * mapWidth + colIndex}
                key={rowIndex * mapWidth + colIndex}
              >
                {square}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * Maps state properties to component props.
 *
 * @param {object} state - The state object
 * @return {object} The mapped props object
 */
const mapStateToProps = (state) => ({
  mapHeight: state.mapHeight,
  mapWidth: state.mapWidth,
  map: state.map,
  player: state.player,
});

export default connect(mapStateToProps)(Level);
