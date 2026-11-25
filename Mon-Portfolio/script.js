// ==========================================
// 0. VERROUILLAGE DU SCROLL TOUT EN HAUT AU CHARGEMENT / REFRESH
// ==========================================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ==========================================
// 1. PARAMÈTRES À PERSONNALISER
// ==========================================
const MOT_DE_PASSE_ADMIN = "admin123"; // Change ce mot de passe !

// Synchronisation de la vidéo dans l'écran PC (en secondes — doit correspondre à --screen-cycle-duree et --screen-delai-depart dans style.css)
const DELAI_DEPART_ECRAN_SEC = 1.65;
const CYCLE_ECRAN_SECONDES = 8;

// ==========================================
// 1B. SYNCHRONISATION VIDÉO & ALLUMAGE ÉCRAN PC EN BOUCLE
// ==========================================
let intervalleCycleEcran = null;

function synchroniserVideoEcranPC() {
    const videoPC = document.getElementById('pc-screen-video');
    if (!videoPC) return;

    if (intervalleCycleEcran) clearInterval(intervalleCycleEcran);

    videoPC.pause();
    videoPC.currentTime = 0;

    const lancerUnCycleEcran = () => {
        setTimeout(() => {
            videoPC.currentTime = 0;
            videoPC.play().catch(() => {});
        }, CYCLE_ECRAN_SECONDES * 1000 * 0.06);

        setTimeout(() => {
            videoPC.pause();
            videoPC.currentTime = 0;
        }, CYCLE_ECRAN_SECONDES * 1000 * 0.93);
    };

    setTimeout(() => {
        lancerUnCycleEcran();
        intervalleCycleEcran = setInterval(lancerUnCycleEcran, CYCLE_ECRAN_SECONDES * 1000);
    }, DELAI_DEPART_ECRAN_SEC * 1000);
}

// ==========================================
// 2. DICTIONNAIRE DE TRADUCTION INTERFACE (FR / NL / EN)
// ==========================================
const traductions = {
    fr: {
        nav_accueil: "Accueil",
        nav_photos: "Photos",
        nav_videos: "Vidéos",
        nav_design: "Design",
        nav_3d: "3D",
        nav_contact: "Contact",
        titre_photos: "Galerie Photos",
        sous_titre_photos: "Cliquez sur une photo pour l'afficher en grand",
        titre_videos: "Réalisations Vidéos",
        sous_titre_videos: "Cliquez sur une vidéo pour la visionner en grand",
        titre_design: "Créations Design",
        sous_titre_design: "Cliquez sur un projet pour explorer ses étapes de création",
        titre_3d: "Projets & Rendus 3D",
        sous_titre_3d: "Cliquez sur un projet 3D pour explorer ses étapes de création",
        titre_contact: "Contact",
        sous_titre_contact: "Une question, un projet ou une collaboration ? Retrouvez-moi ici.",
        contact_email_label: "E-mail",
        btn_remonter_haut: "↑ Revenir vers le haut",
        carousel_photos_intro: "Voici quelques exemples de photos réalisées",
        carousel_videos_intro: "Voici quelques vidéos que j'ai produites",
        carousel_design_intro: "Voici quelques créations design réalisées",
        carousel_3d_intro: "Voici quelques projets et rendus 3D réalisés",
        carousel_clic_hint: "Cliquez sur un élément pour l'agrandir et mettre le carrousel en pause",
        carousel_btn_photo: "Explorer toutes les photos →",
        carousel_btn_video: "Voir toutes les vidéos →",
        carousel_btn_design: "Découvrir tous les designs →",
        carousel_btn_3d: "Explorer les projets 3D →"
    },
    nl: {
        nav_accueil: "Home",
        nav_photos: "Foto's",
        nav_videos: "Video's",
        nav_design: "Design",
        nav_3d: "3D",
        nav_contact: "Contact",
        titre_photos: "Fotogalerij",
        sous_titre_photos: "Klik op een foto om deze op volledig scherm te bekijken",
        titre_videos: "Videoprojecten",
        sous_titre_videos: "Klik op een video om deze in het groot te bekijken",
        titre_design: "Design Creaties",
        sous_titre_design: "Klik op een project om het creatieproces te bekijken",
        titre_3d: "3D Projecten & Renders",
        sous_titre_3d: "Klik op een 3D-project om het creatieproces te bekijken",
        titre_contact: "Contact",
        sous_titre_contact: "Een vraag, een project of een samenwerking? Neem hier contact op.",
        contact_email_label: "E-mail",
        btn_remonter_haut: "↑ Terug naar boven",
        carousel_photos_intro: "Hier zijn enkele voorbeelden van gemaakte foto's",
        carousel_videos_intro: "Hier zijn enkele video's die ik heb geproduceerd",
        carousel_design_intro: "Hier zijn enkele designcreaties",
        carousel_3d_intro: "Hier zijn enkele 3D-projecten en renders",
        carousel_clic_hint: "Klik op een item om het te vergroten en de carrousel te pauzeren",
        carousel_btn_photo: "Alle foto's bekijken →",
        carousel_btn_video: "Alle video's bekijken →",
        carousel_btn_design: "Alle designs ontdekken →",
        carousel_btn_3d: "3D-projecten bekijken →"
    },
    en: {
        nav_accueil: "Home",
        nav_photos: "Photos",
        nav_videos: "Videos",
        nav_design: "Design",
        nav_3d: "3D",
        nav_contact: "Contact",
        titre_photos: "Photo Gallery",
        sous_titre_photos: "Click on a photo to view it in full screen",
        titre_videos: "Video Productions",
        sous_titre_videos: "Click on a video to watch it in full screen",
        titre_design: "Design Creations",
        sous_titre_design: "Click on a project to explore its creation process",
        titre_3d: "3D Projects & Renders",
        sous_titre_3d: "Click on a 3D project to explore its creation process",
        titre_contact: "Contact",
        sous_titre_contact: "Have a question, project, or collaboration in mind? Reach out here.",
        contact_email_label: "E-mail",
        btn_remonter_haut: "↑ Back to top",
        carousel_photos_intro: "Here are some examples of photos I've taken",
        carousel_videos_intro: "Here are some videos I've produced",
        carousel_design_intro: "Here are some design creations",
        carousel_3d_intro: "Here are some 3D projects and renders",
        carousel_clic_hint: "Click an item to enlarge it and pause the carousel",
        carousel_btn_photo: "Explore all photos →",
        carousel_btn_video: "Watch all videos →",
        carousel_btn_design: "Explore all designs →",
        carousel_btn_3d: "Explore 3D projects →"
    }
};

