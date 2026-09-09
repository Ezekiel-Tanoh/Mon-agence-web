 
// ============================
// SERVICES — LISTE + DÉTAIL
// ============================
 
// On stocke le contenu de chaque service dans un objet.
// Chaque clé correspond à la valeur du data-service dans le HTML.
const servicesData = {
  'sites-web': {
    titre: 'Sites web',
    texte: "Site vitrine, landing page ou institutionnel. Présentez votre entreprise avec un site professionnel, rapide et adapté à tous les écrans.",
    tags: ['Vitrine', 'Landing page', 'Présentation']
  },
  'ecommerce': {
    titre: 'E-commerce & applications',
    texte: "Boutique en ligne, application métier ou solution personnalisée : nous développons selon vos besoins.",
    tags: ['E-commerce', 'Application', 'Sur mesure']
  },
  'maintenance': {
    titre: 'Maintenance',
    texte: "Votre site ne s'arrête pas après sa mise en ligne. Mises à jour, corrections et améliorations continues.",
    tags: ['Maintenance', 'Sécurité', 'Évolution']
  }
};
 
// On récupère tous les éléments de la liste, et les zones à mettre à jour
const nomsServices = document.querySelectorAll('.service-nom');
const detailTitre = document.getElementById('detail-titre');
const detailTexte = document.getElementById('detail-texte');
const detailTags = document.getElementById('detail-tags');
 
nomsServices.forEach(function (nom) {
  nom.addEventListener('click', function () {
 
    // On retire "actif" de TOUS les items, avant d'en ajouter un seul
    nomsServices.forEach(function (n) {
      n.classList.remove('actif');
    });
    // Puis on ajoute "actif" uniquement sur celui qui vient d'être cliqué
    nom.classList.add('actif');
 
    // On récupère la clé stockée dans data-service (ex: "ecommerce")
    const cle = nom.getAttribute('data-service');
    const service = servicesData[cle];
 
    // On met à jour le contenu du panneau de droite
    detailTitre.textContent = service.titre;
    detailTexte.textContent = service.texte;
 
    // Pour les tags, on reconstruit le HTML à partir du tableau
    detailTags.innerHTML = service.tags
      .map(function (tag) {
        return '<span class="tag">' + tag + '</span>';
      })
      .join('');
 
  });
});
 
// ============================
// CARROUSEL RÉALISATIONS
// ============================
 
const carrousel = document.getElementById('carrousel');
const flecheGauche = document.querySelector('.fleche-gauche');
const flecheDroite = document.querySelector('.fleche-droite');
 
// La largeur à faire défiler à chaque clic (largeur d'une carte + son espacement)
const distanceDefilement = 340 + 24; // 340px = largeur carte, 24px ≈ le gap
 
flecheDroite.addEventListener('click', function () {
  carrousel.scrollBy({ left: distanceDefilement, behavior: 'smooth' });
});
 
flecheGauche.addEventListener('click', function () {
  carrousel.scrollBy({ left: -distanceDefilement, behavior: 'smooth' });
});
 
// ============================
// FORMULAIRE DE CONTACT (PROJET)
// ============================
 
// ============================
// FORMULAIRE DE CONTACT (PROJET)
// ============================

const formulaireProjet = document.getElementById('contact-projet-form');
const resultatProjet = document.getElementById('contact-projet-result');

formulaireProjet.addEventListener('submit', async function (event) {
  event.preventDefault();

  const bouton = formulaireProjet.querySelector('button[type="submit"]');

  // On désactive le bouton pendant l'envoi
  bouton.disabled = true;
  bouton.textContent = 'Envoi en cours...';

  const formData = new FormData(formulaireProjet);

  try {
    const response = await fetch(formulaireProjet.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const nom = document.getElementById('cp-nom').value;

      resultatProjet.textContent =
        `Merci ${nom} ! Votre demande a bien été envoyée. Nous vous répondrons rapidement.`;

      formulaireProjet.reset();
    } else {
      resultatProjet.textContent =
        '❌ Une erreur est survenue. Votre demande n’a pas pu être envoyée.';
    }

  } catch (error) {
    resultatProjet.textContent =
      '❌ Impossible de contacter le serveur. Vérifiez votre connexion internet.';
  }

  // On réactive le bouton
  bouton.disabled = false;
  bouton.textContent = 'Envoyer ma demande';
});
 
// ============================
// SCROLLSPY — surligne le lien de nav de la section visible
// ============================
 
// On récupère toutes les sections qui ont un id (accueil, services, etc.)
const sections = document.querySelectorAll('section[id]');
const liensNav = document.querySelectorAll('.liens a');
 
// IntersectionObserver "observe" des éléments et nous prévient
// dès qu'ils entrent ou sortent de la zone visible à l'écran
const observateur = new IntersectionObserver(
  function (entrees) {
    // "entrees" est la liste des sections dont la visibilité vient de changer
    entrees.forEach(function (entree) {
 
      // entree.isIntersecting = true si la section est actuellement visible à l'écran
      if (entree.isIntersecting) {
        console.log('Section visible :', entree.target.getAttribute('id'));
        const idVisible = entree.target.getAttribute('id');
 
        // On retire "lien-actif" de tous les liens, puis on l'ajoute
        // uniquement à celui qui correspond à la section visible
        liensNav.forEach(function (lien) {
          lien.classList.remove('lien-actif');
          if (lien.getAttribute('href') === '#' + idVisible) {
            lien.classList.add('lien-actif');
          }
        });
      }
    });
  },
  {
    // rootMargin réduit la zone de déclenchement : la section doit être
    // dans le tiers central de l'écran pour compter comme "visible",
    // plutôt que de se déclencher dès qu'un pixel apparaît en bas de l'écran
    rootMargin: '-40% 0px -40% 0px'
  }
);
 
// On demande à l'observateur de surveiller chaque section
sections.forEach(function (section) {
  observateur.observe(section);
});
 

// ============================
// MENU BURGER MOBILE
// ============================
 
const burger = document.getElementById('burger');
const liensNavMobile = document.getElementById('liens-nav');
 
burger.addEventListener('click', function () {
  burger.classList.toggle('ouvert');
  liensNavMobile.classList.toggle('ouvert');
});
 
// Ferme le menu automatiquement quand on clique sur un lien
// (utile car sinon le menu resterait ouvert après avoir navigué vers une section)
const tousLesLiensNav = liensNavMobile.querySelectorAll('a');
tousLesLiensNav.forEach(function (lien) {
  lien.addEventListener('click', function () {
    burger.classList.remove('ouvert');
    liensNavMobile.classList.remove('ouvert');
  });
});