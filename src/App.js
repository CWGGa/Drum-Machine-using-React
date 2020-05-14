import React from 'react';
import './App.css';
import '../src/'

const heaterSet = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const pianoSet = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      mode: 'Heater Kit',
      power: 'on'
    }

    this.buttonClick = this.buttonClick.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.powerButton = this.powerButton.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  buttonClick(event){
    var getEventValue = event.target.value
    var getStateMode = this.state.mode;
    var getMusicID = undefined;

    if (getStateMode === 'Heater Kit') {
      getMusicID = heaterSet.filter((items) => {
        if (items['keyTrigger'] === getEventValue) {
          return items['id']
        }
      });
    } else if (getStateMode === 'Smooth Piano Kit') {
      getMusicID = pianoSet.filter((items) => {
        if (items['keyTrigger'] === getEventValue) {
          return items['id']
        }
      });
    }

    getMusicID = getMusicID[0]['id']
    document.getElementById('display').innerHTML = getMusicID;

    const audio = document.getElementById(getEventValue)
    audio.play();
  }

  changeMode (event){
    var getNumDrumPad = document.getElementsByClassName('drum-pad').length;
    var getStateMode = this.state.mode
    var changeDisplayMode = document.getElementById('display')
    var changeChangeModeSwitch = document.getElementById('mode');
    console.log(getStateMode);

    console.log(this.state.mode);
    switch(getStateMode){
      case 'Heater Kit':
        changeChangeModeSwitch.className = 'mode-selector-switch';
        this.setState({
          mode: 'Smooth Piano Kit'
        });
        for(let a = 0; a < getNumDrumPad; a++) {
          document.getElementsByClassName('drum-pad')[a].setAttribute('id', pianoSet[a]['id']);
          document.getElementsByClassName('clip')[a].setAttribute('src', pianoSet[a]['url'])
        }
        changeDisplayMode.innerHTML = 'Smooth Piano Kit';
        break;
      case 'Smooth Piano Kit':
        changeChangeModeSwitch.className = 'mode-selector';
        this.setState({
          mode: 'Heater Kit'
        });
        for(let a = 0; a < getNumDrumPad; a++) {
          document.getElementsByClassName('drum-pad')[a].setAttribute('id', heaterSet[a]['id']);
          document.getElementsByClassName('clip')[a].setAttribute('src', heaterSet[a]['url'])
        }
        changeDisplayMode.innerHTML = 'Heater Kit';
    }
  }

  powerButton(event) {
    var getButtonElement = document.getElementsByClassName('drum-pad');
    var getNumButton = document.getElementsByClassName('drum-pad').length;
    var getStatePower = this.state.power
    var clearDisplay = document.getElementById('display');
    var getPower = document.getElementById('switch');
    console.log(getPower);

    switch (getStatePower) {
      case 'on':
        getPower.className = 'switch-off'
        this.setState({
          power: 'off'
        });
        for(let a = 0; a < getNumButton; a++) {
          getButtonElement[a].disabled = true;
        }
        clearDisplay.innerHTML = '';
        break;
      case 'off':
        getPower.className = 'power-switch'
        this.setState({
          power: 'on'
        });
        for(let a = 0; a < getNumButton; a++) {
          getButtonElement[a].disabled = false;
        }
    }
  }

  onKeyDown(event) {
    var getKey = event.key;
    var getElementButton = document.getElementsByClassName('drum-pad');
    
    if(getKey === 'Q' || getKey === 'q') {
      getElementButton[0].click();
    } else if (getKey === 'W' || getKey === 'w') {
      getElementButton[1].click();
    } else if (getKey === 'E' || getKey === 'e') {
      getElementButton[2].click();
    } else if (getKey === 'A' || getKey === 'a') {
      getElementButton[3].click();
    } else if (getKey === 'S' || getKey === 's') {
      getElementButton[4].click();
    } else if (getKey === 'D' || getKey === 'd') {
      getElementButton[5].click();
    } else if (getKey === 'Z' || getKey === 'z') {
      getElementButton[6].click();
    } else if (getKey === 'X' || getKey === 'x') {
      getElementButton[7].click();
    } else if (getKey === 'C' || getKey === 'c') {
      getElementButton[8].click();
    }
  }
  
  render(){
    return(
      <div id='main-container' onKeyDown={this.onKeyDown}>
        <div className='title-container'>
          <h1 className='title'>DRUM MACHINE</h1>
        </div>
        <div id='drum-machine'>
          <div className='top-display'>
            <div className='display-container'>
              <div className='display-box'>
              <p id='display'></p>
              </div>
            </div>
            <div className='power-container'>
              <h2 className='power-title'>Power</h2>
              <div className='power-selector' onClick={this.powerButton}>
                <div className='power-switch' id ='switch'></div>
              </div>
            </div>
          </div>
          <div className='pad-bank'>
            <button className='drum-pad' id = 'Heater-1'onClick={this.buttonClick} value='Q'>Q<audio className='clip' id='Q' src='https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'></audio></button>
            <button className='drum-pad' id = 'Heater-2'onClick={this.buttonClick} value='W'>W<audio className='clip' id='W' src='https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'></audio></button>
            <button className='drum-pad' id = 'Heater-3'onClick={this.buttonClick} value='E'>E<audio className='clip' id='E' src='https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'></audio></button>
            <button className='drum-pad' id = 'Heater-4'onClick={this.buttonClick} value='A'>A<audio className='clip' id='A' src='https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'></audio></button>
            <button className='drum-pad' id = 'Clap' onClick={this.buttonClick} value='S'>S<audio className='clip' id='S' src='https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'></audio></button>
            <button className='drum-pad' id = 'Open-HH' onClick={this.buttonClick} value='D'>D<audio className='clip' id='D' src='https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'></audio></button>
            <button className='drum-pad' id = "Kick-n'-Hat" onClick={this.buttonClick} value='Z'>Z<audio className='clip' id='Z' src='https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'></audio></button>
            <button className='drum-pad' id = 'Kick' onClick={this.buttonClick} value='X'>X<audio className='clip' id='X' src='https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'></audio></button>
            <button className='drum-pad' id = 'Closed-HH' onClick={this.buttonClick} value='C'>C<audio className='clip' id='C' src='https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'></audio></button>
          </div>
          <div className='controls-container'>
            <div className='control-mode'>
              <h3 className='title-mode'>Mode</h3>
              <div className='mode-selector' id='mode' onClick={this.changeMode}>
                <div className='mode-switch'></div>
              </div>
            </div>
          </div>
        </div>
        <div className='footer-name'>
          <h5 className='creator'>Created by John Christian M. Garon</h5>
        </div>
      </div>
    );
  }
}

export default App;
