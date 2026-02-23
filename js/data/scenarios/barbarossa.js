/* ═══════════════════════════════════════════════════
   BARBAROSSA — Invasion of USSR, 22 June 1941
   ═══════════════════════════════════════════════════ */

window.SCENARIO_BARBAROSSA = {
  name: 'BARBAROSSA',
  subtitle: 'Invasion of the Soviet Union',
  date: '22 June 1941',
  description: 'The largest military operation in history: 3.8 million Axis troops attack along a 2,900 km front. Three Army Groups strike simultaneously toward Leningrad (North), Moscow (Centre), and Kiev/Caucasus (South). The Red Army, decimated by Stalin\'s purges, is caught unprepared. Four million Soviet soldiers will be captured in 1941 alone.',
  mapView: { center: [52.0, 32.0], zoom: 5 },

  units: [
    // ── Army Group North (Leeb) ──
    { lat: 55.80, lng: 22.50, type: 'infantry', nation: 'germany', label: '18. Armee',         notes: 'Küchler — Baltic states coastal axis toward Leningrad' },
    { lat: 55.70, lng: 24.00, type: 'armor',    nation: 'germany', label: '4.Pz.Gruppe',       notes: 'Hoepner — armored thrust toward Leningrad via Pskov' },
    { lat: 55.20, lng: 23.00, type: 'infantry', nation: 'germany', label: '16. Armee',         notes: 'Busch — inland axis, Novgorod direction' },
    { lat: 55.70, lng: 22.50, type: 'air_wing', nation: 'germany', label: 'Luftflotte 1',      notes: 'Air support Army Group North' },

    // ── Army Group Centre (Bock) ──
    { lat: 54.60, lng: 25.30, type: 'armor',    nation: 'germany', label: '3.Pz.Gruppe',       notes: 'Hoth — northern pincer, encirclement at Minsk' },
    { lat: 53.90, lng: 27.56, type: 'armor',    nation: 'germany', label: '2.Pz.Gruppe',       notes: 'Guderian — southern pincer to Minsk, then Smolensk, then Moscow' },
    { lat: 54.60, lng: 26.00, type: 'infantry', nation: 'germany', label: '9. Armee',          notes: 'Strauss — follows Army Group Centre northern pincer' },
    { lat: 53.10, lng: 26.00, type: 'infantry', nation: 'germany', label: '4. Armee',          notes: 'Kluge — follows Guderian\'s southern pincer' },
    { lat: 53.90, lng: 27.56, type: 'air_wing', nation: 'germany', label: 'Luftflotte 2',      notes: 'Kesselring — destroys VVS on ground on Day 1. 1,800 Soviet aircraft.' },

    // ── Army Group South (Rundstedt) ──
    { lat: 50.45, lng: 30.52, type: 'armor',    nation: 'germany', label: '1.Pz.Gruppe',       notes: 'Kleist — armored fist toward Kiev and the Dnieper' },
    { lat: 50.80, lng: 28.00, type: 'infantry', nation: 'germany', label: '6. Armee',          notes: 'Reichenau — Kiev axis main force' },
    { lat: 49.44, lng: 26.99, type: 'infantry', nation: 'germany', label: '17. Armee',         notes: 'Stülpnagel — Galician axis through Lvov' },
    { lat: 47.90, lng: 31.99, type: 'infantry', nation: 'germany', label: '11. Armee',         notes: 'Schobert — Romanian axis, Odessa, Crimea objective' },
    { lat: 49.00, lng: 29.00, type: 'air_wing', nation: 'germany', label: 'Luftflotte 4',      notes: 'Löhr — air support Army Group South' },

    // ── Axis allies on southern flank ──
    { lat: 47.50, lng: 28.00, type: 'infantry', nation: 'romania', label: '3ª Armata ROM',     notes: 'Dumitrescu — Romanian 3rd Army, Odessa sector' },
    { lat: 47.00, lng: 29.00, type: 'infantry', nation: 'romania', label: '4ª Armata ROM',     notes: 'Ciupercă — Romanian 4th Army, crossing the Prut' },
    { lat: 47.80, lng: 18.50, type: 'infantry', nation: 'hungary', label: 'Mobile Corps HUN',  notes: 'Werth — Hungarian rapid corps, Carpathian axis' },

    // ── Soviet Fronts (surprised, disorganized) ──
    { lat: 57.50, lng: 28.00, type: 'infantry', nation: 'soviet',  label: 'NW Front',          notes: 'Kuznetsov — catastrophic losses, northern sector. Nearly encircled.' },
    { lat: 54.00, lng: 30.00, type: 'infantry', nation: 'soviet',  label: 'W Front',           notes: 'Pavlov — encircled at Minsk with 400,000 men. Executed for failure.' },
    { lat: 51.00, lng: 33.00, type: 'infantry', nation: 'soviet',  label: 'SW Front',          notes: 'Kirponos — largest Soviet force, massive Kiev encirclement Sep 1941' },
    { lat: 48.50, lng: 32.00, type: 'infantry', nation: 'soviet',  label: 'S Front',           notes: 'Tyulenev — southern Ukraine defense, Odessa' },
  ],

  drawings: [
    // Army Group North — toward Leningrad
    { tool: 'attack-arrow', latlngs: [[55.70, 24.00], [57.50, 28.00], [59.00, 30.50], [59.90, 30.32]], color: '#cc2200', weight: 4 },
    // Army Group Centre — northern pincer (Hoth)
    { tool: 'attack-arrow', latlngs: [[54.60, 25.30], [54.80, 28.00], [54.80, 32.00]], color: '#cc2200', weight: 4 },
    // Army Group Centre — southern pincer (Guderian)
    { tool: 'attack-arrow', latlngs: [[53.90, 27.56], [53.50, 31.00], [54.80, 32.00]], color: '#cc2200', weight: 4 },
    // Arrow toward Moscow (ultimate objective)
    { tool: 'attack-arrow', latlngs: [[54.80, 32.00], [55.75, 37.62]], color: '#cc2200', weight: 3 },
    // Army Group South — toward Kiev
    { tool: 'attack-arrow', latlngs: [[50.45, 30.52], [50.45, 34.00], [51.00, 36.00]], color: '#cc2200', weight: 4 },
    // Southern push toward Odessa/Crimea
    { tool: 'attack-arrow', latlngs: [[47.90, 29.00], [47.00, 31.00], [46.50, 32.00]], color: '#cc2200', weight: 3 },
    // Initial front line (Molotov-Ribbentrop border, 22 June 1941)
    { tool: 'front-line', latlngs: [[55.70, 21.10], [54.50, 23.50], [53.50, 24.00], [52.00, 23.70], [50.50, 24.00], [48.50, 26.30], [46.50, 30.50]], color: '#8b3300', weight: 3 },
    // Stalin Line (old Soviet defense line, largely abandoned)
    { tool: 'defense-line', latlngs: [[56.00, 30.00], [54.00, 29.00], [51.00, 28.50], [48.50, 28.00]], color: '#7a1c1c', weight: 2 },
  ]
};
