// // // let moodColor; // Declare moodColor variable outside of the drawChart function

// // // document.addEventListener("DOMContentLoaded", function () {
// // //   d3.csv("./data/transposed_data_musicMood.csv", d3.autoType).then((data) => {
// // //     if (!data || data.length === 0) {
// // //       console.error("Data is empty or undefined");
// // //       return;
// // //     }
// // //     const processedData = preprocessData(data);
// // //     const dates = data.columns.slice(1);
// // //     createChart(processedData, dates);
// // //   });
// // // });

// // // function preprocessData(data) {
// // //   let moodData = data.filter(
// // //     (d) => d.index === "Mood_1" || d.index === "Mood_2"
// // //   );
// // //   let chartData = data.filter(
// // //     (d) => d.index !== "Mood_1" && d.index !== "Mood_2"
// // //   );

// // //   return {
// // //     chartData: chartData.map((d) => ({
// // //       index: d["index"],
// // //       values: data.columns.slice(1).map((y) => d[y]),
// // //     })),
// // //     moodData,
// // //   };
// // // }

// // // const moodColorScale = d3
// // //   .scaleOrdinal()
// // //   .domain([1, 2, 3, 4, 5])
// // //   .range(["#ffcccb", "#fdae61", "#fee08b", "#66c2a5", "#3288bd"]);

// // // function createChart(processedData, dates) {
// // //   const chartData = processedData.chartData;
// // //   const moodData = processedData.moodData;
// // //   const width = 1024,
// // //     height = 768;
// // //   let currentDateIndex = 0;

// // //   const svg = d3
// // //     .select("body")
// // //     .append("svg")
// // //     .attr("viewBox", [0, 0, width, height]);

// // //   const sliderContainer = d3
// // //     .select("body")
// // //     .append("div")
// // //     .attr("class", "slider-container");

// // //   const slider = sliderContainer
// // //     .append("input")
// // //     .attr("type", "range")
// // //     .attr("min", 0)
// // //     .attr("max", dates.length - 1)
// // //     .attr("value", currentDateIndex)
// // //     .on("input", function () {
// // //       currentDateIndex = this.value;
// // //       drawChart(
// // //         svg,
// // //         chartData,
// // //         moodData,
// // //         currentDateIndex,
// // //         width,
// // //         height,
// // //         dates
// // //       );
// // //       updateDateLabel(dates[currentDateIndex]);
// // //     });

// // //   const dateLabel = sliderContainer.append("div").attr("class", "date-label");

// // //   drawChart(svg, chartData, moodData, currentDateIndex, width, height, dates);
// // // }

// // // function updateDateLabel(dateString) {
// // //   const formattedDate = formatDate(dateString);
// // //   d3.select(".date-label").text(formattedDate);
// // // }

// // // function formatDate(dateString) {
// // //   const date = new Date(dateString);
// // //   return date.toLocaleDateString("en-us", {
// // //     weekday: "long",
// // //     year: "numeric",
// // //     month: "short",
// // //     day: "numeric",
// // //   });
// // // }

// // // function drawChart(
// // //   svg,
// // //   chartData,
// // //   moodData,
// // //   currentDateIndex,
// // //   width,
// // //   height,
// // //   dates
// // // ) {
// // //   svg.selectAll("*").remove();

// // //   const moodValue1 = moodData.find((d) => d.index === "Mood_1").values[
// // //     currentDateIndex
// // //   ];
// // //   const moodValue2 = moodData.find((d) => d.index === "Mood_2").values[
// // //     currentDateIndex
// // //   ];
// // //   const averageMood = (moodValue1 + moodValue2) / 2;
// // //   moodColor = moodColorScale(averageMood); // Assign value to moodColor

// // //   const defs = svg.append("defs");
// // //   const radialGradient = defs
// // //     .append("radialGradient")
// // //     .attr("id", "radial-gradient")
// // //     .attr("cx", "50%")
// // //     .attr("cy", "50%")
// // //     .attr("r", "50%");
// // //   radialGradient
// // //     .append("stop")
// // //     .attr("offset", "0%")
// // //     .attr("stop-color", moodColor);
// // //   radialGradient
// // //     .append("stop")
// // //     .attr("offset", "100%")
// // //     .attr("stop-color", moodColor)
// // //     .attr("stop-opacity", 0);

// // //   const innerRadius = 100;
// // //   svg
// // //     .append("circle")
// // //     .attr("id", "inner-circle")
// // //     .attr("cx", width / 2)
// // //     .attr("cy", height / 2)
// // //     .attr("r", innerRadius)
// // //     .attr("fill", "url(#radial-gradient)");