let langueActuelle = localStorage.getItem('portfolio_lang') || 'fr';

function changerLangue(lang) {
    langueActuelle = lang;
    localStorage.setItem('portfolio_lang', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('lang-' + lang).classList.add('active');

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const cle = el.getAttribute('data-i18n');
        if (traductions[lang][cle]) {
            el.textContent = traductions[lang][cle];
        }
    });

    afficherAccueil();
}

// ==========================================
// 3. SCROLL REVEAL / APPARITION LENTE ET PROGRESSIVE AU DÉFILEMENT
// ==========================================
const observateurScroll = new IntersectionObserver((entries) => {
    let compteurCascade = 0;

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delai = compteurCascade * 250;
            compteurCascade++;

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delai);

            observateurScroll.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.22,
    rootMargin: "0px 0px -45px 0px"
});

// ==========================================
// 4. CHARGEMENT INTELLIGENT DES DONNÉES (SYNCHRO AUTO AVEC data.js)
// ==========================================
const signatureDataJS = JSON.stringify({ profilInitial, donneesInitiales });
const signatureEnMemoire = localStorage.getItem('portfolio_data_signature');

if (signatureDataJS !== signatureEnMemoire) {
    localStorage.removeItem('portfolio_profil');
    localStorage.removeItem('portfolio_medias');
    localStorage.setItem('portfolio_data_signature', signatureDataJS);
}

let profil = JSON.parse(localStorage.getItem('portfolio_profil')) || profilInitial;
let medias = JSON.parse(localStorage.getItem('portfolio_medias')) || donneesInitiales;
let estConnecte = false;

if (typeof profil.titre === 'string') {
    profil.titre = { fr: profil.titre, nl: profilInitial.titre.nl, en: profilInitial.titre.en };
}
if (typeof profil.bio === 'string') {
    profil.bio = { fr: profil.bio, nl: profilInitial.bio.nl, en: profilInitial.bio.en };
}

let listeVisionneuseActuelle = [];
let indexVisionneuseActuel = 0;

function sauvegarderDansNavigateur() {
    localStorage.setItem('portfolio_profil', JSON.stringify(profil));
    localStorage.setItem('portfolio_medias', JSON.stringify(medias));
}

function reinitialiserDepuisDataJS() {
    if (confirm("Voulez-vous effacer le brouillon du navigateur et recharger uniquement les données de votre fichier data.js ?")) {
        localStorage.removeItem('portfolio_profil');
        localStorage.removeItem('portfolio_medias');
        localStorage.setItem('portfolio_data_signature', signatureDataJS);
        location.reload();
    }
}

