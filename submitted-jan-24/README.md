# Weather PromoCode

Bienvenue dans le projet Weather PromoCode.
Ce service de gestion de codes promotionnels est destiné à une entreprise de réservation de VTC similaire à Uber.
L'objectif est d'encourager les clients à réserver sous certaines conditions en appliquant des réductions via
l'utilisation de "promocodes", par exemple lorsqu'il fait beau.

## Lancement du projet

À l'ouverture de l'éditeur, lancer `npm install` pour installer toutes les dépendances spécifiées dans
le `package.json`.
Pour exécuter les tests avec un terminal de commande, placez-vous à la racine du projet puis lancez :

- `npm run test` pour exécuter les tests une seule fois ; ou
- `npm run test:watch` pour exécuter les tests en mode "observation" (watch mode) ce qui permet de relancer
  automatiquement les tests lorsqu'un fichier change.

## Description

Le service prend la forme d'une fonction `askReduction` qui, à partir d'un code promo `promoCode`, et d'information client `redeemInfo`, peut fournir une réduction.

### Entrées

Les conditions d'application du `promoCode` qui a été ajouté par l'équipe marketing au format json peut contenir plusieurs types de restrictions :
- `name` : le promoCode saisi par l'utilisateur doit correspondre exactement à celui spécifié ;
- `age` : l'utilisateur doit avoir un âge égal, supérieur, inférieur, ou compris dans un intervalle défini ; 
- `date` : l'utilisateur doit utiliser le PromoCode pendant une période spécifiée, avant, après, ou le jour exact de la validité précisée ;
- `weather` : les conditions météorologiques doivent correspondre à un type spécifique et/ou à une température définie, ces données étant récupérées via l'API OpenWeather ;
- `@or` : l'utilisation de cette condition permet de rendre l'âge, la date et la météo alternatives. Si l'une de ces conditions est satisfaite, les autres n'ont pas besoin de l'être. La profondeur de ces restrictions peut être arbitraire et sans limite grâce à l'utilisation de la condition @or.

**Exemple d'entrées promoCode complexe :**
``` js
const promoCode = {
  name: "ComplexCode",
  advantage: { percent: 20 },
  restrictions: {
  {
    "@or": [
      {
        "@age": {
          eq: 40,
          },
        },
        {
        "@age": {
          gt: 15,
          lt: 30,
        },
      },
    ],
    "@date": {
      after: "2024-01-04",
      before: "2024-12-31",
      },
    "@weather": {
      is: "clear",
      temp: {
        lt: "100",
      },
    },
  }
     
```

Les informations client `redeemInfo` qui vont être comparées avec les conditions d'application du `promoCode` contiennent :
- `promocode_name` : le nom du promoCode saisi par l'utilisateur ;
- `age` : l'âge de l'utilisateur ;
- `date` : la date de l'utilisation du promoCode ; et
- `weather` : la ville de l'utilisateur.

**Exemple d'entrées redeemInfo :**
``` js
const redeemInfo = {
  promocode_name: "ComplexCode",
  arguments: {
  age: 16,
  date: "2024-07-07",
  weather: { town: "Lyon" },
  },
};
```

### Outputs

Les vérifications effectuées par le service `askReduction` conduira à la sortie de deux status possibles :
- **"accepted"** : si les conditions du promoCode sont remplies, la sortie contient les nom, statut et avantage de celui-ci ;

**Exemple de sortie d'un promoCode acceptée :**
``` json
{
  "promocode_name": "WeatherCode",
  "status": "accepted",
  "avantage": { "percent": 20 }
}  
```

- **"denied"** : si les conditions du promoCode ne sont pas remplies, la sortie contient les nom, statut et raisons du rejet. Ces raisons sont spécifiques à chaque type de restriction :
  - si le `name` saisi par l'utilisateur ne correspond pas au promoCode, la raison est "isIncorrect" ;
  - si l'`age` de l'utilisateur n'est pas égal, la raison est 'isNotEq'. Si l'âge est inférieur au lieu d'être supérieur, la raison est 'isNotGT', et s'il est supérieur au lieu d'être inférieur, la raison est 'isNotLT' ;
  - si la `date` de l'utilisateur n'est pas postérieure à une date précise, la raison est 'isNotAfter'. Si elle n'est pas antérieure, la raison est 'isNotBefore', et si elle n'est pas identique, la raison est 'isNotEq' ;
  - si la ville de l'utilisateur a une `weather` qui n'est pas claire (par exemple nuageuse), la raison est 'isNotClear'. Si la température inférieure au lieu d'être supérieure, la raison est 'isNotGT', et si elle est supérieure au lieu d'être inférieure, la raison est 'isNotLT'.


**Exemple de sortie d'un promoCode refusé :**
``` json
{
  "promocode_name": "WeatherCode",
  "status": "denied",
  "reasons": {
    "meteo": "isNotClear"
  }
}
```

## Choix techniques

En m'appuyant sur le fichier `consignes.md` du projet, j'ai effectué plusieurs choix techniques pour garantir la
flexibilité et la sécurité du service lors du développement :

- Absence de `@and` dans les restrictions, ce n'était pas nécessaire pour créer l'ensemble des restrictions possibles
  d'un promoCode et n'était pas présent dans les exemples de la consigne ;
- Ajout de packages :
    - `axios` pour ce qui concerne l'API OpenWeather,
    - `date-fns` pour permettre la reconnaissance des dates en JavaScript,
    - `dotenv` pour permettre de stocker l'API de manière sécurisée dans un fichier `.env` qui est ignoré,
    - `jest-config` pour ajouter la configuration de l'environnement de test `jest`,
    - `prettier` pour appliquer un style de code clair et cohérent dans tous les fichiers.

## Points d'amélioration

Voici ci-après quelques éléments qui pourraient améliorer le service :

- Ajouter une liste des raisons "denied" dans un tableau pour fournir des détails spécifiques plutôt que de retourner
  uniquement la dernière raison "denied" ;
- Gérer les erreurs liées à l'appel de l'API OpenWeather ; et
- Gestion différents formats de dates.
