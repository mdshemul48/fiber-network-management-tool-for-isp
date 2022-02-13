import Graph from '../storage/Graph.js';

const printAllThePolylines = (map) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  const getAllThePath = graph.getAllVertices();

  getAllThePath.forEach((item) => {
    console.log(item);
  });
};

export default printAllThePolylines;
