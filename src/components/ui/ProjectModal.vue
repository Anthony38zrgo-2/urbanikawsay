<script setup>
import { computed } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseIcon from './BaseIcon.vue'
import { projects } from '@/constants/site'
import { useWhatsApp } from '@/composables/useWhatsApp'

const props = defineProps({
  open: { type: Boolean, default: false },
  slug: { type: String, default: '' },
})

const emit = defineEmits(['close', 'reserve'])

const { createWhatsAppUrl } = useWhatsApp()

const project = computed(() =>
  projects.find((p) => p.slug === props.slug),
)

const imageModules = import.meta.glob('@/assets/images/*.png', {
  eager: true,
  import: 'default',
})

const imageSrc = computed(() => {
  if (!project.value) return ''
  return imageModules[`/src/assets/images/${project.value.imageUrl}`] || ''
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
      <div class="media-frame aspect-video project-media">
        <img
          v-if="imageSrc"
          :src="imageSrc"
          :alt="`Proyecto ${project.name}`"
          class="project-image"
        />
      </div>
      <dl class="project-specs">
        <div class="spec">
          <BaseIcon name="location" />
          <div>
            <dt>{{ project.location }}</dt>
            <dd>{{ project.lotSize }}</dd>
          </div>
        </div>
        <div class="spec">
          <BaseIcon name="road" />
          <dd>{{ project.distanceToPort }}</dd>
        </div>
      </dl>
      <p class="project-desc">{{ project.description }}</p>
      <ul class="list-check feature-list">
        <li v-for="feature in project.features" :key="feature">
          <BaseIcon name="check" decorative />
          {{ feature }}
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
.project-specs {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.spec {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text-primary);
}
.spec dt {
  font-weight: 600;
}
.spec dd {
  color: var(--color-text-secondary);
}
.project-desc {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}
.feature-list {
  margin-bottom: 1.5rem;
}
.project-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
</style>
