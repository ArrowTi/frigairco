// Réglages du site FrigAirco.
// Tout ce qui est marqué "À COMPLÉTER" doit être rempli avant la mise en ligne,
// puis relancez `npm run build`.

export default {
  name: 'FrigAirco',

  // À COMPLÉTER : adresse définitive du site, sans barre oblique finale.
  domain: 'https://www.frigairco.be',

  // Numéro affiché et numéro au format international (appel + WhatsApp).
  phoneDisplay: '0487 87 09 93',
  phoneIntl: '+32487870993',

  // Adresse affichée sur le site pour les contacts.
  email: 'info@frigairco.be',

  // Adresse qui reçoit les demandes de devis du formulaire.
  quoteEmail: 'contact@frigairco.be',

  // Le formulaire ouvre la messagerie du visiteur avec la demande prête à partir vers
  // quoteEmail. Pour un envoi direct sans messagerie, collez ici une clé Web3Forms
  // (créée gratuitement sur web3forms.com avec l'adresse quoteEmail).
  formAccessKey: '',
  formEndpoint: '',

  // À COMPLÉTER : obligatoire sur un site professionnel en Belgique.
  company: {
    legalName: '',
    address: '',
    vat: '',
    host: 'GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA)',
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

  // Avis clients (le texte reste dans la langue d'origine, note de 1 à 5, demi-étoiles possibles).
  // Les avis marqués `example: true` sont des modèles : ils portent l'étiquette « Exemple »
  // et ne s'affichent que sur la version de démonstration. Remplacez-les par de vrais avis
  // (sans `example`) avant la mise en ligne définitive.
  reviews: [
    { name: 'Rayan A.', rating: 5, text: 'Chambre froide en panne un samedi soir: le technicien est arrivé rapidement et tout fonctionnait à nouveau dans la nuit. Merci !' },
    { name: 'Salma E.', rating: 4, text: 'Installation de notre climatisation dans les délais, travail propre et explications claires.' },
    { name: 'Philipe B.', rating: 5, text: 'Entretien de la pompe à chaleur fait sérieusement. Un petit délai pour le rendez-vous, mais un très bon travail.' },
  ],
};
