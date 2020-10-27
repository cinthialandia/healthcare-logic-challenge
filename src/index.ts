class Graph {
  edges = {};

  constructor(routes) {
    routes.forEach((route) => {
      const [start, end, length] = route.split("");

      if (!this.edges[start]) {
        this.edges[start] = {};
      }

      this.edges[start][end] = Number(length);
    });
  }

  getDistance(path) {
    if (path.length < 2) {
      throw new Error("NO SUCH ROUTE");
    }

    let result = 0;

    const visitNextNode = (currentNode, currentPath) => {
      const [next, ...restPath] = currentPath;

      if (!next) {
        return;
      }

      if (!currentNode[next]) {
        throw new Error("NO SUCH ROUTE");
      }

      result = result + currentNode[next];

      visitNextNode(this.edges[next], restPath);
    };

    const [first, ...restPath] = path;
    visitNextNode(this.edges[first], restPath);

    return result;
  }

  getRoutes(start, end, limit = 3) {
    const paths = [];

    const visitNextNodes = (currentPath, currentNode, currentLimit) => {
      const restLimit = currentLimit - 1;
      if (restLimit < 0) {
        return;
      }

      if (currentNode[end]) {
        paths.push([...currentPath, end]);
      }

      for (const next in currentNode) {
        visitNextNodes([...currentPath, next], this.edges[next], restLimit);
      }
    };

    visitNextNodes([start], this.edges[start], limit);

    return paths;
  }

  findRoutesByDistance(start, end, maxDistance) {
    if (!maxDistance) {
      return;
    }

    const paths = [];

    const visitNextNodes = (currentPath, currentNode, currentDistance) => {
      if (currentDistance > maxDistance) {
        return;
      }

      if (
        currentNode[end] &&
        currentDistance + currentNode[end] < maxDistance
      ) {
        paths.push([...currentPath, end]);
      }

      for (const next in currentNode) {
        visitNextNodes(
          [...currentPath, next],
          this.edges[next],
          currentDistance + currentNode[next]
        );
      }
    };

    visitNextNodes([start], this.edges[start], 0);

    return paths;
  }

  findRoutesByStops(start, end, length) {
    const paths = this.getRoutes(start, end, length);

    return paths.filter((path) => path.length === length + 1);
  }

  findShortestRouteDistance(start, end, limit?) {
    const routes = this.getRoutes(start, end, limit);
    const routeDistances = routes.map((path) => this.getDistance(path));

    const [shortestDistance] = routeDistances.sort((a, b) => a - b);
    return shortestDistance;
  }
}

const graph = new Graph([
  "AB5",
  "BC4",
  "CD8",
  "DC8",
  "DE6",
  "AD5",
  "CE2",
  "EB3",
  "AE7",
]);

console.log(graph.findRoutesByStops("A", "C", 4));

console.log(graph.getRoutes("C", "C", 3));

console.log(graph.getDistance(["A", "B", "C"]));

console.log(graph.findShortestRouteDistance("B", "B"));

console.log(graph.findRoutesByDistance("C", "C", 30));
