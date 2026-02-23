/* ═══════════════════════════════════════════════════
   WESERÜBUNG — Invasion of Norway & Denmark
   9 April 1940
   ═══════════════════════════════════════════════════ */

window.SCENARIO_WESERUBUNG = {
  name: 'WESERÜBUNG',
  subtitle: 'Norway & Denmark',
  date: '9 April 1940',
  description: 'A daring combined-arms operation. Germany simultaneously occupies Denmark (capitulates in hours) and seizes key Norwegian ports from Narvik in the north to Oslo in the south. Naval groups land troops under Royal Navy\'s nose. Air power and surprise prove decisive over Allied counter-landings.',
  mapView: { center: [63.0, 11.0], zoom: 5 },

  units: [
    // ── Denmark ──
    { lat: 55.67, lng: 12.57, type: 'infantry',    nation: 'germany', label: 'XXXI Korps',      notes: 'Kaupisch — Denmark occupied within 6 hours, minimal resistance' },

    // ── Norway Naval Groups ──
    { lat: 59.91, lng: 10.75, type: 'naval_fleet', nation: 'germany', label: 'Oslo Group',      notes: 'Kümmetz — Blücher sunk in Oslofjord by Norwegian fortress. Oslo taken from air.' },
    { lat: 58.97, lng: 5.73,  type: 'naval_fleet', nation: 'germany', label: 'Stavanger Group', notes: 'Falkenhorst — seize Sola airfield for Luftwaffe. Critical air base.' },
    { lat: 60.39, lng: 5.33,  type: 'naval_fleet', nation: 'germany', label: 'Bergen Group',    notes: '6 warships land troops. Königsberg damaged by coastal batteries.' },
    { lat: 62.74, lng: 7.16,  type: 'naval_fleet', nation: 'germany', label: 'Åndalsnes Grp',   notes: 'Smaller group — central Norway.' },
    { lat: 63.43, lng: 10.40, type: 'naval_fleet', nation: 'germany', label: 'Trondheim Group', notes: 'Hipper + 4 destroyers — key central port and airfield.' },
    { lat: 68.44, lng: 17.43, type: 'naval_fleet', nation: 'germany', label: 'Narvik Group',    notes: '10 destroyers — iron ore port. Both German destroyers lost in subsequent battles.' },

    // ── Luftwaffe ──
    { lat: 58.97, lng: 5.73,  type: 'air_wing',    nation: 'germany', label: 'X. Fliegerkorps', notes: 'Maritime anti-shipping. Sinks HMS Glorious. Dominates Norwegian skies.' },
    { lat: 59.91, lng: 10.75, type: 'air_wing',    nation: 'germany', label: 'Fallschirmjäger', notes: 'Paratroops seize Oslo/Stavanger airfields on Day 1. First mass combat drop.' },

    // ── Allied Counter-landings ──
    { lat: 68.44, lng: 17.43, type: 'naval_fleet', nation: 'uk',     label: 'Home Fleet Grp',  notes: 'Forbes — destroyers attack Narvik twice, sink all German destroyers' },
    { lat: 62.47, lng: 6.15,  type: 'infantry',    nation: 'uk',     label: 'Sickleforce',     notes: 'British/Polish/French land at Åndalsnes & Namsos — forced to evacuate' },
    { lat: 68.00, lng: 14.50, type: 'infantry',    nation: 'uk',     label: 'Rupertforce',     notes: 'Allied force at Narvik — briefly recaptures town before evacuating' },
    { lat: 62.50, lng: 7.40,  type: 'infantry',    nation: 'uk',     label: 'Mauriceforce',    notes: 'Namsos landing — Allied withdrawal May 1940' },

    // ── Norwegian Army ──
    { lat: 61.50, lng: 9.00,  type: 'infantry',    nation: 'finland', label: 'Norwegian Army', notes: 'Ruge — fighting retreat northward. King Haakon escapes to London.' },
  ],

  drawings: [
    // Naval approach to Oslo
    { tool: 'attack-arrow', latlngs: [[56.50, 10.50], [58.00, 10.20], [59.91, 10.75]], color: '#1a4a8a', weight: 3 },
    // Naval approach to Bergen
    { tool: 'attack-arrow', latlngs: [[55.50, 6.00], [57.50, 5.50], [60.39, 5.33]], color: '#1a4a8a', weight: 3 },
    // Naval approach to Trondheim
    { tool: 'attack-arrow', latlngs: [[56.00, 5.50], [59.00, 5.00], [63.43, 10.40]], color: '#1a4a8a', weight: 3 },
    // Long naval approach to Narvik
    { tool: 'attack-arrow', latlngs: [[56.00, 6.00], [61.00, 8.00], [66.00, 13.00], [68.44, 17.43]], color: '#1a4a8a', weight: 3 },
    // British counter to Narvik
    { tool: 'attack-arrow', latlngs: [[62.00, 4.00], [65.00, 8.00], [68.44, 17.43]], color: '#2d6a2d', weight: 3 },
    // Naval zone around Narvik (contested waters)
    { tool: 'naval-zone', latlng: [68.44, 17.43], radius: 100000, color: '#1a4a8a' },
    // Norwegian front line (retreating north)
    { tool: 'front-line', latlngs: [[59.91, 10.75], [61.00, 9.50], [62.50, 9.00], [64.00, 13.00]], color: '#8c7840', weight: 2 },
  ]
};
