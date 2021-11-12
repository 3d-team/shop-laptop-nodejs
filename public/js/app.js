$(document).foundation();

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(drawChartSales);
google.charts.setOnLoadCallback(CartCompletion);
google.charts.setOnLoadCallback(GenderDreakdown);
google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawRevenue);

function drawPieChart(){
  var data = google.visualization.arrayToDataTable([
    ['Cat', 'Quantity Sold'],
    ['Mac',     11],
    ['Asus',      2],
    ['Dell',  2],
    ['MSI', 2],
    ['Lenovo',    7]
  ]);

  var options = {
    title: 'Tỷ lệ thương hiệu được chọn mua'
  };

  var chart = new google.visualization.PieChart(document.getElementById('chtCategoryRate'));

  chart.draw(data, options);
}
function drawRevenue(){
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses', 'Profit'],
    ['2014', 1000, 400, 200],
    ['2015', 1170, 460, 250],
    ['2016', 660, 1120, 300],
    ['2017', 1030, 540, 350]
  ]);

  var options = {
    chart: {
      title: 'Company Performance'
    }
  };

  var chart = new google.charts.Bar(document.getElementById('chtRevenueYear'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
}
function drawChartSales() {
    var data = google.visualization.arrayToDataTable([
      ['Day', 'Sales', 'Cost'],
      ['Mon', 10, 7.6],
      ['Tues', 70, 50],
      ['Wed', 100, 60],
      ['Thurs', 50, 45],
      ['Fri', 30, 10],
      ['Sat', 120, 100],
      ['Sun', 200, 140]
    ]);

    var options = {
        title: '',
        legend: { position: 'none' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chtSalesThisWeek'));

    chart.draw(data, options);
}
function CartCompletion() {
    var data = google.visualization.arrayToDataTable([
      ['Day', 'Completion'],
      ['Mon', 28.7],
      ['Tues', 28.5],
      ['Wed', 28.9],
      ['Thurs', 29.1],
      ['Fri', 29.5],
      ['Sat', 29.8],
      ['Sun', 30.1]
    ]);

    var options = {
        title: '',
        legend: { position: 'none' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chtCompletionRate'));

    chart.draw(data, options);
}
function GenderDreakdown() {
    var data = google.visualization.arrayToDataTable([
      ['Gender', 'Revenue'],
      ['Male', 2900],
      ['Female', 1100]
    ]);

    var options = {
        title: '',
        is3D: true,
        legend: { position: 'none' }
    };

    var chart = new google.visualization.PieChart(document.getElementById('chtGenderBreakdown'));
    chart.draw(data, options);
}