// ==========================================
// 4B. EXPORTATION DU FICHIER data.js POUR VS CODE (PUBLICATION EN LIGNE)
// ==========================================
function exporterFichierDataJS() {
    const contenuFichier = `// ==========================================================
// FICHIER DE DONNÉES DU PORTFOLIO (VISIBLE PAR TOUS EN LIGNE)
// Généré automatiquement depuis l'espace Admin.
// Placez ce fichier à côté de index.html avant de publier le site.
// ==========================================================

const profilInitial = ${JSON.stringify(profil, null, 4)};

const donneesInitiales = ${JSON.stringify(medias, null, 4)};
`;

    const blob = new Blob([contenuFichier], { type: 'application/javascript;charset=utf-8' });
    const urlTelechargement = URL.createObjectURL(blob);

    const lien = document.createElement('a');
    lien.href = urlTelechargement;
    lien.download = 'data.js';
    document.body.appendChild(lien);
    lien.click();
    document.body.removeChild(lien);
    URL.revokeObjectURL(urlTelechargement);
}

// ==========================================
// 4C. CONTRÔLE PAUSE / REPRISE DES CARROUSELS 3D AU CLIC
// ==========================================
function mettreEnPauseCarrousels3D(enPause) {
    document.querySelectorAll('.carousel-3d-ring').forEach(anneau => {
        if (enPause) {
            anneau.classList.add('paused');
        } else {
            anneau.classList.remove('paused');
        }
    });
}

function obtenirVisuelCarte(media) {
    if (media.type === 'video' || estLienYouTube(media.url)) {
        return {
            image: obtenirMiniatureYouTube(media.url),
            estVideo: true
        };
    }
    return {
        image: media.url,
        estVideo: false
    };
}

function construireCarrouselsAccueil() {
    const conteneur = document.getElementById('accueil-carrousels');
    if (!conteneur) return;

    const categories = [
        { type: 'photo', sectionId: 'photos', introKey: 'carousel_photos_intro', btnKey: 'carousel_btn_photo' },
        { type: 'video', sectionId: 'videos', introKey: 'carousel_videos_intro', btnKey: 'carousel_btn_video' },
        { type: 'design', sectionId: 'design', introKey: 'carousel_design_intro', btnKey: 'carousel_btn_design' },
        { type: '3d', sectionId: '3d', introKey: 'carousel_3d_intro', btnKey: 'carousel_btn_3d' }
    ];

    const dict = traductions[langueActuelle] || traductions.fr;
    const rayonCSS = getComputedStyle(document.documentElement).getPropertyValue('--carousel-rayon').trim() || '320px';

    conteneur.innerHTML = '';

    categories.forEach(cat => {
        const mediasCategorie = medias.filter(m => m.type === cat.type);
        const favorisCategorie = mediasCategorie.filter(m => Boolean(m.favori));
        let sourceElements = favorisCategorie.length > 0 ? favorisCategorie : mediasCategorie;

        if (sourceElements.length === 0) return;

        // Si peu d'éléments, on duplique pour former un anneau 3D fluide
        const cartes3D = [];
        while (cartes3D.length < 4 && sourceElements.length > 0) {
            for (const item of sourceElements) {
                cartes3D.push(item);
                if (cartes3D.length >= 6) break;
            }
            if (sourceElements.length >= 4) break;
        }

        const totalCartes = cartes3D.length;
        const anglePas = 360 / totalCartes;

        const bloc = document.createElement('div');
        bloc.className = 'carousel-category-block';

        const intro = document.createElement('p');
        intro.className = 'carousel-category-intro';
        intro.textContent = dict[cat.introKey];

        const hint = document.createElement('p');
        hint.className = 'carousel-category-hint';
        hint.textContent = dict.carousel_clic_hint;

        const stage = document.createElement('div');
        stage.className = 'carousel-3d-stage';

        const ring = document.createElement('div');
        ring.className = 'carousel-3d-ring';

        cartes3D.forEach((media, index) => {
            const angle = index * anglePas;
            const visuel = obtenirVisuelCarte(media);

            const carte = document.createElement('div');
            carte.className = 'carousel-3d-card';
            carte.style.transform = `rotateY(${angle}deg) translateZ(${rayonCSS})`;

            carte.innerHTML = `
                <img src="${visuel.image}" alt="${media.titre}" onerror="this.src='https://via.placeholder.com/400x260?text=Visuel'">
                ${visuel.estVideo ? '<span class="carousel-3d-play">▶</span>' : ''}
                <div class="carousel-3d-caption">${media.titre}</div>
            `;

            carte.onclick = () => {
                mettreEnPauseCarrousels3D(true);
                if (media.type === 'design' || media.type === '3d') {
                    ouvrirProjetBehance(media.id);
                } else {
                    ouvrirVisionneuse(media.id);
                }
            };

            ring.appendChild(carte);
        });

        const boutonVoirPlus = document.createElement('button');
        boutonVoirPlus.type = 'button';
        boutonVoirPlus.className = 'carousel-more-btn';
        boutonVoirPlus.textContent = dict[cat.btnKey];
        boutonVoirPlus.onclick = () => afficherSection(cat.sectionId);

        stage.appendChild(ring);
        bloc.appendChild(intro);
        bloc.appendChild(hint);
        bloc.appendChild(stage);
        bloc.appendChild(boutonVoirPlus);
        conteneur.appendChild(bloc);
    });
}

