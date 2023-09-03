const mapWrap =  document.querySelectorAll(".js-map")


function initMap () {
  mapWrap.forEach((el) => {
    const lat = Number(el.getAttribute('data-lat'))
    const lng = Number(el.getAttribute('data-lng'))
    let mapOptions = {
      zoom: 12,
      // disableDefaultUI: true,
      center: { lat: lat, lng: lng },
      styles: [
        {
          "featureType": "administrative.locality",
          "elementType": "all",
          "stylers": [
            {
              "hue": "#2c2e33"
            },
            {
              "saturation": 7
            },
            {
              "lightness": 19
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
            {
              "hue": "#ffffff"
            },
            {
              "saturation": -100
            },
            {
              "lightness": 100
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
              "hue": "#ffffff"
            },
            {
              "saturation": -100
            },
            {
              "lightness": 100
            },
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "hue": "#bbc0c4"
            },
            {
              "saturation": -93
            },
            {
              "lightness": 31
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            {
              "hue": "#bbc0c4"
            },
            {
              "saturation": -93
            },
            {
              "lightness": 31
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels",
          "stylers": [
            {
              "hue": "#bbc0c4"
            },
            {
              "saturation": -93
            },
            {
              "lightness": -2
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
            {
              "hue": "#e9ebed"
            },
            {
              "saturation": -90
            },
            {
              "lightness": -8
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "hue": "#e9ebed"
            },
            {
              "saturation": 10
            },
            {
              "lightness": 69
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "hue": "#e9ebed"
            },
            {
              "saturation": -78
            },
            {
              "lightness": 67
            },
            {
              "visibility": "simplified"
            }
          ]
        }
      ]
    }
    var map = new google.maps.Map(el, mapOptions);

    new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map
    });

  })

  const multiple = document.querySelector('#js-map-multiple');

  if(multiple !== null) {
    const lat = Number(multiple.getAttribute('data-lat'))
    const lng = Number(multiple.getAttribute('data-lng'))
    var locations = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1],
    ];

    var iconURLPrefix = 'https://maps.google.com/mapfiles/ms/icons/';

    var icons = [
      iconURLPrefix + 'red-dot.png'
    ]
    var iconsLength = icons.length;

    var map = new google.maps.Map(document.getElementById('js-map-multiple'), {
      zoom: 1,
      center: new google.maps.LatLng(38.219139, -171.521267),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false, /* option for satelate view*/
      streetViewControl: false,
      panControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      }
    });

    var infowindow = new google.maps.InfoWindow({
      maxWidth: 205
    });

    var markers = new Array();
    var iconCounter = 0;

    // Add the markers and infowindows to the map
    for (var i = 0; i < locations.length; i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: icons[iconCounter]
      });

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));

      iconCounter++;
      // We only have a limited number of possible icon colors, so we may have to restart the counter
      if(iconCounter >= iconsLength) {
        iconCounter = 0;
      }
    }

    function autoCenter() {
      //  Create a new viewpoint bound
      var bounds = new google.maps.LatLngBounds();
      //  Go through each...
      for (var i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].position);
      }
      //  Fit these bounds to the map
      map.fitBounds(bounds);
    }
    autoCenter();

    document.querySelectorAll('.js-move-map').forEach((el) => {
      const latMarker = Number(el.getAttribute('data-lat'))
      const lngMarker = Number(el.getAttribute('data-lng'))
      el.addEventListener('click', () => {
        document.querySelectorAll('.js-move-map').forEach((other) => {
          other.classList.remove('show')
        })
        el.classList.add('show')
        map.panTo(new google.maps.LatLng(latMarker, lngMarker));
        map.setZoom(16)
      })

    })
  }

}
