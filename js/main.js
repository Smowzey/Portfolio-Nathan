/**
 * Portfolio - JavaScript Principal
 * Vanilla JS / Sans dépendances
 */

/* ==========================================================================
   0. GOOGLE TAG MANAGER
   --------------------------------------------------------------------------
   GTM est désormais chargé uniquement après consentement de l'utilisateur.
   Voir js/cookies.js (bandeau de consentement RGPD).
   ========================================================================== */

/* ==========================================================================
   1. LOADER (Sécurisé et indépendant)
   ========================================================================== */
const loader = document.getElementById('loader');
let loaderHidden = false;

const hideLoader = () => {
    if(loader && !loaderHidden) {
        loaderHidden = true;
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
};

window.addEventListener('load', hideLoader);
// Sécurité anti-blocage : force l'affichage du site au bout de 1.5s quoi qu'il arrive
setTimeout(hideLoader, 1500);

window.addEventListener('pageshow', (event) => {
    if (event.persisted) hideLoader(); // Sécurité bouton "retour" du navigateur
});

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       0. THEME TOGGLE (CLAIR / SOMBRE)
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    try {
        // Vérifie s'il y a un thème sauvegardé dans le navigateur
        const savedTheme = localStorage.getItem('portfolio_theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeIcon) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        }
    } catch (e) {
        console.warn("LocalStorage bloqué par le navigateur, thème par défaut appliqué.");
    }

    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            try {
                if (isDark) {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                    localStorage.setItem('portfolio_theme', 'dark');
                } else {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                    localStorage.setItem('portfolio_theme', 'light');
                }
            } catch(e) {}
        });
    }

    /* ==========================================================================
       2. NAVIGATION & MENU MOBILE
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Effet scroll sur la navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Menu Mobile
    if(hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // Fermeture du menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Mise en évidence du lien actif au scroll
    const sections = document.querySelectorAll('section[id]');
    const scrollActive = () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href*=${sectionId}]`);
            
            if(link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    };
    window.addEventListener('scroll', scrollActive);

    /* ==========================================================================
       3. TYPEWRITER EFFECT
       ========================================================================== */
    const typewriterElement = document.getElementById('typewriter');
    const phrases = ['Développeur Web', 'Créateur de sites sur mesure', 'Passionné Digital'];
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        if(!typewriterElement) return;
        
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && letterIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause à la fin du mot
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause avant de commencer le prochain mot
        }

        setTimeout(typeWriter, typeSpeed);
    }
    
    // Démarrer après le loader
    setTimeout(typeWriter, 1200);

    /* ==========================================================================
       4. DATA & RENDU PORTFOLIO
       ========================================================================== */
    const projects = [
        {
            title: "Silicon-ioi",
            category: "Site Web",
            img: "images/silicon-ioi.webp",
            desc: "Améliorations de l'interface web réalisée lors de mon alternance chez Brainstorming.",
            tags: ["HTML", "CSS", "JS"],
            link: "https://silicon-ioi.online/fr",
            github: ""
        },
        {
            title: "HC Sprimont",
            category: "Site Web",
            img: "images/HandballSprimont.webp",
            desc: "Refonte complète du site du club pour centraliser les informations. Résultat : une navigation simplifiée pour les sportifs et une visibilité accrue pour les sponsors locaux.",
            tags: ["HTML", "CSS", "JS"],
            link: "https://smowzey.github.io/HC-Sprimont-Site/",
            github: "https://github.com/Smowzey/HC-Sprimont-Site"
        },
        {
            title: "Atelier Minéral — Concept Créatif",
            category: "Site Web",
            img: "images/atelier-mineral.webp",
            desc: "Une immersion digitale ultra-premium en Dark Mode conçue pour le secteur de la beauté et du bien-être de luxe. Note : vitrine technologique fictive réalisée pour illustrer mes compétences en motion design et UI/UX haut de gamme — il ne s'agit pas d'un site client actif.",
            tags: ["HTML", "CSS", "JS", "Motion"],
            link: "https://smowzey.github.io/Atelier-Min-ral./",
            github: ""
        }
    ];

    const portfolioGrid = document.getElementById('portfolio-grid');
    
    function renderProjects(category = "all") {
        if(!portfolioGrid) return;
        
        portfolioGrid.innerHTML = '';
        const filteredProjects = category === "all" ? projects : projects.filter(p => p.category === category);
        
        filteredProjects.forEach((project, index) => {
            const tagsHtml = project.tags.map(tag => `<span>${tag}</span>`).join('');
            const card = document.createElement('article'); // Balise sémantique pour l'IA
            card.className = 'card reveal'; // Apparaît de manière invisible en premier
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${project.img}" alt="${project.title}" class="card-img" loading="lazy" width="600" height="337">
                    <div class="card-overlay">
                        <a href="${project.link}" class="btn-icon" target="_blank" aria-label="Voir le site"><i class="fa-solid fa-link"></i></a>
                        ${project.github ? `<a href="${project.github}" class="btn-icon" target="_blank" aria-label="Voir le code"><i class="fa-brands fa-github"></i></a>` : ''}
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-desc">${project.desc}</p>
                    <div class="card-tags">${tagsHtml}</div>
                </div>
            `;
            portfolioGrid.appendChild(card);

            // Ajoute un effet d'apparition en cascade (stagger) de 100ms entre chaque carte
            setTimeout(() => {
                card.classList.add('active');
            }, 50 + (index * 100));
        });
    }

    // Rendu initial
    renderProjects();

    // Filtrage
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.getAttribute('data-filter'));
        });
    });

    /* ==========================================================================
       5.5 FAQ ACCORDÉON
       ========================================================================== */
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.parentElement.classList.toggle('active');
        });
    });

    /* ==========================================================================
       6. ANIMATIONS AU SCROLL (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       7. FORMULAIRE DE CONTACT
       ========================================================================== */
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');

    // Pré-sélection du sujet en fonction de la formule cliquée
    const formulaBtns = document.querySelectorAll('.formula-btn');
    const subjectSelect = document.getElementById('subject');
    
    formulaBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if(subjectSelect) {
                subjectSelect.value = btn.getAttribute('data-formula');
            }
        });
    });

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // État de chargement
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            formMessage.textContent = '';
            formMessage.className = 'form-message';

            // Concatène les add-ons cochés dans un champ caché lisible
            const checkedAddons = Array.from(form.querySelectorAll('input[name="addons"]:checked'))
                .map(cb => cb.value);
            let addonsField = form.querySelector('input[name="addons_list"]');
            if (!addonsField) {
                addonsField = document.createElement('input');
                addonsField.type = 'hidden';
                addonsField.name = 'addons_list';
                form.appendChild(addonsField);
            }
            addonsField.value = checkedAddons.length ? checkedAddons.join(', ') : 'Aucune';

            // Envoi via EmailJS
            emailjs.sendForm('service_epdns9u', 'template_tc6cpnk', form)
                .then(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    formMessage.textContent = 'Votre message a bien été envoyé !';
                    formMessage.classList.add('success');
                    form.reset();
                    
                    setTimeout(() => formMessage.textContent = '', 5000);
                }, (error) => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    formMessage.textContent = "Erreur lors de l'envoi : " + (error.text || "Veuillez réessayer.");
                    formMessage.classList.add('error');
                });
        });
    }

    /* ==========================================================================
       8. BACK TO TOP BUTTON
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');
    
    if(backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mise à jour de l'année copyright
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    /* ==========================================================================
       9. CUSTOM CURSOR
       ========================================================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    let cursorVisible = false;

    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!cursorVisible) {
                cursorDot.style.opacity = 1;
                cursorOutline.style.opacity = 1;
                cursorVisible = true;
            }

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Lerp fluide pour l'anneau extérieur
        const tick = () => {
            outlineX += (mouseX - outlineX) * 0.18;
            outlineY += (mouseY - outlineY) * 0.18;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);

        // Effet au survol des éléments cliquables avec délégation d'événements
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, input, textarea')) {
                cursorOutline.classList.add('hover');
                cursorDot.classList.add('hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button, input, textarea')) {
                cursorOutline.classList.remove('hover');
                cursorDot.classList.remove('hover');
            }
        });
    }

    /* ==========================================================================
       10. FORMULAIRE D'ANALYSE (Analyse.html)
       ========================================================================== */
    const scanForm = document.getElementById('scan-form');
    const formContainer = document.getElementById('form-container');
    const loadingContainer = document.getElementById('loading-container');
    const resultContainer = document.getElementById('result-container');
    const resultDiagnostic = document.getElementById('result-diagnostic');
    const resultVerdict = document.getElementById('result-verdict');
    const resetBtn = document.getElementById('reset-btn');
    const alreadyAnalyzedMsg = document.getElementById('already-analyzed-msg');

    if (scanForm) {
        if (localStorage.getItem('hasAnalyzed') === 'true') {
            formContainer.style.display = 'none';
            if (alreadyAnalyzedMsg) alreadyAnalyzedMsg.style.display = 'block';
        }

        // Fonction pour injecter Chart.js uniquement si nécessaire
        const loadChartJS = () => {
            return new Promise((resolve) => {
                if (window.Chart) return resolve();
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js';
                script.onload = resolve;
                document.head.appendChild(script);
            });
        };

        scanForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const scanUrl = document.getElementById('scan-url').value;
            const scanEmail = document.getElementById('scan-email').value;

            formContainer.style.display = 'none';
            resultContainer.style.display = 'none';
            loadingContainer.style.display = 'block';

            try {
                // Remplacez l'URL ci-dessous par l'URL fournie par Render (n'oubliez pas de garder le /scan à la fin)
                const response = await fetch('https://analyse-vx7l.onrender.com/scan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: scanUrl, email: scanEmail })
                });

                if (!response.ok) {
                    let errorDetail = `Erreur réseau (${response.status})`;
                    try {
                        const errorData = await response.json();
                        if (errorData.detail) errorDetail = errorData.detail;
                    } catch (e) {}
                    throw new Error(errorDetail);
                }

                const data = await response.json();

                loadingContainer.style.display = 'none';
                resultContainer.style.display = 'block';

                // Animation d'apparition fluide
                setTimeout(() => resultContainer.classList.add('active'), 50);

                resultDiagnostic.textContent = data.diagnostic || '';
                resultVerdict.textContent = data.verdict || '';
                
                // --- Affichage du Graphique PageSpeed ---
                await loadChartJS();
                
                let chartContainer = document.getElementById('pagespeed-chart-container');
                if (!chartContainer) {
                    chartContainer = document.createElement('div');
                    chartContainer.id = 'pagespeed-chart-container';
                    chartContainer.style.maxWidth = '450px';
                    chartContainer.style.margin = '40px auto 10px';
                    chartContainer.style.position = 'relative';
                    chartContainer.innerHTML = '<h3 style="text-align:center; font-size:1.1rem; margin-bottom:15px;">Scores Techniques (Google)</h3><canvas id="pagespeed-chart"></canvas>';
                    resultContainer.appendChild(chartContainer);
                }

                const ctx = document.getElementById('pagespeed-chart').getContext('2d');
                if (window.pageSpeedChart) window.pageSpeedChart.destroy();

                const scores = data.pagespeed || { performance: 0, seo: 0, accessibility: 0 };
                console.log("Scores Google PageSpeed reçus :", scores);
                
                window.pageSpeedChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Performance', 'SEO', 'Accessibilité'],
                        datasets: [{
                            label: 'Score / 100',
                            data: [scores.performance, scores.seo, scores.accessibility],
                            backgroundColor: [
                                scores.performance >= 90 ? '#10b981' : (scores.performance >= 50 ? '#f59e0b' : '#ef4444'),
                                scores.seo >= 90 ? '#10b981' : (scores.seo >= 50 ? '#f59e0b' : '#ef4444'),
                                scores.accessibility >= 90 ? '#10b981' : (scores.accessibility >= 50 ? '#f59e0b' : '#ef4444')
                            ],
                            borderRadius: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        layout: {
                            padding: { top: 30 }
                        },
                        scales: { y: { beginAtZero: true, max: 100 } },
                        plugins: { legend: { display: false } }
                    },
                    plugins: [{
                        id: 'drawScoresOnBars',
                        afterDatasetsDraw(chart) {
                            const { ctx, data } = chart;
                            ctx.save();
                            chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
                                const value = data.datasets[0].data[index];
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                ctx.font = 'bold 13px sans-serif';
                                const isDark = document.body.classList.contains('dark-theme');
                                ctx.fillStyle = isDark ? '#ffffff' : '#333333';
                                const texteScore = value > 0 ? value + ' / 100' : '0 (Échec)';
                                ctx.fillText(texteScore, datapoint.x, datapoint.y - 8);
                            });
                            ctx.restore();
                        }
                    }]
                });

                // Avertissement si l'API Google PageSpeed a échoué (scores à 0 non représentatifs)
                let psNotice = document.getElementById('pagespeed-notice');
                if (scores.error) {
                    if (!psNotice) {
                        psNotice = document.createElement('p');
                        psNotice.id = 'pagespeed-notice';
                        psNotice.style.cssText = 'text-align:center; font-size:0.85rem; color:#b45309; background:#fef3c7; border-radius:6px; padding:8px 12px; max-width:450px; margin:0 auto 10px;';
                        chartContainer.appendChild(psNotice);
                    }
                    psNotice.textContent = '⚠ ' + scores.error + ' Les scores techniques ci-dessus ne sont pas représentatifs.';
                    psNotice.style.display = 'block';
                } else if (psNotice) {
                    psNotice.style.display = 'none';
                }

                localStorage.setItem('hasAnalyzed', 'true');
                if (resetBtn) resetBtn.style.display = 'none';
                
                // Envoi silencieux d'un email pour vous prévenir du nouveau prospect !
                if (typeof emailjs !== 'undefined') {
                    emailjs.send('service_epdns9u', 'template_tc6cpnk', {
                        name: "Nouveau Lead (Scanner)",
                        email: scanEmail,
                        subject: "Nouvelle analyse : " + scanUrl,
                        message: `L'IA a donné le verdict : ${data.verdict} / ${data.diagnostic}`
                    });
                }

            } catch (error) {
                console.error("Erreur lors de l'analyse:", error);
                loadingContainer.style.display = 'none';
                resultContainer.style.display = 'block';
                resultDiagnostic.textContent = "Une erreur est survenue : " + error.message;
                resultVerdict.textContent = "Erreur";
            }
        });
    }
});