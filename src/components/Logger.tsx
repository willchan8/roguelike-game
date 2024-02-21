import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function Logger() {
  const log = useSelector((state: RootState) => state.game.log);
  const loggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loggerRef.current) {
      loggerRef.current.scroll(0, loggerRef.current.scrollHeight);
    }
  }, [log.length]);

  return (
    <div className="logger" ref={loggerRef}>
      <div className="msg-container">
        {log.slice(-20).map((message, index) => (
          <div className="text" key={index}>
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Logger;
