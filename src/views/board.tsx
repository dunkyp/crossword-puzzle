import * as React from 'react'
import {observer} from 'mobx-react'
import BoardState, {square} from '../stores/board'
import ClueList from './clueList'
import '../styles/board.css'

@observer
export default class BoardView extends React.Component<{boardState : BoardState}, {}> {
  insertLetter(event) {
    event.stopPropagation();
    if(event.keyCode > 47 && event.keyCode < 91)
      this.props.boardState.addLetter(String.fromCharCode(event.keyCode).toUpperCase());
  }

  componentDidMount() {
    document.addEventListener('keydown', this.insertLetter.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.insertLetter.bind(this));
  }

  onClickSquare(square) {
    const clues = square.clues;
    if(!clues)
      return;
    let activeClue = this.props.boardState.activeClue;
    const localActiveClue = clues.indexOf(activeClue);
    if(localActiveClue >= 0) {
      this.props.boardState.activeClue = clues[(localActiveClue + 1) % clues.length];
    } else {
      this.props.boardState.activeClue = clues[0];
    }
    const squareIndex = this.props.boardState.squares.indexOf(square);
    this.props.boardState.activeSquare = squareIndex;
  }

  activeLines(x, y, direction, key) {
    const {squareHeight} = this.props.boardState;
    if(direction == "down")
      return (
        <g key={key}>
          <path className="highlight" d={"M" + x + " " + y + " L" + x + " " + (y + squareHeight)} ></path>
          <path className="highlight" d={"M" + (x + squareHeight) + " " + y + " L" + (x + squareHeight) + " " + (y + squareHeight)} ></path>
        </g>);
    else
      return (
        <g key={key}>
          <path className="highlight" d={"M" + x + " " + y + " L" + (x + squareHeight) + " " + y}></path>
          <path className="highlight" d={"M" + x + " " + (y + squareHeight) + " L" + (x + squareHeight) + " " + (y + squareHeight)}></path>
        </g>
      )
  }

  render() {
    const {boardState} = this.props;
    return (
      <div className="board">
        <svg height={boardState.pixelWidth + 4}
          width={boardState.pixelWidth + 4}
          viewBox={"-2 -2 " + (boardState.pixelWidth + 4) + " " + (boardState.pixelWidth + 4)}>
          {boardState.puzzleSquares.map((square, i) => {
            const xPosition = square.xOffset * boardState.squareHeight;
            const yPosition = square.yOffset * boardState.squareHeight;
            return (<g key={i}>
              <rect x={xPosition}
                y={yPosition}
                width={boardState.squareHeight}
                height={boardState.squareHeight}
                className={'square-' + square.colour}
                onClick={_=>this.onClickSquare(square)}>
              </rect>
              <text x={xPosition + 1.5}
                y={yPosition + 9.5}
                className="square-label">
                {square.label}
              </text>
              <text x={xPosition + boardState.squareHeight / 2}
                y={yPosition + boardState.squareHeight / 1.3}
                textAnchor="middle"
                className="square-text"
                onClick={_=>this.onClickSquare(square)}>
                {square.text}
              </text>
            </g>);
          })}
          {boardState.puzzleSquares.map((square, i) => {
            const xPosition = square.xOffset * boardState.squareHeight;
            const yPosition = square.yOffset * boardState.squareHeight;
            return square.active ? this.activeLines(xPosition, yPosition, square.activeDirection, i) : '';
          })}
        </svg>
      </div>
    );
  }
}