// // //   const maxValue = d3.max(chartData, (d) => d3.max(d.values));
// // //   const x = d3
// // //     .scaleLinear()
// // //     .domain([0, maxValue])
// // //     .range([0, 2 * Math.PI]);
// // //   const color = d3
// // //     .scaleOrdinal(d3.schemeTableau10)
// // //     .domain(chartData.map((d) => d.index));
// // //   const barWidth = 20,
// // //     barPadding = 10;
// // //   const numOfBars = chartData.length;
// // //   const maxRadius = innerRadius + (barWidth + barPadding) * numOfBars;

// // //   drawRadialBars(
// // //     svg,
// // //     chartData,
// // //     currentDateIndex,
// // //     x,
// // //     color,
// // //     innerRadius,
// // //     barWidth,
// // //     barPadding,
// // //     width,
// // //     height
// // //   );
// // //   drawAxis(svg, x, innerRadius, maxRadius, numOfBars, width, height);
// // //   drawLabels(svg, chartData, innerRadius, barWidth, barPadding, width, height);
// // // }

// // // function drawRadialBars(
// // //   svg,
// // //   chartData,
// // //   currentDateIndex,
// // //   x,
// // //   color,
// // //   innerRadius,
// // //   barWidth,
// // //   barPadding,
// // //   width,
// // //   height
// // // ) {
// // //   chartData.forEach((d, i) => {
// // //     const arcGenerator = d3
// // //       .arc()
// // //       .innerRadius(innerRadius + i * (barWidth + barPadding))
// // //       .outerRadius(innerRadius + (i + 1) * barWidth + i * barPadding)
// // //       .startAngle(0)
// // //       .endAngle(x(d.values[currentDateIndex]));

// // //     svg
// // //       .append("path")
// // //       .attr("d", arcGenerator)
// // //       .attr("fill", color(d.index))
// // //       .attr("transform", `translate(${width / 2}, ${height / 2})`);
// // //   });
// // // }

// // // function drawAxis(svg, x, innerRadius, maxRadius, numOfBars, width, height) {
// // //   const ticks = x.ticks(10);
// // //   const tickArc = d3.arc().innerRadius(innerRadius).outerRadius(maxRadius);

// // //   svg
// // //     .selectAll(".axis")
// // //     .data(ticks)
// // //     .enter()
// // //     .append("path")
// // //     .attr("class", "axis")
// // //     .attr("d", (d) => tickArc({ startAngle: x(d), endAngle: x(d) }))
// // //     .attr("stroke", "grey")
// // //     .attr("transform", `translate(${width / 2}, ${height / 2})`);

// // //   svg
// // //     .selectAll(".axis-label")
// // //     .data(ticks)
// // //     .enter()
// // //     .append("text")
// // //     .attr("class", "axis-label")
// // //     .attr("x", (d) => Math.cos(x(d) - Math.PI / 2) * maxRadius)
// // //     .attr("y", (d) => Math.sin(x(d) - Math.PI / 2) * maxRadius)
// // //     .attr("dy", "0.35em")
// // //     .attr("text-anchor", "middle")
// // //     .text((d) => d)
// // //     .attr("transform", `translate(${width / 2}, ${height / 2})`);
// // // }

// // // function drawLabels(
// // //   svg,
// // //   chartData,
// // //   innerRadius,
// // //   barWidth,
// // //   barPadding,
// // //   width,
// // //   height
// // // ) {
// // //   chartData.forEach((d, i) => {
// // //     const angle = -Math.PI / 2; // Adjust angle here if needed
// // //     const radius = innerRadius + i * (barWidth + barPadding) + barWidth / 2;
// // //     const x = Math.cos(angle) * radius;
// // //     const y = Math.sin(angle) * radius;

// // //     svg
// // //       .append("text")
// // //       .attr("x", x)
// // //       .attr("y", y)
// // //       .attr("dy", "0.35em")
// // //       .attr("text-anchor", "middle")
// // //       .text(d.index)
// // //       .attr("transform", `translate(${width / 2}, ${height / 2})`);
// // //   });
// // // }
// // let moodColor; // Declare moodColor variable outside of the drawChart function

// // document.addEventListener("DOMContentLoaded", function () {
// //   d3.csv("./data/transposed_data_musicMood.csv", d3.autoType).then((data) => {
// //     if (!data || data.length === 0) {
// //       console.error("Data is empty or undefined");
// //       return;
// //     }
// //     const processedData = preprocessData(data);
// //     const dates = data.columns.slice(1);
// //     createChart(processedData, dates);
// //   });
// // });

// // function preprocessData(data) {
// //   let moodData = data
// //     .filter((d) => d.index === "Mood_1" || d.index === "Mood_2")
// //     .map((d) => ({
// //       index: d.index,
// //       values: Object.values(d).slice(1), // Extract values starting from the second property
// //     }));

// //   let chartData = data.filter(
// //     (d) => d.index !== "Mood_1" && d.index !== "Mood_2"
// //   );

// //   console.log(moodData); // Check moodData

// //   return {
// //     chartData: chartData.map((d) => ({
// //       index: d["index"],
// //       values: data.columns.slice(1).map((y) => d[y]),
// //     })),
// //     moodData,
// //   };
// // }

