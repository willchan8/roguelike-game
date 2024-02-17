import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

/**
 * A function that logs messages and scrolls to the bottom of the logger element when the log array changes.
 *
 * @param {Object} log - the log object containing messages to be displayed
 * @return {JSX} the JSX element representing the logger component
 */
function Logger({ log }) {
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

/**
 * Maps the state to props for the component.
 *
 * @param {Object} state - The state object
 * @return {Object} The mapped props object
 */
const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(mapStateToProps)(Logger);
