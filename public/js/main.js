$(document).ready(function () {
    // School rating by enrollment
    $(document).ready(function () {
        var ratingByEnrollment;

        // Gather aggregates from Hercules
        $.ajax({
            method: 'GET',
            url: 'http://hercules.code4hr.org/schools?groupBy=enrollment&averageField=gsRating',
            data: ratingByEnrollment,
            crossDomain: true,
            dataType: 'jsonp',
            success: function (ratingByEnrollment) {
                var dataForChart = [];
                ratingByEnrollment = ratingByEnrollment.data;
                // Create data array for chart
                for(var i = 0; i <= ratingByEnrollment.length; i++) {
                    for(key in ratingByEnrollment[i]) {
                        dataForChart.push({x: Number(ratingByEnrollment[i][key]), y: Number(key), r: 3});
                    }
                }

                var data = {
                    datasets: [
                        {
                            label: 'School Rating By Enrollment',
                            data: dataForChart,
                            backgroundColor: '#7715F7',
                            hoverBackgroundColor: '#7715F7',
                        }
                    ]
                };

                var options = {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Students Enrolled'
                            },
                            ticks: {
                                stepSize: 250
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Average Rating'
                            }
                        }]
                    }
                }

                new Chart($('#schoolRatingByEnrollment'), {
                    type: 'bubble',
                    data: data,
                    options: options
                });
            }
        });
    });

    // School rating by city
    $(document).ready(function () {
        var ratingByCity;

        // Gather aggregates from Hercules
        $.ajax({
            method: 'GET',
            url: 'http://hercules.code4hr.org/schools?groupBy=city&averageField=gsRating',
            data: ratingByCity,
            crossDomain: true,
            dataType: 'jsonp',
            success: function (ratingByCity) {
                var labelsForChart = [];
                var dataForChart = [];
                ratingByCity = ratingByCity.data;
                for(var i = 0; i <= ratingByCity.length; i++) {
                    // Create data and labels for chart
                    for(key in ratingByCity[i]) {
                        dataForChart.push(Number(ratingByCity[i][key]).toFixed(3));
                        labelsForChart.push(key);
                    }
                }

                var data = {
                    datasets: [
                        {
                            label: 'School Rating By City',
                            backgroundColor: 'rgba(8, 95, 97, 0.3)',
                            borderColor: 'rgba(8, 95, 97, 0.5)',
                            pointBackgroundColor: '#085F61',
                            pointBorderColor: '#085F61',
                            data: dataForChart
                        }
                    ],
                    labels: labelsForChart,
                };

                var options = {
                    scale: {
                        ticks: {
                            min: 0,
                            max: 7,
                            stepSize: 1
                        }
                    }
                };

                new Chart($('#schoolRatingByCity'), {
                    type: 'radar',
                    data: data,
                    options: options
                });
            }
        });
    });

    // Population by age
    $(document).ready(function () {
        var populationByAge = {
            labels: ['Under 14', '15 to 29', '30 to 44', '45 to 59', '60 to 74', '75 and Over'],
            datasets: [
                {
                    data: [323533, 395871, 320429, 350098, 190527, 85852],
                    backgroundColor: ['#6EC9AC', '#7715F7', '#316BBF', '#778899', '#085F61', '#0F9CE5'],
                    hoverBackgroundColor: ['#d6dbe0', '#d6dbe0', '#d6dbe0', '#d6dbe0', '#d6dbe0', '#d6dbe0']
                }
            ]
        };

        new Chart($('#populationByAge'), {
            type: 'doughnut',
            data: populationByAge
        })
    });

    // Population by race
    $(document).ready(function () {
        var populationByRace = {
            labels: ['White', 'Black', 'Asian', 'Multiple Races', 'Other', 'American Indian', 'Pacific Islander'],
            datasets: [
                {
                    backgroundColor: '#316BBF',
                    data: [982511, 532025, 57948, 57205, 27772, 6790, 2059]
                }
            ]
        };

        new Chart($('#populationByRace'), {
            type: 'horizontalBar',
            data: populationByRace
        })
    });

    // Crimes by severity
    $(document).ready(function () {
        var crimesBySeverity = {
            labels: ['Felony', 'Misdemeanor', 'Report', 'Citation'],
            datasets: [
                {
                    backgroundColor: '#26B99A',
                    data: [171, 75, 26, 1],
                }
            ]
        };

        new Chart($('#crimeBySeverity'), {
            type: 'bar',
            data: crimesBySeverity
        })
    });

    // Crimes by type
    $(document).ready(function () {
        var crimeByType = {
            labels: ['Theft', 'Property Crime', 'Assault', 'Breaking and Entering', 'Robbery', 'Theft of Vehicle', 'Assault with Deadly Weapon'],
            datasets: [
                {
                    data: [154, 42, 31, 17, 15, 13, 1],
                    backgroundColor: ['#6EC9AC', '#7715F7', '#316BBF', '#778899', '#085F61', '#0F9CE5', '#47515b'],
                    hoverBackgroundColor: ['#d6dbe0', '#d6dbe0', '#d6dbe0', '#d6dbe0', '#d6dbe0', '#d6dbe0', '#d6dbe0']
                }
            ]
        };

        new Chart($('#crimeByType'), {
            type: 'pie',
            data: crimeByType
        })
    });

});
