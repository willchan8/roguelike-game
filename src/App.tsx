import { useEffect } from 'react';
import './styles/index.css';
import { useDispatch } from 'react-redux';
import { movePlayer, setMapSize, addEnemy } from './redux/slices/gameSlice';
import Level from './components/Level';
import Logger from './components/Logger';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleKeyDown() {
      window.addEventListener(
        'keydown',
        (e) => {
          const arrowKeys = new Set([37, 39, 38, 40]);
          if (arrowKeys.has(e.keyCode)) {
            dispatch(movePlayer(e.keyCode));
          }
        },
        false
      );
    }

    // Helper callback for identifying index of tiles.
    function handleClick() {
      window.addEventListener(
        'click',
        (e) => {
          const index = Number((e.target as HTMLElement).getAttribute('data-index'));
          if (index === 0 || index === undefined) return;
          console.log(`clicked index: ${index}`);
        },
        false
      );
    }

    function initState() {
      dispatch(setMapSize({ width: 20, height: 10 }));
      dispatch(addEnemy(154));
      dispatch(addEnemy(157));
    }

    handleKeyDown();
    handleClick();
    initState();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <Level />
      <Logger />
    </>
  );
}

export default App;
