import * as React from 'react';
import './App.css';
import AudioSystem from './AudioSystem';
import AudioLoader from './AudioLoader';
import SampleChannel from './controls/SampleChannel';
import ConvolverReverb from './effects/ConvolverReverb';
import MixerChannel from './controls/MixerChannel';
import BasicAnalyzer from './visualizers/BasicAnalyzer';
import AnalyzerModel from './visualizers/AnalyzerModel';
import FrequencyBarAnalyser from './visualizers/FrequencyBarVisualizer';
import KeyController from './controls/KeyController';

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
  private convolver: ConvolverReverb;
  private waveAnalyser: AnalyzerModel;
  private barAnalyser: AnalyzerModel;

  constructor(props: {}, context?: any) {
    super(props, context);
    this.audioSystem = new AudioSystem();
    this.audioLoader = new AudioLoader();
    this.convolver = new ConvolverReverb(this.audioSystem, this.audioLoader);
    this.audioSystem.setConvolver(this.convolver);
    this.waveAnalyser = new AnalyzerModel(
      this.audioSystem.channelInput(), 
      this.audioSystem.audioContext().createAnalyser(), 2048);

    this.barAnalyser = new AnalyzerModel(
      this.audioSystem.channelInput(), 
      this.audioSystem.audioContext().createAnalyser(), 64);

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
        <div className="column">
          <SampleChannel sampleName={'snare'} audioSystem={this.audioSystem} audioLoader={this.audioLoader}/>
        </div>
        <div className="column">
          <SampleChannel sampleName={'kick'} audioSystem={this.audioSystem} audioLoader={this.audioLoader}/>
        </div>
        <div className="column">
          <SampleChannel sampleName={'crash'} audioSystem={this.audioSystem} audioLoader={this.audioLoader}/>
        </div>
        <div className="column">
          <SampleChannel sampleName={'hat'} audioSystem={this.audioSystem} audioLoader={this.audioLoader}/>
        </div>
        <div className="column">
          <MixerChannel convolver={this.convolver}/>
        </div>
        <div>
          <BasicAnalyzer analyzerModel={this.waveAnalyser}/>
          <FrequencyBarAnalyser analyzerModel={this.barAnalyser}/>
        </div>
        <Button clickFunction={(freq) => this.audioSystem.note(freq)} text="220"/>
        <KeyController audioSystem={this.audioSystem}/>
      </div>
    );
  }
}

export default App;
