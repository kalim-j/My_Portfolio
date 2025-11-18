/**
 * Portfolio Website JavaScript
 * Handles smooth scrolling, form validation, mobile menu, and scroll animations
 */

// ============================================
// Mobile Navigation Toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip empty hash or just #
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80; // Account for sticky header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll Animations (Fade-in Effect)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should fade in
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.skill-card, .achievement-card, .timeline__item, .contact-info__item');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ============================================
// Contact Form Validation and Handling
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formMessage = document.getElementById('formMessage');

    // Real-time validation
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    messageInput.addEventListener('blur', () => validateMessage());

    // Clear errors on input
    nameInput.addEventListener('input', () => {
        if (nameError) nameError.textContent = '';
        nameInput.setCustomValidity('');
    });

    emailInput.addEventListener('input', () => {
        if (emailError) emailError.textContent = '';
        emailInput.setCustomValidity('');
    });

    messageInput.addEventListener('input', () => {
        if (messageError) messageError.textContent = '';
        messageInput.setCustomValidity('');
    });

    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        if (!name) {
            if (nameError) nameError.textContent = 'Name is required';
            nameInput.setCustomValidity('Name is required');
            return false;
        }
        if (name.length < 2) {
            if (nameError) nameError.textContent = 'Name must be at least 2 characters';
            nameInput.setCustomValidity('Name must be at least 2 characters');
            return false;
        }
        if (nameError) nameError.textContent = '';
        nameInput.setCustomValidity('');
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            if (emailError) emailError.textContent = 'Email is required';
            emailInput.setCustomValidity('Email is required');
            return false;
        }
        if (!emailRegex.test(email)) {
            if (emailError) emailError.textContent = 'Please enter a valid email address';
            emailInput.setCustomValidity('Please enter a valid email address');
            return false;
        }
        if (emailError) emailError.textContent = '';
        emailInput.setCustomValidity('');
        return true;
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        if (!message) {
            if (messageError) messageError.textContent = 'Message is required';
            messageInput.setCustomValidity('Message is required');
            return false;
        }
        if (message.length < 10) {
            if (messageError) messageError.textContent = 'Message must be at least 10 characters';
            messageInput.setCustomValidity('Message must be at least 10 characters');
            return false;
        }
        if (messageError) messageError.textContent = '';
        messageInput.setCustomValidity('');
        return true;
    }

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (!isNameValid || !isEmailValid || !isMessageValid) {
            showFormMessage('Please fix the errors above', 'error');
            return;
        }

        // Get form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: document.getElementById('subject')?.value.trim() || '',
            message: messageInput.value.trim()
        };

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // TODO: Replace with your actual form submission endpoint
            // Example: Send to a server endpoint
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });

            // Simulate API call (remove this in production)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Success
            showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            
            // Clear all error messages
            if (nameError) nameError.textContent = '';
            if (emailError) emailError.textContent = '';
            if (messageError) messageError.textContent = '';

        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });

    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        }
    }
}

// ============================================
// Update Copyright Year
// ============================================
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// ============================================
// Active Navigation Link Highlighting
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Throttle scroll event for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            highlightActiveSection();
            ticking = false;
        });
        ticking = true;
    }
});

// Highlight on page load
highlightActiveSection();

// ============================================
// Edit Mode Functionality
// ============================================

// Default data (will be replaced by localStorage if available)
const defaultData = {
    skills: [
        { id: 1, icon: '📊', title: 'Data Analysis', description: 'Proficient in SQL, Python, and statistical analysis tools' },
        { id: 2, icon: '💻', title: 'Web Development', description: 'HTML, CSS, JavaScript, and modern frameworks' },
        { id: 3, icon: '📈', title: 'Data Visualization', description: 'Tableau, Power BI, and custom dashboard creation' },
        { id: 4, icon: '🐍', title: 'Python Programming', description: 'Pandas, NumPy, and data manipulation libraries' },
        { id: 5, icon: '🗄️', title: 'Database Management', description: 'SQL Server, PostgreSQL, and data modeling' },
        { id: 6, icon: '📝', title: 'Technical Writing', description: 'Documentation, reports, and clear communication' }
    ],
    achievements: [
        { id: 1, badge: '🏆', title: 'Data Analyst Certification', meta: 'Google Data Analytics Professional Certificate | 2025', description: 'Comprehensive certification covering data cleaning, analysis, and visualization techniques.' },
        { id: 4, badge: '🎓', title: 'Academic Excellence', meta: "Dean's List | 2023-2027", description: 'Maintained high academic performance throughout studies.' }
    ],
    experience: [
        { id: 1, title: 'Intern', company: 'Micro Infotech, Coimbatore', date: 'Feb 2025 - Present', description: 'Gave great creativity and attention to learn about Data Science in Python language which could be useful for programming. Implemented feedback systems that improved customer satisfaction ratings.', tags: ['Python', 'Data Science', 'Customer Feedback Systems'], link: '' }
    ]
};

