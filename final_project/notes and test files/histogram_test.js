// Simple Histogram

const height = 400,
    width = 600,
    margin = ({ top: 25, right: 10, bottom: 50, left: 10 }),
    padding = 1;//between histogram bars

const svg = d3.select("#chart")//create svg and appending to html
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.json('Dis_top_20_race.csv').then((data) => {

  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Number)).nice()
    .range([margin.left, width - margin.right]);
  
  const y = d3.scaleLinear()
    .domain([0,10]) //manually putting in data
    .range([height - margin.bottom, margin.top]);
    
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom + 5})`)
    .call(d3.axisBottom(x));

  const binGroups = svg.append("g") //histogram bins
    .attr("class", "bin-group");

  const bins = d3.bin()
    .thresholds(10) //approx # of bars who want data across
    .value(d => d.average)(data); //data you want to use

  let g = binGroups.selectAll("g") //setting up group of data that comes out of bin
    .data(bins)
    .join("g");

  g.append("rect") //appending rectangles 
    .attr("x", d => x(d.x0) + (padding / 2))
    .attr("width", d => x(d.x1) - x(d.x0) - padding)
    .attr("fill", "steelblue")
    .attr("height", 0) //havign bars grow, this is setign starting position
    .attr("y", height - margin.bottom)
    .transition()//will have bars grow
    .duration(750)
    .attr("y", d => y(d.length))
    .attr("height", d => height - margin.bottom - y(d.length)); //end posiiton

  g.append("text")
    .text(d => d.length)
    .attr("x", d => x(d.x0) + (x(d.x1) - x(d.x0)) / 2)
    .attr("y", d => y(d.length) - 5)
    .attr("text-anchor", "middle")
    .attr("fill", "#333")
    .attr("y", height - margin.bottom)
    .transition()
    .duration(750)
    .attr("y");//find this code on git later

});