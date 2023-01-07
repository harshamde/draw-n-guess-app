import WebsocketApi from "../apis/websocketApi";
import websocketEvents from "../common/websocketEvents";
const { CREATE_ROOM } = websocketEvents;

export const initializeConnection = () => {
    WebsocketApi.getInstance().connect(handlerForDataFromServer);
};


export const createRoom = (dataToSend) => {
    WebsocketApi.getInstance().sendDataToServer(CREATE_ROOM, dataToSend);
};


const handlerForDataFromServer = (dataFromServer) => {
    console.log(dataFromServer, "dataFromServer");
};