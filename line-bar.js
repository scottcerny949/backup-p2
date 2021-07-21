
// how do i get Robert's data pulled in here?

//d3.json("http://127.0.0.1:5000/data").then(function(data, err)   {
//console.log(data)
//console.log(data.AAPL)
//console.log(data.AAPL[0].Date)

//})

// should not be using the url anymore

// function to display the initial chart before user uses dropdown list
function init() {
  var startStock = "AAPL"
  buildLineBar(startStock);
}

//function to plot the chart
function buildLineBar(stock) {
  var apiKey = "cFwz-P45-QWqaBnWx8s9";

  var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;

  d3.json(url).then(function(data) {
    // Grab values from the response json object to build the plots
    var name = data.dataset.name;
    var stock = data.dataset.dataset_code;
    var startDate = data.dataset.start_date;
    var endDate = data.dataset.end_date;
    // Print the names of the columns
    console.log(data.dataset.column_names);
    // Print the data for each day
    console.log(data.dataset.data);
    var dates = data.dataset.data.map(row => row[0]);
    // console.log(dates);
    var closingPrices = data.dataset.data.map(row => row[4]);
    // console.log(closingPrices);
    var volume = data.dataset.data.map(row => row[5]);

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: closingPrices,
      yaxis: 'y2',
      line: {
        color: "DarkBlue"
      }
    };

    var trace2 = {
      type: "bar",
      name: name,
      x: dates,
      y: volume,
      marker: {
        color: "CornflowerBlue"
      }
    };

    var data = [trace1, trace2];

    var layout = {
      title: `${stock} Stock Price / Volume`,
      width: 1400,
      showlegend: false,
      xaxis: {
        range: [startDate, endDate],
        type: "date"
      },
      yaxis2: {
        title: 'Closing Price',
        autorange: true,
        overlaying: 'y',
      },
      yaxis: {
        title: 'Daily Volume',
        autorange: true,
        side: 'right'
      }
    };

    Plotly.newPlot("line-bar", data, layout);

  });
}

// this is for updating the chart based on user dropdown selection
d3.selectAll("#stockChoice").on("change", updatePlotly);

function updatePlotly() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#stockChoice");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");

    console.log(dataset);

  buildLineBar(dataset);

  Plotly.restyle("plot", "x", [x]);
  Plotly.restyle("plot", "y", [y]);
}

init();