// ==========================================
// 5. AFFICHAGE & ÉDITION DU PROFIL (ACCUEIL + PAGE CONTACT + ADMIN)
// ==========================================
function afficherAccueil() {
    document.title = profil.studio ? `${profil.studio} - Portfolio` : "Portfolio";

    const titreAffiche = profil.titre[langueActuelle] || profil.titre.fr;
    const bioAffiche = profil.bio[langueActuelle] || profil.bio.fr;

    document.getElementById('accueil-titre').textContent = titreAffiche;
    document.getElementById('accueil-bio').textContent = bioAffiche;

    const zoneContact = document.getElementById('contact-reseaux');
    if (zoneContact) {
        zoneContact.innerHTML = '';

        if (profil.email) {
            const labelMail = traductions[langueActuelle].contact_email_label;
            zoneContact.innerHTML += `
                <a href="mailto:${profil.email}" class="contact-card-item">
                    <span class="contact-card-icon">✉️</span>
                    <span class="contact-card-title">${labelMail}</span>
                </a>
            `;
        }
        if (profil.instagram) {
            zoneContact.innerHTML += `
                <a href="${profil.instagram}" target="_blank" rel="noopener noreferrer" class="contact-card-item">
                    <span class="contact-card-icon">📸</span>
                    <span class="contact-card-title">Instagram</span>
                </a>
            `;
        }
        if (profil.youtube) {
            zoneContact.innerHTML += `
                <a href="${profil.youtube}" target="_blank" rel="noopener noreferrer" class="contact-card-item">
                    <span class="contact-card-icon">🎬</span>
                    <span class="contact-card-title">YouTube</span>
                </a>
            `;
        }
        if (profil.tiktok) {
            zoneContact.innerHTML += `
                <a href="${profil.tiktok}" target="_blank" rel="noopener noreferrer" class="contact-card-item">
                    <span class="contact-card-icon">🎵</span>
                    <span class="contact-card-title">TikTok</span>
                </a>
            `;
        }
    }

    construireCarrouselsAccueil();
}

function basculerOngletLangueAdmin(lang) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('tab-admin-' + lang).classList.add('active');

    document.querySelectorAll('.admin-lang-panel').forEach(panel => panel.classList.add('hidden'));
    document.getElementById('champs-lang-' + lang).classList.remove('hidden');
}

function remplirFormulaireProfil() {
    document.getElementById('profil-studio').value = profil.studio || '';
    document.getElementById('profil-email').value = profil.email || '';
    
    document.getElementById('profil-titre-fr').value = profil.titre.fr || '';
    document.getElementById('profil-bio-fr').value = profil.bio.fr || '';
    
    document.getElementById('profil-titre-nl').value = profil.titre.nl || '';
    document.getElementById('profil-bio-nl').value = profil.bio.nl || '';
    
    document.getElementById('profil-titre-en').value = profil.titre.en || '';
    document.getElementById('profil-bio-en').value = profil.bio.en || '';

    document.getElementById('profil-instagram').value = profil.instagram || '';
    document.getElementById('profil-youtube').value = profil.youtube || '';
    document.getElementById('profil-tiktok').value = profil.tiktok || '';
}

function sauvegarderProfil(event) {
    event.preventDefault();

    profil = {
        studio: document.getElementById('profil-studio').value.trim(),
        titre: {
            fr: document.getElementById('profil-titre-fr').value.trim(),
            nl: document.getElementById('profil-titre-nl').value.trim(),
            en: document.getElementById('profil-titre-en').value.trim()
        },
        bio: {
            fr: document.getElementById('profil-bio-fr').value.trim(),
            nl: document.getElementById('profil-bio-nl').value.trim(),
            en: document.getElementById('profil-bio-en').value.trim()
        },
        email: document.getElementById('profil-email').value.trim(),
        instagram: document.getElementById('profil-instagram').value.trim(),
        youtube: document.getElementById('profil-youtube').value.trim(),
        tiktok: document.getElementById('profil-tiktok').value.trim()
    };

    sauvegarderDansNavigateur();
    afficherAccueil();
    if (typeof synchroniserTuilesLED === 'function') synchroniserTuilesLED();

    const feedback = document.getElementById('msg-profil-ok');
    feedback.classList.remove('hidden');
    setTimeout(() => feedback.classList.add('hidden'), 3000);
}

