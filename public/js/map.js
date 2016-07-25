function initAutocomplete() {

    var map = null;
    var bikeLayer = new google.maps.BicyclingLayer();
    var trafficLayer = new google.maps.TrafficLayer();
    var crimeheatmap, crimeData;
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
                zoom: 11,
                zoomControl: true,
                center: new google.maps.LatLng(36.9487874, -76.2121092),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: styleArray,
                mapTypeControl: false
            };
            map = new google.maps.Map(document.getElementById('map'),
                mapOptions);
        }
        google.maps.event.addDomListener(window, 'load', initialize);

        $('#crimeIcon').on('click', function () {
            if ($('#crimeIcon').hasClass('selected')) {
                document.getElementById('crimeIcon').className = document.getElementById('crimeIcon').className.replace(/\b selected\b/, '');
            } else {
                document.getElementById('crimeIcon').className += ' selected';
                $.ajax({
                    method: 'GET',
                    url: 'http://hercules.code4hr.org/crime/Hampton',
                    data: crimeData,
                    crossDomain: true,
                    dataType: 'jsonp',
                    success: function (crimeData) {
                        // 
                    }
                });
            }
        });

        $('#schoolIcon').on('click', function () {
            if ($('#schoolIcon').hasClass('selected')) {
                document.getElementById('schoolIcon').className = document.getElementById('schoolIcon').className.replace(/\b selected\b/, '');
                removeSchoolDataMarkers();
            } else {
                document.getElementById('schoolIcon').className += ' selected';
                addSchoolData();
            }
        });

        $('#foodIcon').on('click', function () {
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

        function addSchoolData() {
            $.ajax({
                method: 'GET',
                url: 'http://hercules.code4hr.org/schools',
                data: schoolsData,
                crossDomain: true,
                dataType: 'jsonp',
                success: function (schoolsData) {
                    addSchoolDataMarkers(schoolsData.data);
                }
            });
        }

        function addSchoolDataMarkers(schoolsData) {
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
                            map: map
                        })
                        schoolMarkers.push(schoolMarker);
                    }
                }
            }
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
                data: foodSanitationData,
                crossDomain: true,
                dataType: 'jsonp',
                success: function (foodSanitationData) {
                    setFoodSanitationMarkers(foodSanitationData);
                }
            });
        }

        function setFoodSanitationMarkers(foodSanitationData) {
            for (var i = 0, max = foodSanitationData.length; i < max; i++) {
                if (foodSanitationData[i].latitude !== null && foodSanitationData[i].longitude !== null) {
                    foodSanitationMarker = new google.maps.Marker({
                        position: { lat: foodSanitationData[i].latitude, lng: foodSanitationData[i].longitude },
                        title: foodSanitationData[i].name,
                        map: map,
                        icon: foodSanitationImage
                    })
                    foodSanitationMarkers.push(foodSanitationMarker);
                };
            }
        }

        function removeFoodSanitationData() {
            for (var i = 0; i < foodSanitationMarkers.length; i++) {
                foodSanitationMarkers[i].setMap(null);
            }
            foodSanitationMarkers = [];
        }
    });

}
