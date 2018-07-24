google.charts.load('current', {packages: ['corechart', 'line']});

function getDate(str) {
  // takes in a string representing a date and turns it into a dictionary
  // because json is stupid
  e = {}
  e['year'] = str.substring(0,4)
  e['month'] = str.substring(5,7)
  e['day'] = str.substring(8,10)
  return e
}

function drawBackgroundColor(list) {
      var data = new google.visualization.DataTable();
      data.addColumn('date', 'Date');
      data.addColumn('number', 'Amount');
      data.addColumn('number', 'Cost');

      var new_list = []
      for (var i = 0; i < list.length; i++) {
        var bill = list[i]
        date = getDate(bill['date'])
        new_list.push([new Date(date.year, date.month, date.day), bill.qty, bill.cost])
      }

      // data.addRows([
      //   [new Date(2000, 8, 5), 20, 120.00],
      //   [new Date(2000, 9, 5), 40, 140.00],
      //   [new Date(2000, 10, 5), 5, 20.00],
      //   [new Date(2000, 11, 5), 7, 34.00],
      //   [new Date(2000, 12, 5), 15, 100.00],
      //   [new Date(2001, 1, 5), 8, 50.00],
      //   [new Date(2001, 2, 5), 9, 70.00],
      //   [new Date(2001, 3, 5), 10.5, 90.00],
      // ]);

      data.addRows(new_list);

      var options = {
        title: 'Your Energy Usage',
        hAxis: {
          title: 'Date'
        },
        series: {
          0: {targetAxisIndex: 0},
          1: {targetAxisIndex: 1}
        },
        vAxes: {
          // Adds titles to each axis.
          0: {title: 'Amount'},
          1: {title: 'Cost'}
        },
        backgroundColor: '#e6ffff',
      };

      var chart = new google.visualization.LineChart(document.getElementById('data_chart'));
      chart.draw(data, options);
}

function loadData() {
  jQuery.get("/get_data", {}, (data) => {
    drawBackgroundColor(data)
  });
}

google.charts.setOnLoadCallback(() => {
  loadData()
});
