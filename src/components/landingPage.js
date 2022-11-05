import { useState } from "react";
import { Modal } from "react-bootstrap";
import logo from "../resources/draw&guessLogo.png";
import info from "../resources/info.json"

export default function LandingPage() {
  const [showInfo, setShowInfo] = useState(false);
  const [playerName, setPlayerName] = useState('');


  // ======================================= RETURN =======================================  


  return (
    <div className="land-page">
      <div className="background-image fa-beat" style={{ '--fa-beat-scale': '1.007' }}></div>
      <img
        className="logo mt-3"
        src={logo}
        alt={"Draw & Guess"}
      />
      <div className='land-page-body'>

        <div className="card d-flex land-page p-4">

          <InputTagAndInfoComponent
            setShowInfo={setShowInfo}
            setPlayerName={setPlayerName}
          />

          <ButtonsComponent
            playerName={playerName}
          />

        </div>

      </div>

      <Modal
        show={showInfo}
        centered
        style={{ borderRadius: '0px' }}
      >
        <div className="d-flex flex-column justify-content-end p-2">
          <div className="d-flex justify-content-end pe-3" >
            <i className="fa-solid fa-lg fa-times info-icon"
              style={{ color: '#021671' }}
              onClick={() => setShowInfo(false)}
            ></i>
          </div>
          <div className="pt-0 px-3 pb-1" >{info.length > 0 &&
            <ul
              style={{ listStylePosition: 'outside' }}
            >{info.map((item, index) => (
              <li key={index} >{item}</li>
            ))}
            </ul>}
          </div>
        </div>
      </Modal>
    </div >
  );
}

//Helper functions

function InputTagAndInfoComponent({ setShowInfo, setPlayerName }) {

  const onPlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  }

  return (
    <div className="d-flex mb-2">
      <input
        className="input-tag name"
        placeholder=" Enter your name"
        type='text'
        onChange={onPlayerNameChange}
      />

      <i
        className="fa-regular fa-xl fa-circle-question info-icon"
        style={{ color: '#021671' }}
        onClick={() => setShowInfo(true)}
      ></i>
    </div>
  );
}




function ButtonsComponent({ playerName }) {

  return (
    <div className="d-flex flex-column">

      <button
        className="button-btn pt-2"
        style={{ backgroundColor: '#29bb53' }}
        disabled={playerName === ''}
      >
        Create Room
      </button>

      <button
        className="button-btn pt-2"
        style={{ backgroundColor: '#5372fa' }}
        disabled={playerName === ''}
      >
        Join Room
      </button>

    </div>
  );
}