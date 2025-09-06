// Elementos DOM do painel administrativo
const adminTabs = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

// Formulários de edição
const heroForm = document.getElementById('heroForm');
const memberEditForm = document.getElementById('memberEditForm');
const eventEditForm = document.getElementById('eventEditForm');
const imageEditForm = document.getElementById('imageEditForm');

// Botões de adicionar
const addMemberBtn = document.getElementById('addMemberBtn');
const addEventBtn = document.getElementById('addEventBtn');
const addImageBtn = document.getElementById('addImageBtn');

// Botões de cancelar
const cancelMemberBtn = document.getElementById('cancelMemberBtn');
const cancelEventBtn = document.getElementById('cancelEventBtn');
const cancelImageBtn = document.getElementById('cancelImageBtn');

// Containers de formulários
const memberForm = document.getElementById('memberForm');
const eventForm = document.getElementById('eventForm');
const imageForm = document.getElementById('imageForm');

// Listas de itens
const membersList = document.getElementById('membersList');
const eventsList = document.getElementById('eventsList');
const galleryList = document.getElementById('galleryList');

// Inicializar o painel administrativo
function initAdminPanel() {
    // Carregar dados atuais nos formulários
    loadHeroData();
    renderAdminMembersList();
    renderAdminEventsList();
    renderAdminGalleryList();
    
    // Configurar as abas
    setupTabs();
    
    // Configurar os formulários
    setupHeroForm();
    setupMemberForm();
    setupEventForm();
    setupGalleryForm();
}

// Configurar as abas do painel administrativo
function setupTabs() {
    adminTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover classe active de todas as abas
            adminTabs.forEach(t => t.classList.remove('active'));
            
            // Adicionar classe active à aba clicada
            this.classList.add('active');
            
            // Esconder todos os painéis de conteúdo
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Mostrar o painel correspondente à aba clicada
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Carregar dados da seção Hero no formulário
function loadHeroData() {
    document.getElementById('heroBackground').value = heroData.backgroundImage || '';
    document.getElementById('bandLogo').value = heroData.logoUrl || '';
}

// Configurar o formulário de edição da seção Hero
function setupHeroForm() {
    heroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const backgroundImage = document.getElementById('heroBackground').value;
        const logoUrl = document.getElementById('bandLogo').value;
        
        heroData = {
            backgroundImage,
            logoUrl
        };
        
        // Salvar no localStorage
        localStorage.setItem('heroData', JSON.stringify(heroData));
        
        // Atualizar a seção Hero
        updateHeroSection();
        
        alert('Seção de título/logo atualizada com sucesso!');
    });
}

