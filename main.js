// ---- Cursor ----
const cursor = document.getElementById('cursor')
const cursorRing = document.getElementById('cursorRing')
let mouseX = 0,
    mouseY = 0,
    ringX = 0,
    ringY = 0

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    cursor.style.left = mouseX + 'px'
    cursor.style.top = mouseY + 'px'
})
;(function animRing() {
    ringX += (mouseX - ringX) * 0.13
    ringY += (mouseY - ringY) * 0.13
    cursorRing.style.left = ringX + 'px'
    cursorRing.style.top = ringY + 'px'
    requestAnimationFrame(animRing)
})()

document.querySelectorAll('button, a').forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursorRing.style.width = '56px'
        cursorRing.style.height = '56px'
        cursorRing.style.opacity = '1'
        cursor.style.background = 'var(--mauve)'
    })
    el.addEventListener('mouseleave', () => {
        cursorRing.style.width = '36px'
        cursorRing.style.height = '36px'
        cursorRing.style.opacity = '0.6'
        cursor.style.background = 'var(--rose)'
    })
})

// ---- Petals ----
const colors = [
    '#f7c9d0',
    '#e8b4b8',
    '#d4a0c0',
    '#c3a0b4',
    '#b8a8d8',
    '#f5d6d9',
]
const container = document.getElementById('particles')

function createPetal() {
    const p = document.createElement('div')
    p.className = 'petal'
    const size = Math.random() * 7 + 4
    p.style.cssText = `
    left: ${Math.random() * 100}%;
    width: ${size}px; height: ${size}px;
    background: ${colors[Math.floor(Math.random() * colors.length)]};
    animation-duration: ${Math.random() * 8 + 7}s;
    animation-delay: ${Math.random() * 8}s;
    transform: rotate(${Math.random() * 360}deg);
    border-radius: ${Math.random() > 0.5 ? '0 50% 50% 50%' : '50%'};
    opacity: 0;
  `
    container.appendChild(p)
    setTimeout(() => p.remove(), 18000)
}
setInterval(createPetal, 600)
for (let i = 0; i < 15; i++) createPetal()

// ---- Floating hearts on click ----
document.addEventListener('click', (e) => {
    const hearts = ['♡', '♥', '❤', '💕', '✦']
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const h = document.createElement('div')
            h.className = 'floating-heart'
            h.textContent = hearts[Math.floor(Math.random() * hearts.length)]
            h.style.left = e.clientX + (Math.random() - 0.5) * 40 + 'px'
            h.style.top = e.clientY + (Math.random() - 0.5) * 20 + 'px'
            h.style.fontSize = Math.random() * 14 + 10 + 'px'
            document.body.appendChild(h)
            setTimeout(() => h.remove(), 2100)
        }, i * 120)
    }
})

// ---- Photo data ----
const photos = [
    {
        url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80',
        quote: 'Hari yang tidak akan pernah terlupakan',
        date: '2025 · A2',
    },
    {
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
        quote: 'Bersama, segalanya terasa lebih ringan',
        date: '2025 · A2',
    },
    {
        url: 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=600&q=80',
        quote: 'Senyum yang selalu kuingat',
        date: '2025 · A2',
    },
    {
        url: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=600&q=80',
        quote: 'Momen kecil yang punya makna besar',
        date: '2025 · A2',
    },
    {
        url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80',
        quote: 'Tawa yang paling tulus pernah kudengar',
        date: '2025 · A2',
    },
    {
        url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80',
        quote: 'Di sini, kita pernah muda',
        date: '2025 · A2',
    },
    {
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80',
        quote: 'Perjalanan yang mengubah segalanya',
        date: '2025 · A2',
    },
    {
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
        quote: 'Kita yang dulu, selalu ada di sini',
        date: '2025 · A2',
    },
    {
        url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
        quote: 'Mimpi yang kita rajut bersama',
        date: '2025 · A2',
    },
]

// ---- CTA Button → Transition → Gallery ----
const ctaBtn = document.getElementById('ctaBtn')
const landing = document.getElementById('landing')
const galleryPage = document.getElementById('gallery-page')
const overlay = document.getElementById('transition-overlay')
const heroWrap = document.getElementById('hero-photo-wrap')

ctaBtn.addEventListener('click', () => {
    // Transition overlay
    overlay.classList.add('active')

    // Landing exits
    setTimeout(() => landing.classList.add('exit'), 400)

    // Gallery enters
    setTimeout(() => {
        galleryPage.classList.add('visible')
    }, 900)

    // Hero photo reveals
    setTimeout(() => {
        heroWrap.classList.add('revealed')
    }, 1300)

    setTimeout(() => {
        overlay.classList.remove('active')
        landing.style.display = 'none'
    }, 2100)
})

// ---- Reveal All Photos ----
const revealBtn = document.getElementById('revealBtn')
const gallerySection = document.getElementById('gallery-section')
const masonryGrid = document.getElementById('masonryGrid')

revealBtn.addEventListener('click', () => {
    // Scroll hero up, show gallery
    gallerySection.classList.add('show')

    // Build cards
    photos.forEach((p, i) => {
        const card = document.createElement('div')
        const framed = i % 4 === 0
        card.className = 'photo-card' + (framed ? ' framed' : '')
        card.style.animationDelay = i * 0.12 + 's'
        card.innerHTML = `
      <img src="${p.url}" alt="${p.quote}" loading="lazy">
      <div class="overlay">
        <p class="overlay-quote">${p.quote}</p>
        <p class="overlay-date">${p.date}</p>
      </div>
    `
        masonryGrid.appendChild(card)
    })

    // Scroll to gallery
    setTimeout(() => {
        gallerySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }, 200)

    // Animate quote strips
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add('visible')
            })
        },
        { threshold: 0.3 }
    )

    document
        .querySelectorAll('.quote-strip')
        .forEach((q) => observer.observe(q))
})

// ---- Music Toggle ----
const audio = document.getElementById('bgAudio')
const musicBtn = document.getElementById('music-toggle')
const musicIcon = document.getElementById('musicIcon')
const soundwaveIcon = document.getElementById('soundwaveIcon')
let playing = false

musicBtn.addEventListener('click', () => {
    playing = !playing
    if (playing) {
        audio.play().catch(() => {})
        musicBtn.classList.add('playing')
        musicIcon.style.display = 'none'
        soundwaveIcon.style.display = 'flex'
    } else {
        audio.pause()
        musicBtn.classList.remove('playing')
        musicIcon.style.display = 'block'
        soundwaveIcon.style.display = 'none'
    }
})

// ---- Scroll-triggered quote visibility (initial check) ----
window.addEventListener(
    'scroll',
    () => {
        document.querySelectorAll('.quote-strip:not(.visible)').forEach((q) => {
            const rect = q.getBoundingClientRect()
            if (rect.top < window.innerHeight * 0.85) q.classList.add('visible')
        })
    },
    { passive: true }
)
