const toggle = document.querySelector('.menu'), nav = document.querySelector('.header nav');
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation') });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false') }));
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('enquiry').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const status = document.getElementById('status');
    const whatsappLink = document.querySelector('.whatsapp-float').href;
    const whatsappNumber = new URL(whatsappLink).pathname.slice(1);
    const message = [
        'RHL StoneX enquiry',
        '',
        `Name: ${data.get('name')}`,
        `Company: ${data.get('company') || 'Not provided'}`,
        `Email: ${data.get('email')}`,
        `Phone: ${data.get('phone') || 'Not provided'}`,
        `Interest: ${data.get('interest')}`,
        '',
        'Project details:',
        data.get('message')
    ].join('\n');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    status.textContent = 'Opening WhatsApp with your enquiry. Review the details and tap Send to deliver it.';
    window.location.assign(whatsappUrl);
});