google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBackgroundColor);

function drawBackgroundColor() {
      var data = new google.visualization.DataTable();
      data.addColumn('date', 'Date');
      data.addColumn('number', 'Amount');
      data.addColumn('number', 'Cost');

      data.addRows([
        [new Date(2000, 8, 5), 20, 120.00],
        [new Date(2000, 9, 5), 40, 140.00],
        [new Date(2000, 10, 5), 5, 20.00],
        [new Date(2000, 11, 5), 7, 34.00],
        [new Date(2000, 12, 5), 15, 100.00],
        [new Date(2001, 1, 5), 8, 50.00],
        [new Date(2001, 2, 5), 9, 70.00],
        [new Date(2001, 3, 5), 10.5, 90.00],
      ]);

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
        backgroundColor: '#f1f8e9',
        // vAxis: {
        //   viewWindow: {
        //     max: 150
        //   }
        // }
      };

      var chart = new google.visualization.LineChart(document.getElementById('data_chart'));
      chart.draw(data, options);
}
