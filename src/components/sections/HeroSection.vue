<script setup>
const slides = [
  { image: 'cuadro-01.png', alt: 'Urbanikawsay Inmobiliaria — inversión en terrenos' },
  { image: 'group-71.png', alt: 'Proyectos inmobiliarios cerca del Megapuerto de Chancay' },
  { image: 'group-72.png', alt: 'Terrenos con título de propiedad' },
  { image: 'cuadro-02.png', alt: 'Lotes con servicios básicos' },
]

const imageModules = import.meta.glob('@/assets/images/*.png', {
  eager: true,
  import: 'default',
})
</script>

<template>
  <section id="inicio" class="hero anchor-offset" aria-labelledby="hero-title">
    <div class="hero-slider">
      <figure
        v-for="(slide, index) in slides"
        :key="slide.image"
        class="hero-slide"
        :style="{ '--i': index }"
      >
        <img
          :src="imageModules[`/src/assets/images/${slide.image}`]"
          :alt="slide.alt"
          class="hero-slide-img animate-kenburns"
          :loading="index === 0 ? 'eager' : 'lazy'"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
        />
      </figure>
      <div class="hero-overlay hero-overlay--dark" aria-hidden="true"></div>
    </div>

    <div class="container-page hero-content">
      <div class="hero-section">
        <p class="section-eyebrow">Inmobiliaria de confianza</p>
        <h1 id="hero-title" class="hero-title animate-fade-in-up">
          CONSTRUYE EL<br />
          <strong>FUTURO SEGURO</strong><br />
          <strong>QUE TE MERECES</strong>
        </h1>
        <p class="hero-subtitle animate-fade-in-up">
          Invierte con tranquilidad con el respaldo de Urbanikawsay Inmobiliaria.
          <strong>¡Asegura tu futuro de la mano de expertos en el sector!</strong>
        </p>
        <a href="#proyectos" class="btn-aero btn-aero-primary btn-lg hero-cta animate-fade-in-up">
          Conoce más aquí
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  color: var(--color-text-inverse);
  overflow: hidden;
}
@media (max-width: 767px) {
  .hero {
    min-height: clamp(36rem, 82svh, 52rem);
  }
}
.hero-slider {
  position: absolute;
  inset: 0;
  display: flex;
}
.hero-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: heroCrossfade 20s infinite;
  animation-delay: calc(var(--i) * 5s);
}
.hero-slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgb(9 46 28 / 0.72);
}
.hero-content {
  position: relative;
  z-index: 1;
  padding-block: 6rem;
}
.hero-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 40rem;
}
.hero-section .section-eyebrow {
  color: var(--color-accent);
}
.hero-section .section-eyebrow::before {
  background: var(--color-accent);
}
.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-display-3xl);
  line-height: 1.1;
  letter-spacing: var(--tracking-display);
  color: var(--color-text-inverse);
}
.hero-title strong {
  color: var(--color-accent);
}
.hero-subtitle {
  max-width: 32rem;
  font-size: var(--text-body-lg);
  opacity: 0.95;
}
.hero-cta {
  align-self: flex-start;
  text-decoration: none;
  margin-top: 0.5rem;
}

@keyframes heroCrossfade {
  0%, 20% { opacity: 1; }
  25%, 95% { opacity: 0; }
  100% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-slide {
    animation: none;
    opacity: 0;
  }
  .hero-slide:first-child {
    opacity: 1;
  }
}
</style>
