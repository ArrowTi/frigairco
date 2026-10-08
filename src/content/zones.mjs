// Zones desservies. `group` sert au regroupement dans les menus, `parent` et
// `province` aux liens entre pages voisines, `loc` aux tournures irrégulières.

export const groups = ['region', 'wal', 'fla'];

export const zones = [
  {
    key: 'wallonie', group: 'region',
    name: { fr: 'Wallonie', nl: 'Wallonië', en: 'Wallonia' },
    slug: { fr: 'wallonie', nl: 'wallonie', en: 'wallonia' },
    loc: { fr: 'en Wallonie' },
    near: ['Hainaut', 'Brabant wallon', 'Liège', 'Namur', 'Luxembourg'],
    ctx: {
      fr: "Du Hainaut à la province de Luxembourg, la Wallonie compte autant de restaurants, de commerces de bouche et de sites agroalimentaires que de zonings industriels : partout, le froid doit tenir.",
      nl: "Van Henegouwen tot de provincie Luxemburg telt Wallonië evenveel restaurants, voedingswinkels en voedingsbedrijven als industriezones: overal moet de koeling blijven draaien.",
      en: "From Hainaut to Luxembourg province, Wallonia has as many restaurants, food shops and food-processing sites as it has industrial estates, and all of them depend on reliable cooling.",
    },
  },
  {
    key: 'bruxelles', group: 'region',
    name: { fr: 'Bruxelles', nl: 'Brussel', en: 'Brussels' },
    slug: { fr: 'bruxelles', nl: 'brussel', en: 'brussels' },
    near: {
      fr: ['Ixelles', 'Uccle', 'Schaerbeek', 'Anderlecht', 'Etterbeek', 'Saint-Gilles', 'Woluwe-Saint-Lambert', 'Molenbeek-Saint-Jean', 'Forest', 'Jette', 'Evere', 'Auderghem'],
      nl: ['Elsene', 'Ukkel', 'Schaarbeek', 'Anderlecht', 'Etterbeek', 'Sint-Gillis', 'Sint-Lambrechts-Woluwe', 'Sint-Jans-Molenbeek', 'Vorst', 'Jette', 'Evere', 'Oudergem'],
    },
    ctx: {
      fr: "Avec ses 19 communes, ses milliers de restaurants, de snacks, de supérettes et de bureaux, Bruxelles est l'un des endroits où une panne de froid coûte le plus vite cher.",
      nl: "Met zijn 19 gemeenten en duizenden restaurants, snackbars, buurtwinkels en kantoren is Brussel een plek waar een koelpanne heel snel geld kost.",
      en: "With its 19 municipalities and thousands of restaurants, snack bars, convenience stores and offices, Brussels is a place where a cooling breakdown becomes expensive very quickly.",
    },
  },
  {
    key: 'flandre', group: 'region',
    name: { fr: 'Flandre', nl: 'Vlaanderen', en: 'Flanders' },
    slug: { fr: 'flandre', nl: 'vlaanderen', en: 'flanders' },
    loc: { fr: 'en Flandre' },
    near: ['Antwerpen', 'Gent', 'Leuven', 'Mechelen', 'Hasselt', 'Kortrijk'],
    ctx: {
      fr: "D'Anvers à Courtrai en passant par Gand, Malines, Louvain et Hasselt, la Flandre concentre ports, logistique, industrie alimentaire et un horeca très dense.",
      nl: "Van Antwerpen tot Kortrijk, over Gent, Mechelen, Leuven en Hasselt: Vlaanderen combineert havens, logistiek, voedingsindustrie en een zeer dichte horeca.",
      en: "From Antwerp to Kortrijk by way of Ghent, Mechelen, Leuven and Hasselt, Flanders combines ports, logistics, food industry and a very dense hospitality sector.",
    },
  },
  {
    key: 'liege', group: 'wal', parent: 'wallonie', province: 'liege',
    name: { fr: 'Liège', nl: 'Luik', en: 'Liège' },
    slug: { fr: 'liege', nl: 'luik', en: 'liege' },
    near: ['Seraing', 'Herstal', 'Ans', 'Flémalle', 'Chaudfontaine', 'Grâce-Hollogne', 'Oupeye', 'Waremme'],
    ctx: {
      fr: "Horeca du centre-ville, commerces de bouche, entrepôts logistiques autour de l'aéroport de Bierset et industrie de la vallée de la Meuse : à Liège et dans sa province, les besoins en froid sont très variés.",
      nl: "Horeca in het centrum, voedingswinkels, logistieke magazijnen rond de luchthaven van Bierset en industrie in de Maasvallei: in Luik en de provincie is de vraag naar koeling zeer divers.",
      en: "City-centre restaurants, food shops, logistics warehouses around Bierset airport and industry along the Meuse valley: in Liège and its province, cooling needs are very varied.",
    },
  },
  {
    key: 'namur', group: 'wal', parent: 'wallonie', province: 'namur',
    name: { fr: 'Namur', nl: 'Namen', en: 'Namur' },
    slug: { fr: 'namur', nl: 'namen', en: 'namur' },
    near: ['Jambes', 'Gembloux', 'Andenne', 'Ciney', 'Sambreville', 'Profondeville', 'Floreffe', 'Philippeville'],
    ctx: {
      fr: "Capitale de la Wallonie, Namur et sa province comptent de nombreux restaurants, hôtels, commerces alimentaires et collectivités, de la vallée de la Sambre à la Haute-Meuse.",
      nl: "Namen, hoofdstad van Wallonië, en de provincie tellen veel restaurants, hotels, voedingswinkels en grootkeukens, van de Samber tot de Boven-Maas.",
      en: "Namur, the capital of Wallonia, and its province are home to many restaurants, hotels, food shops and institutional kitchens, from the Sambre valley to the Upper Meuse.",
    },
  },
  {
    key: 'charleroi', group: 'wal', parent: 'wallonie', province: 'hainaut',
    name: { fr: 'Charleroi', nl: 'Charleroi', en: 'Charleroi' },
    slug: { fr: 'charleroi', nl: 'charleroi', en: 'charleroi' },
    near: ['Gosselies', 'Marcinelle', 'Gilly', 'Jumet', 'Montignies-sur-Sambre', 'Châtelet', 'Fleurus', 'Courcelles'],
    ctx: {
      fr: "Première ville wallonne par sa population, Charleroi réunit grandes surfaces, horeca, zonings industriels et activité logistique autour de l'aéroport de Gosselies.",
      nl: "Charleroi, de grootste stad van Wallonië, verenigt supermarkten, horeca, industriezones en logistiek rond de luchthaven van Gosselies.",
      en: "Charleroi, the most populous city in Wallonia, brings together supermarkets, hospitality, industrial estates and logistics around Gosselies airport.",
    },
  },
  {
    key: 'mons', group: 'wal', parent: 'wallonie', province: 'hainaut',
    name: { fr: 'Mons', nl: 'Bergen', en: 'Mons' },
    slug: { fr: 'mons', nl: 'bergen', en: 'mons' },
    near: ['Jemappes', 'Nimy', 'Cuesmes', 'Frameries', 'Quaregnon', 'Saint-Ghislain', 'Boussu', 'Colfontaine'],
    ctx: {
      fr: "Entre la Grand-Place, la zone commerciale des Grands Prés et le Borinage, Mons vit de son horeca, de ses commerces et de ses services.",
      nl: "Tussen de Grote Markt, het winkelgebied Les Grands Prés en de Borinage leeft Bergen van zijn horeca, winkels en diensten.",
      en: "Between the Grand-Place, the Grands Prés retail area and the Borinage, Mons lives on its restaurants, shops and services.",
    },
  },
  {
    key: 'tournai', group: 'wal', parent: 'wallonie', province: 'hainaut',
    name: { fr: 'Tournai', nl: 'Doornik', en: 'Tournai' },
    slug: { fr: 'tournai', nl: 'doornik', en: 'tournai' },
    near: ['Mouscron', 'Péruwelz', 'Leuze-en-Hainaut', 'Antoing', 'Ath', 'Froyennes', 'Kain'],
    ctx: {
      fr: "Entre Tournai, Mouscron et la frontière française, la Wallonie picarde compte de nombreux commerces de bouche, restaurants et entreprises agroalimentaires.",
      nl: "Tussen Doornik, Moeskroen en de Franse grens telt Picardisch Wallonië veel voedingswinkels, restaurants en voedingsbedrijven.",
      en: "Between Tournai, Mouscron and the French border, Picardy Wallonia has many food shops, restaurants and food-processing businesses.",
    },
  },
  {
    key: 'wavre', group: 'wal', parent: 'wallonie', province: 'brabant-wallon',
    name: { fr: 'Wavre', nl: 'Waver', en: 'Wavre' },
    slug: { fr: 'wavre', nl: 'waver', en: 'wavre' },
    near: ['Ottignies-Louvain-la-Neuve', 'Rixensart', 'Grez-Doiceau', 'Chaumont-Gistoux', 'La Hulpe', 'Limal', 'Bierges'],
    ctx: {
      fr: "Chef-lieu du Brabant wallon, Wavre réunit un centre commerçant animé, des zonings d'entreprises et la proximité de Louvain-la-Neuve.",
      nl: "Waver, hoofdplaats van Waals-Brabant, combineert een levendig winkelcentrum, bedrijvenzones en de nabijheid van Louvain-la-Neuve.",
      en: "Wavre, the capital of Walloon Brabant, combines a lively shopping centre, business estates and the nearby town of Louvain-la-Neuve.",
    },
  },
  {
    key: 'dinant', group: 'wal', parent: 'wallonie', province: 'namur',
    name: { fr: 'Dinant', nl: 'Dinant', en: 'Dinant' },
    slug: { fr: 'dinant', nl: 'dinant', en: 'dinant' },
    near: ['Ciney', 'Yvoir', 'Hastière', 'Anhée', 'Beauraing', 'Rochefort'],
    ctx: {
      fr: "Ville touristique de la Haute-Meuse, Dinant vit au rythme de ses hôtels, restaurants et terrasses, surtout à la belle saison, quand une panne de froid tombe au plus mauvais moment.",
      nl: "Dinant, toeristische stad aan de Boven-Maas, leeft op het ritme van zijn hotels, restaurants en terrassen, vooral in de zomer, wanneer een koelpanne op het slechtste moment komt.",
      en: "Dinant, a tourist town on the Upper Meuse, runs on its hotels, restaurants and terraces, especially in summer, when a cooling breakdown comes at the worst possible time.",
    },
  },
  {
    key: 'huy', group: 'wal', parent: 'wallonie', province: 'liege',
    name: { fr: 'Huy', nl: 'Hoei', en: 'Huy' },
    slug: { fr: 'huy', nl: 'hoei', en: 'huy' },
    near: ['Amay', 'Wanze', 'Marchin', 'Andenne', 'Villers-le-Bouillet', 'Saint-Georges-sur-Meuse'],
    ctx: {
      fr: "Entre Liège et Namur, sur la Meuse, Huy et le Condroz réunissent restaurants, commerces de proximité et entreprises.",
      nl: "Tussen Luik en Namen, aan de Maas, verenigen Hoei en de Condroz restaurants, buurtwinkels en bedrijven.",
      en: "On the Meuse between Liège and Namur, Huy and the Condroz bring together restaurants, local shops and businesses.",
    },
  },
  {
    key: 'verviers', group: 'wal', parent: 'wallonie', province: 'liege',
    name: { fr: 'Verviers', nl: 'Verviers', en: 'Verviers' },
    slug: { fr: 'verviers', nl: 'verviers', en: 'verviers' },
    near: ['Dison', 'Pepinster', 'Theux', 'Spa', 'Herve', 'Limbourg', 'Welkenraedt'],
    ctx: {
      fr: "Entre Verviers, Spa et le plateau de Herve, la région compte horeca, commerces, fromageries et entreprises alimentaires.",
      nl: "Tussen Verviers, Spa en het Land van Herve telt de streek horeca, winkels, kaasmakerijen en voedingsbedrijven.",
      en: "Between Verviers, Spa and the Herve plateau, the area has restaurants, shops, cheese dairies and food businesses.",
    },
  },
  {
    key: 'eupen', group: 'wal', parent: 'wallonie', province: 'liege',
    name: { fr: 'Eupen', nl: 'Eupen', en: 'Eupen' },
    slug: { fr: 'eupen', nl: 'eupen', en: 'eupen' },
    near: ['Raeren', 'Kelmis', 'Lontzen', 'Welkenraedt', 'Baelen', 'Sankt Vith'],
    ctx: {
      fr: "Capitale de la Communauté germanophone, Eupen et les cantons de l'Est comptent commerces, horeca et entreprises alimentaires, à deux pas de l'Allemagne.",
      nl: "Eupen, hoofdstad van de Duitstalige Gemeenschap, en de Oostkantons tellen winkels, horeca en voedingsbedrijven, vlak bij Duitsland.",
      en: "Eupen, capital of the German-speaking Community, and the East Cantons have shops, hospitality and food businesses a stone's throw from Germany.",
    },
  },
  {
    key: 'arlon', group: 'wal', parent: 'wallonie', province: 'luxembourg',
    name: { fr: 'Arlon', nl: 'Aarlen', en: 'Arlon' },
    slug: { fr: 'arlon', nl: 'aarlen', en: 'arlon' },
    near: ['Messancy', 'Aubange', 'Habay', 'Attert', 'Étalle', 'Virton'],
    ctx: {
      fr: "Chef-lieu de la province de Luxembourg, Arlon est une ville frontalière où restaurants, commerces et bureaux tournent toute l'année.",
      nl: "Aarlen, hoofdplaats van de provincie Luxemburg, is een grensstad waar restaurants, winkels en kantoren het hele jaar door draaien.",
      en: "Arlon, the capital of Luxembourg province, is a border town where restaurants, shops and offices are busy all year round.",
    },
  },
  {
    key: 'neufchateau', group: 'wal', parent: 'wallonie', province: 'luxembourg',
    name: { fr: 'Neufchâteau', nl: 'Neufchâteau', en: 'Neufchâteau' },
    slug: { fr: 'neufchateau', nl: 'neufchateau', en: 'neufchateau' },
    near: ['Libramont-Chevigny', 'Bertrix', 'Léglise', 'Bastogne', 'Bouillon', 'Paliseul'],
    ctx: {
      fr: "Au cœur de l'Ardenne, entre Libramont et Bertrix, Neufchâteau dessert un territoire rural où boucheries, fermes, restaurants et commerces dépendent d'un froid fiable.",
      nl: "In het hart van de Ardennen, tussen Libramont en Bertrix, bedient Neufchâteau een landelijk gebied waar slagerijen, boerderijen, restaurants en winkels op betrouwbare koeling rekenen.",
      en: "In the heart of the Ardennes, between Libramont and Bertrix, Neufchâteau serves a rural area where butchers, farms, restaurants and shops rely on dependable cooling.",
    },
  },
  {
    key: 'marche', group: 'wal', parent: 'wallonie', province: 'luxembourg',
    name: { fr: 'Marche-en-Famenne', nl: 'Marche-en-Famenne', en: 'Marche-en-Famenne' },
    slug: { fr: 'marche-en-famenne', nl: 'marche-en-famenne', en: 'marche-en-famenne' },
    near: ['Hotton', 'Rochefort', 'Durbuy', 'Nassogne', 'La Roche-en-Ardenne', 'Rendeux'],
    ctx: {
      fr: "Carrefour entre Famenne et Ardenne, Marche-en-Famenne rassemble commerces, horeca, zonings et lieux de tourisme vers Durbuy et La Roche.",
      nl: "Marche-en-Famenne, kruispunt tussen Famenne en Ardennen, verenigt winkels, horeca, bedrijvenzones en toeristische trekpleisters richting Durbuy en La Roche.",
      en: "At the crossroads of the Famenne and the Ardennes, Marche-en-Famenne brings together shops, hospitality, business estates and tourist spots towards Durbuy and La Roche.",
    },
  },
  {
    key: 'la-louviere', group: 'wal', parent: 'wallonie', province: 'hainaut',
    name: { fr: 'La Louvière', nl: 'La Louvière', en: 'La Louvière' },
    slug: { fr: 'la-louviere', nl: 'la-louviere', en: 'la-louviere' },
    near: ['Houdeng-Goegnies', 'Haine-Saint-Pierre', 'Strépy-Bracquegnies', 'Manage', 'Binche', 'Le Rœulx', 'Morlanwelz'],
    ctx: {
      fr: "Au cœur de la région du Centre, entre Mons et Charleroi, La Louvière compte commerces, restaurants, grandes surfaces et zonings le long du canal.",
      nl: "In het hart van de Centrumstreek, tussen Bergen en Charleroi, telt La Louvière winkels, restaurants, supermarkten en bedrijvenzones langs het kanaal.",
      en: "In the heart of the Centre region, between Mons and Charleroi, La Louvière has shops, restaurants, supermarkets and business estates along the canal.",
    },
  },
  {
    key: 'mouscron', group: 'wal', parent: 'wallonie', province: 'hainaut',
    name: { fr: 'Mouscron', nl: 'Moeskroen', en: 'Mouscron' },
    slug: { fr: 'mouscron', nl: 'moeskroen', en: 'mouscron' },
    near: ['Dottignies', 'Herseaux', 'Luingne', 'Estaimpuis', 'Comines-Warneton', 'Pecq'],
    ctx: {
      fr: "Ville frontalière entre Tournai, Courtrai et la métropole lilloise, Mouscron compte de nombreuses entreprises agroalimentaires, des commerces et des restaurants.",
      nl: "Moeskroen, grensstad tussen Doornik, Kortrijk en de Rijselse metropool, telt veel voedingsbedrijven, winkels en restaurants.",
      en: "Mouscron, a border town between Tournai, Kortrijk and the Lille metropolitan area, has many food-processing companies, shops and restaurants.",
    },
  },
  {
    key: 'nivelles', group: 'wal', parent: 'wallonie', province: 'brabant-wallon',
    name: { fr: 'Nivelles', nl: 'Nijvel', en: 'Nivelles' },
    slug: { fr: 'nivelles', nl: 'nijvel', en: 'nivelles' },
    near: ["Braine-l'Alleud", 'Genappe', 'Ittre', 'Seneffe', 'Tubize', 'Baulers'],
    ctx: {
      fr: "Entre Bruxelles et Charleroi, Nivelles réunit un centre commerçant, un grand centre commercial et des zonings d'entreprises au sud du Brabant wallon.",
      nl: "Tussen Brussel en Charleroi verenigt Nijvel een winkelcentrum in de stad, een groot shoppingcenter en bedrijvenzones in het zuiden van Waals-Brabant.",
      en: "Between Brussels and Charleroi, Nivelles brings together a town-centre shopping area, a large shopping mall and business estates in the south of Walloon Brabant.",
    },
  },
  {
    key: 'waterloo', group: 'wal', parent: 'wallonie', province: 'brabant-wallon',
    name: { fr: 'Waterloo', nl: 'Waterloo', en: 'Waterloo' },
    slug: { fr: 'waterloo', nl: 'waterloo', en: 'waterloo' },
    near: ["Braine-l'Alleud", 'Lasne', 'La Hulpe', 'Rhode-Saint-Genèse', 'Genval', 'Ohain'],
    ctx: {
      fr: "Aux portes de Bruxelles, Waterloo compte de nombreux restaurants, des commerces et beaucoup d'habitations équipées de climatisation ou de pompe à chaleur.",
      nl: "Waterloo, aan de rand van Brussel, telt veel restaurants, winkels en heel wat woningen met airco of warmtepomp.",
      en: "On the edge of Brussels, Waterloo has many restaurants, shops and a large number of homes fitted with air conditioning or a heat pump.",
    },
  },
  {
    key: 'bastogne', group: 'wal', parent: 'wallonie', province: 'luxembourg',
    name: { fr: 'Bastogne', nl: 'Bastenaken', en: 'Bastogne' },
    slug: { fr: 'bastogne', nl: 'bastenaken', en: 'bastogne' },
    near: ['Vaux-sur-Sûre', 'Bertogne', 'Houffalize', 'Sainte-Ode', 'Fauvillers', 'Libramont'],
    ctx: {
      fr: "Ville commerçante et touristique de l'Ardenne, Bastogne attire visiteurs et clients toute l'année : restaurants, hôtels, boucheries et commerces y dépendent d'un froid fiable.",
      nl: "Bastenaken, winkel- en toeristenstad in de Ardennen, trekt het hele jaar door bezoekers en klanten: restaurants, hotels, slagerijen en winkels rekenen er op betrouwbare koeling.",
      en: "Bastogne, a shopping and tourist town in the Ardennes, draws visitors and customers all year round: restaurants, hotels, butchers and shops there rely on dependable cooling.",
    },
  },
  {
    key: 'anvers', group: 'fla', parent: 'flandre',
    name: { fr: 'Anvers', nl: 'Antwerpen', en: 'Antwerp' },
    slug: { fr: 'anvers', nl: 'antwerpen', en: 'antwerp' },
    near: ['Berchem', 'Deurne', 'Merksem', 'Wilrijk', 'Mortsel', 'Schoten', 'Kontich'],
    ctx: {
      fr: "Deuxième ville du pays et grand port européen, Anvers combine un horeca foisonnant, des commerces et une logistique du froid à grande échelle.",
      nl: "Antwerpen, tweede stad van het land en grote Europese haven, combineert een bruisende horeca, winkels en koellogistiek op grote schaal.",
      en: "Antwerp, the country's second city and a major European port, combines a thriving hospitality scene, shops and large-scale cold-chain logistics.",
    },
  },
  {
    key: 'gand', group: 'fla', parent: 'flandre',
    name: { fr: 'Gand', nl: 'Gent', en: 'Ghent' },
    slug: { fr: 'gand', nl: 'gent', en: 'ghent' },
    near: ['Merelbeke', 'Destelbergen', 'Evergem', 'Lochristi', 'Deinze', 'Eeklo'],
    ctx: {
      fr: "Ville étudiante et portuaire, Gand compte un grand nombre de restaurants, de cafés, de commerces et d'entreprises.",
      nl: "Gent, studenten- en havenstad, telt een groot aantal restaurants, cafés, winkels en bedrijven.",
      en: "Ghent, a student and port city, has a large number of restaurants, cafés, shops and businesses.",
    },
  },
  {
    key: 'louvain', group: 'fla', parent: 'flandre',
    name: { fr: 'Louvain', nl: 'Leuven', en: 'Leuven' },
    slug: { fr: 'louvain', nl: 'leuven', en: 'leuven' },
    near: ['Heverlee', 'Kessel-Lo', 'Herent', 'Tienen', 'Aarschot', 'Diest', 'Tervuren'],
    ctx: {
      fr: "Ville universitaire, Louvain vit de ses cafés, restaurants, commerces, laboratoires et parcs de recherche.",
      nl: "Leuven, universiteitsstad, leeft van zijn cafés, restaurants, winkels, laboratoria en researchparken.",
      en: "Leuven, a university city, lives on its cafés, restaurants, shops, laboratories and research parks.",
    },
  },
  {
    key: 'malines', group: 'fla', parent: 'flandre',
    name: { fr: 'Malines', nl: 'Mechelen', en: 'Mechelen' },
    slug: { fr: 'malines', nl: 'mechelen', en: 'mechelen' },
    near: ['Willebroek', 'Lier', 'Bonheiden', 'Sint-Katelijne-Waver', 'Zemst', 'Vilvoorde'],
    ctx: {
      fr: "Entre Bruxelles et Anvers, Malines et ses environs accueillent commerces, horeca et une importante activité de distribution alimentaire, notamment maraîchère.",
      nl: "Tussen Brussel en Antwerpen huisvesten Mechelen en omgeving winkels, horeca en een belangrijke voedingsdistributie, met name van groenten.",
      en: "Between Brussels and Antwerp, Mechelen and its surroundings host shops, hospitality and a major food-distribution sector, vegetables in particular.",
    },
  },
  {
    key: 'hasselt', group: 'fla', parent: 'flandre',
    name: { fr: 'Hasselt', nl: 'Hasselt', en: 'Hasselt' },
    slug: { fr: 'hasselt', nl: 'hasselt', en: 'hasselt' },
    near: ['Genk', 'Diepenbeek', 'Zonhoven', 'Sint-Truiden', 'Tongeren', 'Beringen'],
    ctx: {
      fr: "Chef-lieu du Limbourg, Hasselt est une ville commerçante, entourée de PME et de zonings en direction de Genk.",
      nl: "Hasselt, hoofdplaats van Limburg, is een winkelstad, omringd door kmo's en bedrijvenzones richting Genk.",
      en: "Hasselt, the capital of Limburg, is a shopping city surrounded by small businesses and industrial estates towards Genk.",
    },
  },
  {
    key: 'courtrai', group: 'fla', parent: 'flandre',
    name: { fr: 'Courtrai', nl: 'Kortrijk', en: 'Kortrijk' },
    slug: { fr: 'courtrai', nl: 'kortrijk', en: 'kortrijk' },
    near: ['Kuurne', 'Harelbeke', 'Wevelgem', 'Menen', 'Waregem', 'Zwevegem', 'Roeselare'],
    ctx: {
      fr: "Au sud de la Flandre-Occidentale, la région de Courtrai est connue pour son industrie alimentaire, ses PME et ses commerces.",
      nl: "In het zuiden van West-Vlaanderen staat de regio Kortrijk bekend om haar voedingsindustrie, kmo's en winkels.",
      en: "In the south of West Flanders, the Kortrijk area is known for its food industry, small businesses and shops.",
    },
  },
];
