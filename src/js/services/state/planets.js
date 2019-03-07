import { playersState } from './playersState';

export const planets = [
  {
    id: 'p1',
    size: 'S',
    coordinates: { x: 50, y: 190 },
    state: {
      player: playersState.getById(2),
      ships: [
        {
          player: playersState.getById(1),
          count: 4,
        },{
          player: playersState.getById(4),
          count: 7,
        }
      ],
    }
  },
  {
    id: 'p2',
    size: 'L',
    coordinates: { x: 400, y: 200 },
    state: {
      player: playersState.getById(2),
      ships: [
        {
          player: playersState.getById(1),
          count: 30,
        },{
          player: playersState.getById(2),
          count: 20,
        },{
          player: playersState.getById(3),
          count: 20,
        },{
          player: playersState.getById(4),
          count: 20,
        }
      ],
    }
  },
  {
    id: 'p3',
    size: 'L',
    coordinates: { x: 790, y: 490 },
    state: {
      player: playersState.getById(2),
      ships: [
        {
          player: playersState.getById(2),
          count: 30,
        }
      ],
    }
  },
];