// Renderizar a lista de integrantes no painel administrativo
function renderAdminMembersList() {
    if (!membersList) return;
    
    membersList.innerHTML = '';
    
    membersData.forEach(member => {
        const listItem = document.createElement('div');
        listItem.className = 'admin-list-item';
        listItem.innerHTML = `
            <div class="admin-list-item-content">
                <div class="admin-list-item-image">
                    <img src="${member.photo}" alt="${member.name}">
                </div>
                <div class="admin-list-item-info">
                    <h4>${member.name}</h4>
                    <p>${member.role}</p>
                </div>
            </div>
            <div class="admin-list-item-actions">
                <button class="action-btn edit-btn" data-id="${member.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn" data-id="${member.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        membersList.appendChild(listItem);
    });
    
    // Adicionar event listeners para os botões de editar e excluir
    membersList.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const memberId = this.getAttribute('data-id');
            editMember(memberId);
        });
    });
    
    membersList.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const memberId = this.getAttribute('data-id');
            deleteMember(memberId);
        });
    });
}

// Configurar o formulário de edição de integrantes
function setupMemberForm() {
    // Botão para adicionar novo integrante
    addMemberBtn.addEventListener('click', function() {
        // Limpar o formulário
        document.getElementById('memberId').value = '';
        document.getElementById('memberName').value = '';
        document.getElementById('memberRole').value = '';
        document.getElementById('memberPhoto').value = '';
        document.getElementById('memberBio').value = '';
        
        // Mostrar o formulário
        memberForm.classList.remove('hidden');
    });
    
    // Botão para cancelar a edição
    cancelMemberBtn.addEventListener('click', function() {
        memberForm.classList.add('hidden');
    });
    
    // Formulário de edição de integrante
    memberEditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const memberId = document.getElementById('memberId').value;
        const name = document.getElementById('memberName').value;
        const role = document.getElementById('memberRole').value;
        const photo = document.getElementById('memberPhoto').value;
        const bio = document.getElementById('memberBio').value;
        
        if (memberId) {
            // Editar integrante existente
            const index = membersData.findIndex(m => m.id === memberId);
            if (index !== -1) {
                membersData[index] = { id: memberId, name, role, photo, bio };
            }
        } else {
            // Adicionar novo integrante
            const newId = 'member' + (membersData.length + 1);
            membersData.push({ id: newId, name, role, photo, bio });
        }
        
        // Salvar no localStorage
        localStorage.setItem('membersData', JSON.stringify(membersData));
        
        // Atualizar a lista de integrantes
        renderAdminMembersList();
        renderMembers();
        
        // Esconder o formulário
        memberForm.classList.add('hidden');
    });
}

// Editar um integrante
function editMember(memberId) {
    const member = membersData.find(m => m.id === memberId);
    if (!member) return;
    
    document.getElementById('memberId').value = member.id;
    document.getElementById('memberName').value = member.name;
    document.getElementById('memberRole').value = member.role;
    document.getElementById('memberPhoto').value = member.photo;
    document.getElementById('memberBio').value = member.bio || '';
    
    memberForm.classList.remove('hidden');
}

// Excluir um integrante
function deleteMember(memberId) {
    if (!confirm('Tem certeza que deseja excluir este integrante?')) return;
    
    membersData = membersData.filter(m => m.id !== memberId);
    
    // Salvar no localStorage
    localStorage.setItem('membersData', JSON.stringify(membersData));
    
    // Atualizar a lista de integrantes
    renderAdminMembersList();
    renderMembers();
}

// Renderizar a lista de eventos no painel administrativo
function renderAdminEventsList() {
    if (!eventsList) return;
    
    eventsList.innerHTML = '';
    
    // Ordenar eventos por data
    const sortedEvents = [...eventsData].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sortedEvents.forEach(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        
        const listItem = document.createElement('div');
        listItem.className = 'admin-list-item';
        listItem.innerHTML = `
            <div class="admin-list-item-content">
                <div class="admin-list-item-image">
                    <img src="${event.image}" alt="${event.title}">
                </div>
                <div class="admin-list-item-info">
                    <h4>${event.title}</h4>
                    <p>${formattedDate} - ${event.location}</p>
                </div>
            </div>
            <div class="admin-list-item-actions">
                <button class="action-btn edit-btn" data-id="${event.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn" data-id="${event.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        eventsList.appendChild(listItem);
    });
    
    // Adicionar event listeners para os botões de editar e excluir
    eventsList.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-id');
            editEvent(eventId);
        });
    });
    
    eventsList.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-id');
            deleteEvent(eventId);
        });
    });
}

// Configurar o formulário de edição de eventos
function setupEventForm() {
    // Botão para adicionar novo evento
    addEventBtn.addEventListener('click', function() {
        // Limpar o formulário
        document.getElementById('eventId').value = '';
        document.getElementById('eventTitle').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventTime').value = '';
        document.getElementById('eventLocation').value = '';
        document.getElementById('eventImage').value = '';
        document.getElementById('eventDescription').value = '';
        document.getElementById('eventTicketLink').value = '';
        
        // Mostrar o formulário
        eventForm.classList.remove('hidden');
    });
    
    // Botão para cancelar a edição
    cancelEventBtn.addEventListener('click', function() {
        eventForm.classList.add('hidden');
    });
    
    // Formulário de edição de evento
    eventEditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const eventId = document.getElementById('eventId').value;
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const location = document.getElementById('eventLocation').value;
        const image = document.getElementById('eventImage').value;
        const description = document.getElementById('eventDescription').value;
        const ticketLink = document.getElementById('eventTicketLink').value;
        
        if (eventId) {
            // Editar evento existente
            const index = eventsData.findIndex(e => e.id === eventId);
            if (index !== -1) {
                eventsData[index] = { id: eventId, title, date, time, location, image, description, ticketLink };
            }
        } else {
            // Adicionar novo evento
            const newId = 'event' + (eventsData.length + 1);
            eventsData.push({ id: newId, title, date, time, location, image, description, ticketLink });
        }
        
        // Salvar no localStorage
        localStorage.setItem('eventsData', JSON.stringify(eventsData));
        
        // Atualizar a lista de eventos
        renderAdminEventsList();
        renderEvents();
        
        // Esconder o formulário
        eventForm.classList.add('hidden');
    });
}

