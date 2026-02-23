/* ═══════════════════════════════════════════════════════════
   STORAGE.JS — localStorage Save / Load / Clear
   ═══════════════════════════════════════════════════════════ */

var StorageModule = (function () {

  var STORAGE_KEY = 'warroom_plan_v1';

  function save() {
    try {
      var payload = {
        version:  1,
        savedAt:  new Date().toISOString(),
        scenario: ScenariosModule.getActive(),
        units:    UnitsModule.serialize(),
        drawings: DrawingModule.serialize(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      AppModule.notify('Plan saved', 'success');
      return true;
    } catch (e) {
      AppModule.notify('Save failed: ' + e.message, 'error');
      return false;
    }
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        AppModule.notify('No saved plan found', 'warning');
        return false;
      }
      var payload = JSON.parse(raw);
      if (!payload || payload.version !== 1) {
        AppModule.notify('Saved plan format incompatible', 'error');
        return false;
      }

      UnitsModule.clearAll();
      DrawingModule.clearAll();

      if (payload.units)    UnitsModule.deserialize(payload.units);
      if (payload.drawings) DrawingModule.deserialize(payload.drawings);

      var dateStr = payload.savedAt ? new Date(payload.savedAt).toLocaleString() : '';
      AppModule.notify('Plan loaded' + (dateStr ? ' (' + dateStr + ')' : ''), 'success');
      return true;
    } catch (e) {
      AppModule.notify('Load failed: ' + e.message, 'error');
      return false;
    }
  }

  function clear() {
    AppModule.showModal(
      'CLEAR ALL ANNOTATIONS',
      'This will remove all placed units and drawn overlays from the map.<br><br>Your saved plan in storage will not be affected.',
      [
        {
          label: 'CLEAR ALL',
          cls: 'modal-btn-danger',
          action: function () {
            UnitsModule.clearAll();
            DrawingModule.clearAll();
            document.querySelectorAll('.scenario-btn').forEach(function (b) { b.classList.remove('active'); });
            var stamp = document.getElementById('map-date-stamp');
            if (stamp) stamp.textContent = 'SEPTEMBER 1938 — PRE-WAR STRATEGIC SITUATION';
            AppModule.notify('All annotations cleared', 'info');
          }
        },
        { label: 'CANCEL', cls: '', action: null }
      ]
    );
  }

  return { save: save, load: load, clear: clear };

})();
