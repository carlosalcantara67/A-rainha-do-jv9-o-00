// ===================================
// VARIÁVEIS GLOBAIS E CONFIGURAÇÕES
// ===================================
let currentChapter = 0;
const totalChapters = 6;
const chapters = [];
const navButtons = [];

// Configurações de animação
const config = {
    particlesCount: 50,
    heartsCount: 15,
    particleAnimationDuration: 6,
    heartAnimationDuration: 8,
    fadeInDuration: 800
};

// Emojis para corações flutuantes
const heartEmojis = ['💛', '💜', '✨', '⭐', '💫', '👑'];

// ===================================
// FUNÇÕES DE NAVEGAÇÃO
// ===================================

/**
 * Mostra um capítulo específico
 * @param {number} index - Índice do capítulo a ser exibido
 */
function showChapter(index) {
    // Validação do índice
    if (index < 0 || index >= totalChapters) return;

    // Remove a classe active de todos os capítulos
    chapters.forEach(chapter => {
        chapter.classList.remove('active');
    });

    // Adiciona a classe active ao capítulo selecionado
    chapters[index].classList.add('active');

    // Atualiza o estado dos botões de navegação
    navButtons.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });

    // Atualiza o capítulo atual
    currentChapter = index;
    updateNavigationButtons();
    updateProgressBar();

    // Scroll suave até o capítulo
    chapters[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // Atualiza o título da página
    updatePageTitle(index);
}

/**
 * Avança para o próximo capítulo
 */
function nextChapter() {
    if (currentChapter < totalChapters - 1) {
        showChapter(currentChapter + 1);
    }
}

/**
 * Volta para o capítulo anterior
 */
function prevChapter() {
    if (currentChapter > 0) {
        showChapter(currentChapter - 1);
    }
}

/**
 * Atualiza o estado dos botões de navegação (anterior/próximo)
 */
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) prevBtn.disabled = currentChapter === 0;
    if (nextBtn) nextBtn.disabled = currentChapter === totalChapters - 1;
}

/**
 * Atualiza a barra de progresso (se existir)
 */
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progress = ((currentChapter + 1) / totalChapters) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

/**
 * Atualiza o título da página baseado no capítulo atual
 */
function updatePageTitle(index) {
    const titles = [
        'A Rainha Solitária',
        'O Encontro no Jardim',
        'O Amor Verdadeiro',
        'O Pedido de Casamento',
        'O Bebê de Luz',
        'A Moral da História'
    ];
    
    document.title = `${titles[index]} - A Rainha de Jv9`;
}

// ===================================
// FUNÇÕES DE ANIMAÇÃO E EFEITOS VISUAIS
// ===================================

/**
 * Cria partículas douradas flutuantes no fundo
 */
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < config.particlesCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posição aleatória
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Delay e duração aleatórios para efeito natural
        particle.style.animationDelay = `${Math.random() * config.particleAnimationDuration}s`;
        particle.style.animationDuration = `${4 + Math.random() * 4}s`;
        
        // Tamanho variável
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        container.appendChild(particle);
    }
}

/**
 * Cria corações e emojis flutuantes no fundo
 */
function createHearts() {
    const container = document.getElementById('hearts');
    if (!container) return;

    for (let i = 0; i < config.heartsCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Posição horizontal aleatória
        heart.style.left = `${Math.random() * 100}%`;
        
        // Delay e duração aleatórios
        heart.style.animationDelay = `${Math.random() * config.heartAnimationDuration}s`;
        heart.style.animationDuration = `${6 + Math.random() * 4}s`;
        
        // Tamanho variável
        const size = 1 + Math.random() * 1.5;
        heart.style.fontSize = `${size}em`;
        
        container.appendChild(heart);
    }
}

/**
 * Cria efeito de digitação no título (opcional)
 */
function typewriterEffect() {
    const title = document.querySelector('.header h1');
    if (!title) return;

    title.style.opacity = '0';
    setTimeout(() => {
        title.style.transition = 'opacity 1.5s ease';
        title.style.opacity = '1';
    }, 300);
}

