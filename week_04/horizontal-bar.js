/* Horizontal bar chart for COVID country cases */

/* A promise will control the flow, 1st get data then do everything else */
d3.csv("covid.csv").then(data => {

    for (let d of data) {
        d.cases = +d.cases; //force a number
    };

    //sorts from biggest to smallest #, takes a and compares to b
    data.sort((a, b) => b.cases - a.cases);

    // another sort, country name
    data.sort((a, b) => d3.ascending(a.country, b.country));

    /* blue = variable, red  w/ string = attribute, 
    ln 52 width is attr put in html */
    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#horizontal-chart") /* .append something on to 
    that variable */
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // for resizing element in browser

    let x = d3.scaleLinear() 
        .domain([0, d3.max(data, d => d.cases)]).nice()
        .range([margin.left, width - margin.right]);
    
    let y = d3.scaleBand()
    //d(d = > d.country) is a loop, data.map is converting into an array
        .domain(data.map(d => d.country))
        .range([margin.top, height - margin.bottom])
        .padding(0.1);

    // g is a part of html bc in "", group element
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x));

    //attribute goes on the page
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    let bar = svg.selectAll(".bar") // create bar groups
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") // add rect to bar group
        .attr("fill", "steelblue")
        .attr("x", margin.left)
        .attr("width", d => x(d.cases))
        .attr("y", d => y(d.country))
        .attr("height", y.bandwidth()); //only use on bar chart with scaleBand
    
    bar.append('text') // add labels
        .text(d => d.cases)
        .attr('x', d => margin.left + x(d.cases) - 10)
        .attr('y', d => y(d.country) + (y.bandwidth()/2))
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle') //property of position
        .style('fill', 'white');

    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height + 8)
        .text("Country Code");

});