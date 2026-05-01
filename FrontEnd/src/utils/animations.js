import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Animation configurations
export const animations = {
  // Hero section animations
  hero: {
    title: {
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    },
    subtitle: {
      from: { opacity: 0, y: 30 },
      to: { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power3.out' }
    },
    buttons: {
      from: { opacity: 0, scale: 0.8 },
      to: { opacity: 1, scale: 1, duration: 0.8, delay: 0.6, ease: 'back.out(1.7)' }
    }
  },

  // Section animations
  section: {
    fadeInUp: {
      from: { opacity: 0, y: 40 },
      to: { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    },
    fadeInLeft: {
      from: { opacity: 0, x: -40 },
      to: { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
    },
    fadeInRight: {
      from: { opacity: 0, x: 40 },
      to: { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
    },
    staggerCards: {
      from: { opacity: 0, y: 30, scale: 0.95 },
      to: { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
    }
  },

  // Card animations
  card: {
    hover: {
      scale: 1.05,
      y: -5,
      duration: 0.3,
      ease: 'power2.out'
    },
    enter: {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    }
  },

  // Carousel animations
  carousel: {
    slideIn: {
      from: { opacity: 0, x: 100 },
      to: { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    }
  }
}

// Initialize animations
export const initAnimations = () => {
  // Hero section animations
  const heroTitle = document.querySelector('.hero-title')
  const heroSubtitle = document.querySelector('.hero-subtitle')
  const heroButtons = document.querySelector('.hero-buttons')

  if (heroTitle) {
    gsap.fromTo(heroTitle, animations.hero.title.from, animations.hero.title.to)
  }
  if (heroSubtitle) {
    gsap.fromTo(heroSubtitle, animations.hero.subtitle.from, animations.hero.subtitle.to)
  }
  if (heroButtons) {
    gsap.fromTo(heroButtons, animations.hero.buttons.from, animations.hero.buttons.to)
  }

  // Section scroll animations
  const sections = document.querySelectorAll('section')
  sections.forEach((section) => {
    const sectionTitle = section.querySelector('h2')
    const sectionParagraph = section.querySelector('p')
    const cards = section.querySelectorAll('.grid > div, .grid > article, .swiper-slide')

    // Animate section title
    if (sectionTitle) {
      gsap.fromTo(sectionTitle, 
        animations.section.fadeInUp.from,
        {
          ...animations.section.fadeInUp.to,
          scrollTrigger: {
            trigger: sectionTitle,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Animate section paragraph
    if (sectionParagraph) {
      gsap.fromTo(sectionParagraph,
        animations.section.fadeInUp.from,
        {
          ...animations.section.fadeInUp.to,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionParagraph,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Animate cards with stagger
    if (cards.length > 0) {
      gsap.fromTo(cards,
        animations.section.staggerCards.from,
        {
          ...animations.section.staggerCards.to,
          stagger: 0.05,
          delay: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true
          }
        }
      )
    }
  })

  // Card hover animations
  const cardElements = document.querySelectorAll('.bg-white.rounded-xl, .bg-\\[\\#F9FAFB\\].rounded-xl')
  cardElements.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, animations.card.hover)
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card, animations.card.enter)
    })
  })

  // Recruitment scrolling animation enhancement
  const recruitmentRows = document.querySelectorAll('.animate-scroll, .animate-scroll-right-to-left')
  recruitmentRows.forEach(row => {
    gsap.fromTo(row,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: row,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })

  // Achievements section animations
  const achievementCards = document.querySelectorAll('.grid.grid-cols-1 > div')
  achievementCards.forEach((card, index) => {
    gsap.fromTo(card,
      animations.section.fadeInUp.from,
      {
        ...animations.section.fadeInUp.to,
        delay: index * 0.15,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })

  // Achievement hover animations
  achievementCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, animations.card.hover)
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card, animations.card.enter)
    })
  })

  // Navigation animations
  const navItems = document.querySelectorAll('.nav-item')
  navItems.forEach((item, index) => {
    gsap.fromTo(item,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: 'power2.out'
      }
    )
  })

  // Floating admission badge animation
  const admissionBadge = document.querySelector('.fixed.bottom-4.left-4')
  if (admissionBadge) {
    gsap.to(admissionBadge, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })
  }
}

// Refresh ScrollTrigger on route changes
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh()
}

// Cleanup animations
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}
