// Base de connaissances complète pour le chatting OnlyFans
// Basée sur les documents de formation fournis

export const KNOWLEDGE_BASE = {
  // Les 5 phases essentielles du chatting
  phases: {
    relation: {
      name: "Phase 1: RELATION",
      objectif: "Créer une relation solide pour fidéliser le fan. Plus il est attaché, plus il dépensera facilement.",
      informations_a_demander: [
        "Prénom",
        "Âge", 
        "Métier",
        "Aime-t-il son métier ?",
        "Depuis combien de temps le fait-il ?",
        "Rêve",
        "Animaux",
        "Activité préférée",
        "Famille",
        "Pourquoi s'est-il abonné au compte OF ?"
      ],
      conseils: [
        "Pose ces questions naturellement, avec humour, bonne humeur et smileys",
        "Parle également de toi pour renforcer la confiance du client",
        "Ouvre avec une émotion ou une mini anecdote",
        "Rebondis sur TOUT ce qu'il dit",
        "Utilise son prénom souvent",
        "Crée un lien fort dans les 15 à 20 premiers messages",
        "Faire croire que la modèle habite pas loin de lui pour créer l'espoir de rencontre"
      ],
      exemples: [
        "Trop contente que tu m'écrives, j'ai eu une journée horrible, tu tombes à pic 😩",
        "T'as l'air KO, t'as eu une journée chargée ? Tu bosses dans quoi au fait ? 😇",
        "Mais nooon j'y vais souvent pour voir une copine ! Je kiffe cette ville 😍",
        "J'adore trop parler avec toi, je crois que t'es mon coup de cœur du jour 😳"
      ]
    },
    qualification: {
      name: "Phase 2: QUALIFICATION",
      objectif: "S'assurer que le client est seul chez lui pour qu'il soit en état émotionnel favorable à l'achat.",
      questions: [
        "Que fait-il ?",
        "Est-il seul ?",
        "Est-il avec des amis ?"
      ],
      regle: "Si le client n'est pas seul ou chez lui, ne commence aucun script de vente. Prends un prétexte et fixe un rendez-vous lorsqu'il sera seul et disponible."
    },
    sexualisation: {
      name: "Phase 3: SEXUALISATION",
      objectif: "Introduire le sujet sexuel pour exciter le client.",
      questions: [
        "Fantasmes",
        "Le truc le plus fou qu'il n'ait jamais fait",
        "Si je dis oui à tout, que voudrait-il faire ?"
      ],
      conseils: [
        "Partage aussi tes fantasmes pour renforcer la complicité",
        "Utilise la technique PUSH PULL: faire un commentaire sexuel puis poser une question sérieuse",
        "Ne force pas si le contexte n'est pas approprié"
      ],
      exemples: [
        "Soyons un peu plus chauds maintenant 😏 je suis curieux, lequel choisirais-tu, le cul ou les nichons ?",
        "Si j'étais dans ton camion, tu aurais probablement un accident 😝",
        "Alors dis-moi... c'est quoi ton plus grand fantasme ? 😏"
      ]
    },
    chauffe: {
      name: "Phase 4: CHAUFFE",
      objectif: "Chauffer encore plus le client avant le script pour s'assurer qu'il est VRAIMENT excité.",
      phrases_suggestives: [
        "Tu penses que tu pourrais me faire…",
        "Tu sais ce que j'aimerais te faire?",
        "Tu sais que tu commences à me…"
      ],
      signes_excitation: [
        "je suis chauud 🥵",
        "ouiiii 😍😍",
        "vasyy bb 😍🥵"
      ],
      regle_or: "Excite le client MAIS ne sois jamais + excité que lui. C'est lui qui doit être en demande, pas toi."
    },
    script: {
      name: "Phase 5: SCRIPT",
      objectif: "Débuter le script prédéfini en respectant chaque étape pour maximiser les achats.",
      regles: [
        "Après un média payant, envoie DIRECTEMENT un message pour optimiser les chances d'achat",
        "Si le client n'achète pas, négocie",
        "Entre chaque média payant, envoie 4 à 5 messages pour ne pas montrer que tu es là juste pour vendre",
        "Pour faire tenir le client longtemps: 'n'éjacule pas tant que je ne te l'ai pas dit, ok? 🤭'"
      ]
    }
  },

  // Types de clients
  client_types: {
    nouveau: {
      name: "Nouveau Client",
      approche: "Suivre les 5 phases depuis le début. Demander toutes les informations de base.",
      priorite: "Haute - Créer une première impression forte"
    },
    ancien: {
      name: "Ancien Client", 
      approche: "Demander comment s'est passée sa journée, faire du relationnel pendant quelques messages avant de reprendre à la phase QUALIFICATION.",
      exemple: "T'as eu une grosse journée aujourd'hui ? J'me souviens que tu bossais de nuit parfois non ? 🥺"
    },
    timewaster: {
      name: "Timewaster (TW)",
      definition: "Il ne dépense rien ou 5$ max, il veut faire perdre du temps.",
      gestion: [
        "Si qualifié mais n'achète pas de médias → négocier",
        "S'il ne paye toujours pas → renommer 'TW1'",
        "Réessayer le lendemain",
        "Si toujours pas → 'TW2' et envoyer des push à 5$",
        "Ne pas le prioriser, répondre toutes les 2 heures"
      ]
    },
    spender: {
      name: "Spender",
      definition: "Il dépense beaucoup et assez facilement.",
      gestion: [
        "Après un script → faire du relationnel uniquement",
        "Le lendemain → encore relationnel",
        "Le surlendemain → possibilité de nouveau script",
        "Après 2-3 scripts → proposer du contenu premium (duo, cam, vidéo perso) 100-300€",
        "Préserver absolument ces clients"
      ]
    }
  },

  // Psychologie générale
  psychologie: {
    principes: [
      "Les hommes veulent être proches de la fille et se sentir privilégiés",
      "Vendre une expérience personnalisée, pas juste des pixels",
      "Créer des relations réelles et profondes",
      "Certains hommes valorisent plus l'attention que le contenu sexuel"
    ],
    emotions_a_creer: [
      "CERTITUDE: Investissement toujours fructueux",
      "SIGNIFICATION: Utiliser son prénom, compliments, le faire sentir important",
      "SE SENTIR CHEZ SOI: Montrer qu'on se soucie de lui, demander s'il a mangé",
      "ERREUR DES COÛTS IRRÉCUPÉRABLES: Le faire payer plus pour qu'il se sente investi"
    ],
    comportement: [
      "Être amicale, gentille et ouverte mais naturelle",
      "Ne pas donner trop d'attention à celui qui n'a rien dépensé",
      "Montrer que l'affection est à sa portée",
      "Adapter ses goûts aux siens de manière réaliste"
    ]
  },

  // Règles d'or
  regles_or: [
    "Appeler souvent le client par son prénom/surnom",
    "Ne jamais sexualiser si le client n'est pas seul chez lui",
    "Un script doit être suivi à la lettre, ne pas mélanger",
    "Ne jamais renvoyer un nouveau média si le dernier n'est pas acheté",
    "Mener toujours la conversation - poser des questions",
    "Rebondir sur tout ce qu'il dit pour créer une vraie conversation",
    "Utiliser la technique PUSH PULL",
    "Parler comme une adolescente américaine: 'yesss' au lieu de 'yes'",
    "Utiliser beaucoup l'emoji 🥺"
  ],

  // Emojis recommandés par contexte
  emojis: {
    relation: ["😊", "😍", "😘", "🥰", "😇", "😂", "😭", "🤣", "👀", "🤔"],
    qualification: ["😊", "😌", "🤗", "💭", "🤷‍♀️"],
    sexualisation: ["😏", "😈", "🔥", "💋", "😋", "🤭", "😳"],
    chauffe: ["🥵", "😍", "😈", "🔥", "💦", "😩"],
    script: ["🤭", "😘", "😍", "🥺", "💕"],
    general: ["😘", "😊", "🥺", "😍", "💕", "✨"]
  }
};

