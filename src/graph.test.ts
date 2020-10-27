import { Graph } from './graph';

const TEST_INPUT = ['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7'];

describe('Graph', () => {
  test('graph initialise edges with correct format', () => {
    const graph = new Graph(TEST_INPUT);

    expect(graph.edges).toMatchObject({
      A: { B: 5, D: 5, E: 7 },
      B: { C: 4 },
      C: { D: 8, E: 2 },
      D: { C: 8, E: 6 },
      E: { B: 3 },
    });
  });
});
