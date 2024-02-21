import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { MapElement } from '../types/shared';

function Level() {
  const { mapHeight, mapWidth, map } = useSelector((state: RootState) => state.game);

  // Convert 1-D array to 2-D array
  const gameMap: MapElement[][] = [];
  for (let i = 0; i < mapHeight; i++) {
    gameMap.push(map.slice(i * mapWidth, (i + 1) * mapWidth));
  }

  // Helper function for mapping characters to CSS classes
  const handleCharacterStyle = (char: MapElement) => {
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
        {gameMap.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((square, colIndex) => (
              <td
                className={handleCharacterStyle(square)}
                data-index={rowIndex * mapWidth + colIndex}
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

export default Level;
