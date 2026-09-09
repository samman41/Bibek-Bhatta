const CONFIG = {
    // Profile Details
    name: "BIBEK BHATTA",
    title: "Marketing Manager | Nepatop",

    // Paths to Images (Ensure these match the actual files in your directory)
    logoPath: "Image/logo.jpg",
    brandLogoPath: "Image/nepatop-logo.png",
    backgroundPath: "Image/background image.jpg",

    // Primary Action Buttons (Grid)
    actions: [
        { id: "call", label: "Call Now", url: "tel:+977-986-6387790", icon: "fas fa-phone-alt" },
        { id: "gmail", label: "Email Us", url: "mailto:[bhagirathngt@gmail.com]", icon: "fas fa-envelope" },
        { id: "location", label: "Location", url: "https://maps.app.goo.gl/kAYN8UBF11pZ58Ro6", icon: "fas fa-map-marker-alt" },
        { id: "website", label: "Website", url: "https://bhagirathfabrication.com.np/", icon: "fas fa-globe" }
    ],

    // Social Media Links (Small circular icons)
    socials: [
        { id: "facebook", url: "https://www.facebook.com/profile.php?id=61585769439702", icon: "fab fa-facebook-f" },
        { id: "instagram", url: "#", icon: "fab fa-instagram" },
        { id: "tiktok", url: "#", icon: "fab fa-tiktok" }
    ],

    // Direct WhatsApp Link
    whatsappUrl: "https://wa.me/9779866387790",

    // Save Contact (vCard) Details for Address Book
    vcard: {
        firstName: "Bibek",
        lastName: "Bhatta",
        phone: "+977-986-6387790",
        email: "bhagirathngt@gmail.com",
        company: "Bhagirath Fabrication Pvt.Ltd",
        website: "https://bhagirathfabrication.com.np/"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Background and Logo
    document.getElementById('background-container').style.backgroundImage = `url('${CONFIG.backgroundPath}')`;
    document.getElementById('profile-logo').src = CONFIG.logoPath;
    document.getElementById('brand-logo').src = CONFIG.brandLogoPath;

    // 2. Set Profile Information
    document.getElementById('profile-name').textContent = CONFIG.name;
    document.getElementById('profile-title').textContent = CONFIG.title;

    // 3. Generate Social Icons
    const socialsRow = document.getElementById('socials-row');
    CONFIG.socials.forEach(social => {
        const a = document.createElement('a');
        a.href = social.url;
        a.className = 'social-icon';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        const i = document.createElement('i');
        i.className = social.icon;
        a.appendChild(i);

        socialsRow.appendChild(a);
    });

    // 4. Generate Action Grid Buttons
    const actionsGrid = document.getElementById('actions-grid');
    CONFIG.actions.forEach(action => {
        const a = document.createElement('a');
        a.href = action.url;
        a.className = 'action-btn';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        const i = document.createElement('i');
        i.className = action.icon;

        const span = document.createElement('span');
        span.textContent = action.label;

        a.appendChild(i);
        a.appendChild(span);
        actionsGrid.appendChild(a);
    });

    // 5. Setup WhatsApp
    document.getElementById('whatsapp-btn').href = CONFIG.whatsappUrl;

    // 6. Handle 'Save Contact' Generation (vCard format)
    const saveBtn = document.getElementById('save-contact-btn');
    saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const v = CONFIG.vcard;

        // Construct vCard 3.0 String
        const notes = [];
        const locationUrl = CONFIG.actions.find(a => a.id === 'location')?.url || '';
        if (locationUrl) notes.push(`Location: ${locationUrl}`);
        notes.push(`WhatsApp: ${CONFIG.whatsappUrl}`);
        CONFIG.socials.forEach(s => {
            notes.push(`${s.id.charAt(0).toUpperCase() + s.id.slice(1)}: ${s.url}`);
        });

        const vcardData = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            `N:${v.lastName};${v.firstName};;;`,
            `FN:${v.firstName} ${v.lastName}`,
            `ORG:${v.company}`,
            `TEL;TYPE=WORK,VOICE:${v.phone}`,
            `EMAIL;TYPE=PREF,INTERNET:${v.email}`,
            `URL:${v.website}`,
            ...CONFIG.socials.map(s => `X-SOCIALPROFILE;type=${s.id}:${s.url}`),
            `NOTE:${notes.join("\\n")}`,
            "END:VCARD"
        ].join("\r\n");

        // Trigger file download
        const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `${v.firstName}_${v.lastName}.vcf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
    });

    // 7. Set Visiting Card Image and Handle Download
    const visitingCardPath = 'Image/Visiting card.jpg';
    document.getElementById('visiting-card-img').src = visitingCardPath;

    const saveCardBtn = document.getElementById('save-visiting-card-btn');
    if (saveCardBtn) {
        saveCardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const downloadLink = document.createElement('a');
            downloadLink.href = visitingCardPath;
            downloadLink.download = 'Bibek_Bhatta_Visiting_Card.jpg';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    }
});
