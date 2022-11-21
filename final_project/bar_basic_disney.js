

// d3.csv("Disney_Race.csv").then(data => {
    
//     for (let d of data) {
//         d.Value = +d.Value
//     };
    
//     const  height = 400,
//             width = 600,
//             margin = ({top: 25, right: 30, bottom: 35, left: 50});

//     let svg = d3.select("#bar-chart")
//                 .append("svg")
//                 .attr("viewbox", [0, 0, width, height]);
    
//     const x = d3.scaleBand()
//     //const x = d3.scaleLinear()
//             .domain(data.map(d =>d.Race))
//             //.range([margin.left, width - margin.right])
//             .range([0, 800])
//             //.padding(0.1);

//     const y = d3.scaleLinear()
//                 //.domain([0, d3.max(data, d => d.Value)]).nice() 
//                 .domain([0, d3.max(data, d => d.Value)])
//                 .range([height - margin.bottom, margin.top]);

//     const xAxis = g => g
//         .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
//         .call(d3.axisBottom(x));
//         //.call(g => g.select(".domain").remove())
    
//     const yAxis = g => g
//         .attr("transform", `translate(${margin.left-5}, 0)`)
//         .call(d3.axisLeft(y))

//     svg.append('g')
//         .call(xAxis);

//     svg.append("g")
//         .call(yAxis);

//     let bar = svg.selectAll("bar")
//         .append("g")
//         .data(data)
//         .join("g")
//         .attr("class", "bar");

//     bar.append('rect')
//         .attr("fill", "steelblue")
//         .attr("x", d => x(d.Race))
//         .attr("width", x.bandwidth())
//         .attr("y", d => y(d.Value))
//         .attr("height", d => y(0) - y(d.Value));

//     bar.append('text')
//         .text(d => d.Value)
//         .attr('x', d => x(d.Race) + (x.bandwidth()/2))
//         .attr('y', d => y(d.Value) + 15)
//         .attr('text-anchor', 'middle')
//         .style('fill', '#000');
        
// }); 



/* A promise will control the flow, 1st get data then do everything else */
d3.csv("Disney_Race.csv").then(data => {

    for (let d of data) {
        d.Value = +d.Value; //force a number
    };

    //sorts from biggest to smallest #, takes a and compares to b
    data.sort((a, b) => b.Value - a.Value);

    // another sort, Race name
    data.sort((a, b) => d3.ascending(a.Race, b.Race));

    /* blue = variable, red  w/ string = attribute, 
    ln 52 width is attr put in html */
    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#bar-chart") /* .append something on to 
    that variable */
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // for resizing element in browser

    let x = d3.scaleLinear() 
        .domain([0, d3.max(data, d => d.Value)]).nice()
        .range([margin.left, width - margin.right]);
    
    let y = d3.scaleBand()
    //d(d = > d.country) is a loop, data.map is converting into an array
        .domain(data.map(d => d.Race))
        .range([margin.top, height - margin.bottom])
        .padding(0.1);

    // g is a part of html bc in "", group element
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x).tickSize(-innerWidth).tickFormat(d => d + ""));


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
        .attr("width", d => x(d.Value))
        .attr("y", d => y(d.Race))
        .attr("height", y.bandwidth()); //only use on bar chart with scaleBand
    
    bar.append('text') // add labels
        .text(d => d.Value)
        .attr('x', d => margin.left + x(d.Value) - 10)
        .attr('y', d => y(d.Race) + (y.bandwidth()/2))
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle') //property of position
        .style('fill', 'white');

    svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height + 8)
        .text("Race");

});