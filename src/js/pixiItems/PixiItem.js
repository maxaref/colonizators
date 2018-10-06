import { sizes } from 'Js/configs/sizes';

export class PixiItem {
  constructor() {
    this.coordinates = {
      x: 0,
      y: 0,
    };
  }

  create(size, image) {
    const { width, height } = sizes[size] || sizes['DEFAULT'];

    this.pixiItem = PIXI.Sprite.fromImage(image);
    this.pixiItem.x = this.coordinates.x;
    this.pixiItem.y = this.coordinates.y;
    this.pixiItem.width = width;
    this.pixiItem.height = height;

    this.width = width;
    this.height = height;
  }

  wrapContainer(space = 0) {
    this.space = space;

    const image = this.pixiItem;

    this.pixiItem = new PIXI.Container();
    this.pixiItem.x = image.x - space;
    this.pixiItem.y = image.y - space;

    image.x = space;
    image.y = space;

    this.pixiItem.addChild(image);

    this.width += space * 2;
    this.height += space * 2;
  }

  update() {}
}