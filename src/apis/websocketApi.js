import { io } from "socket.io-client";
import websocketEvents from "../common/websocketEvents";
const { SOCKET_CONNECTION, SOCKET_CONNECTION_ERROR, RECEIVE_DATA_FROM_SERVER } = websocketEvents;

//===============================================================================================

class WebsocketApi {
    constructor() {
        this.socket = null;
        this.address = process.env.REACT_APP_BACKEND_URL;
        this.connectedToServer = false;
        this.showLogs = Boolean(process.env.REACT_APP_IS_DEVELOPMENT);
    }

    static _websocket = null;

    static getInstance() {
        if (WebsocketApi._websocket === null) {
            WebsocketApi._websocket = new WebsocketApi();
            WebsocketApi._websocket.showLogs && console.log("Initialized instance of Websocket!");
            return WebsocketApi._websocket;
        }
        return WebsocketApi._websocket;
    }

    connect(receivedDataHandler) {
        if (this.socket === null && !this.connectedToServer) {
            this.socket = io.connect(this.address);
            this.socket.on(SOCKET_CONNECTION, this.onConnectionSuccess.bind(this, receivedDataHandler));
            this.socket.on(SOCKET_CONNECTION_ERROR, this.onConnectionFailure.bind(this));
        }
    }

    onConnectionSuccess(receivedDataHandler, responseFromServer) {
        this.connectedToServer = true;
        this.showLogs && console.log(responseFromServer);
        this.startReceivingDataFormServer(RECEIVE_DATA_FROM_SERVER, receivedDataHandler);
    }

    onConnectionFailure(error) {
        this.showLogs && console.log("Unable to connect to the socket!");
    }

    sendDataToServer(eventName, data) {
        if (this.socket === null) {
            const error = { type: "WEBSOCKET_ERR", class: "WebsocketApi", reason: "Instance not found!", methodName: "sendDataToServer" };
            this.showLogs && console.log(error);
            return;
        }

        if (eventName === null || eventName === undefined) {
            const error = { type: "WEBSOCKET_ERR", class: "WebsocketApi", reason: "Event name is not provided!", methodName: "sendDataToServer" };
            this.showLogs && console.log(error);
            return;
        }

        if (data === null || data === undefined) {
            const error = { type: "WEBSOCKET_ERR", class: "WebsocketApi", reason: "Data is not provided!", methodName: "sendDataToServer" };
            this.showLogs && console.log(error);
            return;
        }

        this.socket.emit(eventName, data);
        this.showLogs && console.log("Data sent to the server");
        return;
    }

    startReceivingDataFormServer(eventName, eventHandler) {
        if (this.socket === null) {
            const error = { type: "WEBSOCKET_ERR", class: "WebsocketApi", reason: "Instance not found!", methodName: "startReceivingDataFormServer" };
            this.showLogs && console.log(error);
            return;
        }

        if (eventName === null || eventName === undefined) {
            const error = { type: "WEBSOCKET_ERR", class: "WebsocketApi", reason: "Event name is not provided!", methodName: "startReceivingDataFormServer" };
            this.showLogs && console.log(error);
            return;
        }

        if (eventHandler === null || eventHandler === undefined) {
            const error = { type: "WEBSOCKET_ERR", class: "WebsocketApi", reason: "Data is not provided!", methodName: "startReceivingDataFormServer" };
            this.showLogs && console.log(error);
            return;
        }

        this.socket.on(eventName, (data) => {
            eventHandler(data);
            this.showLogs && console.log("Received data from server!");
        });

    }
}

export default WebsocketApi;