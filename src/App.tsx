import React from 'react';
import './App.css';
import Confirm from './Confirm'

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
  confirmVisible: boolean;
  countDown: number;
}

class App extends React.Component<{}, IState>{
  private timer: number = 0;
  private renderCount = 0;
  constructor(props: {}) {
    super(props);
    this.state = {
      confirmMessage: "Please hit the confirm button",
      confirmOpen: true,
      confirmVisible: true,
      countDown: 10
    };
  }

  private handleTimerTick() {
    this.setState(
      {
        confirmMessage: `Please hit the confirm button ${this.state.countDown} secs to go`,
        countDown: this.state.countDown - 1
      },
      () => {
        if (this.state.countDown <= 0) {
          clearInterval(this.timer);
          this.setState({
            confirmMessage: "Too late to confirm!",
            confirmVisible: false
          });
        }
      }
    );
  }

  public componentDidMount() {
    this.timer = window.setInterval(() => this.handleTimerTick(),
      1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public getSnapshotBeforeUpdate(prevProps: {}, prevState: IState) {
    this.renderCount += 1;
    console.log("getSnapshotBeforeUpdate", prevProps, prevState, this.renderCount)
    return null;
  }

  public static getDerivedStateFromProps(props: {}, state: IState) {
    console.log("getDerivedStateFromProps", props, state);
    return null;
  }

  public shouldComponentUpdate(nextProps: {}, nextState: IState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    return true;
  }

  private handleCancelConfirmClick = () => {
    this.setState({ confirmOpen: false });
    clearInterval(this.timer);
  };

  private handleOkConfirmClick = () => {
    this.setState({
      confirmMessage: "Cool, carry on reading!",
      confirmOpen: false
    });
    clearInterval(this.timer);
  };

  private handleConfirmClick = () => {
    this.setState({
      confirmMessage: "Take a break, I'm sure you will later ...",
      confirmOpen: true
    });
    clearInterval(this.timer);
  };

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          React And Typescript
        </header>
        <p>{this.state.confirmMessage}</p>
        {this.state.confirmVisible && (<button onClick={this.handleConfirmClick}>Confirm</button>)}
        <Confirm
          title="React and TypeScript"
          content="Are you sure you want to learn React and TypeScript?"
          cancelCaption="No way"
          okCaption="Yes please!"
          onCancelClick={this.handleCancelConfirmClick}
          onOkClick={this.handleOkConfirmClick}
          open={this.state.confirmOpen}
        />
      </div>
    )
  }
}


export default App;
