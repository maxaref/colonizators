import { Player } from 'Js/Player';

class PlayersState {

  constructor() {
    this.players = {
      1: new Player({ color: 'gray', id: '1' }),
      2: new Player({ color: 'red', id: '2' }),
      3: new Player({ color: 'green', id: '3' }),
      4: new Player({ color: 'orange', id: '4' }),
    };
  }
  
  getCurrentUserId() {
    return 2;
  }

  getPlayers() {
    return this.players;
  }

  getCurrentPlayerId() {
    return 2;
  }

  getById(id) {
    return this.players[id];
  }
}

export const playersState = new PlayersState();