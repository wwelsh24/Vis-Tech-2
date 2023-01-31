function parseLOG(d){
    console.log(d)
}

function parseCSVIntoNum(d){
    return{
        "city":d.city,
        "state":d.state,
        "population":+d.population,
        "land area":+d['land area']
    }
}

//d3.text("datasets/file.txt").then(parseLOG);

//d3.csv("datasets/cities-sm.csv").then(parseLOG)

//d3.json("datasets/countrycode-sm.json").then(parseLOG)

d3.csv("datasets/cities-sm.csv", parseCSVIntoNum).then(console.log)

d3.csv("datasets/cities-sm.csv").then(function(data){

    data.forEach( function(d) {
        d.population = +d.population
        d['land area'] = +d['land area']
        console.log(d);
    })

    let filtered_data = data.filter(function(d){
        return d.state === 'NY';
    })

    console.log(filtered_data)

    let grouped_data = d3.group(data, function(d){
        return d.city;
    })
    console.log(grouped_data)
    console.log(grouped_data.get("boston"))
})

