import { gameScene } from 'Js/gameScene';
import { Geometry } from 'Js/services/Geometry';

class TransactionsState {

  constructor() {
    this.transactions = [];
    this.maxAmountOnce = 10;
  }

  createTransaction(planetFrom, planetTo) {
    const t = {
      pixiItem: new PIXI.Container(),
      planetFrom,
      planetTo,
      coordinates: {
        from: this.getCoordinates(planetFrom, planetTo),
        to: this.getCoordinates(planetTo, planetFrom),
      },
    };

    this.transactions.push(t);
  }

  getCoordinates(planetFrom, planetTo) {
    const angle = Geometry.getAngleBetweenPoints(planetFrom.coordinates, planetTo.coordinates);
    return Geometry.getCirclePointCoordinates(planetFrom.width / 2, angle);
  }
}

export const transactionsState = new TransactionsState();