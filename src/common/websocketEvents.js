const websocketEvents = {
    SOCKET_CONNECTION: "connected",
    SOCKET_CONNECTION_ERROR: "connect_error",
    JOIN_ROOM: "join-room",
    CREATE_ROOM: "create-room",
    JOIN_LOBBY: "join-lobby",
    UPDATE_LOBBY: "update-lobby",
    START_GAME: "start-game",
    RECEIVE_DATA_FROM_SERVER: "data-from-server",
}

export default websocketEvents;