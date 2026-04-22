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
      testimonials: "Testimonios",
      contact: "Contacto",
    },
    reserve: "Reservar",
    heroEyebrow: "Aluna Bienestar Integral · Cartagena",
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
    processEyebrow: "El proceso",
    processTitle: "Tu proceso de recuperación",
    steps: [
      { title: "Consulta", text: "Formulario y revisión previa." },
      { title: "Sesión", text: "Tratamiento de 60-90 min personalizado." },
      { title: "Seguimiento", text: "Guía simple para mantener resultados." },
    ],
    ctaEyebrow: "Reserva",
    ctaTitle: "Comienza tu recuperación",
    bookSession: "Reservar sesión",
    footer: "© 2026 Aluna Bienestar Integral. International Standards.",
    posts: {},
  },
  en: {
    nav: {
      philosophy: "Philosophy",
      treatments: "Treatments",
      blog: "Blog",
      testimonials: "Reviews",
      contact: "Contact",
    },
    reserve: "Book",
    heroEyebrow: "Aluna Integral Wellness · Cartagena",
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
    processEyebrow: "The process",
    processTitle: "Your recovery process",
    steps: [
      { title: "Consultation", text: "Form and initial review." },
      { title: "Session", text: "Personalized 60-90 min treatment." },
      { title: "Follow-up", text: "Simple guidance to maintain results." },
    ],
    ctaEyebrow: "Booking",
    ctaTitle: "Start your recovery",
    bookSession: "Book session",
    footer: "© 2026 Aluna Integral Wellness. International Standards.",
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
      testimonials: "Avis",
      contact: "Contact",
    },
    reserve: "Réserver",
    heroEyebrow: "Aluna Bien-être Intégral · Cartagena",
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
    processEyebrow: "Le processus",
    processTitle: "Votre processus de récupération",
    steps: [
      { title: "Consultation", text: "Formulaire et revue initiale." },
      { title: "Séance", text: "Traitement personnalisé de 60 à 90 min." },
      { title: "Suivi", text: "Conseils simples pour maintenir les résultats." },
    ],
    ctaEyebrow: "Réservation",
    ctaTitle: "Commencez votre récupération",
    bookSession: "Réserver une séance",
    footer: "© 2026 Aluna Bien-être Intégral. International Standards.",
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

export default function App() {
  const pathLanguage = window.location.pathname.match(/^\/(en|fr)(?=\/|$)/)?.[1];
  const initialLanguage = pathLanguage || "es";
  const [language, setLanguage] = useState(initialLanguage);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const t = translations[language];
  const nav = [
    { id: "philosophy", href: "#enfoque" },
    { id: "treatments", href: "#tratamientos" },
    { id: "blog", href: "#blog" },
    { id: "testimonials", href: "#testimonios" },
    { id: "contact", href: "#contacto" },
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
  const steps = t.steps;
  const testimonials = t.testimonials;

  const [activeIndex, setActiveIndex] = useState(0);
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
          gap: 24px;
        }

        .brand {
          font-size: 1.7rem;
          color: var(--sage);
          white-space: nowrap;
          letter-spacing: -0.03em;
        }

        .nav {
          display: flex;
          gap: 34px;
          color: var(--navy);
          font-size: 0.95rem;
          font-weight: 500;
        }

        .nav a:hover, .brand:hover { opacity: 0.82; }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .language-menu {
          position: relative;
        }

        .language-trigger {
          min-width: 68px;
          height: 42px;
          border: 1px solid rgba(79, 100, 115, 0.12);
          border-radius: 999px;
          background: transparent;
          color: var(--navy);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font: inherit;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: none;
          text-transform: uppercase;
        }

        .language-trigger:hover {
          background: rgba(255,255,255,0.62);
        }

        .language-panel {
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
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

        .language-chevron {
          font-size: 0.78rem;
          line-height: 1;
          opacity: 0.72;
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

        .button-dark:hover, .button-light:hover, .social-btn:hover, .card:hover, .modality:hover, .step:hover {
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

        .feature-grid, .step-grid, .modality-grid {
          display: grid;
          gap: 24px;
        }

        .feature-grid, .step-grid, .modality-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .card, .step {
          background: rgba(255,255,255,0.82);
          border: 1px solid var(--card-border);
          border-radius: 28px;
          padding: 30px;
          box-shadow: var(--shadow-soft);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .symbol {
          width: 46px;
          height: 46px;
          border-radius: 16px;
          background: rgba(168, 184, 162, 0.18);
          color: var(--navy);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }

        .card h3, .step h3, .modality h3 {
          margin: 18px 0 0;
          font-size: 1.05rem;
          color: var(--navy);
        }

        .card p, .step p {
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

        .process-title {
          text-align: center;
          margin-bottom: 42px;
        }

        .process-title .section-title {
          margin-left: auto;
          margin-right: auto;
          max-width: 620px;
          font-size: 2.55rem;
        }

        .step-number {
          font-size: 1.55rem;
          color: var(--blush);
          letter-spacing: -0.04em;
          font-weight: 600;
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

        .socials {
          display: flex;
          gap: 12px;
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
          .feature-grid,
          .step-grid,
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
            <a
              href={`${navPrefix}#contacto`}
              className="button-dark"
              style={styles.smallButton}
            >
              {t.reserve}
            </a>

            <div className="language-menu">
              <button
                type="button"
                className="language-trigger"
                onClick={() => setIsLanguageOpen((isOpen) => !isOpen)}
                aria-label="Select language"
                aria-expanded={isLanguageOpen}
              >
                <span className="language-flag">{languages[language].flag}</span>
                {languages[language].label}
                <span className="language-chevron">⌄</span>
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
          </div>
        </div>
      </header>

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
              {features.map((feature) => (
                <div key={feature.title} className="card">
                  <div className="symbol">{feature.symbol}</div>
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

        <section className="section">
          <div className="container">
            <div className="process-title">
              <div className="eyebrow" style={styles.sageEyebrow}>
                {t.processEyebrow}
              </div>
              <h2 className="section-title serif">
                {t.processTitle}
              </h2>
            </div>

            <div className="step-grid">
              {steps.map((step, index) => (
                <div key={step.title} className="step">
                  <div className="step-number">0{index + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="cta-wrap">
          <div className="container">
            <div className="cta">
              <div className="eyebrow">{t.ctaEyebrow}</div>
              <h2 className="cta-title serif">{t.ctaTitle}</h2>
              <div style={{ marginTop: 30 }}>
                <a href="#" className="button-dark">
                  {t.bookSession}
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

          <div className="socials">
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
            <a
              href="https://www.linkedin.com/in/katy-fernandez-ojeda-6356b9211/"
              className="social-btn"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5.8 10h3v8.5h-3V10Zm1.5-4.2a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4ZM11 10h2.8v1.2c.5-.8 1.4-1.5 2.9-1.5 2.1 0 3.5 1.4 3.5 4.2v4.6h-3v-4.2c0-1.2-.4-1.9-1.5-1.9-.9 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8v4.1h-3V10Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
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
