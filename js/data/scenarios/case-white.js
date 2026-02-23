/* ═══════════════════════════════════════════════════
   CASE WHITE — Invasion of Poland, 1 September 1939
   ═══════════════════════════════════════════════════ */

window.SCENARIO_CASE_WHITE = {
  name: 'CASE WHITE',
  subtitle: 'Invasion of Poland',
  date: '1 September 1939',
  description: 'Blitzkrieg opens the Second World War. Army Group North (Bock) attacks from Pomerania and East Prussia; Army Group South (Rundstedt) from Silesia and Slovakia. The twin pincers close on Warsaw. On 17 September, the USSR invades from the east.',
  mapView: { center: [52.0, 21.0], zoom: 6 },

  units: [
    // ── Army Group North ──
    { lat: 53.42, lng: 18.55, type: 'armor',    nation: 'germany', label: '4. Armee',        notes: 'Kluge — Pomeranian axis, cuts Polish Corridor' },
    { lat: 54.37, lng: 18.64, type: 'infantry', nation: 'germany', label: '3. Armee',        notes: 'Küchler — East Prussia, strike south toward Warsaw' },
    { lat: 54.10, lng: 18.20, type: 'armor',    nation: 'germany', label: 'XIX Pz.Korps',    notes: 'Guderian — armored spearhead, East Prussia' },
    { lat: 53.78, lng: 20.49, type: 'air_wing', nation: 'germany', label: 'Luftflotte 1',    notes: 'Air support Army Group North, strikes Polish airfields' },

    // ── Army Group South ──
    { lat: 50.30, lng: 19.10, type: 'armor',    nation: 'germany', label: '10. Armee',       notes: 'Reichenau — main armored thrust, Silesian axis' },
    { lat: 49.80, lng: 18.70, type: 'infantry', nation: 'germany', label: '8. Armee',        notes: 'Blaskowitz — Łódź axis, flank guard' },
    { lat: 50.06, lng: 21.00, type: 'infantry', nation: 'germany', label: '14. Armee',       notes: 'List — Galician axis, drives from Slovakia' },
    { lat: 51.10, lng: 17.00, type: 'air_wing', nation: 'germany', label: 'Luftflotte 4',    notes: 'Air support Army Group South' },

    // ── Polish Armies ──
    { lat: 52.23, lng: 21.01, type: 'infantry', nation: 'poland',  label: 'Armia Łódź',     notes: 'Rómmel — central sector, Warsaw axis' },
    { lat: 53.13, lng: 23.16, type: 'infantry', nation: 'poland',  label: 'Armia Modlin',   notes: 'Przedrzymirski — northern sector' },
    { lat: 50.26, lng: 19.02, type: 'infantry', nation: 'poland',  label: 'Armia Kraków',   notes: 'Szylling — southern sector, Silesian border' },
    { lat: 51.77, lng: 19.46, type: 'infantry', nation: 'poland',  label: 'Armia Poznań',   notes: 'Kutrzeba — exposed western salient' },
    { lat: 51.40, lng: 16.90, type: 'infantry', nation: 'poland',  label: 'Armia Prusy',    notes: 'Dąb-Biernacki — strategic reserve, delayed mobilization' },
    { lat: 54.35, lng: 18.65, type: 'naval_fleet', nation: 'poland', label: 'Flotylla Pinska', notes: 'River monitors evacuated to Britain pre-war (Plan Peking)' },

    // ── Soviet entry 17 Sep ──
    { lat: 52.10, lng: 27.50, type: 'infantry', nation: 'soviet',  label: 'Byelorussian Frnt', notes: 'Kovalev — enters 17 Sep from east per Ribbentrop protocols' },
    { lat: 49.80, lng: 26.50, type: 'infantry', nation: 'soviet',  label: 'Ukrainian Front',   notes: 'Timoshenko — enters from southeastern Poland' },
  ],

  drawings: [
    // Army Group North thrust south
    { tool: 'attack-arrow', latlngs: [[53.42, 18.55], [52.80, 19.80], [52.23, 21.01]], color: '#cc2200', weight: 4 },
    // East Prussia pincer
    { tool: 'attack-arrow', latlngs: [[54.10, 18.20], [53.50, 20.50], [52.50, 21.00]], color: '#cc2200', weight: 3 },
    // Army Group South main thrust
    { tool: 'attack-arrow', latlngs: [[50.30, 19.10], [51.10, 20.50], [52.23, 21.01]], color: '#cc2200', weight: 4 },
    // List's army from Slovakia
    { tool: 'attack-arrow', latlngs: [[50.06, 21.00], [50.90, 21.60], [51.80, 22.50]], color: '#cc2200', weight: 3 },
    // Initial Polish front line
    { tool: 'front-line', latlngs: [[54.35, 18.65], [53.00, 18.00], [52.00, 16.90], [51.00, 18.20], [50.30, 19.00], [49.80, 20.50], [49.40, 21.80]], color: '#8c7840', weight: 3 },
    // Soviet invasion from east
    { tool: 'attack-arrow', latlngs: [[52.10, 27.50], [52.00, 24.00], [52.00, 21.80]], color: '#aa2020', weight: 3 },
    { tool: 'attack-arrow', latlngs: [[49.80, 26.50], [50.20, 24.00], [51.00, 22.50]], color: '#aa2020', weight: 3 },
  ]
};
