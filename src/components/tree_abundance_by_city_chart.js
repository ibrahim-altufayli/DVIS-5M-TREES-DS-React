import React, { useState, useEffect } from "react";
import { CFormSelect } from '@coreui/react'
import * as d3 from "d3";
import states_cities from '../core/data/states_cities.json'
import abundance_data from '../core/data/top_10_trees_abundance_by_state_city.json'


const MARGIN = { top: 10, right: 50, bottom: 50, left: 50 };
const BAR_PADDING = 0.3;
var allShapes
var grid
var tooltip = null

export default function TreeAbundanceByCityChart(props) {
    const [selectedState, setSelectedState] = useState(Object.keys(states_cities)[0])
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState(states_cities[Object.keys(states_cities)[0]][0])
    const [data, setData] = useState([])
    const [update, updateState] = useState();

    const width = props.width
    const height = props.height

    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;


    function changeStateSelection(event) {
        setSelectedState(event.target.value)
    }

    function changeCitySelection(event) {
        var selectedCity = event.target.value
        setSelectedCity(selectedCity)

    }


    useEffect(() => {
        setCities(states_cities[selectedState])
        setSelectedCity(states_cities[selectedState][0])
    }, [selectedState])

    useEffect(() => {
        console.log(selectedCity)
        var data_instance = abundance_data[selectedState][selectedCity].trees.map(
            (tree, idx) => { return { tree: tree, abundance: abundance_data[selectedState][selectedCity]['abundances'][idx] } }
        )
        setData(data_instance)
    }, [selectedCity])

    if (!tooltip) {
        console.log(tooltip)
        tooltip = d3.select("#chart-1")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
    }


    var mouseover = function (d) {
        tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    var mousemove = function (d) {
        tooltip
            .html("The exact value of<br>this cell is: " + d.value)
            .style("left", (d3.pointer(this)[0] + 70) + "px")
            .style("top", (d3.pointer(this)[1]) + "px")
    }
    var mouseleave = function (d) {
        tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }


    useEffect(() => {
        console.log(data)
        const groups = data.sort((a, b) => b.abundance - a.abundance).map((d) => d.tree);
        console.log(groups)
        const yScale =
            d3
                .scaleBand()
                .domain(groups)
                .range([0, boundsHeight])
                .padding(BAR_PADDING);



        // X axis
        const [min, max] = d3.extent(data.map((d) => d.abundance));
        const xScale = d3
            .scaleLinear()
            .domain([0, max || 10])
            .range([0, boundsWidth]);


        console.log(xScale(6))
        allShapes = data.map((d, i) => {
            const y = yScale(d.tree);
            if (y === undefined) {
                return null;
            }

            return (
                <g key={i}>
                    <rect
                        x={xScale(0)}
                        y={yScale(d.tree)}
                        width={xScale(d.abundance)}
                        height={yScale.bandwidth()}
                        opacity={0.7}
                        stroke="#9d174d"
                        fill="#9d174d"
                        fillOpacity={0.3}
                        strokeWidth={1}
                        rx={1}
                    />
                    <text
                        x={xScale(d.abundance) - 7}
                        y={y + yScale.bandwidth() / 2}
                        textAnchor="end"
                        alignmentBaseline="central"
                        fontSize={12}
                        opacity={xScale(d.abundance) > 90 ? 1 : 0} // hide label if bar is not wide enough
                    >
                        {d.abundance}
                    </text>
                    <text
                        x={xScale(0) + 7}
                        y={y + yScale.bandwidth() / 2}
                        textAnchor="start"
                        alignmentBaseline="central"
                        fontSize={12}
                    >
                        {d.tree}
                    </text>
                </g>
            );
        });

        grid = xScale
            .ticks(5)
            .slice(1)
            .map((value, i) => (
                <g key={i}>
                    <line
                        x1={xScale(value)}
                        x2={xScale(value)}
                        y1={0}
                        y2={boundsHeight}
                        stroke="#808080"
                        opacity={0.2}
                    />
                    <text
                        x={xScale(value)}
                        y={boundsHeight + 10}
                        textAnchor="middle"
                        alignmentBaseline="central"
                        fontSize={9}
                        stroke="#808080"
                        opacity={0.8}
                    >
                        {value}
                    </text>
                </g>
            ));
        updateState([])


    }, [data])


  /*  useEffect(() => {
        d3.selectAll('rect').on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
    }, [update])*/


    const x_axis_lable = (
        <text
            x={boundsWidth / 2}
            y={boundsHeight + 30}
            textAnchor="middle"
            alignmentBaseline="central"
            fontSize={15}
            opacity={0.8}
            fontWeight="bold">
            Abundance count
        </text>
    )

    const y_axis_lable = (
        <text
            textAnchor="middle"
            alignmentBaseline="central"
            fontSize={15}
            opacity={0.8}
            transform={'translate(' + -30 + ', ' + boundsHeight / 2 + ') rotate(-90)'}
            fontWeight="bold">
            Trees
        </text>

    )






    return (
        <>
            <div className="row text-center">
                <div className="col-md-12 text-center">
                    <h2>
                        Tree Species Abundance In a selected City
                    </h2>
                    <h4>
                    Select a state, pick a city, and uncover the dominant 10 trees shaping the greenery
                    </h4>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <CFormSelect
                        value={selectedState}
                        aria-label="Default select example"
                        options={Object.keys(states_cities).map(
                            (state) => { return { label: state, value: state } }
                        )
                        }
                        onChange={changeStateSelection}
                    />
                </div>
                <div className="col-md-3">
                    <CFormSelect
                        value={selectedCity}
                        aria-label="Default select example"
                        options={
                            cities.map(
                                (city) => { return { label: city, value: city } }
                            )
                        }
                        onChange={changeCitySelection}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center">
                    <svg width={width} height={height} id="chart-1">
                        <g
                            width={boundsWidth}
                            height={boundsHeight}
                            transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                        >
                            {grid}
                            {allShapes}
                            {x_axis_lable}
                            {y_axis_lable}
                        </g>
                    </svg>
                </div>
            </div>

                        <hr></hr>
        </>
    )

}