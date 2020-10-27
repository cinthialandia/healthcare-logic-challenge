import { Graph } from './graph';

const formElement1 = document.querySelector('.form1') as HTMLFormElement;

const resultElement1 = document.querySelector('.result1') as HTMLDivElement;

const formElement2 = document.querySelector('.form2') as HTMLFormElement;

const resultElement2 = document.querySelector('.result2') as HTMLDivElement;

const formElement3 = document.querySelector('.form3') as HTMLFormElement;

const formElement4 = document.querySelector('.form4') as HTMLFormElement;

const resultElement4 = document.querySelector('.result4') as HTMLDivElement;

const formElement5 = document.querySelector('.form5') as HTMLFormElement;

const resultElement5 = document.querySelector('.result5') as HTMLDivElement;

const formElement6 = document.querySelector('.form6') as HTMLFormElement;

let graph: Graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');

formElement1?.addEventListener('submit', getRoutesInformation);

function getRoutesInformation(e: Event) {
  e.preventDefault();
  const formData = formElement1['routes'].value.toUpperCase();
  try {
    graph = new Graph(formData);
  } catch (error) {
    resultElement1.innerHTML = `${error.message}`;
  }
}

formElement2?.addEventListener('submit', getDistance);

function getDistance(e: Event) {
  e.preventDefault();
  const formData = formElement2['distance'].value.toUpperCase();
  try {
    const result = graph.getDistance(formData.replace(/\s/g, '').split(','));
    resultElement2.innerHTML = `the result is: ${result}`;
  } catch (error) {
    resultElement2.innerHTML = `the result is: ${error.message}`;
  }
}

formElement3?.addEventListener('submit', getNumberOfTripsOf3);

function getNumberOfTripsOf3(e: Event) {
  e.preventDefault();
  const input1 = formElement3['start'].value.toUpperCase();
  const input2 = formElement3['end'].value.toUpperCase();
  const input3 = formElement3['limit'].value;
  const result = graph.getRoutes(input1, input2, input3);
  result.forEach((result) => {
    const newDiv = document.createElement('div');
    const newContent = document.createTextNode(`${'the result is:'}${result}`);
    newDiv.appendChild(newContent);
    document.body.insertBefore(newDiv, formElement4);
  });
}

formElement4?.addEventListener('submit', getAmountOfRoutesByStops);

function getAmountOfRoutesByStops(e: Event) {
  e.preventDefault();
  const input1 = formElement4['start'].value.toUpperCase();
  const input2 = formElement4['end'].value.toUpperCase();
  const input3 = formElement4['max'].value;
  const result = graph.findAmountOfRoutesByStops(input1, input2, Number(input3));
  resultElement4.innerHTML = `the result is: ${result}`;
}

formElement5?.addEventListener('submit', getLengthOfShortestRoute);

function getLengthOfShortestRoute(e: Event) {
  e.preventDefault();
  const input1 = formElement5['start'].value.toUpperCase();
  const input2 = formElement5['end'].value.toUpperCase();
  const result = graph.findLengthOfShortestRoute(input1, input2);
  console.log(result);
  resultElement5.innerHTML = `the result is: ${result}`;
  console.log(result);
}

formElement6?.addEventListener('submit', getValuesRoutesByDistance);

function getValuesRoutesByDistance(e: Event) {
  e.preventDefault();
  const input1 = formElement6['start'].value.toUpperCase();
  const input2 = formElement6['end'].value.toUpperCase();
  const input3 = formElement6['max'].value;
  const result = graph.getRoutesByDistance(input1, input2, input3);
  result.forEach((result) => {
    formElement6.insertAdjacentHTML('afterend', `<div>${'the result is:'}${result}</div>`);
  });
  console.log(result);
}

// const graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');

// console.log(graph.findAmountOfRoutesByStops('A', 'C', 4));

// console.log(graph.getRoutes('C', 'C', 3));

// console.log(graph.getDistance(['A', 'B', 'C']));

// console.log(graph.findLengthOfShortestRoute('B', 'B'));

// console.log(graph.getRoutesByDistance('C', 'C', 30));
