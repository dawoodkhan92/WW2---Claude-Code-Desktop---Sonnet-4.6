/* ═══════════════════════════════════════════════════
   FALL GELB — Invasion of France, 10 May 1940
   ═══════════════════════════════════════════════════ */

window.SCENARIO_FALL_GELB = {
  name: 'FALL GELB',
  subtitle: 'Invasion of France & Low Countries',
  date: '10 May 1940',
  description: 'The masterstroke of the Western campaign. Sichelschnitt (Manstein Plan): Army Group A drives Panzer divisions through the supposedly impassable Ardennes forest to the Channel, severing Allied forces in Belgium from France. Army Group B attacks into Belgium/Netherlands as a decoy. Army Group C pins the Maginot Line.',
  mapView: { center: [50.5, 5.0], zoom: 6 },

  units: [
    // ── Army Group A (Rundstedt) — Sichelschnitt ──
    { lat: 49.60, lng: 5.60,  type: 'armor',    nation: 'germany', label: 'Pz.Gruppe Kleist', notes: 'Kleist — 7 Panzer divisions through Ardennes. Guderian\'s XIX Pz. Corps leads' },
    { lat: 49.80, lng: 6.50,  type: 'armor',    nation: 'germany', label: 'XV Pz.Korps',       notes: 'Hoth — Rommel\'s 7th Panzer "Ghost Division" here' },
    { lat: 49.50, lng: 6.00,  type: 'infantry', nation: 'germany', label: '4. Armee',          notes: 'Kluge — follows armored spearhead, consolidates gains' },
    { lat: 49.40, lng: 5.00,  type: 'infantry', nation: 'germany', label: '12. Armee',         notes: 'List — southern flank protection for Ardennes thrust' },

    // ── Army Group B (Bock) — Decoy into Belgium ──
    { lat: 51.40, lng: 5.80,  type: 'armor',    nation: 'germany', label: 'XVI Pz.Korps',      notes: 'Hoepner — armored drive into Belgium, draws Allied reserves' },
    { lat: 52.20, lng: 6.00,  type: 'infantry', nation: 'germany', label: '18. Armee',         notes: 'Küchler — invades Netherlands' },
    { lat: 50.80, lng: 5.20,  type: 'infantry', nation: 'germany', label: '6. Armee',          notes: 'Reichenau — central Belgium, drives toward Brussels' },
    { lat: 50.90, lng: 5.70,  type: 'air_wing', nation: 'germany', label: 'Luftflotte 2',      notes: 'Air support Army Group B + Stuka close support' },
    { lat: 49.70, lng: 6.50,  type: 'air_wing', nation: 'germany', label: 'Luftflotte 3',      notes: 'Air support Army Group A' },

    // ── Army Group C (Leeb) — Maginot pin ──
    { lat: 48.80, lng: 7.50,  type: 'infantry', nation: 'germany', label: '1. Armee',          notes: 'Witzleben — pins Maginot Line from Rhine' },

    // ── Fallschirmjäger ──
    { lat: 50.85, lng: 5.68,  type: 'air_wing', nation: 'germany', label: 'FJR (Eben-Emael)',  notes: 'Glider assault captures "impregnable" fortress in 10 hours' },
    { lat: 52.10, lng: 4.60,  type: 'air_wing', nation: 'germany', label: 'Fallschirmjäger',   notes: 'Paratroops seize Rotterdam bridges, Dutch airfields' },

    // ── Allied Forces ──
    { lat: 50.50, lng: 3.20,  type: 'armor',    nation: 'france',  label: 'BEF (Gort)',        notes: 'British Expeditionary Force — 10 divisions, advances into Belgium (Plan D)' },
    { lat: 50.90, lng: 4.40,  type: 'armor',    nation: 'france',  label: '1ère Armée',        notes: 'Blanchard — best French armor rushes north into Belgium trap' },
    { lat: 50.20, lng: 3.80,  type: 'infantry', nation: 'france',  label: '9ème Armée',        notes: 'Corap — guards "impassable" Ardennes — thin line, no armor' },
    { lat: 48.90, lng: 7.20,  type: 'infantry', nation: 'france',  label: 'Maginot Garrison',  notes: 'Massive fortress garrison — impenetrable, but outflanked' },
    { lat: 51.00, lng: 4.50,  type: 'infantry', nation: 'uk',      label: 'Belgian Army',      notes: 'King Leopold III — 22 divisions defending Belgium' },
    { lat: 52.40, lng: 5.30,  type: 'infantry', nation: 'uk',      label: 'Dutch Army',        notes: 'Winkelman — Netherlands surrenders 15 May after Rotterdam bombing' },
  ],

  drawings: [
    // Sichelschnitt — the knife cut through Ardennes to the Channel
    { tool: 'attack-arrow', latlngs: [[49.60, 6.50], [49.60, 5.60], [49.90, 4.60], [50.50, 2.50]], color: '#cc2200', weight: 5 },
    // Rommel's 7th Panzer
    { tool: 'attack-arrow', latlngs: [[49.80, 6.50], [49.90, 5.50], [50.40, 3.00]], color: '#cc2200', weight: 3 },
    // Army Group B into Belgium (decoy)
    { tool: 'attack-arrow', latlngs: [[51.40, 6.20], [50.90, 4.40], [50.50, 3.20]], color: '#cc2200', weight: 3 },
    // Into Netherlands
    { tool: 'attack-arrow', latlngs: [[52.20, 6.80], [52.20, 5.20], [51.90, 4.50]], color: '#cc2200', weight: 3 },
    // Allied advance into Belgium (the trap)
    { tool: 'attack-arrow', latlngs: [[50.50, 3.20], [50.80, 4.40], [50.90, 5.00]], color: '#2d6a2d', weight: 3 },
    // Maginot Line (fortification)
    { tool: 'defense-line', latlngs: [[49.50, 6.10], [49.20, 6.80], [48.90, 7.30], [48.50, 7.50], [47.90, 7.50]], color: '#1a4a8a', weight: 4 },
    // Channel coast — where trapped Allies will be evacuated from Dunkirk
    { tool: 'naval-zone', latlng: [51.03, 2.37], radius: 30000, color: '#1a4a8a' },
  ]
};