// // const moodColorScale = d3
// //   .scaleOrdinal()
// //   .domain([1, 2, 3, 4, 5])
// //   .range(["#ffcccb", "#fdae61", "#fee08b", "#66c2a5", "#3288bd"]);

// // function createChart(processedData, dates) {
// //   const chartData = processedData.chartData;
// //   const moodData = processedData.moodData;
// //   const width = 1024,
// //     height = 768;
// //   let currentDateIndex = 0;

// //   const svg = d3
// //     .select("body")
// //     .append("svg")
// //     .attr("viewBox", [0, 0, width, height]);

// //   const sliderContainer = d3
// //     .select("body")
// //     .append("div")
// //     .attr("class", "slider-container");

// //   const slider = sliderContainer
// //     .append("input")
// //     .attr("type", "range")
// //     .attr("min", 0)
// //     .attr("max", dates.length - 1)
// //     .attr("value", currentDateIndex)
// //     .on("input", function () {
// //       currentDateIndex = this.value;
// //       drawChart(
// //         svg,
// //         chartData,
// //         moodData,
// //         currentDateIndex,
// //         width,
// //         height,
// //         dates
// //       );
// //       updateDateLabel(dates[currentDateIndex]);
// //     });

// //   const dateLabel = sliderContainer.append("div").attr("class", "date-label");

// //   drawChart(svg, chartData, moodData, currentDateIndex, width, height, dates);
// // }

// // function updateDateLabel(dateString) {
// //   const formattedDate = formatDate(dateString);
// //   d3.select(".date-label").text(formattedDate);
// // }

// // function formatDate(dateString) {
// //   const date = new Date(dateString);
// //   return date.toLocaleDateString("en-us", {
// //     weekday: "long",
// //     year: "numeric",
// //     month: "short",
// //     day: "numeric",
// //   });
// // }

// // function drawChart(
// //   svg,
// //   chartData,
// //   moodData,
// //   currentDateIndex,
// //   width,
// //   height,
// //   dates
// // ) {
// //   svg.selectAll("*").remove();

// //   const moodValue1 = moodData.find((d) => d.index === "Mood_1").values[
// //     currentDateIndex
// //   ];
// //   const moodValue2 = moodData.find((d) => d.index === "Mood_2").values[
// //     currentDateIndex
// //   ];
// //   const averageMood = (moodValue1 + moodValue2) / 2;
// //   moodColor = moodColorScale(averageMood); // Assign value to moodColor

// //   const defs = svg.append("defs");
// //   // Create the legend gradient
// //   const legendGradient = defs
// //     .append("linearGradient")
// //     .attr("id", "legend-gradient")
// //     .attr("x1", "0%")
// //     .attr("y1", "0%")
// //     .attr("x2", "100%")
// //     .attr("y2", "0%");
// //   legendGradient
// //     .selectAll("stop")
// //     .data(moodColorScale.range().reverse()) // Reverse the range to invert the order
// //     .enter()
// //     .append("stop")
// //     .attr("offset", function (d, i) {
// //       return (i / (moodColorScale.range().length - 1)) * 100 + "%";
// //     })
// //     .attr("stop-color", function (d) {
// //       return d;
// //     });

// //   const radialGradient = defs
// //     .append("radialGradient")
// //     .attr("id", "radial-gradient")
// //     .attr("cx", "50%")
// //     .attr("cy", "50%")
// //     .attr("r", "50%");
// //   radialGradient
// //     .append("stop")
// //     .attr("offset", "0%")
// //     .attr("stop-color", moodColor);
// //   radialGradient
// //     .append("stop")
// //     .attr("offset", "100%")
// //     .attr("stop-color", moodColor)
// //     .attr("stop-opacity", 0);

// //   const innerRadius = 100;
// //   svg
// //     .append("circle")
// //     .attr("id", "inner-circle")
// //     .attr("cx", width / 2)
// //     .attr("cy", height / 2)
// //     .attr("r", innerRadius)
// //     .attr("fill", "url(#radial-gradient)");

// //   const maxValue = d3.max(chartData, (d) => d3.max(d.values));
// //   const x = d3
// //     .scaleLinear()
// //     .domain([0, maxValue])
// //     .range([0, 2 * Math.PI]);
// //   const color = d3
// //     .scaleOrdinal(d3.schemeTableau10)
// //     .domain(chartData.map((d) => d.index));
// //   const barWidth = 20,
// //     barPadding = 10;
// //   const numOfBars = chartData.length;
// //   const maxRadius = innerRadius + (barWidth + barPadding) * numOfBars;

// //   drawRadialBars(
// //     svg,
// //     chartData,
// //     currentDateIndex,
// //     x,
// //     color,
// //     innerRadius,
// //     barWidth,
// //     barPadding,
// //     width,
// //     height
// //   );
// //   drawAxis(svg, x, innerRadius, maxRadius, numOfBars, width, height);
// //   drawLabels(svg, chartData, innerRadius, barWidth, barPadding, width, height);

