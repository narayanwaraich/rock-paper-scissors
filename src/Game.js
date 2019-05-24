import React, {Component} from 'react';
import rock from './rock.png'
import paper from './paper.png'
import scissors from './scissors.png'

class Game extends Component {
  constructor(props){
      super(props);
      this.state = {
        playerScore: 0,
        computerScore: 0,
        player: '',
        computer: '',
        status: '',

      };
      this.triggerPlay = this.triggerPlay.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.clearUI = this.clearUI.bind(this);
  }

  opts = ['rock', 'paper', 'scissors'];

  selectWinner(player,computer){
    if (player === 'rock') {
        if (computer === 'paper') return false;
        else if(computer === 'scissors') return true;
    } else if(player === 'paper'){
        if(computer === 'scissors') return false;
        else if(computer === 'rock') return true;
    } else if(player === 'scissors') {
        if(computer === 'rock') return false;
        else if (computer === 'paper') return true;
    }
  }

  makeRandomSelection(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
  }

  triggerPlay(player) {
//    clearTimeout(this.timeout);
//    this.clearUI();
    let computerScore = this.state.computerScore;
    let playerScore = this.state.playerScore;
    if (computerScore === 5 || playerScore === 5 ) return false;  
    let computer = this.makeRandomSelection(this.opts);
    if (player === computer) {
      this.setState({
        status: 'Tie'
      });
    } else {
      let winner = this.selectWinner(player,computer);
      if (winner) {
        playerScore += 1;
        this.setState({
          player: player,
          computer: computer,
          playerScore: playerScore,
          status: 'Player'
        });
      } else {
        computerScore += 1;
        this.setState({
          player: player,
          computer: computer,
          computerScore: computerScore,
          status: 'Computer'
        });
      }
    }
    if (playerScore === 5) {
      this.setState({ status: 'Player wins the match!' });
//      this.handleReset();
    } else if(computerScore === 5){
      this.setState({ status: 'Computer wins the match!' });
//      this.handleReset();
    }

    //this.timeout = setTimeout(() => { this.clearUI(); }, 1000);
  }

  handleReset(){
    this.setState({
      playerScore: 0,
      computerScore: 0,
      player: '',
      computer: '',
      status: 'Game Reset'
    });
    this.timeout = setTimeout(() => { this.clearUI(); }, 1000);
  }

  clearUI() {
    this.setState({
      player: '',
      computer: '',
      status: ''
    });
  }

  render(){
    return (
      <div>
        <button onClick={this.handleReset}>Reset</button>
        <p>&nbsp;{this.state.status}</p>
        <div className="rps">
          <div className="score">
            <p>{this.state.computerScore}</p>
            <h2>Computer</h2>
            <h4>{this.state.computer}</h4>
          </div>
          <img src={rock} onClick={()=>this.triggerPlay('rock')} alt="rock" />
          <img src={paper} onClick={()=>this.triggerPlay('paper')} alt="paper" />
          <img src={scissors} onClick={()=>this.triggerPlay('scissors')} alt="scissors" />
          <div className="score">
            <p>{this.state.playerScore}</p>
            <h2>Player</h2>
            <h4>{this.state.player}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
