<script setup>
import { reactive, ref, computed } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const form = reactive({
  nombre: '',
  apellido: '',
  documento: '',
  telefono: '',
  email: '',
  mensaje: '',
  acepta: false,
})

const errors = ref({})
const submitted = ref(false)

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const isPhonePeru = (v) => /^9\d{8}$/.test(v.replace(/\D/g, ''))
const isDni = (v) => /^\d{8}$/.test(v)

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

const handleSubmit = () => {
  if (!validate()) return
  submitted.value = true
  const body = `Nombre: ${form.nombre} ${form.apellido}\nDocumento: ${form.documento}\nTeléfono: ${form.telefono}\nEmail: ${form.email}\nMensaje: ${form.mensaje}\n`
  window.location.href = `mailto:contacto@urbanikawsay.com?subject=Separación de lote - ${form.nombre} ${form.apellido}&body=${encodeURIComponent(body)}`
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
      <label class="check" :class="{ 'check-error': errors.acepta }">
        <input v-model="form.acepta" type="checkbox" required />
        <span>He leído y acepto los Términos y condiciones y las Políticas de privacidad de Urbanikawsay Inmobiliaria.</span>
      </label>
      <p v-if="errors.acepta" class="field-error">{{ errors.acepta }}</p>
      <button type="submit" class="btn-aero btn-aero-primary submit-btn">Enviar solicitud</button>
      <p v-if="submitted" class="form-success" aria-live="polite">
        Gracias. Se abrirá tu cliente de correo para completar el envío.
      </p>
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
}
</style>
