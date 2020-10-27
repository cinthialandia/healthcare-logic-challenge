import { Graph } from './graph';

const TEST_INPUT = 'AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7';

describe('Graph', () => {
  let graph: Graph;

  beforeAll(() => {
    graph = new Graph(TEST_INPUT);
  });

  test('graph initialise edges with correct format', () => {
    expect(graph.edges).toMatchObject({
      A: { B: 5, D: 5, E: 7 },
      B: { C: 4 },
      C: { D: 8, E: 2 },
      D: { C: 8, E: 6 },
      E: { B: 3 },
    });
  });

  test('The distance of the route A-B-C should be 9', () => {
    expect(graph.getDistance(['A', 'B', 'C'])).toBe(9);
  });

  test('The distance of the route A-D should be 5', () => {
    expect(graph.getDistance(['A', 'D'])).toBe(5);
  });

  test('The distance of the route A-D-C should be 13', () => {
    expect(graph.getDistance(['A', 'D', 'C'])).toBe(13);
  });

  test('The distance of the route A-E-B-C-D should be 22', () => {
    expect(graph.getDistance(['A', 'E', 'B', 'C', 'D'])).toBe(22);
  });

  test('The distance of the route A-E-D should throw an error', () => {
    expect(() => graph.getDistance(['A', 'E', 'D'])).toThrowError('NO SUCH ROUTE');
  });

  test('The number of trips starting at C and ending at C with a maximum of 3 stops should be 2', () => {
    // there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops)
    expect(graph.findAmountOfRoutesByLimit('C', 'C', 3)).toBe(2);
  });

  test('The number of trips starting at A and ending at C with exactly 4 stops should be 3', () => {
    //  there are three such trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B)
    expect(graph.findAmountOfRoutesByStops('A', 'C', 4)).toBe(3);
  });

  test('The length of the shortest route (in terms of distance to travel) from A to C should be 9', () => {
    expect(graph.findLengthOfShortestRoute('A', 'C')).toBe(9);
  });

  test('The length of the shortest route (in terms of distance to travel) from B to B should be 9', () => {
    expect(graph.findLengthOfShortestRoute('B', 'B')).toBe(9);
  });

  test('The number of different routes from C to C with a distance of less than 30 should be 7', () => {
    //In the sample data, the trips are: CDC, CEBC, CEBCDC, CDCEBC, CDEBC, CEBCEBC, CEBCEBCEBC.
    expect(graph.findAmountOfRoutesByDistance('C', 'C', 30)).toBe(7);
  });
});
