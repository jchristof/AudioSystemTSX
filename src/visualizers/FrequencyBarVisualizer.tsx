import * as React from 'react';

import AnalyzerModel from './AnalyzerModel';

type Props = {
    analyzerModel: AnalyzerModel;
};

type State = {
};

export default class FrequencyBarVisualizer extends React.Component<Props, State> {
    
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private drawvisual: number;

    onCanvasLoaded = (c: HTMLCanvasElement) => {
        if (c == null) 
            return;

        this.canvas = c;
        this.ctx = this.canvas.getContext('2d');
    }

    componentDidMount() {
        this.drawvisual = window.requestAnimationFrame(this.draw.bind(this));
      }

    componentWillUnmount() {
        window.cancelAnimationFrame( this.drawvisual );
    }

    draw(timestamp: number) {
        if (this.ctx == null) 
            return;
        
        this.drawvisual = window.requestAnimationFrame(this.draw.bind(this));

        const analyser = this.props.analyzerModel;
        const dataArray = analyser.getFrequencyDataArray();
        const ctx = this.ctx;

        ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const bufferSize = analyser.getBufferSize();
        // const halfCanvasHeight = this.canvas.height / 2;
        const canvasWidth = this.canvas.width;

        var barWidth = (canvasWidth / bufferSize) * 2.5;
        var barHeight;
        var x = 0;

        for (var i = 0; i < bufferSize; i++) {
            barHeight = dataArray[i];

            ctx.fillStyle = 'rgb(0,0,0)';
            ctx.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
      }
    }

    render() {

        const style = {
            position: 'static',
            width: '300px',
            height: '200px'
          };

        const opts: any = {};
          
        return(
            <canvas 
                style={style}
                {...opts}
                ref={this.onCanvasLoaded}
            />
        );
    }
}