// //   //   // Add legend
// //   //   const legend = svg
// //   //     .append("g")
// //   //     .attr("class", "legend")
// //   //     .attr("transform", `translate(${width / 2 + 300},${height - 40})`); // Move legend to the right

// //   //   legend
// //   //     .selectAll("rect")
// //   //     .data(moodColorScale.range().reverse()) // Reverse the range to match the gradient
// //   //     .enter()
// //   //     .append("rect")
// //   //     .attr("x", (d, i) => i * 30)
// //   //     .attr("width", 30)
// //   //     .attr("height", 20)
// //   //     .style("fill", (d) => d);

// //   //   legend
// //   //     .selectAll("text")
// //   //     .data(moodColorScale.domain().reverse()) // Reverse the domain to match the gradient
// //   //     .enter()
// //   //     .append("text")
// //   //     .attr("x", (d, i) => i * 30 + 10)
// //   //     .attr("y", 35)
// //   //     .text((d) => d);
// //   // }
// //   // Add legend
// //   const legend = svg
// //     .append("g")
// //     .attr("class", "legend")
// //     .attr("transform", `translate(${width / 2 + 300},${height - 40})`); // Move legend to the right

// //   // Create a filter for the gradient/blur effect
// //   const filter = legend
// //     .append("filter")
// //     .attr("id", "legend-filter")
// //     .append("feGaussianBlur")
// //     .attr("stdDeviation", 5);

// //   // Append circles with gradient/blur effect
// //   legend
// //     .selectAll("circle")
// //     .data(moodColorScale.range().reverse()) // Reverse the range to match the gradient
// //     .enter()
// //     .append("circle")
// //     .attr("cx", (d, i) => i * 30 + 15)
// //     .attr("cy", 10)
// //     .attr("r", 10)
// //     .style("fill", (d) => d)
// //     .style("filter", "url(#legend-filter)"); // Apply the filter to the circles

// //   // Append text labels
// //   legend
// //     .selectAll("text")
// //     .data(moodColorScale.domain().reverse()) // Reverse the domain to match the gradient
// //     .enter()
// //     .append("text")
// //     .attr("x", (d, i) => i * 30 + 25)
// //     .attr("y", 35)
// //     .text((d) => d);
// // }
// // function drawRadialBars(
// //   svg,
// //   chartData,
// //   currentDateIndex,
// //   x,
// //   color,
// //   innerRadius,
// //   barWidth,
// //   barPadding,
// //   width,
// //   height
// // ) {
// //   chartData.forEach((d, i) => {
// //     const arcGenerator = d3
// //       .arc()
// //       .innerRadius(innerRadius + i * (barWidth + barPadding))
// //       .outerRadius(innerRadius + (i + 1) * barWidth + i * barPadding)
// //       .startAngle(0)
// //       .endAngle(x(d.values[currentDateIndex]));

// //     svg
// //       .append("path")
// //       .attr("d", arcGenerator)
// //       .attr("fill", color(d.index))
// //       .attr("transform", `translate(${width / 2}, ${height / 2})`);
// //   });
// // }

// // function drawAxis(svg, x, innerRadius, maxRadius, numOfBars, width, height) {
// //   const ticks = x.ticks(10);
// //   const tickArc = d3.arc().innerRadius(innerRadius).outerRadius(maxRadius);

// //   svg
// //     .selectAll(".axis")
// //     .data(ticks)
// //     .enter()
// //     .append("path")
// //     .attr("class", "axis")
// //     .attr("d", (d) => tickArc({ startAngle: x(d), endAngle: x(d) }))
// //     .attr("stroke", "lightgrey")
// //     .attr("transform", `translate(${width / 2}, ${height / 2})`);

// //   svg
// //     .selectAll(".axis-label")
// //     .data(ticks)
// //     .enter()
// //     .append("text")
// //     .attr("class", "axis-label")
// //     .attr("x", (d) => Math.cos(x(d) - Math.PI / 2) * maxRadius)
// //     .attr("y", (d) => Math.sin(x(d) - Math.PI / 2) * maxRadius)
// //     .attr("dy", "0.35em")
// //     .attr("text-anchor", "middle")
// //     .text((d) => d)
// //     .attr("transform", `translate(${width / 2}, ${height / 2})`);
// // }

// // function drawLabels(
// //   svg,
// //   chartData,
// //   innerRadius,
// //   barWidth,
// //   barPadding,
// //   width,
// //   height
// // ) {
// //   chartData.forEach((d, i) => {
// //     const angle = -Math.PI / 2; // Adjust angle here if needed
// //     const radius = innerRadius + i * (barWidth + barPadding) + barWidth / 2;
// //     const x = Math.cos(angle) * radius;
// //     const y = Math.sin(angle) * radius;

