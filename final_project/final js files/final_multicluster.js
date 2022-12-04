//Code modified from class and office hour notes

let width = 1200,
height = 550,
gWidth = width/4.5;

let svg = d3.select("#cluster")
.append("svg")
.attr("width", width)
.attr("height", height);

let rScale = d3.scaleLinear()
.range([9, 7, 5]);

d3.csv("../final_project/final datasets/top_netflix_nococo.csv").then(data => {
//selected colors from d3 color scheme
let colors =(["#6985DD", '#B42F90', '#FF0909', "#fdae61"]);

let result = d3.group(data, d => d.rating);

rScale.domain(d3.extent(data, d => d.value));

let i = 0;
for (let [a, b] of result) {

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
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .on("mouseover", function (event, d) {
      d3.select(this).attr("opacity", 1);
      tooltip
        .style("visibility", "visible")
        .html(`${d.node}<br />${d.value + " " + "days"}`);
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

for (let i = 0; i < 100; i++) {
  simulation.tick()
}

};