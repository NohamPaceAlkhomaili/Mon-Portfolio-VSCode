# Mon Portfolio (Photo, Vidéo, Design & 3D)

## Contenu du dossier
- `index.html` : La structure principale du site (Accueil, 4 galeries, Espace Admin, Visionneuse et Page projet façon Behance).
- `style.css` : L'apparence visuelle (Thème sombre, grille Masonry, animations Scroll Reveal, barre de progression capsule).
- `script.js` : Toute la logique interactive (Gestion Admin, multilingue FR/NL/EN, visionneuses, sauvegarde dans le navigateur).

## Comment ouvrir et tester le projet dans Visual Studio Code (VS Code)
1. Extrais tout le contenu de ce fichier ZIP dans un nouveau dossier sur ton ordinateur (par exemple `Mon-Portfolio`).
2. Ouvre **Visual Studio Code**, clique sur **Fichier > Ouvrir le dossier...** (`File > Open Folder...`) et sélectionne le dossier `Mon-Portfolio`.
3. Double-clique sur `index.html` dans ton explorateur de fichiers Windows/Mac (ou utilise l'extension **Live Server** dans VS Code en cliquant sur *Go Live* en bas à droite) pour afficher ton site dans le navigateur.

## Paramètres utiles
- **Mot de passe Admin :** Modifie la constante `MOT_DE_PASSE_ADMIN` tout en haut du fichier `script.js` (actuellement `"admin123"`).
- **Sauvegarde des données :** Les modifications faites dans l'Admin sont enregistrées dans le `localStorage` de ton navigateur. Note que changer de navigateur ou de PC réinitialise l'affichage aux données par défaut définies dans `script.js`.
