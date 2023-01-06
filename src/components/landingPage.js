import { useState } from "react";
import { Modal } from "react-bootstrap";
import AppLayout from "./appLayout";
import info from "../resources/info.json"
import WebsocketApi from './../apis/websocketApi';
import luffyImage from '../resources/images/luffy-image.webp'
import chopperImage from '../resources/images/chopper-image.webp'
import ussopImage from '../resources/images/ussop-image.webp'
import sanjiImage from '../resources/images/sanji-image.jpg'
import brookImage from '../resources/images/brook-image.jpg'

// ======================================================================================================

export default function LandingPage() {
  const [showInfo, setShowInfo] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const initializeSocketConnection = () => {
    WebsocketApi.getInstance().connect();
  }

  initializeSocketConnection();

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
    // socket.emit('create-room', { roomId: 1234, clientName: 'harsh' }, (res) => {
    //   console.log(res);
    // });
  };

  // ======================================= RETURN =======================================  


  return (
    <AppLayout>
      <div className='land-page-body'>
        <div className="card user-info-card p-4">
          <InputTagAndInfoComponent setShowInfo={setShowInfo} setPlayerName={setPlayerName} />

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
    </AppLayout>
  );
}

//Helper functions

function InputTagAndInfoComponent({ setShowInfo, setPlayerName }) {

  const onPlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  }

  return (
    <div className="d-flex justify-content-between mb-2">
      <input className="input-tag name" placeholder=" Enter your name" type='text' onChange={onPlayerNameChange} />

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
  const imagesArray = [luffyImage, chopperImage, sanjiImage, ussopImage, brookImage];
  const [currentImageData, setCurrentImageData] = useState({ imageUrl: imagesArray[0], index: 0 });

  const onLeftArrowClick = () => {
    setCurrentImageData(prevState => {
      const newIndex = prevState.index === 0 ? imagesArray.length - 1 : prevState.index - 1;
      return { ...prevState, index: newIndex, imageUrl: imagesArray[newIndex] };
    });
  };

  const onRightArrowClick = () => {
    setCurrentImageData(prevState => {
      const newIndex = prevState.index === imagesArray.length - 1 ? 0 : prevState.index + 1;
      return { ...prevState, index: newIndex, imageUrl: imagesArray[newIndex] };
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