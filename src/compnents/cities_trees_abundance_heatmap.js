import React, { useEffect, useState } from "react"
import abundance_data from "../core/data/top20_cities_top20trees.json"
import * as d3 from "d3"


const margin = {top: 0, right: 50, bottom: 200, left: 50}
var x_labels
var y_labels

export default function CitiesTreesAbundanceHeatmap(props){
    const [update, setUpdate] = useState([])

    const width = props.width
    const height = props.height

    const boundsWidth = width - margin.left - margin.right
    const boundsHeight = height - margin.top - margin.bottom;

    useEffect(()=>{
// append the svg object to the body of the page
    var svg = d3.select("#heatmap_vis")
    


    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var myGroups = abundance_data.trees
    var myVars = abundance_data.cities
    console.log(myGroups, myVars)

    // Build X scales and axis:
    var x = d3.scaleBand()
    .range([ 0, boundsWidth ])
    .domain(myGroups)
    svg.append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + boundsHeight + ")")

// Build Y scales and axis:
var y = d3.scaleBand()
.range([ boundsHeight, 0 ])
.domain(myVars)
.padding(0.05);
svg.append("g")
.style("font-size", 15)

var max_abundance = 0
var data = []
for(var city in abundance_data){
    if (city === "trees" || city === "cities")
        continue
    for(var tree in abundance_data[city]){
        var data_to_push = {}
        data_to_push['group'] = tree
        data_to_push['variable'] = city
        data_to_push['value'] = abundance_data[city][tree]
        if(max_abundance < abundance_data[city][tree])
            max_abundance = abundance_data[city][tree]
        data.push(data_to_push)
    }
}

console.log(max_abundance)
console.log(data)
// Build color scale
var myColor = d3.scaleSequential()
.interpolator(d3.interpolateInferno)
.domain([0,max_abundance])

// create a tooltip
var tooltip = d3.select("#heatmap_vis")
.append("div")
.style("opacity", 0)
.attr("class", "tooltip")
.style("background-color", "white")
.style("border", "solid")
.style("border-width", "2px")
.style("border-radius", "5px")
.style("padding", "5px")

// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d) {
tooltip
  .style("opacity", 1)
d3.select(this)
  .style("stroke", "black")
  .style("opacity", 1)
}
var mousemove = function(d) {
tooltip
  .html("The exact value of<br>this cell is: " + d.value)
  .style("left", (d3.pointer(this)[0]+70) + "px")
  .style("top", (d3.pointer(this)[1]) + "px")
}
var mouseleave = function(d) {
tooltip
  .style("opacity", 0)
d3.select(this)
  .style("stroke", "none")
  .style("opacity", 0.8)
}


// add the squares
svg.selectAll()
.data(data, function(d) {return d.group+':'+d.variable;})
.enter()
.append("rect")
  .attr("x", function(d) { return x(d.group) })
  .attr("y", function(d) { return y(d.variable) })
  .attr("rx", 4)
  .attr("ry", 4)
  .attr("width", x.bandwidth() )
  .attr("height", y.bandwidth() )
  .style("fill", function(d) { return myColor(d.value)} )
  .style("stroke-width", 4)
  .style("stroke", "none")
  .style("opacity", 0.8)
.on("mouseover", mouseover)
.on("mousemove", mousemove)
.on("mouseleave", mouseleave)


x_labels = myGroups.map((group, i) => {
    console.log(i, group)
    var x_pos = (i+1) * x.bandwidth() -  x.bandwidth()/2 
    var y_pos = boundsHeight +10
    return (
        <text
        textAnchor="end"
        alignmentBaseline="central"
        fontSize={15}
        opacity={0.8}
        x={x_pos}
        y={y_pos}
        transform={"rotate(-90," + x_pos+ "," + y_pos+ ")"}
        fontWeight="bold"
        >
            {group}
        </text>
    )

})

y_labels = myVars.map((group, i) => {
    console.log(i, group)
    var x_pos = -10
    var y_pos = (i+1) * y.bandwidth() -  y.bandwidth()/2 
    return (
        <text
        textAnchor="end"
        alignmentBaseline="central"
        fontSize={15}
        opacity={0.8}
        x={x_pos}
        y={y_pos}
        transform={"rotate(-90," + x_pos+ "," + y_pos+ ")"}
        fontWeight="bold"
        >
            {group}
        </text>
    )

})
setUpdate()





    }, [])


        return (
            <>
            <div className="row">
                <div className="col-md-12 text-center">
                    <svg width={width} height={height} id="heatmap_vis">
                        <g
                            width={boundsWidth}
                            height={boundsHeight}
                            transform={`translate(${[margin.left, margin.top].join(",")})`}
                        >
                        </g>
                        <g>
                            {x_labels}
                        </g>
                        <g>
                            {y_labels}
                        </g>
                    </svg>
                </div>
            </div>
            </>
        )

}