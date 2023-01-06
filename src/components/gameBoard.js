import { useRef } from "react";
import CanvasComponent from "../apis/canvasApi";
import AppLayout from './appLayout';


export default function GameBoard() {

    const canvasContextRef = useRef(null);

  
    const sendDataToServer = (dataToSend) => {
    }


    // ====================================== RETURN ===========================================

    return (
        <AppLayout>
            <div className="board-body d-flex p-4 px-5 justify-content-between " >
                <div className="board d-flex" id='board'>
                    <CanvasComponent
                        sendDataToServer={sendDataToServer}
                        canvasContextRef={canvasContextRef}
                    />
                </div>
                <div className="chat-box"></div>
            </div>
        </AppLayout>
    );
}