// //     svg
// //       .append("text")
// //       .attr("x", x)
// //       .attr("y", y)
// //       .attr("dy", "0.35em")
// //       .attr("text-anchor", "middle")
// //       .text(d.index)
// //       .attr("transform", `translate(${width / 2}, ${height / 2})`);
// //   });
// // }
// let moodColor; // Declare moodColor variable outside of the drawChart function

// document.addEventListener("DOMContentLoaded", function () {
//   d3.csv("./data/transposed_data_musicMood.csv", d3.autoType).then((data) => {
//     if (!data || data.length === 0) {
//       console.error("Data is empty or undefined");
//       return;
//     }
//     const processedData = preprocessData(data);
//     const dates = data.columns.slice(1);
//     createChart(processedData, dates);
//   });
// });

// function preprocessData(data) {
//   let moodData = data
//     .filter((d) => d.index === "Mood_1" || d.index === "Mood_2")
//     .map((d) => ({
//       index: d.index,
//       values: Object.values(d).slice(1), // Extract values starting from the second property
//     }));

//   let chartData = data.filter(
//     (d) => d.index !== "Mood_1" && d.index !== "Mood_2"
//   );

//   return {
//     chartData: chartData.map((d) => ({
//       index: d["index"],
//       values: data.columns.slice(1).map((y) => d[y]),
//     })),
//     moodData,
//   };
// }

// const moodColorScale = d3
//   .scaleOrdinal()
//   .domain([1, 2, 3, 4, 5])
//   .range(["#ffcccb", "#fdae61", "#fee08b", "#66c2a5", "#3288bd"]);

// const legendScale = d3.scaleLinear().domain([1, 5]).range([0, 1]); // Continuous scale for legend

// function createChart(processedData, dates) {
//   const chartData = processedData.chartData;
//   const moodData = processedData.moodData;
//   const width = 1024,
//     height = 768;
//   let currentDateIndex = 0;

//   const svg = d3
//     .select("body")
//     .append("svg")
//     .attr("viewBox", [0, 0, width, height]);

//   const sliderContainer = d3
//     .select("body")
//     .append("div")
//     .attr("class", "slider-container");

//   const slider = sliderContainer
//     .append("input")
//     .attr("type", "range")
//     .attr("min", 0)
//     .attr("max", dates.length - 1)
//     .attr("value", currentDateIndex)
//     .on("input", function () {
//       currentDateIndex = this.value;
//       drawChart(
//         svg,
//         chartData,
//         moodData,
//         currentDateIndex,
//         width,
//         height,
//         dates
//       );
//       updateDateLabel(dates[currentDateIndex]);
//     });

//   const dateLabel = sliderContainer.append("div").attr("class", "date-label");

//   drawChart(svg, chartData, moodData, currentDateIndex, width, height, dates);

//   // Add legend
//   const legend = svg
//     .append("g")
//     .attr("class", "legend")
//     .attr("transform", `translate(${width / 2 + 300},${height - 40})`); // Move legend to the right

//   // Create a filter for the gradient/blur effect
//   const filter = legend
//     .append("filter")
//     .attr("id", "legend-filter")
//     .append("feGaussianBlur")
//     .attr("stdDeviation", 5);

//   // Append circles with gradient/blur effect
//   legend
//     .selectAll("circle")
//     .data([1, 2, 3, 4, 5]) // Use the legend scale domain
//     .enter()
//     .append("circle")
//     .attr("cx", (d, i) => i * 30 + 15)
//     .attr("cy", 10)
//     .attr("r", 10)
//     .style("fill", (d) => moodColorScale(d))
//     .style("filter", "url(#legend-filter)"); // Apply the filter to the circles

//   // Append text labels
//   legend
//     .selectAll("text")
//     .data([1, 2, 3, 4, 5]) // Use the legend scale domain
//     .enter()
//     .append("text")
//     .attr("x", (d, i) => i * 30 + 25)
//     .attr("y", 35)
//     .text((d) => d);
// }

// function updateDateLabel(dateString) {
//   const formattedDate = formatDate(dateString);
//   d3.select(".date-label").text(formattedDate);
// }

// function formatDate(dateString) {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-us", {
//     weekday: "long",
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// }

// function drawChart(
//   svg,
//   chartData,
//   moodData,
//   currentDateIndex,
//   width,
//   height,
//   dates
// ) {
//   svg.selectAll("*").remove();

//   const moodValue1 = moodData.find((d) => d.index === "Mood_1").values[
//     currentDateIndex
//   ];
//   const moodValue2 = moodData.find((d) => d.index === "Mood_2").values[
//     currentDateIndex
//   ];
//   const averageMood = (moodValue1 + moodValue2) / 2;
//   moodColor = moodColorScale(averageMood); // Assign value to moodColor

