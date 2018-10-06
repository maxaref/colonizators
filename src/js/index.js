import '../styles/index.css';
import 'pixi.js';
import { game } from 'Js/configs/game';
import { Scene } from 'Js/Scene';
import { Player } from 'Js/Player';
import { Planet } from 'Js/pixiItems/Planet';

const { screenWidth, screenHeight, worldHeight, worldWidth } = game;

const app = new PIXI.Application(screenWidth, screenHeight);
app.renderer.autoResize = true;

const gameScene = new Scene();

app.stage.addChild(gameScene);
document.body.appendChild(app.view);

const players = {
  none: new Player({ color: 'gray' }),
  first: new Player({ color: 'red' }),
  second: new Player({ color: 'green' }),
  third: new Player({ color: 'orange' }),
};

let planetsStates = [
  [{
    player: players.first,
    count: 70,
  }],
  [{
    player: players.none,
    count: 4,
  },{
    player: players.third,
    count: 7,
  }],
  [{
    player: players.none,
    count: 30,
  },{
    player: players.first,
    count: 1,
  }],
  [{
    player: players.none,
    count: 50,
  },{
    player: players.first,
    count: 390,
  },{
    player: players.second,
    count: 50,
  }, {
    player: players.third,
    count: 400,
  }]
];

planetsStates = planetsStates.map(state => {
  return state.sort().reverse();
});

const planets = [
  Planet.create('S', { x: 70, y: 270 }, players.none, planetsStates[0]),
  Planet.create('S', { x: 230, y: 130 }, players.none, planetsStates[1]),
  Planet.create('XS', { x: 500, y: 550 }, players.none, planetsStates[2]),
  Planet.create('L', { x: 560, y: 250 }, players.first, planetsStates[3])
];

planets.forEach(planet => gameScene.addChild(planet.pixiItem));

const shipHP = 10;
const shipDamage = 1;

const updatePlanetState = (i) => {
  const players = planetsStates[i];

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

  planetsStates[i] = newState.filter(state => state.count > 0);

  // console.log(planetsStates.map((player) => player.map(({ count }) => count)));
};

setInterval(() => planetsStates.forEach((state, i) => updatePlanetState(i)), 1000);

const frameAnimationHandler = () => {
  planets.forEach((planet, i) => {
    planet.update(planetsStates[i]);
  });

  requestAnimationFrame(frameAnimationHandler);
};
requestAnimationFrame(frameAnimationHandler);
