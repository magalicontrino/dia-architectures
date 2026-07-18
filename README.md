# DIA architectures

Site vitrine pour **DIA architectures** — atelier d'architecture entre Bruxelles,
Marseille et Udine.

Site statique : HTML, CSS et JavaScript sans dépendance ni étape de build.
Il suffit d'ouvrir `index.html` ou de servir le dossier tel quel.

## Structure

```
index.html              page unique (hero, intentions, projets, atelier, contact)
assets/css/style.css    feuille de style
assets/js/main.js       galerie, visionneuse, animations
assets/projects/        les 17 photographies
```

## Contenu

Les **17 photographies** proviennent du site existant
(<https://www.dia-architectures.org>) et ont été récupérées en pleine résolution.

> **À relire avant mise en ligne.** Les photos sont authentiques, mais les
> textes ne le sont pas : je n'avais aucune information éditoriale sur
> l'atelier. Sont donc **à remplacer** :
>
> - les textes de la section « Intentions » et de la section « Atelier » ;
> - la citation de la bande pleine largeur ;
> - la date de fondation (2023, déduite du copyright du site actuel) et les
>   langues listées dans le tableau de faits ;
> - les **titres des images** (« Façade sombre », « Escalier hélicoïdal »…),
>   qui décrivent ce que l'on voit sur la photo — ce ne sont pas les vrais noms
>   des projets ;
> - la catégorie associée à chaque image (Logement, Équipement, Réhabilitation,
>   Mobilier), attribuée d'après l'image seule.
>
> Seuls l'adresse e-mail (`info@dia-architectures.org`) et les trois villes
> viennent du site d'origine.

## Modifier la galerie

Tout est piloté par le tableau `WORK` en haut de `assets/js/main.js` : un objet
par image (fichier, dimensions, titre, catégorie, texte alternatif). Le drapeau
`hero: true` fait entrer l'image dans le diaporama d'accueil. La grille, la
visionneuse et les compteurs se mettent à jour automatiquement.

## Détails techniques

- Diaporama d'accueil en fondu, mis en pause quand l'onglet est masqué.
- Visionneuse : clavier (← → Échap), boutons, balayage tactile, retour du focus
  à la tuile d'origine.
- Apparition au défilement via `IntersectionObserver`, désactivée si
  `prefers-reduced-motion` est demandé.
- Images en `loading="lazy"` avec `width`/`height` pour éviter les sauts de mise
  en page.

## Mise en ligne

Le dossier est prêt pour n'importe quel hébergeur statique. Pour GitHub Pages :
`Settings → Pages → Deploy from a branch → main / (root)`.
