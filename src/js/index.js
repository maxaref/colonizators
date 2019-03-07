import '../styles/index.css';
import 'pixi.js';
import { game } from 'Js/configs/game';
import { gameScene } from 'Js/gameScene';
import { planetsState } from 'Js/services/state/planetsState';

const { screenWidth, screenHeight, worldHeight, worldWidth } = game;

const app = new PIXI.Application(screenWidth, screenHeight);
app.renderer.autoResize = true;

app.stage.addChild(gameScene);
document.body.appendChild(app.view);

const frameAnimationHandler = () => {
  planetsState.animate();

  requestAnimationFrame(frameAnimationHandler);
};
requestAnimationFrame(frameAnimationHandler);
