<script setup>
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseIcon from './BaseIcon.vue'
import ResponsiveImage from './ResponsiveImage.vue'
import { projects } from '@/constants/site'
import { useWhatsApp } from '@/composables/useWhatsApp'
import { imageAssets } from '@/assets/generated/image-assets.js'

const props = defineProps({
  open: { type: Boolean, default: false },
  slug: { type: String, default: '' },
})

const emit = defineEmits(['close', 'reserve'])

const { createWhatsAppUrl } = useWhatsApp()

const project = computed(() =>
  projects.find((p) => p.slug === props.slug),
)

const imageSrc = computed(() => {
  if (!project.value) return null
  return imageAssets[project.value.imageUrl] || null
})

const logoSrc = computed(() => {
  if (!project.value?.logoUrl) return null
  return imageAssets[project.value.logoUrl] || null
})

const whatsappCta = computed(() =>
  project.value
    ? createWhatsAppUrl(`Hola, quiero más información sobre el proyecto ${project.value.name}.`)
    : '#',
)
</script>

<template>
  <BaseModal
    :open="open"
    :title="project ? project.name : ''"
    :labelled-by="`project-${slug}-title`"
    @close="emit('close')"
  >
    <template v-if="project">
      <div class="media-frame aspect-4-3 media-frame--contain project-media">
        <ResponsiveImage
          v-if="imageSrc"
          :asset="imageSrc"
          :alt="`Proyecto ${project.name}`"
          picture-class="project-image-picture"
          img-class="project-image"
          sizes="(min-width: 768px) 40rem, 100vw"
        />
      </div>

      <div v-if="logoSrc" class="project-modal-brand">
        <ResponsiveImage
          :asset="logoSrc"
          :alt="`Logo oficial ${project.name}`"
          picture-class="modal-logo-picture"
          img-class="modal-logo"
          sizes="160px"
        />
        <div class="project-modal-titles">
          <h3 class="project-modal-name">{{ project.name }}</h3>
          <span class="project-modal-location">{{ project.location }}</span>
        </div>
      </div>

      <!-- Condiciones comerciales destacadas -->
      <div v-if="project.price || project.initialPayment" class="commercial-box">
        <div v-if="project.price" class="commercial-item">
          <span class="commercial-label">Precio</span>
          <strong class="commercial-val">{{ project.price }}</strong>
        </div>
        <div v-if="project.initialPayment" class="commercial-item">
          <span class="commercial-label">Cuota Inicial</span>
          <strong class="commercial-val highlight">{{ project.initialPayment }}</strong>
        </div>
        <div v-if="project.financing" class="commercial-item">
          <span class="commercial-label">Financiamiento</span>
          <strong class="commercial-val">{{ project.financing }}</strong>
        </div>
        <div v-if="project.monthlyQuota" class="commercial-item">
          <span class="commercial-label">Cuotas desde</span>
          <strong class="commercial-val">{{ project.monthlyQuota }}</strong>
        </div>
      </div>

      <dl class="project-specs">
        <div class="spec">
          <BaseIcon name="location" decorative />
          <div>
            <dt class="sr-only">Ubicación y lote</dt>
            <dd>{{ project.location }} · {{ project.lotSize }}</dd>
          </div>
        </div>
        <div class="spec">
          <BaseIcon name="road" decorative />
          <div>
            <dt class="sr-only">Distancia</dt>
            <dd>{{ project.distanceToPort }}</dd>
          </div>
        </div>
      </dl>

      <p class="project-desc">{{ project.description }}</p>

      <h4 class="features-title">Equipamiento y características:</h4>
      <ul class="list-check feature-list">
        <li v-for="feature in project.features" :key="feature">
          <BaseIcon name="check" decorative />
          <span>{{ feature }}</span>
        </li>
      </ul>

      <div class="project-actions">
        <button
          type="button"
          class="btn-aero btn-aero-primary"
          @click="emit('reserve', project.slug)"
        >
          {{ project.ctaLabel }}
        </button>
        <a
          :href="whatsappCta"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-aero btn-aero-quiet"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped>
.project-media {
  margin-bottom: 1rem;
}
:deep(.project-image-picture) {
  display: block;
  width: 100%;
  height: 100%;
}
.project-modal-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface-soft);
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
}
:deep(.modal-logo-picture) {
  display: flex;
  align-items: center;
  height: 2.75rem;
  width: auto;
  max-width: 5.5rem;
  flex-shrink: 0;
}
:deep(.modal-logo) {
  height: 2.75rem;
  width: auto;
  max-width: 5.5rem;
  object-fit: contain;
}
.project-modal-titles {
  display: flex;
  flex-direction: column;
}
.project-modal-name {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-brand-primary);
  margin: 0;
}
.project-modal-location {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}
.commercial-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  padding: 0.9rem;
  background: var(--color-surface-flat-soft);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
}
@media (min-width: 480px) {
  .commercial-box {
    grid-template-columns: repeat(4, 1fr);
  }
}
.commercial-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.commercial-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  font-weight: 600;
}
.commercial-val {
  font-size: 0.95rem;
  color: var(--color-brand-primary);
  font-family: var(--font-display);
}
.commercial-val.highlight {
  color: var(--color-accent-strong);
}
.project-specs {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
.spec {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--color-brand-primary);
  font-size: 0.92rem;
}
.spec dd {
  color: var(--color-text-secondary);
  margin: 0;
}
.project-desc {
  color: var(--color-text-primary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}
.features-title {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--color-brand-primary);
  margin-bottom: 0.5rem;
}
.feature-list {
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.45rem;
}
@media (min-width: 480px) {
  .feature-list {
    grid-template-columns: 1fr 1fr;
  }
}
.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}
.feature-list li svg {
  color: var(--color-brand-secondary);
  flex-shrink: 0;
  margin-top: 0.15rem;
}
.project-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