// Editar um evento
function editEvent(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;
    
    document.getElementById('eventId').value = event.id;
    document.getElementById('eventTitle').value = event.title;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventTime').value = event.time;
    document.getElementById('eventLocation').value = event.location;
    document.getElementById('eventImage').value = event.image;
    document.getElementById('eventDescription').value = event.description || '';
    document.getElementById('eventTicketLink').value = event.ticketLink || '';
    
    eventForm.classList.remove('hidden');
}

// Excluir um evento
function deleteEvent(eventId) {
    if (!confirm('Tem certeza que deseja excluir este evento?')) return;
    
    eventsData = eventsData.filter(e => e.id !== eventId);
    
    // Salvar no localStorage
    localStorage.setItem('eventsData', JSON.stringify(eventsData));
    
    // Atualizar a lista de eventos
    renderAdminEventsList();
    renderEvents();
}

// Renderizar a lista de imagens da galeria no painel administrativo
function renderAdminGalleryList() {
    if (!galleryList) return;
    
    galleryList.innerHTML = '';
    
    galleryData.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-admin-item';
        galleryItem.innerHTML = `
            <img src="${item.url}" alt="${item.caption || 'Imagem da galeria'}">
            <div class="gallery-admin-actions">
                <button class="edit-btn" data-id="${item.id}"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        galleryList.appendChild(galleryItem);
    });
    
    // Adicionar event listeners para os botões de editar e excluir
    galleryList.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const imageId = this.getAttribute('data-id');
            editGalleryImage(imageId);
        });
    });
    
    galleryList.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const imageId = this.getAttribute('data-id');
            deleteGalleryImage(imageId);
        });
    });
}

// Configurar o formulário de edição de imagens da galeria
function setupGalleryForm() {
    // Botão para adicionar nova imagem
    addImageBtn.addEventListener('click', function() {
        // Limpar o formulário
        document.getElementById('imageId').value = '';
        document.getElementById('imageUrl').value = '';
        document.getElementById('imageCaption').value = '';
        
        // Mostrar o formulário
        imageForm.classList.remove('hidden');
    });
    
    // Botão para cancelar a edição
    cancelImageBtn.addEventListener('click', function() {
        imageForm.classList.add('hidden');
    });
    
    // Formulário de edição de imagem
    imageEditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const imageId = document.getElementById('imageId').value;
        const url = document.getElementById('imageUrl').value;
        const caption = document.getElementById('imageCaption').value;
        
        if (imageId) {
            // Editar imagem existente
            const index = galleryData.findIndex(img => img.id === imageId);
            if (index !== -1) {
                galleryData[index] = { id: imageId, url, caption };
            }
        } else {
            // Adicionar nova imagem
            const newId = 'img' + (galleryData.length + 1);
            galleryData.push({ id: newId, url, caption });
        }
        
        // Salvar no localStorage
        localStorage.setItem('galleryData', JSON.stringify(galleryData));
        
        // Atualizar a galeria
        renderAdminGalleryList();
        renderGallery();
        
        // Esconder o formulário
        imageForm.classList.add('hidden');
    });
}

// Editar uma imagem da galeria
function editGalleryImage(imageId) {
    const image = galleryData.find(img => img.id === imageId);
    if (!image) return;
    
    document.getElementById('imageId').value = image.id;
    document.getElementById('imageUrl').value = image.url;
    document.getElementById('imageCaption').value = image.caption || '';
    
    imageForm.classList.remove('hidden');
}

// Excluir uma imagem da galeria
function deleteGalleryImage(imageId) {
    if (!confirm('Tem certeza que deseja excluir esta imagem?')) return;
    
    galleryData = galleryData.filter(img => img.id !== imageId);
    
    // Salvar no localStorage
    localStorage.setItem('galleryData', JSON.stringify(galleryData));
    
    // Atualizar a galeria
    renderAdminGalleryList();
    renderGallery();
}
