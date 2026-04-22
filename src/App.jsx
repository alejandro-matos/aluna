import { useEffect, useRef, useState } from "react";
import { getBlogPost, getBlogPostByKey, getBlogPosts } from "./blogPosts";

const languages = {
  es: { label: "Es", name: "Español", flag: "🇪🇸" },
  en: { label: "En", name: "English", flag: "🇬🇧" },
  fr: { label: "Fr", name: "Français", flag: "🇫🇷" },
};

const translations = {
  es: {
    nav: {
      philosophy: "Filosofía",
      treatments: "Tratamientos",
      blog: "Blog",
      faq: "Preguntas Frequentes",
      testimonials: "Testimonios",
      contact: "Contacto",
    },
    reserve: "Reservar",
    heroEyebrow: "Masaje terapéutico en Cartagena, Colombia",
    heroTitle: ["Cuidado corporal", "terapéutico con", "calidez y criterio."],
    heroText:
      "Un enfoque profesional que integra terapia manual, bienestar y atención cálida para dolor, tensión y recuperación.",
    viewServices: "Ver servicios",
    bookAppointment: "Reservar cita",
    badgeTitle: "Katy Fernandez",
    badgeText: "Terapeuta de masaje · Atención bilingüe",
    badgeHint: "Ver perfil",
    badgeClose: "Cerrar",
    aboutTitle: "Sobre Katy",
    aboutText:
      "Terapeuta de masaje con 5+ años de experiencia, enfocada en tratamientos personalizados para dolor, movilidad, recuperación y bienestar corporal.",
    trustStrip: [
      "5+ años de experiencia",
      "Tejido profundo",
      "Drenaje linfático",
      "Liberación miofascial",
    ],
    standardEyebrow: "El estándar",
    philosophyTitle: "Un enfoque clínico, humano y claramente diferenciado.",
    philosophyCopy:
      "Pensado para transmitir confianza, preparación y una experiencia más terapéutica que estética.",
    features: [
      {
        title: "Evaluación",
        text: "Identificación de causa raíz, no solo síntomas.",
        symbol: "○",
      },
      {
        title: "Bilingüe",
        text: "Español e inglés para clientela local e internacional.",
        symbol: "◇",
      },
      {
        title: "Estándares",
        text: "Protocolos profesionales, claros y consistentes.",
        symbol: "✦",
      },
    ],
    modalitiesTitle: "Modalidades terapéuticas",
    modalities: [
      {
        title: "Tejido profundo",
        text: "Liberación miofascial y tensión crónica.",
      },
      {
        title: "Drenaje linfático",
        text: "Estimula el sistema linfático y reduce retención.",
      },
      {
        title: "Liberación miofascial",
        text: "Elimina restricciones y reduce el dolor crónico.",
      },
    ],
    blogTitle: "Artículos para educar y generar confianza",
    blogCopy:
      "Un espacio para responder dudas frecuentes y reforzar tu posicionamiento terapéutico.",
    articleLabel: "Artículo",
    viewArticle: "Ver artículo →",
    viewAllArticles: "Ver todos los artículos",
    allArticlesTitle: "Todos los artículos",
    allArticlesCopy:
      "Recursos para aprender sobre masaje terapéutico, recuperación y bienestar corporal.",
    backHome: "Volver al inicio",
    backBlog: "Volver al blog",
    notFoundTitle: "Artículo no encontrado",
    notFoundText: "El artículo que buscas no está disponible.",
    testimonialsTitle: "Lo que dicen nuestros clientes",
    testimonials: [
      {
        quote:
          "Katy is truly phenomenal and always knows exactly what I need. She deserves all the recognition.",
        name: "Liyah Lewis",
        place: "Google review · 5 stars",
      },
      {
        quote:
          "Katy was amazing and made me feel super comfortable as it was my first time. I will definitely be coming back.",
        name: "Jade Lee",
        place: "Google review · 5 stars",
      },
      {
        quote:
          "I have been going to Katy for over 3 years. She is very professional and ensures each massage is personalized.",
        name: "Ruwandi Marianne",
        place: "Google review · 5 stars",
      },
      {
        quote:
          "She checks in during the massage to see if the pressure is adequate and adjusts if I have any concerns.",
        name: "Ruwandi Marianne",
        place: "Google review · 5 stars",
      },
    ],
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Resolvemos tus dudas antes de comenzar",
      items: [
        {
          question: "¿Cuál es el proceso habitual de una cita de masaje terapéutico?",
          answer: [
            "El proceso comienza con un formulario y una consulta inicial para conocer tus molestias, objetivos y cualquier información importante sobre tu cuerpo.",
            "Después se realiza el tratamiento, que comúnmente dura entre 60 y 90 minutos, adaptado a lo que se detecta durante la evaluación.",
            "Al final, si es necesario, se entregan indicaciones simples de mantenimiento para cuidar los resultados después de la sesión.",
          ],
        },
        {
          question: "¿Qué diferencia hay entre un masaje terapéutico y uno relajante?",
          answer: [
            "El masaje terapéutico está enfocado en tratar la causa del dolor o la tensión, no solo en relajar. Comienza con una evaluación para entender qué está pasando en el cuerpo y trabajar de forma específica.",
            "Cada sesión comienza con una breve evaluación para adaptar el tratamiento a lo que tu cuerpo realmente necesita.",
            "El masaje relajante, en cambio, busca principalmente generar bienestar general y descanso, sin enfocarse en una molestia concreta.",
          ],
        },
        {
          question: "¿El masaje terapéutico duele?",
          answer: [
            "Puede haber algo de incomodidad en zonas con mucha tensión, pero nunca debería ser dolor intenso. El objetivo no es aguantar, sino trabajar el tejido de forma progresiva y segura.",
            "Cada sesión se adapta a tu tolerancia, priorizando resultados sin generar estrés innecesario en el cuerpo.",
          ],
        },
        {
          question: "¿Cuántas sesiones necesito?",
          answer: [
            "Depende de cada caso. Algunas personas sienten mejoría desde la primera sesión, pero cuando hay molestias acumuladas o de larga duración, suele recomendarse un proceso de varias sesiones.",
            "Durante la evaluación inicial se puede orientar mejor según tus objetivos y condición.",
          ],
        },
        {
          question: "¿Es seguro durante el embarazo?",
          answer: [
            "Sí, el masaje prenatal es seguro cuando se realiza con técnicas adecuadas y en posiciones cómodas para la madre.",
            "Se enfoca en aliviar tensión, mejorar la circulación y acompañar los cambios del cuerpo durante el embarazo.",
          ],
        },
        {
          question: "¿Qué tipo de molestias pueden tratarse?",
          answer: [
            "Se puede trabajar con dolor de espalda y cuello, tensión muscular, estrés físico acumulado, molestias posturales y recuperación física.",
            "Cada sesión se adapta según lo que tu cuerpo necesite en ese momento.",
          ],
        },
        {
          question: "¿Qué debo hacer antes y después de la sesión?",
          answer: [
            "Antes: venir con ropa cómoda y, si es posible, evitar comidas muy pesadas justo antes de la sesión.",
            "Después: hidratarse bien, permitirle al cuerpo descansar y evitar esfuerzos intensos inmediatamente después.",
          ],
        },
        {
          question: "¿Cuánto dura una sesión?",
          answer: [
            "Las sesiones suelen durar entre 60 y 90 minutos, dependiendo del tipo de tratamiento y las necesidades de cada persona.",
          ],
        },
        {
          question: "¿Necesito experiencia previa o haber recibido masajes antes?",
          answer: [
            "No. Muchas personas comienzan sin experiencia previa. La sesión se adapta completamente a tu nivel de comodidad y se explica el proceso para que te sientas tranquilo(a).",
          ],
        },
        {
          question: "¿Cómo puedo agendar una sesión?",
          answer: [
            "Puedes agendar fácilmente a través del botón de reserva o escribir directamente por WhatsApp para coordinar tu cita.",
          ],
        },
        {
          question: "¿Dónde se realizan las sesiones?",
          answer: [
            "Las sesiones se realizan en Cartagena, Colombia. Puedes reservar online o escribir por WhatsApp para confirmar disponibilidad y ubicación.",
          ],
        },
      ],
      ctaText: "¿Tienes otra pregunta o quieres agendar tu sesión?",
      bookButton: "Reservar cita",
      whatsappButton: "Escribir por WhatsApp",
    },
    ctaEyebrow: "Reserva",
    ctaTitle: "Agenda tu cita",
    ctaText: "Sesiones presenciales en Cartagena, Colombia.",
    bookOnline: "Reserva online",
    whatsappBooking: "Agendar por WhatsApp",
    footer: "© 2026 Aluna Bienestar Integral · Cartagena, Colombia.",
    posts: {},
  },
  en: {
    nav: {
      philosophy: "Philosophy",
      treatments: "Treatments",
      blog: "Blog",
      faq: "FAQ",
      testimonials: "Reviews",
      contact: "Contact",
    },
    reserve: "Book",
    heroEyebrow: "Therapeutic massage in Cartagena, Colombia",
    heroTitle: ["Therapeutic", "body care with", "warmth and expertise."],
    heroText:
      "A professional approach that integrates manual therapy, wellness, and warm care for pain, tension, and recovery.",
    viewServices: "View services",
    bookAppointment: "Book appointment",
    badgeTitle: "Katy Fernandez",
    badgeText: "Massage therapist · Bilingual care",
    badgeHint: "View profile",
    badgeClose: "Close",
    aboutTitle: "About Katy",
    aboutText:
      "Massage therapist with 5+ years of experience, focused on personalized treatments for pain, mobility, recovery, and body wellness.",
    trustStrip: [
      "5+ years of experience",
      "Deep tissue",
      "Lymphatic drainage",
      "Myofascial release",
    ],
    standardEyebrow: "The standard",
    philosophyTitle: "A clinical, human, and clearly differentiated approach.",
    philosophyCopy:
      "Designed to communicate trust, preparation, and an experience that feels more therapeutic than aesthetic.",
    features: [
      {
        title: "Assessment",
        text: "Identifying root causes, not only symptoms.",
        symbol: "○",
      },
      {
        title: "Bilingual",
        text: "Spanish and English for local and international clients.",
        symbol: "◇",
      },
      {
        title: "Standards",
        text: "Clear, consistent, professional protocols.",
        symbol: "✦",
      },
    ],
    modalitiesTitle: "Therapeutic modalities",
    modalities: [
      {
        title: "Deep tissue",
        text: "Myofascial release and chronic tension.",
      },
      {
        title: "Lymphatic drainage",
        text: "Stimulates the lymphatic system and reduces fluid retention.",
      },
      {
        title: "Myofascial release",
        text: "Releases restrictions and helps reduce chronic pain.",
      },
    ],
    blogTitle: "Articles that educate and build trust",
    blogCopy:
      "A space to answer common questions and reinforce your therapeutic positioning.",
    articleLabel: "Article",
    viewArticle: "Read article →",
    viewAllArticles: "View all articles",
    allArticlesTitle: "All articles",
    allArticlesCopy:
      "Resources to learn about therapeutic massage, recovery, and body wellness.",
    backHome: "Back home",
    backBlog: "Back to blog",
    notFoundTitle: "Article not found",
    notFoundText: "The article you are looking for is not available.",
    testimonialsTitle: "What clients are saying",
    testimonials: [
      {
        quote:
          "Katy is truly phenomenal and always knows exactly what I need. She deserves all the recognition.",
        name: "Liyah Lewis",
        place: "Google review · 5 stars",
      },
      {
        quote:
          "Katy was amazing and made me feel super comfortable as it was my first time. I will definitely be coming back.",
        name: "Jade Lee",
        place: "Google review · 5 stars",
      },
      {
        quote:
          "I have been going to Katy for over 3 years. She is very professional and ensures each massage is personalized.",
        name: "Ruwandi Marianne",
        place: "Google review · 5 stars",
      },
      {
        quote:
          "She checks in during the massage to see if the pressure is adequate and adjusts if I have any concerns.",
        name: "Ruwandi Marianne",
        place: "Google review · 5 stars",
      },
    ],
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Clear answers before you begin",
      items: [
        {
          question: "What is the usual process for a massage therapy appointment?",
          answer: [
            "The process begins with a form and an initial consultation to understand your concerns, goals, and any important information about your body.",
            "Then the treatment takes place, most commonly lasting between 60 and 90 minutes, adapted to what is found during the assessment.",
            "At the end, if needed, you receive simple maintenance instructions to help care for the results after the session.",
          ],
        },
        {
          question: "What is the difference between therapeutic and relaxation massage?",
          answer: [
            "Therapeutic massage focuses on addressing the cause of pain or tension, not only helping you relax. It begins with an assessment to understand what is happening in the body and work with more precision.",
            "Each session starts with a brief assessment so the treatment can adapt to what your body truly needs.",
            "Relaxation massage mainly supports general wellbeing and rest, without focusing on a specific concern.",
          ],
        },
        {
          question: "Does therapeutic massage hurt?",
          answer: [
            "There may be some discomfort in areas with a lot of tension, but it should never feel intensely painful. The goal is not to endure pain, but to work with the tissue progressively and safely.",
            "Each session adapts to your tolerance, prioritizing results without creating unnecessary stress in the body.",
          ],
        },
        {
          question: "How many sessions do I need?",
          answer: [
            "It depends on each case. Some people feel improvement after the first session, but accumulated or long-term discomfort usually benefits from a process over several sessions.",
            "The initial assessment helps guide the recommendation based on your goals and condition.",
          ],
        },
        {
          question: "Is it safe during pregnancy?",
          answer: [
            "Yes, prenatal massage is safe when appropriate techniques and comfortable positions are used.",
            "It focuses on easing tension, supporting circulation, and accompanying the body's changes during pregnancy.",
          ],
        },
        {
          question: "What kinds of discomfort can be treated?",
          answer: [
            "Sessions can support back and neck pain, muscle tension, accumulated physical stress, postural discomfort, and physical recovery.",
            "Each session adapts to what your body needs in that moment.",
          ],
        },
        {
          question: "What should I do before and after the session?",
          answer: [
            "Before: wear comfortable clothing and, if possible, avoid very heavy meals right before the session.",
            "After: hydrate well, allow your body to rest, and avoid intense effort immediately afterward.",
          ],
        },
        {
          question: "How long does a session last?",
          answer: [
            "Sessions usually last between 60 and 90 minutes, depending on the type of treatment and each person's needs.",
          ],
        },
        {
          question: "Do I need previous massage experience?",
          answer: [
            "No. Many people begin without previous experience. The session adapts fully to your comfort level and the process is explained so you can feel at ease.",
          ],
        },
        {
          question: "How can I book a session?",
          answer: [
            "You can book easily through the booking button or write directly on WhatsApp to coordinate your appointment.",
          ],
        },
        {
          question: "Where do sessions take place?",
          answer: [
            "Sessions take place in Cartagena, Colombia. You can book online or write on WhatsApp to confirm availability and location.",
          ],
        },
      ],
      ctaText: "Do you have another question or want to book your session?",
      bookButton: "Book appointment",
      whatsappButton: "Write on WhatsApp",
    },
    ctaEyebrow: "Booking",
    ctaTitle: "Book your appointment",
    ctaText: "In-person sessions in Cartagena, Colombia.",
    bookOnline: "Online booking",
    whatsappBooking: "Book by WhatsApp",
    footer: "© 2026 Aluna Integral Wellness · Cartagena, Colombia.",
    posts: {
      "parte-cuerpo-mas-importante": {
        title: "What is the most important body part to massage?",
        text: "Why there is not always one main area and how the first treatment focus is chosen.",
      },
      "duracion-masaje-terapeutico": {
        title: "How long does a therapeutic massage last?",
        text: "A practical guide to session length, treatment goals, and choosing between short or full sessions.",
      },
      "treinta-minutos-masaje": {
        title: "Is 30 minutes of massage enough?",
        text: "When a shorter session can help and when more time may lead to better results.",
      },
      "evidencia-cientifica-masajes": {
        title: "Are massages scientifically proven to be effective?",
        text: "What evidence says about massage, pain, stress, mobility, and wellbeing.",
      },
      "movilidad-postura-tension": {
        title: "Mobility, posture, and daily tension",
        text: "How work, stress, and everyday habits influence body pain.",
      },
      "drenaje-linfatico": {
        title: "When is lymphatic drainage recommended?",
        text: "Common signs, benefits, and when it can be useful as part of a therapeutic plan.",
      },
      "masaje-terapeutico": {
        title: "What is therapeutic massage?",
        text: "A clear introduction to its approach, goals, and how it differs from relaxation massage.",
      },
    },
  },
  fr: {
    nav: {
      philosophy: "Philosophie",
      treatments: "Soins",
      blog: "Blog",
      faq: "FAQ",
      testimonials: "Avis",
      contact: "Contact",
    },
    reserve: "Réserver",
    heroEyebrow: "Massage thérapeutique à Cartagena, Colombie",
    heroTitle: ["Soins corporels", "thérapeutiques avec", "chaleur et expertise."],
    heroText:
      "Une approche professionnelle qui intègre thérapie manuelle, bien-être et attention chaleureuse pour la douleur, la tension et la récupération.",
    viewServices: "Voir les services",
    bookAppointment: "Réserver un rendez-vous",
    badgeTitle: "Katy Fernandez",
    badgeText: "Massothérapeute · Service bilingue",
    badgeHint: "Voir le profil",
    badgeClose: "Fermer",
    aboutTitle: "À propos de Katy",
    aboutText:
      "Massothérapeute avec plus de 5 ans d'expérience, spécialisée dans les traitements personnalisés pour la douleur, la mobilité, la récupération et le bien-être corporel.",
    trustStrip: [
      "5+ ans d'expérience",
      "Tissus profonds",
      "Drainage lymphatique",
      "Libération myofasciale",
    ],
    standardEyebrow: "Le standard",
    philosophyTitle: "Une approche clinique, humaine et clairement différenciée.",
    philosophyCopy:
      "Pensée pour transmettre confiance, préparation et une expérience plus thérapeutique qu'esthétique.",
    features: [
      {
        title: "Évaluation",
        text: "Identifier la cause profonde, pas seulement les symptômes.",
        symbol: "○",
      },
      {
        title: "Bilingue",
        text: "Espagnol et anglais pour une clientèle locale et internationale.",
        symbol: "◇",
      },
      {
        title: "Standards",
        text: "Protocoles professionnels, clairs et constants.",
        symbol: "✦",
      },
    ],
    modalitiesTitle: "Modalités thérapeutiques",
    modalities: [
      {
        title: "Tissus profonds",
        text: "Libération myofasciale et tension chronique.",
      },
      {
        title: "Drainage lymphatique",
        text: "Stimule le système lymphatique et réduit la rétention.",
      },
      {
        title: "Libération myofasciale",
        text: "Libère les restrictions et aide à réduire la douleur chronique.",
      },
    ],
    blogTitle: "Des articles pour informer et inspirer confiance",
    blogCopy:
      "Un espace pour répondre aux questions fréquentes et renforcer l'approche thérapeutique.",
    articleLabel: "Article",
    viewArticle: "Lire l'article →",
    viewAllArticles: "Voir tous les articles",
    allArticlesTitle: "Tous les articles",
    allArticlesCopy:
      "Ressources pour découvrir le massage thérapeutique, la récupération et le bien-être corporel.",
    backHome: "Retour à l'accueil",
    backBlog: "Retour au blog",
    notFoundTitle: "Article introuvable",
    notFoundText: "L'article que vous cherchez n'est pas disponible.",
    testimonialsTitle: "Ce que disent nos clients",
    testimonials: [
      {
        quote:
          "Katy is truly phenomenal and always knows exactly what I need. She deserves all the recognition.",
        name: "Liyah Lewis",
        place: "Avis Google · 5 étoiles",
      },
      {
        quote:
          "Katy was amazing and made me feel super comfortable as it was my first time. I will definitely be coming back.",
        name: "Jade Lee",
        place: "Avis Google · 5 étoiles",
      },
      {
        quote:
          "I have been going to Katy for over 3 years. She is very professional and ensures each massage is personalized.",
        name: "Ruwandi Marianne",
        place: "Avis Google · 5 étoiles",
      },
      {
        quote:
          "She checks in during the massage to see if the pressure is adequate and adjusts if I have any concerns.",
        name: "Ruwandi Marianne",
        place: "Avis Google · 5 étoiles",
      },
    ],
    faq: {
      eyebrow: "Questions fréquentes",
      title: "Des réponses claires avant de commencer",
      items: [
        {
          question: "Quel est le processus habituel d'un rendez-vous de massage thérapeutique ?",
          answer: [
            "Le processus commence par un formulaire et une consultation initiale pour comprendre vos gênes, vos objectifs et toute information importante sur votre corps.",
            "Ensuite vient le traitement, qui dure le plus souvent entre 60 et 90 minutes, adapté à ce qui est observé pendant l'évaluation.",
            "À la fin, si nécessaire, des indications simples d'entretien sont données pour aider à maintenir les résultats après la séance.",
          ],
        },
        {
          question: "Quelle est la différence entre un massage thérapeutique et un massage relaxant ?",
          answer: [
            "Le massage thérapeutique vise à traiter la cause de la douleur ou de la tension, pas seulement à détendre. Il commence par une évaluation pour comprendre ce qui se passe dans le corps et travailler de façon ciblée.",
            "Chaque séance commence par une brève évaluation afin d'adapter le traitement à ce dont votre corps a réellement besoin.",
            "Le massage relaxant recherche surtout le bien-être général et le repos, sans se concentrer sur une gêne précise.",
          ],
        },
        {
          question: "Le massage thérapeutique fait-il mal ?",
          answer: [
            "Il peut y avoir un certain inconfort dans les zones très tendues, mais cela ne devrait jamais être une douleur intense. L'objectif n'est pas de supporter, mais de travailler les tissus progressivement et en sécurité.",
            "Chaque séance s'adapte à votre tolérance, en privilégiant les résultats sans créer de stress inutile dans le corps.",
          ],
        },
        {
          question: "Combien de séances faut-il ?",
          answer: [
            "Cela dépend de chaque cas. Certaines personnes sentent une amélioration dès la première séance, mais les gênes accumulées ou anciennes demandent souvent un processus sur plusieurs séances.",
            "L'évaluation initiale permet de mieux orienter la recommandation selon vos objectifs et votre condition.",
          ],
        },
        {
          question: "Est-ce sûr pendant la grossesse ?",
          answer: [
            "Oui, le massage prénatal est sûr lorsqu'il est réalisé avec des techniques adaptées et dans des positions confortables pour la mère.",
            "Il vise à soulager les tensions, améliorer la circulation et accompagner les changements du corps pendant la grossesse.",
          ],
        },
        {
          question: "Quels types de gênes peuvent être traités ?",
          answer: [
            "Les séances peuvent aider avec les douleurs du dos et du cou, la tension musculaire, le stress physique accumulé, les gênes posturales et la récupération physique.",
            "Chaque séance s'adapte à ce dont votre corps a besoin à ce moment-là.",
          ],
        },
        {
          question: "Que faire avant et après la séance ?",
          answer: [
            "Avant : venir avec des vêtements confortables et, si possible, éviter les repas très lourds juste avant la séance.",
            "Après : bien s'hydrater, laisser le corps se reposer et éviter les efforts intenses immédiatement après.",
          ],
        },
        {
          question: "Combien de temps dure une séance ?",
          answer: [
            "Les séances durent généralement entre 60 et 90 minutes, selon le type de traitement et les besoins de chaque personne.",
          ],
        },
        {
          question: "Faut-il avoir déjà reçu un massage ?",
          answer: [
            "Non. Beaucoup de personnes commencent sans expérience préalable. La séance s'adapte entièrement à votre niveau de confort et le processus est expliqué pour que vous vous sentiez tranquille.",
          ],
        },
        {
          question: "Comment puis-je réserver une séance ?",
          answer: [
            "Vous pouvez réserver facilement avec le bouton de réservation ou écrire directement sur WhatsApp pour coordonner votre rendez-vous.",
          ],
        },
        {
          question: "Où se déroulent les séances ?",
          answer: [
            "Les séances se déroulent à Cartagena, en Colombie. Vous pouvez réserver en ligne ou écrire sur WhatsApp pour confirmer la disponibilité et le lieu.",
          ],
        },
      ],
      ctaText: "Avez-vous une autre question ou souhaitez-vous réserver votre séance ?",
      bookButton: "Réserver",
      whatsappButton: "Écrire sur WhatsApp",
    },
    ctaEyebrow: "Réservation",
    ctaTitle: "Réservez votre rendez-vous",
    ctaText: "Séances en personne à Cartagena, Colombie.",
    bookOnline: "Réservation en ligne",
    whatsappBooking: "Réserver par WhatsApp",
    footer: "© 2026 Aluna Bien-être Intégral · Cartagena, Colombie.",
    posts: {
      "parte-cuerpo-mas-importante": {
        title: "Quelle est la partie du corps la plus importante à masser ?",
        text: "Pourquoi il n'existe pas toujours une seule zone principale et comment choisir la priorité du soin.",
      },
      "duracion-masaje-terapeutico": {
        title: "Combien de temps dure un massage thérapeutique ?",
        text: "Un guide pratique sur la durée, les objectifs du soin et le choix entre séance courte ou complète.",
      },
      "treinta-minutos-masaje": {
        title: "Est-ce que 30 minutes de massage suffisent ?",
        text: "Quand une séance courte peut aider et quand plus de temps peut donner de meilleurs résultats.",
      },
      "evidencia-cientifica-masajes": {
        title: "L'efficacité des massages est-elle scientifiquement prouvée ?",
        text: "Ce que dit la recherche sur le massage, la douleur, le stress, la mobilité et le bien-être.",
      },
      "movilidad-postura-tension": {
        title: "Mobilité, posture et tension quotidienne",
        text: "Comment le travail, le stress et les habitudes quotidiennes influencent les douleurs corporelles.",
      },
      "drenaje-linfatico": {
        title: "Quand le drainage lymphatique est-il recommandé ?",
        text: "Signes courants, bienfaits et cas où il peut être utile dans un plan thérapeutique.",
      },
      "masaje-terapeutico": {
        title: "Qu'est-ce que le massage thérapeutique ?",
        text: "Une introduction claire à son approche, ses objectifs et sa différence avec le massage relaxant.",
      },
    },
  },
};

