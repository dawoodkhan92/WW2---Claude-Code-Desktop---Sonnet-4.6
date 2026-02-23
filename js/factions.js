/* ═══════════════════════════════════════════════════════════
   FACTIONS.JS — Nation identity, colors, milsymbol SIDC codes
   ═══════════════════════════════════════════════════════════ */

var FACTIONS = {

  // ── AXIS POWERS ──
  germany: {
    label: 'Germany',
    fullName: 'Deutsches Reich',
    faction: 'Axis',
    fillColor: '#6b1212',
    borderColor: '#9a1a1a',
    affiliation: 'HO', // Hostile (milsymbol - Enemy)
    flagColor: '#cc0000',
    unitPrefix: 'Wehrmacht',
    sidc: {
      infantry:     'SFGPUCI----D---',
      armor:        'SFGPUCVF---D---',
      motorized:    'SFGPUCIM---D---',
      artillery:    'SFGPUCF----D---',
      air_wing:     'SFAPC------D---',
      naval_fleet:  'SFSPXF-----D---',
      submarine:    'SFSPSUB----D---',
      hq:           'SFGPUH-----D---',
    }
  },

  italy: {
    label: 'Italy',
    fullName: 'Regno d\'Italia',
    faction: 'Axis',
    fillColor: '#6b1212',
    borderColor: '#9a1a1a',
    affiliation: 'HO',
    flagColor: '#009246',
    unitPrefix: 'Regio Esercito',
    sidc: {
      infantry:     'SFGPUCI----D---',
      armor:        'SFGPUCVF---D---',
      motorized:    'SFGPUCIM---D---',
      artillery:    'SFGPUCF----D---',
      air_wing:     'SFAPC------D---',
      naval_fleet:  'SFSPXF-----D---',
      submarine:    'SFSPSUB----D---',
      hq:           'SFGPUH-----D---',
    }
  },

  japan: {
    label: 'Japan',
    fullName: 'Dai-Nippon Teikoku',
    faction: 'Japan',
    fillColor: '#8b4500',
    borderColor: '#bb5500',
    affiliation: 'HO',
    flagColor: '#bc002d',
    unitPrefix: 'IJA',
    sidc: {
      infantry:     'SFGPUCI----D---',
      armor:        'SFGPUCVF---D---',
      motorized:    'SFGPUCIM---D---',
      artillery:    'SFGPUCF----D---',
      air_wing:     'SFAPC------D---',
      naval_fleet:  'SFSPXF-----D---',
      submarine:    'SFSPSUB----D---',
      hq:           'SFGPUH-----D---',
    }
  },

  hungary: {
    label: 'Hungary',
    fullName: 'Magyar Királyság',
    faction: 'Axis',
    fillColor: '#6b1212',
    borderColor: '#9a1a1a',
    affiliation: 'HO',
    flagColor: '#ce2939',
    unitPrefix: 'Honvédség',
    sidc: { infantry:'SFGPUCI----D---', armor:'SFGPUCVF---D---', motorized:'SFGPUCIM---D---', artillery:'SFGPUCF----D---', air_wing:'SFAPC------D---', naval_fleet:'SFSPXF-----D---', submarine:'SFSPSUB----D---', hq:'SFGPUH-----D---' }
  },

  romania: {
    label: 'Romania',
    fullName: 'Regatul României',
    faction: 'Axis',
    fillColor: '#6b1212',
    borderColor: '#9a1a1a',
    affiliation: 'HO',
    flagColor: '#002B7F',
    unitPrefix: 'Armata Română',
    sidc: { infantry:'SFGPUCI----D---', armor:'SFGPUCVF---D---', motorized:'SFGPUCIM---D---', artillery:'SFGPUCF----D---', air_wing:'SFAPC------D---', naval_fleet:'SFSPXF-----D---', submarine:'SFSPSUB----D---', hq:'SFGPUH-----D---' }
  },

  // ── WESTERN ALLIES ──
  uk: {
    label: 'United Kingdom',
    fullName: 'British Empire',
    faction: 'Allies',
    fillColor: '#2d4a1e',
    borderColor: '#3d6a2e',
    affiliation: 'FR',  // Friend
    flagColor: '#012169',
    unitPrefix: 'British Army',
    sidc: {
      infantry:     'SFGPUCI----D---',
      armor:        'SFGPUCVF---D---',
      motorized:    'SFGPUCIM---D---',
      artillery:    'SFGPUCF----D---',
      air_wing:     'SFAPC------D---',
      naval_fleet:  'SFSPXF-----D---',
      submarine:    'SFSPSUB----D---',
      hq:           'SFGPUH-----D---',
    }
  },

  france: {
    label: 'France',
    fullName: 'République Française',
    faction: 'Allies',
    fillColor: '#2d4a1e',
    borderColor: '#3d6a2e',
    affiliation: 'FR',
    flagColor: '#002395',
    unitPrefix: 'Armée de Terre',
    sidc: { infantry:'SFGPUCI----D---', armor:'SFGPUCVF---D---', motorized:'SFGPUCIM---D---', artillery:'SFGPUCF----D---', air_wing:'SFAPC------D---', naval_fleet:'SFSPXF-----D---', submarine:'SFSPSUB----D---', hq:'SFGPUH-----D---' }
  },

  poland: {
    label: 'Poland',
    fullName: 'Rzeczpospolita Polska',
    faction: 'Allies',
    fillColor: '#2d4a1e',
    borderColor: '#3d6a2e',
    affiliation: 'FR',
    flagColor: '#DC143C',
    unitPrefix: 'Wojsko Polskie',
    sidc: { infantry:'SFGPUCI----D---', armor:'SFGPUCVF---D---', motorized:'SFGPUCIM---D---', artillery:'SFGPUCF----D---', air_wing:'SFAPC------D---', naval_fleet:'SFSPXF-----D---', submarine:'SFSPSUB----D---', hq:'SFGPUH-----D---' }
  },

  // ── USA ──
  usa: {
    label: 'United States',
    fullName: 'United States of America',
    faction: 'USA',
    fillColor: '#1c3a6b',
    borderColor: '#2a4a8b',
    affiliation: 'FR',
    flagColor: '#B22234',
    unitPrefix: 'US Army',
    sidc: { infantry:'SFGPUCI----D---', armor:'SFGPUCVF---D---', motorized:'SFGPUCIM---D---', artillery:'SFGPUCF----D---', air_wing:'SFAPC------D---', naval_fleet:'SFSPXF-----D---', submarine:'SFSPSUB----D---', hq:'SFGPUH-----D---' }
  },

  // ── SOVIET UNION ──
  soviet: {
    label: 'Soviet Union',
    fullName: 'Союз Советских Социалистических Республик',
    faction: 'Soviet',
    fillColor: '#7a1c1c',
    borderColor: '#aa2c2c',
    affiliation: 'HO',
    flagColor: '#CC0000',
    unitPrefix: 'RKKA',
    sidc: { infantry:'SFGPUCI----D---', armor:'SFGPUCVF---D---', motorized:'SFGPUCIM---D---', artillery:'SFGPUCF----D---', air_wing:'SFAPC------D---', naval_fleet:'SFSPXF-----D---', submarine:'SFSPSUB----D---', hq:'SFGPUH-----D---' }
  },

  // ── MINOR / NEUTRAL ──
  finland: {
    label: 'Finland',
    fullName: 'Suomen Tasavalta',
    faction: 'Neutral',
    fillColor: '#4a5c38',
    borderColor: '#5a7a4a',
    affiliation: 'UN',
    flagColor: '#003580',
    unitPrefix: 'Finnish Army',
    sidc: { infantry:'SFGPUCI----D---', armor:'SFGPUCVF---D---', motorized:'SFGPUCIM---D---', artillery:'SFGPUCF----D---', air_wing:'SFAPC------D---', naval_fleet:'SFSPXF-----D---', submarine:'SFSPSUB----D---', hq:'SFGPUH-----D---' }
  },

  china: {
    label: 'Nationalist China',
    fullName: 'Zhonghua Minguo',
    faction: 'Allies',
    fillColor: '#2d4a1e',
    borderColor: '#3d6a2e',
    affiliation: 'FR',
    flagColor: '#FE0000',
    unitPrefix: 'Guominjun',
    sidc: { infantry:'SFGPUCI----D---', armor:'SFGPUCVF---D---', motorized:'SFGPUCIM---D---', artillery:'SFGPUCF----D---', air_wing:'SFAPC------D---', naval_fleet:'SFSPXF-----D---', submarine:'SFSPSUB----D---', hq:'SFGPUH-----D---' }
  },
};

// Nation color map for quick lookup (used by MapModule)
var FACTION_COLORS = {
  'Axis':           '#6b1212',
  'Japan':          '#8b4500',
  'Allies':         '#2d4a1e',
  'USA':            '#1c3a6b',
  'Soviet':         '#7a1c1c',
  'British Empire': '#5c3d1e',
  'French Empire':  '#4a4a1a',
  'Neutral':        '#5c5c38',
  'Contested':      '#3a3a3a',
};
