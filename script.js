function indexOf(categories, categoryName){
	for(let i = 0; i < categories.length; i++){
		if(categories[i].name === categoryName){
			return i;
		}
	}
	return -1;
}

function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}

var categories = []; // "Traces" in the original example

var knowScores = [];
var loveScores = [];
var names = [];

// https://stackoverflow.com/a/34579496/5964489
readTextFile("example-input.json", function (text) {
	const data = JSON.parse(text);

	// Traverse all skills
	for (var i = 0; i < data.length; i++) {
		let category = data[i]["category"];
		let index = indexOf(categories, category);
		if (index < 0) {
			categories.push({
				x: [data[i]["know-score"]],
				y: [data[i]["love-score"]],
				mode: 'markers',
				type: 'scatter',
				name: category,
				text: [data[i]["name"]],
				marker: {size: 12}
			});

		}
		else {
			categories[index].x.push(data[i]["know-score"]);
			categories[index].y.push(data[i]["love-score"]);
			categories[index].text.push(data[i]["name"]);
		}
	}
});


let trace1 = {
	x: knowScores,
	y: loveScores,
	mode: 'markers',
	type: 'scatter',
	name: 'Team A',
	text: names,
	marker: {size: 12}
};

let trace2 = {
	x: [15, 25, 35, 45, 55],
	y: [40, 10, 70, 10, 40],
	mode: 'markers',
	type: 'scatter',
	name: 'Team B',
	text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
	marker: {size: 12}
};

let data = categories;

let layout = {
	xaxis: {
		range: [0, 100],
		title: "Know"
	},
	yaxis: {
		range: [0, 100],
		title: "Love"
	},
	title: 'Development Skills'
};

Plotly.newPlot('myDiv', data, layout);