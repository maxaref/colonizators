import { PixiItem } from 'Js/pixiItems/PixiItem';
import { PlanetShips } from 'Js/pixiItems/PlanetShips';

export class Planet extends PixiItem {
  static create(size, coordinates, player, ships) {
    return new Planet({
      size,
      coordinates,
      player: player,
      ships,
    });
  }

  constructor(params) {
    super();

    Object.assign(this, params);

    this.create();
  }

  create() {
    // TODO one image for every planet
    const image = `images/planets/${this.player.color}.svg`;

    super.create(`PLANET_${this.size}`, image);

    this.orbitDistance = 15;
    this.wrapContainer(this.orbitDistance);
    this.drawShips();
  }

  drawShips() {
    this.ships = new PlanetShips(this, this.ships);
    this.pixiItem.addChild(this.ships.pixiItem);
  }

  update(shipsState) {
    this.ships.update(shipsState);
  }
}

