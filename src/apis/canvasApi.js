import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

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
        this.lineColor = 'black';
        this.lineWidth = 5;
        this.canvasColor = "white";
        this.sendDataToServer = props.sendDataToServer;
    }


    updateSize() {
        const { width, height } = document.getElementById('board').getBoundingClientRect();
        this.height = height;
        this.width = width - 54;
        this.forceUpdate();
    }

    //Initializes and provides the context ref of canvas..... 
    initializeRef(canvasRef) {
        if (canvasRef !== null) {
            this.canvasContext = canvasRef.getContext('2d');
            this.props.canvasContextRef.current = this.canvasContext;
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
            lineColor: this.lineColor,
            lineWidth: this.lineWidth
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


    onClearCanvas() {
        this.canvasContext.clearRect(0, 0, this.width, this.height);
        this.canvasColor = "white";
        this.forceUpdate();
    }


    onChangeLineColor(color) {
        this.lineColor = color;
        this.forceUpdate();
    }


    onChangeCanvasColor(color) {
        this.canvasColor = color;
        this.forceUpdate();
    }


    onChangeLineWidth(width) {
        this.lineWidth = width;
        this.forceUpdate();
    }


    componentDidMount() {
        this.updateSize();
        // Helps to resize the canvas dimensions on change of size of window
        window.addEventListener('resize', this.updateSize.bind(this));
    }


    //=============================================== RENDER ==============================================

    render() {
        return (
            <div className='canvas'>
                <canvas
                    width={this.width}
                    height={this.height}
                    onMouseDown={this.onMouseDown.bind(this)}
                    onMouseUp={this.onMouseUp.bind(this)}
                    onMouseMove={this.onMouseMove.bind(this)}
                    ref={canvasRef => this.initializeRef(canvasRef)}
                    style={{ background: this.canvasColor }}
                />
                <ColorPaletteComponent
                    onClearCanvas={this.onClearCanvas.bind(this)}
                    onChangeLineColor={this.onChangeLineColor.bind(this)}
                    onChangeCanvasColor={this.onChangeCanvasColor.bind(this)}
                    onChangeLineWidth={this.onChangeLineWidth.bind(this)}
                />
            </div>
        );
    };
}

export default CanvasComponent;



// Helper function ..........................................
function ColorPaletteComponent({ onClearCanvas, onChangeLineColor, onChangeCanvasColor, onChangeLineWidth }) {
    const [timer, setTimer] = useState(null);

    const onColorPaletteItemClick = ({ target }) => {
        const { color } = target.dataset;

        // Check whether timer is set or not.
        // If is set means user has clicked once.
        // Set timer to null and change the canvas color.
        if (timer !== null) {
            setTimer(null);
            onChangeCanvasColor(color);
        }


        // Here we wait for double click using timeout of 100 ms and after 100 ms just setting timer to null......
        if (timer === null) {
            setTimer(setTimeout(() => {
                onChangeLineColor(color);  // On single click setting line color..........
                setTimer(null);
            }, 200));
        }

    }

    const onChangeLineWidthItemClick = ({ target }) => {
        const { width } = target.dataset;
        onChangeLineWidth(width);
    }


    return (
        <div className="color-palette shadow">
            <div className='color-palette-item d-flex justify-content-center align-items-center'>
                <i
                    className="fa-regular fa-trash-can fa-xl"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Clear canvas"
                    onClick={onClearCanvas}
                >

                </i>
            </div>
            <div className='color-palette-item'>
                <div
                    className='red palette-item-child'
                    data-color='rgb(253, 54, 54)'
                    onClick={onColorPaletteItemClick}
                >
                </div>
            </div>
            <div className='color-palette-item'>
                <div
                    className='yellow palette-item-child'
                    data-color='rgb(255, 255, 58)'
                    onClick={onColorPaletteItemClick}
                >
                </div>
            </div>
            <div className='color-palette-item'>
                <div className='green palette-item-child'
                    data-color='rgb(7, 249, 7)'
                    onClick={onColorPaletteItemClick}
                >
                </div>
            </div>
            <div className='color-palette-item'>
                <div
                    className='blue palette-item-child'
                    data-color='rgb(54, 54, 253)'
                    onClick={onColorPaletteItemClick}
                >
                </div>
            </div>
            <div className='color-palette-item'>
                <div
                    className='sky-blue palette-item-child'
                    data-color='rgb(132, 228, 245)'
                    onClick={onColorPaletteItemClick}
                >
                </div>
            </div>
            <div className='color-palette-item'>
                <div
                    className='grey palette-item-child'
                    data-color='rgb(154, 152, 152)'
                    onClick={onColorPaletteItemClick}
                >
                </div>
            </div>
            <div className='color-palette-item'>
                <div className='black palette-item-child'
                    data-color='black'
                    onClick={onColorPaletteItemClick}
                >
                </div>
            </div>
            <div className='line-width'>
                <div className='width-20 line-width'
                    data-width='20'
                    onClick={onChangeLineWidthItemClick}
                >
                </div>
            </div>
            <div className='line-width'>
                <div className='width-15 line-width'
                    data-width='14'
                    onClick={onChangeLineWidthItemClick}
                >
                </div>
            </div>
            <div className='line-width'>
                <div className='width-10 line-width'
                    data-width='8'
                    onClick={onChangeLineWidthItemClick}
                >
                </div>
            </div>
            <div className='line-width'>
                <div className='width-5 line-width'
                    data-width='5'
                    onClick={onChangeLineWidthItemClick}
                >
                </div>
            </div>
        </div>
    );
}