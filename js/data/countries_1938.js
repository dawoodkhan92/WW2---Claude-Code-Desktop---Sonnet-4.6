/* ═══════════════════════════════════════════════════════════
   COUNTRIES_1938.JS — Country Intelligence Data
   Circa September 1938 (Post-Anschluss, Post-Munich)
   GeoJSON NAME field must match geoJSONName for lookup
   ═══════════════════════════════════════════════════════════ */

var COUNTRIES_1938 = {

  // ═══ AXIS POWERS ═══

  "Germany": {
    faction: "Axis",
    fillColor: "#6b1212",
    leader: "Adolf Hitler",
    government: "National Socialist Dictatorship (NSDAP)",
    capital: "Berlin",
    population: "79.4 million",
    armyStrength: "Wehrmacht: 36 divisions (peacetime), 103+ on mobilization",
    navy: "Kriegsmarine: 2 battleships, 3 armored ships, 57 U-boats",
    airForce: "Luftwaffe: ~3,300 aircraft (world's most modern)",
    historicalNote: "Post-Anschluss (March 1938). Sudetenland annexed October 1938 via Munich Agreement. Planning Case White (Poland invasion). Four-Year Plan under Göring accelerating rearmament.",
    allies: ["Italy", "Japan"],
    atWarWith: [],
    geoJSONName: "Germany"
  },

  "Italy": {
    faction: "Axis",
    fillColor: "#6b1212",
    leader: "Benito Mussolini",
    government: "National Fascist Dictatorship (PNF)",
    capital: "Rome",
    population: "42.5 million",
    armyStrength: "Regio Esercito: ~300,000 active (combat-depleted from Ethiopia)",
    navy: "Regia Marina: 6 battleships, 7 heavy cruisers, 115 submarines",
    airForce: "Regia Aeronautica: ~2,800 aircraft",
    historicalNote: "Ethiopia conquered 1936. Intervened in Spanish Civil War supporting Franco. Rome-Berlin Axis (1936). Pact of Steel with Germany signed May 1939.",
    allies: ["Germany", "Japan"],
    atWarWith: [],
    geoJSONName: "Italy"
  },

  "Japan": {
    faction: "Japan",
    fillColor: "#8b4500",
    leader: "Emperor Hirohito / PM Fumimaro Konoe",
    government: "Constitutional Monarchy / Military Oligarchy",
    capital: "Tokyo",
    population: "72 million (home islands)",
    armyStrength: "Imperial Japanese Army: ~950,000 active, engaged in China",
    navy: "Imperial Japanese Navy: 10 battleships, 6 fleet carriers (world's finest)",
    airForce: "IJAAF & IJNAF: ~2,700 aircraft, Zero under development",
    historicalNote: "Second Sino-Japanese War ongoing since July 1937. Nanking Massacre December 1937. Occupying large swaths of coastal China. Anti-Comintern Pact with Germany (1936).",
    allies: ["Germany", "Italy"],
    atWarWith: ["China"],
    geoJSONName: "Japan"
  },

  "Hungary": {
    faction: "Axis",
    fillColor: "#6b1212",
    leader: "Miklós Horthy",
    government: "Authoritarian Monarchy (Regent)",
    capital: "Budapest",
    population: "9.1 million",
    armyStrength: "Honvédség: ~80,000 active",
    navy: "Danube River Flotilla only",
    airForce: "Magyar Légierő: ~350 aircraft",
    historicalNote: "Revisionist state seeking to recover territories lost in Treaty of Trianon (1920). Received southern Slovakia in First Vienna Award (November 1938). Joining Axis alignment.",
    allies: ["Germany", "Italy"],
    atWarWith: [],
    geoJSONName: "Hungary"
  },

  "Romania": {
    faction: "Axis",
    fillColor: "#6b1212",
    leader: "King Carol II",
    government: "Royal Dictatorship",
    capital: "Bucharest",
    population: "19.5 million",
    armyStrength: "Armata Română: ~400,000 (mobilized)",
    navy: "Small Danube/Black Sea force",
    airForce: "Aeronautica Regală Română: ~600 aircraft",
    historicalNote: "Rich Ploiesti oil fields make Romania strategically vital. Under pressure from both Germany and USSR. Will formally join Axis in 1940.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Romania"
  },

  // ═══ WESTERN ALLIES ═══

  "United Kingdom": {
    faction: "Allies",
    fillColor: "#2d4a1e",
    leader: "Neville Chamberlain",
    government: "Parliamentary Constitutional Monarchy",
    capital: "London",
    population: "47.5 million (home islands) / 531 million (Empire)",
    armyStrength: "British Regular Army: ~220,000. BEF planned for France",
    navy: "Royal Navy: 15 battleships, 7 carriers — world's largest fleet",
    airForce: "Royal Air Force: ~1,750 aircraft, Hurricane in service, Spitfire entering",
    historicalNote: "Appeasement policy under Chamberlain. Munich Agreement signatory. 'Peace for our time.' Empire at maximum extent. Rearmament accelerating. Guaranteeing Poland after March 1939.",
    allies: ["France"],
    atWarWith: [],
    geoJSONName: "United Kingdom"
  },

  "France": {
    faction: "Allies",
    fillColor: "#2d4a1e",
    leader: "Édouard Daladier",
    government: "Third Republic (Parliamentary)",
    capital: "Paris",
    population: "41.2 million",
    armyStrength: "Armée de Terre: ~900,000 active, Maginot Line fortified",
    navy: "Marine Nationale: 7 battleships, 1 carrier, strong submarine force",
    airForce: "Armée de l'Air: ~1,400 aircraft (qualitatively inferior to Luftwaffe)",
    historicalNote: "Maginot Line completed along German border. Munich Agreement signatory. Defensive strategy prevails. Colonial empire spans Africa, Indochina, Syria. Mutual alliance with UK.",
    allies: ["United Kingdom"],
    atWarWith: [],
    geoJSONName: "France"
  },

  "Poland": {
    faction: "Allies",
    fillColor: "#2d4a1e",
    leader: "Ignacy Mościcki / Marshal Edward Rydz-Śmigły",
    government: "Sanacja Authoritarian Republic",
    capital: "Warsaw",
    population: "35 million",
    armyStrength: "Wojsko Polskie: ~280,000 active (capable of mobilizing 1M+)",
    navy: "Marynarka Wojenna: 4 destroyers, 5 submarines",
    airForce: "Lotnictwo Wojskowe: ~400 aircraft (outdated PZL fighters)",
    historicalNote: "Exposed strategic position between Germany and USSR. Non-aggression pact with Germany (1934) expires 1944. British and French guarantees of independence (March 1939). Case White — Germany's invasion plan — already drafted.",
    allies: ["United Kingdom", "France"],
    atWarWith: [],
    geoJSONName: "Poland"
  },

  "Czechoslovakia": {
    faction: "Allies",
    fillColor: "#2d4a1e",
    leader: "Edvard Beneš",
    government: "Parliamentary Republic",
    capital: "Prague",
    population: "15 million",
    armyStrength: "Czechoslovak Army: 35 divisions with excellent fortifications",
    navy: "None",
    airForce: "~600 aircraft",
    historicalNote: "Sudetenland (3.5M Germans) ceded to Germany October 1938 at Munich. Rump state dismembered March 1939. Bohemia/Moravia becomes German Protectorate. Slovakia becomes puppet state.",
    allies: ["France"],
    atWarWith: [],
    geoJSONName: "Czechoslovakia"
  },

  "Greece": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "Ioannis Metaxas",
    government: "4th of August Regime (Authoritarian)",
    capital: "Athens",
    population: "7.2 million",
    armyStrength: "Hellenic Army: ~100,000 active",
    navy: "Hellenic Navy: modest fleet, some capable destroyers",
    airForce: "Hellenic Air Force: ~150 aircraft",
    historicalNote: "Metaxas dictatorship since 1936. Strategically vital Mediterranean position. Will resist Italian invasion October 1940 — famously ('OXI Day').",
    allies: [],
    atWarWith: [],
    geoJSONName: "Greece"
  },

  "Yugoslavia": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "Prince Regent Paul",
    government: "Regency (Kingdom of Yugoslavia)",
    capital: "Belgrade",
    population: "15.7 million",
    armyStrength: "Royal Yugoslav Army: ~350,000 on mobilization",
    navy: "Small Adriatic force",
    airForce: "~350 aircraft",
    historicalNote: "Internally divided by ethnic tensions (Serbs, Croats, Slovenes). Trying to remain neutral between Axis and Allies. Will eventually be pressured to join Tripartite Pact (March 1941) causing coup and German invasion.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Yugoslavia"
  },

  "Bulgaria": {
    faction: "Axis",
    fillColor: "#6b1212",
    leader: "Tsar Boris III",
    government: "Royal Authoritarian",
    capital: "Sofia",
    population: "6.3 million",
    armyStrength: "Bulgarian Army: ~100,000 active",
    navy: "Minimal Black Sea force",
    airForce: "~200 aircraft",
    historicalNote: "Revisionist state seeking territories lost in Balkan Wars/WWI. Gravitating toward Germany. Will join Tripartite Pact in 1941.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Bulgaria"
  },

  "Turkey": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "Mustafa Kemal Atatürk (d. Nov 1938) / İsmet İnönü",
    government: "Republic (Single-party CHP)",
    capital: "Ankara",
    population: "17.4 million",
    armyStrength: "Turkish Armed Forces: ~150,000",
    navy: "Modest fleet, controls Bosphorus/Dardanelles",
    airForce: "~500 aircraft",
    historicalNote: "Controls vital Bosphorus strait. Atatürk dies November 1938. Turkey maintains neutrality playing both sides. Anglo-French-Turkish mutual assistance pact 1939.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Turkey"
  },

  "Spain": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "Francisco Franco (Nationalists) / Manuel Azaña (Republic)",
    government: "Civil War — Nationalists vs. Republic",
    capital: "Madrid (contested)",
    population: "25.8 million",
    armyStrength: "Nationalist: ~600,000 / Republican: ~450,000 (both exhausted)",
    navy: "Split between factions",
    airForce: "German Condor Legion (Nationalist), Soviet advisors (Republic)",
    historicalNote: "Civil War ongoing. Nationalist forces closing in on Barcelona. War ends April 1939 with Franco's victory. Picasso's Guernica painted in response to 1937 Condor Legion bombing. Both Germany/Italy vs. USSR using Spain as testing ground.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Spain"
  },

  "Sweden": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "Per Albin Hansson",
    government: "Constitutional Monarchy (Social Democrat)",
    capital: "Stockholm",
    population: "6.3 million",
    armyStrength: "Swedish Armed Forces: ~75,000",
    navy: "Swedish Navy: coastal defense focus",
    airForce: "~200 aircraft",
    historicalNote: "Strategically positioned with vast iron ore deposits vital to German war machine (shipped via Narvik). Determined to maintain strict neutrality. Will walk a tightrope throughout the war.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Sweden"
  },

  "Norway": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "Johan Nygaardsvold",
    government: "Constitutional Monarchy (Labour)",
    capital: "Oslo",
    population: "2.9 million",
    armyStrength: "Norwegian Army: ~15,000 active",
    navy: "Royal Norwegian Navy: capable destroyers and submarines",
    airForce: "~100 aircraft",
    historicalNote: "Long coastline critical for iron ore shipping from Narvik to Germany. Committed pacifist-leaning government. Invaded by Germany April 1940 (Operation Weserübung). Allied counter-landings fail.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Norway"
  },

  "Denmark": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "Thorvald Stauning",
    government: "Constitutional Monarchy (Social Democrat)",
    capital: "Copenhagen",
    population: "3.8 million",
    armyStrength: "Danish Army: ~15,000 (symbolic)",
    navy: "Small coastal force",
    airForce: "~50 aircraft",
    historicalNote: "Occupied by Germany April 1940 in a single day with minimal resistance. Remained relatively autonomous under German occupation initially.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Denmark"
  },

  "Netherlands": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "Queen Wilhelmina / Hendrikus Colijn",
    government: "Constitutional Monarchy",
    capital: "Amsterdam / The Hague",
    population: "8.7 million",
    armyStrength: "Royal Netherlands Army: ~280,000 (mobilized)",
    navy: "Royal Netherlands Navy: significant colonial fleet",
    airForce: "~150 aircraft",
    historicalNote: "Vast Dutch East Indies (Indonesia) enormously wealthy in rubber and oil. Hoping to maintain WWI-style neutrality. Invaded May 1940. Rotterdam bombed into submission. Government escapes to London.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Netherlands"
  },

  "Belgium": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "King Leopold III / Paul-Henri Spaak",
    government: "Constitutional Monarchy",
    capital: "Brussels",
    population: "8.4 million",
    armyStrength: "Belgian Army: ~650,000 (mobilized), Eben-Emael fortress",
    navy: "Minimal",
    airForce: "~180 aircraft",
    historicalNote: "Strategically crucial: gateway between France and Germany. Reverted to strict neutrality in 1936. Allied war plans (Plan D) hinge on entering Belgium when Germany attacks. Invaded May 1940.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Belgium"
  },

  "Switzerland": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "Philipp Etter",
    government: "Federal Republic",
    capital: "Bern",
    population: "4.2 million",
    armyStrength: "Swiss Army: ~450,000 (mobilized, Alpine defense)",
    navy: "None",
    airForce: "~90 aircraft",
    historicalNote: "Permanently neutral since 1815. Surrounded by Axis by 1940 but never invaded. National Reduit alpine fortress strategy. Important banking and diplomatic hub throughout war.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Switzerland"
  },

  // ═══ SOVIET UNION ═══

  "Russia": {
    faction: "Soviet",
    fillColor: "#7a1c1c",
    leader: "Josef Stalin",
    government: "Soviet Communist Party (All-Union)",
    capital: "Moscow",
    population: "168 million",
    armyStrength: "Red Army: ~1.5 million active (post-Great Purge). Decimated officer corps.",
    navy: "Soviet Navy: 3 fleets but limited blue-water capability",
    airForce: "VVS: ~5,000+ aircraft but outdated design",
    historicalNote: "Great Purge of military (1937-38) executed 3 of 5 Marshals, 13 of 15 Army Commanders. Officially neutral but seeking security. Molotov-Ribbentrop Pact August 1939 with secret protocols partitioning Eastern Europe. Invaded Finland November 1939.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Russia"
  },

  // ═══ UNITED STATES ═══

  "United States of America": {
    faction: "USA",
    fillColor: "#1c3a6b",
    leader: "Franklin D. Roosevelt",
    government: "Federal Constitutional Republic",
    capital: "Washington D.C.",
    population: "130 million",
    armyStrength: "US Army: ~185,000 (17th largest in world — peacetime isolationism)",
    navy: "US Navy: 15 battleships, 5 carriers — world's second largest fleet",
    airForce: "US Army Air Corps: ~1,700 aircraft",
    historicalNote: "Isolationist public opinion. Neutrality Acts prevent arms sales to belligerents. Roosevelt quietly sympathizes with Allies. Lend-Lease will be enacted March 1941. Pearl Harbor December 1941 ends isolation. Currently: watching from the sidelines.",
    allies: [],
    atWarWith: [],
    geoJSONName: "United States of America"
  },

  // ═══ CHINA ═══

  "China": {
    faction: "Allies",
    fillColor: "#2d4a1e",
    leader: "Chiang Kai-shek",
    government: "Republic (KMT Nationalist)",
    capital: "Chongqing (wartime) / Nanjing (nominal)",
    population: "517 million",
    armyStrength: "Guominjun: ~1.7 million active but poorly equipped, also CCP forces",
    navy: "Minimal — river gunboats only",
    airForce: "ROCAF: ~600 aircraft (many losses)",
    historicalNote: "Engaged in full-scale war with Japan since July 1937. Nanjing occupied and massacred December 1937. Fighting two enemies simultaneously: Japan and CCP (Mao Zedong). Desperate for foreign aid. USSR and USA both secretly supplying arms.",
    allies: [],
    atWarWith: ["Japan"],
    geoJSONName: "China"
  },

  // ═══ IMPERIAL TERRITORIES ═══

  "British India": {
    faction: "British Empire",
    fillColor: "#5c3d1e",
    leader: "Lord Linlithgow (Viceroy)",
    government: "British Crown Colony / Dominion",
    capital: "New Delhi",
    population: "350 million",
    armyStrength: "British Indian Army: ~190,000 (largest volunteer army in history by 1945)",
    navy: "Royal Indian Navy: small",
    airForce: "Royal Indian Air Force: forming",
    historicalNote: "Jewel of the British Empire. Congress Party demands independence; imprisoned under Gandhi's civil disobedience. Will declare war on Germany alongside Britain. Indian soldiers serve in all theaters. Independence movement grows throughout war.",
    allies: ["United Kingdom"],
    atWarWith: [],
    geoJSONName: "British India"
  },

  "French Indochina": {
    faction: "French Empire",
    fillColor: "#4a4a1a",
    leader: "Governor-General Jules Brévié",
    government: "French Colonial Administration",
    capital: "Saigon",
    population: "23 million",
    armyStrength: "French Colonial Forces: ~40,000",
    navy: "River gunboats",
    airForce: "Small contingent",
    historicalNote: "Rich rubber and rice-producing colony. Vital to French imperial economy. Japan will pressure Vichy France to allow basing rights 1940, then full occupation 1941. Ho Chi Minh organizing resistance.",
    allies: ["France"],
    atWarWith: [],
    geoJSONName: "French Indochina"
  },

  "Manchukuo": {
    faction: "Japan",
    fillColor: "#8b4500",
    leader: "Emperor Puyi (puppet)",
    government: "Japanese Puppet State",
    capital: "Hsinking (Changchun)",
    population: "43 million",
    armyStrength: "Manchukuo Imperial Army: ~100,000 (under IJA control)",
    navy: "River forces",
    airForce: "Small puppet force",
    historicalNote: "Established 1932 after Japanese conquest of Manchuria. Last Qing Emperor Puyi installed as puppet. Major industrial base for Japanese war machine. Site of Nomonhan Incident (1939) — Soviet-Japanese border war where Zhukov defeats Japan.",
    allies: ["Japan"],
    atWarWith: [],
    geoJSONName: "Manchukuo"
  },

  "Korea": {
    faction: "Japan",
    fillColor: "#8b4500",
    leader: "Governor-General Minami Jiro",
    government: "Japanese Colonial Administration",
    capital: "Keijo (Seoul)",
    population: "24 million",
    armyStrength: "Japanese garrison forces",
    navy: "Japanese naval facilities",
    airForce: "Japanese air bases",
    historicalNote: "Annexed by Japan 1910. Koreans subjected to forced labor, cultural suppression, and military conscription. Used as major logistics base for Japanese operations in China.",
    allies: ["Japan"],
    atWarWith: [],
    geoJSONName: "Korea"
  },

  "Libya": {
    faction: "Axis",
    fillColor: "#6b1212",
    leader: "Italo Balbo (Governor)",
    government: "Italian Colonial Administration",
    capital: "Tripoli",
    population: "1.1 million",
    armyStrength: "Regio Corpo Truppe Coloniali: ~100,000",
    navy: "Tobruk naval base",
    airForce: "Regia Aeronautica desert squadrons",
    historicalNote: "Italian colony since 1911-12. Mussolini's 'Fourth Shore' of Italy. Major Italian army buildup for North Africa campaign. Balbo — popular commander — accidentally shot down by friendly fire 1940.",
    allies: ["Italy"],
    atWarWith: [],
    geoJSONName: "Libya"
  },

  "Ethiopia": {
    faction: "Axis",
    fillColor: "#6b1212",
    leader: "Amedeo of Savoy (Italian Viceroy)",
    government: "Italian Occupation (contested)",
    capital: "Addis Ababa",
    population: "16 million",
    armyStrength: "Italian colonial garrison with ongoing guerrilla resistance",
    navy: "None",
    airForce: "Italian squadrons",
    historicalNote: "Conquered by Italy October 1935 - May 1936 using poison gas and aerial bombing. Emperor Haile Selassie's famous League of Nations speech failed to prevent annexation. Part of Italian East Africa. Resistance continues throughout occupation.",
    allies: ["Italy"],
    atWarWith: [],
    geoJSONName: "Ethiopia"
  },

  "Afghanistan": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "King Mohammed Zahir Shah",
    government: "Absolute Monarchy",
    capital: "Kabul",
    population: "8 million",
    armyStrength: "Afghan Army: ~70,000",
    navy: "None",
    airForce: "Small force",
    historicalNote: "Buffer state between British India and Soviet Central Asia. Maintains neutrality. German agents active seeking to recruit Afghan support against Britain.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Afghanistan"
  },

  "Iran": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "Reza Shah Pahlavi",
    government: "Constitutional Monarchy",
    capital: "Tehran",
    population: "15 million",
    armyStrength: "Imperial Iranian Army: ~120,000",
    navy: "Small Caspian/Gulf fleet",
    airForce: "~200 aircraft",
    historicalNote: "Renamed from 'Persia' to 'Iran' in 1935. Vast oil reserves (Anglo-Iranian Oil Company). Reza Shah sympathetic to Germany — hoping to use Axis pressure against British/Soviet influence. Jointly occupied by Britain and USSR August 1941.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Iran"
  },

  "Saudi Arabia": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "King Abdul Aziz ibn Saud",
    government: "Absolute Monarchy",
    capital: "Riyadh",
    population: "4 million",
    armyStrength: "Saudi forces: tribal levies",
    navy: "None",
    airForce: "None",
    historicalNote: "Kingdom unified 1932. Standard Oil of California discovers oil in 1938 — strategic importance will explode. Maintains neutrality. Roosevelt-ibn Saud relationship will be critical postwar.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Saudi Arabia"
  },

  "Mexico": {
    faction: "Allies",
    fillColor: "#2d4a1e",
    leader: "Lázaro Cárdenas",
    government: "Federal Republic (PRM/PRI)",
    capital: "Mexico City",
    population: "19.7 million",
    armyStrength: "Mexican Army: ~50,000",
    navy: "Minimal Gulf/Pacific force",
    airForce: "Small force",
    historicalNote: "Nationalized foreign oil companies March 1938 (angering Britain and USA). Cárdenas sympathizes with Republican Spain. Will join Allies after German submarines sink Mexican tankers (May 1942).",
    allies: [],
    atWarWith: [],
    geoJSONName: "Mexico"
  },

  "Brazil": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "Getúlio Vargas",
    government: "Estado Novo Authoritarian Republic",
    capital: "Rio de Janeiro",
    population: "41 million",
    armyStrength: "Brazilian Army: ~70,000",
    navy: "Brazilian Navy: capable fleet for South America",
    airForce: "~150 aircraft",
    historicalNote: "Vargas's Estado Novo (1937) has fascist elements, but also courts USA. Brazil will eventually join Allies in 1942 after German U-boat attacks. Only South American nation to send combat troops to Europe (Italian Campaign).",
    allies: [],
    atWarWith: [],
    geoJSONName: "Brazil"
  },

  "Argentina": {
    faction: "Neutral",
    fillColor: "#5c5c38",
    leader: "Roberto Ortiz",
    government: "Republic",
    capital: "Buenos Aires",
    population: "14 million",
    armyStrength: "Argentine Army: ~50,000",
    navy: "Argentine Navy: strong South Atlantic force",
    airForce: "~200 aircraft",
    historicalNote: "Large German and Italian immigrant population. Military sympathizes with Axis. Maintains strict neutrality throughout war. Declared war on Germany and Japan March 1945 — very late.",
    allies: [],
    atWarWith: [],
    geoJSONName: "Argentina"
  },

  "Australia": {
    faction: "British Empire",
    fillColor: "#5c3d1e",
    leader: "Joseph Lyons / Robert Menzies",
    government: "Federal Dominion (Constitutional Monarchy)",
    capital: "Canberra",
    population: "6.9 million",
    armyStrength: "Australian Army: ~80,000 (will dramatically expand)",
    navy: "Royal Australian Navy: capable cruiser/destroyer force",
    airForce: "RAAF: ~250 aircraft",
    historicalNote: "British Dominion that will declare war alongside UK instantly. Australian forces will serve in North Africa, Greece, Crete, Middle East, and Pacific. Fall of Singapore (1942) causes existential crisis — turns to USA for protection.",
    allies: ["United Kingdom"],
    atWarWith: [],
    geoJSONName: "Australia"
  },

  "Canada": {
    faction: "British Empire",
    fillColor: "#5c3d1e",
    leader: "William Lyon Mackenzie King",
    government: "Federal Dominion (Constitutional Monarchy)",
    capital: "Ottawa",
    population: "11.3 million",
    armyStrength: "Canadian Army: ~5,000 regular (massive expansion ahead)",
    navy: "Royal Canadian Navy: destroyer-focused",
    airForce: "RCAF: ~300 aircraft",
    historicalNote: "Passed own declaration of war September 1939 — asserts autonomy from UK. Commonwealth Air Training Plan will train 131,000 aircrew. Dieppe Raid, D-Day, Italian Campaign. Vital trans-Atlantic supply route defender.",
    allies: ["United Kingdom"],
    atWarWith: [],
    geoJSONName: "Canada"
  }
};