// ==========================================
// 6. NAVIGATION ENTRE LES PAGES
// ==========================================
function afficherSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(sectionId).classList.add('active');
    const boutonActif = document.getElementById('btn-' + sectionId);
    if (boutonActif) boutonActif.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    afficherGaleries();
    if (sectionId === 'accueil') {
        construireCarrouselsAccueil();
    }
}

// ==========================================
// 7. SÉCURITÉ / CONNEXION ADMIN (ACCÈS SECRET)
// ==========================================
function ouvrirAdmin() {
    if (estConnecte) {
        afficherSection('admin');
        return;
    }

    const mdp = prompt("Entrez le mot de passe administrateur :");
    if (mdp === MOT_DE_PASSE_ADMIN) {
        estConnecte = true;
        afficherSection('admin');
        remplirFormulaireProfil();
        afficherListeAdmin();
    } else if (mdp !== null) {
        alert("Mot de passe incorrect.");
    }
}

function deconnexionAdmin() {
    estConnecte = false;
    afficherSection('accueil');
}

// ==========================================
// 8. UTILITAIRES YOUTUBE
// ==========================================
function extraireIdYouTube(url) {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
}

function estLienYouTube(url) {
    return extraireIdYouTube(url) !== null;
}

function obtenirLienEmbedYouTube(url, autoplay = 1) {
    const videoId = extraireIdYouTube(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}` : url;
}

function obtenirMiniatureYouTube(url) {
    const videoId = extraireIdYouTube(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : 'https://via.placeholder.com/800x500?text=Video+YouTube';
}

// ==========================================
// 9A. VISIONNEUSE 1 : SIMPLE (PHOTOS & VIDÉOS)
// ==========================================
function ouvrirVisionneuse(id) {
    const mediaClique = medias.find(m => m.id === id);
    if (!mediaClique) return;

    listeVisionneuseActuelle = medias.filter(m => m.type === mediaClique.type);
    indexVisionneuseActuel = listeVisionneuseActuelle.findIndex(m => m.id === id);

    afficherMediaDansVisionneuse();
    document.getElementById('visionneuse').classList.remove('hidden');
}

function afficherMediaDansVisionneuse() {
    const media = listeVisionneuseActuelle[indexVisionneuseActuel];
    if (!media) return;

    const contenu = document.getElementById('visionneuse-contenu');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (listeVisionneuseActuelle.length > 1) {
        btnPrev.classList.remove('hidden');
        btnNext.classList.remove('hidden');
    } else {
        btnPrev.classList.add('hidden');
        btnNext.classList.add('hidden');
    }

    if (media.type === 'video' || estLienYouTube(media.url)) {
        const embedUrl = obtenirLienEmbedYouTube(media.url, 1);
        contenu.innerHTML = `
            <div class="lightbox-video-wrapper">
                <iframe 
                    src="${embedUrl}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
            </div>
        `;
    } else {
        contenu.innerHTML = `<img src="${media.url}" alt="${media.titre}">`;
    }
}

function changerMediaVisionneuse(direction) {
    const total = listeVisionneuseActuelle.length;
    if (total <= 1) return;

    indexVisionneuseActuel = (indexVisionneuseActuel + direction + total) % total;
    afficherMediaDansVisionneuse();
}

function fermerVisionneuse(event) {
    if (event.target.id === 'visionneuse' || event.target.classList.contains('lightbox-close')) {
        const visionneuse = document.getElementById('visionneuse');
        const contenu = document.getElementById('visionneuse-contenu');
        
        visionneuse.classList.add('hidden');
        contenu.innerHTML = '';
        mettreEnPauseCarrousels3D(false);
    }
}

// ==========================================
// 9B. VISIONNEUSE 2 : PAGE PROJET BEHANCE + BARRE PROGRESSION + RETOUR EN HAUT
// ==========================================
function ouvrirProjetBehance(id) {
    const projet = medias.find(m => m.id === id);
    if (!projet) return;

    const modal = document.getElementById('behance-modal');
    const stream = document.getElementById('behance-stream');

    document.getElementById('behance-badge').textContent = projet.type === '3d' ? 'PROJET 3D' : 'DESIGN';
    document.getElementById('behance-titre').textContent = projet.titre;
    document.getElementById('behance-desc').textContent = projet.description || '';

    stream.innerHTML = '';
    stream.appendChild(creerBlocVisuelBehance(projet.url, projet.titre, null));

    if (projet.etapes && projet.etapes.length > 0) {
        projet.etapes.forEach((etape, index) => {
            if (etape.url || etape.legende) {
                stream.appendChild(creerBlocVisuelBehance(etape.url, `${projet.titre} - Étape ${index + 1}`, etape.legende, index + 1));
            }
        });
    }

    modal.scrollTop = 0;
    modal.classList.remove('hidden');

    setTimeout(mettreAJourProgressionBehance, 50);
}

function remonterHautBehance() {
    const modal = document.getElementById('behance-modal');
    if (modal) {
        modal.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function mettreAJourProgressionBehance() {
    const modal = document.getElementById('behance-modal');
    const barre = document.getElementById('behance-progress-bar');
    if (!modal || !barre) return;

    const distanceDefilee = modal.scrollTop;
    const hauteurTotaleDefilable = modal.scrollHeight - modal.clientHeight;

    if (hauteurTotaleDefilable <= 0) {
        barre.style.width = '100%';
    } else {
        const pourcentage = Math.min(100, Math.max(0, (distanceDefilee / hauteurTotaleDefilable) * 100));
        barre.style.width = pourcentage + '%';
    }
}

function creerBlocVisuelBehance(url, altText, legende, numeroEtape) {
    const bloc = document.createElement('div');
    bloc.className = 'behance-block';

    let mediaHTML = '';
    if (url) {
        if (estLienYouTube(url)) {
            const embedUrl = obtenirLienEmbedYouTube(url, 0);
            mediaHTML = `
                <div class="behance-video-frame">
                    <iframe src="${embedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            `;
        } else {
            mediaHTML = `<img src="${url}" alt="${altText}" loading="lazy" onload="mettreAJourProgressionBehance()" onerror="this.src='https://via.placeholder.com/1050x600?text=Visuel+introuvable'">`;
        }
    }

    let legendeHTML = '';
    if (legende && legende.trim() !== '') {
        const labelEtape = numeroEtape ? `<span class="behance-step-number">Étape ${numeroEtape}</span>` : '';
        legendeHTML = `<div class="behance-caption">${labelEtape}${legende}</div>`;
    }

    bloc.innerHTML = mediaHTML + legendeHTML;
    return bloc;
}

