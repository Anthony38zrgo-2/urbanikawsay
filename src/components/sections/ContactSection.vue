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
          <h2 id="contact-title" class="contact-heading">¡Llama ya!</h2>
          <p class="contact-sub">
            ¡Aprovecha esta oportunidad de inversión en un terreno de 120 m² junto
            al mega puerto y disfruta de los beneficios de invertir cerca de uno de
            los mejores proyectos de la década!
          </p>
          <ul class="contact-list">
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
          <h3 class="form-title">Contáctanos</h3>
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
          <p v-if="submitted" class="success-msg" aria-live="polite">
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
  gap: 2.5rem;
}
@media (min-width: 900px) {
  .contact-grid { grid-template-columns: 1fr 1fr; }
}
.contact-heading {
  font-family: var(--font-display);
  color: var(--color-brand-primary);
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
}
.contact-sub {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 1.75rem;
}
.contact-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.contact-list li {
  display: flex;
  gap: 0.9rem;
  color: var(--color-brand-primary);
}
.contact-list li > svg {
  flex-shrink: 0;
  margin-top: 0.15rem;
}
.contact-list li > div {
  display: flex;
  flex-direction: column;
}
.contact-list .label {
  font-weight: 700;
  color: var(--color-text-primary);
}
.contact-list a {
  color: var(--color-brand-primary);
  text-decoration: none;
}
.contact-list a:hover {
  text-decoration: underline;
}
.contact-form {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-title {
  font-family: var(--font-display);
  color: var(--color-brand-primary);
  font-size: 1.4rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.field label {
  font-weight: 600;
  font-size: 0.9rem;
}
.field input,
.field textarea {
  border: 1px solid var(--color-border-flat);
  border-radius: var(--radius-sm);
  padding: 0.6rem 0.75rem;
  font-family: inherit;
  font-size: 0.95rem;
  background: var(--color-surface-flat);
  color: var(--color-text-primary);
}
.field input:focus-visible,
.field textarea:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 1px;
  border-color: transparent;
}
.field-error {
  color: var(--color-error);
  font-size: 0.8rem;
}
.submit-btn {
  cursor: pointer;
  align-self: flex-start;
}
.success-msg {
  color: var(--color-success);
  font-size: 0.9rem;
}
</style>
