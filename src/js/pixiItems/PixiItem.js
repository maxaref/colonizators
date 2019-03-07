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
    this.pixiItem.x = image.x;
    this.pixiItem.y = image.y;

    this.width += space * 2;
    this.height += space * 2;

    this.setBackground(image);
  }

  setBackground(image) {
    let item = image;
    if (typeof image === 'string') item = PIXI.Sprite.fromImage(image);

    if (this.pixiItem.children.length) this.pixiItem.removeChildAt(0);

    item.x = this.space;
    item.y = this.space;
    item.width = this.width - this.space * 2;
    item.height =  this.height - this.space * 2;

    this.pixiItem.addChildAt(item, 0);
  }

  update() {}
}