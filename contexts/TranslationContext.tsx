import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Translation types
export type Language = 'en' | 'fr';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create context
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Header
    explore: 'Explore',
    favourites: 'Favourites', 
    chat: 'Chat',
    signIn: 'Sign In',
    registerYourPlace: 'Register Your Place',
    notifications: 'Notifications',
    myProfile: 'My Profile',
    myPlace: 'My Place',
    swapHistory: 'Swap History',
    adminDashboard: 'Admin Dashboard',
    pushNotifications: 'Push notifications',
    logout: 'Logout',
    
    // Search Filters
    whereWouldYouLikeToGo: 'Where would you like to go?',
    startingDates: 'Starting dates',
    endingDates: 'Ending dates',
    apartment: 'Apartment',
    house: 'House',
    studio: 'Studio',
    room: 'Room',
    bedrooms: 'Bedrooms',
    moreFilters: 'More Filters',
    preferences: 'Preferences',
    swapWithWomenOnly: 'Swap with women only',
    suitableForChildren: 'Suitable for children',
    petFriendly: 'Pet friendly',
    
    // Notifications
    newSwapRequest: 'New swap request',
    someoneWantsToSwap: 'Someone wants to swap with your property in Lisbon',
    messageReceived: 'Message received',
    newMessageFromMaria: 'New message from Maria about your upcoming swap',
    swapConfirmed: 'Swap confirmed',
    swapWithAndyConfirmed: 'Your swap with Andy in Lagos has been confirmed',
    hoursAgo: 'hours ago',
    dayAgo: 'day ago',
    
    // Footer
    allRightsReserved: 'All rights reserved',
    swapYourHomeExploreTheWorld: 'Swap your home, Explore the world',
    followUsOnInstagram: 'Follow us on Instagram',
    followUsOnTwitter: 'Follow us on Twitter',
    connectWithUsOnLinkedIn: 'Connect with us on LinkedIn',
    subscribeToOurYouTube: 'Subscribe to our YouTube channel',
    product: 'Product',
    company: 'Company',
    legal: 'Legal',
    howItWorks: 'How it works',
    rewardProgram: 'Reward Program',
    faqs: 'FAQs',
    blog: 'Blog',
    about: 'About',
    press: 'Press',
    contactSupport: 'Contact/Support',
    termsConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
    gdprDataRequests: 'GDPR/Data Requests',
    
    // About Page
    aboutKazaswap: 'About Kazaswap',
    aboutHeroText: 'We believe everyone deserves to explore the world authentically. Kazaswap connects travelers through home exchanges, creating meaningful connections and unforgettable experiences.',
    ourMission: 'Our Mission',
    ourMissionText: 'To make authentic travel accessible to everyone by connecting homeowners worldwide through our trusted exchange platform. We\'re building a community where hospitality, adventure, and cultural exchange thrive.',
    authenticExperiences: 'Authentic Experiences',
    authenticExperiencesText: 'Live like a local in real homes, discovering hidden gems and authentic culture.',
    trustedCommunity: 'Trusted Community',
    trustedCommunityText: 'Join a verified community of travelers who share the same values of respect and adventure.',
    fairExchange: 'Fair Exchange',
    fairExchangeText: 'Our credit system ensures fair exchanges, making travel affordable and accessible.',
    howKazaswapWorksText: 'Our credit-based system makes home exchanges simple, fair, and flexible.',
    hostYourHome: 'Host Your Home',
    hostYourHomeText: 'List your property and earn credits when other members stay. The better your home and location, the more credits you earn.',
    earnCredits: 'Earn Credits',
    earnCreditsText: 'Credits accumulate in your account automatically. Each successful exchange builds your reputation and unlocks premium properties.',
    travelAnywhere: 'Travel Anywhere',
    travelAnywhereText: 'Use your credits to stay in amazing homes worldwide. No direct exchanges needed – travel when and where you want.',
    ourCommunity: 'Our Community',
    ourCommunityText: 'Join thousands of travelers who have discovered a better way to explore the world.',
    activeMembers: 'Active Members',
    countries: 'Countries',
    homeExchanges: 'Home Exchanges',
    yearsOfExperience: 'Years of Experience',
    meetOurTeam: 'Meet Our Team',
    meetOurTeamText: 'We\'re a diverse group of travel enthusiasts, technologists, and community builders.',
    ceoCoFounder: 'CEO & Co-Founder',
    ctoCoFounder: 'CTO & Co-Founder',
    headOfCommunity: 'Head of Community',
    headOfProduct: 'Head of Product',
    sarahBio: 'Former Airbnb executive passionate about authentic travel experiences',
    marcusBio: 'Tech entrepreneur with 15+ years building scalable platforms',
    emilyBio: 'Travel enthusiast dedicated to building trust and safety',
    davidBio: 'UX expert focused on creating seamless user experiences',
    ourValues: 'Our Values',
    trustAndSafety: 'Trust & Safety',
    trustAndSafetyText: 'Every member is verified, and we provide comprehensive insurance and support to ensure safe, worry-free exchanges.',
    communityFirst: 'Community First',
    communityFirstText: 'We prioritize member experience over profits, building features and policies based on community feedback.',
    culturalExchange: 'Cultural Exchange',
    culturalExchangeText: 'We believe travel should foster understanding and connection between people from different cultures and backgrounds.',
    sustainability: 'Sustainability',
    sustainabilityText: 'Home exchanges reduce the environmental impact of travel while supporting local communities instead of large hotel chains.',
    
    // Contact Page
    contactAndSupport: 'Contact & Support',
    getInTouchWithSupport: 'Get in touch with our support team',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    generalInquiry: 'General Inquiry',
    technicalSupport: 'Technical Support',
    accountIssue: 'Account Issue',
    billing: 'Billing',
    emergency: 'Emergency',
    emergencyContact: 'Emergency Contact',
    emergencyText: 'If you\'re experiencing an urgent issue during your stay, contact our 24/7 emergency line.',
    
    // How It Works Page
    howKazaswapWorks: 'How Kazaswap Works',
    globalCommunityDescription: 'KazaSwap is a global community of travellers sharing their homes.',
    howItWorksTitle: 'How It Works',
    getStartedThreeSteps: 'Get started in three simple steps',
    listYourHomeForFree: 'List your home for free',
    listYourHomeDescription: 'Create your profile and add your home to our community marketplace at no cost',
    earnCreditsByHosting: 'Earn credits by hosting',
    earnCreditsDescription: 'Welcome travelers to your home and earn credits for each successful exchange',
    spendCreditsNextDestination: 'Spend credits earned, in your next destination',
    spendCreditsDescription: 'Use your earned credits to stay at amazing homes around the world',
    readyToStartJourney: 'Ready to Start Your Journey?',
    readyToStartDescription: 'Join thousands of travelers who have discovered a better way to explore the world through home exchanges.',
    listYourHome: 'List Your Home',
    browseProperties: 'Browse Properties',
    questionsContact: 'Questions? Contact our support team for help getting started.',
    simpleSteps: 'Simple steps to start your home exchange journey',
    step1Title: 'List Your Home',
    step1Description: 'Create a detailed profile of your property with photos and amenities',
    step2Title: 'Browse & Connect',
    step2Description: 'Explore amazing homes worldwide and connect with like-minded hosts',
    step3Title: 'Plan Your Exchange',
    step3Description: 'Coordinate dates, exchange keys, and prepare for your adventure',
    step4Title: 'Enjoy Your Stay',
    step4Description: 'Experience authentic local living while someone enjoys your home',
    
    // FAQ Page
    frequentlyAskedQuestions: 'Frequently Asked Questions',
    faqSubtitle: 'Find answers to common questions about KazaSwap',
    navigateFaqSections: 'Navigate FAQ Sections',
    stillHaveQuestions: 'Still have questions?',
    contactSupportFaq: 'Contact our support team and we\'ll be happy to help.',
    getInTouchFaq: 'Get in Touch',
    
    // FAQ Sections
    generalInformation: 'General Information',
    usingThePlatform: 'Using the Platform',
    hostingAndStaying: 'Hosting and Staying',
    bookingsAndSwaps: 'Bookings and Swaps',
    accountAndCommunityGuidelines: 'Account and Community Guidelines',
    securityAndTrust: 'Security and Trust',
    rewardProgramFaq: 'Reward Program',
    
    // FAQ Questions & Answers
    whatIsKazaswap: 'What is KazaSwap?',
    whatIsKazaswapAnswer: 'KazaSwap is a home exchange platform that allows members to swap homes with others using credits, offering a flexible and cost-effective way to travel.',
    howDoesKazaswapWork: 'How does KazaSwap work?',
    howDoesKazaswapWorkAnswer: 'Upon registration, members receive 5 credits, equivalent to 5 nights stay in another city. To earn more credits, members can host other travelers in their homes or participate in the reward program. There are no mandatory memberships, and credits do not expire.',
    
    isThereAMembershipFee: 'Is there a membership fee?',
    isThereAMembershipFeeAnswer: 'No, KazaSwap does not charge a membership fee. The platform operates on a pay-per-use model, with only a service fee applied when a swap is confirmed.',
    howMuchIsTheServiceFee: 'How much is the service fee?',
    howMuchIsTheServiceFeeAnswer: 'The service fee is 150€ per trip, regardless of the stay\'s duration or location.',
    canIPurchaseAdditionalCredits: 'Can I purchase additional credits?',
    canIPurchaseAdditionalCreditsAnswer: 'Yes, but only in specific cases. While Kazaswap is designed to encourage hosting and sharing, members who are short on credits and unable to host at the moment may be eligible to purchase a limited number of top-up credits to complete a planned swap. This option is offered selectively to maintain community balance.',
    canILoseMyCredits: 'Can I lose my credits if I don\'t use them quickly?',
    canILoseMyCreditsAnswer: 'No, credits do not expire and can be accumulated indefinitely.',
    doesKazaswapChargeCleaningFee: 'Does KazaSwap charge a cleaning fee?',
    doesKazaswapChargeCleaningFeeAnswer: 'No, there is no cleaning fee. Members are expected to maintain their homes and leave them in good condition for the next user.',
    
    howDoIListMyHome: 'How do I list my home?',
    howDoIListMyHomeAnswer: 'Create an account and provide detailed information about your property, including photos, amenities, and availability. Once your home is listed, it becomes part of the Kaza Swap community for others to request a stay.',
    doIHaveToBePresent: 'Do I have to be present when someone stays at my home?',
    doIHaveToBePresentAnswer: 'No, hosting can be done remotely if your home is prepared for guest arrivals. Ensure you have arrangements for access (e.g., a lockbox or trusted neighbor).',
    canIHostWithoutTraveling: 'Can I host someone without traveling myself?',
    canIHostWithoutTravelingAnswer: 'Yes! Hosting earns you credits that you can use later for your travels.',
    whatHappensIfDamage: 'What happens if there is damage to my property?',
    whatHappensIfDamageAnswer: 'KazaSwap recommends establishing clear expectations with your guests. However, we also encourage members to maintain homeowner\'s or renter\'s insurance that covers guest stays.',
    
    howDoIBookAStay: 'How do I book a stay at someone else\'s home?',
    howDoIBookAStayAnswer: 'Browse available properties and send a request to the host. Once the host accepts, the swap is confirmed, and the service fee is applied.',
    canICancelASwap: 'Can I cancel a swap?',
    canICancelASwapAnswer: 'Yes, but cancellations disrupt the community. If a cancellation occurs, Kazaswap will work with both parties to resolve the situation. If you cancel, your credits will be returned within a few days.',
    whatIfNotEnoughCredits: 'What if I don\'t have enough credits for a swap?',
    whatIfNotEnoughCreditsAnswer: 'You\'ll need to host more travelers to earn additional credits, wait until your home is requested — or you can also top up your credits directly.',
    
    canIJoinIfIRent: 'Can I join KazaSwap if I rent my home?',
    canIJoinIfIRentAnswer: 'Yes, as long as your lease agreement allows subletting or home exchanges. Always check with your landlord if you\'re unsure.',
    areThereRestrictionsOnHomes: 'Are there any restrictions on the type of homes I can list?',
    areThereRestrictionsOnHomesAnswer: 'KazaSwap welcomes all types of homes, from apartments to villas. The key is to provide accurate descriptions and photos of your place.',
    howDoesKazaswapEnsureQuality: 'How does KazaSwap ensure the quality of listings?',
    howDoesKazaswapEnsureQualityAnswer: 'We rely on community feedback and reviews. Members can rate their experiences, ensuring transparency and quality.',
    howDoesKazaswapHandleDisputes: 'How does KazaSwap handle disputes between members?',
    howDoesKazaswapHandleDisputesAnswer: 'Our Mediation Team is available to assist with disputes. We encourage open communication between members to address any issues directly.',
    
    isKazaswapSafe: 'Is KazaSwap safe?',
    isKazaswapSafeAnswer: 'Absolutely! Kazaswap is built on a community of trust. Profiles, reviews, and open communication help ensure safe and reliable exchanges.',
    whatPersonalInfoShared: 'What personal information is shared with other members?',
    whatPersonalInfoSharedAnswer: 'Your profile includes basic details such as your first name and home listing information. Contact information is shared only when a swap is confirmed.',
    
    // Reward Program
    globetrotterInTraining: 'Globetrotter in Training',
    explorerHost: 'Explorer Host',
    masterHostNomad: 'Master Host Nomad',
    badge: 'Badge',
    howToUnlock: 'How to unlock:',
    reward: 'Reward:',
    
    globetrotterUnlock: 'Create a completed profile and host your first guest.',
    globetrotterReward: 'Earn 3 bonus credits for hosting your first guest.',
    explorerUnlock: 'Host 5 guests and receive 3 positive reviews.',
    explorerReward: 'Earn 5 bonus credits and a special profile highlight as an "Explorer Host."',
    masterUnlock: 'Host 10+ guests with consistent positive feedback.',
    masterReward: 'Access exclusive Kazaswap perks, such as priority listing in search results or discounted service fees.',
    
    howDoesItWork: 'How does home exchange work?',
    isItSafe: 'Is it safe?',
    howMuchDoesItCost: 'How much does it cost?',
    whatIfSomethingGoesWrong: 'What if something goes wrong?',
    
    // Blog Page
    kazaswapBlog: 'Kazaswap Blog',
    latestStories: 'Latest stories, tips, and insights from our community',
    readMore: 'Read More',
    
    // Property Cards
    swapDates: 'Swap dates',
    
    // Common
    loading: 'Loading...',
    search: 'Search',
    filter: 'Filter',
    map: 'Map',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    learnMore: 'Learn More',
  },
  
  fr: {
    // Header
    explore: 'Explorer',
    favourites: 'Favoris',
    chat: 'Chat',
    signIn: 'Se connecter',
    registerYourPlace: 'Enregistrer votre logement',
    notifications: 'Notifications',
    myProfile: 'Mon profil',
    myPlace: 'Mon logement',
    swapHistory: 'Historique des échanges',
    adminDashboard: 'Tableau de bord admin',
    pushNotifications: 'Notifications push',
    logout: 'Déconnexion',
    
    // Search Filters
    whereWouldYouLikeToGo: 'Où souhaitez-vous aller ?',
    startingDates: 'Dates de début',
    endingDates: 'Dates de fin',
    apartment: 'Appartement',
    house: 'Maison',
    studio: 'Studio',
    room: 'Chambre',
    bedrooms: 'Chambres',
    moreFilters: 'Plus de filtres',
    preferences: 'Préférences',
    swapWithWomenOnly: 'Échanger avec des femmes uniquement',
    suitableForChildren: 'Adapté aux enfants',
    petFriendly: 'Animaux acceptés',
    
    // Notifications
    newSwapRequest: 'Nouvelle demande d\'échange',
    someoneWantsToSwap: 'Quelqu\'un veut échanger avec votre propriété à Lisbonne',
    messageReceived: 'Message reçu',
    newMessageFromMaria: 'Nouveau message de Maria concernant votre prochain échange',
    swapConfirmed: 'Échange confirmé',
    swapWithAndyConfirmed: 'Votre échange avec Andy à Lagos a été confirmé',
    hoursAgo: 'heures',
    dayAgo: 'jour',
    
    // Footer
    allRightsReserved: 'Tous droits réservés',
    swapYourHomeExploreTheWorld: 'Échangez votre maison, Explorez le monde',
    followUsOnInstagram: 'Suivez-nous sur Instagram',
    followUsOnTwitter: 'Suivez-nous sur Twitter',
    connectWithUsOnLinkedIn: 'Connectez-vous avec nous sur LinkedIn',
    subscribeToOurYouTube: 'Abonnez-vous à notre chaîne YouTube',
    product: 'Produit',
    company: 'Société',
    legal: 'Légal',
    howItWorks: 'Comment ça marche',
    rewardProgram: 'Programme de récompenses',
    faqs: 'FAQ',
    blog: 'Blog',
    about: 'À propos',
    press: 'Presse',
    contactSupport: 'Contact/Support',
    termsConditions: 'Conditions générales',
    privacyPolicy: 'Politique de confidentialité',
    cookiePolicy: 'Politique des cookies',
    gdprDataRequests: 'RGPD/Demandes de données',
    
    // Press Page
    pressAndMedia: 'Presse et Médias',
    pressHeroSubtitle: 'Ressources, actualités et éléments de marque pour les journalistes, blogueurs et professionnels des médias couvrant Kazaswap et l\'industrie de l\'échange de maisons.',
    downloadPressKit: 'Télécharger le Kit de Presse',
    contactMediaTeam: 'Contacter l\'Équipe Médias',
    latestPressReleases: 'Derniers Communiqués de Presse',
    readMorePress: 'Lire la Suite',
    mediaKit: 'Kit Médias',
    mediaKitSubtitle: 'Tout ce dont vous avez besoin pour écrire sur Kazaswap avec précision et style.',
    highResolutionLogos: 'Logos Haute Résolution',
    logosDescription: 'Formats PNG, SVG et EPS en diverses tailles',
    brandGuidelines: 'Directives de Marque',
    brandGuidelinesDescription: 'Directives complètes d\'identité et d\'utilisation de la marque',
    productScreenshots: 'Captures d\'Écran du Produit',
    screenshotsDescription: 'Captures d\'écran et maquettes de haute qualité de la plateforme',
    horizontalLogo: 'Logo horizontal',
    verticalLogo: 'Logo vertical',
    iconOnly: 'Icône seulement',
    whiteBlackVariants: 'Variantes blanc/noir',
    colorPalette: 'Palette de couleurs',
    typography: 'Typographie',
    logoUsage: 'Utilisation du logo',
    dosAndDonts: 'À faire et à ne pas faire',
    homepageViews: 'Vues de la page d\'accueil',
    mobileAppScreens: 'Écrans de l\'application mobile',
    featureHighlights: 'Points forts des fonctionnalités',
    userInterfaces: 'Interfaces utilisateur',
    download: 'Télécharger',
    logoUsageTitle: 'Utilisation du Logo',
    dos: 'À Faire',
    donts: 'À Ne Pas Faire',
    useFullLogo: 'Utilisez le logo complet quand l\'espace le permet',
    maintainClearSpace: 'Maintenez l\'espace libre minimum autour du logo',
    useApprovedColors: 'Utilisez uniquement les variations de couleur approuvées',
    ensureHighContrast: 'Assurez-vous d\'un contraste élevé avec l\'arrière-plan',
    dontStretchLogo: 'Ne pas étirer ou déformer le logo',
    dontUseUnapprovedColors: 'Ne pas utiliser de couleurs non approuvées',
    dontPlaceOnBusyBackgrounds: 'Ne pas placer sur des arrière-plans chargés',
    dontRecreateOrModify: 'Ne pas recréer ou modifier le logo',
    companyFacts: 'Faits sur l\'Entreprise',
    founded: 'Fondée',
    headquarters: 'Siège social',
    activeMembersPress: 'Membres Actifs',
    countriesPress: 'Pays',
    totalExchanges: 'Échanges Totaux',
    employees: 'Employés',
    writingAboutKazaswap: 'Écrire sur Kazaswap ?',
    writingAboutSubtitle: 'Nous sommes là pour vous aider ! Contactez notre équipe médias pour des interviews, des commentaires d\'experts ou des ressources supplémentaires.',
    
    // Press Releases Data
    pressRelease1Date: '20 mars 2024',
    pressRelease1Title: 'Kazaswap Atteint le Jalon de 50 000 Membres Actifs',
    pressRelease1Excerpt: 'La plateforme d\'échange de maisons continue sa croissance rapide alors que les voyageurs recherchent des alternatives authentiques et durables aux hébergements traditionnels.',
    pressRelease2Date: '15 février 2024',
    pressRelease2Title: 'Kazaswap S\'Étend à 120 Pays avec des Fonctionnalités de Sécurité Améliorées',
    pressRelease2Excerpt: 'Le nouveau système de vérification d\'identité et la couverture d\'assurance complète renforcent la confiance et la sécurité pour la communauté mondiale.',
    pressRelease3Date: '10 janvier 2024',
    pressRelease3Title: 'Étude : Les Voyageurs d\'Échange de Maisons Rapportent 40% de Satisfaction Supérieure aux Clients d\'Hôtels',
    pressRelease3Excerpt: 'Une recherche commandée par Kazaswap révèle les avantages des expériences de voyage authentiques grâce aux échanges de maisons.',
    
    // Media Contacts
    headOfCommunications: 'Responsable Communications',
    prManager: 'Responsable RP',
    
    
    // About Page
    aboutKazaswap: 'À propos de Kazaswap',
    aboutHeroText: 'Nous croyons que chacun mérite d\'explorer le monde de manière authentique. Kazaswap connecte les voyageurs grâce aux échanges de maisons, créant des connexions significatives et des expériences inoubliables.',
    ourMission: 'Notre Mission',
    ourMissionText: 'Rendre le voyage authentique accessible à tous en connectant les propriétaires du monde entier grâce à notre plateforme d\'échange de confiance. Nous construisons une communauté où l\'hospitalité, l\'aventure et l\'échange culturel prospèrent.',
    authenticExperiences: 'Expériences Authentiques',
    authenticExperiencesText: 'Vivez comme un local dans de vraies maisons, découvrez des joyaux cachés et une culture authentique.',
    trustedCommunity: 'Communauté de Confiance',
    trustedCommunityText: 'Rejoignez une communauté vérifiée de voyageurs qui partagent les mêmes valeurs de respect et d\'aventure.',
    fairExchange: 'Échange Équitable',
    fairExchangeText: 'Notre système de crédits garantit des échanges équitables, rendant le voyage abordable et accessible.',
    howKazaswapWorksText: 'Notre système basé sur les crédits rend les échanges de maisons simples, équitables et flexibles.',
    hostYourHome: 'Hébergez votre Maison',
    hostYourHomeText: 'Listez votre propriété et gagnez des crédits quand d\'autres membres séjournent. Plus votre maison et emplacement sont bons, plus vous gagnez de crédits.',
    earnCredits: 'Gagnez des Crédits',
    earnCreditsText: 'Les crédits s\'accumulent automatiquement dans votre compte. Chaque échange réussi renforce votre réputation et débloque des propriétés premium.',
    travelAnywhere: 'Voyagez Partout',
    travelAnywhereText: 'Utilisez vos crédits pour séjourner dans des maisons incroyables dans le monde entier. Aucun échange direct nécessaire – voyagez quand et où vous voulez.',
    ourCommunity: 'Notre Communauté',
    ourCommunityText: 'Rejoignez des milliers de voyageurs qui ont découvert une meilleure façon d\'explorer le monde.',
    activeMembers: 'Membres Actifs',
    countries: 'Pays',
    homeExchanges: 'Échanges de Maisons',
    yearsOfExperience: 'Années d\'Expérience',
    meetOurTeam: 'Rencontrez Notre Équipe',
    meetOurTeamText: 'Nous sommes un groupe diversifié d\'enthousiastes du voyage, de technologues et de créateurs de communauté.',
    ceoCoFounder: 'PDG et Co-Fondatrice',
    ctoCoFounder: 'CTO et Co-Fondateur',
    headOfCommunity: 'Responsable de la Communauté',
    headOfProduct: 'Responsable Produit',
    sarahBio: 'Ancienne dirigeante d\'Airbnb passionnée par les expériences de voyage authentiques',
    marcusBio: 'Entrepreneur tech avec plus de 15 ans d\'expérience dans la construction de plateformes évolutives',
    emilyBio: 'Passionnée de voyage dédiée à la construction de confiance et de sécurité',
    davidBio: 'Expert UX axé sur la création d\'expériences utilisateur fluides',
    ourValues: 'Nos Valeurs',
    trustAndSafety: 'Confiance et Sécurité',
    trustAndSafetyText: 'Chaque membre est vérifié, et nous fournissons une assurance complète et un support pour garantir des échanges sûrs et sans souci.',
    communityFirst: 'La Communauté d\'Abord',
    communityFirstText: 'Nous priorisons l\'expérience des membres par rapport aux profits, construisant des fonctionnalités et des politiques basées sur les retours de la communauté.',
    culturalExchange: 'Échange Culturel',
    culturalExchangeText: 'Nous croyons que le voyage devrait favoriser la compréhension et la connexion entre les personnes de différentes cultures et origines.',
    sustainability: 'Durabilité',
    sustainabilityText: 'Les échanges de maisons réduisent l\'impact environnemental du voyage tout en soutenant les communautés locales au lieu des grandes chaînes hôtelières.',
    
    // Contact Page
    contactAndSupport: 'Contact et Support',
    getInTouch: 'Contactez notre équipe de support',
    name: 'Nom',
    email: 'Email',
    subject: 'Sujet',
    message: 'Message',
    sendMessage: 'Envoyer le message',
    generalInquiry: 'Demande générale',
    technicalSupport: 'Support technique',
    accountIssue: 'Problème de compte',
    billing: 'Facturation',
    emergency: 'Urgence',
    emergencyContact: 'Contact d\'urgence',
    emergencyText: 'Si vous rencontrez un problème urgent pendant votre séjour, contactez notre ligne d\'urgence 24h/24.',
    
    // How It Works Page
    howKazaswapWorks: 'Comment fonctionne Kazaswap',
    globalCommunityDescription: 'KazaSwap est une communauté mondiale de voyageurs qui partagent leurs maisons.',
    howItWorksTitle: 'Comment ça marche',
    getStartedThreeSteps: 'Commencez en trois étapes simples',
    listYourHomeForFree: 'Listez votre maison gratuitement',
    listYourHomeDescription: 'Créez votre profil et ajoutez votre maison à notre marketplace communautaire sans frais',
    earnCreditsByHosting: 'Gagnez des crédits en hébergeant',
    earnCreditsDescription: 'Accueillez des voyageurs chez vous et gagnez des crédits pour chaque échange réussi',
    spendCreditsNextDestination: 'Dépensez les crédits gagnés, dans votre prochaine destination',
    spendCreditsDescription: 'Utilisez vos crédits gagnés pour séjourner dans des maisons incroyables partout dans le monde',
    readyToStartJourney: 'Prêt à commencer votre voyage ?',
    readyToStartDescription: 'Rejoignez des milliers de voyageurs qui ont découvert une meilleure façon d\'explorer le monde grâce aux échanges de maisons.',
    listYourHome: 'Listez votre maison',
    browseProperties: 'Parcourir les propriétés',
    questionsContact: 'Des questions ? Contactez notre équipe de support pour obtenir de l\'aide pour commencer.',
    
    // FAQ Page
    frequentlyAskedQuestions: 'Questions Fréquemment Posées',
    faqSubtitle: 'Trouvez des réponses aux questions communes sur KazaSwap',
    stillHaveQuestions: 'Avez-vous encore des questions ?',
    contactSupportFaq: 'Contactez notre équipe de support et nous serons heureux de vous aider.',
    getInTouchFaq: 'Entrer en contact',
    
    // FAQ Sections
    generalInformation: 'Informations Générales',
    usingThePlatform: 'Utilisation de la Plateforme',
    hostingAndStaying: 'Hébergement et Séjour',
    bookingsAndSwaps: 'Réservations et Échanges',
    accountAndCommunityGuidelines: 'Compte et Directives Communautaires',
    securityAndTrust: 'Sécurité et Confiance',
    rewardProgramFaq: 'Programme de Récompenses',
    
    // FAQ Questions & Answers
    whatIsKazaswap: 'Qu\'est-ce que KazaSwap ?',
    whatIsKazaswapAnswer: 'KazaSwap est une plateforme d\'échange de maisons qui permet aux membres d\'échanger leurs maisons avec d\'autres en utilisant des crédits, offrant un moyen flexible et économique de voyager.',
    howDoesKazaswapWork: 'Comment fonctionne KazaSwap ?',
    howDoesKazaswapWorkAnswer: 'Lors de l\'inscription, les membres reçoivent 5 crédits, équivalant à 5 nuits de séjour dans une autre ville. Pour gagner plus de crédits, les membres peuvent héberger d\'autres voyageurs dans leurs maisons ou participer au programme de récompenses. Il n\'y a pas d\'adhésions obligatoires, et les crédits n\'expirent pas.',
    
    isThereAMembershipFee: 'Y a-t-il des frais d\'adhésion ?',
    isThereAMembershipFeeAnswer: 'Non, KazaSwap ne facture pas de frais d\'adhésion. La plateforme fonctionne sur un modèle de paiement à l\'utilisation, avec seulement des frais de service appliqués lorsqu\'un échange est confirmé.',
    howMuchIsTheServiceFee: 'Combien coûtent les frais de service ?',
    howMuchIsTheServiceFeeAnswer: 'Les frais de service sont de 150€ par voyage, quelle que soit la durée du séjour ou la localisation.',
    canIPurchaseAdditionalCredits: 'Puis-je acheter des crédits supplémentaires ?',
    canIPurchaseAdditionalCreditsAnswer: 'Oui, mais seulement dans des cas spécifiques. Bien que Kazaswap soit conçu pour encourager l\'hébergement et le partage, les membres qui manquent de crédits et ne peuvent pas héberger pour le moment peuvent être éligibles pour acheter un nombre limité de crédits de complément pour terminer un échange planifié. Cette option est offerte sélectivement pour maintenir l\'équilibre communautaire.',
    canILoseMyCredits: 'Puis-je perdre mes crédits si je ne les utilise pas rapidement ?',
    canILoseMyCreditsAnswer: 'Non, les crédits n\'expirent pas et peuvent être accumulés indéfiniment.',
    doesKazaswapChargeCleaningFee: 'KazaSwap facture-t-il des frais de ménage ?',
    doesKazaswapChargeCleaningFeeAnswer: 'Non, il n\'y a pas de frais de ménage. Les membres sont censés maintenir leurs maisons et les laisser en bon état pour le prochain utilisateur.',
    
    howDoIListMyHome: 'Comment lister ma maison ?',
    howDoIListMyHomeAnswer: 'Créez un compte et fournissez des informations détaillées sur votre propriété, y compris des photos, des équipements et la disponibilité. Une fois votre maison listée, elle fait partie de la communauté Kaza Swap pour que d\'autres puissent demander un séjour.',
    doIHaveToBePresent: 'Dois-je être présent quand quelqu\'un séjourne dans ma maison ?',
    doIHaveToBePresentAnswer: 'Non, l\'hébergement peut être fait à distance si votre maison est préparée pour les arrivées d\'invités. Assurez-vous d\'avoir des arrangements pour l\'accès (par exemple, une boîte à clés ou un voisin de confiance).',
    canIHostWithoutTraveling: 'Puis-je héberger quelqu\'un sans voyager moi-même ?',
    canIHostWithoutTravelingAnswer: 'Oui ! Héberger vous fait gagner des crédits que vous pouvez utiliser plus tard pour vos voyages.',
    whatHappensIfDamage: 'Que se passe-t-il s\'il y a des dommages à ma propriété ?',
    whatHappensIfDamageAnswer: 'KazaSwap recommande d\'établir des attentes claires avec vos invités. Cependant, nous encourageons également les membres à maintenir une assurance de propriétaire ou de locataire qui couvre les séjours d\'invités.',
    
    howDoIBookAStay: 'Comment réserver un séjour dans la maison de quelqu\'un d\'autre ?',
    howDoIBookAStayAnswer: 'Parcourez les propriétés disponibles et envoyez une demande à l\'hôte. Une fois que l\'hôte accepte, l\'échange est confirmé et les frais de service sont appliqués.',
    canICancelASwap: 'Puis-je annuler un échange ?',
    canICancelASwapAnswer: 'Oui, mais les annulations perturbent la communauté. Si une annulation se produit, Kazaswap travaillera avec les deux parties pour résoudre la situation. Si vous annulez, vos crédits seront retournés dans quelques jours.',
    whatIfNotEnoughCredits: 'Que faire si je n\'ai pas assez de crédits pour un échange ?',
    whatIfNotEnoughCreditsAnswer: 'Vous devrez héberger plus de voyageurs pour gagner des crédits supplémentaires, attendre que votre maison soit demandée — ou vous pouvez également recharger vos crédits directement.',
    
    canIJoinIfIRent: 'Puis-je rejoindre KazaSwap si je loue ma maison ?',
    canIJoinIfIRentAnswer: 'Oui, tant que votre contrat de bail permet la sous-location ou les échanges de maisons. Vérifiez toujours avec votre propriétaire si vous n\'êtes pas sûr.',
    areThereRestrictionsOnHomes: 'Y a-t-il des restrictions sur le type de maisons que je peux lister ?',
    areThereRestrictionsOnHomesAnswer: 'KazaSwap accueille tous types de maisons, des appartements aux villas. La clé est de fournir des descriptions et des photos précises de votre lieu.',
    howDoesKazaswapEnsureQuality: 'Comment KazaSwap assure-t-il la qualité des annonces ?',
    howDoesKazaswapEnsureQualityAnswer: 'Nous nous appuyons sur les commentaires et avis de la communauté. Les membres peuvent noter leurs expériences, assurant transparence et qualité.',
    howDoesKazaswapHandleDisputes: 'Comment KazaSwap gère-t-il les disputes entre membres ?',
    howDoesKazaswapHandleDisputesAnswer: 'Notre Équipe de Médiation est disponible pour aider avec les disputes. Nous encourageons la communication ouverte entre les membres pour résoudre directement tout problème.',
    
    isKazaswapSafe: 'KazaSwap est-il sûr ?',
    isKazaswapSafeAnswer: 'Absolument ! Kazaswap est construit sur une communauté de confiance. Les profils, avis et communication ouverte aident à assurer des échanges sûrs et fiables.',
    whatPersonalInfoShared: 'Quelles informations personnelles sont partagées avec les autres membres ?',
    whatPersonalInfoSharedAnswer: 'Votre profil inclut des détails de base tels que votre prénom et les informations d\'annonce de maison. Les informations de contact ne sont partagées que lorsqu\'un échange est confirmé.',
    
    // Reward Program
    globetrotterInTraining: 'Globe-trotter en Formation',
    explorerHost: 'Hôte Explorateur',
    masterHostNomad: 'Nomade Hôte Maître',
    badge: 'Badge',
    howToUnlock: 'Comment débloquer :',
    reward: 'Récompense :',
    
    globetrotterUnlock: 'Créez un profil complet et hébergez votre premier invité.',
    globetrotterReward: 'Gagnez 3 crédits bonus pour héberger votre premier invité.',
    explorerUnlock: 'Hébergez 5 invités et recevez 3 avis positifs.',
    explorerReward: 'Gagnez 5 crédits bonus et une mise en valeur spéciale du profil en tant qu\'"Hôte Explorateur".',
    masterUnlock: 'Hébergez 10+ invités avec des commentaires positifs constants.',
    masterReward: 'Accédez aux avantages exclusifs Kazaswap, tels que la priorité d\'affichage dans les résultats de recherche ou des frais de service réduits.',
    
    // Blog Page
    kazaswapBlog: 'Blog Kazaswap',
    latestStories: 'Dernières histoires, conseils et perspectives de notre communauté',
    readMore: 'Lire plus',
    
    // Property Cards
    swapDates: 'Dates d\'échange',
    
    // Common
    loading: 'Chargement...',
    search: 'Rechercher',
    filter: 'Filtrer',
    map: 'Carte',
    save: 'Enregistrer',
    cancel: 'Annuler',
    submit: 'Soumettre',
    edit: 'Modifier',
    delete: 'Supprimer',
    view: 'Voir',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    close: 'Fermer',
    learnMore: 'En savoir plus',
  },
  
};

// Translation Provider
interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  // Initialize language from URL
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en';
    
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const urlLanguage = pathSegments[0];
    
    if (urlLanguage === 'fr') {
      return urlLanguage as Language;
    }
    return 'en';
  };
  
  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use translation
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};