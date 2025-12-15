document.addEventListener('DOMContentLoaded', () => {
  // Nav toggle (mobile)
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked (mobile)
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Fill current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Contact form handling (simulado)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.style.color = '';
      status.textContent = 'Enviando...';

      const formData = new FormData(form);
      const name = (formData.get('name') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();

      if (!name || !email || !message) {
        status.style.color = 'var(--muted)';
        status.textContent = 'Por favor preencha todos os campos.';
        return;
      }

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        status.style.color = 'var(--muted)';
        status.textContent = 'Por favor informe um email válido.';
        return;
      }

      // Simula envio assíncrono
      try {
        await new Promise((r) => setTimeout(r, 900));
        status.style.color = 'var(--success)';
        status.textContent = 'Mensagem enviada com sucesso! Obrigado.';
        form.reset();

        // limpa a mensagem depois de alguns segundos
        setTimeout(() => {
          status.style.color = 'var(--muted)';
          status.textContent = '';
        }, 3500);
      } catch (err) {
        status.style.color = 'var(--muted)';
        status.textContent = 'Erro ao enviar. Tente novamente.';
      }
    });
  }

  // Animate skill bars when skills section enters viewport
  const skillBars = Array.from(document.querySelectorAll('.skill-bar > div'));
  if (skillBars.length) {
    // store targets and collapse initially
    skillBars.forEach((el) => {
      const target = el.getAttribute('style') || el.getAttribute('data-width') || '';
      // normalize to percent string (if value like "width:95%")
      const matched = target.match(/width\s*:\s*([^;]+)/i);
      const pct = matched ? matched[1].trim() : (el.getAttribute('data-width') || el.style.width || '');
      el.setAttribute('data-target-width', pct || '0%');
      // collapse for animation (only if not already collapsed)
      el.style.width = '0%';
    });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              skillBars.forEach((el, i) => {
                const target = el.getAttribute('data-target-width') || '0%';
                // small staggered delay
                setTimeout(() => {
                  el.style.width = target;
                }, i * 100);
              });
              obs.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(skillsSection);
    } else {
      // se não houver section, aplica imediatamente
      skillBars.forEach((el) => {
        el.style.width = el.getAttribute('data-target-width') || '0%';
      });
    }
  }
});