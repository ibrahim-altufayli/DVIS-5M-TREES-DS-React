import { useMemo } from "react";
import * as d3 from "d3";
import data_abundance from '../core/data/top5_trees_by_top10_cities.json'

const MARGIN = { top: 0, right: 50, bottom: 50, left: 50 };
const BAR_PADDING = 0.2;

export const COLORS = ["#e85252", "#6689c6", "#9a6fb0", "#f6a623", "#53a049", "#b678e0"];


export default function CitiesAbundancePercentageOverAll(props) {

    const width = props.width
    const height = props.height
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;
    

    const groups = data_abundance.cities
    const subGroups = data_abundance.trees
    var data = []
    for (var city of groups) {
        for (var tree of subGroups) {
            var obj_to_append = {}
            obj_to_append["group"] = city
            obj_to_append["subgroup"] = tree
            obj_to_append["value"] = 0
            if (tree in data_abundance[city]) {
                obj_to_append["value"] = data_abundance[city][tree][1]
            }
            data.push(obj_to_append)
        }
    }

    const stackGenerator = d3
        .stack()
        .keys(subGroups)
        .value((d, key) => data.filter((item) => (item.group === d && item.subgroup === key))[0].value
        );
    const series = stackGenerator(groups);


    // Find size of the longest bar and group rank.
    // Values are available in the last group of the stack
    const lastStackGroup = series[series.length - 1] || [];
    const groupTotalValues = lastStackGroup.map((group) => {
        const biggest = group[group.length - 1] || 0;
        return { name: group.data, value: biggest };
    });
    const sortedGroupTotalValues = groupTotalValues.sort(
        (a, b) => b.value - a.value
    );
    const maxValue = sortedGroupTotalValues[0].value;

    // Y axis is for groups since the barplot is horizontal
    const yScale = useMemo(() => {
        return d3
            .scaleBand()
            .domain(groupTotalValues.map((g) => g.name))
            .range([0, boundsHeight])
            .padding(BAR_PADDING);
    }, [data, height]);

    // X axis
    const xScale = useMemo(() => {
        return d3.scaleLinear().domain([0, maxValue]).range([0, boundsWidth]);
    }, [data, width]);

    // Color Scale
    var colorScale = d3.scaleOrdinal().domain(subGroups).range(COLORS);

    const rectangles = series.map((subgroup, i) => {
        return (
            <g key={i}>
                {subgroup.map((group, j) => {
                    return (
                        <rect
                            key={j}
                            y={yScale(group.data)}
                            height={yScale.bandwidth()}
                            x={xScale(group[0])}
                            width={xScale(group[1]) - xScale(group[0])}
                            fill={colorScale(subgroup.key)}
                            opacity={0.6}
                        />
                    );
                })}
            </g>
        );
    });



    const labels = sortedGroupTotalValues.map((group, i) => {
        const y = yScale(group.name);

        if (!y) {
            return null;
        }

        return (
            <g key={i}>
                
                <text
                    x={xScale(0) + 7}
                    y={y + yScale.bandwidth() / 2}
                    textAnchor="start"
                    alignmentBaseline="central"
                    fontSize={12}
                >
                    {group.name}
                </text>
            </g>
        );
    });

    const grid = xScale
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
                    opacity={0.8}
                >
                    {value + '%'}
                </text>
            </g>
        ));

    const x_axis_lable = (
        <text
        x={boundsWidth/2}
        y={boundsHeight + 30}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={15}
        opacity={0.8}
        fontWeight="bold">
            Abundance Percentage 
        </text>
    )

    const y_axis_lable = (
        <text
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={15}
        opacity={0.8}
        transform={'translate(' + -30 + ', ' + boundsHeight/2 + ') rotate(-90)'}
        fontWeight="bold">
            Cities 
        </text>
        
    ) 
    return (
        <>
        <div className="row">
                <div className="col-md-12 text-center">
                    <h2>
                        Tree Species Abundance In a Specific City
                    </h2>
                </div>
            </div>
        <div className="row">
            <div className="col-md-12 text-center">
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    <g>{grid}</g>
                    <g>{rectangles}</g>
                    <g>{labels}</g>
                    <g>{x_axis_lable}</g>
                    <g>{y_axis_lable}</g>
                </g>
            </svg>
            </div>
        </div>
        <hr></hr>
        </>
    );
};
