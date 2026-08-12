<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { projects } from '@/constants/site'

const emit = defineEmits(['open-project'])

const imageModules = import.meta.glob('@/assets/images/*.png', {
  eager: true,
  import: 'default',
})

const features = [
  { label: 'Paneles Solares', icon: 'sun' },
  { label: 'Tanque elevado', icon: 'water' },
  { label: 'Vías afirmadas', icon: 'road' },
  { label: 'Seguridad', icon: 'shield' },
]
</script>

<template>
  <section id="proyectos" class="section-pad projects-section anchor-offset" aria-labelledby="projects-title">
    <div class="container-page">
      <h2 id="projects-title" class="projects-heading">DESCUBRE LO QUE TENEMOS PARA ASEGURAR TU FUTURO</h2>
      <p class="projects-lead">
        Las Palmeras, en Huaral. Terrenos desde 120 m², a 20 minutos del Megapuerto
        de Chancay.
      </p>

      <ul class="features-grid" aria-label="Servicios incluidos">
        <li v-for="feature in features" :key="feature.label" class="card--feature feature-item">
          <BaseIcon :name="feature.icon" :size="24" decorative />
          <span>{{ feature.label }}</span>
        </li>
      </ul>

      <div class="project-grid">
        <article
          v-for="project in projects"
          :key="project.slug"
          class="card project-card"
        >
          <img
            :src="imageModules[`/src/assets/images/${project.imageUrl}`]"
            :alt="`Proyecto ${project.name}`"
            class="project-img"
            loading="lazy"
          />
          <div class="project-info">
            <h3 class="project-name">{{ project.name }}</h3>
            <p class="project-location">
              <BaseIcon name="location" :size="16" decorative />
              {{ project.location }}
            </p>
            <p class="project-detail">
              <BaseIcon name="road" :size="16" decorative />
              {{ project.distanceToPort }}
            </p>
            <button
              type="button"
              class="btn-aero btn-aero-primary project-detail-btn"
              @click="emit('open-project', project.slug)"
            >
              Ver detalles <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  background: var(--color-surface);
}
.projects-heading {
  font-family: var(--font-display);
  color: var(--color-brand-primary);
  text-align: center;
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  line-height: 1.2;
  max-width: 40rem;
  margin-inline: auto;
  margin-bottom: 1rem;
}
.projects-lead {
  text-align: center;
  color: var(--color-text-secondary);
  max-width: 36rem;
  margin-inline: auto;
  margin-bottom: 2.5rem;
}
.features-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 48rem;
  margin-inline: auto;
  margin-bottom: 3rem;
}
@media (min-width: 768px) {
  .features-grid { grid-template-columns: repeat(4, 1fr); }
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1rem;
  color: var(--color-brand-primary);
  font-weight: 600;
  font-size: 0.9rem;
}
.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .project-grid { grid-template-columns: repeat(3, 1fr); }
}
.project-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.2s ease;
}
.project-card:hover {
  transform: translateY(-4px);
}
.project-img {
  width: 100%;
  height: 13rem;
  object-fit: cover;
}
.project-info {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.project-name {
  font-family: var(--font-display);
  color: var(--color-brand-primary);
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
.project-location,
.project-detail {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}
.project-detail-btn {
  margin-top: auto;
  padding-top: 0.75rem;
}
</style>