//   const defs = svg.append("defs");
//   const radialGradient = defs
//     .append("radialGradient")
//     .attr("id", "radial-gradient")
//     .attr("cx", "50%")
//     .attr("cy", "50%")
//     .attr("r", "50%");
//   radialGradient
//     .append("stop")
//     .attr("offset", "0%")
//     .attr("stop-color", moodColor);
//   radialGradient
//     .append("stop")
//     .attr("offset", "100%")
//     .attr("stop-color", moodColor)
//     .attr("stop-opacity", 0);

//   const innerRadius = 100;
//   svg
//     .append("circle")
//     .attr("id", "inner-circle")
//     .attr("cx", width / 2)
//     .attr("cy", height / 2)
//     .attr("r", innerRadius)
//     .attr("fill", "url(#radial-gradient)");

//   const maxValue = d3.max(chartData, (d) => d3.max(d.values));
//   const x = d3
//     .scaleLinear()
//     .domain([0, maxValue])
//     .range([0, 2 * Math.PI]);
//   const color = d3
//     .scaleOrdinal(d3.schemeTableau10)
//     .domain(chartData.map((d) => d.index));
//   const barWidth = 20,
//     barPadding = 10;
//   const numOfBars = chartData.length;
//   const maxRadius = innerRadius + (barWidth + barPadding) * numOfBars;

//   drawRadialBars(
//     svg,
//     chartData,
//     currentDateIndex,
//     x,
//     color,
//     innerRadius,
//     barWidth,
//     barPadding,
//     width,
//     height
//   );
//   drawAxis(svg, x, innerRadius, maxRadius, numOfBars, width, height);
//   drawLabels(svg, chartData, innerRadius, barWidth, barPadding, width, height);
// }

// function drawRadialBars(
//   svg,
//   chartData,
//   currentDateIndex,
//   x,
//   color,
//   innerRadius,
//   barWidth,
//   barPadding,
//   width,
//   height
// ) {
//   chartData.forEach((d, i) => {
//     const arcGenerator = d3
//       .arc()
//       .innerRadius(innerRadius + i * (barWidth + barPadding))
//       .outerRadius(innerRadius + (i + 1) * barWidth + i * barPadding)
//       .startAngle(0)
//       .endAngle(x(d.values[currentDateIndex]));

//     svg
//       .append("path")
//       .attr("d", arcGenerator)
//       .attr("fill", color(d.index))
//       .attr("transform", `translate(${width / 2}, ${height / 2})`);
//   });
// }

// function drawAxis(svg, x, innerRadius, maxRadius, numOfBars, width, height) {
//   const ticks = x.ticks(10);
//   const tickArc = d3.arc().innerRadius(innerRadius).outerRadius(maxRadius);

//   svg
//     .selectAll(".axis")
//     .data(ticks)
//     .enter()
//     .append("path")
//     .attr("class", "axis")
//     .attr("d", (d) => tickArc({ startAngle: x(d), endAngle: x(d) }))
//     .attr("stroke", "lightgrey")
//     .attr("transform", `translate(${width / 2}, ${height / 2})`);

//   svg
//     .selectAll(".axis-label")
//     .data(ticks)
//     .enter()
//     .append("text")
//     .attr("class", "axis-label")
//     .attr("x", (d) => Math.cos(x(d) - Math.PI / 2) * maxRadius)
//     .attr("y", (d) => Math.sin(x(d) - Math.PI / 2) * maxRadius)
//     .attr("dy", "0.35em")
//     .attr("text-anchor", "middle")
//     .text((d) => d)
//     .attr("transform", `translate(${width / 2}, ${height / 2})`);
// }

// function drawLabels(
//   svg,
//   chartData,
//   innerRadius,
//   barWidth,
//   barPadding,
//   width,
//   height
// ) {
//   chartData.forEach((d, i) => {
//     const angle = -Math.PI / 2; // Adjust angle here if needed
//     const radius = innerRadius + i * (barWidth + barPadding) + barWidth / 2;
//     const x = Math.cos(angle) * radius;
//     const y = Math.sin(angle) * radius;

//     svg
//       .append("text")
//       .attr("x", x)
//       .attr("y", y)
//       .attr("dy", "0.35em")
//       .attr("text-anchor", "middle")
//       .text(d.index)
//       .attr("transform", `translate(${width / 2}, ${height / 2})`);
//   });
// }
let moodColor; // Declare moodColor variable outside of the drawChart function
let svg;
let chartData;
let moodData;
let dates;
let currentDateIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  d3.csv("./data/transposed_data_musicMood.csv", d3.autoType).then((data) => {
    if (!data || data.length === 0) {
      console.error("Data is empty or undefined");
      return;
    }
    const processedData = preprocessData(data);
    dates = data.columns.slice(1);
    createChart(processedData);
    updateDateLabel(dates[currentDateIndex]);
  });
});

