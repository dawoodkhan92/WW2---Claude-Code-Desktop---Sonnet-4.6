/* ═══════════════════════════════════════════════════════════
   MAP.JS — Leaflet Map Initialization & GeoJSON Border Layer
   ═══════════════════════════════════════════════════════════ */

var MapModule = (function () {

  var _map = null;
  var _geoLayer = null;
  var _selectedCountry = null;

  // GeoJSON source: aourednik/historical-basemaps — world_1938
  var GEOJSON_URL = 'https://cdn.jsdelivr.net/gh/aourednik/historical-basemaps@master/geojson/world_1938.geojson';

  // Faction lookup: maps territory NAME → faction for color
  var NAME_TO_FACTION = {
    // Axis core
    'Germany': 'Axis', 'Austria': 'Axis', 'Italy': 'Axis',
    'Hungary': 'Axis', 'Romania': 'Axis', 'Bulgaria': 'Axis',
    'Slovakia': 'Axis',

    // Japan + empire
    'Japan': 'Japan', 'Korea': 'Japan', 'Manchukuo': 'Japan',
    'Mengkukuo': 'Japan',

    // Soviet Union
    'Russia': 'Soviet', 'Soviet Union': 'Soviet',
    'Soviet Russia': 'Soviet',

    // USA
    'United States of America': 'USA', 'United States': 'USA',

    // Western Allies (home territories)
    'United Kingdom': 'Allies', 'France': 'Allies',
    'Poland': 'Allies', 'Czechoslovakia': 'Allies',

    // British Empire (territories under British suzerainty)
    'British India': 'British Empire', 'India': 'British Empire',
    'Australia': 'British Empire', 'Canada': 'British Empire',
    'New Zealand': 'British Empire', 'South Africa': 'British Empire',
    'British Malaya': 'British Empire', 'Malaya': 'British Empire',
    'Burma': 'British Empire', 'Anglo-Egyptian Sudan': 'British Empire',
    'Kenya': 'British Empire', 'Nigeria': 'British Empire',
    'Rhodesia': 'British Empire', 'Gold Coast': 'British Empire',
    'Palestine': 'British Empire', 'Iraq': 'British Empire',
    'Transjordan': 'British Empire', 'British Somaliland': 'British Empire',
    'Northern Rhodesia': 'British Empire', 'Southern Rhodesia': 'British Empire',
    'Nyasaland': 'British Empire', 'Tanganyika': 'British Empire',
    'Uganda': 'British Empire',

    // French Empire
    'French West Africa': 'French Empire', 'French Equatorial Africa': 'French Empire',
    'French Indochina': 'French Empire', 'Indochina': 'French Empire',
    'Madagascar': 'French Empire', 'Morocco': 'French Empire',
    'Tunisia': 'French Empire', 'Algeria': 'French Empire',
    'Syria': 'French Empire', 'Lebanon': 'French Empire',
    'French Madagascar': 'French Empire', 'Cameroon': 'French Empire',
    'French Cameroon': 'French Empire', 'French Togoland': 'French Empire',

    // Italian Empire
    'Libya': 'Axis', 'Ethiopia': 'Axis', 'Eritrea': 'Axis',
    'Italian Somaliland': 'Axis', 'Italian East Africa': 'Axis',

    // Neutrals
    'Spain': 'Neutral', 'Sweden': 'Neutral', 'Norway': 'Neutral',
    'Denmark': 'Neutral', 'Netherlands': 'Neutral', 'Belgium': 'Neutral',
    'Switzerland': 'Neutral', 'Turkey': 'Neutral', 'Greece': 'Neutral',
    'Yugoslavia': 'Neutral', 'Finland': 'Neutral', 'Portugal': 'Neutral',
    'Afghanistan': 'Neutral', 'Iran': 'Neutral', 'Persia': 'Neutral',
    'Saudi Arabia': 'Neutral', 'Egypt': 'Neutral',
    'Thailand': 'Neutral', 'Siam': 'Neutral',
    'Mexico': 'Neutral', 'Brazil': 'Neutral', 'Argentina': 'Neutral',
    'Chile': 'Neutral', 'Colombia': 'Neutral', 'Venezuela': 'Neutral',
    'Peru': 'Neutral', 'Bolivia': 'Neutral',

    // China
    'China': 'Allies',
  };

  function _getFactionColor(name, subjecto) {
    // Try exact name match
    if (NAME_TO_FACTION[name]) {
      return FACTION_COLORS[NAME_TO_FACTION[name]] || '#3a3a3a';
    }
    // If it has a subject-of relationship, use that
    if (subjecto) {
      if (subjecto === 'United Kingdom' || subjecto === 'British Empire')
        return FACTION_COLORS['British Empire'];
      if (subjecto === 'France')
        return FACTION_COLORS['French Empire'];
      if (subjecto === 'Germany')
        return FACTION_COLORS['Axis'];
      if (subjecto === 'Italy')
        return FACTION_COLORS['Axis'];
      if (subjecto === 'Japan')
        return FACTION_COLORS['Japan'];
      if (subjecto === 'Russia' || subjecto === 'Soviet Union')
        return FACTION_COLORS['Soviet'];
      if (subjecto === 'United States' || subjecto === 'United States of America')
        return FACTION_COLORS['USA'];
      if (subjecto === 'Netherlands')
        return FACTION_COLORS['Neutral'];
      if (subjecto === 'Portugal')
        return FACTION_COLORS['Neutral'];
      if (subjecto === 'Belgium')
        return FACTION_COLORS['Neutral'];
    }
    return '#3a3a3a'; // contested/unknown
  }

  function _styleCountry(feature) {
    var name     = feature.properties.NAME || feature.properties.name || '';
    var subjecto = feature.properties.SUBJECTO || feature.properties.subjecto || '';
    var color    = _getFactionColor(name, subjecto);

    return {
      fillColor:   color,
      fillOpacity: 0.45,
      color:       '#1a1a14',
      weight:      0.8,
      opacity:     0.9,
    };
  }

  function _highlightStyle(feature) {
    var name     = feature.properties.NAME || feature.properties.name || '';
    var subjecto = feature.properties.SUBJECTO || feature.properties.subjecto || '';
    var color    = _getFactionColor(name, subjecto);

    return {
      fillColor:   color,
      fillOpacity: 0.70,
      color:       '#c4a44a',
      weight:      1.5,
      opacity:     1.0,
    };
  }

  function _onEachFeature(feature, layer) {
    var name = feature.properties.NAME || feature.properties.name || 'Unknown Territory';

    layer.on({
      mouseover: function (e) {
        e.target.setStyle(_highlightStyle(feature));
        e.target.bringToFront();
      },
      mouseout: function (e) {
        if (_selectedCountry !== e.target) {
          _geoLayer.resetStyle(e.target);
        }
      },
      click: function (e) {
        // Reset previously selected country
        if (_selectedCountry && _selectedCountry !== e.target) {
          _geoLayer.resetStyle(_selectedCountry);
        }
        _selectedCountry = e.target;
        e.target.setStyle(_highlightStyle(feature));

        // Emit country selection event
        document.dispatchEvent(new CustomEvent('country:selected', {
          detail: {
            name: name,
            feature: feature.properties
          }
        }));

        L.DomEvent.stopPropagation(e);
      }
    });
  }

  function init() {
    // ── Create Leaflet map ──
    _map = L.map('map', {
      center: [30, 15],
      zoom: 3,
      minZoom: 2,
      maxZoom: 10,
      zoomControl: true,
      attributionControl: true,
      worldCopyJump: true,
    });

    // ── Tile layer: CartoDB Voyager + sepia vintage filter ──
    // Try ColorFilter plugin first, fall back to regular tileLayer
    try {
      L.tileLayer.colorFilter(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
          subdomains: 'abcd',
          maxZoom: 19,
          filter: ['sepia:65%', 'contrast:110%', 'brightness:80%', 'saturate:60%'],
        }
      ).addTo(_map);
    } catch (e) {
      // Fallback without color filter
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }
      ).addTo(_map);
    }

    // ── Load historical 1938 GeoJSON ──
    fetch(GEOJSON_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('GeoJSON fetch failed: ' + res.status);
        return res.json();
      })
      .then(function (data) {
        _geoLayer = L.geoJSON(data, {
          style: _styleCountry,
          onEachFeature: _onEachFeature,
        }).addTo(_map);

        document.dispatchEvent(new Event('map:geojson:loaded'));
      })
      .catch(function (err) {
        console.warn('Could not load 1938 GeoJSON:', err.message);
        // App still works without the border layer
        document.dispatchEvent(new Event('map:geojson:loaded'));
      });

    // ── Coordinate display on mousemove ──
    var coordDisplay = document.getElementById('coordinates-display');
    _map.on('mousemove', function (e) {
      var lat = e.latlng.lat.toFixed(2);
      var lng = e.latlng.lng.toFixed(2);
      var ns  = lat >= 0 ? 'N' : 'S';
      var ew  = lng >= 0 ? 'E' : 'W';
      coordDisplay.textContent = Math.abs(lat) + '° ' + ns + '  ' + Math.abs(lng) + '° ' + ew;
    });

    // Bring GeoJSON to front after tiles load
    _map.on('zoomend', function () {
      if (_geoLayer) _geoLayer.bringToFront();
    });

    return _map;
  }

  function getMap() { return _map; }
  function getGeoLayer() { return _geoLayer; }

  function flyTo(center, zoom) {
    if (_map) _map.flyTo(center, zoom, { duration: 1.5 });
  }

  return { init: init, getMap: getMap, getGeoLayer: getGeoLayer, flyTo: flyTo };

})();
