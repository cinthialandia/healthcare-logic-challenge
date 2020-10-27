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