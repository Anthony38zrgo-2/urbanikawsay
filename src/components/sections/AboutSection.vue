<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import imgNosotros1 from '@/assets/images/nosotros/nosotros-01.jpg'
import imgNosotros2 from '@/assets/images/nosotros/nosotros-02.jpg'
import imgNosotros3 from '@/assets/images/nosotros/nosotros-03.jpg'

const slides = [
  {
    src: imgNosotros1,
    alt: 'Equipo y clientes en la oficina de Urbanikawsay Inmobiliaria',
    caption: 'Compromiso y transparencia en cada entrega',
  },
  {
    src: imgNosotros2,
    alt: 'Familias felices recibiendo su inversión en proyectos inmobiliarios',
    caption: 'Familias asegurando su patrimonio y futuro',
  },
  {
    src: imgNosotros3,
    alt: 'Clientes satisfechos en el proyecto Las Palmeras de Huaral',
    caption: 'Construyendo futuro y confianza en cada paso',
  },
]

const currentIndex = ref(0)
const isPaused = ref(false)
let timer = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
}

const goToSlide = (index) => {
  currentIndex.value = index
}

const startAutoplay = () => {
  stopAutoplay()
  timer = setInterval(() => {
    if (!isPaused.value) {
      nextSlide()
    }
  }, 4500)
}

const stopAutoplay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <section id="nosotros" class="section-pad anchor-offset about-section" aria-labelledby="about-title">
    <div class="container-page">
      <div class="about-grid">
        <!-- Columna de Contenido / Textos -->
        <div class="about-content">
          <div class="section-header">
            <p class="section-eyebrow">¿Quiénes somos?</p>
            <h2 id="about-title" class="section-title">Somos arquitectos de sueños inmobiliarios</h2>
          </div>
          <p class="about-copy">
            En Urbanika somos un equipo de especialistas en el rubro inmobiliario.
            Contamos con líderes expertos, asesores con amplia trayectoria, un área
            administrativa especializada y un equipo de postventa enfocado en la
            calidad de atención. Todos trabajamos con un mismo objetivo: brindarte
            una inversión segura, clara y confiable.
          </p>
          <h3 class="about-subtitle">Nuestra trayectoria en el mercado</h3>
          <p class="about-copy">
            En el tejido del mercado inmobiliario, nuestra compañía se destaca como
            arquitecta de sueños y custodia de historias inolvidables. Hemos ido
            más allá de simplemente vender propiedades: hemos construido la
            oportunidad de iniciar en el rubro inmobiliario, dando tranquilidad
            financiera y futuros prometedores.
          </p>
        </div>

        <!-- Columna de Carrusel Fotográfico -->
        <div
          class="about-carousel-container"
          aria-roledescription="carousel"
          aria-label="Galería de fotos de Urbanikawsay"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
          @focusin="isPaused = true"
          @focusout="isPaused = false"
        >
          <div class="about-carousel-wrapper">
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="carousel-slide"
              :class="{ active: index === currentIndex }"
              :aria-hidden="index !== currentIndex"
            >
              <img
                :src="slide.src"
                :alt="slide.alt"
                class="carousel-img"
                :loading="index === 0 ? 'eager' : 'lazy'"
              />
              <div class="carousel-caption">
                <span>{{ slide.caption }}</span>
              </div>
            </div>

            <!-- Botones de Navegación Anterior / Siguiente -->
            <button
              type="button"
              class="carousel-nav-btn prev"
              aria-label="Foto anterior"
              @click="prevSlide"
            >
              <BaseIcon name="chevron-left" :size="20" decorative />
            </button>
            <button
              type="button"
              class="carousel-nav-btn next"
              aria-label="Foto siguiente"
              @click="nextSlide"
            >
              <BaseIcon name="chevron-right" :size="20" decorative />
            </button>
          </div>

          <!-- Indicadores de Puntos (Dots) -->
          <div class="carousel-indicators" role="tablist" aria-label="Seleccionar diapositiva">
            <button
              v-for="(slide, index) in slides"
              :key="index"
              type="button"
              class="indicator-dot"
              :class="{ active: index === currentIndex }"
              :aria-label="`Ir a imagen ${index + 1}`"
              :aria-selected="index === currentIndex"
              @click="goToSlide(index)"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  background: var(--color-surface);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 992px) {
  .about-grid {
    grid-template-columns: 1.15fr 1fr;
    gap: 3.5rem;
  }
}

.about-copy {
  color: var(--color-text-primary);
  font-size: var(--text-body-lg);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.about-subtitle {
  font-family: var(--font-display);
  font-size: var(--text-heading-lg);
  color: var(--color-brand-primary);
  margin-bottom: 0.75rem;
}

/* Carrusel Fotográfico */
.about-carousel-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.about-carousel-wrapper {
  position: relative;
  width: 100%;
  max-width: 440px;
  aspect-ratio: 4 / 5;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 16px 36px -10px rgba(13, 77, 46, 0.18), 0 4px 12px -2px rgba(13, 77, 46, 0.08);
  border: 1px solid rgba(213, 221, 210, 0.8);
  background: #092E1C;
}

@media (min-width: 640px) {
  .about-carousel-wrapper {
    max-width: 480px;
  }
}

.carousel-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.6s ease, visibility 0.6s ease, transform 0.6s ease;
  transform: scale(1.02);
}

.carousel-slide.active {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 1.25rem 1rem;
  background: linear-gradient(to top, rgba(9, 46, 28, 0.85) 0%, rgba(9, 46, 28, 0.4) 60%, transparent 100%);
  color: #FFFFFF;
  font-size: 0.88rem;
  font-weight: 500;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* Botones de navegación */
.carousel-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: var(--color-brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: background 0.2s ease, transform 0.2s ease, color 0.2s ease;
  z-index: 5;
}

.carousel-nav-btn:hover {
  background: #FFFFFF;
  color: var(--color-accent-strong);
  transform: translateY(-50%) scale(1.08);
}

.carousel-nav-btn.prev {
  left: 0.75rem;
}

.carousel-nav-btn.next {
  right: 0.75rem;
}

/* Puntos indicadores */
.carousel-indicators {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.indicator-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 9999px;
  background: var(--color-border-strong);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.indicator-dot.active {
  width: 1.6rem;
  background: var(--color-brand-primary);
}

.indicator-dot:hover:not(.active) {
  background: var(--color-brand-secondary);
}
</style>
