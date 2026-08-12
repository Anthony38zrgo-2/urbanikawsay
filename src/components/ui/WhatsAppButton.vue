<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { siteData } from '@/constants/site'
import { useWhatsApp } from '@/composables/useWhatsApp'

const panelOpen = ref(false)
const customMessage = ref('')
const { createWhatsAppUrl } = useWhatsApp()

const handleFloatingButton = () => {
  if (!panelOpen.value) {
    panelOpen.value = true
    return
  }
  window.open(
    createWhatsAppUrl(customMessage.value.trim() || siteData.whatsapp.defaultMessage),
    '_blank',
    'noopener,noreferrer',
  )
}

const sendCustomMessage = () => {
  const message = customMessage.value.trim()
  if (!message) return
  window.open(
    createWhatsAppUrl(`Hola, quisiera hacer la siguiente consulta: ${message}`),
    '_blank',
    'noopener,noreferrer',
  )
}

const closePanel = () => {
  panelOpen.value = false
}

const handleEscape = (e) => {
  if (e.key === 'Escape') closePanel()
}

onMounted(() => document.addEventListener('keydown', handleEscape))
onBeforeUnmount(() => document.removeEventListener('keydown', handleEscape))
</script>

<template>
  <Transition name="whatsapp-panel">
    <aside
      v-if="panelOpen"
      id="whatsapp-questions"
      class="whatsapp-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="whatsapp-panel-title"
    >
      <button
        type="button"
        class="whatsapp-panel-close"
        aria-label="Cerrar consultas de WhatsApp"
        @click="closePanel"
      >
        ×
      </button>
      <div class="whatsapp-panel-header">
        <span class="whatsapp-panel-mark" aria-hidden="true">
          <BaseIcon name="whatsapp" :size="28" />
        </span>
        <div>
          <p>{{ siteData.brand.name }}</p>
          <span>En línea</span>
        </div>
      </div>
      <div class="whatsapp-panel-body">
        <h2 id="whatsapp-panel-title">{{ siteData.whatsapp.panelTitle }}</h2>
        <p class="whatsapp-panel-description">{{ siteData.whatsapp.panelDescription }}</p>
        <div class="whatsapp-question-list" aria-label="Preguntas frecuentes por WhatsApp">
          <a
            v-for="q in siteData.whatsapp.questions"
            :key="q.label"
            :href="createWhatsAppUrl(q.message)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{{ q.label }}</span>
            <span aria-hidden="true">›</span>
          </a>
        </div>
        <form class="whatsapp-custom-message" @submit.prevent="sendCustomMessage">
          <label for="whatsapp-custom-message">¿Tienes otra consulta?</label>
          <textarea
            id="whatsapp-custom-message"
            v-model="customMessage"
            maxlength="200"
            rows="3"
            placeholder="Escribe tu mensaje para enviarlo por WhatsApp"
            required
          ></textarea>
          <div class="whatsapp-message-actions">
            <span aria-live="polite">{{ customMessage.length }}/200</span>
            <button type="submit" :disabled="!customMessage.trim()">
              Enviar <span aria-hidden="true">↗</span>
            </button>
          </div>
        </form>
      </div>
    </aside>
  </Transition>

  <button
    type="button"
    class="whatsapp-floating"
    :class="{ 'is-active': panelOpen }"
    :aria-expanded="panelOpen"
    aria-controls="whatsapp-questions"
    :aria-label="panelOpen ? 'Abrir consulta general en WhatsApp' : 'Mostrar consultas frecuentes de WhatsApp'"
    @click="handleFloatingButton"
  >
    <span class="whatsapp-glyph" aria-hidden="true">
      <BaseIcon name="whatsapp" :size="32" />
    </span>
  </button>
</template>

<style scoped>
.whatsapp-panel {
  position: fixed;
  right: 1rem;
  bottom: 5rem;
  z-index: 40;
  width: min(92vw, 24rem);
  background: var(--color-surface-flat);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-flat);
  box-shadow: var(--shadow-modal);
  overflow: hidden;
}
.whatsapp-panel-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  color: var(--color-text-inverse);
  cursor: pointer;
}
.whatsapp-panel-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem 1rem 1rem;
  background: #0D4D2E;
  color: var(--color-text-inverse);
}
.whatsapp-panel-mark svg {
  color: #25D366;
}
.whatsapp-panel-header p {
  font-weight: 700;
}
.whatsapp-panel-header span {
  font-size: 0.85rem;
  opacity: 0.9;
}
.whatsapp-panel-body {
  padding: 1.25rem;
}
.whatsapp-panel-body h2 {
  font-family: var(--font-display);
  color: var(--color-brand-primary);
  margin-bottom: 0.35rem;
}
.whatsapp-panel-description {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.whatsapp-question-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.whatsapp-question-list a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: var(--color-surface-soft);
  border-radius: var(--radius-sm);
  color: var(--color-brand-primary);
  text-decoration: none;
  font-size: 0.9rem;
}
.whatsapp-custom-message {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.whatsapp-custom-message label {
  font-weight: 600;
  font-size: 0.9rem;
}
.whatsapp-custom-message textarea {
  border: 1px solid var(--color-border-flat);
  border-radius: var(--radius-sm);
  padding: 0.5rem;
  font-family: inherit;
  resize: vertical;
  background: var(--color-surface-flat);
}
.whatsapp-message-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.whatsapp-message-actions button {
  background: var(--color-brand-primary);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-brand-primary);
  border-radius: var(--radius-full);
  padding: 0.5rem 1.1rem;
  font-weight: 700;
  cursor: pointer;
}
.whatsapp-message-actions button:hover {
  background: var(--color-brand-primary-light);
  box-shadow: var(--shadow-aero);
}
.whatsapp-message-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}
.whatsapp-floating {
  position: fixed;
  right: 1rem;
  bottom: 1.25rem;
  z-index: 40;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 9999px;
  border: 1px solid var(--aero-border-light);
  cursor: pointer;
  display: grid;
  place-items: center;
  background: var(--aero-secondary-bg);
  box-shadow: var(--shadow-aero);
  transition: transform 0.2s ease;
}
.whatsapp-floating:hover {
  transform: scale(1.06);
}
.whatsapp-floating:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 2px;
}
.whatsapp-glyph {
  color: var(--color-text-inverse);
  display: grid;
  place-items: center;
}
.whatsapp-panel-enter-active,
.whatsapp-panel-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.whatsapp-panel-enter-from,
.whatsapp-panel-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
