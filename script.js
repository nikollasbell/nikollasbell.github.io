// Elementos DOM
const musicNotes = document.querySelector('.music-notes');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const adminLoginBtn = document.getElementById('admin-login-btn');
const adminLoginModal = document.getElementById('adminLoginModal');
const adminPanel = document.getElementById('adminPanel');
const eventDetailsModal = document.getElementById('eventDetailsModal');
const closeButtons = document.querySelectorAll('.close');
const contactForm = document.getElementById('contactForm');

// Dados iniciais (serão substituídos pelos dados do localStorage se existirem)
let heroData = {
    backgroundImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    logoUrl: ''
};

let membersData = [
    {
        id: 'member1',
        name: 'Ana Clara',
        role: 'Vocalista',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        bio: 'Vocalista principal com uma voz poderosa e presença de palco magnética.'
    },
    {
        id: 'member2',
        name: 'Ricardo',
        role: 'Guitarrista',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        bio: 'Guitarrista virtuoso com mais de 15 anos de experiência em bandas de rock.'
    },
    {
        id: 'member3',
        name: 'Juliana',
        role: 'Baixista',
        photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        bio: 'Baixista talentosa que traz o groove e a energia para a banda.'
    },
    {
        id: 'member4',
        name: 'Pedro',
        role: 'Baterista',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        bio: 'Baterista preciso e criativo, responsável pelo ritmo contagiante da Condessa.'
    }
];

let eventsData = [
    {
        id: 'event1',
        title: 'Show de Lançamento',
        date: '2023-12-15',
        time: '21:00',
        location: 'Teatro Municipal - São Paulo',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Show de lançamento do nosso novo álbum "Noites Douradas". Uma noite inesquecível com participações especiais e muitas surpresas!',
        ticketLink: 'https://exemplo.com/ingressos'
    },
    {
        id: 'event2',
        title: 'Festival de Verão',
        date: '2024-01-20',
        time: '19:30',
        location: 'Praia de Copacabana - Rio de Janeiro',
        image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Participação especial no maior festival de verão do Brasil. Venha curtir os maiores sucessos da Condessa à beira-mar!',
        ticketLink: 'https://exemplo.com/festival-verao'
    },
    {
        id: 'event3',
        title: 'Turnê Nacional',
        date: '2024-02-10',
        time: '20:00',
        location: 'Arena BH - Belo Horizonte',
        image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Primeira parada da nossa turnê nacional "Condessa pelo Brasil". Um show completo com repertório especial e cenografia incrível!',
        ticketLink: 'https://exemplo.com/turne-bh'
    }
];

let galleryData = [
    {
        id: 'img1',
        url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        caption: 'Show em São Paulo - 2022'
    },
    {
        id: 'img2',
        url: 'https://images.unsplash.com/photo-1574161340222-f0526f26f6f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        caption: 'Bastidores da gravação do álbum'
    },
    {
        id: 'img3',
        url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        caption: 'Festival de Música - 2023'
    },
    {
        id: 'img4',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        caption: 'Ensaio fotográfico para revista'
    },
    {
        id: 'img5',
        url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        caption: 'Show de abertura - Turnê 2022'
    },
    {
        id: 'img6',
        url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        caption: 'Público no show de lançamento'
    }
];

// Credenciais de admin (em produção, isso seria feito de forma mais segura)
const adminCredentials = {
    username: 'condessa',
    password: 'Filomen@2024'
};

// Carregar dados do localStorage
function loadData() {
    if (localStorage.getItem('heroData')) {
        heroData = JSON.parse(localStorage.getItem('heroData'));
        updateHeroSection();
    }
    
    if (localStorage.getItem('membersData')) {
        membersData = JSON.parse(localStorage.getItem('membersData'));
    }
    
    if (localStorage.getItem('eventsData')) {
        eventsData = JSON.parse(localStorage.getItem('eventsData'));
    }
    
    if (localStorage.getItem('galleryData')) {
        galleryData = JSON.parse(localStorage.getItem('galleryData'));
    }
    
    renderMembers();
    renderEvents();
    renderGallery();
}

// Atualizar a seção Hero com os dados salvos
function updateHeroSection() {
    const heroSection = document.getElementById('home');
    if (heroData.backgroundImage) {
        heroSection.style.backgroundImage = `url('${heroData.backgroundImage}')`;
    }
    
    if (heroData.logoUrl) {
        // Se houver uma logo, substituir o título por ela
        const bandName = document.querySelector('.band-name');
        if (bandName) {
            bandName.innerHTML = `<img src="${heroData.logoUrl}" alt="Condessa Logo" class="band-logo">`;
        }
    }
}

