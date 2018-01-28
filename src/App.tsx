import * as React from 'react';
import './App.css';
import AudioSystem from './AudioSystem';
import AudioLoader from './AudioLoader';
import SampleButton from './controls/SampleButton';

const logo = require('./logo.svg');

type Props = {
  clickFunction: (freq: number) => void;
  text?: string;
};
type State = {};

class Button extends React.Component<Props, State> {
  render() {
    return (
      <button onClick={() => this.props.clickFunction(220)}>{this.props.text}</button>
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
    await this.audioLoader.load('crash', 'audio/crash.wav');
    await this.audioLoader.load('kick', 'audio/kick.wav');
    await this.audioLoader.load('hat', 'audio/hat.wav');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Button clickFunction={(freq) => this.audioSystem.note(freq)} text="220"/>
        <SampleButton 
          clickFunction={() => this.audioSystem.playback(this.audioLoader.audio('snare'))} 
          text="snare"
        />
        <SampleButton 
          clickFunction={() => this.audioSystem.playback(this.audioLoader.audio('kick'))} 
          text="kick"
        />
        <SampleButton 
          clickFunction={() => this.audioSystem.playback(this.audioLoader.audio('hat'))} 
          text="hat"
        />
        <SampleButton 
          clickFunction={() => this.audioSystem.playback(this.audioLoader.audio('crash'))} 
          text="crash"
        />
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
