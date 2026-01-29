document.addEventListener('DOMContentLoaded', () => {
    // 1. Fix animations (remove opacity: 0 which might be left over from framer-motion)
    // We target elements that have inline style "opacity: 0" or transform.
    document.querySelectorAll('[style*="opacity: 0"]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.transition = 'none'; // Disable transition on load to prevent weird jumps
      // clear the style attribute to be clean
      el.removeAttribute('style');
    });
  
    // 2. Mobile Menu Setup
    const header = document.querySelector('header');
    // Look for the toggle button (it's the button inside header that is valid for mobile)
    const menuBtn = header.querySelector('button[aria-label="Toggle menu"]');
    
    if (menuBtn) {
      // Create mobile menu container
      const mobileMenu = document.createElement('div');
      mobileMenu.className = 'overflow-hidden border-t border-border lg:hidden hidden bg-background'; // hidden by default, added bg-background
      mobileMenu.id = 'mobile-menu';
      
      const navContainer = document.createElement('nav');
      navContainer.className = 'container flex flex-col gap-4 py-6';
      
      // Copy links from desktop nav
      const desktopNav = header.querySelector('nav.hidden.lg\\:flex');
      if (desktopNav) {
        const links = desktopNav.querySelectorAll('a');
        links.forEach(link => {
          const mobileLink = link.cloneNode(true);
          // Reset classes for mobile view
          // Remove text-sm, add text-base
          mobileLink.className = mobileLink.className.replace('text-sm', 'text-base');
          navContainer.appendChild(mobileLink);
        });
      }
  
      // Add Buttons (Call + Quote)
      // The desktop CTA container
      const desktopCta = header.querySelectorAll('div.hidden.lg\\:flex')[1]; // usually the second one (first is nav? No nav is <nav>)
      // Actually checking for flex container with links in it
      const desktopCtas = Array.from(header.querySelectorAll('div.hidden.lg\\:flex')).filter(el => el.tagName === 'DIV');
      if (desktopCtas.length > 0) {
          const ctaSource = desktopCtas[0];
          const ctaContainer = document.createElement('div');
          ctaContainer.className = 'mt-4 flex flex-col gap-3';
          
          const ctaLinks = ctaSource.querySelectorAll('a');
          ctaLinks.forEach(link => {
              const mobileCta = link.cloneNode(true);
              mobileCta.classList.add('w-full', 'justify-center', 'flex');
              // Ensure height
              if (!mobileCta.classList.contains('h-10') && !mobileCta.classList.contains('h-11')) {
                  mobileCta.classList.add('h-11');
              }
              ctaContainer.appendChild(mobileCta);
          });
          navContainer.appendChild(ctaContainer);
      }
  
      mobileMenu.appendChild(navContainer);
      header.appendChild(mobileMenu); // Append to header
      
      // Toggle Logic
      let isOpen = false;
      // Icon SVGs
      const menuIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>';
      const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x h-6 w-6"><path d="M18 6 6 18"/><path d="m6 6 18 12"/></svg>';

      menuBtn.addEventListener('click', () => {
          isOpen = !isOpen;
          if (isOpen) {
              mobileMenu.classList.remove('hidden');
              menuBtn.innerHTML = closeIcon;
          } else {
              mobileMenu.classList.add('hidden');
              menuBtn.innerHTML = menuIcon;
          }
      });
    }
  });
