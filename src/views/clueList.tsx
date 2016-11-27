import * as React from 'react'
import {observer} from 'mobx-react'
import BoardState from '../stores/board'
import '../styles/clueList.css'

@observer
export default class ClueList extends React.Component<{boardState : BoardState}, {}> {
  makeClueElement(clue, key, direction) {
    return (
      <div id={clue.number + "-" + direction} className="clue" key={key} onClick={_=>this.onClickClue(clue)}>
        <div className="clue-number">{clue.numbers.join(", ")}.</div>
        <div className={"clue-text" + (this.props.boardState.activeClue == clue.position?" active":"")}>{clue.clue} {clue.lengths.length?("("+clue.lengths.join(", "))+")":''}</div>
      </div>
    );
  }

  onClickClue(clue) {
    this.props.boardState.activeClue = clue.position;
    this.props.boardState.activeSquare = this.props.boardState.clues[clue.position].starts[0];
  }

  render() {
    let across = [];
    let down = [];
    this.props.boardState.clues.map((clue, i) => {
      const direction = clue.directions[0];
      if(direction == "across")
        across.push({clue: clue.clue, numbers: clue.numbers, lengths: clue.lengths, position: i, number: clue.numbers[0]});
      else
        down.push({clue: clue.clue, numbers: clue.numbers, lengths: clue.lengths, position: i, number: clue.numbers[0]});
      for(let j = 1; j < clue.directions.length; j++) {
        if(clue.directions[j] == 'across') {
          across.push({clue: "See " + clue.numbers[0], numbers: [clue.numbers[j]], lengths: [], position: i, number: clue.numbers[j]});
        } else {
          down.push({clue: "See " + clue.numbers[0], numbers: [clue.numbers[j]], lengths: [], position: i, number: clue.numbers[j]});
        }
      }
    });
    down.sort((a,b)=>a.number-b.number);
    across.sort((a,b)=>a.number-b.number);
    return (
      <div className="clue-list">
        <div className="across-clues">
          <h3>Across</h3>
          <div>
            {across.map((clue, i)=>this.makeClueElement(clue, i, "across"))}
          </div>
        </div>
        <div className="down-clues">
          <h3>Down</h3>
          <div>
            {down.map((clue,i)=>this.makeClueElement(clue, i, "down"))}
          </div>
        </div>
      </div>
    );
  }
}