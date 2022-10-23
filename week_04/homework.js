/* D3 Line Chart Homework using Canada interest rates data*/

//not depended on data so can come before import data
const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

    //create a promise
d3.csv('long-term-interest-canada.csv').then(data => {
    //parser for time into year, month for js
    let timeParse = d3.timeParse("%Y-%m");

    //for loop to implement time parser row by row
    for (let d of data) {
        d.Num = +d.Num;
        d.Month = timeParse(d.Month);
    }

    let x = d3.scaleTime()
    // extend start to lowest value in data
        .domain(d3.extent(data, d => d.Month))
        .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()
    //start y on 0 and give it array from data, selects the max point of data
        .domain([0, d3.max(data, d => d.Num)]).nice()
        //the vertical space
        .range([height - margin.bottom, margin.top]);
    
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));
    
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)
      .tickSizeOuter(0)
      .tickFormat(d => d + "%"));
      
  //setting values for text labels
    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      //change text color in order to read it better
      .attr("fill", "#590279")
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Month");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top)
      .attr("dx", "-0.5em")
      .attr("y", 8)
      //change text color in order to read it better
      .attr("fill", "#590279")
      .attr("transform", "rotate(-90)")
      .text("Interest rate");

    let line = d3.line()
        .x(d => x(d.Month))
        .y(d => y(d.Num))
        .curve(d3.curveNatural);
    
    //change fill color to a lighter shade of purple
    svg.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("fill", "#9979af");

  });