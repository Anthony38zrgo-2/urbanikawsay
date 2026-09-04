<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { siteData } from '@/constants/site'
import BaseIcon from '@/components/ui/BaseIcon.vue'

// Import all WebP photos from assets/fotos-equipo
const teamImages = import.meta.glob('@/assets/fotos-equipo/*.webp', {
  eager: true,
  import: 'default',
})

const getTeamPhoto = (photoName) => {
  if (!photoName) return null
  return teamImages[`/src/assets/fotos-equipo/${photoName}`] || null
}

const currentIndex = ref(0)
const visibleCount = ref(3)
const isPaused = ref(false)
let autoplayTimer = null

const updateVisibleCount = () => {
  if (typeof window === 'undefined') return
  const width = window.innerWidth
  if (width < 640) {
    visibleCount.value = 1
  } else if (width < 1024) {
    visibleCount.value = 2
  } else {
    visibleCount.value = 3
  }

  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = Math.max(0, maxIndex.value)
  }
}

const maxIndex = computed(() => {
  return Math.max(0, siteData.team.length - visibleCount.value)
})

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = maxIndex.value
  }
}

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const goToSlide = (index) => {
  currentIndex.value = Math.min(Math.max(0, index), maxIndex.value)
}

// Touch swipe handling
let touchStartX = 0
let touchEndX = 0

const onTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX
}

const onTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX
  const diff = touchEndX - touchStartX
  if (Math.abs(diff) > 45) {
    if (diff < 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
}

// Keyboard navigation
const onKeydown = (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide()
  } else if (e.key === 'ArrowRight') {
    nextSlide()
  }
}

onMounted(() => {
  updateVisibleCount()
  window.addEventListener('resize', updateVisibleCount)
  autoplayTimer = setInterval(() => {
    if (!isPaused.value) {
      nextSlide()
    }
  }, 5000)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateVisibleCount)
  if (autoplayTimer) clearInterval(autoplayTimer)
})
</script>

<template>
  <section class="section-pad team-section" aria-labelledby="team-title">
    <div class="container-page">
      <div class="section-header section-header--center">
        <p class="section-eyebrow">El equipo</p>
        <h2 id="team-title" class="section-title">Nuestro equipo</h2>
        <p class="section-lead">
          Profesionales apasionados comprometidos con tu inversión y la construcción de tu futuro.
        </p>
      </div>

      <!-- Carousel Container -->
      <div
        class="team-carousel-container"
        role="region"
        aria-roledescription="carousel"
        aria-label="Carrusel del equipo de Urbanikawsay"
        tabindex="0"
        @mouseenter="isPaused = true"
        @mouseleave="isPaused = false"
        @focusin="isPaused = true"
        @focusout="isPaused = false"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
        @keydown="onKeydown"
      >
        <!-- Nav Button: Prev -->
        <button
          type="button"
          class="team-nav-btn team-nav-btn--prev"
          aria-label="Miembro anterior"
          @click="prevSlide"
        >
          <BaseIcon name="chevron-left" :size="22" decorative />
        </button>

        <!-- Carousel Viewport & Track -->
        <div class="team-carousel-viewport">
          <div
            class="team-carousel-track"
            :style="{
              transform: `translateX(calc(-1 * ${currentIndex} * (100% + var(--carousel-gap)) / var(--visible-items)))`,
              '--visible-items': visibleCount,
            }"
          >
            <article
              v-for="(member, index) in siteData.team"
              :key="member.name"
              class="card card-team team-slide"
              role="group"
              aria-roledescription="slide"
              :aria-label="`${index + 1} de ${siteData.team.length}: ${member.name}`"
            >
              <div class="team-avatar">
                <img
                  v-if="getTeamPhoto(member.photo)"
                  :src="getTeamPhoto(member.photo)"
                  :alt="`Fotografía de ${member.name}`"
                  class="team-photo"
                  loading="lazy"
                  width="120"
                  height="120"
                />
                <BaseIcon v-else name="person" :size="40" decorative />
              </div>

              <div class="team-meta">
                <h3 class="team-name">{{ member.name }}</h3>
                <p class="team-role">{{ member.role }}</p>
              </div>

              <p class="team-greeting">{{ member.greeting }}</p>
            </article>
          </div>
        </div>

        <!-- Nav Button: Next -->
        <button
          type="button"
          class="team-nav-btn team-nav-btn--next"
          aria-label="Miembro siguiente"
          @click="nextSlide"
        >
          <BaseIcon name="chevron-right" :size="22" decorative />
        </button>
      </div>

      <!-- Pagination Indicators -->
      <div
        class="team-carousel-dots"
        role="tablist"
        aria-label="Seleccionar diapositiva de equipo"
      >
        <button
          v-for="(_, dotIndex) in maxIndex + 1"
          :key="dotIndex"
          type="button"
          class="team-dot"
          :class="{ active: dotIndex === currentIndex }"
          :aria-label="`Ir a grupo ${dotIndex + 1}`"
          :aria-selected="dotIndex === currentIndex"
          role="tab"
          @click="goToSlide(dotIndex)"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  background: var(--color-surface-soft);
  position: relative;
}

