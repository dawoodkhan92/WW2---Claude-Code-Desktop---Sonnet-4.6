/* ═══════════════════════════════════════════════════════════
   EXPORT.JS — PNG Map Export via html2canvas
   ═══════════════════════════════════════════════════════════ */

var ExportModule = (function () {

  function exportPNG() {
    if (typeof html2canvas === 'undefined') {
      AppModule.notify('Export library not loaded', 'error');
      return;
    }

    AppModule.notify('Preparing export...', 'info');

    var mapContainer = document.getElementById('map-container');
    html2canvas(mapContainer, {
      useCORS:    true,
      allowTaint: false,
      logging:    false,
      scale:      window.devicePixelRatio || 1,
      backgroundColor: '#0d0d0b',
    }).then(function (canvas) {
      // Add watermark text
      var ctx = canvas.getContext('2d');
      ctx.font = 'bold 13px "Oswald", sans-serif';
      ctx.fillStyle = 'rgba(196, 164, 74, 0.6)';
      ctx.textAlign = 'right';
      ctx.fillText('WAR ROOM — STRATEGIC PLANNING MAP 1938', canvas.width - 12, canvas.height - 12);

      // Download
      var link = document.createElement('a');
      var timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
      link.download = 'warroom-plan-' + timestamp + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      AppModule.notify('Map exported as PNG', 'success');
    }).catch(function (err) {
      AppModule.notify('Export failed: ' + err.message, 'error');
    });
  }

  return { exportPNG: exportPNG };

})();
