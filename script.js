// Campus Safety App - Vanilla JavaScript

class CampusSafetyApp {
    constructor() {
        this.currentLocation = null;
        this.contacts = this.loadContacts();
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupSOS();
        this.setupLocationSharing();
        this.setupSafeRoute();
        this.setupEmergencyContacts();
        this.loadContactsList();
    }

    // Navigation
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.section');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const sectionId = button.dataset.section;
                
                // Update active nav button
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Show corresponding section
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === sectionId) {
                        section.classList.add('active');
                    }
                });
            });
        });
    }

    // SOS Functionality
    setupSOS() {
        const sosButton = document.getElementById('sosButton');
        const emergencyAlert = document.getElementById('emergencyAlert');
        const callSecurityBtn = document.getElementById('callSecurityBtn');

        sosButton.addEventListener('click', () => {
            this.handleSOSClick();
        });

        callSecurityBtn.addEventListener('click', () => {
            window.location.href = 'tel:1752394700'; // Replace with actual campus security number
        });
    }

    handleSOSClick() {
        const sosButton = document.getElementById('sosButton');
        const emergencyAlert = document.getElementById('emergencyAlert');

        sosButton.classList.add('active');
        sosButton.disabled = true;

        // Get current location for emergency message
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationLink = `https://maps.google.com/?q=${latitude},${longitude}`;
                    const emergencyMessage = `🚨 EMERGENCY ALERT 🚨\n\nI need immediate help! Please check on me or contact campus security.\n\nMy location: ${locationLink}\n\nThis is an automated safety alert.`;
                    
                    // Open WhatsApp with emergency message
                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(emergencyMessage)}`;
                    window.open(whatsappUrl, '_blank');
                    
                    this.showToast('Emergency alert sent!', 'success');
                },
                (error) => {
                    // Fallback without location
                    const emergencyMessage = `🚨 EMERGENCY ALERT 🚨\n\nI need immediate help! Please check on me or contact campus security.\n\nThis is an automated safety alert.`;
                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(emergencyMessage)}`;
                    window.open(whatsappUrl, '_blank');
                    
                    this.showToast('Emergency alert sent (location unavailable)!', 'success');
                }
            );
        }

        // Show emergency alert
        emergencyAlert.classList.remove('hidden');

        // Auto-reset after 30 seconds
        setTimeout(() => {
            sosButton.classList.remove('active');
            sosButton.disabled = false;
            emergencyAlert.classList.add('hidden');
        }, 30000);
    }

    // Location Sharing
    setupLocationSharing() {
        const getLocationBtn = document.getElementById('getLocationBtn');
        const copyLocationBtn = document.getElementById('copyLocationBtn');
        const shareWhatsAppBtn = document.getElementById('shareWhatsAppBtn');

        getLocationBtn.addEventListener('click', () => {
            this.getCurrentLocation();
        });

        copyLocationBtn.addEventListener('click', () => {
            this.copyLocationLink();
        });

        shareWhatsAppBtn.addEventListener('click', () => {
            this.shareLocationViaWhatsApp();
        });
    }

    getCurrentLocation() {
        const getLocationBtn = document.getElementById('getLocationBtn');
        const locationDisplay = document.getElementById('locationDisplay');
        
        if (!navigator.geolocation) {
            this.showToast('Geolocation is not supported by this browser', 'error');
            return;
        }

        getLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting Location...';
        getLocationBtn.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                this.currentLocation = { lat: latitude, lng: longitude };
                
                // Update UI
                document.getElementById('latitude').textContent = latitude.toFixed(6);
                document.getElementById('longitude').textContent = longitude.toFixed(6);
                
                const mapsLink = document.getElementById('mapsLink');
                mapsLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
                
                locationDisplay.classList.remove('hidden');
                
                getLocationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Get Current Location';
                getLocationBtn.disabled = false;
                
                this.showToast('Location found!', 'success');
            },
            (error) => {
                let errorMessage = 'Unable to retrieve location';
                
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location access denied. Please enable location permissions.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out';
                        break;
                }
                
                this.showToast(errorMessage, 'error');
                
                getLocationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Get Current Location';
                getLocationBtn.disabled = false;
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    }

    getLocationLink() {
        if (!this.currentLocation) return '';
        return `https://maps.google.com/?q=${this.currentLocation.lat},${this.currentLocation.lng}`;
    }

    async copyLocationLink() {
        const link = this.getLocationLink();
        if (!link) {
            this.showToast('No location available to copy', 'error');
            return;
        }

        try {
            await navigator.clipboard.writeText(link);
            this.showToast('Location link copied to clipboard!', 'success');
        } catch (err) {
            this.showToast('Failed to copy link', 'error');
        }
    }

    shareLocationViaWhatsApp() {
        const link = this.getLocationLink();
        if (!link) {
            this.showToast('No location available to share', 'error');
            return;
        }

        const message = `📍 Here's my current location:\n\n${link}\n\nShared via Campus Safety App`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    // Safe Route Navigation
    setupSafeRoute() {
        const findRouteBtn = document.getElementById('findRouteBtn');
        
        findRouteBtn.addEventListener('click', () => {
            this.findSafeRoute();
        });
    }

    findSafeRoute() {
        const fromLocation = document.getElementById('fromLocation').value;
        const toLocation = document.getElementById('toLocation').value;
        const mapFrame = document.getElementById('mapFrame');

        if (!fromLocation || !toLocation) {
            this.showToast('Please enter both origin and destination', 'error');
            return;
        }

        // Generate Google Maps directions URL
        const directionsUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(fromLocation)}&daddr=${encodeURIComponent(toLocation)}&output=embed`;
        
        mapFrame.src = directionsUrl;
        this.showToast('Route updated!', 'success');
    }

    // Emergency Contacts
    setupEmergencyContacts() {
        const addContactBtn = document.getElementById('addContactBtn');
        
        addContactBtn.addEventListener('click', () => {
            this.addContact();
        });
    }

    addContact() {
        const nameInput = document.getElementById('contactName');
        const phoneInput = document.getElementById('contactPhone');
        
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (!name || !phone) {
            this.showToast('Please enter both name and phone number', 'error');
            return;
        }

        const contact = {
            id: Date.now(),
            name: name,
            phone: phone
        };

        this.contacts.push(contact);
        this.saveContacts();
        this.loadContactsList();
        
        // Clear inputs
        nameInput.value = '';
        phoneInput.value = '';
        
        this.showToast('Contact added successfully!', 'success');
    }

    loadContactsList() {
        const contactsList = document.getElementById('contactsList');
        
        if (this.contacts.length === 0) {
            contactsList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No contacts added yet</p>';
            return;
        }

        contactsList.innerHTML = this.contacts.map(contact => `
            <div class="contact-item">
                <div class="contact-info">
                    <h4>${contact.name}</h4>
                    <p>${contact.phone}</p>
                </div>
                <div class="contact-actions">
                    <button class="call-btn" onclick="app.callContact('${contact.phone}')">
                        <i class="fas fa-phone"></i>
                    </button>
                    <button class="whatsapp-btn" onclick="app.messageContact('${contact.phone}')">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                    <button class="delete-btn" onclick="app.deleteContact(${contact.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    callContact(phone) {
        window.location.href = `tel:${phone}`;
    }

    messageContact(phone) {
        const message = `Hi! I need your help, this is an emergency. Please check on me as soon as possible.`;
        const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    deleteContact(id) {
        if (confirm('Are you sure you want to delete this contact?')) {
            this.contacts = this.contacts.filter(contact => contact.id !== id);
            this.saveContacts();
            this.loadContactsList();
            this.showToast('Contact deleted', 'success');
        }
    }

    // Local Storage
    loadContacts() {
        try {
            const contacts = localStorage.getItem('campusSafetyContacts');
            return contacts ? JSON.parse(contacts) : [];
        } catch (error) {
            console.error('Error loading contacts:', error);
            return [];
        }
    }

    saveContacts() {
        try {
            localStorage.setItem('campusSafetyContacts', JSON.stringify(this.contacts));
        } catch (error) {
            console.error('Error saving contacts:', error);
            this.showToast('Error saving contacts', 'error');
        }
    }

    // Toast Notifications
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastIcon = toast.querySelector('.toast-icon');
        const toastMessage = toast.querySelector('.toast-message');

        // Set icon based on type
        if (type === 'success') {
            toastIcon.className = 'toast-icon fas fa-check-circle';
            toast.className = 'toast success';
        } else if (type === 'error') {
            toastIcon.className = 'toast-icon fas fa-exclamation-circle';
            toast.className = 'toast error';
        } else {
            toastIcon.className = 'toast-icon fas fa-info-circle';
            toast.className = 'toast';
        }

        toastMessage.textContent = message;
        toast.classList.remove('hidden');

        // Auto-hide after 3 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CampusSafetyApp();
});

