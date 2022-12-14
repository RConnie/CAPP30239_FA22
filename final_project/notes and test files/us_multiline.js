
// let height = 500,
// width = 800,
// margin = ({ top: 25, right: 30, bottom: 35, left: 30 })
// innerWidth = width - margin.left - margin.right;

const svg = d3.select("#line-chart-US")
.append("svg")
.attr("viewBox", [0, 0, width, height]);

d3.csv("USA_genres_2.csv").then(data => {

let countries = new Set();

for (let d of data) {
d.Value = +d.Value;
countries.add(d.Location);
}

// // //let x = d3.scaleLinear()
// let x = d3.scaleBand()
// //let x = d3.scalePoint()
//   .domain(data.map(d =>d.Genre))
//   .range([margin.left, width - margin.right]);

let x = d3.scaleBand()
.domain(data.map(d =>d.Genre))
.range([0, 800])
.padding([0.8]);

let y = d3.scaleLinear()
.domain(d3.extent(data, d => d.Value))
.range([height - margin.bottom, margin.top]);

svg.append("g")
.attr("transform", `translate(0,${height - margin.bottom})`)
.call(d3.axisBottom(x));

svg.append("g")
.attr("transform", `translate(${margin.left},0)`)
.call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(d => d + " "));

let line = d3.line()
.x(d => x(d.Genre))
.y(d => y(d.Value));

for (let country of countries) {
let countryData = data.filter(d => d.Location === country);

let g = svg.append("g")
  .attr("class", "country")
  //mouseover is interactive element will swap a class color from blue to grey
  .on('mouseover', function () {
    d3.selectAll(".highlight").classed("highlight", false);
    d3.select(this).classed("highlight", true);
  });

if (country === "USA") {
  g.classed("highlight", true);
}

g.append("path")
  .datum(countryData)
  .attr("fill", "none")
  //.attr("stroke", "#ccc")
  .attr("stroke", "#c6d4e5")
  .attr("d", line)

let lastEntry = countryData[countryData.length - 5]; //last piece of data to position text x and y

g.append("text")
  .text(country)
  .attr("x", x(lastEntry.Genre) + 20)
  .attr("y", y(lastEntry.Value))
  .attr("dominant-baseline", "middle")
  .attr("fill", "#095778");
}

});