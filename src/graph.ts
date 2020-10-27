interface Node {
  [end: string]: number;
}

interface Edges {
  [start: string]: Node;
}

type Route = string[];

export class Graph {
  edges: Edges = {};

  constructor(routes: string[]) {
    routes.forEach((route) => {
      const [start, end, length] = route.split('');

      if (!this.edges[start]) {
        this.edges[start] = {};
      }

      this.edges[start][end] = Number(length);
    });
  }

  getDistance(path: string[]): number {
    if (path.length < 2) {
      throw new Error('NO SUCH ROUTE');
    }

    let result = 0;

    const visitNextNode = (currentNode: Node, currentPath: string[]) => {
      const [next, ...restPath] = currentPath;

      if (!next) {
        return;
      }

      if (!currentNode[next]) {
        throw new Error('NO SUCH ROUTE');
      }

      result = result + currentNode[next];

      visitNextNode(this.edges[next], restPath);
    };

    const [first, ...restPath] = path;
    visitNextNode(this.edges[first], restPath);

    return result;
  }

  getRoutes(start: string, end: string, limit = 3): Route[] {
    const routes: Route[] = [];

    const visitNextNodes = (currentPath: string[], currentNode: Node, currentLimit: number) => {
      const restLimit = currentLimit - 1;
      if (restLimit < 0) {
        return;
      }

      if (currentNode[end]) {
        routes.push([...currentPath, end]);
      }

      for (const next in currentNode) {
        visitNextNodes([...currentPath, next], this.edges[next], restLimit);
      }
    };

    visitNextNodes([start], this.edges[start], limit);

    return routes;
  }

  findRoutesByDistance(start: string, end: string, maxDistance: number): Route[] {
    if (!maxDistance) {
      return [];
    }

    const routes: Route[] = [];

    const visitNextNodes = (currentPath: string[], currentNode: Node, currentDistance: number) => {
      if (currentDistance > maxDistance) {
        return;
      }

      if (currentNode[end] && currentDistance + currentNode[end] < maxDistance) {
        routes.push([...currentPath, end]);
      }

      for (const next in currentNode) {
        visitNextNodes([...currentPath, next], this.edges[next], currentDistance + currentNode[next]);
      }
    };

    visitNextNodes([start], this.edges[start], 0);

    return routes;
  }

  findRoutesByStops(start: string, end: string, length: number): Route[] {
    const paths = this.getRoutes(start, end, length);

    return paths.filter((path) => path.length === length + 1);
  }

  findShortestRouteDistance(start: string, end: string, limit?: number): number {
    const routes = this.getRoutes(start, end, limit);
    const routeDistances = routes.map((path) => this.getDistance(path));

    const [shortestDistance] = routeDistances.sort((a, b) => a - b);
    return shortestDistance;
  }
}
