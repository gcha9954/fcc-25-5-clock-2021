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
      time: new Date("January 1, 1970 00:25:00"),
      interval: null,
      status: "session"
    };
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.countdown = this.countdown.bind(this);
    this.decrementBreakLength = this.decrementBreakLength.bind(this);
    this.incrementBreakLength = this.incrementBreakLength.bind(this);
    this.decrementSessionLength = this.decrementSessionLength.bind(this);
    this.incrementSessionLength = this.incrementSessionLength.bind(this);
  }

  start() {
    if (this.state.interval === null || this.state.interval === "paused") {
      this.setState({ interval: setInterval(this.countdown, 1000) });
    }
  }

  countdown() {
    if (
      this.state.time.valueOf() ===
      new Date("January 1, 1970 00:00:00").valueOf()
    ) {
      //clearInterval(this.state.interval);
      //this.setState({ interval: null });
      // this will need to start a break by setting time to breakLength
      this.setState((state) => {
        return {
          status: state.status === "break" ? "session" : "break",
          time:
            state.status === "break"
              ? new Date(`January 1, 1970 00:${state.sessionLength}:00`)
              : new Date(`January 1, 1970 00:${state.breakLength}:00`)
        };
      });
    } else {
      this.setState((state) => {
        return {
          time: new Date(state.time.setSeconds(state.time.getSeconds() - 1))
        };
      });
    }
  }

  pause() {
    clearInterval(this.state.interval);
    this.setState({ interval: "paused" });
  }

  reset() {
    this.setState((state) => {
      // if there is an ongoing or paused interval, clear it
      if (state.interval !== null && state.interval !== "paused") {
        clearInterval(state.interval);
      }
      // re-initialises state to default values
      return {
        breakLength: 5,
        sessionLength: 25,
        time: new Date("January 1, 1970 00:25:00"),
        interval: null,
        status: "session"
      };
    });
  }

  decrementBreakLength() {
    // if there is no ongoing or paused interval and breakLength is more than 0, decrement breakLength
    this.setState((state) => {
      if (state.interval === null && state.breakLength > 1) {
        return { breakLength: state.breakLength - 1 };
      }
    });
  }

  incrementBreakLength() {
    // if there is no ongoing or paused interval and breakLength is less than 30, increment breakLength
    this.setState((state) => {
      if (state.interval === null && state.breakLength < 60) {
        return { breakLength: state.breakLength + 1 };
      }
    });
  }

  decrementSessionLength() {
    // if there is no ongoing or paused interval and sessionLength is more than 15, decrement sessionLength
    // also generate new date corresponding to Unix Epoch + sessionLength minutes
    this.setState((state) => {
      if (state.interval === null && state.sessionLength > 1) {
        return {
          sessionLength: state.sessionLength - 1,
          time: new Date(`January 1, 1970 00:${state.sessionLength - 1}:00`)
        };
      }
    });
  }

  incrementSessionLength() {
    // if there is no ongoing or paused interval and sessionLength is less than 60, decrement sessionLength
    // also generate new date corresponding to Unix Epoch + sessionLength minutes
    this.setState((state) => {
      if (state.interval === null && state.sessionLength < 60) {
        return {
          sessionLength: state.sessionLength + 1,
          time: new Date(`January 1, 1970 00:${state.sessionLength + 1}:00`)
        };
      }
    });
  }

  render() {
    let start_stop;
    if (this.state.interval === null || this.state.interval === "paused") {
      start_stop = this.start;
    } else {
      start_stop = this.pause;
    }
    return (
      <div className="App">
        <div id="time-container">
          <div id="timer-label">{this.state.status}</div>
          <div id="time-left">
            {this.state.time.toLocaleTimeString([], {
              minute: "2-digit",
              second: "2-digit"
            })}
          </div>
          <div className="controls">
            <div id="start_stop" onClick={start_stop}>
              <FontAwesomeIcon icon={faPlay} />
              <FontAwesomeIcon icon={faPause} />
            </div>
            <div id="reset" onClick={this.reset}>
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
