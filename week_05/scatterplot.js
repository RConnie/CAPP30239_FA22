let height = 400,
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 35, left: 40 }); 
  
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]); //putting sgv element into chart(linking on html), 
    //viewbox- changes size based on screen size

d3.csv('penguins.csv').then(data => { //linking data
  
  let x = d3.scaleLinear() // x scale
    .domain(d3.extent(data, d => d.body_mass_g)).nice() //data
    .range([margin.left, width - margin.right]); //space data takes up

  let y = d3.scaleLinear() 
    .domain(d3.extent(data, d => d.flipper_length_mm)).nice() // data, take min and max value, no zero on y axis
    .range([height - margin.bottom, margin.top]); 

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) //drawing the x axis
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom))

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`) //drawing y axis
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))

  svg.append("g") //addign group element, then joining data of circles
    .attr("fill", "black")//create circles
    .selectAll("circle")
    .data(data)
    .join("circle") //join circles
    .attr("cx", d => x(d.body_mass_g)) 
    .attr("cy", d => y(d.flipper_length_mm))
    .attr("r", 2) //r is radius
    .attr("opacity", 0.75);

  const tooltip = d3.select("body").append("div") //create a tool tip, select html body, appending a div,will put data into the div
    .attr("class", "svg-tooltip") //from styles.css ln 18-23
    .style("position", "absolute")
    .style("visibility", "hidden");

  d3.selectAll("circle")
    .on("mouseover", function(event, d) { //creating an event
      d3.select(this).attr("fill", "red"); //fill red when selected
      tooltip
        .style("visibility", "visible") //originally hidden, now make it visible
        .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`); //passing data info into html
    })
    .on("mousemove", function(event) {//when mouse moves capture x and y event(event listener)
      tooltip
        .style("top", (event.pageY - 10) + "px")//make tool tip close to 
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() { //allow to turn tool tip text and red color on and off
      d3.select(this).attr("fill", "black");
      tooltip.style("visibility", "hidden");
    })
    
});