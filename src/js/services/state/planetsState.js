import { planets } from './planets';
import { Planet } from 'Js/pixiItems/Planet';
import { gameScene } from 'Js/gameScene';
import { transactionsState } from 'Js/services/state/transitionsState';

class PlanetsState {

  constructor() {
    this.selectedPlanet = null;
    this.planets = [];

    setTimeout(() => {
      this.planets = planets.map((planetState) => {
        const planet = Planet.create(planetState);
        gameScene.addChild(planet.pixiItem);
        return planet;
      });
    }, 0);
  }

  getPlanets() {
    return this.planets;
  }

  getById(id) {
    return this.planets.find((planet) => id === planet.id);
  }

  updatePlanetById(id, state) {
    const planet = this.getById(id);
    planet.update(state);
  }

  animate() {
    this.planets.forEach(planet => planet.animate());
  }

  selectPlanet(planet) {
    if (this.selectedPlanet) {
      transactionsState.createTransaction(this.selectedPlanet, planet);
    }

    this.deselect();

    this.selectedPlanet = planet;
    planet.select();
  }

  deselect() {
    if (this.selectedPlanet) this.selectedPlanet.deselect();
  }
}

export const planetsState = new PlanetsState();

const shipHP = 10;
const shipDamage = 1;

const updatePlanetState = (i) => {
  const players = planets[i].state.ships;

  if (players.length === 1) return;

  let newState = players.map(player => ({ ...player }));

  players.forEach(({ player, count }) => {
    const damage = count * shipDamage / (players.length - 1);
    const killCount = Math.round(damage / shipHP);

    newState = newState
      .map(state => {
        if (state.player === player) return state;

        const count = state.count - killCount;
        return ({ ...state, count });
      });
  });

  planets[i].state.ships = newState.filter(state => state.count > 0);
  planetsState.updatePlanetById(planets[i].id, newState);

  // console.log(planetsStates.map((player) => player.map(({ count }) => count)));
};

setInterval(() => planets.forEach((planet, i) => updatePlanetState(i)), 1000);