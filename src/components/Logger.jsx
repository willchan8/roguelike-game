import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function Logger() {
  const log = useSelector((state) => state.game.log);
  const loggerRef = useRef(null);

  useEffect(() => {
    loggerRef.current.scroll(0, loggerRef.current.scrollHeight);
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
