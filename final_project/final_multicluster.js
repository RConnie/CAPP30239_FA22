//how to put text inside circles, missing values, 
//circle size is reverse, size of rating text


//append g, then append text (data join)
//loop through csv to make sure its an interger (string to int), comment out 17
let width = 1200,
height = 500,
gWidth = width/4;

let svg = d3.select("#cluster")
.append("svg")
.attr("width", width)
.attr("height", height);

let rScale = d3.scaleLinear()
//.range([25, 20, 15, 10, 5]);
.range([9, 7, 5]);
//.range([60, 17, 10, 3]);
//rScale.clamp(true);

//d3.csv("top_netflix_20.csv").then(data => {
// d3.csv("top_netflix_int.csv").then(data => {
d3.csv("top_netflix_nococo.csv").then(data => {
//let colors = ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"];
//let colors = ["#9e0142","#d53e4f","#f46d43","#fdae61"];
let colors =(["#6985DD", '#B42F90', '#FF0909', "#fdae61"]);


console.log(data)

let result = d3.group(data, d => d.rating);

console.log(result)

rScale.domain(d3.extent(data, d => d.value));

let i = 0;
for (let [a, b] of result) {
  // console.log(b)

  let items = [];

  for (let j = 0; j < b.length; j++) {
    let newObj = {
      x: (gWidth * (0.5 + i)),
      y: height/2,
    }
    newObj.node = b[j].show;
    newObj.value = b[j].value;
    items.push(newObj);
  }

  let color = colors[i];

  buildChart(a, i, color, items);

  i++;
}
});

const tooltip = d3.select("body").append("div")
.attr("class", "svg-tooltip")
.style("position", "absolute")
.style("visibility", "hidden");

function buildChart(a, i, color, nodes) {
let simulation = d3.forceSimulation(nodes)
  .force("charge", d3.forceManyBody().strength(100)) //strength
  .force('x', d3.forceX().x(gWidth * (0.5 + i)))
  .force('y', d3.forceY().y(nodes[i].y)) 
  .force("collision", d3.forceCollide().radius(d => (rScale(d.value))));

let g = svg.append("g");

simulation.on("tick", () => {
  g.selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .attr("r", d => (rScale(d.value)))
    .attr("fill", color)
    //.attr("opacity", 0.75)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .on("mouseover", function (event, d) {
      d3.select(this).attr("opacity", 1);
      tooltip
        .style("visibility", "visible")
        .html(`${d.node}<br />${d.value}`);
    })
    .on("mousemove", function (event) {
      tooltip
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function () {
      d3.select(this).attr("opacity", 0.75);
      tooltip.style("visibility", "hidden");
    })
})

g.append("text")
  .text(a)
  .attr("x",gWidth * (0.5 + i))
  .attr("y", 100)
  .attr("text-anchor","middle")
  .style("text-transform","capitalize")
  .style("font-weight","bold");

for (let i = 0; i < 20; i++) {
  simulation.tick()
}

};