import { Component, createRef } from "react";
import "./styles.scss";
import Button from "@material-ui/core/Button";

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
    this.audioRef = createRef();
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
      // play alarm sound
      this.audioRef.current.play();
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
      // stops alarm and sets it to 0
      this.audioRef.current.pause();
      this.audioRef.current.currentTime = 0;
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
    // start_stop will be the start() function if timer has not started or is paused
    // otherwise will be the pause() function
    // start_stop is the onClick function for the #start_stop button
    let start_stop;
    if (this.state.interval === null || this.state.interval === "paused") {
      start_stop = this.start;
    } else {
      start_stop = this.pause;
    }

    return (
      <div className="App">
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={this.audioRef}
        ></audio>
        <div id="time-container">
          <div id="timer-label">{this.state.status}</div>
          <div id="time-left">
            {
              // because I'm using a date object for the timer, if it gets to 60 minutes, the minutes
              // and seconds are 00:00. So this conditional is here to directly set the time label
              // to 60:00 if this.state.time.getHours() = 1
              this.state.time.getHours() === 1
                ? "60:00"
                : this.state.time.toLocaleTimeString([], {
                    minute: "2-digit",
                    second: "2-digit"
                  })
            }
          </div>
          <div className="controls">
            <Button id="start_stop" variant="contained" onClick={start_stop}>
              <span class="material-icons">play_arrow</span>
              <span class="material-icons">pause</span>
            </Button>
            <Button id="reset" variant="contained" onClick={this.reset}>
              <span class="material-icons">restart_alt</span>
            </Button>
          </div>
        </div>
        <div id="settings-container">
          <div id="break-container">
            <div id="break-label">Break length</div>
            <div id="break-length">{this.state.breakLength}</div>
            <div className="controls">
              <Button
                id="break-decrement"
                variant="contained"
                onClick={this.decrementBreakLength}
              >
                <span class="material-icons">keyboard_arrow_down</span>
              </Button>
              <Button
                id="break-increment"
                variant="contained"
                onClick={this.incrementBreakLength}
              >
                <span class="material-icons">keyboard_arrow_up</span>
              </Button>
            </div>
          </div>
          <div id="session-container">
            <div id="session-label">Session length</div>
            <div id="session-length">{this.state.sessionLength}</div>
            <div className="controls">
              <Button
                id="session-decrement"
                variant="contained"
                onClick={this.decrementSessionLength}
              >
                <span class="material-icons">keyboard_arrow_down</span>
              </Button>
              <Button
                id="session-increment"
                variant="contained"
                onClick={this.incrementSessionLength}
              >
                <span class="material-icons">keyboard_arrow_up</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
