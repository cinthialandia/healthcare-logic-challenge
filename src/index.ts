import { Graph } from './graph';

const formElement1 = document.querySelector('.form1') as HTMLFormElement;

const formElement2 = document.querySelector('.form2') as HTMLFormElement;

const resultElement2 = document.querySelector('.result2') as HTMLDivElement;

const formElement3 = document.querySelector('.form3') as HTMLFormElement;

const resultElement3 = document.querySelector('.result3') as HTMLDivElement;

const formElement4 = document.querySelector('.form4') as HTMLFormElement;

const formElement5 = document.querySelector('.form5') as HTMLFormElement;

const formElement6 = document.querySelector('.form6') as HTMLFormElement;

let graph: Graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');

formElement1?.addEventListener('submit', getRoutesInformation);

function getRoutesInformation(e: Event) {
  e.preventDefault();
  const formData = formElement1['routes'].value;
  console.log(formData);
  graph = new Graph(formData);
}

formElement2?.addEventListener('submit', getDistance);

function getDistance(e: Event) {
  e.preventDefault();
  const formData = formElement2['distance'].value;
  const result = graph.getDistance(formData.replace(/\s/g, '').split(','));
  resultElement2.innerHTML = `${result}`;
  console.log(result);
}

formElement3?.addEventListener('submit', getNumberOfTripsOf3);

function getNumberOfTripsOf3(e: Event) {
  e.preventDefault();
  const input1 = formElement3['start'].value;
  const input2 = formElement3['end'].value;
  const input3 = formElement3['limit'].value;
  const result = graph.getRoutes(input1, input2, input3);
  result.forEach((result) => {
    const newDiv = document.createElement('div1');
    const newContent = document.createTextNode(`${'the result is:'}${result}`);
    newDiv.appendChild(newContent);
    document.body.insertBefore(newDiv, formElement4);
  });
}

// const graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');

// console.log(graph.findAmountOfRoutesByStops('A', 'C', 4));

// console.log(graph.getRoutes('C', 'C', 3));

// console.log(graph.getDistance(['A', 'B', 'C']));

// console.log(graph.findLengthOfShortestRoute('B', 'B'));

// console.log(graph.getRoutesByDistance('C', 'C', 30));
