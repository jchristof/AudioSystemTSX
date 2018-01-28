import * as React from 'react';
import './App.css';
import AudioSystem from './AudioSystem';
import AudioLoader from './AudioLoader';

const logo = require('./logo.svg');

type Props = {
  clickFunction: (freq: number) => void;
};
type State = {};

class Button extends React.Component<Props, State> {
  render() {
    return (
      <button onClick={() => this.props.clickFunction(220)}>key</button>
    );
  }
}

class App extends React.Component {
  private audioSystem: AudioSystem;
  private audioLoader: AudioLoader;

  constructor(props: {}, context?: any) {
    super(props, context);
    this.audioSystem = new AudioSystem();
    this.audioLoader = new AudioLoader();

    this.load();
  }

  async load() {
    await this.audioLoader.load('snare', 'audio/snare.wav');
    this.audioSystem.playback(this.audioLoader.audio('snare'));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Button clickFunction={(freq) => this.audioSystem.note(freq)}/>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