// Data management
let portfolioData = { ...defaultData };
let nextId = { skills: 100, achievements: 100, experience: 100 };

// Load data from localStorage
function loadData() {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
        try {
            const savedData = JSON.parse(saved);
            // Keep skills and achievements, but clear experience
            portfolioData = {
                skills: savedData.skills || defaultData.skills,
                achievements: savedData.achievements || defaultData.achievements,
                experience: [] // Always start with empty experience
            };
            // Update nextId based on existing data
            nextId.skills = Math.max(...portfolioData.skills.map(s => s.id), 0) + 1;
            nextId.achievements = Math.max(...portfolioData.achievements.map(a => a.id), 0) + 1;
            nextId.experience = 100; // Reset to default
        } catch (e) {
            console.error('Error loading data:', e);
        }
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

// Edit Mode Toggle
const editModeToggle = document.getElementById('editModeToggle');
const editModeIcon = document.getElementById('editModeIcon');
const editModeText = document.getElementById('editModeText');
let isEditMode = false;

if (editModeToggle) {
    editModeToggle.addEventListener('click', () => {
        isEditMode = !isEditMode;
        document.body.classList.toggle('edit-mode', isEditMode);
        
        if (isEditMode) {
            editModeIcon.textContent = '✓';
            editModeText.textContent = 'Done';
            editModeToggle.classList.add('primary');
            editModeToggle.classList.remove('secondary');
        } else {
            editModeIcon.textContent = '✏️';
            editModeText.textContent = 'Edit';
            editModeToggle.classList.remove('primary');
            editModeToggle.classList.add('secondary');
        }
    });
}

// Modal Management
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modals on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// ============================================
// Skills Management
// ============================================
const skillsContainer = document.getElementById('skillsContainer');
const addSkillBtn = document.getElementById('addSkillBtn');
const skillModal = document.getElementById('skillModal');
const skillForm = document.getElementById('skillForm');
const skillModalTitle = document.getElementById('skillModalTitle');
let editingSkillId = null;

function renderSkills() {
    if (!skillsContainer) return;
    skillsContainer.innerHTML = '';
    
    portfolioData.skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card fade-in';
        skillCard.innerHTML = `
            <div class="edit-controls edit-mode-only">
                <button class="btn secondary" onclick="editSkill(${skill.id})" title="Edit">✏️</button>
                <button class="btn secondary" onclick="deleteSkill(${skill.id})" title="Delete">🗑️</button>
            </div>
            <div class="skill-card__icon">${skill.icon}</div>
            <h3>${skill.title}</h3>
            <p>${skill.description}</p>
        `;
        skillsContainer.appendChild(skillCard);
    });
    
    // Re-observe for animations
    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });
}

function addSkill(skill) {
    skill.id = nextId.skills++;
    portfolioData.skills.push(skill);
    saveData();
    renderSkills();
}

function editSkill(id) {
    const skill = portfolioData.skills.find(s => s.id === id);
    if (!skill) return;
    
    editingSkillId = id;
    document.getElementById('skillIcon').value = skill.icon;
    document.getElementById('skillTitle').value = skill.title;
    document.getElementById('skillDescription').value = skill.description;
    skillModalTitle.textContent = 'Edit Skill';
    openModal('skillModal');
}

function deleteSkill(id) {
    if (confirm('Are you sure you want to delete this skill?')) {
        portfolioData.skills = portfolioData.skills.filter(s => s.id !== id);
        saveData();
        renderSkills();
    }
}

if (addSkillBtn) {
    addSkillBtn.addEventListener('click', () => {
        editingSkillId = null;
        skillForm.reset();
        skillModalTitle.textContent = 'Add Skill';
        document.getElementById('skillIcon').value = '📊';
        openModal('skillModal');
    });
}

if (skillForm) {
    skillForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const skill = {
            icon: document.getElementById('skillIcon').value || '📊',
            title: document.getElementById('skillTitle').value,
            description: document.getElementById('skillDescription').value
        };
        
        if (editingSkillId) {
            const index = portfolioData.skills.findIndex(s => s.id === editingSkillId);
            if (index !== -1) {
                portfolioData.skills[index] = { ...skill, id: editingSkillId };
                saveData();
                renderSkills();
            }
        } else {
            addSkill(skill);
        }
        
        closeModal('skillModal');
        skillForm.reset();
    });
}

document.getElementById('skillModalClose')?.addEventListener('click', () => closeModal('skillModal'));
document.getElementById('skillModalCancel')?.addEventListener('click', () => closeModal('skillModal'));

