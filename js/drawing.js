/* ═══════════════════════════════════════════════════════════
   DRAWING.JS — 8 Drawing Tools: Attack Arrows, Lines, Zones
   ═══════════════════════════════════════════════════════════ */

var DrawingModule = (function () {

  var _map = null;
  var _drawLayer = L.layerGroup();
  var _drawings = [];
  var _nextId = 1;
  var _activeTool = null;
  var _selectedDrawing = null;

  // Freehand state
  var _freehandActive = false;
  var _freehandPoints = [];
  var _freehandLine = null;

  // ── TOOL STYLE PRESETS ──
  var TOOL_STYLES = {
    'attack-arrow':  { color: '#cc2200', weight: 4, opacity: 0.92, dashArray: null },
    'defense-line':  { color: '#1a4a8a', weight: 4, opacity: 0.90, dashArray: '8 4' },
    'front-line':    { color: '#8c7840', weight: 3, opacity: 0.88, dashArray: '12 4 2 4' },
    'supply-route':  { color: '#2d6a2d', weight: 2, opacity: 0.80, dashArray: '8 5' },
    'encircle':      { color: '#cc2200', weight: 2, opacity: 0.70, fillColor: '#cc2200', fillOpacity: 0.08, dashArray: '6 3' },
    'naval-zone':    { color: '#1a4a8a', weight: 2, opacity: 0.70, fillColor: '#1a4a8a', fillOpacity: 0.06, dashArray: '8 4' },
    'freehand':      { color: '#c4a44a', weight: 2, opacity: 0.80, dashArray: null },
  };

  // ── ARROWHEAD HELPER ──
  function _addArrowhead(latlngs) {
    if (!window.L || !L.polylineDecorator) return null;
    var line = L.polyline(latlngs, { opacity: 0 }).addTo(_map);
    var decorator = L.polylineDecorator(line, {
      patterns: [{
        offset: '100%',
        repeat: 0,
        symbol: L.Symbol.arrowHead({
          pixelSize: 14,
          polygon: false,
          pathOptions: {
            color: TOOL_STYLES['attack-arrow'].color,
            weight: 3,
            opacity: 0.95,
            fillOpacity: 1,
          }
        })
      }]
    }).addTo(_map);
    return { line: line, decorator: decorator };
  }

  function _removeArrowhead(arrowObj) {
    if (!arrowObj) return;
    if (arrowObj.line) _map.removeLayer(arrowObj.line);
    if (arrowObj.decorator) _map.removeLayer(arrowObj.decorator);
  }

  // ── AIRSTRIKE MARKER ──
  function _createAirstrikeMarker(latlng) {
    return L.marker(latlng, {
      icon: L.divIcon({
        className: '',
        html: '<div class="airstrike-marker"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })
    });
  }

  // ── DRAW FUNCTIONS ──

  function _drawPolyline(latlngs, toolType) {
    var style = TOOL_STYLES[toolType] || TOOL_STYLES['freehand'];
    var layer = L.polyline(latlngs, {
      color:     style.color,
      weight:    style.weight,
      opacity:   style.opacity,
      dashArray: style.dashArray,
    }).addTo(_map);

    var id = _nextId++;
    var arrow = null;
    if (toolType === 'attack-arrow') {
      arrow = _addArrowhead(latlngs);
    }

    _attachDrawingEvents(layer, id);
    _drawings.push({ id: id, layer: layer, tool: toolType, type: 'polyline', latlngs: latlngs, arrow: arrow });
    return id;
  }

  function _drawCircle(latlng, radius, toolType) {
    var style = TOOL_STYLES[toolType] || TOOL_STYLES['encircle'];
    var layer = L.circle(latlng, {
      radius:      radius,
      color:       style.color,
      weight:      style.weight,
      opacity:     style.opacity,
      dashArray:   style.dashArray,
      fillColor:   style.fillColor,
      fillOpacity: style.fillOpacity,
    }).addTo(_map);

    var id = _nextId++;
    _attachDrawingEvents(layer, id);
    _drawings.push({ id: id, layer: layer, tool: toolType, type: 'circle', latlng: latlng, radius: radius });
    return id;
  }

  function _drawAirstrike(latlng) {
    var marker = _createAirstrikeMarker(latlng).addTo(_map);
    var id = _nextId++;
    marker.on('click', function (e) {
      L.DomEvent.stopPropagation(e);
      _selectDrawing(id);
    });
    _drawings.push({ id: id, layer: marker, tool: 'airstrike', type: 'airstrike', latlng: latlng });
    return id;
  }

  function _attachDrawingEvents(layer, id) {
    layer.on('click', function (e) {
      L.DomEvent.stopPropagation(e);
      _selectDrawing(id);
    });
  }

  function _selectDrawing(id) {
    _deselectDrawing();
    var d = _drawings.find(function (x) { return x.id === id; });
    if (!d) return;
    _selectedDrawing = id;
    if (d.layer.setStyle) {
      d.layer.setStyle({ weight: (d.layer.options.weight || 2) + 3 });
    }
    document.dispatchEvent(new CustomEvent('drawing:selected', { detail: { id: id, tool: d.tool } }));
  }

  function _deselectDrawing() {
    if (_selectedDrawing === null) return;
    var d = _drawings.find(function (x) { return x.id === _selectedDrawing; });
    if (d) {
      var style = TOOL_STYLES[d.tool];
      if (d.layer.setStyle && style) {
        d.layer.setStyle({ weight: style.weight });
      }
    }
    _selectedDrawing = null;
  }

  // ── LEAFLET.DRAW INTEGRATION ──
  var _drawControl = null;
  var _leafletDrawLayer = null;

  function _setupLeafletDraw() {
    _leafletDrawLayer = new L.FeatureGroup().addTo(_map);

    if (!L.Control || !L.Control.Draw) return;

    _drawControl = new L.Control.Draw({
      position: 'topleft',
      draw: {
        polyline:  false, // We handle this ourselves
        polygon:   false,
        rectangle: false,
        circle:    false,
        marker:    false,
        circlemarker: false,
      },
      edit: {
        featureGroup: _leafletDrawLayer,
        remove: false,
      }
    });
    // Don't add draw control — we use our own toolbar buttons
  }

  // ── FREEHAND DRAWING ──
  function _startFreehand() {
    _freehandActive = true;
    _freehandPoints = [];
    _map.dragging.disable();
    _map.getContainer().style.cursor = 'crosshair';

    _map.on('mousemove', _freehandMove);
    _map.on('mouseup',   _freehandEnd);
  }

  function _freehandMove(e) {
    if (!_freehandActive) return;
    _freehandPoints.push(e.latlng);
    if (_freehandLine) _map.removeLayer(_freehandLine);
    if (_freehandPoints.length > 1) {
      _freehandLine = L.polyline(_freehandPoints, {
        color: '#c4a44a', weight: 2, opacity: 0.7, dashArray: null
      }).addTo(_map);
    }
  }

  function _freehandEnd() {
    if (!_freehandActive || _freehandPoints.length < 2) {
      _cancelFreehand();
      return;
    }
    // Simplify: keep every 3rd point
    var simplified = _freehandPoints.filter(function (_, i) { return i % 3 === 0; });
    if (simplified.length < 2) simplified = _freehandPoints.slice(0, 2);

    if (_freehandLine) { _map.removeLayer(_freehandLine); _freehandLine = null; }
    _drawPolyline(simplified, 'freehand');
    _cancelFreehand();
  }

  function _cancelFreehand() {
    _freehandActive = false;
    _freehandPoints = [];
    if (_freehandLine) { _map.removeLayer(_freehandLine); _freehandLine = null; }
    _map.dragging.enable();
    _map.off('mousemove', _freehandMove);
    _map.off('mouseup',   _freehandEnd);
  }

  // ── MAP CLICK HANDLER (called by app.js) ──
  function handleMapClick(latlng) {
    if (!_activeTool) return false;

    switch (_activeTool) {
      case 'airstrike':
        _drawAirstrike(latlng);
        return true;
    }
    return false;
  }

  // ── LINE DRAWING STATE MACHINE ──
  // For tools that need click-to-start + click-to-add-points + dblclick-to-finish
  var _linePoints = [];
  var _liveLine   = null;

  function _startLineTool(toolType) {
    _linePoints = [];
    _map.getContainer().style.cursor = 'crosshair';
    _map.on('click',    function (e) { _lineAddPoint(e.latlng, toolType); });
    _map.on('dblclick', function ()  { _lineFinish(toolType); });
    _map.on('mousemove',function (e) { _linePreview(e.latlng, toolType); });
  }

  function _lineAddPoint(latlng, toolType) {
    _linePoints.push(latlng);
    _linePreview(latlng, toolType);
  }

  function _linePreview(latlng, toolType) {
    if (_linePoints.length === 0) return;
    var pts = _linePoints.concat([latlng]);
    if (_liveLine) _map.removeLayer(_liveLine);
    var style = TOOL_STYLES[toolType] || {};
    _liveLine = L.polyline(pts, {
      color: style.color || '#c4a44a',
      weight: (style.weight || 2),
      opacity: 0.5,
      dashArray: style.dashArray || null,
    }).addTo(_map);
  }

  function _lineFinish(toolType) {
    _map.off('click');
    _map.off('dblclick');
    _map.off('mousemove');
    if (_liveLine) { _map.removeLayer(_liveLine); _liveLine = null; }
    _map.getContainer().style.cursor = '';

    if (_linePoints.length >= 2) {
      _drawPolyline(_linePoints.slice(), toolType);
    }
    _linePoints = [];
  }

  // Circle tool state
  var _circleCenter = null;

  function _startCircleTool(toolType) {
    _circleCenter = null;
    _map.getContainer().style.cursor = 'crosshair';
    _map.once('click', function (e) {
      _circleCenter = e.latlng;
      _map.once('click', function (e2) {
        var radius = _circleCenter.distanceTo(e2.latlng);
        _drawCircle(_circleCenter, radius, toolType);
        _circleCenter = null;
        _map.getContainer().style.cursor = '';
      });
    });
  }

  // ── TOOL ACTIVATION ──
  function activateTool(toolType) {
    _deactivateCurrentTool();
    _activeTool = toolType;

    switch (toolType) {
      case 'attack-arrow':
      case 'defense-line':
      case 'front-line':
      case 'supply-route':
      case 'freehand':
        if (toolType === 'freehand') {
          _map.once('mousedown', _startFreehand);
        } else {
          _startLineTool(toolType);
        }
        break;
      case 'encircle':
      case 'naval-zone':
        _startCircleTool(toolType);
        break;
      case 'airstrike':
        _map.getContainer().style.cursor = 'crosshair';
        break;
      case 'delete':
        if (_selectedDrawing !== null) {
          removeDrawing(_selectedDrawing);
          _selectedDrawing = null;
        }
        break;
    }
  }

  function _deactivateCurrentTool() {
    if (_freehandActive) _cancelFreehand();
    _map.off('click');
    _map.off('dblclick');
    _map.off('mousemove');
    _map.off('mousedown');
    if (_liveLine) { _map.removeLayer(_liveLine); _liveLine = null; }
    _linePoints = [];
    _circleCenter = null;
    _map.getContainer().style.cursor = '';
    _activeTool = null;
  }

  function deactivateAll() {
    _deactivateCurrentTool();
    _deselectDrawing();
  }

  function removeDrawing(id) {
    var idx = _drawings.findIndex(function (d) { return d.id === id; });
    if (idx === -1) return;
    var d = _drawings[idx];
    _map.removeLayer(d.layer);
    if (d.arrow) _removeArrowhead(d.arrow);
    _drawings.splice(idx, 1);
    if (_selectedDrawing === id) _selectedDrawing = null;
  }

  function removeSelected() {
    if (_selectedDrawing !== null) {
      removeDrawing(_selectedDrawing);
    }
  }

  function clearAll() {
    _drawings.forEach(function (d) {
      _map.removeLayer(d.layer);
      if (d.arrow) _removeArrowhead(d.arrow);
    });
    _drawings = [];
    _selectedDrawing = null;
  }

  function serialize() {
    return _drawings.map(function (d) {
      var out = { id: d.id, tool: d.tool, type: d.type };
      if (d.type === 'polyline') {
        out.latlngs = d.latlngs.map(function (ll) {
          return [ll.lat !== undefined ? ll.lat : ll[0], ll.lng !== undefined ? ll.lng : ll[1]];
        });
      } else if (d.type === 'circle') {
        out.latlng = [d.latlng.lat, d.latlng.lng];
        out.radius = d.radius;
      } else if (d.type === 'airstrike') {
        out.latlng = [d.latlng.lat, d.latlng.lng];
      }
      return out;
    });
  }

  function deserialize(arr) {
    clearAll();
    arr.forEach(function (d) {
      if (d.type === 'polyline') {
        _drawPolyline(d.latlngs, d.tool);
      } else if (d.type === 'circle') {
        _drawCircle({ lat: d.latlng[0], lng: d.latlng[1] }, d.radius, d.tool);
      } else if (d.type === 'airstrike') {
        _drawAirstrike({ lat: d.latlng[0], lng: d.latlng[1] });
      }
    });
  }

  // Load drawings from scenario data format
  function loadScenarioDrawings(drawingsArr) {
    drawingsArr.forEach(function (d) {
      if (d.tool === 'airstrike') {
        _drawAirstrike(d.latlng || { lat: d.lat, lng: d.lng });
      } else if (d.type === 'circle' || d.tool === 'encircle' || d.tool === 'naval-zone') {
        var center = d.latlng || { lat: d.lat, lng: d.lng };
        _drawCircle(center, d.radius || 50000, d.tool || 'encircle');
      } else {
        _drawPolyline(d.latlngs, d.tool || 'attack-arrow');
      }
    });
  }

  function init(map) {
    _map = map;
    _drawLayer.addTo(_map);
    _setupLeafletDraw();
  }

  return {
    init: init,
    activateTool: activateTool,
    deactivateAll: deactivateAll,
    handleMapClick: handleMapClick,
    removeDrawing: removeDrawing,
    removeSelected: removeSelected,
    clearAll: clearAll,
    serialize: serialize,
    deserialize: deserialize,
    loadScenarioDrawings: loadScenarioDrawings,
  };

})();
