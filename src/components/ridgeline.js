import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import data from "../core/data/ridgeline_data.json"
import { CFormSelect } from '@coreui/react'

var margin = { top: 60, right: 30, bottom: 20, left: 110 },
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var states = Object.keys(data)

export default function Ridgeline() {
    const [selectedState, setSelectedState] = useState(states[0])


    // This is what I need to compute kernel density estimation
    function kernelDensityEstimator(kernel, X) {
        return function (V) {
            return X.map(function (x) {
                return [x, d3.mean(V, function (v) { return kernel(x - v); })];
            });
        };
    }

    function kernelEpanechnikov(k) {
        return function (v) {
            return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        };
    }

    function changeStateSelection(event) {
        if (!selectedState) {
            setSelectedState(states[0])
        }
        else {
            setSelectedState(event.target.value)
        }
    }

    function find_min_max_temp_selectedyear() {
        var all_measures = []
        for (var year in data[selectedState]) {
            for (var condition in data[selectedState][year]) {
                data[selectedState][year][condition].map(
                    (temp) => all_measures.push(parseFloat(temp))
                )
            }
        }
        var [min, max] = d3.extent(all_measures)
        return [min, max]
    }
    useEffect(
        () => {
            d3.select("#ridgeline_svg").selectAll("*").remove();
            var svg = d3.select("#ridgeline_svg")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            var categories = Object.keys(data[selectedState])
            var n = categories.length
            var [min_temp, max_temp] = find_min_max_temp_selectedyear()
            console.log(min_temp, max_temp)
            // Add X axis
            var x = d3.scaleLinear()
                .domain([min_temp, max_temp])
                .range([0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Create a Y scale for densities
            var y = d3.scaleLinear()
                .domain([0, 1])
                .range([height, 0]);

            // Create the Y axis for names
            var yName = d3.scaleBand()
                .domain(categories)
                .range([0, height])
                .paddingInner(0)
            svg.append("g")
                .call(d3.axisLeft(yName));


            var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
            var allDensity = []
            for (var i = 0; i < n; i++) {
                var year = categories[i]
                var density_min = kde(data[selectedState][year]["min "].map(function (d) { return parseFloat(d); }))
                var density_max = kde(data[selectedState][year]["max "].map(function (d) { return parseFloat(d); }))
                allDensity.push({ key: year, density_min: density_min, density_max: density_max })
            }

            // Add areas
            svg.selectAll("areas")
                .data(allDensity)
                .enter()
                .append("path")
                .attr("transform", function (d) { return ("translate(0," + (yName(d.key) - height) + ")") })
                .datum(function (d) { return (d.density_min) })
                .attr("fill", "#69b3a2")
                .attr("stroke", "#000")
                .attr("stroke-width", 1)
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) { return x(d[0]); })
                    .y(function (d) { return y(d[1]); })
                )


        },
        [selectedState]
    )
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <CFormSelect
                        value={selectedState}
                        aria-label="Default select example"
                        options={states.map(
                            (state) => { return { label: state, value: state } }
                        )
                        }
                        onChange={changeStateSelection}
                    />
                </div>
            </div>
            <div id="ridgeline_svg"></div>

        </>
    )
}