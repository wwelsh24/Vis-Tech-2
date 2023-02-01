function parseCSVIntoNum(d){
    return{
        "Age Start":+d['Age Start'],
        "Age End": d['Age End'],
        "Y2000":+d.Y2000,
        "Y1900":+d.Y1900,
    }
}


d3.csv("Project 1/Reshaped_Population_Data.csv",parseCSVIntoNum).then(function(data){
    console.log(data.length)

    const width = document.querySelector("#population_chart").clientWidth;
    const height = document.querySelector("#population_chart").clientHeight;
    const margin = 40;
    let innerRadius = width / 8;
    let outerRadius = width / 2 - margin;




    x = d3.scaleLinear()
    .domain([0, 95])
    .range([0, 2 * Math.PI])

    
    y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Y2000)+2000000])
    .range([innerRadius, outerRadius])


    xAxis = g => g

    .attr("font-size", 10)
    .call(g => g.selectAll("g")
      .data(x.ticks(20))
      .join("g")

        .call(g => g.append("path")
            .attr("stroke", "#000000")
            .attr("stroke-opacity", 0.2)
            .attr("d", d => `
              M${d3.pointRadial(x(d), innerRadius)}
              L${d3.pointRadial(x(d), outerRadius)}
            `)));
            /*
        .call(g => g.append("path")
            .attr("id", d => d['Age Start'])
            .datum(d => [d, d3.utcMonth.offset(d, 1)])
            .attr("fill", "none")
            .attr("d", ([a, b]) => `
              M${d3.pointRadial(x(a), innerRadius)}
              A${innerRadius},${innerRadius} 0,0,1 ${d3.pointRadial(x(b), innerRadius)}
            `))
            
            )
            
            
        .call(g => g.append("text")
          .append("textPath")
            .attr("startOffset", 6)
            .text(function(d,i){ return d['Age Start'][i]})))
*/
    yAxis = g => g
            .attr("text-anchor", "middle")

            .attr("font-size", 10)
            .call(g => g.selectAll("g")
              .data(y.ticks(6).reverse())
              .join("g")
                .attr("fill", "none")
                .call(g => g.append("circle")
                    .attr("stroke", "black")
                    .attr("stroke-opacity", .2)
                    .attr("r", y))
                
                    /*
                .call(g => g.data(y.ticks(6))
                .append("text")
                .attr("y", function(d,i) { return innerRadius})
                .attr("x",0)
                //.attr("transform", (d,i) => `translate(${(outerRadius-innerRadius)/5*i})`)
                .text(function(d,i) { return d; }))
                */
                .call(g => g.append("text")
                    .attr("y", d => -y(d))
                    .style("fill","black")
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    .text(function(x, i) {
                        console.log([i])
                        if (i==0){
                            label = (y.ticks(6)[5-i]).toString()+" people"
                        }
                        else{
                            label = (y.ticks(6)[5-i]).toString()
                        }
                        return label;
                    })
                    //.text((x, i) => `${x.toFixed(0)}${i ? "" : "°F"}`)
                  //.clone(true)
                   // .attr("y", d => y(d))
                    ))
                /*
                  .selectAll(function() { return [this, this.previousSibling]; })
                  .clone(true)
                    .attr("fill", "currentColor")
                    .attr("stroke", "none")))
                    */
                line = d3.lineRadial()
                    .defined(d3.curveLinearClosed)
                    .angle(d => x(d['Age Start']))

                area = d3.areaRadial()
                    .defined(d3.curveLinearClosed)
                    .angle(d => x(d['Age Start']))

                

        const svg = d3.select("#population_chart")
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round");
      
            svg.append("path")
                .attr("fill", "#D2A2EE")
                .attr("fill-opacity", 0.2)
                .attr("d", area
                .innerRadius(d => y(+d.Y1900))
                .outerRadius(d => y(+d.Y2000))
                (data));
          
            svg.append("path")
                .attr("fill", "none")
                .attr("stroke", "#5CDBDF")
                .attr("stroke-width", 1.5)
                .attr("d", line
                    .radius(d => y(d.Y2000))
                  (data));

            svg.append("path")
                  .attr("fill", "none")
                  .attr("stroke", "#57FF7E")
                  .attr("stroke-width", 1.5)
                  .attr("d", line
                      .radius(d => y(d.Y1900))
                    (data));

           

        svg.append("g")
            .call(xAxis);
      
        svg.append("g")
            .call(yAxis);

            G20 = d3.select("#points_2000")
            G20.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", "0")
                        .attr("cy", function(d) { return -y(d.Y2000); })
                        .attr("transform", (d,i) => `rotate(${(x(d['Age Start']))/(2*Math.PI)*360})`)
                        .attr("r", "5px")
                        .attr("fill", "#5CDBDF");
            
            G19 = d3.select("#points_1900")
            G19.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", "0")
                        .attr("cy", function(d) { return -y(d.Y1900); })
                        .attr("transform", (d,i) => `rotate(${(x(d['Age Start']))/(2*Math.PI)*360})`)
                        .attr("r", "5px")
                        .attr("fill", "#57FF7E");

            GRL = d3.select("#radial_labels")
            GRL.selectAll("text")
                    .data(data)
                    .enter()
                    .append("text")
                    .style("fill","black")
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    .attr("text-anchor", "middle")
                    .attr("font-family", "monospace")
                    .attr("font-size", 8)
                    .attr("x", "0")
                        .attr("y", function(d) { return y(0)-2; })
                        .attr("transform", (d,i) => `rotate(${(x(d['Age Start']))/(2*Math.PI)*360-180})`)
                        .attr("fill", "#57FF7E")
                        .text(function(d,i) {
                            return d['Age Start']+'-'+d['Age End']; });

        svg.append("text")
            .attr("x",0)             
            .attr("y", 0 - (height/2)+margin/2)
            .attr("text-anchor", "middle")  
            .style("font-size", "13px") 
            .attr("font-family", "monospace")
            .style("text-decoration", "underline")  
            .text("How much did the U.S. population change in each age bracket between 1900 and 2000?");
        
        svg.append("circle")
            .attr("cx",-width/2+margin)             
            .attr("cy", (height/2)-margin/2)
            .attr("r", 5)
            .attr("fill", "#57FF7E");
            
        svg.append("text")
            .text("Data from 1900")
            .attr("x",-width/2+margin)             
            .attr("y", (height/2)-margin/2)
            .attr("transform","translate(10,5)");

        svg.append("circle")
            .attr("cx",0)             
            .attr("cy", (height/2)-margin/2)
            .attr("r", 5)
            .attr("fill", "#5CDBDF");

        svg.append("text")
            .text("Data from 2000")
            .attr("x",0)             
            .attr("y", (height/2)-margin/2)
            .attr("transform","translate(10,5)");
});

