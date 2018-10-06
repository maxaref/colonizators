
export class Geometry {
  static getCircleItemsCount(r, width) {
    const orbitLength = 2 * r * Math.PI;
    return Math.round(orbitLength / width);
  }

  static getAngleBetweenPoints(first, second) {
    return Math.PI + Math.atan2(first.y - second.y, first.x - second.x);
  }

  static getCirclePointCoordinates (r, angle) {
    return ({
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
    });
  }
}