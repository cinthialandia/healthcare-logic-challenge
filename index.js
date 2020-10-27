const graph = {
  A: { B: 5, D: 5, E: 7 },
  B: { C: 4 },
  C: { D: 8, E: 8 },
  D: { C: 8, E: 6 },
  E: { B: 3 },
};

function distance(path) {
  if (path.length < 2) {
    throw new Error("NO SUCH ROUTE");
  }

  let result = 0;

  function getNextNode(currentNode, currentPath) {
    const [next, ...restPath] = currentPath;

    if (!next) {
      return;
    }

    if (!currentNode[next]) {
      throw new Error("NO SUCH ROUTE");
    }

    result = result + currentNode[next];

    getNextNode(graph[next], restPath);
  }

  const [first, ...restPath] = path;
  getNextNode(graph[first], restPath);

  return result;
}

function findRoutes(start, end, limit) {
  const paths = [];

  function getNextNode(currentPath, currentNode, currentLimit) {
    const restLimit = currentLimit - 1;
    if (restLimit < 0) {
      return;
    }

    if (currentNode[end]) {
      paths.push([...currentPath, end]);
    }

    for (const nextNode in currentNode) {
      getNextNode([...currentPath, nextNode], graph[nextNode], restLimit);
    }
  }

  getNextNode([start], graph[start], limit);

  return paths;
}

console.log(findRoutes("C", "C", 3));

function findExactRoutes(start, end, length) {
  const paths = findRoutes(start, end, length);

  return paths.filter((path) => path.length === length + 1);
}

console.log(findExactRoutes("A", "C", 4));
