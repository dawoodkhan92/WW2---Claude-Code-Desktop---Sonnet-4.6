/* ═══════════════════════════════════════════════════════════
   UNITS.JS — Military Unit Placement & milsymbol Rendering
   ═══════════════════════════════════════════════════════════ */

var UnitsModule = (function () {

  var _map = null;
  var _units = [];          // array of { id, marker, data }
  var _nextId = 1;
  var _selectedUnit = null;
  var _pendingPlacement = null; // { nation, type } when placement mode is active

  // milsymbol SIDC codes by unit type
  // Format: SFGPUCI----D--- (Standard Identity + Battle Dimension + Function ID)
  var SIDC_MAP = {
    infantry:    { ground: 'SFGPUCI----D---', size: 'X' },  // X = Division
    armor:       { ground: 'SFGPUCV----D---', size: 'X' },
    motorized:   { ground: 'SFGPUCIM---D---', size: 'X' },
    artillery:   { ground: 'SFGPUCF----D---', size: 'X' },
    air_wing:    { ground: 'SFAPC------D---', size: 'F' },  // F = Flight
    naval_fleet: { ground: 'SFSPXF-----D---', size: 'T' },  // T = Task Force
    submarine:   { ground: 'SFSPXS-----D---', size: 'G' },  // G = Group
    hq:          { ground: 'SFGPU------D---', size: 'A' },  // A = Army
  };

  // Nation → affiliation symbol (milsymbol uses 'F' friend, 'H' hostile, 'N' neutral, 'U' unknown)
  var NATION_AFFILIATION = {
    germany: 'H', italy: 'H', japan: 'H', hungary: 'H', romania: 'H', bulgaria: 'H',
    uk: 'F', france: 'F', poland: 'F', usa: 'F', australia: 'F', canada: 'F',
    soviet: 'H',
    finland: 'N',
    china: 'F',
  };

  function _buildSIDC(type, nation) {
    var affil = NATION_AFFILIATION[nation] || 'U';
    var sidcBase = SIDC_MAP[type] ? SIDC_MAP[type].ground : 'SFGPUCI----D---';

    // Replace character at position 1 with affiliation
    // SIDC: S[affil]GPUCI----D---
    // pos:  0 1 2 3...
    return sidcBase[0] + affil + sidcBase.substring(2);
  }

  function _getFactionColor(nation) {
    var faction = FACTIONS[nation];
    return faction ? faction.fillColor : '#888888';
  }

  function _createMilsymbolIcon(type, nation, label) {
    var sidc = _buildSIDC(type, nation);
    var color = _getFactionColor(nation);

    try {
      var sym = new ms.Symbol(sidc, {
        size: 22,
        monoColor: '',
        colorMode: 'Light',
        infoSize: 60,
        infoColor: '#e8d87a',
        strokeWidth: 3,
      });
      var svgData = sym.asSVG();

      // Wrap SVG in a colored container
      var html = [
        '<div class="unit-marker" style="position:relative;width:44px;">',
        '<div style="background:' + color + ';border:2px solid rgba(255,255,255,0.3);border-radius:2px;padding:1px;">',
        svgData,
        '</div>',
        label ? '<div style="font-family:\'Oswald\',sans-serif;font-size:7px;letter-spacing:0.5px;color:#e8d87a;text-align:center;margin-top:1px;white-space:nowrap;overflow:hidden;max-width:44px;">' + label + '</div>' : '',
        '</div>'
      ].join('');

      return L.divIcon({
        className: '',
        html: html,
        iconSize: [44, label ? 42 : 32],
        iconAnchor: [22, label ? 42 : 32],
        popupAnchor: [0, -32],
      });
    } catch (e) {
      // Fallback: simple colored div if milsymbol fails
      return _fallbackIcon(type, nation, label, color);
    }
  }

  function _fallbackIcon(type, nation, label, color) {
    var typeLabels = {
      infantry: 'INF', armor: 'ARM', motorized: 'MOT', artillery: 'ARTY',
      air_wing: 'AIR', naval_fleet: 'NAVY', submarine: 'SUB', hq: 'HQ'
    };
    var shortLabel = typeLabels[type] || '?';

    var html = [
      '<div class="unit-marker" style="',
        'background:', color, ';',
        'border:2px solid rgba(255,255,255,0.4);',
        'border-radius:3px;',
        'padding:3px 5px;',
        'font-family:Oswald,sans-serif;',
        'font-size:9px;',
        'font-weight:700;',
        'color:#fff;',
        'text-align:center;',
        'min-width:32px;',
        'white-space:nowrap;',
        'box-shadow:0 2px 6px rgba(0,0,0,0.7);',
      '">',
      shortLabel,
      label ? '<div style="font-size:7px;opacity:0.8;overflow:hidden;max-width:40px;">' + label + '</div>' : '',
      '</div>'
    ].join('');

    return L.divIcon({
      className: '',
      html: html,
      iconSize: [44, 28],
      iconAnchor: [22, 28],
      popupAnchor: [0, -28],
    });
  }

  function _deselectAll() {
    if (_selectedUnit) {
      var el = _selectedUnit.marker.getElement();
      if (el) el.querySelector('.unit-marker').classList.remove('selected');
      _selectedUnit = null;
    }
    document.dispatchEvent(new Event('unit:deselected'));
  }

  function placeUnit(latlng, nation, type, label, notes) {
    label = label || (FACTIONS[nation] ? FACTIONS[nation].unitPrefix + ' ' + type : type);
    notes = notes || '';

    var icon   = _createMilsymbolIcon(type, nation, label);
    var marker = L.marker(latlng, {
      icon: icon,
      draggable: true,
      zIndexOffset: 100,
    }).addTo(_map);

    var id = _nextId++;
    var unitData = { id: id, nation: nation, type: type, label: label, notes: notes, latlng: latlng };

    marker.on('click', function (e) {
      L.DomEvent.stopPropagation(e);
      _deselectAll();
      _selectedUnit = { id: id, marker: marker, data: unitData };
      var el = marker.getElement();
      if (el) el.querySelector('.unit-marker').classList.add('selected');
      document.dispatchEvent(new CustomEvent('unit:selected', { detail: unitData }));
    });

    marker.on('contextmenu', function (e) {
      L.DomEvent.stopPropagation(e);
      _deselectAll();
      _selectedUnit = { id: id, marker: marker, data: unitData };
      document.dispatchEvent(new CustomEvent('unit:contextmenu', {
        detail: { unitData: unitData, x: e.originalEvent.clientX, y: e.originalEvent.clientY }
      }));
    });

    marker.on('dragend', function (e) {
      unitData.latlng = e.target.getLatLng();
    });

    _units.push({ id: id, marker: marker, data: unitData });
    return id;
  }

  function removeUnit(id) {
    var idx = _units.findIndex(function (u) { return u.id === id; });
    if (idx === -1) return;
    _map.removeLayer(_units[idx].marker);
    _units.splice(idx, 1);
    if (_selectedUnit && _selectedUnit.id === id) {
      _selectedUnit = null;
      document.dispatchEvent(new Event('unit:deselected'));
    }
  }

  function removeSelected() {
    if (_selectedUnit) {
      removeUnit(_selectedUnit.id);
    }
  }

  function getSelectedUnit() {
    return _selectedUnit ? _selectedUnit.data : null;
  }

  function updateUnitLabel(id, newLabel) {
    var unit = _units.find(function (u) { return u.id === id; });
    if (!unit) return;
    unit.data.label = newLabel;
    var newIcon = _createMilsymbolIcon(unit.data.type, unit.data.nation, newLabel);
    unit.marker.setIcon(newIcon);
  }

  function clearAll() {
    _units.forEach(function (u) { _map.removeLayer(u.marker); });
    _units = [];
    _selectedUnit = null;
  }

  function serialize() {
    return _units.map(function (u) {
      return {
        id: u.data.id,
        nation: u.data.nation,
        type: u.data.type,
        label: u.data.label,
        notes: u.data.notes,
        lat: u.data.latlng.lat !== undefined ? u.data.latlng.lat : u.data.latlng[0],
        lng: u.data.latlng.lng !== undefined ? u.data.latlng.lng : u.data.latlng[1],
      };
    });
  }

  function deserialize(arr) {
    clearAll();
    arr.forEach(function (u) {
      placeUnit({ lat: u.lat, lng: u.lng }, u.nation, u.type, u.label, u.notes);
    });
  }

  // Render preview icons in the unit palette sidebar
  function renderPalettePreviews(nation) {
    var types = ['infantry', 'armor', 'motorized', 'artillery', 'air_wing', 'naval_fleet', 'submarine', 'hq'];
    types.forEach(function (type) {
      var el = document.getElementById('prev-' + type);
      if (!el) return;
      var sidc = _buildSIDC(type, nation);
      try {
        var sym = new ms.Symbol(sidc, { size: 16, monoColor: '', colorMode: 'Light', strokeWidth: 2 });
        el.innerHTML = sym.asSVG();
      } catch (e) {
        var typeAbbr = { infantry:'INF',armor:'ARM',motorized:'MOT',artillery:'ARTY',air_wing:'AIR',naval_fleet:'NAV',submarine:'SUB',hq:'HQ' };
        el.innerHTML = '<span style="font-size:8px;color:#c4a44a;">' + (typeAbbr[type]||'?') + '</span>';
      }
    });
  }

  function setActivePlacement(nation, type) {
    _pendingPlacement = { nation: nation, type: type };
  }

  function clearActivePlacement() {
    _pendingPlacement = null;
  }

  function getPendingPlacement() {
    return _pendingPlacement;
  }

  function init(map) {
    _map = map;
  }

  return {
    init: init,
    placeUnit: placeUnit,
    removeUnit: removeUnit,
    removeSelected: removeSelected,
    getSelectedUnit: getSelectedUnit,
    updateUnitLabel: updateUnitLabel,
    clearAll: clearAll,
    serialize: serialize,
    deserialize: deserialize,
    renderPalettePreviews: renderPalettePreviews,
    setActivePlacement: setActivePlacement,
    clearActivePlacement: clearActivePlacement,
    getPendingPlacement: getPendingPlacement,
    deselectAll: _deselectAll,
  };

})();
