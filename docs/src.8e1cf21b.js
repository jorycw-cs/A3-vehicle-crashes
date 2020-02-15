parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"WM09":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2004_r.27f4443a.csv";
},{}],"rzmb":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2005_r.6a96ab74.csv";
},{}],"XLEE":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2006_r.799af5ae.csv";
},{}],"TFhG":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2007_r.9257d1cc.csv";
},{}],"DV1r":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2008_r.4724a86c.csv";
},{}],"RdcF":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2009_r.bf2de651.csv";
},{}],"UPpm":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2010_r.fb1051d9.csv";
},{}],"gYxF":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2011_r.b59ff7b2.csv";
},{}],"DAnj":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2012_r.f4c910a0.csv";
},{}],"X57i":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2013_r.e7c51f71.csv";
},{}],"jZoU":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2014_r.66d39c61.csv";
},{}],"k6HX":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2015_r.3e3d624d.csv";
},{}],"DE77":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2016_r.cc60503f.csv";
},{}],"ehcG":[function(require,module,exports) {
module.exports="https://jorycw-cs.github.io/A3-vehicle-crashes/2017_r.d9c9f3d9.csv";
},{}],"Focm":[function(require,module,exports) {
console.log(d3.version),require("/csv/2004_r.csv"),require("/csv/2005_r.csv"),require("/csv/2006_r.csv"),require("/csv/2007_r.csv"),require("/csv/2008_r.csv"),require("/csv/2009_r.csv"),require("/csv/2010_r.csv"),require("/csv/2011_r.csv"),require("/csv/2012_r.csv"),require("/csv/2013_r.csv"),require("/csv/2014_r.csv"),require("/csv/2015_r.csv"),require("/csv/2016_r.csv"),require("/csv/2017_r.csv"),width=960,height=500,adj=150;var e=d3.timeParse("%I:%M%p");dataset=d3.csv(require("/csv/2017_r.csv")),r(dataset);var t=document.getElementById("myRange"),a=document.getElementById("outputId");function r(t){svg=d3.select("div#container").append("svg").attr("viewBox","-"+adj+" -"+adj+" "+(width+3*adj)+" "+(height+3*adj)),t.then(function(t){var a=t.columns.slice(1).map(function(a){return{id:a,values:t.map(function(t){return{date:e(t.date),measurement:+t[a]}})}});xScale=d3.scaleLinear().rangeRound([0,height]),yScale=d3.scaleLinear().rangeRound([height,0]),xScale.domain(d3.extent(t,function(t){return e(t.date)})),yScale.domain([0,d3.max(a,function(e){return d3.max(e.values,function(e){return e.measurement+4})})]),yaxis=d3.axisLeft().ticks(a[0].values.length).scale(yScale),xaxis=d3.axisBottom().tickFormat(d3.timeFormat("%I %p")).scale(xScale),line=d3.line().x(function(e){return xScale(e.date)}).y(function(e){return yScale(e.measurement)}),svg.append("g").attr("class","axis").attr("transform","translate(0,"+height+")").call(xaxis).append("text").text("Time of Day (Hourly)").attr("y",-6).attr("dx",".75em").attr("x",width/2).style("text-anchor","end"),svg.append("g").attr("class","axis").call(yaxis).append("text").attr("transform","rotate(-90)").attr("dy",".75em").attr("y",6).style("text-anchor","end").text("Persons Involed in Fatal Crashes"),lines=svg.selectAll("lines").data(a).enter().append("g"),lines.append("path").attr("class","line").attr("d",function(e){return line(e.values)}),lines.append("text").attr("class","series").datum(function(e){return{id:e.id,value:e.values[e.values.length-1]}}).attr("transform",function(e){return"translate("+(xScale(e.value.date)+0)+","+(yScale(e.value.measurement)+5)+")"}).attr("x",5).text(function(e){return""+e.id}),lines.append("path").attr("class","ghost-line").attr("d",function(e){return line(e.values)}),svg.selectAll(".ghost-line").on("mouseover",function(){d3.select(this.parentNode).select(".series").transition().delay("100").duration("10").style("fill","#2b2929")}).on("mouseout",function(){legend=d3.select(this.parentNode).select(".series").transition().delay("100").duration("10").style("fill","#d2d2d2")})})}t.value=2017,a.value="Year 2017",t.oninput=function(){a.value="Year "+t.value,year=t.value,d3.select("div#container").selectAll("*").remove(),dataset=d3.csv(require("/csv/"+year+"_r.csv")),r(dataset)};
},{"/csv/2004_r.csv":"WM09","/csv/2005_r.csv":"rzmb","/csv/2006_r.csv":"XLEE","/csv/2007_r.csv":"TFhG","/csv/2008_r.csv":"DV1r","/csv/2009_r.csv":"RdcF","/csv/2010_r.csv":"UPpm","/csv/2011_r.csv":"gYxF","/csv/2012_r.csv":"DAnj","/csv/2013_r.csv":"X57i","/csv/2014_r.csv":"jZoU","/csv/2015_r.csv":"k6HX","/csv/2016_r.csv":"DE77","/csv/2017_r.csv":"ehcG"}]},{},["Focm"], null)
//# sourceMappingURL=https://jorycw-cs.github.io/A3-vehicle-crashes/src.8e1cf21b.js.map