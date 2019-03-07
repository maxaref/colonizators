import { PixiItem } from 'Js/pixiItems/PixiItem';
import { sizes } from 'Js/configs/sizes';
import { Geometry } from 'Js/services/Geometry';
import { random } from 'lodash';

export class PlanetShips extends PixiItem {
  constructor(planet, ships) {
    super();

    this.planet = planet;
    this.state = ships;
    this.frameRotation = 2 * Math.PI / 60 / 50;
    this.shipSpace = sizes.SHIP.width + 5;
    this.orbitShipsCount = Geometry.getCircleItemsCount(this.r, this.shipSpace);
    this.oneShipAngle = 2 * Math.PI / this.orbitShipsCount;
    this.spaceBetweenPlayers = 2;

    this.animateQueue = [];

    this.createContainer();
    this.addShips();
  }

  get r() {
    return this.planet.width / 2;
  }

  getShipsSpaces(ships) {
    const totalCount = ships.reduce((sum, { count }) => sum + count, 0);

    let orbitShipsCount = this.orbitShipsCount;
    if (ships.length > 1) orbitShipsCount -= ships.length * this.spaceBetweenPlayers;

    let currentSpaceStart = 0;
    let positions = [];

    /**
     * TODO иногда orbitShipsCount на 1 меньше чем отрисованных кораблей,
     * из-за округления. В этом случае растояние не равномерно.
     */
    ships.forEach(({ count }) => {
      const spacePart = count / totalCount;
      const spacePartShipsCount = Math.round(spacePart * orbitShipsCount);

      if (spacePartShipsCount <= count) {
        positions.push({
          start: currentSpaceStart,
          count: spacePartShipsCount
        });
      } else {
        const firstPosition = Math.floor((spacePartShipsCount - count) / 2) + currentSpaceStart;

        positions.push({
          start: firstPosition,
          count
        });
      }

      currentSpaceStart = currentSpaceStart + spacePartShipsCount + this.spaceBetweenPlayers;
    });

    return positions;
  }

  getShipPosition(i, startPosition = 0) {
    const currentR = i % 2 === 0 ? this.r : this.r + 15;
    const position = Geometry.getCirclePointCoordinates(
      currentR,
      this.oneShipAngle * startPosition + this.oneShipAngle * i
    );

    return {
      x: this.r + position.x,
      y: this.r + position.y,
    };
  }
  
  createContainer() {
    this.pixiItem = new PIXI.Container();

    this.pixiItem.position.x = this.planet.width / 2;
    this.pixiItem.position.y = this.planet.width / 2;
    this.pixiItem.pivot.x = this.planet.width / 2;
    this.pixiItem.pivot.y = this.planet.width / 2;
  }

  addShips() {
    this.playerShips = [];
    const shipSpaces = this.getShipsSpaces(this.state);
    
    shipSpaces.forEach(({ start, count }, playerNumber) => {
      for(let i = 0; i < count; i++) {
        const ship = this.createShip(this.state[playerNumber].player.color, i, start);

        if (!this.playerShips[playerNumber]) this.playerShips[playerNumber] = [];
        this.playerShips[playerNumber].push(ship);

        this.pixiItem.addChild(ship.pixiItem);
      }
    });
  }

  createShip(color, shipNumber, startPosition) {
    const ship = new PixiItem();
    ship.create('SHIP', `images/ships/simple_${color}.svg`);

    const shipPosition = this.getShipPosition(shipNumber, startPosition);
    Object.assign(ship.pixiItem, shipPosition);

    const angle = Geometry.getAngleBetweenPoints(
      { x: this.r, y: this.r },
      shipPosition
    );

    ship.pixiItem.anchor.set(0.5);
    ship.pixiItem.rotation = angle - Math.PI / 4 + Math.PI;
    
    return ship;
  }

  update(state) {
    if (state && state !== this.state) {
      this.state = state;

      this.animateQueue.push(() => {
        this.pixiItem.removeChildren();
        this.addShips();
      });
    }

    // state.forEach(({ count }, i) => {
    //   if (count < prevState[i].count) this.hideDefeatedShips(i, prevState[i].count - count);
    // });

  }

  animate() {
    if (this.animateQueue.length) {
      const animation = this.animateQueue.shift();
      animation();
    }

    this.pixiItem.rotation += this.frameRotation;
  }

  hideDefeatedShips(playerNumber, defeatedShipsCount) {
    let currentCount = this.playerShips[playerNumber].length;

    let needDestroyCount = Math.floor(currentCount / 2);
    console.log(currentCount, needDestroyCount, defeatedShipsCount);
    if (defeatedShipsCount < needDestroyCount) needDestroyCount = defeatedShipsCount;
    console.log(needDestroyCount);

    for(let i = 0; i < needDestroyCount; i++) {
      const itemNumber = random(0, currentCount - 1);
      this.pixiItem.removeChild(this.playerShips[playerNumber][itemNumber].pixiItem);
      this.playerShips[playerNumber].splice(itemNumber, 1);
      currentCount--;
    }
  }
}