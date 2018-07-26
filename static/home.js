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

      data.addRows(new_list);

      var options = {
        title: 'Your Energy Usage',
        titleTextStyle: {
          fontSize: 24,
          bold: true
        },
        hAxis: {
          title: 'Date',
          textStyle: {
            fontSize: 11,
          },
          titleTextStyle: {
            fontSize: 16,
            bold: true,
            italic: false
          }
        },
        vAxis: {
          textStyle: {
            fontSize: 12,
          },
          titleTextStyle: {
            fontSize: 16,
            bold: true,
            italic: false
          }
        },
        series: {
          0: {targetAxisIndex: 0},
          1: {targetAxisIndex: 1}
        },
        vAxes: {
          // Adds titles to each axis.
          0: {title: 'Amount'},
          1: {title: 'Cost'},
        },
        legend: { position: 'bottom' },
      };

      var chart = new google.visualization.LineChart(document.getElementById('data_chart'));
      chart.draw(data, options);
}

function loadData() {
  jQuery.get("/get_data", {}, (data) => {
    drawBackgroundColor(data)
  });
}

google.charts.setOnLoadCallback(loadData);

//add handlers

window.addEventListener("load", () =>{
  console.log('was setup')
  clickHandler()
  deleteHandler()
})

function clickHandler() {
  button = document.querySelector("#submit")
  button.addEventListener("click", () => {
    var date = document.querySelector("#goal_date").value
    var qty = document.querySelector("#goal_qty").value
    var cost = document.querySelector("#goal_cost").value
    if (date == "" || qty == "" || cost == "") {
      alert("Please fill out all of the values.")
    }
    else {
      var message = (`Successfully entered a goal for "${date}" with quanity ${qty} kWh and cost $${cost}.`)
      jQuery.post("/home", {goal_date: date, goal_qty: qty, goal_cost: cost}, (data) => {
        alert(message)
        window.location.replace("/home");
        });
    }
  })
}

function deleteHandler() {
  var buttons = document.querySelectorAll(".delete")
  console.log(buttons)
  buttons.forEach(function(button) {
    button.addEventListener("click", () => {
      console.log('was clicked')
      if (confirm("Are you sure?")) {
        window.location.replace("/home");
      }
    })
  })
}
