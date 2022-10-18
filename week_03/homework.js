
d3.csv("library_visits_jan22.csv").then(data => {
    /*created a for loop to run through the rows of data in library csv 
    selecting the colum of num (# of library visits */
    for (let d of data) {
        d.num = +d.num
    };
    //setting the dimensions of the bar graph 
    const  height = 400,
            width = 600,
            margin = ({top: 25, right: 30, bottom: 35, left: 50});
    //creating a svg object and creating a viewbox
    let svg = d3.select("#chart")
                .append("svg")
                .attr("viewbox", [0, 0, width, height]);
    //creates a scale based on data
    const x = d3.scaleBand()
                .domain(data.map(d =>d.branch))
                .range([margin.left, width - margin.right])
                .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.num)]).nice() 
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
    //creates a bar object
    let bar = svg.selectAll("bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    /*adding attributes to bar like color of bar and text 
    to mimic CPL logo colors*/
    bar.append('rect')
        .attr("fill", "green")
        .attr("x", d => x(d.branch))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.num))
        .attr("height", d => y(0) - y(d.num));

    bar.append('text')
        .text(d => d.num)
        .attr('x', d => x(d.branch) + (x.bandwidth()/2))
        .attr('y', d => y(d.num) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', '#FFFFFF');
        

}); 
