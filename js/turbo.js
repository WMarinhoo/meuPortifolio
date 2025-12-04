// CAIXA DE MENSAGEM ENVIAR DIRETO PARA WHATSAPP
function enviarWhats(event) {
    event.preventDefault()

    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    const telefone = '5521998015316'
    const texto = `Olá, Me chamo ${nome}, ${mensagem}`
    const msgFormatada = encodeURIComponent(texto)
    const url = `https://whatsa.me/${telefone}/?t=${msgFormatada}`

    console.log(url)

    window.open(url, '_blank')
}



// CARROSSEL AUTOMÁTICO + SETINHAS
document.querySelectorAll('.projetos-card').forEach(card => {
    const carousel = card.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = card.querySelector('.prev-btn');
    const nextBtn = card.querySelector('.next-btn');
    let currentIndex = 0;
    let autoPlayInterval;

    // Função para ir para um índice específico
    function goToIndex(index) {
        carousel.scrollTo({
            left: items[index].offsetLeft - carousel.offsetLeft,
            behavior: 'smooth'
        });
        currentIndex = index;
    }

    // Próxima foto
    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        goToIndex(currentIndex);
    }

    // Foto anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        goToIndex(currentIndex);
    }

    // Autoplay a cada 4 segundos
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Eventos das setinhas
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay(); // reinicia o timer
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    // Pausa o autoplay quando o mouse está em cima
    card.addEventListener('mouseenter', stopAutoPlay);
    card.addEventListener('mouseleave', startAutoPlay);

    // Inicia o autoplay
    startAutoPlay();
});



// CONTADORES ANIMADOS (só rodam quando aparecem na tela)
const counters = document.querySelectorAll('.counter');
const speed = 95; // velocidade da animação (quanto menor, mais rápido)

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 30);
        } else {
            counter.innerText = target;
        }
    });
};

// Só anima quando a seção entrar na tela
const statsSection = document.querySelector('.stats-section');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounters();
        observer.unobserve(statsSection); // roda só uma vez
    }
}, { threshold: 0.5 });

observer.observe(statsSection);

AOS.init({
    duration: 1000,    // duração da animação
    once: true,        // anima só uma vez (melhor performance)
    offset: 100        // começa um pouco antes de entrar na tela
});


// MODO CLARO/ESCURO
const themeSwitch = document.getElementById('theme-switch');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('light-theme');
    const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
});

// PARTÍCULAS ANIMADAS COM TSPARTICLES (fundo vivo!)
tsParticles.load("tsparticles", {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ["#4f46e5", "#7c3aed", "#a78bfa"] },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            outModes: "out"
        },
        links: {
            enable: true,
            distance: 150,
            color: "#4f46e5",
            opacity: 0.3,
            width: 1
        }
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true
        }
    },
    detectRetina: true
});



// CURSOR PERSONALIZADO ROXO BRILHANTE
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .projetos-card, .toggle-label').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});


// CONTADOR DE VISITANTES (CountAPI - grátis e sem cadastro)
fetch('https://api.countapi.xyz/hit/wendelmarinho-portfolio/visitas')
    .then(res => res.json())
    .then(data => {
        document.getElementById('visit-count').textContent = data.value.toLocaleString('pt-BR');
    })
    .catch(() => {
        document.getElementById('visit-count').textContent = 'muitas';
    });
