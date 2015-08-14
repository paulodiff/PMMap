'use strict';

/* Controllers */



//angular.module('myApp.controllers', [])
angular.module('myApp.controllers')

.controller('MapsController', 
             ['$scope', '$state', '$compile','$location', 'Restangular', 'uiGmapGoogleMapApi', '$filter', 'Session', '$log', '$timeout', 'ENV',
     function( $scope,   $state,   $compile,  $location,    Restangular,  uiGmapGoogleMapApi,$filter,   Session,   $log,   $timeout, ENV) {
 

      $log.log('MapsController then . ...');


$scope.staticMarker = [];
$scope.randomMarkers = [];




$scope.randomMarkers = [
        {
          id: 1,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0668100000,
          longitude: 12.5173200000,
          showWindow: false,
          icon: 'images/map-blue.png',
          text2display: 'Testo idata.CodiceRadio',
          options: {
            labelContent: '0152',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: true
          }
        },
        {
          id: 2,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0768100000,
          longitude: 12.5473200000,
          icon: 'images/map-blue.png',
          text2display: 'Testo idata.CodiceRadio',
          showWindow: false,
          options: {
            labelContent: '0022',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 3,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0358300000,
          longitude: 12.5573500000,
          icon: 'images/map-blue.png',
          text2display: 'Testo  ddddidata.CodiceRadio',
          showWindow: false,
          options: {
            labelContent: '0025',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        }
        
      ];

$scope.circles = [
            {
                id: 1,
                center: {
                    latitude: 44.0358300000,
                    longitude: 12.5573500000
                },
                radius: 500,
                stroke: {
                    color: '#08B21F',
                    weight: 2,
                    opacity: 1
                },
                fill: {
                    color: '#08B21F',
                    opacity: 0.5
                },
                geodesic: true, // optional: defaults to false
                draggable: true, // optional: defaults to false
                clickable: true, // optional: defaults to true
                editable: true, // optional: defaults to false
                visible: true, // optional: defaults to true
                control: {}
            }
        ];


 $scope.polylines = [
    {
                id: 0,
                path: '',
                stroke: {
                    color: '#4EAE47',
                    weight: 3
                },
                editable: false,
                draggable: false,
                geodesic: false,
                visible: true,
                icons: [{
                    icon: {
                        path: 'google.maps.SymbolPath.BACKWARD_OPEN_ARROW'
                    },
                    offset: '25px',
                    repeat: '50px'
                }]
            }
        ];



      $scope.address2geocode ='via roma 1, Rimini';
      var geocoder;
      var directionsService;
      var directionsDisplay;


      uiGmapGoogleMapApi.then(function(maps) {
        $log.log('uiGmapGoogleMapApi then . ...');
        $log.log(maps);

        $scope.map = { center: { latitude: 44.0357100000, longitude: 12.5573200000 }, zoom: 12 };
        //$scope.refreshMap();

        geocoder = new maps.Geocoder();
        directionsService = new maps.DirectionsService();
        directionsDisplay = new maps.DirectionsRenderer();



         var request = {
          origin: new maps.LatLng(
              44.0358300000, 
              12.5573500000
          ),
            destination: new maps.LatLng(
              44.0768100000, 
              12.5473200000
          ),
            travelMode: maps.TravelMode['DRIVING'],
        optimizeWaypoints: true
      };

    directionsService.route(request, function(response, status) {


          if (status === google.maps.DirectionsStatus.OK) {
            $log.log(response);
            $log.log(response.routes[0].overview_polyline);
            $log.log($scope.polylines);

            $scope.polylines[0].path = google.maps.geometry.encoding.decodePath(response.routes[0].overview_polyline);
            $scope.polylines[0].icons[0].icon = google.maps.SymbolPath.BACKWARD_OPEN_ARROW;
            $log.log($scope.polylines);
            //$scope.apply();
          } else {
            window.alert('Directions request failed due to ' + status);
          }

    });



          $scope.map.mapEvents = {
            //click: function (marker, eventName, model, args) {
          click: function (maps, eventName, originalEventArgs) {
              //window.alert(originalEventArgs);
              //model.options.labelContent = "Dragged lat: " + model.latitude + " lon: " + model.longitude;

          var e = originalEventArgs[0];
          var lat = e.latLng.lat();
          var lon = e.latLng.lng();
          
          $scope.randomMarkers.push({
            id: 20,
            options: {
              labelContent: 'You clicked here ' + 'lat: ' + lat + ' lon: ' + lon,
              labelClass: "marker-labels",
              labelAnchor:"50 0"
            },
            latitude: lat,
            longitude: lon
          });
          //scope apply required because this event handler is outside of the angular domain
          $scope.$apply();

          }
        };



      }); //chiude uiGmapGoogleMapApi.then

      $scope.geocodeAddress = function() {
          var address = $scope.address2geocode;
          $log.log('geocodeAddress then . ...' + address);

          geocoder.geocode({'address': address}, function(results, status) {
            $log.log(status);
            $log.log(results);
            if (status === google.maps.GeocoderStatus.OK) {
                $log.log(results[0].geometry.location);

                  var fast_array = [];
                    fast_array.push(
                          {
                              "id": 1,
                              "latitude": results[0].geometry.location.k,
                              "longitude": results[0].geometry.location.D,
                              //"icon": 'images/map-blue.png',
                              "text2display": 'lat:' + results[0].geometry.location.k + " long:" + results[0].geometry.location.D,
                              "options": {
                                "labelContent": 'idata.CodiceRadio',
                                "labelAnchor": "22 0",
                                "labelClass": "marker-labels",
                                "draggable": false
                              }

                          }
                      );

                $scope.randomMarkers = fast_array;
                //$scope.map.control.refresh();
                //$scope.map.control.refresh({ latitude: 44.0357100000, longitude: 12.5573200000 });
                //$scope.map.control.getGMap().setZoom(11);

                $scope.calculateAndDisplayRoute(directionsService,directionsDisplay);


               /*
              resultsMap.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
              */
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }


$scope.calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
  
    //var haight = new google.maps.LatLng(37.7699298, -122.4469157);
    //var oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);


    $log.log('calculateAndDisplayRoute');
  directionsService.route({
    origin: 'Via Roma, 1, 47921 Rimini RN, Italy',
    destination: 'Viale Madrid, 32, 47924 Rimini RN, Italy',
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    $log.log(response);
    $log.log(status);
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

  $scope.addMarker = function(event) {
    var ll = event.latLng;
    $scope.positions.push({lat:ll.lat(), lng: ll.lng()});
  }


$scope.WrandomMarkers = [
        {
          id: 1,
          //icon: 'assets/images/blue_marker.png',
          lat: 44.0668100000,
          lng: 12.5173200000,
          showWindow: false,
          options: {
            labelContent: '0152',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 2,
          //icon: 'assets/images/blue_marker.png',
          lat: 44.0768100000,
          lng: 12.5473200000,
          showWindow: false,
          options: {
            labelContent: '0022',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 3,
          //icon: 'assets/images/blue_marker.png',
          lat: 44.0358300000,
          lng: 12.5573500000,
          showWindow: false,
          options: {
            labelContent: '0025',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        }
        
      ];

/*

        $scope.staticMarker = {
          id: 0,
          title : 'Title',
          coords: {
            latitude: 44.0358300000,
            longitude: 12.5573500000
          },
          options: { 
            draggable: true,
            labelContent: 'Markers id 3',
            labelAnchor: "26 0",
            labelClass: "marker-labels"
          },
          events: {
            dragend: function (marker, eventName, args) {
              $log.log('marker dragend');
              $log.log(marker.getPosition().lat());
              $log.log(marker.getPosition().lng());
            }
          }
        };

*/



     $scope.clickTest = function() {
       alert('Example of infowindow with ng-click')
    };

  $scope.filterCriteria = {
    //pageNumber: 1,
    //count: 0,
    //limit: $scope.pageSize,
    qDateUp: $filter('date')( new Date(2015, 6, 20), "yyyyMMdd"),
    qDateDw: $filter('date')( new Date(2015, 6, 20), "yyyyMMdd"),
    table : 'coord_201507',
    soloPattuglie : true
    //start: 0,
    //sortDir: 'asc',
    //sortedBy: 'id',
    //id_utenti_selezione : Session.isAdmin ? 0 : Session.id_utenti,
    //mese_selezione : 0,
    //anno_selezione: 0
  };


  

  //The function that is responsible of fetching the result from the server and setting the grid to the new result
  $scope.refreshMap = function () {
      $log.debug('MapsController: fetchResult');
      $log.debug('MapsController: impostazione criteri di filtro : ' + ENV.mapsdemo);

      var offset_page =  ( $scope.currentPage - 1 ) * $scope.pageSize;
      //$scope.filterCriteria.start = offset_page;
      //$scope.filterCriteria.qDate =$filter('date')($scope.frmData.dateFilter, "yyyyMMdd");

      // build filter criterra


      if (ENV.mapsdemo == true) {
        var fakeToday = new Date(2015,6,7,11,11,11,0);
      } else {
        var fakeToday = new Date();
      }


      var yesterday = new Date(fakeToday.getTime());
      yesterday.setMinutes(fakeToday.getMinutes() - 30);

      $log.debug('MapsController: ' + fakeToday);
      $log.debug('MapsController: ' + yesterday);

      $scope.filterCriteria.qDateUp = $filter('date')( fakeToday, "yyyyMMdd@HHmmss");
      $scope.filterCriteria.qDateDw = $filter('date')( yesterday, "yyyyMMdd@HHmmss");



       var d1 = fakeToday;
       var n1 = d1.getHours();
       var n2 = '';

       var m1 = d1.getMinutes();
       var m2 = '';

/*
       if (n1 == 0) {
          n2 = 23;
          var yesterday = new Date();
          yesterday.setDate(fakeToday.getDate() - 1);
          $scope.filterCriteria.qDateUp = $filter('date')( yesterday, "yyyyMMdd@HHmmss");
          $scope.filterCriteria.qDateDw = $filter('date')( fakeToday, "yyyyMMdd@HHmmss");
        } else {
          n2 = n1 - 1;
          $scope.filterCriteria.qDateUp = $filter('date')( fakeToday, "yyyyMMdd@HHmmss");
          $scope.filterCriteria.qDateDw = $filter('date')( fakeToday, "yyyyMMdd@HHmmss");
        }
*/

      $log.debug($scope.filterCriteria);

      $log.debug('MapsController...fetchResult - GET Count');
    

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

      var serviziList = Restangular.all('getPosizioni');
      
      // Get items ...  
      $log.debug('MapsController...fetchResult - GET data');
      //$scope.filterCriteria.count = 0; // imposta la selezione standard sul server
      //$ionicLoading.show({template: 'Dati in arrivo!' });
      return serviziList.getList($scope.filterCriteria).then(function(data) {
               
                $log.debug(data);
          
                var fast_array = []; // contiene le ultime posizioni
                var fast_path = []; // contiene i percorsi
                var iteratorId = 1;
          
                //loop per modificare e preparare i dati in arrivo

                $log.debug('MapsController .. preparing data... to view');
                data.forEach(function (idata) {
                    //$log.debug(idata);
                    //$scope.items.push(idata);
                    //if(idata.annullato_servizi == 1) idata.image_class="icon ion-close-circled assertive";
                    //if((idata.id_rapporto_valido_servizio != null) && (idata.annullato_servizi == 0)) idata.image_class="icon ion-share balanced";
                    //if((idata.id_rapporto_valido_servizio == null) && (idata.annullato_servizi == 0)) idata.image_class="icon ion-checkmark balanced";

                    //20150720@111555
                    
                    if (iteratorId < 1000) {
                   
                      fast_array.push(
                          {
                              "id": iteratorId,
                              "latitude": idata.LatitD,
                              "longitude": idata.LongiD,
                              "icon": 'images/map-blue.png',
                              "text2display": 'Testo' + iteratorId + ' - ' + idata.CodiceRadio,
                              "options": {
                                "labelContent": idata.CodiceRadio,
                                "labelAnchor": "22 0",
                                "labelClass": "marker-labels",
                                "draggable": false
                              }

                              //"showWindow": false
                              /*,
                              "options": {
                                 "labelContent": idata.CodiceRadio,
                                 "labelAnchor": idata.CodiceRadio,
                                 "labelClass": "marker-labels"
                              }
                              */
                          }
                      );


                      var curr_path = [];
                      for (var i = 0; i < idata.Percorso[0].rows.length; i++){

                        curr_path.push(
                            {
                              latitude: idata.Percorso[0].rows[i].LatitD,
                              longitude: idata.Percorso[0].rows[i].LongiD
                            }
                          );
                      }


                      

                      fast_path.push(
                        {
                          id: iteratorId,
                          path: curr_path,
                          stroke: {
                              color: getRandomColor(),
                              weight: 3
                          },
                          editable: false,
                          draggable: false,
                          geodesic: true,
                          visible: true,
                          icons: [{
                              icon: {
                                  path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                              },
                          offset: '25px',
                          repeat: '50px'
                          }]
                        }

                      );





                    
                    }

                    iteratorId = iteratorId + 1;
                    
                });
                
                $log.debug(fast_array);
                $log.debug(fast_path);
          /*
                //$scope.items = data;
                $scope.randomMarkers = [];
                $scope.randomMarkers = fast_array;

                $scope.randomMarkers = [
        {
          id: 1,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0358,
          longitude: 12.55713,
          showWindow: false,
          options: {
            labelContent: 'ddddd',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 2,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.07681,
          longitude: 12.54832,
          showWindow: false,
          options: {
            labelContent: 'aaaa',
            labelAnchor: "22 0",
            labelClass: "marker-labels-old",
            draggable: false
          }
        },
        {
          id: 3,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.03583,
          longitude: 12.56735,
          showWindow: false,
          options: {
            labelContent: 'xxxx',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 4,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.03483,
          longitude: 12.53735,
          showWindow: false,
          options: {
            labelContent: '11xxxx',
            labelAnchor: "2211 0",
            labelClass: "marker-labels",
            draggable: false
          }
        }

        
      ];  


            $log.debug($scope.randomMarkers);

*/

            $scope.randomMarkers = fast_array;
            $scope.polylines = fast_path;
            $log.debug($scope.randomMarkers);
          
                $log.debug(' .. data loaded!');
                //$ionicLoading.hide();  
              
          // in caso di errore azzera la lista...      
          }, function () {
                $scope.items = [];
      });
          
      /*
      $scope.items = serviziList.getList($scope.filterCriteria).$object;
      $log.debug('@@@@@@@@@@@@@@@@@@ dati ritornati @@@@@@@@@@@@@@@@@@@');
      $log.debug($scope.items);
      */
          
 };



      $scope.refreshMapFAKE = function () {

        $log.log('refreshMap ...');

    $ionicLoading.show({template: 'Aggiornamento dati'});


$timeout(function () {
    $ionicLoading.hide();
    


        var lt1 = 44.09 + (Math.floor(Math.random() * 9) + 1) * 0.01;
        var ln1 = 12.59 + (Math.floor(Math.random() * 9) + 1) * 0.01;

        $log.log('refreshMap ... ' + lt1 + ' # ' + ln1 );

        //optional param if you want to refresh you can pass null undefined or false or empty arg
        $scope.randomMarkers = [
        {
          id: 1,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0357100000,
          longitude: 12.5763200000,
          showWindow: false,
          options: {
            labelContent: '00012',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 2,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0798100000,
          longitude: 12.5173200000,
          showWindow: false,
          options: {
            labelContent: '00024',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 3,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0358300000,
          longitude: 12.5573500000,
          showWindow: false,
          options: {
            labelContent: '00025',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 4,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0903500000,
          longitude: 12.5343200000,
          showWindow: false,
          options: {
            labelContent: '00027',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        },
        {
          id: 5,
          //icon: 'assets/images/blue_marker.png',
          latitude: 44.0381100000,
          longitude: 12.5593900000,
          showWindow: false,
          options: {
            labelContent: '00044',
            labelAnchor: "22 0",
            labelClass: "marker-labels",
            draggable: false
          }
        }

      ];


  }, 2000);
    


    };

}]);      