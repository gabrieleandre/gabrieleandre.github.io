// Variáveis globais para galeria de fotos
const photos = [
    'imagens/1749574211502.jpg',
    'imagens/1749574211510.jpg',
    'imagens/1749574211518.jpg',
    'imagens/1749574211526.jpg',
    'imagens/1749574248976.jpg'
];

let currentPhotoIndex = 0;

// URLs da música
const SPOTIFY_TRACK_URL = "https://open.spotify.com/track/7325x5azZOlWkYL9EpnqW5";
const YOUTUBE_VIDEO_URL = "https://www.youtube.com/watch?v=aTto3pHHuraY";

// Função para rolagem suave entre seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função para abrir Spotify em nova aba
function openSpotifyInNewTab() {
    window.open(SPOTIFY_TRACK_URL, '_blank');
}

// Função para mostrar/esconder fallback do YouTube
function toggleYoutubeFallback() {
    const spotify = document.querySelector('.spotify-player');
    const youtube = document.getElementById('youtubeFallback');
    
    if (youtube.style.display === 'none') {
        spotify.style.display = 'none';
        youtube.style.display = 'block';
    } else {
        spotify.style.display = 'block';
        youtube.style.display = 'none';
    }
}

// Função para adicionar animações quando elementos entram na tela
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observar elementos que devem ser animados
    const elementsToAnimate = document.querySelectorAll('.romantic-text, .section-title, .final-message > *');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Função para abrir modal da foto
function openModal(src) {
    currentPhotoIndex = photos.indexOf(src);
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = src;
    modal.classList.add('active');
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
}

// Função para fechar modal
function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.classList.remove('active');
    
    // Restaurar scroll do body
    document.body.style.overflow = 'auto';
}

// Função para foto anterior
function previousImage(event) {
    event.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    document.getElementById('modalImage').src = photos[currentPhotoIndex];
}

// Função para próxima foto
function nextImage(event) {
    event.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    document.getElementById('modalImage').src = photos[currentPhotoIndex];
}

// Função para adicionar efeitos de partículas de coração
function createHeartParticles() {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'hearts-particles';
    heartsContainer.innerHTML = `
        <style>
            .hearts-particles {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 5;
            }
            
            .heart-particle {
                position: absolute;
                color: rgba(233, 30, 99, 0.7);
                font-size: 1rem;
                animation: heartFloat 8s linear infinite;
                pointer-events: none;
            }
            
            @keyframes heartFloat {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        </style>
    `;
    
    document.body.appendChild(heartsContainer);
    
    // Criar partículas periodicamente
    setInterval(() => {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart heart-particle';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 1 + 0.5) + 'rem';
        
        heartsContainer.appendChild(heart);
        
        // Remover após animação
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }, 2000);
}

// Adicionar estilos para animações de galeria
function addGalleryAnimations() {
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar animações de scroll
    addScrollAnimations();
    
    // Adicionar animações da galeria
    setTimeout(() => {
        addGalleryAnimations();
    }, 500);
    
    // Criar efeito de partículas de coração
    createHeartParticles();
      // Adicionar eventos de teclado
    document.addEventListener('keydown', function(e) {
        // Fechar modal com ESC
        if (e.key === 'Escape') {
            closeModal();
        }
        
        // Navegar fotos com setas
        const modal = document.getElementById('photoModal');
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                previousImage(e);
            } else if (e.key === 'ArrowRight') {
                nextImage(e);
            }
        }
    });
    
    // Mobile optimizations
    if (isMobileDevice()) {
        optimizeForMobile();
    }
    
    console.log('💕 Site do Dia dos Namorados carregado com galeria fixa! 📸');
});

// Função para detectar dispositivos móveis
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth <= 768;
}

// Otimizações específicas para mobile
function optimizeForMobile() {
    // Reduzir animações em dispositivos com baixa performance
    if (window.devicePixelRatio > 2) {
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
    }
    
    // Lazy loading melhorado para imagens
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.style.transition = 'opacity 0.3s ease';
        img.style.opacity = '0.8';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
    
    // Otimizar scroll em iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }
    
    // Prevenir zoom duplo toque em iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Adicionar gestos touch para navegação no modal
    addTouchGestures();
}

// Função para adicionar gestos touch
function addTouchGestures() {
    const modal = document.getElementById('photoModal');
    let startX = 0;
    let startY = 0;
    
    modal.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    modal.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Verificar se é um swipe horizontal
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - próxima foto
                nextImage(e);
            } else {
                // Swipe right - foto anterior
                previousImage(e);
            }
        }
        
        // Reset
        startX = 0;
        startY = 0;
    });
}

// Função melhorada para scroll suave (mobile-friendly)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = isMobileDevice() ? 10 : 20;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}
