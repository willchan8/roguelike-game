import { useEffect } from 'react';
import './styles/index.css';
import { Provider } from 'react-redux';
import * as actions from './redux/actions';
import store from './redux/store';
import Level from './components/Level';
import Logger from './components/Logger';

function App() {
  useEffect(() => {
    function handleKeyDown() {
      window.addEventListener(
        'keydown',
        (e) => {
          const arrowKeys = new Set([37, 39, 38, 40]);
          if (arrowKeys.has(e.keyCode)) {
            store.dispatch(actions.step(e.keyCode));
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
          const index = Number(e.target.getAttribute('index'));
          if (index === 0 || index === undefined) return;
          console.log(`clicked index: ${index}`);
        },
        false
      );
    }

    function initState() {
      store.dispatch(actions.setMapSize(20, 10));
      store.dispatch(actions.addEnemy(157));
      store.dispatch(actions.addEnemy(154));
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
    <Provider store={store} className="App">
      <Level />
      <Logger />
    </Provider>
  );
}

export default App;
