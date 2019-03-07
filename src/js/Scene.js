import { game} from 'Js/configs/game';
import * as actions from 'Js/services/actions';

const { screenWidth, screenHeight, worldHeight, worldWidth } = game;

export class Scene {

  constructor() {
    this.scene = new PIXI.Container();
    this.planets = [];

    this.setBackground();
    this.setSceneDragHandlers();
    
    return this.scene;
  }

  setBackground() {
    const background = new PIXI.extras.TilingSprite(
      PIXI.Texture.fromImage('images/spaces/3.png'),
      worldWidth,
      worldHeight,
    );
    this.scene.addChild(background);
  }
  
  setSceneDragHandlers() {
    this.rightBoundary = -this.scene.width + screenWidth;
    this.bottomBoundary = -this.scene.height + screenHeight;
    this.previousMousePosition = null;

    this.scene.interactive = true;
    this.scene.buttonMode = true;
    this.scene
      .on('mousedown', (e) => this.onDragStart(e))
      .on('touchstart', (e) => this.onDragStart(e))
      // events for drag end
      .on('mouseup', (e) => this.onDragEnd(e))
      .on('mouseupoutside', (e) => this.onDragEnd(e))
      .on('touchend', (e) => this.onDragEnd(e))
      .on('touchendoutside', (e) => this.onDragEnd(e))
      // events for drag move
      .on('mousemove', (e) => this.onDragMove(e))
      .on('touchmove', (e) => this.onDragMove(e));

    this.scene.on('click', (e) => this.deselect(e));
  }

  deselect(e) {
    if (e.target === this.scene) actions.deselect();
  }

  onDragStart(event) {
    this.scene.data = event.data;
    this.scene.dragging = true;
  }

  onDragEnd() {
    this.scene.previousMousePosition = null;
    this.scene.dragging = false;
    this.scene.data = null;
  }

  onDragMove() {
    if (this.scene.dragging) {
      if (!this.scene.previousMousePosition) {
        this.scene.previousMousePosition = this.scene.data.getLocalPosition(this.scene.parent);
        return;
      }

      const newPosition = this.scene.data.getLocalPosition(this.scene.parent);

      this.scene.position.x += newPosition.x - this.scene.previousMousePosition.x;
      this.scene.position.y += newPosition.y - this.scene.previousMousePosition.y;

      this.correctBoundaries();

      this.scene.previousMousePosition = this.scene.data.getLocalPosition(this.scene.parent);
    }
  }


  correctBoundaries() {
    if (this.scene.position.x > 0) this.scene.position.x = 0;
    if (this.scene.position.y > 0) this.scene.position.y = 0;
    if (this.scene.position.x < this.rightBoundary) this.scene.position.x = this.rightBoundary;
    if (this.scene.position.y < this.bottomBoundary) this.scene.position.y = this.bottomBoundary;
  }

}