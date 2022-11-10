/* Horizontal bar chart for COVID country cases */

/* A promise will control the flow, 1st get data then do everything else */
d3.csv("state_ill_percent.csv").then(data => {

    for (let d of data) {
        d.Mental_Percent = +d.Mental_Percent; //force a number
    };

    //sorts from biggest to smallest #, takes a and compares to b
    data.sort((a, b) => b.Mental_Percent - a.Mental_Percent);

    // another sort, state name
    data.sort((a, b) => d3.ascending(a.State, b.State));

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
        .domain([0, d3.max(data, d => d.Mental_Percent)]).nice()
        .range([margin.left, width - margin.right]);
    
    let y = d3.scaleBand()
    //d(d = > d.country) is a loop, data.map is converting into an array
        .domain(data.map(d => d.State))
        .range([margin.top, height - margin.bottom])
        .padding(0.1);

    // g is a part of html bc in "", group element
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x).tickSize(-innerWidth).tickFormat(d => d + "%"));


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
        .attr("fill", "#0A9ACB")
        .attr("x", margin.left)
        .attr("width", d => x(d.Mental_Percent))
        .attr("y", d => y(d.State))
        .attr("height", y.bandwidth()); //only use on bar chart with scaleBand
    
    bar.append('text') // add labels
        .text(d => d.Mental_Percent)
        .attr('x', d => margin.left + x(d.Mental_Percent) - 10)
        .attr('y', d => y(d.State) + (y.bandwidth()/2))
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle') //property of position
        .style('fill', 'white');

    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height + 8)
        .text("State");

});