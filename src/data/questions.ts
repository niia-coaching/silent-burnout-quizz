import { Question, BatteryType } from '../types';

export const questions: Question[] = [
  // BATTERIE PHYSIQUE (5 questions)
  {
    id: 'phys-1',
    battery: 'physical',
    text: 'Sommeil',
    options: [
      { text: 'Je dors bien et me réveille reposé(e)', points: 6, example: 'Exemple : Tu te réveilles naturellement sans réveil, tu te sens en forme dès le matin' },
      { text: 'Je dors mais ne me sens pas vraiment reposé(e)', points: 4, example: 'Exemple : Tu dors tes 7-8h mais tu as encore envie de dormir au réveil' },
      { text: 'J\'ai du mal à m\'endormir ou je me réveille la nuit', points: 2, example: 'Exemple : Tu tournes 1h avant de t\'endormir, ou tu te réveilles à 3h du matin' },
      { text: 'Je suis constamment fatigué(e) même après 8h de sommeil', points: 0, example: 'Exemple : Même après 10h de sommeil, tu te réveilles épuisé(e)' }
    ]
  },
  {
    id: 'phys-2',
    battery: 'physical',
    text: 'Ton niveau d\'énergie dans la journée',
    options: [
      { text: 'Stable et suffisant', points: 6, example: 'Exemple : Tu as de l\'énergie de 8h à 20h sans coup de fatigue' },
      { text: 'Variable, des hauts et des bas', points: 4, example: 'Exemple : Tu as un coup de mou vers 15h mais ça repasse' },
      { text: 'Faible dès le matin', points: 2, example: 'Exemple : Dès le réveil, tu as besoin de café pour démarrer' },
      { text: 'Épuisé(e) en permanence', points: 0, example: 'Exemple : Tu carbures au café toute la journée pour tenir debout' }
    ]
  },
  {
    id: 'phys-3',
    battery: 'physical',
    text: 'Tensions corporelles',
    options: [
      { text: 'Rarement ou jamais', points: 6, example: 'Exemple : Ton corps est souple, détendu, sans douleurs' },
      { text: 'Occasionnellement (nuque, dos)', points: 4, example: 'Exemple : Quelques tensions en fin de journée mais ça passe' },
      { text: 'Fréquemment (maux de tête, tensions)', points: 2, example: 'Exemple : Nuque raide plusieurs fois par semaine, maux de tête réguliers' },
      { text: 'Constamment (tout le corps est tendu)', points: 0, example: 'Exemple : Mâchoires serrées, épaules nouées, dos bloqué en permanence' }
    ]
  },
  {
    id: 'phys-4',
    battery: 'physical',
    text: 'Ton alimentation et digestion',
    options: [
      { text: 'Équilibrée, pas de soucis digestifs', points: 6, example: 'Exemple : Tu manges sainement, digestion fluide et régulière' },
      { text: 'Parfois déséquilibrée, légers troubles', points: 4, example: 'Exemple : Tu sautes parfois des repas, ballonnements occasionnels' },
      { text: 'Repas sautés, estomac noué fréquent', points: 2, example: 'Exemple : Tu oublies de manger, ton estomac est souvent noué' },
      { text: 'Troubles digestifs constants, alimentation chaotique', points: 0, example: 'Exemple : Estomac douloureux en permanence, tu grignotes n\'importe quoi' }
    ]
  },
  {
    id: 'phys-5',
    battery: 'physical',
    text: 'Ton activité physique',
    options: [
      { text: 'Régulière et agréable', points: 6, example: 'Exemple : Tu bouges 3-4 fois par semaine avec plaisir' },
      { text: 'Irrégulière mais j\'essaie', points: 4, example: 'Exemple : Tu fais du sport quand tu peux, 1-2 fois par semaine' },
      { text: 'Presque inexistante', points: 2, example: 'Exemple : Tu n\'as pas bougé depuis des semaines' },
      { text: 'Impossible, je n\'ai aucune énergie', points: 0, example: 'Exemple : Rien que l\'idée de bouger t\'épuise' }
    ]
  },

  // BATTERIE MENTALE (5 questions)
  {
    id: 'ment-1',
    battery: 'mental',
    text: 'Clarté mentale',
    options: [
      { text: 'Je pense clairement et décide facilement', points: 6, example: 'Exemple : Tes pensées sont claires, tu sais ce que tu veux' },
      { text: 'Parfois confus(e) mais ça va', points: 4, example: 'Exemple : Des moments de flou mais tu arrives à te concentrer' },
      { text: 'Brouillard mental fréquent', points: 2, example: 'Exemple : Tu as du mal à suivre une conversation, tout est embrouillé' },
      { text: 'Incapable de penser clairement', points: 0, example: 'Exemple : Ton esprit est comme 50 onglets ouverts qui bugent' }
    ]
  },
  {
    id: 'ment-2',
    battery: 'mental',
    text: 'Ruminations',
    options: [
      { text: 'Rarement', points: 6, example: 'Exemple : Ton esprit est calme, tu ne ressasses pas' },
      { text: 'Occasionnellement', points: 4, example: 'Exemple : Parfois tu repenses à des choses mais ça passe' },
      { text: 'Souvent, surtout la nuit', points: 2, example: 'Exemple : Tu rumines le soir au lit, ça tourne en boucle' },
      { text: 'En permanence, je n\'arrive pas à arrêter', points: 0, example: 'Exemple : Même pensées qui tournent 24/7, tu ne peux pas les arrêter' }
    ]
  },
  {
    id: 'ment-3',
    battery: 'mental',
    text: 'Concentration',
    options: [
      { text: 'Excellente', points: 6, example: 'Exemple : Tu te concentres facilement et longtemps' },
      { text: 'Correcte mais effort nécessaire', points: 4, example: 'Exemple : Tu dois te forcer mais tu y arrives' },
      { text: 'Difficile à maintenir', points: 2, example: 'Exemple : Tu es distrait(e) toutes les 5 minutes' },
      { text: 'Quasi impossible, je suis dispersé(e)', points: 0, example: 'Exemple : Tu ne peux même pas lire un email en entier' }
    ]
  },
  {
    id: 'ment-4',
    battery: 'mental',
    text: 'Prise de décision',
    options: [
      { text: 'Rapide et assumée', points: 6, example: 'Exemple : Tu décides rapidement sans ruminer après' },
      { text: 'Je prends du temps mais j\'y arrive', points: 4, example: 'Exemple : Tu dois réfléchir mais tu finis par trancher' },
      { text: 'Paralysie fréquente', points: 2, example: 'Exemple : Tu mets des heures pour des petites décisions' },
      { text: 'Incapable de trancher même sur des détails', points: 0, example: 'Exemple : Même "Qu\'est-ce que je mange ?" te paralyse' }
    ]
  },
  {
    id: 'ment-5',
    battery: 'mental',
    text: 'Mémoire',
    options: [
      { text: 'Très bonne', points: 6, example: 'Exemple : Tu te souviens facilement de ce qu\'on te dit' },
      { text: 'Quelques trous occasionnels', points: 4, example: 'Exemple : Parfois tu oublies où sont tes clés' },
      { text: 'Trous de mémoire fréquents', points: 2, example: 'Exemple : Tu oublies régulièrement ce que tu devais faire' },
      { text: 'Perte de mémoire immédiate inquiétante', points: 0, example: 'Exemple : On te dit quelque chose, 2 min après tu as oublié' }
    ]
  },

  // BATTERIE ÉMOTIONNELLE (5 questions)
  {
    id: 'emot-1',
    battery: 'emotional',
    text: 'État émotionnel général',
    options: [
      { text: 'Équilibré, je ressens mes émotions', points: 6, example: 'Exemple : Tu accueilles tristesse, joie, colère sans te laisser submerger' },
      { text: 'Variable, parfois submergé(e)', points: 4, example: 'Exemple : Ça va globalement mais parfois c\'est trop intense' },
      { text: 'Engourdissement ou hypersensibilité', points: 2, example: 'Exemple : Soit tu ne ressens rien, soit tu pleures pour un rien' },
      { text: 'Vide total ou crises émotionnelles fréquentes', points: 0, example: 'Exemple : Tu oscilles entre vide absolu et crises de larmes incontrôlables' }
    ]
  },
  {
    id: 'emot-2',
    battery: 'emotional',
    text: 'Pleurs spontanés',
    options: [
      { text: 'Jamais ou rarement', points: 6, example: 'Exemple : Tu pleures quand c\'est vraiment nécessaire' },
      { text: 'Occasionnellement pour des raisons claires', points: 4, example: 'Exemple : Tu pleures quand quelque chose te touche vraiment' },
      { text: 'Souvent "pour rien"', points: 2, example: 'Exemple : Une pub à la TV te fait pleurer' },
      { text: 'Incontrôlables et fréquents', points: 0, example: 'Exemple : Tu pleures plusieurs fois par jour sans savoir pourquoi' }
    ]
  },
  {
    id: 'emot-3',
    battery: 'emotional',
    text: 'Irritabilité',
    options: [
      { text: 'Rarement irrité(e)', points: 6, example: 'Exemple : Tu es patient(e) avec les autres' },
      { text: 'Parfois agacé(e)', points: 4, example: 'Exemple : Quelques moments d\'agacement normal' },
      { text: 'Souvent irritable avec les proches', points: 2, example: 'Exemple : Tu t\'énerves facilement sur tes proches' },
      { text: 'Explosions de colère inhabituelles', points: 0, example: 'Exemple : Tu exploses pour un rien puis tu culpabilises' }
    ]
  },
  {
    id: 'emot-4',
    battery: 'emotional',
    text: 'Joie et plaisir',
    options: [
      { text: 'Je ressens de la joie régulièrement', points: 6, example: 'Exemple : Tu ris authentiquement, tu vibres naturellement' },
      { text: 'Moins qu\'avant mais ça existe', points: 4, example: 'Exemple : Tu as des moments de joie mais c\'est rare' },
      { text: 'Rare, difficile à ressentir', points: 2, example: 'Exemple : Tu as du mal à te souvenir de ta dernière joie' },
      { text: 'Plus aucune joie, vide complet', points: 0, example: 'Exemple : Tu ne ressens plus rien, même ce que tu aimais avant' }
    ]
  },
  {
    id: 'emot-5',
    battery: 'emotional',
    text: 'Anxiété',
    options: [
      { text: 'Calme la plupart du temps', points: 6, example: 'Exemple : Tu es serein(e), confiant(e)' },
      { text: 'Stress occasionnel gérable', points: 4, example: 'Exemple : Du stress normal avant un événement important' },
      { text: 'Anxiété fréquente', points: 2, example: 'Exemple : Boule au ventre plusieurs fois par semaine' },
      { text: 'Crises d\'angoisse, sentiment d\'effondrement', points: 0, example: 'Exemple : Sensation de panique, cœur qui bat fort, difficulté à respirer' }
    ]
  },

  // BATTERIE IDENTITAIRE (5 questions)
  {
    id: 'iden-1',
    battery: 'identity',
    text: 'Connaissance de soi',
    options: [
      { text: 'Je sais clairement qui je suis', points: 6, example: 'Exemple : Tu connais tes valeurs, tes forces, ce qui t\'anime' },
      { text: 'Globalement oui, quelques doutes', points: 4, example: 'Exemple : Tu te connais assez bien mais pas tout' },
      { text: 'Je me pose beaucoup de questions', points: 2, example: 'Exemple : Tu te demandes souvent "Qui suis-je vraiment ?"' },
      { text: 'Je ne me reconnais plus du tout', points: 0, example: 'Exemple : Tu as l\'impression d\'être devenu(e) un étranger pour toi-même' }
    ]
  },
  {
    id: 'iden-2',
    battery: 'identity',
    text: 'Authenticité',
    options: [
      { text: 'Je suis moi-même en toutes circonstances', points: 6, example: 'Exemple : Tu es la même personne partout, tu ne portes pas de masque' },
      { text: 'Je m\'adapte mais reste authentique', points: 4, example: 'Exemple : Tu t\'adaptes au contexte mais sans te trahir' },
      { text: 'Je porte souvent un masque social', points: 2, example: 'Exemple : Tu es différent(e) au travail, avec ta famille, avec tes amis' },
      { text: 'Je fais semblant en permanence', points: 0, example: 'Exemple : Tu joues un rôle constamment, tu ne sais plus qui tu es vraiment' }
    ]
  },
  {
    id: 'iden-3',
    battery: 'identity',
    text: 'Sens de ta vie',
    options: [
      { text: 'Claire et inspirante', points: 6, example: 'Exemple : Tu sais pourquoi tu es là, tu as une mission claire' },
      { text: 'Présente mais floue', points: 4, example: 'Exemple : Tu as une idée générale mais pas très précise' },
      { text: 'Perdue, je cherche', points: 2, example: 'Exemple : Tu cherches ton sens sans vraiment trouver' },
      { text: 'Aucun sens, "à quoi bon ?"', points: 0, example: 'Exemple : Tu te demandes pourquoi tu continues, tout semble vide' }
    ]
  },
  {
    id: 'iden-4',
    battery: 'identity',
    text: 'Alignement valeurs/vie',
    options: [
      { text: 'Total alignement', points: 6, example: 'Exemple : Ta vie reflète parfaitement tes valeurs' },
      { text: 'Globalement aligné(e)', points: 4, example: 'Exemple : La plupart de tes choix respectent tes valeurs' },
      { text: 'Décalage important', points: 2, example: 'Exemple : Tu fais beaucoup de choses qui ne te ressemblent pas' },
      { text: 'Je vis une vie qui n\'est pas la mienne', points: 0, example: 'Exemple : Ta vie ne te ressemble pas du tout, tu vis pour les autres' }
    ]
  },
  {
    id: 'iden-5',
    battery: 'identity',
    text: 'Syndrome de l\'imposteur',
    options: [
      { text: 'Je connais ma valeur', points: 6, example: 'Exemple : Tu es confiant(e) en tes compétences et ta légitimité' },
      { text: 'Doutes occasionnels', points: 4, example: 'Exemple : Parfois tu doutes mais tu te rassures' },
      { text: 'Fréquent, je me sens illégitime', points: 2, example: 'Exemple : Tu as souvent l\'impression de ne pas mériter ta place' },
      { text: 'Constant, "je suis une fraude"', points: 0, example: 'Exemple : Tu vis dans la peur permanente qu\'on découvre que tu es un imposteur' }
    ]
  },

  // BATTERIE RELATIONNELLE (5 questions)
  {
    id: 'rela-1',
    battery: 'relational',
    text: 'Capacité à dire non',
    options: [
      { text: 'Facile, sans culpabilité', points: 6, example: 'Exemple : Tu dis non quand tu dois, sans te sentir coupable' },
      { text: 'Possible mais effort nécessaire', points: 4, example: 'Exemple : Tu y arrives mais ça te coûte' },
      { text: 'Très difficile, culpabilité forte', points: 2, example: 'Exemple : Tu dis oui alors que tu voulais dire non, puis tu culpabilises' },
      { text: 'Impossible, j\'accepte tout', points: 0, example: 'Exemple : Tu n\'arrives jamais à refuser, même quand ça t\'épuise' }
    ]
  },
  {
    id: 'rela-2',
    battery: 'relational',
    text: 'Qualité de tes relations',
    options: [
      { text: 'Authentiques et nourrissantes', points: 6, example: 'Exemple : Tes relations te ressourcent, tu peux être toi-même' },
      { text: 'Correctes mais superficielles', points: 4, example: 'Exemple : Tes relations sont OK mais pas très profondes' },
      { text: 'Toxiques ou vides', points: 2, example: 'Exemple : Tes relations te vident ou te font mal' },
      { text: 'Isolement total ou relations destructrices', points: 0, example: 'Exemple : Tu es seul(e) ou entouré(e) de personnes toxiques' }
    ]
  },
  {
    id: 'rela-3',
    battery: 'relational',
    text: 'Communication de tes besoins',
    options: [
      { text: 'Je les exprime clairement', points: 6, example: 'Exemple : Tu dis ce dont tu as besoin sans détour' },
      { text: 'Parfois difficile mais j\'y arrive', points: 4, example: 'Exemple : Tu arrives à exprimer tes besoins après réflexion' },
      { text: 'Rarement, je garde pour moi', points: 2, example: 'Exemple : Tu préfères te taire pour ne pas déranger' },
      { text: 'Jamais, personne ne sait ce que je vis', points: 0, example: 'Exemple : Tu souffres en silence, personne ne sait ce que tu traverses' }
    ]
  },
  {
    id: 'rela-4',
    battery: 'relational',
    text: 'Sentiment de solitude',
    options: [
      { text: 'Rarement', points: 6, example: 'Exemple : Tu te sens bien connecté(e) aux autres' },
      { text: 'Occasionnel', points: 4, example: 'Exemple : Parfois tu te sens seul(e) mais ça passe' },
      { text: 'Fréquent malgré l\'entourage', points: 2, example: 'Exemple : Même entouré(e), tu te sens incompris(e)' },
      { text: 'Constant, "personne ne comprend"', points: 0, example: 'Exemple : Tu te sens profondément seul(e), même avec des gens autour' }
    ]
  },
  {
    id: 'rela-5',
    battery: 'relational',
    text: 'People-pleasing',
    options: [
      { text: 'Je me respecte en priorité', points: 6, example: 'Exemple : Tu t\'occupes de toi avant de satisfaire les autres' },
      { text: 'J\'aide mais je me préserve', points: 4, example: 'Exemple : Tu aides les autres sans t\'oublier' },
      { text: 'Je donne beaucoup, souvent trop', points: 2, example: 'Exemple : Tu donnes beaucoup et tu reçois peu' },
      { text: 'Je m\'oublie complètement pour les autres', points: 0, example: 'Exemple : Tu es là pour tout le monde sauf pour toi' }
    ]
  },

  // BATTERIE PROFESSIONNELLE (5 questions)
  {
    id: 'prof-1',
    battery: 'professional',
    text: 'Plaisir au travail',
    options: [
      { text: 'Je kiffe ce que je fais', points: 6, example: 'Exemple : Tu te lèves avec envie d\'aller travailler' },
      { text: 'C\'est correct', points: 4, example: 'Exemple : Ton travail est OK, ni super ni nul' },
      { text: 'Je survis, c\'est une corvée', points: 2, example: 'Exemple : Tu comptes les heures jusqu\'à la fin' },
      { text: 'Dégoût total, mode zombie', points: 0, example: 'Exemple : Tu es en pilote automatique, aucune tâche ne t\'intéresse' }
    ]
  },
  {
    id: 'prof-2',
    battery: 'professional',
    text: 'Charge de travail',
    options: [
      { text: 'Gérable et équilibrée', points: 6, example: 'Exemple : Tu gères bien ta charge, pas de surcharge' },
      { text: 'Intense mais tenable', points: 4, example: 'Exemple : C\'est intense mais tu t\'en sors' },
      { text: 'Écrasante, trop c\'est trop', points: 2, example: 'Exemple : Tu croules sous les tâches' },
      { text: 'Insurmontable, paralysie', points: 0, example: 'Exemple : Tellement de travail que tu es paralysé(e)' }
    ]
  },
  {
    id: 'prof-3',
    battery: 'professional',
    text: 'Performance',
    options: [
      { text: 'Performant(e) sans m\'épuiser', points: 6, example: 'Exemple : Tu es efficace sans te cramer' },
      { text: 'Performant(e) mais effort important', points: 4, example: 'Exemple : Tu performes mais ça te coûte cher' },
      { text: 'Performance en chute', points: 2, example: 'Exemple : Tu fais moins bien qu\'avant' },
      { text: 'Hyperprésentéisme improductif', points: 0, example: 'Exemple : Tu es là tout le temps mais tu ne produis plus rien' }
    ]
  },
  {
    id: 'prof-4',
    battery: 'professional',
    text: 'Déconnexion travail/perso',
    options: [
      { text: 'Facile, je déconnecte', points: 6, example: 'Exemple : Quand tu rentres, tu ne penses plus au travail' },
      { text: 'Possible avec effort', points: 4, example: 'Exemple : Tu dois faire un effort pour décrocher' },
      { text: 'Difficile, pensées constantes', points: 2, example: 'Exemple : Le travail t\'obsède même le soir/weekend' },
      { text: 'Impossible, 24/7 connecté(e)', points: 0, example: 'Exemple : Tu vérifies tes emails même la nuit' }
    ]
  },
  {
    id: 'prof-5',
    battery: 'professional',
    text: 'Sens de ton travail',
    options: [
      { text: 'Profond et inspirant', points: 6, example: 'Exemple : Ton travail a du sens, tu contribues à quelque chose d\'important' },
      { text: 'Présent mais pourrait être plus fort', points: 4, example: 'Exemple : Tu vois le sens mais ce n\'est pas transcendant' },
      { text: 'Flou ou perdu', points: 2, example: 'Exemple : Tu ne vois plus trop pourquoi tu fais ça' },
      { text: 'Zéro sens, "je fais ça pour l\'argent"', points: 0, example: 'Exemple : Perte totale de sens, tu ne sais plus à quoi bon' }
    ]
  },

  // BATTERIE SPIRITUELLE (5 questions)
  {
    id: 'spir-1',
    battery: 'spiritual',
    text: 'Connexion spirituelle',
    options: [
      { text: 'Forte et vivante', points: 6, example: 'Exemple : Tu te sens connecté(e) à quelque chose de plus grand' },
      { text: 'Présente mais irrégulière', points: 4, example: 'Exemple : Parfois tu ressens cette connexion, parfois non' },
      { text: 'Faible, mécanique', points: 2, example: 'Exemple : Tu fais les gestes mais sans présence' },
      { text: 'Totalement déconnecté(e)', points: 0, example: 'Exemple : Tu ne ressens plus aucune connexion spirituelle' }
    ]
  },
  {
    id: 'spir-2',
    battery: 'spiritual',
    text: 'Pratiques spirituelles',
    options: [
      { text: 'Régulières et nourrissantes', points: 6, example: 'Exemple : Tu médites/pries régulièrement et ça te nourrit' },
      { text: 'Occasionnelles', points: 4, example: 'Exemple : Tu pratiques de temps en temps' },
      { text: 'Rares et sans présence', points: 2, example: 'Exemple : Tu pratiques rarement et machinalement' },
      { text: 'Abandonnées ou vides de sens', points: 0, example: 'Exemple : Tu as arrêté ou ça ne te fait plus rien' }
    ]
  },
  {
    id: 'spir-3',
    battery: 'spiritual',
    text: 'Sens existentiel',
    options: [
      { text: '"Je sais pourquoi je suis ici"', points: 6, example: 'Exemple : Tu as une mission claire, tu sais pourquoi tu es sur Terre' },
      { text: '"J\'ai une idée de ma mission"', points: 4, example: 'Exemple : Tu as une intuition de ta mission mais c\'est flou' },
      { text: '"Je cherche encore"', points: 2, example: 'Exemple : Tu cherches ton sens sans vraiment trouver' },
      { text: '"Aucune idée, tout est vide"', points: 0, example: 'Exemple : Vide existentiel, tu ne sais plus pourquoi tu es là' }
    ]
  },
  {
    id: 'spir-4',
    battery: 'spiritual',
    text: 'Guidance intérieure',
    options: [
      { text: 'Claire et fiable', points: 6, example: 'Exemple : Tu entends ta voix intérieure clairement et tu lui fais confiance' },
      { text: 'Présente mais faible', points: 4, example: 'Exemple : Tu l\'entends parfois mais c\'est léger' },
      { text: 'Confuse, j\'ai du mal à l\'entendre', points: 2, example: 'Exemple : Tu ne sais plus distinguer ta voix intérieure du bruit' },
      { text: 'Totalement perdue, aucune boussole', points: 0, example: 'Exemple : Tu n\'entends plus rien, tu es complètement perdu(e)' }
    ]
  },
  {
    id: 'spir-5',
    battery: 'spiritual',
    text: 'Foi/Confiance',
    options: [
      { text: 'Confiance totale en la vie/Dieu', points: 6, example: 'Exemple : Tu as une foi inébranlable, tu fais confiance' },
      { text: 'Confiance globale avec doutes', points: 4, example: 'Exemple : Tu fais confiance même si parfois tu doutes' },
      { text: 'Doutes fréquents', points: 2, example: 'Exemple : Tu doutes souvent de tout' },
      { text: 'Perte de foi complète', points: 0, example: 'Exemple : Tu as perdu la foi, tu ne crois plus en rien' }
    ]
  },
];

export const getBatteryQuestions = (battery: BatteryType): Question[] => {
  return questions.filter(q => q.battery === battery);
};

export const getAllBatteries = (): BatteryType[] => {
  return ['physical', 'mental', 'emotional', 'identity', 'relational', 'professional', 'spiritual'];
};