function preprocessData(data) {
  let moodData = data
    .filter((d) => d.index === "Mood_1" || d.index === "Mood_2")
    .map((d) => ({
      index: d.index,
      values: Object.values(d).slice(1), // Extract values starting from the second property
    }));

  let chartData = data.filter(
    (d) => d.index !== "Mood_1" && d.index !== "Mood_2"
  );

  return {
    chartData: chartData.map((d) => ({
      index: d["index"],
      values: data.columns.slice(1).map((y) => d[y]),
    })),
    moodData,
  };
}

// const moodColorScale = d3
//   .scaleOrdinal()
//   .domain([1,2.5,3,3.5,4,4.5,5])
//   //   .range(["#ffcccb", "#fdae61", "#fee08b", "#66c2a5", "#3288bd"]);
//   .range(["393B57", "#9C495D", "#E2894D", "#EEBB79", "#F7EBAB"]);

// const legendScale = d3.scaleLinear().domain([1, 5]).range([0, 1]); // Continuous scale for legend
// Define a linear scale for the colors
// const moodColorScale = d3
//   .scaleLinear()
//   .domain([1, 5])
//   .range(["#393B57", "#F7EBAB"]) // Blue to Yellow
//   .interpolate(d3.interpolateHcl); // Use HCL color space for smooth color transitions

// Alternatively, for more control over color steps:
const moodColorScale = d3
  .scaleLinear()
  .domain([1, 2.5, 3, 3.5, 4, 4.5, 5])
  //   .range(["#FEF652"])
  .range([
    "black",
    "#393B57",
    "#B4A4C2",
    // "B4A4C2",
    "#fdae61",
    "#fdbb7a",
    "#d9c789",
    "#FEF652",
  ])
  .interpolate(d3.interpolateHcl);
// Assuming SVG is already set up
const legendWidth = 300;
const legendHeight = 20;

// Create a gradient for the legend
const linearGradient = svg
  .append("defs")
  .append("linearGradient")
  .attr("id", "linear-gradient");

moodColorScale.range().forEach((color, i) => {
  linearGradient
    .append("stop")
    .attr("offset", i / (moodColorScale.range().length - 1))
    .attr("stop-color", color);
});

// Draw the legend bar
svg
  .append("rect")
  .attr("width", legendWidth)
  .attr("height", legendHeight)
  .style("fill", "url(#linear-gradient)");

// function createChart(processedData) {
//   chartData = processedData.chartData;
//   moodData = processedData.moodData;
//   const width = 1024,
//     height = 768;

//   svg = d3.select("body").append("svg").attr("viewBox", [0, 0, width, height]);

//   const sliderContainer = d3
//     .select("body")
//     .append("div")
//     .attr("class", "slider-container");

//   const slider = sliderContainer
//     .append("input")
//     .attr("type", "range")
//     .attr("min", 0)
//     .attr("max", dates.length - 1)
//     .attr("value", currentDateIndex)
//     .on("input", function () {
//       currentDateIndex = this.value;
//       updateChart(width, height);
//       updateDateLabel(dates[currentDateIndex]);
//     });

// //   const dateLabel = sliderContainer.append("div").attr("class", "date-label");

//   updateChart(width, height);
// }
function createChart(processedData) {
  chartData = processedData.chartData;
  moodData = processedData.moodData;
  const width = 1024,
    height = 768;

  svg = d3
    .select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const slider = d3
    .select("#date-slider")
    .attr("min", 0)
    .attr("max", dates.length - 1)
    .attr("value", currentDateIndex)
    .on("input", function () {
      currentDateIndex = this.value;
      updateChart(width, height);
      updateDateLabel(dates[currentDateIndex]);
    });

  updateChart(width, height); // Initial chart update
  updateDateLabel(dates[currentDateIndex]); // Initial date label update
}

function updateChart(width, height) {
  svg.selectAll("*").remove();

  const moodValue1 = moodData.find((d) => d.index === "Mood_1").values[
    currentDateIndex
  ];
  const moodValue2 = moodData.find((d) => d.index === "Mood_2").values[
    currentDateIndex
  ];
  const averageMood = (moodValue1 + moodValue2) / 2;
  moodColor = moodColorScale(averageMood); // Assign value to moodColor

  const defs = svg.append("defs");
  const radialGradient = defs
    .append("radialGradient")
    .attr("id", "radial-gradient")
    .attr("cx", "50%")
    .attr("cy", "50%")
    .attr("r", "50%");
  radialGradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", moodColor);
  radialGradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", moodColor)
    .attr("stop-opacity", 0);

  const innerRadius = 100;
  svg
    .append("circle")
    .attr("id", "inner-circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", innerRadius)
    .attr("fill", "url(#radial-gradient)");
  // Create a text element at the center of the circle
  const text = svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle") // Horizontally center align
    .style("font-size", "16px") // Adjust font size as needed
    .style("fill", "#ffffff"); // Adjust text color as needed

  // Append first line using tspan
  text
    .append("tspan")
    .attr("dy", "-0.2em") // Adjust vertical position as needed
    .attr("x", width / 2) // Align with the parent text element
    .text("Avg Mood (1-5)");

  // Append second line using tspan
  text
    .append("tspan")
    .attr("dy", "1.2em") // This moves the tspan to a new line
    .attr("x", width / 2) // Align with the parent text element
    .text(averageMood.toFixed(1))
    .style("font-size", "19px"); // Display the average mood score with 1 decimal place
  const maxValue = d3.max(chartData, (d) => d3.max(d.values));
  const x = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([0, 2 * Math.PI]);
  const color = d3
    .scaleOrdinal(d3.schemeTableau10)
    .domain(chartData.map((d) => d.index));
  const barWidth = 20,
    barPadding = 10;
  const numOfBars = chartData.length;
  const maxRadius = innerRadius + (barWidth + barPadding) * numOfBars;

  drawRadialBars(
    svg,
    chartData,
    currentDateIndex,
    x,
    color,
    innerRadius,
    barWidth,
    barPadding,
    width,
    height
  );
  drawAxis(svg, x, innerRadius, maxRadius, numOfBars, width, height);
  drawLabels(svg, chartData, innerRadius, barWidth, barPadding, width, height);

  //   drawLegend(svg, moodColorScale, width, height);
}