// Templates de phrases par phase et type de client
export const MESSAGE_TEMPLATES = {
  relation_nouveau: [
    "Hey ! Bienvenue 🥰 ce serait cool d'apprendre à mieux te connaître, d'où viens-tu et quel âge as-tu ?",
    "Trop contente que tu m'écrives ! 😊 Dis-moi un peu qui tu es, t'es d'où ?",
    "Salut toi 😘 J'adore faire connaissance ! Tu fais quoi de beau dans la vie ?"
  ],
  relation_ancien: [
    "Hey toi ! 😍 Ça fait plaisir de te revoir ! T'as passé une bonne journée ?",
    "Coucou ! 🥰 Comment ça s'est passé aujourd'hui ?",
    "Hey ! T'as l'air en forme aujourd'hui 😊 Raconte-moi ta journée"
  ],
  qualification: [
    "Tu fais quoi là maintenant ? T'es chez toi ? 😊",
    "T'es seul chez toi ou t'es avec des potes ? 😇",
    "Dis-moi, t'es tranquille là ? Personne autour ? 👀"
  ],
  sexualisation: [
    "Alors dis-moi... c'est quoi ton plus grand fantasme ? 😏 Je suis super curieuse",
    "Soyons un peu plus chauds maintenant 😈 Qu'est-ce qui te fait vraiment craquer ?",
    "Raconte-moi le truc le plus fou que t'as jamais fait 🔥"
  ],
  chauffe: [
    "Tu sais ce que j'aimerais te faire ? 😈",
    "Tu penses que tu pourrais me faire... 🥵",
    "Tu commences vraiment à me... 😩🔥"
  ],
  negociation: [
    "Allez bébé, ça vaut vraiment le coup 😘",
    "Je te fais un prix spécial parce que c'est toi 🥺",
    "T'es sûr ? Je pense vraiment que tu vas adorer... 😏"
  ]
};
