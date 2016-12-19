import { observable, computed } from 'mobx';

type direction = "across" | "down";
type colour = "white" | "black";
interface IClue {
    directions: direction[],
    starts: number[],
    lengths: number[],
    numbers: number[],
    clue: string
};

export type square = {
    xOffset: number,
    yOffset: number,
    colour: colour,
    label: string,
    text: string,
    active: boolean,
    activeDirection?: direction,
    clues?: number[]
}

export default class BoardState {
    @observable activeSquare = 0;
    @observable activeClue = 0;
    @observable activeDirection: direction = "down";
    @observable squareHeight = 30;
    @observable text: string[] = [];

    readonly size;
    readonly width;
    readonly clues: IClue[] = [];
    readonly squares: square[] = [];
    readonly author;
    readonly title;

    @computed get pixelWidth() {
        return this.squareHeight * this.width;
    }

    @computed get puzzleSquares() {
        let squares = this.squares.slice();
        squares.map(s => { s.active = false });
        this.text.map((t, i) => squares[i].text = t);
        const activeClue = this.clues[this.activeClue];
        let activeSquares = [];
        activeClue.starts.map((start, i) => {
            const length = activeClue.lengths[i];
            const direction = activeClue.directions[i];
            const inc = direction == "across" ? 1 : this.width;
            for (let i = 0; i < length; i++) {
                squares[start + i * inc].active = true;
                squares[start + i * inc].activeDirection = direction;
            }
        });
        return squares;
    }

    addLetter(letter) {
        this.text[this.activeSquare] = letter;
        const activeSquare = this.puzzleSquares[this.activeSquare];
        let inc = activeSquare.activeDirection == "across" ? 1 : this.width;
        const clue = this.clues[this.activeClue];
        const starts = clue.starts;
        const directions = clue.directions;
        const lengths = clue.lengths;
        const section = 0;
        let found = false;
        for (let i = 0; i < lengths.length; i++) {
            for (let j = 0; j < lengths[i]; j++) {
                if (this.activeSquare == (starts[i] + inc * j)) {
                    found = true;
                    if (j == lengths[i] - 1) {
                        if (starts.length > (i + 1))
                            this.activeSquare = starts[i + 1];
                        inc = 0;
                    }
                    break;
                }
            }
            if (found) break;
        }
        if (letter == '')
            this.activeSquare -= inc;
        else
            this.activeSquare += inc;
    }

    constructor(crossword) {
        this.size = Math.pow(crossword.size, 2);
        this.title = crossword.title;
        this.author = crossword.author;
        this.width = Math.sqrt(this.size);
        for (let i = 0; i < this.size; i++) {
            const r: square = {
                xOffset: i % this.width,
                yOffset: Math.floor(i / this.width),
                colour: "black",
                label: '',
                text: "",
                active: false
            }
            this.squares.push(r);
            this.text.push("");
        }

        crossword.clues.map(clue => {
            const directions: direction[] = clue.directions.map(d => {
                const direction: direction = d == "A" ? "across" : "down";
                return direction;
            });
            this.clues.push({
                directions: directions,
                starts: clue.starts,
                lengths: clue.answerLengths,
                numbers: clue.numbers,
                clue: clue.clue
            })
        });


        this.clues.map((clue, i) => {
            clue.starts.map((start, inner) => {
                this.squares[start].label = clue.numbers[inner].toString();
                const inc = (j) => {
                    let offset;
                    if (clue.directions[inner] == 'across')
                        offset = start + j;
                    else
                        offset = start + j * this.width;
                    this.squares[offset].colour = "white";
                    if (!this.squares[offset].clues)
                        this.squares[offset].clues = [];
                    this.squares[offset].clues.push(i);
                }
                for (var j = 0; j < clue.lengths[inner]; j++) {
                    inc(j);
                }
            });
        });
    }
};