// Map Section Logic
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('campusMapCanvas');
    const ctx = canvas?.getContext('2d');
    const mapImg = new Image();
    mapImg.src = 'campus-map.png'; // Save your map image as 'campus-map.png' in the project root

    let points = [];
    let pathDrawn = false;

    if (canvas && ctx) {
        mapImg.onload = () => {
            ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height);
        };

        canvas.addEventListener('click', (e) => {
            if (points.length >= 2) return;
            const rect = canvas.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
            const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
            points.push({ x, y });

            // Draw marker
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = points.length === 1 ? '#28a745' : '#ff416c';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw path if two points selected
            if (points.length === 2) {
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                ctx.lineTo(points[1].x, points[1].y);
                ctx.strokeStyle = '#ff416c';
                ctx.lineWidth = 4;
                ctx.stroke();
                pathDrawn = true;
            }
        });

        document.getElementById('resetMapBtn').addEventListener('click', () => {
            points = [];
            pathDrawn = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height);
        });
    }
});

// Map Zoom Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('campusMapCanvas');
    const mapZoomModal = document.getElementById('mapZoomModal');
    const closeMapZoom = document.getElementById('closeMapZoom');
    const zoomedMapImg = document.getElementById('zoomedMapImg');

    if (canvas && mapZoomModal && closeMapZoom && zoomedMapImg) {
        canvas.addEventListener('dblclick', (e) => {
            // Show modal with zoomed map
            mapZoomModal.classList.remove('hidden');
        });

        closeMapZoom.addEventListener('click', () => {
            mapZoomModal.classList.add('hidden');
        });

        // Close modal when clicking outside the image
        mapZoomModal.addEventListener('click', (e) => {
            if (e.target === mapZoomModal) {
                mapZoomModal.classList.add('hidden');
            }
        });
    }
});

// Fake Call Button Logic
document.addEventListener('DOMContentLoaded', () => {
    const fakeCallBtn = document.getElementById('fakeCallBtn');
    const fakeCallAudio = document.getElementById('fakeCallAudio');
    let isRinging = false;

    if (fakeCallBtn && fakeCallAudio) {
        fakeCallBtn.addEventListener('click', () => {
            if (!isRinging) {
                fakeCallAudio.currentTime = 0;
                fakeCallAudio.loop = true;
                fakeCallAudio.play();
                fakeCallBtn.innerHTML = '<i class="fas fa-phone-slash"></i> Stop Fake Call';
                isRinging = true;
            } else {
                fakeCallAudio.pause();
                fakeCallAudio.currentTime = 0;
                fakeCallBtn.innerHTML = '<i class="fas fa-phone-volume"></i> Fake Call';
                isRinging = false;
            }
        });
    }
});