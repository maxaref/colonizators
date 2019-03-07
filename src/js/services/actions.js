import { planetsState } from 'Js/services/state/planetsState';

export const selectPlanet = (planet) => {
  planetsState.selectPlanet(planet);
};

export const deselect = () => {
  planetsState.deselect();
};