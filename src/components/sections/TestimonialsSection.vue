<script setup>
import { ref, computed } from 'vue'

const videoLinks = [
  'https://www.youtube.com/shorts/XnMKW-ytHS4',
  'https://www.youtube.com/shorts/JFgB6z9_tEo',
  'https://www.youtube.com/shorts/b6_NJpzERbM',
  'https://www.youtube.com/shorts/k7CS1gRtmNA',
]

const extractVideoId = (url) => {
  // Soporta youtube.com/shorts/ID, youtube.com/watch?v=ID y youtu.be/ID
  const m = url.match(/(?:shorts\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|youtu\.be\/)([^"&?\/\s]{11})/)
  return m ? m[1] : null
}

const slides = computed(() =>
  videoLinks
    .map((link) => ({
      src: `https://www.youtube-nocookie.com/embed/${extractVideoId(link)}`,
      url: link,
    }))
    .filter((s) => s.src.includes('/embed/') && !s.src.endsWith('/embed/')),
)

const currentIndex = ref(0)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
}
const goToSlide = (index) => {
  currentIndex.value = index
}
</script>

<template>
  <section id="testimonios" class="section-pad testimonials-section" aria-labelledby="testimonials-title">
    <div class="container-page">
      <div class="section-header section-header--center">
        <p class="section-eyebrow">Testimonios</p>
        <h2 id="testimonials-title" class="section-title">Ellos ya confiaron en nosotros</h2>
      </div>

      <div
        class="testimonials-carousel"
        aria-roledescription="carousel"
        aria-label="Videos de testimonios de clientes"
      >
        <div class="testimonials-carousel-wrapper">
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="testimonial-slide"
            :class="{ active: index === currentIndex }"
            :aria-hidden="index !== currentIndex"
          >
            <div class="video-frame">
              <iframe
                v-if="index === currentIndex"
                :src="slide.src"
                :title="`Testimonio de cliente ${index + 1}`"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <button
            type="button"
            class="testimonial-nav prev"
            aria-label="Video anterior"
            @click="prevSlide"
          >
            ‹
          </button>
          <button
            type="button"
            class="testimonial-nav next"
            aria-label="Video siguiente"
            @click="nextSlide"
          >
            ›
          </button>
        </div>

        <div class="testimonial-indicators" role="tablist" aria-label="Seleccionar video">
          <button
            v-for="(_, index) in slides"
            :key="index"
            type="button"
            class="testimonial-dot"
            :class="{ active: index === currentIndex }"
            :aria-label="`Ir a video ${index + 1}`"
            :aria-selected="index === currentIndex"
            @click="goToSlide(index)"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  background: var(--color-surface-soft);
}

.testimonials-carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-top: 2rem;
}

.testimonials-carousel-wrapper {
  position: relative;
  width: 100%;
  max-width: 952px; /* 560px * 1.7 = 70% aumento — todos los viewports */
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 12px 30px -10px rgba(9, 46, 28, 0.25);
  background: var(--color-brand-primary-dark);
}

.testimonial-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
}
.testimonial-slide.active {
  opacity: 1;
  visibility: visible;
}

.video-frame {
  width: 100%;
  height: 100%;
}
.video-frame iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.testimonial-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.7);
  color: var(--color-brand-primary);
  font-size: 1.6rem;
  line-height: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
  z-index: 5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: background 0.2s ease, transform 0.2s ease, color 0.2s ease;
}
.testimonial-nav:hover {
  background: #ffffff;
  color: var(--color-accent-strong);
  transform: translateY(-50%) scale(1.08);
}
.testimonial-nav.prev {
  left: 0.6rem;
}
.testimonial-nav.next {
  right: 0.6rem;
}
.testimonial-nav:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 2px;
}

.testimonial-indicators {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.testimonial-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 9999px;
  background: var(--color-border-strong);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: width 0.3s ease, background-color 0.3s ease;
  position: relative;
}
.testimonial-dot::after {
  content: "";
  position: absolute;
  inset: -10px;
}
.testimonial-dot.active {
  width: 1.6rem;
  background: var(--color-brand-primary);
}
.testimonial-dot:hover:not(.active) {
  background: var(--color-brand-secondary);
}
</style>
