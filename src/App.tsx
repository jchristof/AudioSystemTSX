import * as React from 'react';
import './App.css';
import AudioSystem from './AudioSystem';
import AudioLoader from './AudioLoader';
import SampleButton from './controls/SampleButton';
import Dial from './controls/Dial';

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
        <Dial />
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
      </div>
    );
  }
}

export default App;