const featureIconTypes = ["assessment", "language", "standards"];

function FeatureIcon({ type }) {
  if (type === "assessment") {
    return (
      <svg className="feature-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M8.5 5.4H7.2a2 2 0 0 0-2 2v10.4a2 2 0 0 0 2 2h9.6a2 2 0 0 0 2-2V7.4a2 2 0 0 0-2-2h-1.3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
        <path
          d="M8.7 6.8h6.6V5.5a2 2 0 0 0-2-2h-2.6a2 2 0 0 0-2 2v1.3Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
        <path
          d="M8.9 13.1l2 2 4.4-4.8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (type === "language") {
    return (
      <svg className="feature-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4.5 8.2h8.6M8.8 5.5v2.7M6.5 16.3c2.5-1.8 4.3-4.5 5-8.1M6.2 8.2c.8 2.2 2.2 4.1 4.2 5.8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.65"
        />
        <path
          d="M13.6 18.5l3.1-8.2 3.1 8.2M14.7 15.8h4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.65"
        />
      </svg>
    );
  }

  return (
    <svg className="feature-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.8l6.2 2.5v5.2c0 4-2.5 7.3-6.2 8.7-3.7-1.4-6.2-4.7-6.2-8.7V6.3L12 3.8Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M9.1 12.1l2 2 4-4.3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function App() {
  const pathLanguage = window.location.pathname.match(/^\/(en|fr)(?=\/|$)/)?.[1];
  const initialLanguage = pathLanguage || "es";
  const [language, setLanguage] = useState(initialLanguage);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const t = translations[language];
  const nav = [
    { id: "treatments", href: "#tratamientos" },
    { id: "blog", href: "#blog" },
    { id: "faq", href: "#faq" },
    { id: "testimonials", href: "#testimonios" },
  ];
  const languagePrefix = language === "es" ? "" : `/${language}`;
  const blogPath = window.location.pathname.replace(/^\/(en|fr)(?=\/|$)/, "");
  const blogSlug = blogPath.match(/^\/blog\/([^/]+)/)?.[1];
  const activePost = blogSlug ? getBlogPost(language, blogSlug) : null;
  const isBlogIndex = blogPath === "/blog";
  const isBlogPage = Boolean(blogSlug) || isBlogIndex;
  const localizedBlogPosts = getBlogPosts(language);
  const homepagePosts = localizedBlogPosts.slice(0, 3);
  const navPrefix = isBlogPage ? `${languagePrefix}/` : "";

  const features = t.features;
  const modalities = t.modalities;
  const testimonials = t.testimonials;
  const faq = t.faq;

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [isBadgeExpanded, setIsBadgeExpanded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);
  const scrollToHero = (event) => {
    if (isBlogPage) return;

    event.preventDefault();
    heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const languagePath = (code) => (code === "es" ? "" : `/${code}`);
  const changeLanguage = (code) => {
    if (code === language) {
      setIsLanguageOpen(false);
      return;
    }

    if (activePost) {
      const translatedPost = getBlogPostByKey(code, activePost.translationKey);
      window.location.assign(
        `${languagePath(code)}/blog/${translatedPost?.slug || activePost.slug}`
      );
      return;
    }

    if (isBlogIndex) {
      window.location.assign(`${languagePath(code)}/blog`);
      return;
    }

    setLanguage(code);
    setIsLanguageOpen(false);
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');

        :root {
          --sage: #7A8F7A;
          --sage-light: #A8B8A2;
          --navy: #4F6473;
          --navy-deep: #405563;
          --blush: #D8A7A0;
          --beige: #F4EFEA;
          --sand: #E6D8C9;
          --off-white: #FAF7F3;
          --text: #2E3B35;
          --muted: #6F7A74;
          --line: rgba(79, 100, 115, 0.10);
          --card-border: rgba(122, 143, 122, 0.08);
          --shadow-soft: 0 18px 40px rgba(79, 100, 115, 0.08);
          --shadow-strong: 0 26px 60px rgba(79, 100, 115, 0.12);
        }

        * { box-sizing: border-box; }
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 118px;
        }
        body {
          margin: 0;
          font-family: 'Inter', Arial, Helvetica, sans-serif;
          background: var(--beige);
          color: var(--text);
        }
        a { text-decoration: none; color: inherit; }

        .container { width: min(1120px, calc(100% - 48px)); margin: 0 auto; }
        .serif { font-family: 'Playfair Display', Georgia, serif; }

        .site-header {
          position: sticky;
          top: 0;
          z-index: 20;
          background: rgba(244, 239, 234, 0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--line);
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          gap: 16px;
        }

        .brand {
          font-size: 1.7rem;
          color: var(--sage);
          white-space: nowrap;
          letter-spacing: -0.03em;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 22px;
          color: var(--navy);
          font-size: 0.95rem;
          font-weight: 500;
        }

        .nav a {
          white-space: nowrap;
        }

        .nav a:hover, .brand:hover { opacity: 0.82; }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .header-socials {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .language-menu {
          position: relative;
        }

        .floating-language {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 30;
        }

        .language-trigger {
          width: 52px;
          height: 52px;
          border: 1px solid rgba(79, 100, 115, 0.12);
          border-radius: 999px;
          background: rgba(255,255,255,0.82);
          color: var(--navy);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font: inherit;
          cursor: pointer;
          box-shadow: 0 8px 18px rgba(79, 100, 115, 0.07);
          transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
        }

        .language-trigger:hover {
          background: var(--off-white);
          border-color: rgba(122, 143, 122, 0.34);
          color: var(--sage);
          transform: translateY(-2px);
        }

        .language-icon {
          width: 25px;
          height: 25px;
          display: block;
        }

        .language-panel {
          position: absolute;
          right: 0;
          bottom: calc(100% + 10px);
          width: 168px;
          padding: 8px;
          background: rgba(250, 247, 243, 0.98);
          border: 1px solid rgba(79, 100, 115, 0.10);
          border-radius: 18px;
          box-shadow: 0 18px 38px rgba(79, 100, 115, 0.14);
        }

        .language-option {
          width: 100%;
          border: 0;
          background: transparent;
          border-radius: 12px;
          padding: 10px 12px;
          color: var(--navy);
          display: flex;
          align-items: center;
          gap: 10px;
          font: inherit;
          font-size: 0.94rem;
          cursor: pointer;
        }

        .language-option:hover,
        .language-option.active {
          background: rgba(168, 184, 162, 0.18);
          color: var(--sage);
        }

        .language-flag {
          font-size: 1rem;
          line-height: 1;
        }

        .button-dark, .button-light {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 14px 28px;
          font-size: 0.95rem;
          font-weight: 600;
          transition: transform 0.18s ease, opacity 0.18s ease, background 0.18s ease, border-color 0.18s ease;
          cursor: pointer;
        }

        .button-dark:hover, .button-light:hover, .social-btn:hover, .card:hover, .modality:hover {
          transform: translateY(-2px);
        }

        .button-dark {
          background: var(--navy);
          color: white;
          box-shadow: 0 10px 28px rgba(79, 100, 115, 0.18);
        }

        .button-dark:hover { background: var(--navy-deep); }

        .button-light {
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(79, 100, 115, 0.14);
          color: var(--navy);
          box-shadow: 0 4px 14px rgba(79, 100, 115, 0.05);
        }

        .button-light:hover { border-color: rgba(122, 143, 122, 0.28); }

        .hero {
          display: grid;
          grid-template-columns: 1fr 0.95fr;
          gap: 54px;
          align-items: center;
          padding: 20px 0 64px;
        }

        .eyebrow {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: var(--navy);
          font-weight: 600;
        }

        .hero-title {
          margin: 16px 0 0;
          max-width: 620px;
          font-size: 3.75rem;
          line-height: 0.98;
          letter-spacing: -0.04em;
          color: var(--sage);
        }

        .hero-text {
          margin-top: 18px;
          max-width: 520px;
          font-size: 1rem;
          line-height: 1.7;
          color: var(--muted);
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 26px;
        }

        .hero-visual-wrap {
          position: relative;
        }

        .glow-left, .glow-right {
          position: absolute;
          border-radius: 999px;
          filter: blur(40px);
          opacity: 0.8;
        }

        .glow-left {
          width: 120px;
          height: 120px;
          background: rgba(216, 167, 160, 0.38);
          left: -18px;
          top: 48px;
        }

        .glow-right {
          width: 170px;
          height: 170px;
          background: rgba(168, 184, 162, 0.32);
          right: -30px;
          bottom: 30px;
        }

        .hero-frame {
          position: relative;
          border-radius: 36px;
          padding: 14px;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.7);
          box-shadow: var(--shadow-strong);
        }

        .hero-visual {
          height: clamp(430px, 42vw, 520px);
          border-radius: 28px;
          background:
            radial-gradient(circle at 18% 18%, rgba(79, 100, 115, 0.95) 0, rgba(79, 100, 115, 0.95) 26%, transparent 27%),
            radial-gradient(circle at 78% 76%, rgba(250, 247, 243, 0.98) 0, rgba(250, 247, 243, 0.98) 28%, transparent 29%),
            radial-gradient(circle at 42% 94%, rgba(216, 167, 160, 0.30) 0, rgba(216, 167, 160, 0.30) 16%, transparent 17%),
            linear-gradient(135deg, transparent 0 22%, rgba(230, 216, 201, 0.92) 22% 31%, transparent 31% 34%, rgba(168, 184, 162, 0.58) 34% 63%, transparent 63%),
            linear-gradient(180deg, #F4EFEA 0%, #F7F3EE 100%);
        }

        .badge {
          position: absolute;
          left: 32px;
          bottom: 32px;
          background: rgba(250, 247, 243, 0.94);
          border: 1px solid rgba(79, 100, 115, 0.08);
          border-radius: 18px;
          padding: 14px 48px 14px 16px;
          font-size: 0.8rem;
          color: var(--navy);
          box-shadow: 0 14px 30px rgba(79, 100, 115, 0.14);
          text-align: left;
          cursor: pointer;
          font: inherit;
          transition: transform 0.18s ease, background 0.18s ease;
        }

        .badge:hover {
          transform: translateY(-2px);
          background: var(--off-white);
        }

        .badge strong {
          display: block;
          color: var(--sage);
          margin-bottom: 4px;
        }

        .badge-hint {
          display: block;
          margin-top: 8px;
          color: var(--muted);
          font-size: 0.72rem;
          font-weight: 600;
        }

        .badge-icon {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 24px;
          height: 24px;
          border-radius: 999px;
          background: rgba(168, 184, 162, 0.22);
          color: var(--navy);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1;
        }

        .about-overlay {
          position: absolute;
          inset: 14px;
          border-radius: 28px;
          background: linear-gradient(145deg, rgba(250, 247, 243, 0.96), rgba(244, 239, 234, 0.92));
          border: 1px solid rgba(79, 100, 115, 0.10);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.75);
          padding: 34px;
          color: var(--navy);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          animation: fadeIn 0.2s ease;
        }

        .about-overlay h2 {
          margin: 10px 0 0;
          color: var(--sage);
          font-size: 2.35rem;
          line-height: 1.05;
          letter-spacing: -0.04em;
        }

        .about-overlay p {
          max-width: 460px;
          margin: 18px 0 0;
          color: var(--muted);
          font-size: 0.98rem;
          line-height: 1.75;
        }

        .about-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 22px;
        }

        .about-pill {
          border-radius: 999px;
          padding: 8px 12px;
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(122, 143, 122, 0.14);
          color: var(--navy);
          font-size: 0.78rem;
          font-weight: 600;
        }

        .about-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid rgba(79, 100, 115, 0.12);
          background: rgba(255,255,255,0.72);
          color: var(--navy);
          cursor: pointer;
          font-size: 1.1rem;
          line-height: 1;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.985); }
          to { opacity: 1; transform: scale(1); }
        }

        .section {
          padding: 88px 0;
        }

        .section-top {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 30px;
          margin-bottom: 44px;
        }

        .section-title {
          margin: 14px 0 0;
          max-width: 700px;
          color: var(--sage);
          font-size: 3rem;
          line-height: 1.04;
          letter-spacing: -0.04em;
        }

        .section-copy {
          max-width: 360px;
          color: var(--muted);
          font-size: 0.95rem;
          line-height: 1.9;
        }

        .feature-grid, .modality-grid {
          display: grid;
          gap: 24px;
        }

        .feature-grid, .modality-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .card {
          background: rgba(255,255,255,0.82);
          border: 1px solid var(--card-border);
          border-radius: 28px;
          padding: 30px;
          box-shadow: var(--shadow-soft);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .feature-card {
          min-height: 252px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 34px 28px;
        }

        .symbol {
          width: 64px;
          height: 64px;
          border-radius: 22px;
          background:
            linear-gradient(145deg, rgba(250,255,250,0.92), rgba(168, 184, 162, 0.22));
          border: 1px solid rgba(122, 143, 122, 0.14);
          color: var(--navy);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 26px rgba(79, 100, 115, 0.08);
          margin-bottom: 6px;
        }

        .feature-icon {
          width: 34px;
          height: 34px;
          display: block;
        }

        .card h3, .modality h3 {
          margin: 18px 0 0;
          font-size: 1.05rem;
          color: var(--navy);
        }

        .card p {
          margin: 12px 0 0;
          color: var(--muted);
          font-size: 0.95rem;
          line-height: 1.8;
        }

        .modality {
          position: relative;
          overflow: hidden;
          border-radius: 30px;
          min-height: 430px;
          box-shadow: 0 20px 45px rgba(79, 100, 115, 0.10);
          transition: transform 0.18s ease;
        }

        .modality-bg {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(244, 239, 234, 0.06), rgba(244, 239, 234, 0.06)),
            radial-gradient(circle at 18% 18%, rgba(79, 100, 115, 0.95) 0, rgba(79, 100, 115, 0.95) 22%, transparent 23%),
            radial-gradient(circle at 78% 78%, rgba(250, 247, 243, 0.95) 0, rgba(250, 247, 243, 0.95) 24%, transparent 25%),
            radial-gradient(circle at 40% 96%, rgba(216, 167, 160, 0.28) 0, rgba(216, 167, 160, 0.28) 14%, transparent 15%),
            linear-gradient(135deg, transparent 0 24%, rgba(230, 216, 201, 0.9) 24% 33%, transparent 33% 36%, rgba(168, 184, 162, 0.56) 36% 64%, transparent 64%),
            linear-gradient(180deg, #F4EFEA 0%, #F8F4F0 100%);
        }

        .modality-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(64, 85, 99, 0.68), rgba(64, 85, 99, 0.10), transparent);
        }

        .modality-content {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 22px;
          color: white;
        }

        .modality-content p {
          margin-top: 8px;
          font-size: 0.82rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.9);
        }

        .testimonial-card {
          background: rgba(168, 184, 162, 0.16);
          border-radius: 32px;
          padding: 38px;
          box-shadow: var(--shadow-soft);
        }

        .testimonial-quote {
          margin: 20px 0 0;
          font-size: 1.7rem;
          line-height: 1.55;
          letter-spacing: -0.02em;
          color: var(--navy);
          font-style: italic;
        }

        .review-stars {
          margin-top: 4px;
          color: #D8A7A0;
          font-size: 1.05rem;
          letter-spacing: 0.08em;
        }

        .testimonial-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 28px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: rgba(216, 167, 160, 0.34);
        }

        .faq-section {
          padding-top: 8px;
        }

        .faq-wrap {
          display: grid;
          grid-template-columns: 0.78fr 1.22fr;
          gap: 44px;
          align-items: start;
        }

        .faq-heading {
          position: sticky;
          top: 132px;
        }

        .faq-list {
          display: grid;
          gap: 12px;
        }

        .faq-item {
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(122, 143, 122, 0.12);
          border-radius: 24px;
          box-shadow: 0 12px 30px rgba(79, 100, 115, 0.06);
          overflow: hidden;
        }

        .faq-question {
          width: 100%;
          min-height: 72px;
          border: 0;
          background: transparent;
          color: var(--navy);
          cursor: pointer;
          display: grid;
          grid-template-columns: 1fr 34px;
          align-items: center;
          gap: 18px;
          padding: 20px 22px;
          text-align: left;
          font: inherit;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.45;
        }

        .faq-question:hover {
          background: rgba(168, 184, 162, 0.10);
        }

        .faq-icon {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          background: rgba(168, 184, 162, 0.18);
          color: var(--sage);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          line-height: 1;
          transition: transform 0.18s ease, background 0.18s ease;
        }

        .faq-item.open .faq-icon {
          transform: rotate(45deg);
          background: rgba(216, 167, 160, 0.22);
        }

        .faq-answer {
          padding: 0 22px 22px;
          color: var(--muted);
          font-size: 0.95rem;
          line-height: 1.82;
        }

        .faq-answer p {
          margin: 0 0 12px;
        }

        .faq-answer p:last-child {
          margin-bottom: 0;
        }

        .faq-cta {
          margin-top: 22px;
          padding: 24px;
          border-radius: 28px;
          background: rgba(168, 184, 162, 0.16);
          border: 1px solid rgba(122, 143, 122, 0.12);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .faq-cta p {
          margin: 0;
          max-width: 340px;
          color: var(--navy);
          font-weight: 700;
          line-height: 1.5;
        }

        .faq-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .cta-wrap {
          padding-top: 8px;
        }

        .cta {
          background: linear-gradient(145deg, rgba(250, 247, 243, 0.92), rgba(230, 216, 201, 0.68));
          border-radius: 36px;
          box-shadow: 0 28px 60px rgba(79, 100, 115, 0.08);
          text-align: center;
          padding: 78px 24px;
          border: 1px solid rgba(79, 100, 115, 0.06);
        }

        .cta-title {
          max-width: 780px;
          margin: 14px auto 0;
          font-size: 3.5rem;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--sage);
        }

        .cta-text {
          margin: 18px auto 0;
          max-width: 480px;
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.7;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 30px;
        }

        .wordmark {
          margin-top: 62px;
          text-align: center;
          font-size: 4.5rem;
          line-height: 1;
          letter-spacing: -0.05em;
          color: rgba(122, 143, 122, 0.18);
          pointer-events: none;
          user-select: none;
        }

        .footer {
          margin-top: 28px;
          border-top: 1px solid rgba(79, 100, 115, 0.10);
          padding: 30px 0 34px;
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          color: rgba(79, 100, 115, 0.82);
          font-size: 0.78rem;
        }

        .social-btn {
          width: 52px;
          height: 52px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(122, 143, 122, 0.16);
          color: var(--navy);
          box-shadow: 0 8px 18px rgba(79, 100, 115, 0.07);
          transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
        }

        .header-socials .social-btn {
          width: 42px;
          height: 42px;
          box-shadow: none;
        }

        .social-btn:hover {
          background: var(--off-white);
          border-color: rgba(122, 143, 122, 0.34);
          color: var(--sage);
        }

        .social-icon {
          width: 28px;
          height: 28px;
          display: block;
        }

        .header-socials .social-icon {
          width: 30px;
          height: 30px;
        }

        .article-section {
          padding: 58px 0 88px;
        }

        .article-wrap {
          max-width: 780px;
          margin: 0 auto;
        }

        .article-title {
          margin: 16px 0 0;
          color: var(--sage);
          font-size: 3.25rem;
          line-height: 1.05;
          letter-spacing: -0.04em;
        }

        .article-summary {
          margin: 20px 0 0;
          color: var(--muted);
          font-size: 1.05rem;
          line-height: 1.8;
        }

        .article-body {
          margin-top: 42px;
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(122, 143, 122, 0.10);
          border-radius: 28px;
          padding: 42px;
          box-shadow: var(--shadow-soft);
        }

        .article-body h2 {
          margin: 34px 0 10px;
          color: var(--navy);
          font-size: 1.35rem;
        }

        .article-body h2:first-child {
          margin-top: 0;
        }

        .article-body p {
          margin: 0 0 20px;
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.9;
        }

        .article-back {
          display: inline-flex;
          margin-top: 28px;
          color: var(--navy);
          font-size: 0.95rem;
          font-weight: 600;
        }

        .blog-index-actions {
          display: flex;
          justify-content: center;
          margin-top: 30px;
        }

        @media (max-width: 960px) {
          .hero,
          .faq-wrap,
          .feature-grid,
          .modality-grid {
            grid-template-columns: 1fr;
          }

          .section-top,
          .footer-inner,
          .header-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .nav {
            display: none;
          }

          .faq-heading {
            position: static;
          }

          .faq-cta {
            align-items: flex-start;
            flex-direction: column;
          }

          .faq-actions {
            width: 100%;
            justify-content: flex-start;
          }

          .hero-title {
            font-size: 2.8rem;
          }

          .section-title {
            font-size: 2.3rem;
          }

          .cta-title {
            font-size: 2.6rem;
          }

          .wordmark {
            font-size: 3.3rem;
          }
        }

        @media (max-width: 640px) {
          .container {
            width: min(1120px, calc(100% - 32px));
          }

          .hero {
            padding: 42px 0 58px;
            gap: 34px;
          }

          .hero-title {
            font-size: 2.32rem;
          }

          .badge {
            left: 22px;
            right: 22px;
            bottom: 22px;
            width: auto;
            max-width: calc(100% - 44px);
            padding: 10px 42px 10px 12px;
            border-radius: 14px;
            font-size: 0.74rem;
            line-height: 1.35;
          }

          .badge strong {
            margin-bottom: 2px;
          }

          .badge-hint {
            display: none;
          }

          .badge-icon {
            top: 50%;
            right: 12px;
            width: 22px;
            height: 22px;
            font-size: 0.95rem;
            transform: translateY(-50%);
          }

          .about-overlay {
            padding: 24px;
          }

          .about-overlay h2 {
            font-size: 1.85rem;
          }

          .about-overlay p {
            font-size: 0.9rem;
            line-height: 1.65;
          }

          .about-list {
            gap: 8px;
            margin-top: 16px;
          }

          .about-pill {
            padding: 7px 10px;
            font-size: 0.72rem;
          }

          .section {
            padding: 72px 0;
          }

          .section-title {
            font-size: 2rem;
          }

          .article-title {
            font-size: 2.3rem;
          }

          .article-body {
            padding: 30px 24px;
          }

          .faq-question {
            min-height: 66px;
            padding: 18px;
            font-size: 0.95rem;
          }

          .faq-answer {
            padding: 0 18px 18px;
          }

          .faq-cta {
            padding: 20px;
          }

          .cta {
            padding: 62px 18px;
          }

          .cta-title {
            font-size: 2.1rem;
          }

          .wordmark {
            font-size: 2.5rem;
          }

          .button-dark, .button-light {
            width: 100%;
          }

          .hero-actions {
            flex-direction: column;
          }

          .floating-language {
            right: 16px;
            bottom: 16px;
          }

          .language-trigger {
            width: 48px;
            height: 48px;
          }

          .header-socials {
            gap: 6px;
          }

          .header-socials .social-btn {
            width: 38px;
            height: 38px;
          }
        }
      `}</style>

      <header className="site-header">
        <div className="container header-inner">
          <a
            href={isBlogPage ? `${languagePrefix}/` : "#top"}
            className="brand serif"
            onClick={scrollToHero}
          >
            <img
              src="/logo_h_nb.png"
              alt=""
              style={{
                height: "86px",
                width: "auto",
                verticalAlign: "middle",
                marginRight: "10px",
              }}
            />
          </a>

          <nav className="nav">
            {nav.map((item) => (
              <a key={item.id} href={`${navPrefix}${item.href}`}>
                {t.nav[item.id]}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <div className="header-socials" aria-label="Social links">
              <a
                href="https://www.instagram.com/katyfernandezrmt/"
                className="social-btn"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3.4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle cx="16.8" cy="7.2" r="1.1" fill="currentColor" />
                </svg>
              </a>
              <a
                href="#"
                className="social-btn"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M5.6 19.2l1-3.5A7.6 7.6 0 1 1 9 18.1l-3.4 1.1Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M9.5 8.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c.7 1.3 1.7 2.2 3 2.8l.5-.6c.2-.2.4-.3.7-.2l1.6.7c.3.1.4.3.4.6v.5c0 .4-.2.6-.5.8-.5.3-1.3.5-2.4.2-2.8-.7-5.6-3.4-6.3-6.2-.2-.9 0-1.7.4-2.2Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>

            <a
              href={`${navPrefix}#contacto`}
              className="button-dark"
              style={styles.smallButton}
            >
              {t.reserve}
            </a>

          </div>
        </div>
      </header>

      <div className="language-menu floating-language">
        <button
          type="button"
          className="language-trigger"
          onClick={() => setIsLanguageOpen((isOpen) => !isOpen)}
          aria-label="Select language"
          aria-expanded={isLanguageOpen}
        >
          <svg className="language-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5s-1.1 6.2-3.3 8.5M12 3.5C9.8 5.8 8.7 8.6 8.7 12s1.1 6.2 3.3 8.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </svg>
        </button>

        {isLanguageOpen && (
          <div className="language-panel">
            {Object.entries(languages).map(([code, option]) => (
              <button
                key={code}
                type="button"
                className={`language-option ${
                  code === language ? "active" : ""
                }`}
                onClick={() => {
                  changeLanguage(code);
                }}
              >
                <span className="language-flag">{option.flag}</span>
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <main id="top">
        {isBlogIndex ? (
          <section className="article-section">
            <div className="container">
              <div className="section-top" style={styles.shortSectionTop}>
                <div>
                  <div className="eyebrow" style={styles.sageEyebrow}>
                    {t.nav.blog}
                  </div>
                  <h1 className="section-title serif">
                    {t.allArticlesTitle}
                  </h1>
                </div>
                <p className="section-copy">
                  {t.allArticlesCopy}
                </p>
              </div>

              <div className="feature-grid">
                {localizedBlogPosts.map((post) => (
                  <div key={post.slug} className="card">
                    <div className="eyebrow" style={styles.blogCardEyebrow}>
                      {t.articleLabel}
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.text}</p>
                    <a
                      href={`${languagePrefix}/blog/${post.slug}`}
                      style={styles.blogLink}
                    >
                      {t.viewArticle}
                    </a>
                  </div>
                ))}
              </div>

              <a href={`${languagePrefix}/#blog`} className="article-back">
                {t.backHome}
              </a>
            </div>
          </section>
        ) : isBlogPage ? (
          <section className="article-section">
            <article className="container article-wrap">
              {activePost ? (
                <>
                  <div className="eyebrow" style={styles.sageEyebrow}>
                    {t.nav.blog}
                  </div>
                  <h1 className="article-title serif">{activePost.title}</h1>
                  <p className="article-summary">{activePost.text}</p>

                  <div className="article-body">
                    {activePost.blocks.map((block, index) =>
                      block.type === "heading" ? (
                        <h2 key={`${block.text}-${index}`}>{block.text}</h2>
                      ) : (
                        <p key={`${block.text}-${index}`}>{block.text}</p>
                      )
                    )}
                  </div>

                  <a href={`${languagePrefix}/#blog`} className="article-back">
                    {t.backBlog}
                  </a>
                </>
              ) : (
                <>
                  <div className="eyebrow" style={styles.sageEyebrow}>
                    {t.nav.blog}
                  </div>
                  <h1 className="article-title serif">
                    {t.notFoundTitle}
                  </h1>
                  <p className="article-summary">
                    {t.notFoundText}
                  </p>
                  <a href={`${languagePrefix}/#blog`} className="article-back">
                    {t.backBlog}
                  </a>
                </>
              )}
            </article>
          </section>
        ) : (
          <>
        <section ref={heroRef} className="container hero">
          <div>
            <div className="eyebrow">{t.heroEyebrow}</div>
            <h1 className="hero-title serif">
              {t.heroTitle[0]}
              <br /> {t.heroTitle[1]}
              <br /> {t.heroTitle[2]}
            </h1>
            <p className="hero-text">
              {t.heroText}
            </p>

            <div className="hero-actions">
              <a href="#tratamientos" className="button-dark">
                {t.viewServices}
              </a>
              <a href="#contacto" className="button-light">
                {t.bookAppointment}
              </a>
            </div>
          </div>

          <div className="hero-visual-wrap">
            <div className="glow-left" />
            <div className="glow-right" />

            <div className="hero-frame">
              <div
                className="hero-visual"
                style={{
                  backgroundImage: "url('/Katy.jpeg')",
                  backgroundSize: "cover",
                  backgroundPosition: "48% 24%",
                }}
              />
              {isBadgeExpanded ? (
                <div className="about-overlay">
                  <button
                    type="button"
                    className="about-close"
                    onClick={() => setIsBadgeExpanded(false)}
                    aria-label={t.badgeClose}
                  >
                    ×
                  </button>
                  <div className="eyebrow" style={styles.sageEyebrow}>
                    {t.badgeTitle}
                  </div>
                  <h2 className="serif">{t.aboutTitle}</h2>
                  <p>{t.aboutText}</p>
                  <div className="about-list">
                    {t.trustStrip.map((item) => (
                      <span key={item} className="about-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="badge"
                  onClick={() => setIsBadgeExpanded(true)}
                  aria-expanded={isBadgeExpanded}
                >
                  <strong>{t.badgeTitle}</strong>
                  {t.badgeText}
                  <span className="badge-hint">{t.badgeHint}</span>
                  <span className="badge-icon" aria-hidden="true">
                    +
                  </span>
                </button>
              )}
            </div>
          </div>
        </section>

        <section
          id="enfoque"
          className="section"
          style={styles.enfoqueSection}
        >
          <div className="container">
            <div className="section-top">
              <div>
                <div className="eyebrow" style={styles.sageEyebrow}>
                  {t.standardEyebrow}
                </div>
                <h2 className="section-title serif">
                  {t.philosophyTitle}
                </h2>
              </div>
              <p className="section-copy">
                {t.philosophyCopy}
              </p>
            </div>

            <div className="feature-grid">
              {features.map((feature, index) => (
                <div key={feature.title} className="card feature-card">
                  <div className="symbol">
                    <FeatureIcon type={featureIconTypes[index]} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="tratamientos"
          className="section"
          style={styles.tightTopSection}
        >
          <div className="container">
            <div className="section-top" style={styles.shortSectionTop}>
              <h2
                className="section-title serif"
                style={styles.modalitiesTitle}
              >
                {t.modalitiesTitle}
              </h2>
              <a href="#contacto" style={styles.linkAccent}>
                {t.reserve} →
              </a>
            </div>

            <div className="modality-grid">
              {["/tejido-profundo.png", "/drenaje.png", "/liberacion.png"].map(
                (img, index) => (
                  <div key={modalities[index].title} className="modality">
                    <div
                      className="modality-bg"
                      style={{
                        backgroundImage: `url('${img}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="modality-overlay" />
                    <div className="modality-content">
                      <h3>{modalities[index].title}</h3>
                      <p>{modalities[index].text}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section id="blog" className="section" style={styles.tightTopSection}>
          <div className="container">
            <div className="section-top" style={styles.shortSectionTop}>
              <div>
                  <div className="eyebrow" style={styles.sageEyebrow}>
                  {t.nav.blog}
                </div>
                <h2 className="section-title serif">
                  {t.blogTitle}
                </h2>
              </div>
              <p className="section-copy">
                {t.blogCopy}
              </p>
            </div>

            <div className="feature-grid">
              {homepagePosts.map((post) => (
                <div key={post.slug} className="card">
                  <div className="eyebrow" style={styles.blogCardEyebrow}>
                    {t.articleLabel}
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.text}</p>
                  <a
                    href={`${languagePrefix}/blog/${post.slug}`}
                    style={styles.blogLink}
                  >
                    {t.viewArticle}
                  </a>
                </div>
              ))}
            </div>

            <div className="blog-index-actions">
              <a href={`${languagePrefix}/blog`} className="button-light">
                {t.viewAllArticles}
              </a>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-wrap">
            <div className="faq-heading">
              <div className="eyebrow" style={styles.sageEyebrow}>
                {faq.eyebrow}
              </div>
              <h2 className="section-title serif">{faq.title}</h2>
            </div>

            <div>
              <div className="faq-list">
                {faq.items.map((item, index) => {
                  const isOpen = activeFaqIndex === index;
                  const panelId = `faq-panel-${index}`;
                  const buttonId = `faq-button-${index}`;

                  return (
                    <article
                      key={item.question}
                      className={`faq-item ${isOpen ? "open" : ""}`}
                    >
                      <button
                        type="button"
                        id={buttonId}
                        className="faq-question"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() =>
                          setActiveFaqIndex(isOpen ? -1 : index)
                        }
                      >
                        <span>{item.question}</span>
                        <span className="faq-icon" aria-hidden="true">
                          +
                        </span>
                      </button>

                      {isOpen && (
                        <div
                          id={panelId}
                          className="faq-answer"
                          role="region"
                          aria-labelledby={buttonId}
                        >
                          {item.answer.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              <div className="faq-cta">
                <p>{faq.ctaText}</p>
                <div className="faq-actions">
                  <a href="#contacto" className="button-dark">
                    {faq.bookButton}
                  </a>
                  <a href="#" className="button-light">
                    {faq.whatsappButton}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials carousel */}
        <section
          id="testimonios"
          className="section"
          style={styles.tightAnchorSection}
        >
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div className="eyebrow">{t.nav.testimonials}</div>
              <h2
                className="section-title serif"
                style={{ margin: "14px auto 0", maxWidth: 560 }}
              >
                {t.testimonialsTitle}
              </h2>
            </div>

            <div
              style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}
            >
              {/* Tarjeta */}
              <div
                className="testimonial-card"
                style={{
                  textAlign: "center",
                  padding: "38px 52px",
                  borderRadius: 36,
                }}
              >
                <div
                  style={{
                    fontSize: "2.8rem",
                    color: "var(--sage)",
                    lineHeight: 1,
                    marginBottom: 8,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  "
                </div>
                <div className="review-stars" aria-label="5 star Google review">
                  ★★★★★
                </div>
                <div
                  className="testimonial-quote serif"
                  style={{ fontSize: "1.45rem", marginTop: 0 }}
                >
                  {testimonials[activeIndex].quote}
                </div>
                <div
                  className="testimonial-meta"
                  style={{ justifyContent: "center", marginTop: 16 }}
                >
                  <div className="avatar" />
                  <div>
                    <div style={styles.metaName}>
                      {testimonials[activeIndex].name}
                    </div>
                    <div style={styles.metaPlace}>
                      {testimonials[activeIndex].place}
                    </div>
                  </div>
                </div>
              </div>

              {/* Flechas */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                  marginTop: 28,
                }}
              >
                <button onClick={prev} style={styles.arrowStyle}>
                  ←
                </button>
                <button onClick={next} style={styles.arrowStyle}>
                  →
                </button>
              </div>

              {/* Dots */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 8,
                  marginTop: 18,
                }}
              >
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    style={{
                      width: i === activeIndex ? 22 : 8,
                      height: 8,
                      borderRadius: 999,
                      background:
                        i === activeIndex
                          ? "var(--sage)"
                          : "rgba(122,143,122,0.25)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="cta-wrap">
          <div className="container">
            <div className="cta">
              <div className="eyebrow">{t.ctaEyebrow}</div>
              <h2 className="cta-title serif">{t.ctaTitle}</h2>
              <p className="cta-text">{t.ctaText}</p>
              <div className="cta-actions">
                <a href="#" className="button-dark">
                  {t.bookOnline}
                </a>
                <a href="#" className="button-light">
                  {t.whatsappBooking}
                </a>
              </div>
            </div>
          </div>
        </section>

          </>
        )}

        <div className="wordmark serif">Aluna</div>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>{t.footer}</div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F4EFEA",
    color: "#2E3B35",
  },
  smallButton: {
    padding: "11px 20px",
    fontSize: "0.92rem",
  },
  sageEyebrow: {
    color: "#7A8F7A",
  },
  tightTopSection: {
    paddingTop: 0,
  },
  enfoqueSection: {
    paddingTop: 52,
  },
  tightAnchorSection: {
    paddingTop: 10,
  },
  shortSectionTop: {
    marginBottom: 30,
  },
  modalitiesTitle: {
    fontSize: "2.35rem",
    maxWidth: "none",
    marginTop: 0,
  },
  linkAccent: {
    color: "#4F6473",
    fontSize: "0.95rem",
    fontWeight: 600,
  },
  metaName: {
    color: "#4F6473",
    fontSize: "0.92rem",
    fontWeight: 600,
  },
  metaPlace: {
    color: "#6F7A74",
    fontSize: "0.78rem",
    marginTop: 3,
  },
  blogCardEyebrow: {
    color: "#7A8F7A",
    marginBottom: 10,
  },
  blogLink: {
    display: "inline-block",
    marginTop: 18,
    color: "#4F6473",
    fontSize: "0.92rem",
    fontWeight: 600,
  },
  arrowStyle: {
    width: 44,
    height: 44,
    borderRadius: "999px",
    background: "white",
    border: "1px solid rgba(79,100,115,0.12)",
    color: "var(--navy)",
    fontSize: "1.1rem",
    cursor: "pointer",
    boxShadow: "0 6px 14px rgba(79,100,115,0.08)",
    transition: "transform 0.18s ease",
  },
};
