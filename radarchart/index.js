const margin = {top: 170, right: 100, bottom: 100, left: 10},
			width = 600 - margin.left - margin.right,
			height = 700 - margin.top - margin.bottom,
			legendMargin = {top: 20, right: 20, bottom: 20, left: 10},
			legendWidth = 200 - legendMargin.left - legendMargin.right,
			legendHeight = 300 - legendMargin.top - legendMargin.bottom,
			radius = Math.min(width / 2, height / 2),										// Radius of radar chart
			levels = 5, 																								// Levels of inner polygons
			labelFactor = 1.35, 																				// Label position compared to largest polygon radius
			wrapWidth = 60, 																						// label maximum width
			opacityArea = 0, 																					// Opacity of the area blob
			dotRadius = 4, 																							// Radius of the data point circle
			strokeWidth = 2, 																						// Width of the stroke around the area blob
			legendDotRadius = 10; 

let mydata;
var listst;
fetch("https://raw.githubusercontent.com/hussein320/5MTREES_D3_DATA_Visualization/main/radar_plot/data//Radar1.json")
.then((response) => response.json())
.then((data) => { 
  
  listst = data.states
  
	d3.select("#selectButton")
	.selectAll('myOptions')
	   .data(data.states)
	  .enter()
	  .append('option')
	.text(function (d) { return d; })
	.attr("value", function (d) { return d; }) 

	document.getElementById('show').innerHTML = `
	<p>Average Monthly tempreture for the state of Arizona: </p>
	
    `;
	let st=data.states[0]
	let axisdata=data[st].data[0].axes
	let months=axisdata.map(d => d.axis)

	let yeardata=data[st].data
	let years=yeardata.map(d => d.className)
	
	mydata= data["arizona"].data
	

	const classNames = years; // Name of each class
	const maxValue = 40; // Value of the largest polygon
	const axisNames = months; // Name of each axis
	const axisTotal = months.length; // Number of axes
	const format = d3.format(".0%"); // Percent format
	const angleSlice = Math.PI * 2 / axisTotal;

	const rScale = d3.scaleLinear()
   .range([0, radius])
   .domain([-20, maxValue]);

	const colorScale = d3.scaleOrdinal()
	.range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"])
	.domain(classNames);

	const svg= d3.select("#chart")
	.append("svg")
	.attr("id", "charty")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom);

	const g = svg.append("g")
	.attr("class", "radar-chart")
	.attr("transform", `translate(${margin.left + width / 2}, ${margin.top + height / 2})`);

	///////////////////////////////////////////////////////////
//// Draw the Levels //////////////////////////////////////
///////////////////////////////////////////////////////////
// Level wrapper

const levelWrapper = g.append("g").attr("class", "level-wrapper");

const levelValues = d3.range(-1, levels + 1).reverse()
	.map(d => maxValue / levels * d);

// Draw the level lines
const levelLine = d3.lineRadial()
		.curve(d3.curveLinearClosed)
		.radius(d => rScale(d))
		.angle((d, i) => i * angleSlice);

levelWrapper.selectAll(".level-line")
	.data(levelValues.map(d => Array(axisTotal).fill(d)))
	.enter().append("path")
		.attr("class", "level-line")
		.attr("d", levelLine)
		.style("fill", "none");

// Text indicating level values
levelWrapper.selectAll(".level-value")
	.data(levelValues)
	.enter().append("text")
		.attr("class", "level-value")
		.attr("x", d => 5)
		.attr("y", d => -rScale(d+2))
		.attr("dy", "0.35em")
		.text(d => d)
		// .style("fill", "#f0edeb");

///////////////////////////////////////////////////////////
//// Draw the axes ////////////////////////////////////////
///////////////////////////////////////////////////////////
// Axis wrapper
const axisWrapper = g.append("g").attr("class", "axis-wrapper");

const axis = axisWrapper.selectAll(".axis")
	.data(axisNames)
	.enter().append("g")
		.attr("class", "axis");

// Draw axis lines
axis.append("line")
		.attr("class", "axis-line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", (d, i) => rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
		.attr("y2", (d, i) => rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
		;
// Text indicating axis name
axis.append("text")
		.attr("class", "axis-name")
		.attr("x", (d, i) => rScale(maxValue * labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
		.attr("y", (d, i) => rScale(maxValue * labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
		.attr("dy", "0.35em")
		.style("text-anchor", "middle")
		.text(d => d)
		.call(wrap, wrapWidth);

const radarLine = d3.lineRadial()
.curve(d3.curveCardinalClosed)
.radius(d => rScale(d.value))
.angle((d, i) => i * angleSlice);

// Blob wrapper
const blobWrapper = g.append("g")
		.attr("class", "all-blobs-wrapper")
	.selectAll(".blob-wrapper")
	.data(mydata)
	.enter().append("g")
		.attr("class", d => "blob-wrapper blob-wrapper-" + hyphenWords(d.className));

// // Draw blob areas
// blobWrapper.append("path")
// 		.attr("class", d => "blob-area blob-area-" + hyphenWords(d.className))
// 		.attr("d", d => radarLine(d.axes))
// 		.style("fill", d => colorScale(d.className))
// 		.style("fill-opacity", opacityArea)
// 		.style("stroke", d => colorScale(d.className))
// 		.style("stroke-width", strokeWidth)
// 		.style("stroke-opacity", 0.5);

// Blob circle wrapper
const circleWrapper = blobWrapper.selectAll(".circle-wrapper")
	.data(d => d.axes.map(e => {
		e.className = d.className;
		return e;
	}))
	.enter().append("g")
		.attr("class", d => "circle-wrapper circle-wrapper-" + hyphenWords(d.className))
		.attr("transform", (d, i) => `translate(
			${rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)},
			${rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)})`);

// Draw blob circles
circleWrapper.append("circle")
		// .attr("class", d => "circle circle-" + hyphenWords(d.className))
		.attr("id", d => "circle-" + hyphenWords(d.className))
		.attr("r",0)
		.style("fill", d => colorScale(d.className))
		.style("stroke", d => colorScale(d.className))
		.style("stroke-width", 1);

// Text indicating value of each blob circle

circleWrapper.append("text")
		// .attr("class", d => "value value-" + hyphenWords(d.className))
		.attr("id", d => "value-" + hyphenWords(d.className))
		.attr("x", 10)
		.attr("dy", "1.5em")
		.text(d => d.value)
		.style("opacity", 0); // Hide the values, only show them when hover over the legend


///////////////////////////////////////////////////////////
//// Transition Layer /////////////////////////////////////
///////////////////////////////////////////////////////////
// Additional blob area for a smooth transition
const transitionBlob = g.append("path")
		.attr("class", "transition-area");

///////////////////////////////////////////////////////////
//// Legend ///////////////////////////////////////////////
///////////////////////////////////////////////////////////
// Legend container
const legend = d3.select("#legend")
	.append("svg")
		.attr("width", legendWidth + legendMargin.left + legendMargin.right)
		.attr("height", legendHeight + legendMargin.top + legendMargin.bottom)
		.attr("id", "legendy")
	.append("g")
		.attr("transform", `translate(${legendMargin.left}, ${legendMargin.top})`);

// Legend y scale for layout
const legendYScale = d3.scalePoint()
		.range([0, legendHeight])
		.domain(classNames)
		.padding(0);

// Legend item wrapper
const legendItemWrapper = legend.selectAll("legend-item-wrapper")
	.data(classNames)
	.enter().append("g")
		.attr("class", d => "legend-item-wrapper legend-item-wrapper-" + hyphenWords(d))
		.attr("transform", d => `translate(0, ${legendYScale(d)})`);

// Legend item circle
legendItemWrapper.append("circle")
		.attr("class", d => "legend-item-circle legend-item-circle-" + hyphenWords(d))
		.attr("r", legendDotRadius)
		.attr("cx", legendDotRadius)
		.attr("cy", 0)
		.style("fill", d => colorScale(d));

// Legend item text
legendItemWrapper.append("text")
		.attr("class", d => "legend-item-text legend-item-text-" + hyphenWords(d))
		.attr("x", legendDotRadius * 3)
		.attr("y", 0)
		.attr("dy", "0.35em")
		.text(d => d)
		;

// Invisible rect to capture mouse event
legendItemWrapper.append("rect")
		.attr("class", d => "legend-item-rect legend-item-rect-" + hyphenWords(d))
		.attr("x", 0)
		.attr("y", d => -legendYScale.step() / 2)
		.attr("width", legendWidth/2)
		.attr("height", legendYScale.step())
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("click", mouseenterLegendItem)
		
		// .on("mouseenter", mouseenterLegendItem)
		// .on("mouseleave", mouseleaveLegendItem)
		;


///////////////////////////////////////////////////////////
//// Event Listeners //////////////////////////////////////
///////////////////////////////////////////////////////////
let count = 0;
let name = '';
localStorage.clear();

function mouseenterLegendItem(classNameRaw) {
	
	const className = hyphenWords(classNameRaw);
	const legendItem1978 = d3.select(".legend-item-text-" + className);
	const Value = localStorage.getItem(`${classNameRaw}`);
	if (Value === `true`){
		count -= 1;
		if(count === 1){ 
		setTimeout(function() {
  	Object.keys(localStorage).forEach(key => {
	  const KeyValue = localStorage.getItem(key);
	  if (KeyValue === 'true'){

		  name = key;
		  d3.selectAll("#value-" + hyphenWords(key))
		  .style("opacity", 1)
		  .style("fill","white");	
	  }
});
			}, 100);
		}
		// else if(count > 1){
		// 	let validate = true;
		// 	setTimeout(function() {
		// 		Object.keys(localStorage).forEach(key => {
		// 		const KeyValue = localStorage.getItem(key);
		// 		console.log(key, KeyValue);
		// 		if (KeyValue === 'true' && validate){
		// 			validate = false;
		// 			d3.selectAll("#value-" + hyphenWords(key))
		// 			.style("opacity", 1)
		// 			.style("fill","white");	
		// 		}
				
		//   });
		// 			  }, 100);
		// }
		localStorage.setItem(`${classNameRaw}`, `false`)
		mouseleaveLegendItem(`${classNameRaw}`);
			d3.selectAll("#blob-id-" + hyphenWords(classNameRaw)).remove()
			d3.selectAll("#" + 'row-' + hyphenWords(classNameRaw)).remove();
			svg.selectAll("#circle-" + hyphenWords(classNameRaw))
			.attr("r",0);
			
		svg.selectAll("#value-" + hyphenWords(className))
		.style("opacity", 0);
		  if(count ===0){
			elem = document.getElementById('all');
			elem.style.display = 'none';
			elem2 = document.getElementById('infotb');
			elem2.style.display = 'none';
		  }

			}
			
	else {
		elem = document.getElementById('all');
		elem.style.display = 'flex';
		elem2 = document.getElementById('infotb');
		elem2.style.display = 'flex';

   thisdata=mydata.filter(function(d){ return d.className===hyphenWords(classNameRaw)})
   let pathdata=thisdata[0].axes
	count += 1;
	d3.selectAll("#circle-" + hyphenWords(classNameRaw))
	.attr("r",4);
		if(count === 1){ 
		  name = classNameRaw;
		  d3.selectAll("#value-" + hyphenWords(name))
		  .style("opacity", 1)
		  .style("fill","white");	
		}
		if(count > 1){ 
			d3.selectAll("#value-" + hyphenWords(name))
			.style("opacity", 0)
			.style("fill","white");	
			  
		}
	    // Assuming you have the table content element
		var tableContent = document.querySelector('.table-content');

		// Sample data
		if(className==="2023"){ 
		var rowData = [Number(pathdata[0].className), pathdata[0].value, pathdata[1].value, pathdata[2].value, pathdata[3].value
		  , pathdata[4].value, pathdata[5].value, pathdata[6].value, pathdata[7].value, pathdata[8].value, pathdata[9].value
		  , Number.NaN, Number.NaN];}
		else{
			var rowData = [Number(pathdata[0].className), pathdata[0].value, pathdata[1].value, pathdata[2].value, pathdata[3].value
		  , pathdata[4].value, pathdata[5].value, pathdata[6].value, pathdata[7].value, pathdata[8].value, pathdata[9].value
		  , pathdata[10].value, pathdata[11].value];
		}
	
		// Create a new table row
		var newRow = document.createElement('div');
		newRow.classList.add('table-row');
		newRow.id = 'row-' + hyphenWords(classNameRaw);
		
		// Loop through the data and create table data cells
		rowData.forEach(function (data) {
		  var newCell = document.createElement('div');
		  newCell.classList.add('table-data');
		  newCell.textContent = data;
		  newRow.appendChild(newCell);
		});
	
		// Append the new row to the table content
		tableContent.appendChild(newRow);
		
		  
	// Is initial entering legend
	localStorage.setItem(`${classNameRaw}`, `true`)
	// const isInitial = d3.select(".transition-area").attr("d") === null;
	// Do not transition the blob area when initial entering legend
	// const blobTransitionTime = isInitial ? 0 : 500;
	const blobTransitionTime = 500;
	// const className = hyphenWords(classNameRaw);
	const t1 = d3.transition().duration(200),
				t2 = d3.transition().duration(blobTransitionTime).delay(200);
	// Bring transition layer to the front
	// d3.select(".transition-area").raise();
	// Legend item circle size increases


		//console.log("pathdata",pathdata[0].value)


	d3.select(".legend-item-circle-" + className)
		.transition(t1)
			.attr("r", legendDotRadius * 1.2);
	// Legend item text color changes to white
	d3.select(".legend-item-text-" + className)
		.transition(t1)
			.style("fill", "#fff");
	// Dim all blob areas, blob outlines, blob circles
	// d3.selectAll(".blob-area")
	// 	.transition(t1)
	// 		.style("fill-opacity", 0.1)
	// 		.style("stroke-opacity", 0.3);
	d3.selectAll(".circle")
			.transition(t1)
			.style("opacity", 0.3)
			.style("fill", function() { return colorScale(d3.select(this).datum().className); })
			.style("stroke-width", 0);
	// Highlight the specific className blob line


	// d3.select(".transition-area")
	// 	.datum(mydata.filter(d => d.className === classNameRaw)[0])
	// 	.transition(t1)
	// 		.duration(blobTransitionTime)
	// 		.attr("d", d => radarLine(d.axes))
	// 		.style("fill", d => colorScale(d.className))
	// 		.style("fill-opacity", opacityArea)
	// 		.style("stroke", d => colorScale(d.className))
	// 		.style("stroke-width", strokeWidth);



		blobWrapper.append("path")
		.datum(thisdata)
		.transition(t1)
			.duration(blobTransitionTime)
	.attr("class", d => "blob-area blob-area-" + hyphenWords(classNameRaw))
	.attr("d", radarLine(pathdata))
	.attr("id", d => "blob-id-" + hyphenWords(classNameRaw))
	.style("fill", d => colorScale(className))
	.style("fill-opacity", opacityArea)
	.style("stroke", d => colorScale(className))
	.style("stroke-width", strokeWidth)
	.style("stroke-opacity", 0.5);

	// Highlight the specific className blob circles, blob texts
	d3.selectAll(".circle-" + className)
		.transition(t2)
			.style("opacity", 1)
			.style("fill", "#37373D") // Fill with background color
			.style("stroke-width", strokeWidth);
	// d3.selectAll(".value-" + className)
	// 	.transition(t2)
	// 		.style("opacity", 1);
		}
}

function mouseleaveLegendItem(d) {
	const className = hyphenWords(d);
	const t = d3.transition().duration(200);
	// Legend item circle size changes back
	d3.select(".legend-item-circle-" + className)
		.transition(t)
			.attr("r", legendDotRadius);
	// Legend item text color changes back to #5F5F64
	d3.select(".legend-item-text-" + className)
		.transition(t)
			.style("fill", "#5F5F64");
	// Bring back all blob areas, blob outlines, blob circles, blob text
	d3.selectAll(".blob-area")
		.transition(t)
			.style("fill-opacity", opacityArea)
			.style("stroke-opacity", 1);
	d3.selectAll(".circle")
		.transition(t)
			.style("opacity", 1)
			.style("fill", function() { return colorScale(d3.select(this).datum().className); })
			.style("stroke-width", 0);

	// d3.selectAll(".value")
	// 	.transition(t)
	// 		.style("opacity", );
}


///////////////////////////////////////////////////////////
//// Helper Function //////////////////////////////////////
///////////////////////////////////////////////////////////
// Taken from http://bl.ocks.org/mbostock/7555321
// Wrap svg text
function wrap(text, width) {
	text.each(function() {
		let text = d3.select(this),
				words = text.text().split(/\s+/).reverse(),
				word,
				line = [],
				lineNumber = 0,
				lineHeight = 1.4, // ems
				y = text.attr("y"),
				x = text.attr("x"),
				dy = parseFloat(text.attr("dy")),
				tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

		while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(" "));
			if (tspan.node().getComputedTextLength() > width) {
				line.pop();
				tspan.text(line.join(" "));
				line = [word];
				tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			}
		}
	});
}

// Turn className from data into lowercase words joined by hyphens
function hyphenWords(words) {
	return words.toLowerCase().replace(/ /g, "-");
}


});





document.addEventListener("DOMContentLoaded", function () {
	var properties = ["Year","Jan","Feb","mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  
	properties.forEach(function (val) {
	  var orderClass = '';
	  var element = document.getElementById(val);
  
	  element.addEventListener("click", function (e) {
		e.preventDefault();
  
		var activeLinks = document.querySelectorAll('.filter__link.filter__link--active:not(#' + val + ')');
		activeLinks.forEach(function (link) {
		  link.classList.remove('filter__link--active');
		});
  
		element.classList.toggle('filter__link--active');
  
		var allLinks = document.querySelectorAll('.filter__link');
		allLinks.forEach(function (link) {
		  link.classList.remove('asc', 'desc');
		});
  
		if (orderClass === 'desc' || orderClass === '') {
		  element.classList.add('asc');
		  orderClass = 'asc';
		} else {
		  element.classList.add('desc');
		  orderClass = 'desc';
		}
  
		var parent = element.closest('.header__item');
		var index = Array.from(document.querySelectorAll(".header__item")).indexOf(parent);
		var table = document.querySelector('.table-content');
		var rows = Array.from(table.querySelectorAll('.table-row'));
  
		var isSelected = element.classList.contains('filter__link--active');
		var isNumber = element.classList.contains('filter__link--number');
  
		rows.sort(function (a, b) {
		  var x = a.querySelectorAll('.table-data')[index].textContent.trim();
		  var y = b.querySelectorAll('.table-data')[index].textContent.trim();
  
		  if (isNumber) {
			return isSelected ? parseFloat(x) - parseFloat(y) : parseFloat(y) - parseFloat(x);
		  } else {
			return isSelected ? x.localeCompare(y) : y.localeCompare(x);
		  }
		});
  
		rows.forEach(function (row) {
		  table.appendChild(row);
		});
  
		return false;
	  });
	});
  });

  d3.select(".butt").on("click", function() {
    // var selectedOption = d3.select(this).property("value");

    var selectedstate = d3.select("#selectButton").property("value")
    
    update(selectedstate);
	console.log(selectedstate)
  });

function update(selectedstate){
	
	const elem1 = document.getElementById("legendy");
	elem1.remove();
	const elem2 = document.getElementById("charty");
	elem2.remove();
	const boxes = document.querySelectorAll('.table-row');

	elemshow = document.getElementById('all');
	elemshow.style.display = 'none';
	elem2table = document.getElementById('infotb');
	elem2table.style.display = 'none';

	boxes.forEach(box => {
	box.remove();
	});
	
	fetch("https://raw.githubusercontent.com/hussein320/5MTREES_D3_DATA_Visualization/main/radar_plot/data//Radar1.json")
	.then((response) => response.json())
	.then((data) => { 
	  
	  listst = data.states
	  
		d3.select("#selectButton")
		.selectAll('myOptions')
		   .data(data.states)
		  .enter()
		  .append('option')
		.text(function (d) { return d; })
		.attr("value", function (d) { return d; }) 
	
		document.getElementById('show').innerHTML = `
		<p>Average Monthly tempreture for the state of ${selectedstate}: </p>
		
		`;
		let st=data.states[0]
		let axisdata=data[st].data[0].axes
		let months=axisdata.map(d => d.axis)
	
		let yeardata=data[st].data
		let years=yeardata.map(d => d.className)
		
		mydata= data[selectedstate].data
		
	
		const classNames = years; // Name of each class
		const maxValue = 40; // Value of the largest polygon
		const axisNames = months; // Name of each axis
		const axisTotal = months.length; // Number of axes
		const format = d3.format(".0%"); // Percent format
		const angleSlice = Math.PI * 2 / axisTotal;
	
		const rScale = d3.scaleLinear()
	   .range([0, radius])
	   .domain([-20, maxValue]);
	
		const colorScale = d3.scaleOrdinal()
		.range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"])
		.domain(classNames);
	
		const svg= d3.select("#chart")
		.append("svg")
		.attr("id", "charty")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
	
		const g = svg.append("g")
		.attr("class", "radar-chart")
		.attr("transform", `translate(${margin.left + width / 2}, ${margin.top + height / 2})`);
	
		///////////////////////////////////////////////////////////
	//// Draw the Levels //////////////////////////////////////
	///////////////////////////////////////////////////////////
	// Level wrapper
	
	const levelWrapper = g.append("g").attr("class", "level-wrapper");
	
	const levelValues = d3.range(-1, levels + 1).reverse()
		.map(d => maxValue / levels * d);
	
	// Draw the level lines
	const levelLine = d3.lineRadial()
			.curve(d3.curveLinearClosed)
			.radius(d => rScale(d))
			.angle((d, i) => i * angleSlice);
	
	levelWrapper.selectAll(".level-line")
		.data(levelValues.map(d => Array(axisTotal).fill(d)))
		.enter().append("path")
			.attr("class", "level-line")
			.attr("d", levelLine)
			.style("fill", "none");
	
	// Text indicating level values
	levelWrapper.selectAll(".level-value")
		.data(levelValues)
		.enter().append("text")
			.attr("class", "level-value")
			.attr("x", d => 5)
			.attr("y", d => -rScale(d+2))
			.attr("dy", "0.35em")
			.text(d => d)
			// .style("fill", "#f0edeb");
	
	///////////////////////////////////////////////////////////
	//// Draw the axes ////////////////////////////////////////
	///////////////////////////////////////////////////////////
	// Axis wrapper
	const axisWrapper = g.append("g").attr("class", "axis-wrapper");
	
	const axis = axisWrapper.selectAll(".axis")
		.data(axisNames)
		.enter().append("g")
			.attr("class", "axis");
	
	// Draw axis lines
	axis.append("line")
			.attr("class", "axis-line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", (d, i) => rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
			.attr("y2", (d, i) => rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
			;
	// Text indicating axis name
	axis.append("text")
			.attr("class", "axis-name")
			.attr("x", (d, i) => rScale(maxValue * labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
			.attr("y", (d, i) => rScale(maxValue * labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
			.attr("dy", "0.35em")
			.style("text-anchor", "middle")
			.text(d => d)
			.call(wrap, wrapWidth);
	
	const radarLine = d3.lineRadial()
	.curve(d3.curveCardinalClosed)
	.radius(d => rScale(d.value))
	.angle((d, i) => i * angleSlice);
	
	// Blob wrapper
	const blobWrapper = g.append("g")
			.attr("class", "all-blobs-wrapper")
		.selectAll(".blob-wrapper")
		.data(mydata)
		.enter().append("g")
			.attr("class", d => "blob-wrapper blob-wrapper-" + hyphenWords(d.className));
	
	// // Draw blob areas
	// blobWrapper.append("path")
	// 		.attr("class", d => "blob-area blob-area-" + hyphenWords(d.className))
	// 		.attr("d", d => radarLine(d.axes))
	// 		.style("fill", d => colorScale(d.className))
	// 		.style("fill-opacity", opacityArea)
	// 		.style("stroke", d => colorScale(d.className))
	// 		.style("stroke-width", strokeWidth)
	// 		.style("stroke-opacity", 0.5);
	
	// Blob circle wrapper
	const circleWrapper = blobWrapper.selectAll(".circle-wrapper")
		.data(d => d.axes.map(e => {
			e.className = d.className;
			return e;
		}))
		.enter().append("g")
			.attr("class", d => "circle-wrapper circle-wrapper-" + hyphenWords(d.className))
			.attr("transform", (d, i) => `translate(
				${rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)},
				${rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)})`);
	
	// Draw blob circles
	circleWrapper.append("circle")
			// .attr("class", d => "circle circle-" + hyphenWords(d.className))
			.attr("id", d => "circle-" + hyphenWords(d.className))
			.attr("r",0)
			.style("fill", d => colorScale(d.className))
			.style("stroke", d => colorScale(d.className))
			.style("stroke-width", 1);
	
	// Text indicating value of each blob circle
	
	circleWrapper.append("text")
			// .attr("class", d => "value value-" + hyphenWords(d.className))
			.attr("id", d => "value-" + hyphenWords(d.className))
			.attr("x", 10)
			.attr("dy", "1.5em")
			.text(d => d.value)
			.style("opacity", 0); // Hide the values, only show them when hover over the legend
	
	
	///////////////////////////////////////////////////////////
	//// Transition Layer /////////////////////////////////////
	///////////////////////////////////////////////////////////
	// Additional blob area for a smooth transition
	const transitionBlob = g.append("path")
			.attr("class", "transition-area");
	
	///////////////////////////////////////////////////////////
	//// Legend ///////////////////////////////////////////////
	///////////////////////////////////////////////////////////
	// Legend container
	const legend = d3.select("#legend")
		.append("svg")
			.attr("width", legendWidth + legendMargin.left + legendMargin.right)
			.attr("height", legendHeight + legendMargin.top + legendMargin.bottom)
			.attr("id","legendy")
		.append("g")
			.attr("transform", `translate(${legendMargin.left}, ${legendMargin.top})`);
	
	// Legend y scale for layout
	const legendYScale = d3.scalePoint()
			.range([0, legendHeight])
			.domain(classNames)
			.padding(0);
	
	// Legend item wrapper
	const legendItemWrapper = legend.selectAll("legend-item-wrapper")
		.data(classNames)
		.enter().append("g")
			.attr("class", d => "legend-item-wrapper legend-item-wrapper-" + hyphenWords(d))
			.attr("transform", d => `translate(0, ${legendYScale(d)})`);
	
	// Legend item circle
	legendItemWrapper.append("circle")
			.attr("class", d => "legend-item-circle legend-item-circle-" + hyphenWords(d))
			.attr("r", legendDotRadius)
			.attr("cx", legendDotRadius)
			.attr("cy", 0)
			.style("fill", d => colorScale(d));
	
	// Legend item text
	legendItemWrapper.append("text")
			.attr("class", d => "legend-item-text legend-item-text-" + hyphenWords(d))
			.attr("x", legendDotRadius * 3)
			.attr("y", 0)
			.attr("dy", "0.35em")
			.text(d => d)
			;
	
	// Invisible rect to capture mouse event
	legendItemWrapper.append("rect")
			.attr("class", d => "legend-item-rect legend-item-rect-" + hyphenWords(d))
			.attr("x", 0)
			.attr("y", d => -legendYScale.step() / 2)
			.attr("width", legendWidth/2)
			.attr("height", legendYScale.step())
			.style("fill", "none")
			.style("pointer-events", "all")
			.on("click", mouseenterLegendItem)
			
			// .on("mouseenter", mouseenterLegendItem)
			// .on("mouseleave", mouseleaveLegendItem)
			;
	
	
	///////////////////////////////////////////////////////////
	//// Event Listeners //////////////////////////////////////
	///////////////////////////////////////////////////////////
	let count = 0;
	let name = '';
	localStorage.clear();
	
	function mouseenterLegendItem(classNameRaw) {
		
		const className = hyphenWords(classNameRaw);
		const legendItem1978 = d3.select(".legend-item-text-" + className);
		const Value = localStorage.getItem(`${classNameRaw}`);
		if (Value === `true`){
			count -= 1;
			if(count === 1){ 
			setTimeout(function() {
		  Object.keys(localStorage).forEach(key => {
		  const KeyValue = localStorage.getItem(key);
		  if (KeyValue === 'true'){
	
			  name = key;
			  d3.selectAll("#value-" + hyphenWords(key))
			  .style("opacity", 1)
			  .style("fill","white");	
		  }
	});
				}, 100);
			}
			// else if(count > 1){
			// 	let validate = true;
			// 	setTimeout(function() {
			// 		Object.keys(localStorage).forEach(key => {
			// 		const KeyValue = localStorage.getItem(key);
			// 		console.log(key, KeyValue);
			// 		if (KeyValue === 'true' && validate){
			// 			validate = false;
			// 			d3.selectAll("#value-" + hyphenWords(key))
			// 			.style("opacity", 1)
			// 			.style("fill","white");	
			// 		}
					
			//   });
			// 			  }, 100);
			// }
			localStorage.setItem(`${classNameRaw}`, `false`)
			mouseleaveLegendItem(`${classNameRaw}`);
				d3.selectAll("#blob-id-" + hyphenWords(classNameRaw)).remove()
				d3.selectAll("#" + 'row-' + hyphenWords(classNameRaw)).remove();
				svg.selectAll("#circle-" + hyphenWords(classNameRaw))
				.attr("r",0);
			console.log(count)
			svg.selectAll("#value-" + hyphenWords(className))
			.style("opacity", 0);
			  if(count === 0){
				// elemshow = document.getElementById('all');
				elemshow.style.display = 'none';
				// elem2table = document.getElementById('infotb');
				elem2table.style.display = 'none';
			  }
	
				}
				
		else {
			elem = document.getElementById('all');
			elem.style.display = 'flex';
			elemn2 = document.getElementById('infotb');
			elemn2.style.display = 'flex';
	
	   thisdata=mydata.filter(function(d){ return d.className===hyphenWords(classNameRaw)})
	   let pathdata=thisdata[0].axes
		count += 1;
		d3.selectAll("#circle-" + hyphenWords(classNameRaw))
		.attr("r",4);
			if(count === 1){ 
			  name = classNameRaw;
			  d3.selectAll("#value-" + hyphenWords(name))
			  .style("opacity", 1)
			  .style("fill","white");	
			}
			if(count > 1){ 
				d3.selectAll("#value-" + hyphenWords(name))
				.style("opacity", 0)
				.style("fill","white");	
				  
			}
			// Assuming you have the table content element
			var tableContent = document.querySelector('.table-content');
	
			// Sample data
			if(className==="2023"){ 
			var rowData = [Number(pathdata[0].className), pathdata[0].value, pathdata[1].value, pathdata[2].value, pathdata[3].value
			  , pathdata[4].value, pathdata[5].value, pathdata[6].value, pathdata[7].value, pathdata[8].value, pathdata[9].value
			  , Number.NaN, Number.NaN];}
			else{
				var rowData = [Number(pathdata[0].className), pathdata[0].value, pathdata[1].value, pathdata[2].value, pathdata[3].value
			  , pathdata[4].value, pathdata[5].value, pathdata[6].value, pathdata[7].value, pathdata[8].value, pathdata[9].value
			  , pathdata[10].value, pathdata[11].value];
			}
		
			// Create a new table row
			var newRow = document.createElement('div');
			newRow.classList.add('table-row');
			newRow.id = 'row-' + hyphenWords(classNameRaw);
			
			// Loop through the data and create table data cells
			rowData.forEach(function (data) {
			  var newCell = document.createElement('div');
			  newCell.classList.add('table-data');
			  newCell.textContent = data;
			  newRow.appendChild(newCell);
			});
		
			// Append the new row to the table content
			tableContent.appendChild(newRow);
			
			  
		// Is initial entering legend
		localStorage.setItem(`${classNameRaw}`, `true`)
		// const isInitial = d3.select(".transition-area").attr("d") === null;
		// Do not transition the blob area when initial entering legend
		// const blobTransitionTime = isInitial ? 0 : 500;
		const blobTransitionTime = 500;
		// const className = hyphenWords(classNameRaw);
		const t1 = d3.transition().duration(200),
					t2 = d3.transition().duration(blobTransitionTime).delay(200);
		// Bring transition layer to the front
		// d3.select(".transition-area").raise();
		// Legend item circle size increases
	
	
			//console.log("pathdata",pathdata[0].value)
	
	
		d3.select(".legend-item-circle-" + className)
			.transition(t1)
				.attr("r", legendDotRadius * 1.2);
		// Legend item text color changes to white
		d3.select(".legend-item-text-" + className)
			.transition(t1)
				.style("fill", "#fff");
		// Dim all blob areas, blob outlines, blob circles
		// d3.selectAll(".blob-area")
		// 	.transition(t1)
		// 		.style("fill-opacity", 0.1)
		// 		.style("stroke-opacity", 0.3);
		d3.selectAll(".circle")
				.transition(t1)
				.style("opacity", 0.3)
				.style("fill", function() { return colorScale(d3.select(this).datum().className); })
				.style("stroke-width", 0);
		// Highlight the specific className blob line
	
	
		// d3.select(".transition-area")
		// 	.datum(mydata.filter(d => d.className === classNameRaw)[0])
		// 	.transition(t1)
		// 		.duration(blobTransitionTime)
		// 		.attr("d", d => radarLine(d.axes))
		// 		.style("fill", d => colorScale(d.className))
		// 		.style("fill-opacity", opacityArea)
		// 		.style("stroke", d => colorScale(d.className))
		// 		.style("stroke-width", strokeWidth);
	
	
	
			blobWrapper.append("path")
			.datum(thisdata)
			.transition(t1)
				.duration(blobTransitionTime)
		.attr("class", d => "blob-area blob-area-" + hyphenWords(classNameRaw))
		.attr("d", radarLine(pathdata))
		.attr("id", d => "blob-id-" + hyphenWords(classNameRaw))
		.style("fill", d => colorScale(className))
		.style("fill-opacity", opacityArea)
		.style("stroke", d => colorScale(className))
		.style("stroke-width", strokeWidth)
		.style("stroke-opacity", 0.5);
	
		// Highlight the specific className blob circles, blob texts
		d3.selectAll(".circle-" + className)
			.transition(t2)
				.style("opacity", 1)
				.style("fill", "#37373D") // Fill with background color
				.style("stroke-width", strokeWidth);
		// d3.selectAll(".value-" + className)
		// 	.transition(t2)
		// 		.style("opacity", 1);
			}
	}
	
	function mouseleaveLegendItem(d) {
		const className = hyphenWords(d);
		const t = d3.transition().duration(200);
		// Legend item circle size changes back
		d3.select(".legend-item-circle-" + className)
			.transition(t)
				.attr("r", legendDotRadius);
		// Legend item text color changes back to #5F5F64
		d3.select(".legend-item-text-" + className)
			.transition(t)
				.style("fill", "#5F5F64");
		// Bring back all blob areas, blob outlines, blob circles, blob text
		d3.selectAll(".blob-area")
			.transition(t)
				.style("fill-opacity", opacityArea)
				.style("stroke-opacity", 1);
		d3.selectAll(".circle")
			.transition(t)
				.style("opacity", 1)
				.style("fill", function() { return colorScale(d3.select(this).datum().className); })
				.style("stroke-width", 0);
	
		// d3.selectAll(".value")
		// 	.transition(t)
		// 		.style("opacity", );
	}
	
	
	///////////////////////////////////////////////////////////
	//// Helper Function //////////////////////////////////////
	///////////////////////////////////////////////////////////
	// Taken from http://bl.ocks.org/mbostock/7555321
	// Wrap svg text
	function wrap(text, width) {
		text.each(function() {
			let text = d3.select(this),
					words = text.text().split(/\s+/).reverse(),
					word,
					line = [],
					lineNumber = 0,
					lineHeight = 1.4, // ems
					y = text.attr("y"),
					x = text.attr("x"),
					dy = parseFloat(text.attr("dy")),
					tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
	
			while (word = words.pop()) {
				line.push(word);
				tspan.text(line.join(" "));
				if (tspan.node().getComputedTextLength() > width) {
					line.pop();
					tspan.text(line.join(" "));
					line = [word];
					tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
				}
			}
		});
	}
	
	// Turn className from data into lowercase words joined by hyphens
	function hyphenWords(words) {
		return words.toLowerCase().replace(/ /g, "-");
	}
	
	
	});
  }