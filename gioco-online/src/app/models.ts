
export class Users {

    constructor(readonly name: string,readonly surname: string) {
        
    }

}

export class Matches {
    private _player: Users;
    playerDescription: string;
    makerDescription: string;
    currentPlayer: Users;
    moves: Move[] = [];
    constructor(public id: number,public maker: Users,public date: Date, public status: MatchStatusType) {
        this.makerDescription = `${this.maker.name} ${this.maker.surname}`;
    }
    public set player(user: Users) {
        this._player = user;
        this.playerDescription = `${this._player.name} ${this._player.surname}`;
        this.currentPlayer = user;
    }
    public get player() {
        return this._player;
    }
    addMove(move: Move) {
        this.moves.push(move)
        /* if (this.currentPlayer == this.maker) {
            this.currentPlayer = this.player
        } else {
            this.currentPlayer = this.maker
        } */
        this.currentPlayer = this.currentPlayer == this.maker ? this.player: this.maker
    }
}

export class Move {
    public date: Date;
    constructor(public maker: Users) {
        this.date = new Date();
    }

}

export enum MatchStatusType {
    onHold,
    onGoing,
    end,
}

