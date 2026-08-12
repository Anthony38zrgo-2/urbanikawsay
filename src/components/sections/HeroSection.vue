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
      <div class="hero-overlay" aria-hidden="true"></div>
    </div>

    <div class="container-page hero-content">
      <h1 id="hero-title" class="animate-fade-in-up">
        CONSTRUYE EL<br />
        <strong>FUTURO SEGURO</strong><br />
        <strong>QUE TE MERECES</strong>
      </h1>
      <p class="hero-subtitle animate-fade-in-up">
        Invierte con tranquilidad con el respaldo de Urbanikawsay Inmobiliaria.
        <strong>¡Asegura tu futuro de la mano de expertos en el sector!</strong>
      </p>
      <a href="#proyectos" class="btn-aero btn-aero-primary hero-cta animate-fade-in-up">
        Conoce más aquí
        <span aria-hidden="true">↓</span>
      </a>
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
.hero-content h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 3.5rem);
  line-height: 1.15;
  margin-bottom: 1rem;
}
.hero-content h1 strong {
  color: var(--color-accent);
}
.hero-subtitle {
  max-width: 32rem;
  font-size: clamp(1rem, 2.4vw, 1.25rem);
  opacity: 0.95;
  margin-bottom: 1.75rem;
}
.hero-cta {
  text-decoration: none;
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
