class Graph {
  edges = {
    A: { B: 5, D: 5, E: 7 },
    B: { C: 4 },
    C: { D: 8, E: 8 },
    D: { C: 8, E: 6 },
    E: { B: 3 },
  };

  distance(path) {
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

  findRoutes(start, end, limit) {
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

  findExactRoutes(start, end, length) {
    const paths = this.findRoutes(start, end, length);

    return paths.filter((path) => path.length === length + 1);
  }
}

const graph = new Graph();

console.log(graph.findExactRoutes("A", "C", 4));

console.log(graph.findRoutes("C", "C", 3));

console.log(graph.distance(["A", "B", "C"]));
