const toggle = document.querySelector('.menu'), nav = document.querySelector('.header nav');
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation') });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false') }));
document.getElementById('year').textContent = new Date().getFullYear();
const pageLoader = document.querySelector('.page-loader');
if (pageLoader) {
    const hideLoader = () => {
        const fillAnimation = pageLoader.querySelector('.page-loader-logo img:last-child').getAnimations()[0];
        const remainingAnimationTime = fillAnimation
            ? Math.max(0, 1100 - Number(fillAnimation.currentTime || 0))
            : 0;
        window.setTimeout(() => {
            pageLoader.classList.add('is-hidden');
            document.documentElement.classList.remove('loading-enabled');
            window.setTimeout(() => pageLoader.remove(), 450);
        }, remainingAnimationTime);
    };

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader, { once: true });
    }
}
document.querySelectorAll('[data-interest]').forEach(link => {
    link.addEventListener('click', () => {
        const interest = document.querySelector('#enquiry select[name="interest"]');
        if (interest) {
            interest.value = link.dataset.interest;
        }
    });
});
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