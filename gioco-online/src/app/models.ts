
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

    constructor(public id: number,public maker: Users, public date: Date, public status: MatchStatusType) {
        this.makerDescription = `${this.maker.name} ${this.maker.surname}`;
        this.date = new Date(date);
    }

    public get player(){
      return this._player;
    }

    public set player(user: Users){
      this._player = user;
      this.playerDescription = `${this._player.name} ${this._player.surname}`;
      this.currentPlayer = user;
    }

    addMove(move: Move) {
        this.moves.push(move);
        this.currentPlayer = this.currentPlayer == this.maker ? this._player: this.maker
    }

    static build( matches: Matches){
        let match = new  Matches(matches.id, matches.maker, matches.date, matches.status);
        if(matches._player) match.player = matches._player;
        match.moves = matches.moves;
        return match;
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

