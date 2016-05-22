$(document).ready(function () {
    var crimeData;
    $.ajax({
        method: 'GET',
        url: 'http://elasticsearch.code4hr.org:33366/crime/crimes/_search',
        data: crimeData,
        dataType: 'json',
        success: function () {
            // 
        }
    });


    var randomScalingFactor = function () {
        return Math.round(Math.random() * 100)
    };
    
    var sharePiePolorDoughnutData = [
        {
            value: 120,
            color: '#455C73',
            highlight: '#34495E',
            label: 'Virginia Beach'
        },
        {
            value: 50,
            color: '#9B59B6',
            highlight: '#B370CF',
            label: 'Norfolk'
        },
        {
            value: 150,
            color: '#BDC3C7',
            highlight: '#CFD4D8',
            label: 'Portsmouth'
        },
        {
            value: 180,
            color: '#26B99A',
            highlight: '#36CAAB',
            label: 'Hampton'
        },
        {
            value: 100,
            color: '#3498DB',
            highlight: '#49A9EA',
            label: 'Chesapeak'
        }

    ];

    $(document).ready(function () {
        window.myPie = new Chart(document.getElementById('canvas_pie').getContext('2d')).Pie(sharePiePolorDoughnutData, {
            responsive: true,
            tooltipFillColor: 'rgba(51, 51, 51, 0.55)'
        });
    });



    var barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                fillColor: '#26B99A', //rgba(220,220,220,0.5)
                strokeColor: '#26B99A', //rgba(220,220,220,0.8)
                highlightFill: '#36CAAB', //rgba(220,220,220,0.75)
                highlightStroke: '#36CAAB', //rgba(220,220,220,1)
                data: [51, 30, 40, 28, 92, 50, 45]
            },
            {
                fillColor: '#03586A', //rgba(151,187,205,0.5)
                strokeColor: '#03586A', //rgba(151,187,205,0.8)
                highlightFill: '#066477', //rgba(151,187,205,0.75)
                highlightStroke: '#066477', //rgba(151,187,205,1)
                data: [41, 56, 25, 48, 72, 34, 12]
            }
        ],
    }

    $(document).ready(function () {
        new Chart($('#canvas_bar').get(0).getContext('2d')).Bar(barChartData, {
            tooltipFillColor: 'rgba(51, 51, 51, 0.55)',
            responsive: true,
            barDatasetSpacing: 6,
            barValueSpacing: 5
        });
    });


    var lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                fillColor: 'rgba(38, 185, 154, 0.31)', //rgba(220,220,220,0.2)
                strokeColor: 'rgba(38, 185, 154, 0.7)', //rgba(220,220,220,1)
                pointColor: 'rgba(38, 185, 154, 0.7)', //rgba(220,220,220,1)
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [31, 74, 6, 39, 20, 85, 7]
            },
            {
                label: 'My Second dataset',
                fillColor: 'rgba(3, 88, 106, 0.3)', //rgba(151,187,205,0.2)
                strokeColor: 'rgba(3, 88, 106, 0.70)', //rgba(151,187,205,1)
                pointColor: 'rgba(3, 88, 106, 0.70)', //rgba(151,187,205,1)
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: [82, 23, 66, 9, 99, 4, 2]
            }
        ]

    }

    $(document).ready(function () {
        new Chart(document.getElementById('canvas000').getContext('2d')).Line(lineChartData, {
            responsive: true,
            tooltipFillColor: 'rgba(51, 51, 51, 0.55)'
        });
    });

    var radarChartData = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                label: 'My First dataset',
                fillColor: 'rgba(3, 88, 106, 0.2)',
                strokeColor: 'rgba(3, 88, 106, 0.80)',
                pointColor: 'rgba(3, 88, 106, 0.80)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                fillColor: 'rgba(38, 185, 154, 0.2)',
                strokeColor: 'rgba(38, 185, 154, 0.85)',
                pointColor: 'rgba(38, 185, 154, 0.85)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    };

    $(document).ready(function () {
        window.myRadar = new Chart(document.getElementById('canvas_radar').getContext('2d')).Radar(radarChartData, {
            responsive: true,
            tooltipFillColor: 'rgba(51, 51, 51, 0.55)'
        });
    });

    var polarData = [
        {
            value: 300,
            color: '#F7464A',
            highlight: '#FF5A5E',
            label: 'Red'
        },
        {
            value: 50,
            color: '#46BFBD',
            highlight: '#5AD3D1',
            label: 'Green'
        },
        {
            value: 100,
            color: '#FDB45C',
            highlight: '#FFC870',
            label: 'Yellow'
        },
        {
            value: 40,
            color: '#949FB1',
            highlight: '#A8B3C5',
            label: 'Grey'
        },
        {
            value: 120,
            color: '#4D5360',
            highlight: '#616774',
            label: 'Dark Grey'
        }

    ];

    $(document).ready(function () {
        window.myPolarArea = new Chart(document.getElementById('canvas_area').getContext('2d')).PolarArea(sharePiePolorDoughnutData, {
            responsive: true,
            tooltipFillColor: 'rgba(51, 51, 51, 0.55)'
        });
    });


    $(document).ready(function () {
        window.myDoughnut = new Chart(document.getElementById('canvas_doughnut').getContext('2d')).Doughnut(sharePiePolorDoughnutData, {
            responsive: true,
            tooltipFillColor: 'rgba(51, 51, 51, 0.55)'
        });
    });


});