function fermerBehanceModal(event) {
    if (event.target.id === 'behance-modal' || event.target.classList.contains('behance-close-btn')) {
        const modal = document.getElementById('behance-modal');
        modal.classList.add('hidden');
        document.getElementById('behance-stream').innerHTML = '';
        document.getElementById('behance-progress-bar').style.width = '0%';
        mettreEnPauseCarrousels3D(false);
    }
}

// ==========================================
// 9C. RACCOURCIS CLAVIER (ÉCHAP, FLÈCHES & ACCÈS ADMIN SECRET)
// ==========================================
document.addEventListener('keydown', function(event) {
    const visionneuse = document.getElementById('visionneuse');
    const behanceModal = document.getElementById('behance-modal');

    if (event.ctrlKey && event.shiftKey && (event.key === 'A' || event.key === 'a')) {
        event.preventDefault();
        ouvrirAdmin();
        return;
    }

    if (event.key === 'Escape') {
        let ferme = false;
        if (!behanceModal.classList.contains('hidden')) {
            behanceModal.classList.add('hidden');
            document.getElementById('behance-stream').innerHTML = '';
            document.getElementById('behance-progress-bar').style.width = '0%';
            ferme = true;
        }
        if (!visionneuse.classList.contains('hidden')) {
            visionneuse.classList.add('hidden');
            document.getElementById('visionneuse-contenu').innerHTML = '';
            ferme = true;
        }
        if (ferme) {
            mettreEnPauseCarrousels3D(false);
        }
    } else if (!visionneuse.classList.contains('hidden')) {
        if (event.key === 'ArrowRight') changerMediaVisionneuse(1);
        if (event.key === 'ArrowLeft') changerMediaVisionneuse(-1);
    }
});

