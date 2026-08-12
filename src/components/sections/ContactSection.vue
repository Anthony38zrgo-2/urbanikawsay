<script setup>
import { reactive, ref } from 'vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { siteData } from '@/constants/site'

const form = reactive({ nombre: '', email: '', telefono: '', mensaje: '' })
const errors = ref({})
const submitted = ref(false)

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const validate = () => {
  const e = {}
  if (!form.nombre.trim()) e.nombre = 'Ingresa tu nombre.'
  if (!form.email.trim()) e.email = 'Ingresa tu correo.'
  else if (!isEmail(form.email.trim())) e.email = 'Ingresa un correo válido.'
  if (!form.mensaje.trim()) e.mensaje = 'Escribe tu mensaje.'
  errors.value = e
  return Object.keys(e).length === 0
}

const handleSubmit = () => {
  if (!validate()) return
  submitted.value = true
  const body = `Nombre: ${form.nombre}\nTeléfono: ${form.telefono}\nEmail: ${form.email}\nMensaje: ${form.mensaje}\n`
  window.location.href = `mailto:${siteData.contact.email}?subject=Consulta - ${form.nombre}&body=${encodeURIComponent(body)}`
}
</script>

<template>
  <section id="contacto" class="section-pad contact-section anchor-offset" aria-labelledby="contact-title">
    <div class="container-page">
      <div class="contact-grid">
        <div class="contact-info">
          <div class="section-header">
            <p class="section-eyebrow">Contáctanos</p>
            <h2 id="contact-title" class="section-title">¡Llama ya!</h2>
            <p class="section-lead">
              ¡Aprovecha esta oportunidad de inversión en un terreno de 120 m² junto
              al mega puerto y disfruta de los beneficios de invertir cerca de uno de
              los mejores proyectos de la década!
            </p>
          </div>
          <ul class="list-contact">
            <li>
              <BaseIcon name="phone" decorative />
              <div>
                <span class="label">Teléfonos</span>
                <a :href="`tel:+${siteData.contact.phoneMainIntl}`">{{ siteData.contact.phoneMain }}</a>
                <span> · </span>
                <a :href="`tel:+${siteData.contact.phoneMainIntl}`">{{ siteData.contact.phoneSecondary }}</a>
              </div>
            </li>
            <li>
              <BaseIcon name="mail" decorative />
              <div>
                <span class="label">Correo</span>
                <a :href="`mailto:${siteData.contact.email}`">{{ siteData.contact.email }}</a>
              </div>
            </li>
            <li>
              <BaseIcon name="location" decorative />
              <div>
                <span class="label">Dirección</span>
                <span>{{ siteData.contact.address1 }}</span>
              </div>
            </li>
            <li>
              <BaseIcon name="clock" decorative />
              <div>
                <span class="label">Horario</span>
                <span>{{ siteData.contact.schedule }}</span>
              </div>
            </li>
          </ul>
        </div>

        <form class="contact-form card" @submit.prevent="handleSubmit">
          <h3 class="form-title">Envíanos tu consulta</h3>
          <div class="field">
            <label for="ct-nombre">Nombre</label>
            <input id="ct-nombre" v-model="form.nombre" type="text" required
              :aria-invalid="!!errors.nombre" aria-describedby="ct-nombre-err" />
            <p v-if="errors.nombre" id="ct-nombre-err" class="field-error">{{ errors.nombre }}</p>
          </div>
          <div class="field">
            <label for="ct-email">Correo electrónico</label>
            <input id="ct-email" v-model="form.email" type="email" required
              :aria-invalid="!!errors.email" aria-describedby="ct-email-err" />
            <p v-if="errors.email" id="ct-email-err" class="field-error">{{ errors.email }}</p>
          </div>
          <div class="field">
            <label for="ct-tel">Teléfono</label>
            <input id="ct-tel" v-model="form.telefono" type="tel" />
          </div>
          <div class="field">
            <label for="ct-msg">Mensaje</label>
            <textarea id="ct-msg" v-model="form.mensaje" rows="4" required
              :aria-invalid="!!errors.mensaje" aria-describedby="ct-msg-err"></textarea>
            <p v-if="errors.mensaje" id="ct-msg-err" class="field-error">{{ errors.mensaje }}</p>
          </div>
          <button type="submit" class="btn-aero btn-aero-primary submit-btn">Enviar mensaje</button>
          <p v-if="submitted" class="form-success" aria-live="polite">
            Gracias. Se abrirá tu cliente de correo para completar el envío.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: var(--color-surface);
}
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-block);
}
@media (min-width: 900px) {
  .contact-grid { grid-template-columns: 1fr 1fr; }
}
.contact-form {
  padding: var(--space-stack);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-title {
  font-family: var(--font-display);
  color: var(--color-brand-primary);
  font-size: var(--text-heading-lg);
  margin-bottom: 0.5rem;
}
.submit-btn {
  cursor: pointer;
  align-self: flex-start;
}
</style>