.team-carousel-container {
  position: relative;
  margin-top: 2rem;
  padding: 0 0.5rem;
  outline: none;
}

@media (min-width: 640px) {
  .team-carousel-container {
    padding: 0 3.25rem;
  }
}

.team-carousel-viewport {
  overflow: hidden;
  width: 100%;
  border-radius: var(--radius-lg, 0.75rem);
  padding: 0.5rem 0;
}

.team-carousel-track {
  --carousel-gap: 1.5rem;
  display: flex;
  gap: var(--carousel-gap);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.team-slide {
  flex: 0 0 calc((100% - (var(--visible-items) - 1) * var(--carousel-gap)) / var(--visible-items));
  max-width: calc((100% - (var(--visible-items) - 1) * var(--carousel-gap)) / var(--visible-items));
  box-sizing: border-box;
}

.card-team {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem 1.75rem;
  background: var(--color-surface-flat);
  border: var(--border-hairline);
  border-radius: var(--radius-xl, 1rem);
  box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.04));
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  height: 100%;
}

.card-team:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md, 0 8px 20px rgba(0, 0, 0, 0.08));
}

.team-avatar {
  width: 7rem;
  height: 7rem;
  border-radius: 9999px;
  overflow: hidden;
  margin: 0 auto 1.25rem;
  border: 3px solid var(--color-brand-secondary-pale);
  background: var(--color-brand-secondary-pale);
  color: var(--color-brand-primary);
  display: grid;
  place-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.team-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.team-meta {
  margin-bottom: 0.75rem;
}

.team-name {
  font-family: var(--font-display);
  color: var(--color-brand-primary);
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
}

.team-role {
  color: var(--color-brand-secondary);
  font-weight: 600;
  font-size: 0.825rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.25rem;
}

.team-greeting {
  color: var(--color-text-secondary);
  font-size: 0.925rem;
  line-height: 1.6;
  margin-top: auto;
}

/* Nav buttons */
.team-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  background: var(--color-surface-flat);
  border: 1px solid var(--color-border-hairline, rgba(0, 0, 0, 0.1));
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  color: var(--color-brand-primary);
  display: grid;
  place-items: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
}

.team-nav-btn:hover {
  background: var(--color-brand-primary);
  color: #ffffff;
  transform: translateY(-50%) scale(1.08);
}

.team-nav-btn:focus-visible {
  outline: 2px solid var(--color-brand-primary);
  outline-offset: 2px;
}

.team-nav-btn--prev {
  left: 0;
}

.team-nav-btn--next {
  right: 0;
}

@media (max-width: 639px) {
  .team-nav-btn {
    display: none;
  }
}

/* Dots */
.team-carousel-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.75rem;
}

.team-dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 9999px;
  background: var(--color-border-hairline, rgba(0, 0, 0, 0.2));
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.25s ease;
}

.team-dot.active {
  width: 1.75rem;
  background: var(--color-brand-primary);
  border-radius: 9999px;
}

.team-dot:hover:not(.active) {
  background: var(--color-brand-secondary);
}

.team-dot:focus-visible {
  outline: 2px solid var(--color-brand-primary);
  outline-offset: 2px;
}
</style>
