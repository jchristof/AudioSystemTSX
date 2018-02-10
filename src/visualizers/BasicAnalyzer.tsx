import * as React from 'react';

import AnalyzerModel from './AnalyzerModel';

type Props = {
    analyzerModel: AnalyzerModel;
};

type State = {
};

export default class BasicAnalyzer extends React.Component<Props, State> {
    
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private drawvisual: any;

    onCanvasLoaded = (c: HTMLCanvasElement) => {
        if (c !== null) {
            this.canvas = c;
            this.ctx = this.canvas.getContext('2d');

            if (this.ctx != null) {
                this.ctx.clearRect(0, 0, 300, 200);
            }    
        }
    }

    componentDidMount() {
        this.drawvisual = requestAnimationFrame(this.draw.bind(this));
      }

    componentWillUnmount() {
        window.cancelAnimationFrame( this.drawvisual );
    }

    draw(timestamp: number) {
        if (this.ctx == null) {
            return;
        }
        this.drawvisual = requestAnimationFrame(this.draw.bind(this));

        var analyser = this.props.analyzerModel;

        var dataArray = analyser.getDataArray();

        this.ctx.fillStyle = 'rgb(200, 200, 200)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'rgb(0, 0, 0)';

        this.ctx.beginPath();

        var sliceWidth = this.canvas.width * 1.0 / analyser.getBufferSize();
        var x = 0;

        for (var i = 0; i < analyser.getBufferSize(); i++) {

            var v = dataArray[i] / 128.0;
            var y = v * this.canvas.height / 2;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.ctx.stroke();
    }

    render() {

        let pStyle = {
            position: 'absolute',
            background: 'red',
            width: '300px',
            height: '200px'
          };

        let opts: any = {};
          
        return(
            <canvas 
                style={pStyle}
                {...opts}
                ref={this.onCanvasLoaded}
            />
        );
    }
}