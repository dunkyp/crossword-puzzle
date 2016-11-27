import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import BoardView from './views/board'
import BoardState from './stores/board'
import ClueList from './views/clueList'
import "./styles/global.css"

const sample = {};

class AppState {
    @observable timer = 0;

    constructor() {
    }

    resetTimer() {
        this.timer = 0;
    }
}

@observer
class CrosswordView extends React.Component<{appState: AppState, height: number}, {}> {
    render() {
        return (
            <div className="crossword" style={{height: height + 20}}>
                <h2>{boardState.title}</h2>
                <h3>{boardState.author}</h3>
                <BoardView boardState={boardState}></BoardView>
                <ClueList boardState={boardState}></ClueList>
                <DevTools />
            </div>
        );
     }

     onReset = () => {
         this.props.appState.resetTimer();
         boardState.activeSquare += 1;
     }
};

const appState =  new AppState();
const boardState = new BoardState(sample);
const height = sample.size * boardState.squareHeight;
ReactDOM.render(<CrosswordView appState={appState} height={height} />, document.getElementById('root'));
