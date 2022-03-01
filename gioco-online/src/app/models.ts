
export class Users {
    public date: Date;
    userMatches: number;
    points: number;
    constructor(public id: number, public name: string,public surname: string) {
        this.date = new Date();
        this.userMatches = 0;
        this.points = 0;
    }
    get fullName():string {
        return this.name + ' ' + this.surname;
    }
    addUserMatch(user: Users) {
        user.userMatches = user.userMatches + 1;
    }
    addUserPoint(user: Users) {
        user.points = user.points + 1;
    }
    static build(users: Users) {
        let user = new Users(users.id, users.name, users.surname);
        user.date = users.date;
        user.userMatches = users.userMatches;
        user.points = users.points;
        return user;
    }
}

export class Matches {

    private _player: Users;
    playerDescription: string;
    makerDescription: string;
    currentPlayer: Users;
    moves: Move[] = [];
    winner: Users;

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
        if (this.moves.length < 4) { 
            this.moves.push(move);
            this.currentPlayer = this.currentPlayer.name == this.maker.name && this.currentPlayer.surname == this.maker.surname ? this._player : this.maker //TO ASK: Perchè se confronto gli oggetti non funziona?
        } else if (this.moves.length == 4) { 
            this.moves.push(move);
            this.winner = this.currentPlayer.name == this.maker.name && this.currentPlayer.surname == this.maker.surname ? this._player : this.maker
            this.winner.points = this.winner.points + 4;
            this.winner.name == this.maker.name && this.winner.surname == this.maker.surname ? this._player.points = this._player.points + 1 : this.maker.points = this.maker.points + 1;
            this.status = MatchStatusType.end;
        }
        
    }
    
    static build( matches: Matches){
        let match = new  Matches(matches.id, matches.maker, matches.date, matches.status);
        if(matches._player) match.player = matches._player;
        match.currentPlayer = matches.currentPlayer;
        match.moves = matches.moves;
        match.winner = matches.winner;
        return match;
    }
}

export class Move {
    public date: Date;
    constructor(public maker: Users, public type: string) {
        this.date = new Date();
    }

    get makerName():string {
        return 'pippo';
    }


}


export enum MatchStatusType {
    onHold,
    onGoing,
    end,
}

