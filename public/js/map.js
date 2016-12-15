function initAutocomplete() {

    var map = null;
    var Datas = [];
    var bikeLayer = new google.maps.BicyclingLayer();
    var trafficLayer = new google.maps.TrafficLayer();
    var crimeheatmap, crimeData;
    var crimeHeatMapData = [];
    var schoolsData, schoolMarker, schoolRating;
    var schoolMarkers = [];
    var foodSanitationData, foodSanitationMarker;
    var foodSanitationMarkers = [];
    var foodSanitationImage = "../images/foodSanitationImage.png"

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
        resize();

        $(window).on('resize', function () {
            resize();
        });

        // TODO Still have to make this functionality work with the expansion of the
        // sub menu. Currently this runs before the sub menu expands... Have to 
        // figure out how to trigger this after the Bootstrap function.
        // $('.navbar-toggle').on('change', function() {
        //     resize();
        // });

        function initialize() {

            var styleArray = [
                {
                    'featureType': 'road.arterial',
                    'stylers': [
                        { 'hue': '#00ccff' }
                    ]
                },
                {
                    'stylers': [
                        { 'visibility': 'simplified' },
                        { 'hue': '#0099ff' },
                        { 'weight': 0.7 }
                    ]
                },
                {
                    'featureType': 'poi.school',
                    'stylers': [
                        { 'hue': '#cc00ff' }
                    ]
                },
            ];
            var mapOptions = {
                minZoom: 8,
                maxZoom: 20,
                zoom: 11,
                zoomControl: true,
                center: new google.maps.LatLng(36.9487874, -76.2121092),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: styleArray,
                mapTypeControl: false
            };
            map = new google.maps.Map(document.getElementById('map'),
                mapOptions);
            var pointArray = new google.maps.MVCArray(Datas);
            crimeheatmap = new google.maps.visualization.HeatmapLayer({
                data: pointArray,
                maxIntensity: 20,
                dissipating: true
            });
            crimeheatmap.setMap(map);
            google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
                var selection = getUrlParameter('selection');

                if (selection === 'crime') {
                    populateCrime();
                }
                if (selection === 'school') {
                    populateSchools();
                }
            });
        }
        google.maps.event.addDomListener(window, 'load', initialize);

        var infowindow = new google.maps.InfoWindow();

        $('#crimeIcon').on('click', function () {
            if ($('#crimeIcon').hasClass('selected')) {
                document.getElementById('crimeIcon').className = document.getElementById('crimeIcon').className.replace(/\b selected\b/, '');
                // Reset heat map data to empty and update the map to remove the data points
                crimeHeatMapData = [];
                crimeheatmap.set('data', crimeHeatMapData);
            } else {
                populateCrime();
            }
        });

        $('#schoolIcon').on('click', function () {
            // Since the icons look nearly identical, only allow the user to select either Food or School data
            if (document.getElementById('foodIcon').className.includes('selected')) {
                alert('Please deselect the Food icon to see school information.');
                return;
            }

            if ($('#schoolIcon').hasClass('selected')) {
                document.getElementById('schoolIcon').className = document.getElementById('schoolIcon').className.replace(/\b selected\b/, '');
                removeSchoolDataMarkers();
            } else {
                populateSchools();
            }
        });

        $('#foodIcon').on('click', function () {
            // Since the icons look nearly identical, only allow the user to select either Food or School data
            if (document.getElementById('schoolIcon').className.includes('selected')) {
                alert('Please deselect the School icon to see food information.');
                return;
            }

            if ($('#foodIcon').hasClass('selected')) {
                document.getElementById('foodIcon').className = document.getElementById('foodIcon').className.replace(/\b selected\b/, '');
                removeFoodSanitationData();
            } else {
                document.getElementById('foodIcon').className += ' selected';
                addFoodSanitationData();
            }
        });

        $('#housingIcon').on('click', function () {
            if ($('#housingIcon').hasClass('selected')) {
                document.getElementById('housingIcon').className = document.getElementById('housingIcon').className.replace(/\b selected\b/, '');
            } else {
                document.getElementById('housingIcon').className += ' selected';
            }
        });

        $('#bikeIcon').on('click', function () {
            if ($('#bikeIcon').hasClass('selected')) {
                bikeLayer.setMap(null);
                document.getElementById('bikeIcon').className = document.getElementById('bikeIcon').className.replace(/\b selected\b/, '');
            } else {
                bikeLayer.setMap(map);
                document.getElementById('bikeIcon').className += ' selected';
            }
        });

        $('#trafficIcon').on('click', function () {
            if ($('#trafficIcon').hasClass('selected')) {
                trafficLayer.setMap(null);
                document.getElementById('trafficIcon').className = document.getElementById('trafficIcon').className.replace(/\b selected\b/, '');
            } else {
                trafficLayer.setMap(map);
                document.getElementById('trafficIcon').className += ' selected';
            }
        });

        function resize() {
            var windowHeight = $(window).height();
            var navHeight = $('.navbar').height();
            var mapHeight = windowHeight - navHeight;
            $('#map').css({ 'height': mapHeight + 'px' });
            $('.dataSelect').css({ 'height': mapHeight + 'px' });
        }

        function populateCrime() {
            document.getElementById('crimeIcon').className += ' selected';
            $.ajax({
                method: 'GET',
                url: 'http://hercules.code4hr.org/crime/Hampton',
                asynch: false,
                beforeSend: function(){
                    $('#loadingMask').css('visibility', 'visible');
                },
                data: crimeData,
                crossDomain: true,
                dataType: 'jsonp',
                success: function (crimeData) {
                    $('#loadingMask').css('visibility', 'hidden');
                    // Get the crime data from Hercules and populate the crime heatmap
                    crimeData = crimeData.data;
                    for (var elem = 0, max = crimeData.length; elem < max; elem++) {
                        crimeHeatMapData.push({ location: new google.maps.LatLng(crimeData[elem].location.lat, crimeData[elem].location.lon), weight: crimeData[elem].class });
                    }
                    crimeheatmap.set('data', crimeHeatMapData);
                }
            });
        }

        function populateSchools() {
            document.getElementById('schoolIcon').className += ' selected';
            $.ajax({
                method: 'GET',
                url: 'http://hercules.code4hr.org/schools',
                asynch: false,
                beforeSend: function(){
                    $('#loadingMask').css('visibility', 'visible');
                },
                data: schoolsData,
                crossDomain: true,
                dataType: 'jsonp',
                success: function (schoolsData) {
                    $('#loadingMask').css('visibility', 'hidden');
                    addSchoolDataMarkers(schoolsData.data);
                }
            });
        }

        function addSchoolDataMarkers(schoolsData) {
            var message;
            for (var i = 0, imax = schoolsData.length; i < imax; i++) {
                for (var j = 0, jmax = schoolsData[i].length; j < jmax; j++) {
                    if (schoolsData[i][j].lat !== null && schoolsData[i][j].lon !== null) {
                        schoolRating = '?';
                        if ('gsRating' in schoolsData[i][j] || 'parentRating' in schoolsData[i][j]) {
                            schoolRating = 'gsRating' in schoolsData[i][j] ? schoolsData[i][j].gsRating : schoolsData[i][j].parentRating;
                        }
                        schoolMarker = new google.maps.Marker({
                            position: { lat: Number(schoolsData[i][j].lat), lng: Number(schoolsData[i][j].lon) },
                            label: schoolRating,
                            title: schoolsData[i][j].name,
                            map: map,
                            clickable: true
                        });

                        message = createSchoolInfoWindowContent(schoolsData[i][j]);

                        attachMessage(schoolMarker, message);
                        schoolMarkers.push(schoolMarker);
                    }
                }
            }
        }

        // This function creates the content to display in the info window for each school marker
        function createSchoolInfoWindowContent(school) {
            var message = '';
            if (school.name) {
                message += '<b>School:</b> ' + school.name;
            }
            if (school.gsRating) {
                message += '<br /><b>GreatSchools Rating:</b> ' + school.gsRating + '/10';
            }
            if (school.parentRating) {
                message += '<br /><b>Parent Rating:</b> ' + school.parentRating + '/5';
            }
            if (school.type) {
                message += '<br /><b>Type:</b> ' + capitalize(school.type);
            }
            if (school.gradeRange) {
                message += '<br /><b>Grade Range:</b> ' + school.gradeRange;
            }
            if (school.district) {
                message += '<br /><b>School District:</b> ' + school.district;
            }
            if (school.enrollment) {
                message += '<br /><b>Number of Students Enrolled:</b> ' + school.enrollment;
            }
            if (school.address) {
                message += '<br /><b>Address:</b> ' + school.address;
            }
            if (school.phone) {
                message += '<br /><b>Phone Number:</b> ' + school.phone;
            }
            if (school.website) {
                message += '<br /><a href="' + school.website + '" target="_blank">School Website</a>';
            }
            if (school.overviewLink) {
                message += '<br /><a href="' + school.overviewLink + '" target="_blank">Learn More at GreatSchools.org</a>';
            }

            return message;
        }

        // Attaches an info window to a marker with the provided message. When the marker is clicked,
        // any existing info windows will close and the new info window will open with the message.
        function attachMessage(marker, message) {
            marker.addListener('click', function () {
                infowindow.close();
                infowindow.setContent(message);
                infowindow.open(marker.get('map'), marker);
            });
        }

        function removeSchoolDataMarkers() {
            for (var i = 0; i < schoolMarkers.length; i++) {
                schoolMarkers[i].setMap(null);
            }

            schoolMarkers = [];
        }

        function addFoodSanitationData() {
            $.ajax({
                method: 'GET',
                url: 'http://hercules.code4hr.org/food/sanitation',
                asynch: false,
                beforeSend :function(){
                    $("#loadingMask").css('visibility', 'visible');
                },
                data: foodSanitationData,
                crossDomain: true,
                dataType: 'jsonp',
                success: function (foodSanitationData) {
                    $("#loadingMask").css('visibility', 'hidden');
                    setFoodSanitationMarkers(foodSanitationData);
                }
            });
        }

        function setFoodSanitationMarkers(foodSanitationData) {
            var foodMessage;
            for (var i = 0, max = foodSanitationData.length; i < max; i++) {
                if (foodSanitationData[i].latitude !== null && foodSanitationData[i].longitude !== null && foodSanitationData[i].score !== null) {
                    foodSanitationMarker = new google.maps.Marker({
                        position: { lat: Number(foodSanitationData[i].latitude), lng: Number(foodSanitationData[i].longitude)},
                        label: parseInt(foodSanitationData[i].score).toString(),
                        title: foodSanitationData[i].name,
                        map: map,
                        clickable: true
                    });

                    foodMessage = createFoodInfoWindowContent(foodSanitationData[i]);

                    attachMessage(foodSanitationMarker, foodMessage);
                    foodSanitationMarkers.push(foodSanitationMarker);
                };
            }
        }

        // Attaches an info window to a marker with the provided message. When the marker is clicked,
        // any existing info windows will close and the new info window will open with the message.
        function createFoodInfoWindowContent(food) {
            var message = '';
            if (food.name) {
                message += '<b>Name:</b> ' + food.name;
            }
            if (food.score) {
                message += '<br /><b>Score:</b> ' + food.score;
            }
            if (food.address) {
                message += '<br /><b>Address:</b> ' + food.address;
            }
            if (food.city) {
                message += '<br /><b>City:</b> ' + food.city;
            }
            if (food.type) {
                message += '<br /><b>Type:</b> ' + food.type;
            }
            if (food.category) {
                message += '<br /><b>Category:</b> ' + food.category;
            }
            if (food.url) {
                message += '<br /><a href="https://ohi.code4hr.org/#' + food.url + '" target="_blank">Learn More at ohi.code4hr.org</a>';
            }

            return message;
        }

        function removeFoodSanitationData() {
            for (var i = 0; i < foodSanitationMarkers.length; i++) {
                foodSanitationMarkers[i].setMap(null);
            }
            foodSanitationMarkers = [];
        }

        function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        }

        function capitalize(capitalizeThis) {
            return capitalizeThis.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        };
    });
}