// ==========================================
// 10. AFFICHAGE DES 4 GALERIES (PHOTOS, VIDÉOS, DESIGN, 3D)
// ==========================================
function afficherGaleries() {
    const grilles = {
        photo: document.getElementById('grille-photos'),
        video: document.getElementById('grille-videos'),
        design: document.getElementById('grille-design'),
        '3d': document.getElementById('grille-3d')
    };

    Object.values(grilles).forEach(g => { if (g) g.innerHTML = ''; });

    medias.forEach(media => {
        const grilleCible = grilles[media.type];
        if (!grilleCible) return;

        const carte = document.createElement('div');
        carte.className = 'media-card';

        if (media.type === 'design' || media.type === '3d') {
            carte.onclick = () => ouvrirProjetBehance(media.id);
        } else {
            carte.onclick = () => ouvrirVisionneuse(media.id);
        }

        const nbEtapes = (media.etapes && media.etapes.length > 0) ? media.etapes.length : 0;
        const badgeEtapesHTML = (media.type === 'design' || media.type === '3d')
            ? `<span class="steps-badge">📑 Voir le projet complet (${nbEtapes + 1} visuels)</span>`
            : '';

        if (media.type === 'video' || estLienYouTube(media.url)) {
            const miniatureUrl = obtenirMiniatureYouTube(media.url);
            const wrapperClass = media.type === 'video' ? 'video-thumb-wrapper' : 'masonry-thumb-wrapper';
            
            carte.innerHTML = `
                <div class="${wrapperClass}">
                    <img src="${miniatureUrl}" alt="${media.titre}" loading="lazy">
                    <div class="play-overlay">▶</div>
                </div>
                <div class="media-info">
                    <h3>${media.titre}</h3>
                    <p>${media.description}</p>
                    ${badgeEtapesHTML}
                </div>
            `;
        } else {
            carte.innerHTML = `
                <div class="masonry-thumb-wrapper">
                    <img src="${media.url}" alt="${media.titre}" loading="lazy" onerror="this.src='https://via.placeholder.com/800x500?text=Image+introuvable'">
                </div>
                <div class="media-info">
                    <h3>${media.titre}</h3>
                    <p>${media.description}</p>
                    ${badgeEtapesHTML}
                </div>
            `;
        }

        grilleCible.appendChild(carte);
        observateurScroll.observe(carte);
    });
}

// ==========================================
// 11. GESTION DES SOUS-ÉTAPES BEHANCE DANS L'ADMIN
// ==========================================
function basculerZoneEtapesBehance() {
    const type = document.getElementById('media-type').value;
    const zoneEtapes = document.getElementById('zone-etapes-behance');

    if (type === 'design' || type === '3d') {
        zoneEtapes.classList.remove('hidden');
    } else {
        zoneEtapes.classList.add('hidden');
    }
}

function ajouterChampEtape(urlExistante = '', legendeExistante = '') {
    const conteneur = document.getElementById('liste-champs-etapes');
    const numero = conteneur.children.length + 1;

    const blocEtape = document.createElement('div');
    blocEtape.className = 'etape-admin-item';
    blocEtape.innerHTML = `
        <div class="etape-admin-top">
            <strong>Sous-étape #${numero}</strong>
            <button type="button" class="btn-small-danger" onclick="supprimerChampEtape(this)">Supprimer</button>
        </div>
        <div class="form-group" style="margin-bottom: 0.8rem;">
            <label>Lien image directe ou vidéo YouTube de cette étape :</label>
            <input type="text" class="etape-url-input" value="${urlExistante}" placeholder="https://i.ibb.co/... ou lien YouTube">
        </div>
        <div class="form-group" style="margin-bottom: 0;">
            <label>Explication / Légende de cette étape :</label>
            <textarea class="etape-legende-input" rows="2" placeholder="Ex: Recherche de formes, maillage wireframe, éclairage...">${legendeExistante}</textarea>
        </div>
    `;
    conteneur.appendChild(blocEtape);
}

function supprimerChampEtape(bouton) {
    bouton.closest('.etape-admin-item').remove();
    document.querySelectorAll('#liste-champs-etapes .etape-admin-item').forEach((item, index) => {
        item.querySelector('strong').textContent = `Sous-étape #${index + 1}`;
    });
}

// ==========================================
// 12. AJOUTER, MODIFIER, METTRE EN FAVORI & SUPPRIMER (CRUD)
// ==========================================
function basculerFavoriMedia(id) {
    const media = medias.find(m => m.id === id);
    if (!media) return;

    media.favori = !Boolean(media.favori);
    sauvegarderDansNavigateur();
    afficherListeAdmin();
    construireCarrouselsAccueil();
}

