const routes = {
  AB: 5,
  BC: 4,
  CD: 8,
  DC: 8,
  DE: 6,
  AD: 5,
  CE: 2,
  EB: 3,
  AE: 7,
};

function distance(arr) {
  if (arr.length < 2) {
    throw new Error("NO SUCH ROUTE");
  }
  let result = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    const route = `${arr[i]}${arr[i + 1]}`;
    if (routes[route]) {
      result = result + routes[route];
    } else {
      throw new Error("NO SUCH ROUTE");
    }
    console.log(route);
  }
  return result;
}
console.log(distance(["A", "E", "B", "C", "D"]));

const graph = {
  A: { B: 5, D: 5, E: 7 },
  B: { C: 4 },
  C: { D: 8, E: 8 },
  D: { C: 8, E: 6 },
  E: { B: 3 },
};

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
