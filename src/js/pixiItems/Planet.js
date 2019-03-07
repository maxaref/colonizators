import { PixiItem } from 'Js/pixiItems/PixiItem';
import { PlanetShips } from 'Js/pixiItems/PlanetShips';
import { playersState } from 'Js/services/state/playersState';
import * as actions from 'Js/services/actions';

export class Planet extends PixiItem {
  static create(planet) {
    const { id, size, coordinates, state } = planet;

    return new Planet({
      id,
      size,
      coordinates,
      player: state.player,
      ships: state.ships,
    });
  }

  constructor(params) {
    super();

    Object.assign(this, params);

    this.create();
  }

  create() {
    // TODO one image for every planet
    this.image = `images/planets/${this.player.color}.svg`;
    this.selectedImage = `images/planets/${this.player.color}_selected.svg`;

    super.create(`PLANET_${this.size}`, this.image);

    this.orbitDistance = 15;
    this.wrapContainer(this.orbitDistance);
    this.setUserSelectHandler();
    this.drawShips();
  }

  drawShips() {
    this.ships = new PlanetShips(this, this.ships);
    this.pixiItem.addChild(this.ships.pixiItem);
  }

  update(shipsState) {
    this.ships.update(shipsState);
  }

  animate() {
    this.ships.animate();
  }

  setUserSelectHandler() {
    console.log(playersState.getCurrentPlayerId() !== +this.player.id, playersState.getCurrentPlayerId(), this.player.id);
    if (playersState.getCurrentPlayerId() !== +this.player.id) return;

    this.pixiItem.interactive = true;
    this.pixiItem
      .on('click', () => actions.selectPlanet(this));
  }

  select() {
    this.setBackground(this.selectedImage);
  }

  deselect() {
    this.setBackground(this.image);
  }
}

