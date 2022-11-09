let height = 500,
    width = 800,
    margin = ({ top: 25, right: 30, bottom: 35, left: 30 })
    innerWidth = width - margin.left - margin.right;

const svg = d3.select("#line-chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.csv("location_num2.csv").then(data => {
  let timeParse = d3.timeParse("%Y-%m-%d"); //will transform into timestamp
  //pd.df 2015-01-02 timeParse()
  
  console.log(new Date('2015-01-02'))
  console.log(timeParse('2015-01-02'))

  let states = new Set();
  //Date 2010-01-12
  for (let d of data) {
    d.Month = new Date(d.Month)
    //d.Month = timeParse(d.Month);//use d3 function to extract month
    //d.Month = +d.Month;
    d.Num_of_deaths = +d.Num_of_deaths;
    states.add(d.State);
  }

  let x = d3.scaleTime()//timestamp format
    .domain(d3.extent(data, d => d.Month))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Num_of_deaths))
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(d => d + " "));

  let line = d3.line()
    .x(d => x(d.Month))
    .y(d => y(d.Num_of_deaths));
 
  for (let country of states) {
    let countryData = data.filter(d => d.State === country);

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
      .attr("stroke", "#ccc")
      .attr("d", line)

    let lastEntry = countryData[countryData.length - 1]; //last piece of data to position text x and y

    g.append("text")
      .text(country)
      .attr("x", x(lastEntry.Month) + 3)
      .attr("y", y(lastEntry.Num_of_deaths))
      .attr("dominant-baseline", "middle")
      .attr("fill", "#999");
  }
  
});