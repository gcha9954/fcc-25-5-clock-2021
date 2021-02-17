import { Component } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faPause,
  faPlay,
  faRedo
} from "@fortawesome/free-solid-svg-icons";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      time: new Date("January 1, 1970 00:25:00")
    };
  }

  render() {
    return (
      <div className="App">
        <div id="time-container">
          <div id="timer-label">Session</div>
          <div id="time-left">
            {this.state.time.toLocaleTimeString([], {
              minute: "2-digit",
              second: "2-digit"
            })}
          </div>
          <div className="controls">
            <div id="start_stop">
              <FontAwesomeIcon icon={faPlay} />
              <FontAwesomeIcon icon={faPause} />
            </div>
            <div id="reset">
              <FontAwesomeIcon icon={faRedo} />
            </div>
          </div>
        </div>
        <div id="settings-container">
          <div id="break-container">
            <div id="break-label">Break length</div>
            <div id="break-length">{this.state.breakLength}</div>
            <div className="controls">
              <div id="break-decrement" onClick={this.decrementBreakLength}>
                <FontAwesomeIcon icon={faArrowDown} />
              </div>
              <div id="break-increment" onClick={this.incrementBreakLength}>
                <FontAwesomeIcon icon={faArrowUp} />
              </div>
            </div>
          </div>
          <div id="session-container">
            <div id="session-label">Session length</div>
            <div id="session-length">{this.state.sessionLength}</div>
            <div className="controls">
              <div id="session-decrement" onClick={this.decrementSessionLength}>
                <FontAwesomeIcon icon={faArrowDown} />
              </div>
              <div id="session-increment" onClick={this.incrementSessionLength}>
                <FontAwesomeIcon icon={faArrowUp} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
