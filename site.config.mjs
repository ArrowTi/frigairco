// Réglages du site FrigAirco.
// Tout ce qui est marqué "À COMPLÉTER" doit être rempli avant la mise en ligne,
// puis relancez `npm run build`.

export default {
  name: 'FrigAirco',

  // À COMPLÉTER : adresse définitive du site, sans barre oblique finale.
  domain: 'https://www.frigairco.be',

  // À COMPLÉTER : numéro affiché et numéro au format international (appel + WhatsApp).
  phoneDisplay: '0400 00 00 00',
  phoneIntl: '+32400000000',

  // À COMPLÉTER : adresse qui reçoit les demandes du formulaire.
  email: 'contact@frigairco.be',

  // Envoi du formulaire. Laissez `formEndpoint` vide pour ouvrir le logiciel de
  // messagerie du visiteur (mailto). Pour un envoi direct, créez un formulaire
  // sur Web3Forms ou Formspree et collez ici l'adresse et la clé reçues.
  formEndpoint: '',
  formAccessKey: '',

  // À COMPLÉTER : obligatoire sur un site professionnel en Belgique.
  company: {
    legalName: '',
    address: '',
    vat: '',
    host: '',
  },

  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    googleReviews: '',
  },

  yearsExperience: 10,

  certifications: ['F-Gas', 'Vinçotte', 'Bruxelles Environnement'],

  // Logos : déposez un fichier <key>.svg, .png ou .webp dans src/assets/img/brands/.
  // Sans fichier, le nom de la marque est affiché en texte.
  // Retirez de la liste les marques sur lesquelles vous ne travaillez pas.
  brands: [
    { key: 'daikin', name: 'Daikin' },
    { key: 'mitsubishi', name: 'Mitsubishi Electric' },
    { key: 'bitzer', name: 'Bitzer' },
    { key: 'danfoss', name: 'Danfoss' },
    { key: 'fujitsu', name: 'Fujitsu' },
    { key: 'panasonic', name: 'Panasonic' },
    { key: 'toshiba', name: 'Toshiba' },
    { key: 'lg', name: 'LG' },
    { key: 'samsung', name: 'Samsung' },
    { key: 'hitachi', name: 'Hitachi' },
    { key: 'carrier', name: 'Carrier' },
    { key: 'copeland', name: 'Copeland' },
    { key: 'embraco', name: 'Embraco' },
  ],

  // À COMPLÉTER : vos vrais avis Google (le texte reste dans la langue d'origine).
  reviews: [
    { name: 'Nom du client', text: "Texte de l'avis à compléter.", rating: 5, date: '' },
    { name: 'Nom du client', text: "Texte de l'avis à compléter.", rating: 5, date: '' },
    { name: 'Nom du client', text: "Texte de l'avis à compléter.", rating: 5, date: '' },
  ],
};
