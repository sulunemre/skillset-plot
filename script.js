var windowsHeight = window.screen.height;
var windowsWidth = window.screen.width;

var div = document.getElementsByClassName("plot-container plotly")[0];
console.log(div);
div.style.height = windowsHeight; 
div.style.width = windowsWidth; 

var country = ['Switzerland (2011)', 'Chile (2013)', 'Japan (2014)', 'United States (2012)', 'Slovenia (2014)', 'Canada (2011)', 'Poland (2010)', 'Estonia (2015)', 'Luxembourg (2013)', 'Portugal (2011)'];

var votingPop = [40, 45.7, 52, 53.6, 54.1, 54.2, 54.5, 54.7, 55.1, 56.6];

var regVoters = [49.1, 42, 52.7, 84.3, 51.7, 61.1, 55.3, 64.2, 91.1, 58.9];

class Skill{
	constructor(category, name, knowScore, loveScore){
		this.category = category;
		this.name = name;
		this.knowScore = knowScore;
		this.loveScore = loveScore;
	}
}
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
            }
        }
    }
    rawFile.send(null);
}

var trace1 = {
  type: 'scatter',
  x: votingPop,
  y: country,
  mode: 'markers',
  name: 'Percent of estimated voting age population',
  marker: {
    color: 'rgba(156, 165, 196, 0.95)',
    line: {
      color: 'rgba(156, 165, 196, 1.0)',
      width: 1,
    },
    symbol: 'circle',
    size: 16
  }
};

var trace2 = {
  x: regVoters,
  y: country,
  mode: 'markers',
  name: 'Percent of estimated registered voters',
  marker: {
    color: 'rgba(204, 204, 204, 0.95)',
    line: {
      color: 'rgba(217, 217, 217, 1.0)',
      width: 1,
    },
    symbol: 'circle',
    size: 16
  }
};

var data = [trace1];

var layout = {
  title: 'Skillset Plot',
  xaxis: {
    showgrid: false,
    showline: true,
    linecolor: 'rgb(102, 102, 102)',
    titlefont: {
      font: {
        color: 'rgb(204, 204, 204)'
      }
    },
    tickfont: {
      font: {
        color: 'rgb(102, 102, 102)'
      }
    },
    autotick: false,
    dtick: 10,
    ticks: 'outside',
    tickcolor: 'rgb(102, 102, 102)'
  },
  margin: {
    l: 140,
    r: 40,
    b: 50,
    t: 80
  },
  legend: {
    font: {
      size: 10,
    },
    yanchor: 'middle',
    xanchor: 'right'
  },
  width: 600,
  height: 400,
  paper_bgcolor: 'rgb(254, 247, 234)',
  plot_bgcolor: 'rgb(200, 247, 234)',
  hovermode: 'closest'
};
readTextFile("example-input.json");
Plotly.newPlot('myDiv', data, layout);
