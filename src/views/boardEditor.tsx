import * as React from 'react'
import { observer } from 'mobx-react'
import BoardState, { square } from '../stores/board'
import '../styles/board.css'

@observer
export default class BoardView extends React.Component<{ boardState: BoardState }, {}> {
  render() {
    const {boardState} = this.props;
    return (
      <div className="board editable">
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
                className={'square-' + square.colour}>
              </rect>
              <text x={xPosition + 1.5}
                y={yPosition + 9.5}
                className="square-label">
                {square.label}
              </text>
              <text x={xPosition + boardState.squareHeight / 2}
                y={yPosition + boardState.squareHeight / 1.3}
                textAnchor="middle"
                className="square-text">
                {square.text}
              </text>
            </g>);
          })}
        </svg>
      </div>
    );
  }
}
