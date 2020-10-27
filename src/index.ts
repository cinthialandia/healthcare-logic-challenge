import { Graph } from './graph';

const graph = new Graph(['AB5', 'BC4', 'CD8', 'DC8', 'DE6', 'AD5', 'CE2', 'EB3', 'AE7']);

console.log(graph.findRoutesByStops('A', 'C', 4));

console.log(graph.getRoutes('C', 'C', 3));

console.log(graph.getDistance(['A', 'B', 'C']));

console.log(graph.findShortestRouteDistance('B', 'B'));

console.log(graph.findRoutesByDistance('C', 'C', 30));
