import React from 'react';

class CanvasComponent extends React.Component {
    constructor(props) {
        super(props);
        this.height = 0;
        this.width = 0;
        this.canvasContext = null;
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.isMouseDown = false;
        this.sendDataToServer = props.sendDataToServer;
    }


    componentDidMount() {
        const { width, height } = document.getElementById('board').getBoundingClientRect();
        this.height = height;
        this.width = width - 59;
        this.forceUpdate();
    }


    //Initializes and provides the context ref of canvas..... 
    initializeRef(canvasRef) {
        if (canvasRef !== null) {
            this.canvasContext = canvasRef.getContext('2d');
        }
    }


    onMouseDown({ nativeEvent }) {
        this.startX = nativeEvent.offsetX;
        this.startY = nativeEvent.offsetY;
        this.isMouseDown = true;
    }


    onMouseUp() {
        this.isMouseDown = false;
    }


    onMouseMove({ nativeEvent }) {
        if (!this.isMouseDown) {
            return;
        }

        this.endX = nativeEvent.offsetX;
        this.endY = nativeEvent.offsetY;

        const dataToDraw = {
            startX: this.startX,
            startY: this.startY,
            endX: this.endX,
            endY: this.endY,
            lineColor: "black",
            lineWidth: 5
        }

        this.drawLine(dataToDraw);
        this.sendDataToServer(dataToDraw);

        this.startX = this.endX;
        this.startY = this.endY;
    }


    // Logic to draw line
    drawLine(dataToDraw) {
        const { startX, startY, endX, endY, lineWidth, lineColor } = dataToDraw;
        this.canvasContext.beginPath();
        this.canvasContext.lineCap = "round";
        this.canvasContext.lineWidth = lineWidth;
        this.canvasContext.strokeStyle = lineColor;
        this.canvasContext.moveTo(startX, startY);
        this.canvasContext.lineTo(endX, endY);
        this.canvasContext.stroke();
    }


    render() {
        return (
            <canvas
                width={this.width}
                height={this.height}
                onMouseDown={this.onMouseDown.bind(this)}
                onMouseUp={this.onMouseUp.bind(this)}
                onMouseMove={this.onMouseMove.bind(this)}
                ref={canvasRef => this.initializeRef(canvasRef)}
                // style={{ background: 'red' }}
            />
        );
    };
}

export default CanvasComponent;