/**
 * Adiciona efeito de brilho ao passar o mouse nos capítulos
 */
function addHoverEffects() {
    chapters.forEach(chapter => {
        chapter.addEventListener('mouseenter', () => {
            chapter.style.transform = 'scale(1.02)';
            chapter.style.transition = 'transform 0.3s ease';
        });

        chapter.addEventListener('mouseleave', () => {
            chapter.style.transform = 'scale(1)';
        });
    });
}

// ===================================
// EVENT LISTENERS
// ===================================

/**
 * Configura navegação por teclado
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                nextChapter();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                prevChapter();
                break;
            case 'Home':
                e.preventDefault();
                showChapter(0);
                break;
            case 'End':
                e.preventDefault();
                showChapter(totalChapters - 1);
                break;
        }
    });
}

/**
 * Configura suporte a gestos de swipe em dispositivos móveis
 */
function setupSwipeNavigation() {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) < minSwipeDistance) return;

        if (swipeDistance > 0) {
            // Swipe para a direita - capítulo anterior
            prevChapter();
        } else {
            // Swipe para a esquerda - próximo capítulo
            nextChapter();
        }
    }
}

/**
 * Configura scroll suave para links internos
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Adiciona efeito parallax sutil ao scroll
 */
function setupParallaxEffect() {
    const particles = document.getElementById('particles');
    const hearts = document.getElementById('hearts');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        if (particles) {
            particles.style.transform = `translateY(${rate * 0.2}px)`;
        }
        if (hearts) {
            hearts.style.transform = `translateY(${rate * 0.3}px)`;
        }
    }, { passive: true });
}

/**
 * Configura animações de entrada dos elementos
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observa elementos com a classe 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===================================
// FUNÇÕES UTILITÁRIAS
// ===================================

/**
 * Gera um número aleatório entre min e max
 */
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Debounce para otimizar eventos de scroll/resize
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Verifica se o dispositivo é touch
 */
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

/**
 * Exibe mensagem de boas-vindas no console
 */
function showWelcomeMessage() {
    console.log('%c👑 A Rainha de Jv9 👑', 'color: gold; font-size: 24px; font-weight: bold;');
    console.log('%cUma história de amor, respeito e luz', 'color: #c9a0ff; font-size: 14px; font-style: italic;');
    console.log('%c✨ Desenvolvido com amor ✨', 'color: #ff69b4; font-size: 12px;');
}

// ===================================
// INICIALIZAÇÃO
// ===================================

/**
 * Função principal de inicialização
 */
function init() {
    // Cache de elementos DOM
    const chapterElements = document.querySelectorAll('.chapter');
    const navButtonElements = document.querySelectorAll('.nav-btn');

    // Converte NodeLists para Arrays
    chapters.push(...chapterElements);
    navButtons.push(...navButtonElements);

    // Cria efeitos visuais
    createParticles();
    createHearts();
    typewriterEffect();
    addHoverEffects();

    // Configura event listeners
    setupKeyboardNavigation();
    setupSwipeNavigation();
    setupSmoothScroll();
    setupParallaxEffect();
    setupScrollAnimations();

    // Atualiza estado inicial
    updateNavigationButtons();
    updateProgressBar();

    // Mostra mensagem de boas-vindas
    showWelcomeMessage();

    // Log de inicialização
    console.log(`%c✅ Aplicação inicializada com ${totalChapters} capítulos`, 'color: #00ff00;');
}

// ===================================
// EXECUÇÃO
// ===================================

// Aguarda o DOM estar completamente carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM já está carregado
    init();
}

// ===================================
// EXPORTAÇÕES (para uso em módulos, se necessário)
// ===================================

// Se estiver usando módulos ES6, descomente as linhas abaixo:
/*
export {
    showChapter,
    nextChapter,
    prevChapter,
    createParticles,
    createHearts
};
*/