function sauvegarderMedia(event) {
    event.preventDefault();

    const idModif = document.getElementById('media-id').value;
    const type = document.getElementById('media-type').value;
    const favori = Boolean(document.getElementById('media-favori').checked);
    const titre = document.getElementById('media-titre').value;
    const url = document.getElementById('media-url').value.trim();
    const description = document.getElementById('media-desc').value;

    let etapes = [];
    if (type === 'design' || type === '3d') {
        document.querySelectorAll('#liste-champs-etapes .etape-admin-item').forEach(item => {
            const etapeUrl = item.querySelector('.etape-url-input').value.trim();
            const etapeLegende = item.querySelector('.etape-legende-input').value.trim();
            if (etapeUrl || etapeLegende) {
                etapes.push({ url: etapeUrl, legende: etapeLegende });
            }
        });
    }

    if (idModif) {
        const index = medias.findIndex(m => m.id == idModif);
        if (index !== -1) {
            medias[index] = { id: Number(idModif), type, favori, titre, url, description, etapes };
        }
    } else {
        const nouveauMedia = {
            id: Date.now(),
            type,
            favori,
            titre,
            url,
            description,
            etapes
        };
        medias.unshift(nouveauMedia);
    }

    sauvegarderDansNavigateur();
    reinitialiserFormulaire();
    afficherListeAdmin();
    afficherGaleries();
    construireCarrouselsAccueil();
}

function preparerModification(id) {
    const media = medias.find(m => m.id === id);
    if (!media) return;

    document.getElementById('media-id').value = media.id;
    document.getElementById('media-type').value = media.type;
    document.getElementById('media-favori').checked = Boolean(media.favori);
    document.getElementById('media-titre').value = media.titre;
    document.getElementById('media-url').value = media.url;
    document.getElementById('media-desc').value = media.description;

    basculerZoneEtapesBehance();
    const conteneurEtapes = document.getElementById('liste-champs-etapes');
    conteneurEtapes.innerHTML = '';

    if (media.etapes && media.etapes.length > 0) {
        media.etapes.forEach(etape => {
            ajouterChampEtape(etape.url, etape.legende);
        });
    }

    document.getElementById('titre-formulaire').textContent = "Modifier le média";
    document.getElementById('btn-submit').textContent = "Enregistrer les modifications";
    document.getElementById('btn-annuler').classList.remove('hidden');
}

function supprimerMedia(id) {
    if (confirm("Es-tu sûr de vouloir supprimer cet élément ?")) {
        medias = medias.filter(m => m.id !== id);
        sauvegarderDansNavigateur();
        afficherListeAdmin();
        afficherGaleries();
        construireCarrouselsAccueil();
    }
}

function reinitialiserFormulaire() {
    document.getElementById('media-form').reset();
    document.getElementById('media-id').value = '';
    document.getElementById('media-favori').checked = false;
    document.getElementById('liste-champs-etapes').innerHTML = '';
    basculerZoneEtapesBehance();
    document.getElementById('titre-formulaire').textContent = "Ajouter un nouveau média";
    document.getElementById('btn-submit').textContent = "Ajouter au portfolio";
    document.getElementById('btn-annuler').classList.add('hidden');
}

function afficherListeAdmin() {
    const listeAdmin = document.getElementById('liste-admin');
    listeAdmin.innerHTML = '';

    const badges = {
        photo: '📷 Photo',
        video: '🎬 Vidéo',
        design: '🎨 Design',
        '3d': '🧊 3D'
    };

    medias.forEach(media => {
        const badge = badges[media.type] || '📁 Média';
        const infoEtapes = (media.etapes && media.etapes.length > 0) ? ` • ${media.etapes.length} sous-étape(s)` : '';
        const estFav = Boolean(media.favori);
        const etoileIcone = estFav ? '★' : '☆';
        const titreEtoile = estFav ? 'Retirer des favoris du carrousel 3D' : 'Ajouter aux favoris du carrousel 3D';
        
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <div>
                <strong>[${badge}] ${media.titre}${infoEtapes}</strong>
                <p style="font-size: 0.85rem; color: #9ca3af;">${media.url}</p>
            </div>
            <div class="admin-item-actions">
                <button type="button" onclick="basculerFavoriMedia(${media.id})" class="btn-fav-star ${estFav ? 'active' : ''}" title="${titreEtoile}">${etoileIcone}</button>
                <button onclick="preparerModification(${media.id})" class="btn-secondary">Modifier</button>
                <button onclick="supprimerMedia(${media.id})" class="btn-danger">Supprimer</button>
            </div>
        `;
        listeAdmin.appendChild(item);
    });
}

// Lancement initial au chargement de la page
changerLangue(langueActuelle);
afficherGaleries();
synchroniserVideoEcranPC();
window.scrollTo(0, 0);

if (window.location.search.includes('admin')) {
    ouvrirAdmin();
}