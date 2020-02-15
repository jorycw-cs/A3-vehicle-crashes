console.log('hello world');
console.log(d3.version)















const width = 960;
const height = 500;
const margin = 5;
const padding = 5;
const adj = 100;

const timeConv = d3.timeParse("%I:%M%p")





function make_graph(data_s) {

svg = d3.select("div#container").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-"
          + adj + " -"
          + adj + " "
          + (width + adj *3) + " "
          + (height + adj*3))
    .style("padding", padding)
    .style("margin", margin)
    .classed("svg-content", true);


data_s.then(function(data) {
    var slices = data.columns.slice(1).map(function(id) {
        return {
            id: id,
            values: data.map(function(d){
                return {
                    date: timeConv(d.date),
                    measurement: +d[id]
                };
            })
        };
    });
   
   
//----------------------------SCALES----------------------------//
xScale = d3.scaleLinear().rangeRound([0, height, ]);
yScale = d3.scaleLinear().rangeRound([height, 0]);
xScale.domain(d3.extent(data, function(d){
    return timeConv(d.date)}));

yScale.domain([(0), d3.max(slices, function(c) {
    return d3.max(c.values, function(d) {
        return d.measurement + 4; });
        })
    ]);
   
//-----------------------------AXES-----------------------------//
yaxis = d3.axisLeft()
    .ticks((slices[0].values).length)
    .scale(yScale);
   
// const xaxis = d3.axisBottom()
//     .ticks((slices[0].values).length)
//     .scale(yScale);

xaxis = d3.axisBottom()
    // .ticks(d3.timeHour.every(1))
    .tickFormat(d3.timeFormat('%I %p'))
    .scale(xScale);
   
//----------------------------LINES-----------------------------//
line = d3.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.measurement); });
   
//-------------------------2. DRAWING---------------------------//
//-----------------------------AXES-----------------------------//
svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xaxis)

    .append("text")
    .text("Time of Day (Hourly)")    .attr("y", -6)    .attr("dx", ".75em") .attr("x", width / 2)
    .style("text-anchor", "end");

   
svg.append("g")
    .attr("class", "axis")
    .call(yaxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("dy", ".75em")
    .attr("y", 6)
    .style("text-anchor", "end")
    .text("Persons Involed in Fatal Crashes");
   
//----------------------------LINES-----------------------------//
lines = svg.selectAll("lines")
    .data(slices)
    .enter()
    .append("g");

    lines.append("path")
    .attr("class", "line")
    .attr("d", function(d) { return line(d.values); });
   
    lines.append("text")
    .attr("class","serie_label")
    .datum(function(d) {
        return {
            id: d.id,
            value: d.values[d.values.length - 1]}; })
    .attr("transform", function(d) {
            return "translate(" + (xScale(d.value.date) + 0)  
            + "," + (yScale(d.value.measurement) + 5 )+ ")"; })
    .attr("x", 5)
    .text(function(d) { return ("") + d.id; });// LABEL OF LINe



ghost_lines = lines.append("path")
    .attr("class", "ghost-line")
    .attr("d", function(d) { return line(d.values); });    

//---------------------------EVENTS-----------------------------// 
svg.selectAll(".ghost-line")
    .on('mouseover', function() {
        selection = d3.select(this).raise();
        selection
            .transition()
            .delay("100").duration("10")
            .style("stroke","#ed3700")
            .style("opacity","1")
            .style("stroke-width","3");
// add the legend action
        legend = d3.select(this.parentNode)
            .select(".serie_label");
        legend
            .transition()
            .delay("100")
            .duration("10")
            .style("fill","#2b2929");
        })
    .on('mouseout', function() {
        selection = d3.select(this)
        selection
            .transition()
            .delay("100")
            .duration("10")
            .style("stroke","#d2d2d2")
            .style("opacity","0")
            .style("stroke-width","10");
            // add the legend action
        legend = d3.select(this.parentNode)
            .select(".serie_label");
        legend
            .transition()
            .delay("100")
            .duration("10")
            .style("fill","#d2d2d2");
    });

});
}


// const dataset = d3.csv(require("/more_data.csv"));


dataset = d3.csv(require("/csv/2017_r.csv"));
make_graph(dataset);


var button = document.getElementById('option');


button.onclick = function(){

    console.log("fuck");
    d3.select("div#container").selectAll("*").remove();


    dataset = d3.csv(require("/csv/2016_r.csv"));
    make_graph(dataset)

}


var slider = document.getElementById('myRange');
var display = document.getElementById('outputId');

slider.value = 2017
display.value = 2017

slider.oninput = function() {
    display.value = slider.value

    year = slider.value

    d3.select("div#container").selectAll("*").remove();

    make_graph(dataset)
}

