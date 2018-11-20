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
readTextFile("example-input.json", function (text) {
	const data = JSON.parse(text);

	// Traverse all skills
	for (let i = 0; i < data.length; i++) {
		let categoryName = data[i]["category"];
		let index = indexOf(categories, categoryName);
		if (index < 0) {
			categories.push({
				x: [data[i]["know-score"]],
				y: [data[i]["love-score"]],
				mode: 'markers',
				type: 'scatter',
				name: categoryName,
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
	draw();
});

let data = categories;
let layout = {
	xaxis: {
		range: [-5, 105],
		title: "Know"
	},
	yaxis: {
		range: [-5, 105],
		title: "Love"
	},
	title: 'Development Skills'
};

function draw() {
	Plotly.newPlot('myDiv', data, layout);
}
