/* ═══════════════════════════════════════════════════════════
   APP.JS — Entry Point, AppState, Module Wiring
   WAR ROOM — Pre-War Strategic Planning Map 1938
   ═══════════════════════════════════════════════════════════ */

var AppModule = (function () {

  // ── NOTIFICATION SYSTEM ──
  var _notifEl = null;
  var _notifTimeout = null;

  function notify(msg, type) {
    type = type || 'info';
    if (!_notifEl) {
      _notifEl = document.createElement('div');
      _notifEl.className = 'notification';
      document.body.appendChild(_notifEl);
    }
    _notifEl.className = 'notification notification-' + type;
    _notifEl.textContent = msg;
    clearTimeout(_notifTimeout);
    // Force reflow for transition
    void _notifEl.offsetWidth;
    _notifEl.classList.add('show');
    _notifTimeout = setTimeout(function () {
      _notifEl.classList.remove('show');
    }, 2600);
  }

  // ── MODAL SYSTEM ──
  function showModal(title, bodyHTML, buttons) {
    var overlay = document.getElementById('modal-overlay');
    var mTitle  = document.getElementById('modal-title');
    var mBody   = document.getElementById('modal-body');
    var mActs   = document.getElementById('modal-actions');
    if (!overlay) return;

    mTitle.textContent  = title;
    mBody.innerHTML     = bodyHTML;
    mActs.innerHTML     = '';

    buttons.forEach(function (btnDef) {
      var btn = document.createElement('button');
      btn.className   = 'modal-btn ' + (btnDef.cls || '');
      btn.textContent = btnDef.label;
      btn.addEventListener('click', function () {
        hideModal();
        if (btnDef.action) btnDef.action();
      });
      mActs.appendChild(btn);
    });

    overlay.style.display = 'flex';
  }

  function hideModal() {
    var overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.style.display = 'none';
  }

  // ── CONTEXT MENU ──
  var _ctxUnitData = null;

  function _showContextMenu(x, y, unitData) {
    _ctxUnitData = unitData;
    var menu = document.getElementById('context-menu');
    if (!menu) return;
    menu.style.left    = x + 'px';
    menu.style.top     = y + 'px';
    menu.style.display = 'block';
  }

  function _hideContextMenu() {
    var menu = document.getElementById('context-menu');
    if (menu) menu.style.display = 'none';
    _ctxUnitData = null;
  }

  // ── TOOL STATE ──
  var _activeTool = null;

  function _setActiveTool(toolName) {
    // Toggle off if clicking same tool
    if (_activeTool === toolName && toolName !== 'select') {
      _clearActiveTool();
      return;
    }

    _clearActiveTool();
    _activeTool = toolName;

    // Update button states
    document.querySelectorAll('.tool-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.tool === toolName);
    });

    // Activate drawing or selection
    if (toolName === 'select') {
      UnitsModule.clearActivePlacement();
      DrawingModule.deactivateAll();
      document.getElementById('place-hint').className = 'place-unit-hint';
    } else if (toolName === 'delete') {
      UnitsModule.clearActivePlacement();
      DrawingModule.deactivateAll();
      // Delete selected unit OR selected drawing
      UnitsModule.removeSelected();
      DrawingModule.removeSelected();
      _clearActiveTool();
    } else {
      // Drawing tool
      UnitsModule.clearActivePlacement();
      DrawingModule.activateTool(toolName);
      document.getElementById('place-hint').className = 'place-unit-hint';
      document.getElementById('place-hint').textContent = 'Drawing: ' + toolName.replace('-', ' ') + '. Double-click to finish.';
    }
  }

  function _clearActiveTool() {
    _activeTool = null;
    document.querySelectorAll('.tool-btn').forEach(function (btn) {
      btn.classList.remove('active');
    });
    DrawingModule.deactivateAll();
    UnitsModule.clearActivePlacement();
    document.getElementById('place-hint').className = 'place-unit-hint';
    document.getElementById('place-hint').textContent = 'Click a unit above, then click the map to place it.';
  }

  // ── TOOLBAR BUTTON WIRING ──
  function _initToolbar() {
    document.querySelectorAll('.tool-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        _setActiveTool(btn.dataset.tool);
      });
    });

    // Action buttons
    document.getElementById('btn-save').addEventListener('click', function () { StorageModule.save(); });
    document.getElementById('btn-load').addEventListener('click', function () { StorageModule.load(); });
    document.getElementById('btn-clear').addEventListener('click', function () { StorageModule.clear(); });
    document.getElementById('btn-export').addEventListener('click', function () { ExportModule.exportPNG(); });
  }

  // ── UNIT PALETTE WIRING ──
  function _initUnitPalette() {
    var nationSelect = document.getElementById('unit-nation');
    var pendingNation = nationSelect ? nationSelect.value : 'germany';

    // Render previews on load
    if (typeof UnitsModule !== 'undefined') {
      UnitsModule.renderPalettePreviews(pendingNation);
    }

    if (nationSelect) {
      nationSelect.addEventListener('change', function () {
        UnitsModule.renderPalettePreviews(this.value);
        // If a unit type is already selected, update pending placement nation
        if (UnitsModule.getPendingPlacement()) {
          UnitsModule.setActivePlacement(this.value, UnitsModule.getPendingPlacement().type);
        }
      });
    }

    document.querySelectorAll('.unit-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var type   = btn.dataset.type;
        var nation = nationSelect ? nationSelect.value : 'germany';

        // Toggle active state
        var alreadyActive = btn.classList.contains('active');
        document.querySelectorAll('.unit-btn').forEach(function (b) { b.classList.remove('active'); });

        if (!alreadyActive) {
          btn.classList.add('active');
          UnitsModule.setActivePlacement(nation, type);
          DrawingModule.deactivateAll();
          _clearActiveTool();

          var hint = document.getElementById('place-hint');
          hint.className = 'place-unit-hint active';
          hint.textContent = 'Click on the map to place ' + type.replace('_', ' ') + '. Press ESC to cancel.';
        } else {
          UnitsModule.clearActivePlacement();
          var hint = document.getElementById('place-hint');
          hint.className = 'place-unit-hint';
          hint.textContent = 'Click a unit above, then click the map to place it.';
        }
      });
    });
  }

  // ── SCENARIO BUTTONS ──
  function _initScenarioButtons() {
    document.querySelectorAll('.scenario-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        ScenariosModule.loadScenario(btn.dataset.scenario);
      });
    });
  }

  // ── CONTEXT MENU WIRING ──
  function _initContextMenu() {
    document.getElementById('ctx-edit').addEventListener('click', function () {
      if (!_ctxUnitData) return;
      var unitData = _ctxUnitData;
      _hideContextMenu();
      showModal(
        'EDIT DESIGNATION',
        '<div class="modal-field">' +
          '<label class="modal-field-label">UNIT DESIGNATION</label>' +
          '<input class="modal-input" id="modal-unit-label" value="' + (unitData.label || '') + '" maxlength="40" />' +
        '</div>',
        [
          {
            label: 'CONFIRM', cls: 'modal-btn-primary',
            action: function () {
              var newLabel = document.getElementById('modal-unit-label');
              if (newLabel) UnitsModule.updateUnitLabel(unitData.id, newLabel.value.trim());
            }
          },
          { label: 'CANCEL', cls: '', action: null }
        ]
      );
      setTimeout(function () {
        var inp = document.getElementById('modal-unit-label');
        if (inp) { inp.focus(); inp.select(); }
      }, 50);
    });

    document.getElementById('ctx-info').addEventListener('click', function () {
      if (!_ctxUnitData) return;
      _hideContextMenu();
      document.dispatchEvent(new CustomEvent('unit:selected', { detail: _ctxUnitData }));
    });

    document.getElementById('ctx-delete').addEventListener('click', function () {
      if (!_ctxUnitData) return;
      var id = _ctxUnitData.id;
      _hideContextMenu();
      UnitsModule.removeUnit(id);
      SidebarModule.hideUnitPanel();
    });
  }

  // ── MODAL CLOSE ──
  function _initModalClose() {
    document.getElementById('modal-overlay').addEventListener('click', function (e) {
      if (e.target === this) hideModal();
    });
  }

  // ── MAP CLICK HANDLER ──
  function _onMapClick(e) {
    _hideContextMenu();

    var pending = UnitsModule.getPendingPlacement();
    if (pending) {
      var nationSelect = document.getElementById('unit-nation');
      var nation = pending.nation || (nationSelect ? nationSelect.value : 'germany');
      UnitsModule.placeUnit(e.latlng, nation, pending.type, null, '');
      // Keep placement mode active for rapid placement
      return;
    }

    // Pass to drawing module
    DrawingModule.handleMapClick(e.latlng);
  }

  // ── KEYBOARD SHORTCUTS ──
  function _initKeyboard() {
    document.addEventListener('keydown', function (e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'Escape':
          _clearActiveTool();
          document.querySelectorAll('.unit-btn').forEach(function (b) { b.classList.remove('active'); });
          UnitsModule.clearActivePlacement();
          _hideContextMenu();
          break;
        case 'Delete':
        case 'Backspace':
          UnitsModule.removeSelected();
          DrawingModule.removeSelected();
          break;
        case 's':
          if (e.ctrlKey || e.metaKey) { e.preventDefault(); StorageModule.save(); }
          break;
        case '1': _setActiveTool('attack-arrow');  break;
        case '2': _setActiveTool('defense-line');  break;
        case '3': _setActiveTool('front-line');     break;
        case '4': _setActiveTool('supply-route');   break;
        case '5': _setActiveTool('encircle');       break;
        case '6': _setActiveTool('naval-zone');     break;
        case '7': _setActiveTool('airstrike');      break;
        case '8': _setActiveTool('freehand');       break;
      }
    });
  }

  // ── UNIT EVENTS ──
  function _initUnitEvents() {
    document.addEventListener('unit:contextmenu', function (e) {
      _showContextMenu(e.detail.x, e.detail.y, e.detail.unitData);
    });

    // Hide context menu on map click
    document.addEventListener('click', function () { _hideContextMenu(); });
  }

  // ── BOOT SEQUENCE ──
  function init() {
    // 1. Initialize map
    var map = MapModule.init();

    // 2. Initialize units and drawing on top of map
    UnitsModule.init(map);
    DrawingModule.init(map);

    // 3. Attach map click handler
    map.on('click', _onMapClick);

    // 4. Wire up all UI
    _initToolbar();
    _initUnitPalette();
    _initScenarioButtons();
    _initContextMenu();
    _initModalClose();
    _initKeyboard();
    _initUnitEvents();

    // 5. Initialize sidebar (events, ticker)
    SidebarModule.init();

    // 6. Welcome notification after GeoJSON loads
    document.addEventListener('map:geojson:loaded', function () {
      notify('War Room operational. Click any territory for intel.', 'info');
    });

    // Set initial active tool
    document.querySelector('[data-tool="select"]').classList.add('active');
  }

  return {
    init: init,
    notify: notify,
    showModal: showModal,
    hideModal: hideModal,
  };

})();

// ── BOOT ──
document.addEventListener('DOMContentLoaded', function () {
  AppModule.init();
});
