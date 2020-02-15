// Code heavily influenced by many d3js tutorials and stack exchange/similar
// forums for questions online.
// parts of code was used from 
// https://chartio.com/resources/tutorials/how-to-resize-an-svg-when-the-window-is-resized-in-d3-js/
// http://datawanderings.com/2019/11/01/tutorial-making-an-interactive-line-chart-in-d3-js-v-5/

console.log(d3.version)

require("/csv/2004_r.csv");
require("/csv/2005_r.csv");
require("/csv/2006_r.csv");
require("/csv/2007_r.csv");
require("/csv/2008_r.csv");
require("/csv/2009_r.csv");
require("/csv/2010_r.csv");
require("/csv/2011_r.csv");
require("/csv/2012_r.csv");
require("/csv/2013_r.csv");
require("/csv/2014_r.csv");
require("/csv/2015_r.csv");
require("/csv/2016_r.csv");
require("/csv/2017_r.csv");

width = 960;
height = 500;
adj = 150;

const timeConv = d3.timeParse("%I:%M%p");

dataset = d3.csv(require("/csv/2017_r.csv"));
make_graph(dataset);

var slider = document.getElementById('myRange');
var display = document.getElementById('outputId');

slider.value = 2017
display.value = "Year 2017"

slider.oninput = function() {
    display.value = "Year " + slider.value

    year = slider.value

    d3.select("div#container").selectAll("*").remove();
    dataset = d3.csv(require("/csv/" + year + "_r.csv"));
    make_graph(dataset)
}

function make_graph(data_s) {

    svg = d3.select("div#container").append("svg")
        .attr("viewBox", "-" + adj + " -"
              + adj + " " + (width + adj *3) + " "
              + (height + adj*3))

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
       
    xScale = d3.scaleLinear().rangeRound([0, height, ]);
    yScale = d3.scaleLinear().rangeRound([height, 0]);
    xScale.domain(d3.extent(data, function(d){
        return timeConv(d.date)}));

    yScale.domain([(0), d3.max(slices, function(c) {
        return d3.max(c.values, function(d) {
            return d.measurement + 4; });
            })
        ]);

    yaxis = d3.axisLeft()
        .ticks((slices[0].values).length)
        .scale(yScale);
   
    xaxis = d3.axisBottom()
        .tickFormat(d3.timeFormat('%I %p'))
        .scale(xScale);
       
    line = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.measurement); });
   
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxis)
        .append("text")
        .text("Time of Day (Hourly)")
        .attr("y", -6)
        .attr("dx", ".75em")
        .attr("x", width / 2)
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
   
    lines = svg.selectAll("lines")
        .data(slices)
        .enter()
        .append("g");

        lines.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); });
       
        lines.append("text")
        .attr("class","series")
        .datum(function(d) {
            return {
                id: d.id,
                value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) {
                return "translate(" + (xScale(d.value.date) + 0)  
                + "," + (yScale(d.value.measurement) + 5 )+ ")"; })
        .attr("x", 5)
        .text(function(d) { return "" + d.id; });

    lines.append("path")
        .attr("class", "ghost-line")
        .attr("d", function(d) { return line(d.values); });    

svg.selectAll(".ghost-line")
    .on('mouseover', function() {
        d3.select(this.parentNode)
            .select(".series")
            .transition()
            .delay("100")
            .duration("10")
            .style("fill","#2b2929");
        })
    .on('mouseout', function() {
        legend = d3.select(this.parentNode)
            .select(".series")
            .transition()
            .delay("100")
            .duration("10")
            .style("fill","#d2d2d2");
    });
});
}