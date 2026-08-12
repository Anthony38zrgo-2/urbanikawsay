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

const statusLabels = {
  available: 'Disponible',
  presale: 'En preventa',
  last: 'Últimos lotes',
  sold: 'Vendido',
}

const statusClass = (status) => `badge-status--${status || 'sold'}`
</script>

<template>
  <section id="proyectos" class="section-pad projects-section anchor-offset" aria-labelledby="projects-title">
    <div class="container-page">
      <div class="section-header section-header--center">
        <p class="section-eyebrow">Proyectos</p>
        <h2 id="projects-title" class="section-title">DESCUBRE LO QUE TENEMOS PARA ASEGURAR TU FUTURO</h2>
        <p class="section-lead">
          Las Palmeras, en Huaral. Terrenos desde 120 m², a 20 minutos del Megapuerto
          de Chancay.
        </p>
      </div>

      <ul class="features-grid" aria-label="Servicios incluidos">
        <li v-for="feature in features" :key="feature.label" class="chip">
          <BaseIcon :name="feature.icon" :size="18" decorative />
          <span>{{ feature.label }}</span>
        </li>
      </ul>

      <div class="project-grid">
        <article
          v-for="project in projects"
          :key="project.slug"
          class="card-property"
        >
          <div class="media-frame aspect-video project-media">
            <img
              :src="imageModules[`/src/assets/images/${project.imageUrl}`]"
              :alt="`Proyecto ${project.name}`"
              loading="lazy"
            />
            <span class="badge badge-status--project" :class="statusClass(project.status)">
              {{ statusLabels[project.status] || 'Vendido' }}
            </span>
          </div>
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
.features-grid {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: var(--space-block);
}
.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .project-grid { grid-template-columns: repeat(3, 1fr); }
}
.project-media {
  position: relative;
}
.badge-status--project {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
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