function updateDateLabel(dateString) {
  const formattedDate = formatDate(dateString);
  d3.select(".date-label").text(formattedDate);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function drawRadialBars(
  svg,
  chartData,
  currentDateIndex,
  x,
  color,
  innerRadius,
  barWidth,
  barPadding,
  width,
  height
) {
  chartData.forEach((d, i) => {
    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius + i * (barWidth + barPadding))
      .outerRadius(innerRadius + (i + 1) * barWidth + i * barPadding)
      .startAngle(0)
      .endAngle(x(d.values[currentDateIndex]));

    svg
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", color(d.index))
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  });
}

function drawAxis(svg, x, innerRadius, maxRadius, numOfBars, width, height) {
  const ticks = x.ticks(10);
  const tickArc = d3.arc().innerRadius(innerRadius).outerRadius(maxRadius);

  svg
    .selectAll(".axis")
    .data(ticks)
    .enter()
    .append("path")
    .attr("class", "axis")
    .attr("d", (d) => tickArc({ startAngle: x(d), endAngle: x(d) }))
    .attr("stroke", "lightgrey")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  svg
    .selectAll(".axis-label")
    .data(ticks)
    .enter()
    .append("text")
    .attr("class", "axis-label")
    .attr("x", (d) => Math.cos(x(d) - Math.PI / 2) * maxRadius)
    .attr("y", (d) => Math.sin(x(d) - Math.PI / 2) * maxRadius)
    .attr("dy", "0.2em")
    .attr("text-anchor", "middle")
    .text((d) => d)
    .attr("transform", `translate(${width / 2}, ${height / 2})`);
}
// After your axis is created and added to the SVG:
d3.selectAll(".axis-label") // Adjust the selector to match your y-axis ticks
  .each(function () {
    d3.select(this)
      .attr("transform", "translate(-30, 30)") // Adjust the translation values as needed
      .style("text-anchor", "middle");
  });

function drawLabels(
  svg,
  chartData,
  innerRadius,
  barWidth,
  barPadding,
  width,
  height
) {
  chartData.forEach((d, i) => {
    const angle = -Math.PI / 2; // Adjust angle here if needed
    const radius = innerRadius + i * (barWidth + barPadding) + barWidth / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    svg
      .append("text")
      .attr("x", x - 80)
      .attr("y", y)
      .attr("dy", "0.3em")
      .attr("text-anchor", "middle")
      .text(d.index)
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
    // Move Tick Values
    //     d3.selectAll(".y.axis .axis-label") // Adjust the selector to match your y-axis ticks
    //       .attr("dx", "-20px") // Moves the tick values left or right
    //       .attr("dy", "10px") // Moves the tick values up or down
    //       .style("text-anchor", "end"); // Adjusts the alignment of the tick values
  });
}

// function drawLegend(svg, colorScale, width, height) {
//   const legendWidth = 200;
//   const legendHeight = 20;
//   const legend = svg
//     .append("g")
//     .attr("class", "legend")
//     .attr(
//       "transform",
//       `translate(${width / 2 - legendWidth / 2},${height - 40})`
//     );

// Create a filter for the gradient/blur effect
const filter = legend
  .append("filter")
  .attr("id", "legend-filter")
  .append("feGaussianBlur")
  .attr("stdDeviation", 5);

// Append rects with gradient/blur effect
legend
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", legendWidth)
  .attr("height", legendHeight)
  .style("fill", "url(#legend-gradient)")
  .style("filter", "url(#legend-filter)");

// Append text labels
legend
  .selectAll("text")
  .data([1, 5]) // Use the domain of the legend scale
  .enter()
  .append("text")
  .attr("x", (d, i) => i * legendWidth)
  .attr("y", legendHeight + 10)
  .text((d) => d);
