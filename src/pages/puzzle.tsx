import * as React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import BoardView from '../views/board'
import EditorView from '../views/boardEditor'
import BoardState from '../stores/board'
import ClueList from '../views/clueList'
import "../styles/global.css"

const redditSample = {
  "title": "AOTD crossword grid #1", "author": "reddit", "size": 15, "clues":
  [{ "answers": ["BISHOP"], "directions": ["A"], "clue": "Primate to dance around his bananas", "numbers": [1], "starts": [0], "answerLengths": [6] },
  { "answers": ["NEPOTISM"], "directions": ["A"], "clue": "Points me out as favouring relatives", "numbers": [4], "starts": [7], "answerLengths": [8] }]
};

const sample = { "title": "25,859", "author": "Brummie", "size": 15, "clues": [{ "answers": ["SNUB", "NOSE"], "directions": ["D", "D"], "clue": "Puggish feature of bonuses distributed and reduced internally", "numbers": [1, 3], "starts": [0, 4], "answerLengths": [4, 4] }, { "answers": ["WARDROBE", "MISTRESS"], "directions": ["D", "D"], "clue": "She would ineptly get players into bad habits", "numbers": [2, 21], "starts": [2, 117], "answerLengths": [8, 8] }, { "answers": ["CHOLERIC"], "directions": ["D"], "clue": "Oh, to be back in New Circle Cross", "numbers": [4], "starts": [6], "answerLengths": [8] }, { "answers": ["OUTWIT"], "directions": ["D"], "clue": "Be more ingenious than blooming joker", "numbers": [5], "starts": [8], "answerLengths": [6] }, { "answers": ["FETCHINGUP"], "directions": ["D"], "clue": "Coming to a stop, pretty high on drugs?", "numbers": [6], "starts": [10], "answerLengths": [10] }, { "answers": ["STAR"], "directions": ["D"], "clue": "How annoying to be turned over for lead", "numbers": [8], "starts": [14], "answerLengths": [4] }, { "answers": ["COUCH", "POTATO"], "directions": ["D", "D"], "clue": "Idle person with set habit needs analyst's aid \"Doctor too pat\"", "numbers": [13, 7], "starts": [75, 12], "answerLengths": [5, 6] }, { "answers": ["NGAIO"], "directions": ["A"], "clue": "Marsh ground in Goa?", "numbers": [9], "starts": [15], "answerLengths": [5] }, { "answers": ["HOUSECOAT"], "directions": ["A"], "clue": "Exploitation by commanding officer, one in sizzling casual wear", "numbers": [10], "starts": [21], "answerLengths": [9] }, { "answers": ["BEDFELLOW"], "directions": ["A"], "clue": "Close associate's bottom sagged -- that's painful!", "numbers": [11], "starts": [45], "answerLengths": [9] }, { "answers": ["CHAIR", "PERSON"], "directions": ["A", "D"], "clue": "One with an agenda -- hacking car phones with iridium implant", "numbers": [12, 23], "starts": [55, 137], "answerLengths": [5, 6] }, { "answers": ["CLOBBER"], "directions": ["A"], "clue": "Line in mate's clothing", "numbers": [13], "starts": [75], "answerLengths": [7] }, { "answers": ["TRIPODS"], "directions": ["A"], "clue": "Died wearing examination supports", "numbers": [15], "starts": [83], "answerLengths": [7] }, { "answers": ["UPEND"], "directions": ["A"], "clue": "Studendous housing tip", "numbers": [17], "starts": [105], "answerLengths": [5] }, { "answers": ["GUMBO"], "directions": ["A"], "clue": "Soup from rounded, duck-black vessel", "numbers": [20], "starts": [115], "answerLengths": [5] }, { "answers": ["HYPEDUP"], "directions": ["A"], "clue": "Keen to go having been needled?", "numbers": [22], "starts": [135], "answerLengths": [7] }, { "answers": ["REPOSAL"], "directions": ["A"], "clue": "Act of sleeping produced by bad opera's length!", "numbers": [25], "starts": [143], "answerLengths": [7] }, { "answers": ["VIRTU"], "directions": ["A"], "clue": "Collective curios mostly outrival returns", "numbers": [26], "starts": [165], "answerLengths": [5] }, { "answers": ["GEOMETRIC"], "directions": ["A"], "clue": "Making tiger come out of a pyramid, say", "numbers": [27], "starts": [171], "answerLengths": [9] }, { "answers": ["GOODLOOKS"], "directions": ["A"], "clue": "Admirable features, thorough observations", "numbers": [30], "starts": [195], "answerLengths": [9] }, { "answers": ["MOSES"], "directions": ["A"], "clue": "One seen in rushes of movie, ultimately eaten by plant?", "numbers": [31], "starts": [205], "answerLengths": [5] }, { "answers": ["BODYDOUBLE"], "directions": ["D"], "clue": "One physically representing an actor needs stiff drink of spirits", "numbers": [14], "starts": [79], "answerLengths": [10] }, { "answers": ["STOOL", "PIGEON"], "directions": ["D", "D"], "clue": "Homer's after second cutter, say, for grass", "numbers": [16, 24], "starts": [89, 141], "answerLengths": [5, 6] }, { "answers": ["WARHORSE"], "directions": ["D"], "clue": "Old, much performed piece? Actually, a modern bit", "numbers": [19], "starts": [113], "answerLengths": [8] }, { "answers": ["VEGA"], "directions": ["D"], "clue": "Greens commonly associated with top grade star", "numbers": [26], "starts": [165], "answerLengths": [4] }, { "answers": ["EMMY"], "directions": ["D"], "clue": "Oscar's equivalent of a thief's aid (not jack)", "numbers": [28], "starts": [175], "answerLengths": [4] }, { "answers": ["CASH", "COW"], "directions": ["D", "A"], "clue": "\"Nice little earner\" from bread and milk supplier", "numbers": [29, 18], "starts": [179, 111], "answerLengths": [4, 3] }] };


class AppState {
  @observable timer = 0;

  constructor() {
  }

  resetTimer() {
    this.timer = 0;
  }
}

@observer
export default class CrosswordView extends React.Component<{ appState: AppState, height: number, params: number }, {}> {
  render() {
    console.log(this.props.id);
    return (
      <div className="crossword" style={{ height: height + 20 }}>
        <h2>{boardState.title}</h2>
        <h3>{boardState.author}</h3>
        <BoardView boardState={boardState}></BoardView>
        <ClueList boardState={boardState}></ClueList>
      </div>
    );
  }

  onReset = () => {
    this.props.appState.resetTimer();
    boardState.activeSquare += 1;
  }
};

const appState = new AppState();
const boardState = new BoardState(sample);
const height = sample.size * boardState.squareHeight;
