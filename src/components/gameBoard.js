import { useRef, useEffect } from "react";
import CanvasComponent from "../apis/canvasApi";
import logo from "../resources/draw&guessLogo.png";


export default function GameBoard() {

    const canvasContextRef = useRef(null);

  
    const sendDataToServer = (dataToSend) => {
    }


    // ====================================== RETURN ===========================================

    return (
        <div className="land-page" >
            <div className="background-image fa-beat" style={{ '--fa-beat-scale': '1.007' }}></div>
            <img
                className="logo mt-3"
                src={logo}
                alt={"Draw & Guess"}
            />
            <div className="board-body d-flex p-4 px-5 justify-content-between " >
                <div className="board d-flex" id='board'>
                    <CanvasComponent
                        sendDataToServer={sendDataToServer}
                        canvasContextRef={canvasContextRef}
                    />
                </div>
                <div className="chat-box"></div>
            </div>
        </div>
    );
}