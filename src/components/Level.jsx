import { useSelector } from 'react-redux';

function Level() {
  const { mapHeight, mapWidth, map } = useSelector((state) => state.game);

  // Convert 1-D array to 2-D array
  const gameMap = [];
  for (let i = 0; i < mapHeight; i++) {
    gameMap.push(map.slice(i * mapWidth, (i + 1) * mapWidth));
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
        {gameMap.map((row, rowIndex) => (
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

export default Level;
