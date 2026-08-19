<script setup>
import { reactive, ref, computed } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseIcon from './BaseIcon.vue'
import { useMessenger } from '@/composables/useMessenger'
import { useWhatsApp } from '@/composables/useWhatsApp'

const props = defineProps({
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const { openMessenger } = useMessenger()
const { createWhatsAppUrl } = useWhatsApp()

const form = reactive({
  nombre: '',
  apellido: '',
  documento: '',
  telefono: '',
  email: '',
  mensaje: '',
  acepta: false,
  empresa: '',
})

const errors = ref({})
const submitted = ref(false)
const popupBlocked = ref(false)
const loading = ref(false)

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const isPhonePeru = (v) => /^9\d{8}$/.test(v.replace(/\D/g, ''))
const isDni = (v) => /^\d{8}$/.test(v)

// Anti-spam: bots rellenan campos honeypot ocultos.
const isSpam = () => form.empresa.trim().length > 0

const validate = () => {
  const e = {}
  if (!form.nombre.trim()) e.nombre = 'Ingresa tu nombre.'
  if (!form.apellido.trim()) e.apellido = 'Ingresa tu apellido.'
  if (!form.documento.trim()) e.documento = 'Ingresa tu documento.'
  else if (!isDni(form.documento.trim())) e.documento = 'El documento debe tener 8 dígitos.'
  if (!form.telefono.trim()) e.telefono = 'Ingresa tu teléfono.'
  else if (!isPhonePeru(form.telefono)) e.telefono = 'Ingresa un teléfono válido (9 dígitos).'
  if (!form.email.trim()) e.email = 'Ingresa tu correo.'
  else if (!isEmail(form.email.trim())) e.email = 'Ingresa un correo válido.'
  if (!form.acepta) e.acepta = 'Debes aceptar los términos y políticas.'
  errors.value = e
  return Object.keys(e).length === 0
}

const messengerUrl = computed(() =>
  `https://m.me/${import.meta.env.VITE_MESSENGER_PAGE || 'UrbanikawsayInmobiliaria'}?text=${encodeURIComponent(
    `Hola, soy ${form.nombre} ${form.apellido}. Quiero separar un lote.\nDNI: ${form.documento}\nTeléfono: ${form.telefono}\nEmail: ${form.email}${form.mensaje ? `\nMensaje: ${form.mensaje}` : ''}`.slice(0, 1500),
  )}`,
)

const whatsappUrl = computed(() =>
  createWhatsAppUrl(`Hola, soy ${form.nombre} ${form.apellido}. Quiero separar un lote (${form.telefono}).`),
)

const handleSubmit = () => {
  if (!validate() || isSpam()) return
  loading.value = true
  popupBlocked.value = false
  submitted.value = true
  const win = openMessenger({
    nombre: `${form.nombre} ${form.apellido}`,
    email: form.email,
    telefono: form.telefono,
    mensaje: `Quiero separar un lote. DNI: ${form.documento}${form.mensaje ? `\n${form.mensaje}` : ''}`,
    origen: 'urbanikawsay.com - Separación de lote',
  })
  if (!win) popupBlocked.value = true
  loading.value = false
}

const errorFor = (key) => computed(() => errors.value[key] || '')
</script>

<template>
  <BaseModal
    :open="open"
    title="Separa tu lote"
    labelled-by="reserve-lot-title"
    @close="emit('close')"
  >
    <form class="reserve-form" @submit.prevent="handleSubmit">
      <div class="field-row">
        <div class="field">
          <label for="rl-nombre">Nombre</label>
          <input id="rl-nombre" v-model="form.nombre" type="text" required
            :aria-invalid="!!errors.nombre" aria-describedby="rl-nombre-err" />
          <p v-if="errors.nombre" id="rl-nombre-err" class="field-error">{{ errors.nombre }}</p>
        </div>
        <div class="field">
          <label for="rl-apellido">Apellido</label>
          <input id="rl-apellido" v-model="form.apellido" type="text" required
            :aria-invalid="!!errors.apellido" aria-describedby="rl-apellido-err" />
          <p v-if="errors.apellido" id="rl-apellido-err" class="field-error">{{ errors.apellido }}</p>
        </div>
      </div>
      <div class="field">
        <label for="rl-doc">Nro. de documento</label>
        <input id="rl-doc" v-model="form.documento" type="text" inputmode="numeric" required
          :aria-invalid="!!errors.documento" aria-describedby="rl-doc-err" />
        <p v-if="errors.documento" id="rl-doc-err" class="field-error">{{ errors.documento }}</p>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="rl-tel">Teléfono</label>
          <input id="rl-tel" v-model="form.telefono" type="tel" inputmode="numeric" required
            :aria-invalid="!!errors.telefono" aria-describedby="rl-tel-err" />
          <p v-if="errors.telefono" id="rl-tel-err" class="field-error">{{ errors.telefono }}</p>
        </div>
        <div class="field">
          <label for="rl-email">Correo electrónico</label>
          <input id="rl-email" v-model="form.email" type="email" required
            :aria-invalid="!!errors.email" aria-describedby="rl-email-err" />
          <p v-if="errors.email" id="rl-email-err" class="field-error">{{ errors.email }}</p>
        </div>
      </div>
      <div class="field">
        <label for="rl-msg">Cómo podemos ayudarte (opcional)</label>
        <textarea id="rl-msg" v-model="form.mensaje" rows="3"></textarea>
      </div>
      <div class="field-honeypot" aria-hidden="true">
        <label for="rl-empresa">Empresa (no rellenar)</label>
        <input id="rl-empresa" v-model="form.empresa" type="text" tabindex="-1" autocomplete="off" />
      </div>
      <label class="check" :class="{ 'check-error': errors.acepta }">
        <input v-model="form.acepta" type="checkbox" required />
        <span>He leído y acepto los Términos y condiciones y las Políticas de privacidad de Urbanikawsay Inmobiliaria.</span>
      </label>
      <p v-if="errors.acepta" class="field-error">{{ errors.acepta }}</p>
      <button type="submit" class="btn-aero btn-aero-primary submit-btn" :disabled="loading">
        <BaseIcon name="messenger" :size="16" decorative />
        {{ loading ? 'Enviando…' : 'Enviar por Messenger' }}
      </button>
      <div v-if="submitted" class="form-success" role="status" aria-live="polite">
        <template v-if="!popupBlocked">
          <strong>¡Ya casi! Se abrió Messenger con tu solicitud.</strong><br />
          Pulsa <strong>Enviar</strong> dentro de Messenger para que llegue a nuestro buzón.
          <a :href="messengerUrl" target="_blank" rel="noopener noreferrer" class="success-link">Reabrir Messenger</a>
        </template>
        <template v-else>
          <strong>Tu navegador bloqueó la ventana de Messenger.</strong><br />
          <a :href="messengerUrl" target="_blank" rel="noopener noreferrer" class="success-link">Abrir Messenger y enviar</a>
          <br />
          ¿Prefieres WhatsApp?
          <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="success-link">Escríbenos por WhatsApp</a>
        </template>
      </div>
    </form>
  </BaseModal>
</template>

<style scoped>
.reserve-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.check {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-weight: 400;
}
.check-error {
  color: var(--color-error);
}
.submit-btn {
  align-self: flex-start;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.submit-btn:disabled {
  opacity: 0.65;
  cursor: wait;
}
.field-honeypot {
  position: absolute !important;
  left: -9999px !important;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}
.success-link {
  color: var(--color-brand-secondary);
  font-weight: 700;
  text-decoration: underline;
  display: inline-block;
  margin-top: 0.35rem;
}

</style>