// ============================================
// Achievements Management
// ============================================
const achievementsContainer = document.getElementById('achievementsContainer');
const addAchievementBtn = document.getElementById('addAchievementBtn');
const achievementModal = document.getElementById('achievementModal');
const achievementForm = document.getElementById('achievementForm');
const achievementModalTitle = document.getElementById('achievementModalTitle');
let editingAchievementId = null;

function renderAchievements() {
    if (!achievementsContainer) return;
    achievementsContainer.innerHTML = '';
    
    portfolioData.achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = 'achievement-card fade-in';
        achievementCard.innerHTML = `
            <div class="edit-controls edit-mode-only">
                <button class="btn secondary" onclick="editAchievement(${achievement.id})" title="Edit">✏️</button>
                <button class="btn secondary" onclick="deleteAchievement(${achievement.id})" title="Delete">🗑️</button>
            </div>
            <div class="achievement-card__badge">${achievement.badge}</div>
            <h3>${achievement.title}</h3>
            <p class="card__meta">${achievement.meta || ''}</p>
            <p>${achievement.description}</p>
        `;
        achievementsContainer.appendChild(achievementCard);
    });
    
    document.querySelectorAll('.achievement-card').forEach(card => {
        observer.observe(card);
    });
}

function addAchievement(achievement) {
    achievement.id = nextId.achievements++;
    portfolioData.achievements.push(achievement);
    saveData();
    renderAchievements();
}

function editAchievement(id) {
    const achievement = portfolioData.achievements.find(a => a.id === id);
    if (!achievement) return;
    
    editingAchievementId = id;
    document.getElementById('achievementBadge').value = achievement.badge;
    document.getElementById('achievementTitle').value = achievement.title;
    document.getElementById('achievementMeta').value = achievement.meta || '';
    document.getElementById('achievementDescription').value = achievement.description;
    achievementModalTitle.textContent = 'Edit Achievement';
    openModal('achievementModal');
}

function deleteAchievement(id) {
    if (confirm('Are you sure you want to delete this achievement?')) {
        portfolioData.achievements = portfolioData.achievements.filter(a => a.id !== id);
        saveData();
        renderAchievements();
    }
}

if (addAchievementBtn) {
    addAchievementBtn.addEventListener('click', () => {
        editingAchievementId = null;
        achievementForm.reset();
        achievementModalTitle.textContent = 'Add Achievement';
        document.getElementById('achievementBadge').value = '🏆';
        openModal('achievementModal');
    });
}

if (achievementForm) {
    achievementForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const achievement = {
            badge: document.getElementById('achievementBadge').value || '🏆',
            title: document.getElementById('achievementTitle').value,
            meta: document.getElementById('achievementMeta').value,
            description: document.getElementById('achievementDescription').value
        };
        
        if (editingAchievementId) {
            const index = portfolioData.achievements.findIndex(a => a.id === editingAchievementId);
            if (index !== -1) {
                portfolioData.achievements[index] = { ...achievement, id: editingAchievementId };
                saveData();
                renderAchievements();
            }
        } else {
            addAchievement(achievement);
        }
        
        closeModal('achievementModal');
        achievementForm.reset();
    });
}

document.getElementById('achievementModalClose')?.addEventListener('click', () => closeModal('achievementModal'));
document.getElementById('achievementModalCancel')?.addEventListener('click', () => closeModal('achievementModal'));

// ============================================
// Experience Management
// ============================================
const experienceContainer = document.getElementById('experienceContainer');
const addExperienceBtn = document.getElementById('addExperienceBtn');
const experienceModal = document.getElementById('experienceModal');
const experienceForm = document.getElementById('experienceForm');
const experienceModalTitle = document.getElementById('experienceModalTitle');
let editingExperienceId = null;

function renderExperience() {
    if (!experienceContainer) return;
    experienceContainer.innerHTML = '';
    
    portfolioData.experience.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline__item fade-in';
        
        const tagsHtml = exp.tags && exp.tags.length > 0 
            ? `<div class="card__tags">${exp.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>`
            : '';
        
        const linkHtml = exp.link 
            ? `<div class="resource__actions"><a href="${exp.link}" class="btn ghost" target="_blank">View Project</a></div>`
            : '';
        
        timelineItem.innerHTML = `
            <div class="timeline__marker"></div>
            <div class="timeline__content">
                <div class="edit-controls edit-mode-only">
                    <button class="btn secondary" onclick="editExperience(${exp.id})" title="Edit">✏️</button>
                    <button class="btn secondary" onclick="deleteExperience(${exp.id})" title="Delete">🗑️</button>
                </div>
                <div class="timeline__header">
                    <h3>${exp.title}</h3>
                    <span class="timeline__date">${exp.date}</span>
                </div>
                ${exp.company ? `<p class="timeline__company">${exp.company}</p>` : ''}
                <p>${exp.description}</p>
                ${tagsHtml}
                ${linkHtml}
            </div>
        `;
        experienceContainer.appendChild(timelineItem);
    });
    
    document.querySelectorAll('.timeline__item').forEach(item => {
        observer.observe(item);
    });
}

