//DeBug

// Code taken from : https://d3-graph-gallery.com/graph/lollipop_animationStart.html
// from a document by Yan Holtz. 

//d3.csv("disney_racesex.csv").then (data) => {

    // set the dimensions and margins of the graph
    // let margin = {top: 10, right: 30, bottom: 40, left: 100},
    //     width = 460 - margin.left - margin.right,
    //     height = 500 - margin.top - margin.bottom;
    
    // // append the svg object to the body of the page
    // let svg = d3.select("#my_dataviz")
    //   .append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //   .append("g")
    //     .attr("transform",
    //           "translate(" + margin.left + "," + margin.top + ")");
    
    // Parse the Data
   
    d3.csv("disney_racesex.csv").then(data => {

        let margin = {top: 10, right: 30, bottom: 40, left: 100},
        width = 460 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
        let svg = d3.select("#my_dataviz")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    // sort data
        data.sort(function(b, a) {
        return a.Value - b.Value;
        });
    
    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 10])
        .range([ 0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
    // Y axis
    var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data.map(function(d) { return d.Name; }))
        .padding(1);
        svg.append("g")
        .call(d3.axisLeft(y))
    
    // Lines
    svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", x(0))
        .attr("x2", x(0))
        .attr("y1", function(d) { return y(d.Name); })
        .attr("y2", function(d) { return y(d.Name); })
        .attr("stroke", "#abdda4")
    
    // Circles -> start at X=0
    svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", x(0) )
        .attr("cy", function(d) { return y(d.Name); })
        .attr("r", "7")
        //.style("fill", "#e6f598")
        .style("fill", "#66c2a5")
        .attr("stroke", "#abdda4")
        //["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]
    // Change the X coordinates of line and circle
    svg.selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cx", function(d) { return x(d.Value); })
    
    svg.selectAll("line")
      .transition()
      .duration(2000)
      .attr("x1", function(d) { return x(d.Value); })
    
    })                  