// Renderizar os integrantes da banda
function renderMembers() {
    const membersContainer = document.querySelector('.members-container');
    if (!membersContainer) return;
    
    membersContainer.innerHTML = '';
    
    membersData.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        memberCard.innerHTML = `
            <div class="member-photo">
                <img src="${member.photo}" alt="${member.name}">
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p>${member.role}</p>
                <p class="member-bio">${member.bio}</p>
            </div>
        `;
        
        membersContainer.appendChild(memberCard);
    });
}

// Renderizar os eventos da agenda
function renderEvents() {
    const eventsContainer = document.querySelector('.events-container');
    if (!eventsContainer) return;
    
    eventsContainer.innerHTML = '';
    
    // Ordenar eventos por data (mais próximos primeiro)
    const sortedEvents = [...eventsData].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sortedEvents.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.style.animationDelay = `${index * 0.1}s`;
        
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        
        eventCard.innerHTML = `
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
            </div>
            <div class="event-info">
                <div class="event-date">
                    <i class="fas fa-calendar"></i> ${formattedDate} - ${event.time}
                </div>
                <h3>${event.title}</h3>
                <div class="event-location">
                    <i class="fas fa-map-marker-alt"></i> ${event.location}
                </div>
                <button class="btn btn-primary view-event-details" data-event-id="${event.id}">Ver Detalhes</button>
            </div>
        `;
        
        eventsContainer.appendChild(eventCard);
    });
    
    // Adicionar event listeners para os botões de detalhes
    document.querySelectorAll('.view-event-details').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            showEventDetails(eventId);
        });
    });
}

// Mostrar detalhes do evento em um modal
function showEventDetails(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;
    
    const eventDetailsContent = document.getElementById('eventDetailsContent');
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    
    eventDetailsContent.innerHTML = `
        <div class="event-details-content">
            <div class="event-details-image">
                <img src="${event.image}" alt="${event.title}">
            </div>
            <div class="event-details-info">
                <h2>${event.title}</h2>
                <div class="event-details-meta">
                    <p><i class="fas fa-calendar"></i> ${formattedDate}</p>
                    <p><i class="fas fa-clock"></i> ${event.time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                </div>
                <div class="event-details-description">
                    ${event.description}
                </div>
                ${event.ticketLink ? `<a href="${event.ticketLink}" target="_blank" class="btn btn-primary">Comprar Ingressos</a>` : ''}
            </div>
        </div>
    `;
    
    eventDetailsModal.style.display = 'block';
}

// Renderizar a galeria de fotos
function renderGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    galleryContainer.innerHTML = '';
    
    galleryData.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.url}" alt="${item.caption || 'Foto da banda'}">
            ${item.caption ? `<div class="gallery-caption">${item.caption}</div>` : ''}
        `;
        
        galleryContainer.appendChild(galleryItem);
    });
}

// Criar notas musicais animadas
function createMusicNotes() {
    const notes = ['♪', '♫', '𝄞', '𝅘𝅥𝅮', '𝅘𝅥𝅯'];
    const notesCount = 20;
    
    for (let i = 0; i < notesCount; i++) {
        const note = document.createElement('div');
        note.className = 'music-note';
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.left = `${Math.random() * 100}%`;
        note.style.animationDuration = `${15 + Math.random() * 10}s`;
        note.style.animationDelay = `${Math.random() * 5}s`;
        note.style.fontSize = `${Math.random() * 20 + 10}px`;
        musicNotes.appendChild(note);
    }
}

// Efeito de movimento das notas musicais com o mouse
function initMouseEffect() {
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.music-note').forEach(note => {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            note.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Inicializar o menu mobile
function initMobileMenu() {
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Fechar o menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Inicializar os modais
function initModals() {
    // Abrir modal de login admin
    adminLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        adminLoginModal.style.display = 'block';
    });
    
    // Fechar modais ao clicar no X
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Fechar modais ao clicar fora deles
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Login de admin
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        
        if (username === adminCredentials.username && password === adminCredentials.password) {
            adminLoginModal.style.display = 'none';
            adminPanel.style.display = 'block';
            initAdminPanel();
        } else {
            alert('Credenciais inválidas!');
        }
    });
}

// Inicializar o formulário de contato
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você adicionaria o código para enviar o formulário
        // Como é apenas um exemplo, vamos apenas mostrar uma mensagem
        alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
        this.reset();
    });
}

// Inicializar efeitos de scroll
function initScrollEffects() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}

// Inicializar o site
function init() {
    loadData();
    createMusicNotes();
    initMouseEffect();
    initMobileMenu();
    initModals();
    initContactForm();
    initScrollEffects();
}

// Iniciar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);

// Adicionar classe CSS para animação de fade-in
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .section-hidden {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .fade-in {
            animation: fadeInUp 1s forwards;
        }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
`);