function addExperience(experience) {
    experience.id = nextId.experience++;
    portfolioData.experience.push(experience);
    saveData();
    renderExperience();
}

function editExperience(id) {
    const exp = portfolioData.experience.find(e => e.id === id);
    if (!exp) return;
    
    editingExperienceId = id;
    document.getElementById('experienceTitle').value = exp.title;
    document.getElementById('experienceCompany').value = exp.company || '';
    document.getElementById('experienceDate').value = exp.date;
    document.getElementById('experienceDescription').value = exp.description;
    document.getElementById('experienceTags').value = exp.tags ? exp.tags.join(', ') : '';
    document.getElementById('experienceLink').value = exp.link || '';
    experienceModalTitle.textContent = 'Edit Experience';
    openModal('experienceModal');
}

function deleteExperience(id) {
    if (confirm('Are you sure you want to delete this experience/project?')) {
        portfolioData.experience = portfolioData.experience.filter(e => e.id !== id);
        saveData();
        renderExperience();
    }
}

if (addExperienceBtn) {
    addExperienceBtn.addEventListener('click', () => {
        editingExperienceId = null;
        experienceForm.reset();
        experienceModalTitle.textContent = 'Add Experience';
        openModal('experienceModal');
    });
}

if (experienceForm) {
    experienceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const tags = document.getElementById('experienceTags').value
            .split(',')
            .map(t => t.trim())
            .filter(t => t);
        
        const experience = {
            title: document.getElementById('experienceTitle').value,
            company: document.getElementById('experienceCompany').value,
            date: document.getElementById('experienceDate').value,
            description: document.getElementById('experienceDescription').value,
            tags: tags,
            link: document.getElementById('experienceLink').value
        };
        
        if (editingExperienceId) {
            const index = portfolioData.experience.findIndex(e => e.id === editingExperienceId);
            if (index !== -1) {
                portfolioData.experience[index] = { ...experience, id: editingExperienceId };
                saveData();
                renderExperience();
            }
        } else {
            addExperience(experience);
        }
        
        closeModal('experienceModal');
        experienceForm.reset();
    });
}

document.getElementById('experienceModalClose')?.addEventListener('click', () => closeModal('experienceModal'));
document.getElementById('experienceModalCancel')?.addEventListener('click', () => closeModal('experienceModal'));

// Make functions globally available for onclick handlers
window.editSkill = editSkill;
window.deleteSkill = deleteSkill;
window.editAchievement = editAchievement;
window.deleteAchievement = deleteAchievement;
window.editExperience = editExperience;
window.deleteExperience = deleteExperience;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    // Update experience data - add Micro Infotech internship if not present
    const hasMicroInfotech = portfolioData.experience.some(e => e.company && e.company.includes('Micro Infotech'));
    if (!hasMicroInfotech) {
        portfolioData.experience = [
            { id: 1, title: 'Intern', company: 'Micro Infotech, Coimbatore', date: 'Feb 2025 - Present', description: 'Gave great creativity and attention to learn about Data Science in Python language which could be useful for programming. Implemented feedback systems that improved customer satisfaction ratings.', tags: ['Python', 'Data Science', 'Customer Feedback Systems'], link: '' }
        ];
        saveData();
    }
    // Update Academic Excellence date if it exists
    const academicExcellence = portfolioData.achievements.find(a => a.title === 'Academic Excellence');
    if (academicExcellence && academicExcellence.meta.includes('2022-2023')) {
        academicExcellence.meta = "Dean's List | 2023-2027";
        saveData();
    }
    // Update Data Analyst Certification date if it exists
    const dataAnalystCert = portfolioData.achievements.find(a => a.title === 'Data Analyst Certification');
    if (dataAnalystCert && dataAnalystCert.meta.includes('2024')) {
        dataAnalystCert.meta = dataAnalystCert.meta.replace('2024', '2025');
        saveData();
    }
    // Remove SQL Mastery Certification and Outstanding Project Award if they exist
    const originalCount = portfolioData.achievements.length;
    portfolioData.achievements = portfolioData.achievements.filter(a => 
        a.title !== 'SQL Mastery Certification' && a.title !== 'Outstanding Project Award'
    );
    if (portfolioData.achievements.length !== originalCount) {
        saveData();
    }
    renderSkills();
    renderAchievements();
    renderExperience();
});

