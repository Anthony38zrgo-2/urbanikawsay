<script setup>
import heroImg1 from '@/assets/images/hero/hero-01.jpg'
import heroImg2 from '@/assets/images/hero/hero-02.jpg'
import heroImg3 from '@/assets/images/hero/hero-03.jpg'
import heroImg4 from '@/assets/images/hero/hero-04.jpg'
import heroImg5 from '@/assets/images/hero/hero-05.jpg'

const slides = [
  {
    src: heroImg1,
    alt: 'Proyectos y terrenos habilitados en Huaral - Urbanikawsay Inmobiliaria',
  },
  {
    src: heroImg2,
    alt: 'Equipo de profesionales y asesores de Urbanikawsay Inmobiliaria',
  },
  {
    src: heroImg3,
    alt: 'Vistas panorámicas y vías principales de desarrollo inmobiliario',
  },
  {
    src: heroImg4,
    alt: 'Entrega de títulos y asesoría personalizada a inversionistas',
  },
  {
    src: heroImg5,
    alt: 'Lotes y áreas verdes con alta proyección y plusvalía',
  },
]
</script>

<template>
  <section id="inicio" class="hero anchor-offset" aria-labelledby="hero-title">
    <div class="hero-slider">
      <figure
        v-for="(slide, index) in slides"
        :key="index"
        class="hero-slide"
        :style="{ '--i': index }"
      >
        <img
          :src="slide.src"
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
  animation: heroCrossfade 25s infinite;
  animation-delay: calc(var(--i) * 5s);
  margin: 0;
}
.hero-slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(9, 46, 28, 0.84) 0%,
    rgba(9, 46, 28, 0.68) 50%,
    rgba(9, 46, 28, 0.78) 100%
  );
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
  0%, 16% { opacity: 1; }
  20%, 96% { opacity: 0; }
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
