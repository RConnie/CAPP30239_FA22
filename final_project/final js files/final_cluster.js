//Code modified from class notes


d3.csv("../final_project/final datasets/top_netflix.csv").then(data => {

  let width = 1000,
  height = 500;

  let svg = d3.select("#cluster2")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  
  let result = d3.group(data, d => d.rating);

  console.log(result);

  let rScale = d3.scaleLinear()
  // manually set range to achieve correct aspect ration for MPAA categories
    .range([9.25, 9.0, 8.75, 8.5, 8.25, 8.0, 7.75, 7.5, 7.25, 7.0, 
      6.75, 6.5, 6.25, 6.0, 5.75, 5.5, 5.25, 5.0, 4.75, 4.5, 4.25])
    .domain(d3.extent(data, d => d.value));//value sets scale

  let colors = d3.scaleOrdinal()//setting color range
  //chose colors from color scheme range 
    .range(['#6985DD', '#B42F90', '#FF0909', "#fdae61"])
    .domain(d3.map(data, d => d.rating));

  let simulation = d3.forceSimulation(data)//force funcation, pass data
    .force("charge", d3.forceManyBody().strength(1000)) //strength & speed?
    .force('x', d3.forceX().x(width/2))
    .force('y', d3.forceY().y(height/2))
    .force("center", d3.forceCenter().x(width / 2).y(height / 2))//maps to center
    .force("collision", d3.forceCollide().radius(d => rScale(d.value) + 1.5));

  let g = svg.append("g")
    .attr("class", "group");

  simulation.on("tick", () => {//how often does it run, append all circles
    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("r", d => rScale(d.value))
      .attr("fill", d => colors(d.rating))
      .attr("opacity", 0.75)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 1);

        tooltip
          .style("visibility", "visible")
          //added value of days and MPAA ratings
          .html(`<h3>${d.show}</h3><br />value: ${d.value + " " + "days"}<br 
          /><span style="text-transform: capitalize">MPPA rating: ${d.rating}</span>`);
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

  for (let i = 0; i < 200; i++) {//slows down out to in, zooming at beginning
    simulation.tick()
  }
});
