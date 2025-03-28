// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Scroll reveal animation
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-down');
        const windowHeight = window.innerHeight;
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealElements);
    revealElements(); // Initial check on page load

    // Skill bars animation using data-width attribute
    function animateSkillBars() {
        const skillProgressBars = document.querySelectorAll('.skill-progress');

        skillProgressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            // Ensure the bar is revealed before animating width
            const skillElement = bar.closest('.skill');
            if (skillElement && skillElement.classList.contains('active')) {
                 // Set initial width to 0 if not already animated
                 if (bar.style.width === '' || bar.style.width === '0px') {
                    bar.style.width = '0%';
                    // Use a small timeout to allow the browser to render the 0 width before transitioning
                        setTimeout(() => {
                            bar.style.width = targetWidth + '%'; // Set width style with %
                            // Ensure the data-width attribute remains just the number for the ::after content
                            // No need to setAttribute here as it should already be correct from HTML
                        }, 100); // Small delay before starting animation
                 }
            } else {
                 // Reset width if element is not active/visible
                 bar.style.width = '0%';
                 // Ensure data-width attribute remains just the number
                 // No need to setAttribute here if it's correct in HTML
            }
        });
    }

    // Use Intersection Observer for skill bars animation trigger
    const skillsSection = document.querySelector('.skills-section'); // Target the new skills section

    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Check if the skills section itself is intersecting
                if (entry.isIntersecting) {
                    // Find all skill elements within the section
                    const skillsInView = skillsSection.querySelectorAll('.skill.reveal, .skill.reveal-left, .skill.reveal-right');
                    skillsInView.forEach(skillEl => {
                        // Add 'active' class if not already added by the main reveal observer
                        if (!skillEl.classList.contains('active')) {
                             skillEl.classList.add('active');
                        }
                    });
                    // Animate the bars now that the section is visible
                    animateSkillBars();
                    // Optional: Unobserve after first animation if you only want it once
                    // observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% of the section is visible

        skillsObserver.observe(skillsSection);
    }

     // Modify the main reveal function to also trigger skill bar animation
     function revealElements() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-down, .fade-left, .fade-right, .fade-up, .fade-down, .zoom-in, .zoom-out');
        const windowHeight = window.innerHeight;

        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
                // If the revealed element is a skill, trigger animation check
                if (element.classList.contains('skill')) {
                    animateSkillBars();
                }
            }
        });
    }

    // Testimonial Slider
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonials.length > 0) {
        // Initial setup
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Auto-slide function
        function nextSlide() {
            testimonials[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % testimonials.length;
            testimonials[currentSlide].style.display = 'block';
            testimonials[currentSlide].style.animation = 'fadeIn 0.5s forwards';
        }
        
        // Set interval for auto-sliding
        setInterval(nextSlide, 5000);
    }

    // Add mousemove effect for the hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
            
            const heroContent = hero.querySelector('.hero-content');
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Reset position when mouse leaves
        hero.addEventListener('mouseleave', () => {
            const heroContent = hero.querySelector('.hero-content');
            heroContent.style.transform = 'translate(0px, 0px)';
        });
    }

    // Add animated border effect for gallery items on hover
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Add box-shadow animation
            item.style.boxShadow = '0 0 0 2px var(--primary-color), 0 15px 30px rgba(0,0,0,0.2)';
            item.style.transform = 'scale(1.05) rotateZ(1deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = '';
            item.style.transform = '';
        });
    });

    // Add subtle parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Parallax for about section
        const aboutImg = document.querySelector('.about-img');
        if (aboutImg) {
            aboutImg.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
        
        // Parallax for section headers
        document.querySelectorAll('.section-header h2').forEach(header => {
            const position = header.getBoundingClientRect().top;
            if (position < window.innerHeight && position > 0) {
                header.style.transform = `translateY(${(position - window.innerHeight) * 0.05}px)`;
            }
        });
    });

    // Add interactive elements for each gallery image
    document.querySelectorAll('.gallery-item').forEach(item => {
        // Create a touch ripple effect
        item.addEventListener('click', (e) => {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            item.appendChild(ripple);
            
            // Position the ripple where clicked
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Remove after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 500);
        });
    });

    // Form submission (placeholder for actual functionality)
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (in a real implementation, you would send the form data to a server)
            const formData = new FormData(contactForm);
            let formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            // Create a success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('form-success');
            successMessage.innerHTML = `
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Message envoyé !</h3>
                <p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
            `;
            
            // Replace form with success message
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add text typing animation to hero text
    const heroH1 = document.querySelector('.hero h1');
    if (heroH1 && heroH1.textContent) {
        const text = heroH1.textContent;
        heroH1.textContent = '';
        let index = 0;
        
        function typeText() {
            if (index < text.length) {
                heroH1.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 100);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeText, 500);
    }
});
