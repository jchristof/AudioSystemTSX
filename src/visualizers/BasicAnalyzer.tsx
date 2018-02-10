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
        const dataArray = analyser.getDataArray();
        const ctx = this.ctx;

        ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgb(0, 0, 0)';

        ctx.beginPath();

        const bufferSize = analyser.getBufferSize();
        const sliceWidth = this.canvas.width * 1.0 / bufferSize;
        const halfCanvasHeight = this.canvas.height / 2;
        const canvasWidth = this.canvas.width;

        let x = 0;

        for (let i = 0; i < analyser.getBufferSize(); i++) {

            const v = dataArray[i] / 128.0;
            const y = v * halfCanvasHeight;

            if (i === 0) 
                ctx.moveTo(x, y);
            else 
                ctx.lineTo(x, y);

            x += sliceWidth;
        }

        ctx.lineTo(canvasWidth, halfCanvasHeight);
        ctx.stroke();
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