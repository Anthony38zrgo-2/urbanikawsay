<script setup>
import BaseIcon from "@/components/ui/BaseIcon.vue";
import ResponsiveImage from "@/components/ui/ResponsiveImage.vue";
import { projects } from "@/constants/site";
import { imageAssets } from "@/assets/generated/image-assets.js";

const emit = defineEmits(["open-project"]);

const features = [
  { label: "Paneles Solares", icon: "sun" },
  { label: "Tanque elevado", icon: "water" },
  { label: "Vías afirmadas", icon: "road" },
  { label: "Seguridad", icon: "shield" },
];
</script>

<template>
  <section
    id="proyectos"
    class="section-pad projects-section anchor-offset"
    aria-labelledby="projects-title"
  >
    <div class="container-page">
      <div class="section-header section-header--center">
        <p class="section-eyebrow">Proyectos</p>
        <h2 id="projects-title" class="section-title">
          DESCUBRE LO QUE TENEMOS PARA ASEGURAR TU FUTURO
        </h2>
        <p class="section-lead">
          Las Palmeras, en Huaral. Terrenos desde 120 m², a 20 minutos del
          Megapuerto de Chancay.
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
          <div
            class="media-frame aspect-4-3 media-frame--contain project-media"
          >
            <ResponsiveImage
              :asset="imageAssets[project.imageUrl]"
              :alt="`Proyecto ${project.name}`"
              picture-class="project-image-picture"
              img-class="project-img"
              sizes="(min-width: 768px) 33vw, 100vw"
              loading="lazy"
            />
          </div>
          <div class="project-info">
            <div class="project-info-header">
              <h3 class="project-name">{{ project.name }}</h3>
            </div>
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
@media (min-width: 640px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.project-media {
  position: relative;
}
.project-info {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.project-info-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  min-height: 2.25rem;
}
:deep(.project-logo-picture) {
  display: flex;
  align-items: center;
  height: 2rem;
  width: auto;
  max-width: 4rem;
  flex-shrink: 0;
}
:deep(.project-logo) {
  width: auto;
  height: 2rem;
  max-width: 4rem;
  object-fit: contain;
}
.project-name {
  font-family: var(--font-display);
  color: var(--color-brand-primary);
  font-size: 1.25rem;
  margin: 0;
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
