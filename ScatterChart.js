import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
 
export default function ScatterChart(props) {
   const ref = useRef()
   const height = 460,
   width = 460
   //define initial svg parameters on mount
   useEffect(() => {
    const svgElement = d3.select(ref.current)
       .append("g")
       .classed("svgElement", true)
       .attr("height", height)
       .attr("width", width)
   },[])
 
   //deal with state changes
   useEffect(() => {
       const svgElement = d3.select(ref.current).select("g.svgElement")
           
       
       var margin = { top: 10, right: 10, bottom: 10, left: 30 };
    
       var xValMax = d3.max(props.data,function(d){return (d[props.xVal])})*1.1
       var yValMax = d3.max(props.data,function(d){return (d[props.yVal])})*1.1
   
       //define x axis
       var xScale = d3.scaleLinear()
                   .domain([0,xValMax])
                   .range([margin.left, 400]);
   
       var xAxis = svgElement.append("g")
       .call(d3.axisBottom(xScale))
       .attr("class","x-axis")
       .attr("transform", "translate(0," + (400) + ")");    
   
       //x label
       svgElement.append("text")
       .attr("class","scatterLabels")
       .style("text-anchor", "end")
       .attr("x", 405)
       .attr("y", 395)
       .style("font-size","24px")
       .style("fill","black")
       .text(props.xVal);
   
       //define y axis
       var yScale = d3.scaleLinear()
           .domain([0,yValMax])
           .range([400,0])
   
       var yAxis=svgElement.append("g")
       .call(d3.axisLeft(yScale))
       .attr("class","y-axis")
       .attr("transform", "translate(" + margin.left + ",0)")
       
       //y label
       svgElement.append("text")
       .attr("class","scatterLabels")
       .attr("transform", "rotate(-90)")
       .attr("y", margin.right + 18)
       .attr("dy", "1em")
       .style("text-anchor", "end")
       .style("font-size","24px")
       .style("fill","black")
       .text(props.yVal);
  
        svgElement.selectAll("circle")
        .data(props.data, d => d)
        .join(
            enter => (
            enter.append("circle")
            .attr("cx", function (d) { return xScale(d[props.xVal]); })
            .attr("cy", function (d) { return yScale(d[props.yVal]); })
            .attr("r", function(d) {return 6})
            .attr("class","circles")
            .style("stroke", "red")
            .style("stroke-width", "2px")
            .style("fill", "green")
            .call(enter => (
                enter.transition().duration(800)
            ))
        ),
        update => (
        update
            .call(update => (
                update.transition().duration(800)
            ))
        ),
        exit => (
            exit
            .call(exit => {
                exit.transition().duration(400)
                .style("opacity",0)
                .remove()
            })
        )
        )
    },[props.data])
 
    return (
        <svg
        viewBox={"0 0 " + height + " " + width}
        ref={ref}
        />
    )
}
