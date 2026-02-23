/* ═══════════════════════════════════════════════════════════
   SIDEBAR.JS — Country Info, Unit Info, Faction Legend, Ticker
   ═══════════════════════════════════════════════════════════ */

var SidebarModule = (function () {

  var FACTION_BADGE_COLORS = {
    'Axis':           { bg: '#3a0808', border: '#6b1212', text: '#ff8888' },
    'Japan':          { bg: '#3a1a00', border: '#8b4500', text: '#ffaa66' },
    'Allies':         { bg: '#0a1e0a', border: '#2d4a1e', text: '#88cc88' },
    'Soviet':         { bg: '#3a0808', border: '#7a1c1c', text: '#ff8888' },
    'USA':            { bg: '#08122a', border: '#1c3a6b', text: '#8899ff' },
    'British Empire': { bg: '#1a0e00', border: '#5c3d1e', text: '#cc9966' },
    'French Empire':  { bg: '#1a1a00', border: '#4a4a1a', text: '#cccc66' },
    'Neutral':        { bg: '#1a1a0a', border: '#5c5c38', text: '#cccc88' },
    'Contested':      { bg: '#1a1a1a', border: '#3a3a3a', text: '#999999' },
  };

  function _renderCountryInfo(name, props) {
    var data = COUNTRIES_1938[name];
    var panel = document.getElementById('country-info-content');
    if (!panel) return;

    if (!data) {
      // Try partial match
      var keys = Object.keys(COUNTRIES_1938);
      var match = keys.find(function (k) { return name.toLowerCase().indexOf(k.toLowerCase()) !== -1 || k.toLowerCase().indexOf(name.toLowerCase()) !== -1; });
      if (match) { data = COUNTRIES_1938[match]; }
    }

    if (!data) {
      // Show minimal info from GeoJSON properties
      var subjecto = props.SUBJECTO || props.subjecto || '';
      panel.innerHTML =
        '<div class="intel-country-name">' + name + '</div>' +
        (subjecto ? '<div class="intel-value" style="margin-bottom:8px;">Subject of: ' + subjecto + '</div>' : '') +
        '<div class="intel-placeholder">No detailed intelligence available for this territory.</div>';
      return;
    }

    var bColors = FACTION_BADGE_COLORS[data.faction] || FACTION_BADGE_COLORS['Contested'];

    panel.innerHTML =
      '<div class="intel-country-name">' + name + '</div>' +
      '<div class="intel-faction-badge" style="background:' + bColors.bg + ';border:1px solid ' + bColors.border + ';color:' + bColors.text + ';">' + (data.faction || 'Unknown').toUpperCase() + '</div>' +
      '<div class="intel-divider"></div>' +

      '<div class="intel-row"><span class="intel-label">LEADER</span><span class="intel-value">' + (data.leader || '—') + '</span></div>' +
      '<div class="intel-row"><span class="intel-label">GOVT</span><span class="intel-value">' + (data.government || '—') + '</span></div>' +
      '<div class="intel-row"><span class="intel-label">CAPITAL</span><span class="intel-value">' + (data.capital || '—') + '</span></div>' +
      '<div class="intel-row"><span class="intel-label">POPULATION</span><span class="intel-value">' + (data.population || '—') + '</span></div>' +

      '<div class="intel-divider"></div>' +

      '<div class="intel-row"><span class="intel-label">ARMY</span><span class="intel-value">' + (data.armyStrength || '—') + '</span></div>' +
      '<div class="intel-row"><span class="intel-label">NAVY</span><span class="intel-value">' + (data.navy || '—') + '</span></div>' +
      '<div class="intel-row"><span class="intel-label">AIR</span><span class="intel-value">' + (data.airForce || '—') + '</span></div>' +

      '<div class="intel-divider"></div>' +

      '<div class="intel-note">' + (data.historicalNote || '') + '</div>';
  }

  function _renderUnitInfo(unitData) {
    var panel    = document.getElementById('unit-panel');
    var content  = document.getElementById('unit-info-content');
    if (!panel || !content) return;

    panel.style.display = 'block';

    var faction = FACTIONS[unitData.nation];
    var color   = faction ? faction.fillColor : '#888';

    content.innerHTML =
      '<div class="intel-country-name" style="font-size:0.9rem;">' + (unitData.label || unitData.type) + '</div>' +
      '<div class="intel-divider"></div>' +
      '<div class="intel-row"><span class="intel-label">NATION</span><span class="intel-value" style="color:' + color + ';">' + (faction ? faction.fullName : unitData.nation) + '</span></div>' +
      '<div class="intel-row"><span class="intel-label">FACTION</span><span class="intel-value">' + (faction ? faction.faction : '—') + '</span></div>' +
      '<div class="intel-row"><span class="intel-label">TYPE</span><span class="intel-value">' + unitData.type.replace('_', ' ').toUpperCase() + '</span></div>' +
      (unitData.notes ? '<div class="intel-divider"></div><div class="intel-note">' + unitData.notes + '</div>' : '');
  }

  function hideUnitPanel() {
    var panel = document.getElementById('unit-panel');
    if (panel) panel.style.display = 'none';
  }

  function initTicker() {
    var track = document.getElementById('ticker-track');
    if (!track || !window.HISTORICAL_EVENTS) return;

    var html = '';
    var events = HISTORICAL_EVENTS.concat(HISTORICAL_EVENTS); // duplicate for seamless loop
    events.forEach(function (ev) {
      html += '<span class="ticker-item"><span class="ticker-date">' + ev.date + '</span><span class="ticker-separator"> — </span>' + ev.text + '</span>';
    });
    track.innerHTML = html;
  }

  function init() {
    // Country selection event
    document.addEventListener('country:selected', function (e) {
      _renderCountryInfo(e.detail.name, e.detail.feature);
    });

    // Unit selection event
    document.addEventListener('unit:selected', function (e) {
      _renderUnitInfo(e.detail);
    });

    // Unit deselection
    document.addEventListener('unit:deselected', function () {
      hideUnitPanel();
    });

    // Start ticker
    initTicker();
  }

  return {
    init: init,
    hideUnitPanel: hideUnitPanel,
  };

})();
