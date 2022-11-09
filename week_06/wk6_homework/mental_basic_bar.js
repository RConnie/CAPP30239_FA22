
d3.csv("state_ill_percent.csv").then(data => {
    /*created a for loop to run through the rows of data in library csv 
    selecting the colum of num (# of library visits */
    for (let d of data) {
        d.Mental_Percent = +d.Mental_Percent
    };
    //setting the dimensions of the bar graph 
    const  height = 400,
            width = 600,
            margin = ({top: 25, right: 30, bottom: 35, left: 50});
    //creating a svg object and creating a viewbox
    let svg = d3.select("#chart")
                .append("svg")
                .attr("viewbox", [0, 0, width, height]);
    //creating x and y constants to a scale based on data
    const x = d3.scaleBand()
                .domain(data.map(d =>d.State))
                .range([margin.left, width - margin.right])
                .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.Mental_Percent)]).nice() 
                //.nice will roll axis up past final #
                .range([height - margin.bottom, margin.top]);
    //creating x and y axis
    const xAxis = g => g
        .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));
    
    const yAxis = g => g
        .attr("transform", `translate(${margin.left-5}, 0)`)
        .call(d3.axisLeft(y))

    svg.append('g')
        .call(xAxis);

    svg.append("g")
        .call(yAxis);
    //creating a bar object
    let bar = svg.selectAll("bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    /*adding attributes to bar like color of bar and text 
    to mimic CPL logo colors*/
    bar.append('rect')
        .attr("fill", "blue")
        .attr("x", d => x(d.State))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.Mental_Percent))
        .attr("height", d => y(0) - y(d.num));

    bar.append('text')
        .text(d => d.Mental_Percent)
        .attr('x', d => x(d.State) + (x.bandwidth()/2))
        .attr('y', d => y(d.Mental_Percent) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', '#FFFFFF');
        

}); 
