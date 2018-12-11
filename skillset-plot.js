function indexOf(categories, categoryName) {
	for (let i = 0; i < categories.length; i++) {
		if (categories[i].name === categoryName) {
			return i;
		}
	}
	return -1;
}

function readTextFile(file, callback) {
	let rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4 && rawFile.status == "200" && callback) {
			callback(rawFile.responseText);
		}
	};
	rawFile.send(null);
}

let categories = []; // "Traces" in the original example

// https://stackoverflow.com/a/34579496/5964489
readTextFile("https://raw.githubusercontent.com/sulunemre/skillset-plot/master/example-input.json", function (text) {
	const data = JSON.parse(text);

	// Traverse all skills
	for (let i = 0; i < data.length; i++) {
		let categoryName = data[i]["category"];
		let index = indexOf(categories, categoryName);
		if (index < 0) {
			categories.push({
				x: [data[i]["know-score"]],
				y: [data[i]["love-score"]],
				mode: 'markers+text',
				hoverinfo: 'none', // disable hover info. example values: "y", "x+y", "all". default: "all".
				type: 'scatter',
				name: categoryName,
				text: [data[i]["name"]],
				textposition: [], // text position will be added later according to the skill's closeness to the bottom.
				marker: {size: 12}
			});
			index = indexOf(categories, categoryName);
		}
		else {
			categories[index].x.push(data[i]["know-score"]);
			categories[index].y.push(data[i]["love-score"]);
			categories[index].text.push(data[i]["name"]);
		}
		//setting the position of the text according to its closeness to x axis.
		if(data[i]["love-score"] < 10){
			categories[index].textposition.push('top center');
		} else{
			categories[index].textposition.push('bottom center');
		}
	}
	draw();
});
// 
let data = categories;
let layout = {
	hoverinfo: 'none',
	xaxis: {
		range: [-5, 105],
		title: "Know",
		fixedrange: true // disable zooming for x axis
	},
	yaxis: {
		range: [-5, 105],
		title: "Love",
		fixedrange: true // disable zooming for x axis
	},
	title: 'Development Skills'
};

function draw() {
	Plotly.newPlot('myDiv', data, layout, {displayModeBar: false});
	// code below resolves the problem that displays "Aa" under each legend(the ones at the right) point.
	let aas = document.getElementsByClassName("pointtext");
	for(let i = 0; i < aas.length; i++){
		aas[i].style = "visibility: hidden;";
	}
}
