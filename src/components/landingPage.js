import { useState } from "react";
import { Modal } from "react-bootstrap";
import AppLayout from "./appLayout";
import info from "../resources/info.json"
import { initializeConnection } from "../controllers/websocket";
import arrayOfImagesForAvatar from "../common/imagesForAvatar";

// ======================================================================================================

export default function LandingPage() {
  const [showInfo, setShowInfo] = useState(false);
  const [playerName, setPlayerName] = useState('Luffy');

  initializeConnection();


  const onJoinRoom = () => {
    // socket.emit('join-room', { roomId: 1234, clientName: 'harsh' }, (res) => {
    //   console.log(res);
    // });
    // socket.on('connected', (data) => {
    //   console.log(data);
    //   console.log(socket);
    // })
  };

  const onCreateRoom = () => {
    // createRoom({ roomId: 1234, clientName: 'harsh' });
    // socket.emit('create-room', { roomId: 1234, clientName: 'harsh' }, (res) => {
    //   console.log(res);
    // });
  };

  // ======================================= RETURN =======================================  

  return (
    <AppLayout>
      <div className='land-page-body'>
        <div className="card user-info-card p-4">
          <InputTagAndInfoComponent setShowInfo={setShowInfo} playerName={playerName} setPlayerName={setPlayerName} />
          <ButtonsComponent playerName={playerName} onJoinRoom={onJoinRoom} onCreateRoom={onCreateRoom} />
        </div>

        <AvatarComponent />
      </div>

      {/* ======================================= Info Modal ======================================= */}

      <Modal show={showInfo} centered style={{ borderRadius: '0px' }}>
        <div className="d-flex flex-column justify-content-end p-2">
          <div className="d-flex justify-content-end pe-3" >
            <div className="cross info-icon" onClick={() => setShowInfo(false)}>
              <i className="fa-solid fa-lg fa-times" style={{ color: '#021671' }}></i>
            </div>
          </div>
          <div className="pt-0 px-3 pb-1" >{info.length > 0 &&
            <ul style={{ listStylePosition: 'outside' }}>{info.map((item, index) => (
              <li key={index} >{item}</li>
            ))}
            </ul>}
          </div>
        </div>
      </Modal>

      {/* =============================================================================================== */}

    </AppLayout>
  );
}

//=================================== Helper functions =================================================

function InputTagAndInfoComponent({ setShowInfo, setPlayerName, playerName }) {

  const onPlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  }

  return (
    <div className="d-flex justify-content-between mb-2">
      <input className="input-tag name" placeholder=" Enter your name" type='text' value={playerName} onChange={onPlayerNameChange} />

      <i className="fa-regular fa-xl fa-circle-question info-icon"
        style={{ color: '#021671' }}
        onClick={() => setShowInfo(true)}
      ></i>
    </div>
  );
}


function ButtonsComponent({ playerName, onJoinRoom, onCreateRoom }) {

  return (
    <div className="d-flex flex-column">

      <button
        className="button-btn pt-2"
        style={{ backgroundColor: '#29bb53' }}
        disabled={playerName === ''}
        onClick={onCreateRoom}
      >Create Room
      </button>

      <button
        className="button-btn pt-2"
        style={{ backgroundColor: '#5372fa' }}
        disabled={playerName === ''}
        onClick={onJoinRoom}
      >Join Room
      </button>

    </div>
  );
}


function AvatarComponent() {
  const [currentImageData, setCurrentImageData] = useState({ imageUrl: arrayOfImagesForAvatar[0], index: 0 });

  const onLeftArrowClick = () => {
    setCurrentImageData(prevState => {
      const newIndex = prevState.index === 0 ? arrayOfImagesForAvatar.length - 1 : prevState.index - 1;
      return { ...prevState, index: newIndex, imageUrl: arrayOfImagesForAvatar[newIndex] };
    });
  };

  const onRightArrowClick = () => {
    setCurrentImageData(prevState => {
      const newIndex = prevState.index === arrayOfImagesForAvatar.length - 1 ? 0 : prevState.index + 1;
      return { ...prevState, index: newIndex, imageUrl: arrayOfImagesForAvatar[newIndex] };
    });
  };


  return (
    <div className="card avatar-card justify-content-center">
      <img src={currentImageData.imageUrl} alt="profile" className="avatar-image" />
      <div className="avatar-image-arrow-div">
        <i className="fa-solid fa-lg fa-arrow-left text-white arrow" onClick={onLeftArrowClick}></i>
        <i className="fa-solid fa-lg fa-arrow-right text-white arrow" onClick={onRightArrowClick}></i>
      </div>
    </div>
  );
}