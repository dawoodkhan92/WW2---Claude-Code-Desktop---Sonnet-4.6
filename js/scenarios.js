/* ═══════════════════════════════════════════════════════════
   SCENARIOS.JS — Historical Scenario Loader
   ═══════════════════════════════════════════════════════════ */

var ScenariosModule = (function () {

  var _activeScenario = null;

  var SCENARIO_MAP = {
    'case-white':  function () { return window.SCENARIO_CASE_WHITE;  },
    'fall-gelb':   function () { return window.SCENARIO_FALL_GELB;   },
    'weserubung':  function () { return window.SCENARIO_WESERUBUNG;  },
    'barbarossa':  function () { return window.SCENARIO_BARBAROSSA;  },
  };

  function loadScenario(key) {
    var getter = SCENARIO_MAP[key];
    if (!getter) {
      AppModule.notify('Unknown scenario: ' + key, 'error');
      return;
    }
    var scenario = getter();
    if (!scenario) {
      AppModule.notify('Scenario data not found', 'error');
      return;
    }

    // Confirm if there are existing annotations
    var confirmLoad = function () {
      _applyScenario(key, scenario);
    };

    AppModule.showModal(
      'LOAD SCENARIO',
      '<span class="scenario-confirm-name">' + scenario.name + '</span><br>' +
      scenario.subtitle + '<br><br>' +
      '<div class="scenario-confirm-details">' +
        '<span class="scenario-confirm-label">DATE</span>' +
        '<span class="scenario-confirm-value">' + scenario.date + '</span>' +
        '<span class="scenario-confirm-label">BRIEFING</span>' +
        '<span class="scenario-confirm-value">' + scenario.description.substring(0, 180) + '...</span>' +
      '</div><br>' +
      '<em style="color:var(--color-text-muted);font-size:0.7rem;">This will clear your current annotations.</em>',
      [
        { label: 'CONFIRM', cls: 'modal-btn-primary', action: confirmLoad },
        { label: 'CANCEL',  cls: '',                  action: null },
      ]
    );
  }

  function _applyScenario(key, scenario) {
    // Clear current state
    UnitsModule.clearAll();
    DrawingModule.clearAll();

    // Update UI
    document.querySelectorAll('.scenario-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.scenario === key);
    });

    // Update date stamp
    var stamp = document.getElementById('map-date-stamp');
    if (stamp) stamp.textContent = scenario.date.toUpperCase() + ' — ' + scenario.name;

    _activeScenario = key;

    // Fly to scenario view
    if (scenario.mapView) {
      MapModule.flyTo(scenario.mapView.center, scenario.mapView.zoom);
    }

    // Place units
    if (scenario.units) {
      scenario.units.forEach(function (u) {
        UnitsModule.placeUnit(
          { lat: u.lat, lng: u.lng },
          u.nation,
          u.type,
          u.label || u.designation || '',
          u.notes || ''
        );
      });
    }

    // Load drawings
    if (scenario.drawings) {
      DrawingModule.loadScenarioDrawings(scenario.drawings);
    }

    AppModule.notify(scenario.name + ' loaded', 'success');
  }

  function getActive() { return _activeScenario; }

  return {
    loadScenario: loadScenario,
    getActive: getActive,
  };

})();
