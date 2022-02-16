
export class Users {
    public date: Date;
    userMatches: number;
    constructor(public id: number, readonly name: string,readonly surname: string) {
        this.date = new Date();
    }
    get fullName():string {
        return this.name + ' ' + this.surname;
    }
    addUserMatch(user: Users) {
        this.userMatches = this.userMatches + 1;
    }
    static build(users: Users) {
        let user = new Users(users.id, users.name, users.surname);
        user.date = users.date;
        user.userMatches = users.userMatches;
        return user;
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
        this.currentPlayer = this.currentPlayer.name == this.maker.name && this.currentPlayer.surname == this.maker.surname ? this._player : this.maker //TO ASK: Perchè se confronto gli oggetti non funziona?
        console.log('currentPlayer:' + this.currentPlayer.name + this.currentPlayer.surname);
        console.log('maker:' + this.maker.name + this.maker.surname);
        console.log('_player:' + this._player.name + this._player.surname);
    }

    static build( matches: Matches){
        let match = new  Matches(matches.id, matches.maker, matches.date, matches.status);
        if(matches._player) match.player = matches._player;
        match.currentPlayer = matches.currentPlayer;
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

