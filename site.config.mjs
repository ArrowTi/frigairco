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

  // Adresse affichée sur le site pour les contacts.
  email: 'info@frigairco.be',

  // Adresse qui reçoit les demandes de devis du formulaire.
  quoteEmail: 'contact@frigairco.be',

  // À COMPLÉTER : envoi direct du formulaire par Web3Forms (gratuit, 250 demandes par
  // mois). Créez la clé sur web3forms.com avec l'adresse quoteEmail : elle arrive par
  // e-mail, collez-la ici. Sans clé, le formulaire passe par FormSubmit (formEndpoint).
  // En cas d'échec, le visiteur peut toujours envoyer sa demande par e-mail.
  formAccessKey: '',
  formEndpoint: 'https://formsubmit.co/ajax/contact@frigairco.be',

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
    { key: 'mitsubishi', name: 'Mitsubishi Electric' },
    { key: 'daikin', name: 'Daikin' },
    { key: 'fujitsu', name: 'Fujitsu' },
    { key: 'panasonic', name: 'Panasonic' },
    { key: 'samsung', name: 'Samsung' },
    { key: 'lg', name: 'LG' },
    { key: 'hitachi', name: 'Hitachi' },
    { key: 'otacos', name: "O'Tacos" },
  ],

  // Avis clients réels uniquement (le texte reste dans la langue d'origine). Tant que
  // la liste est vide, la section « Avis clients » n'apparaît pas sur le site.
  // Exemple : { name: 'Marc D.', text: 'Intervention rapide un dimanche soir…', rating: 5, date: 'octobre 2026' },
  reviews: [],
};
