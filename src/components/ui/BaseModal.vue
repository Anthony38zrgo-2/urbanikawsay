<script setup>
import { watch, onMounted, onBeforeUnmount, nextTick, ref } from 'vue'
import { useScrollLock } from '@/composables/useScrollLock'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
  labelledBy: { type: String, default: '' },
})

const emit = defineEmits(['close'])
const { lock, unlock } = useScrollLock()
const dialogRef = ref(null)
const lastFocused = ref(null)

const handleKeydown = (e) => {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'Tab') trapFocus(e)
}

const trapFocus = (e) => {
  const focusables = dialogRef.value.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
  )
  if (!focusables.length) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

watch(
  () => props.open,
  async (val) => {
    if (val) {
      lastFocused.value = document.activeElement
      lock()
      await nextTick()
      const firstFocusable = dialogRef.value.querySelector(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      )
      ;(firstFocusable || dialogRef.value).focus()
    } else {
      unlock()
      if (lastFocused.value) lastFocused.value.focus()
    }
  },
)

onMounted(() => document.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  unlock()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-overlay" @click.self="emit('close')">
        <div
          ref="dialogRef"
          class="modal-dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="labelledBy || undefined"
          :aria-label="labelledBy ? undefined : title"
        >
          <header class="modal-header">
            <h2 :id="labelledBy || undefined" v-if="title" class="modal-title">
              {{ title }}
            </h2>
            <button
              type="button"
              class="modal-close"
              aria-label="Cerrar"
              @click="emit('close')"
            >
              ×
            </button>
          </header>
          <div class="modal-body">
            <slot />
          </div>
          <footer v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(9 46 28 / 0.55);
  padding: 1rem;
}

.modal-dialog {
  width: 100%;
  max-width: 40rem;
  max-height: 85vh;
  overflow-y: auto;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.modal-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-brand-primary);
}

.modal-close {
  font-size: 1.75rem;
  line-height: 1;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}
.modal-close:hover {
  color: var(--color-brand-primary);
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem 1.5rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active .modal-dialog,
.modal-leave-active .modal-dialog {
  transition: transform 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-dialog,
.modal-leave-to .modal-dialog {
  transform: scale(0.96) translateY(8px);
}
</style>
