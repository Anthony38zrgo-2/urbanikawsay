<script setup>
import { reactive, ref } from 'vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import { siteData } from '@/constants/site'
import { imageAssets } from '@/assets/generated/image-assets.js'

const baniAsset = imageAssets['mascota-bani-v2.png']
const detalleAsset = imageAssets['detalle-contacto.png']

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
    <!-- Capa de Paisaje Inmobiliario en el lateral izquierdo de la sección -->
    <div class="contact-landscape-bg" aria-hidden="true">
      <ResponsiveImage
        :asset="detalleAsset"
        alt=""
        picture-class="landscape-picture"
        img-class="landscape-img"
        sizes="(min-width: 768px) 540px, 100vw"
        loading="lazy"
      />
      <!-- Máscara degradada y curva hacia el fondo crema -->
      <div class="landscape-mask"></div>
    </div>

    <!-- Curva verde decorativa superior de marca -->
    <svg class="contact-top-curve" viewBox="0 0 500 250" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M-50,0 C120,40 240,120 280,250" stroke="#0D4D2E" stroke-width="26" stroke-linecap="round" />
    </svg>

    

    <div class="container-page contact-container">
      <div class="contact-grid">
        <!-- Columna Izquierda: Mascota Bani + Información de Contacto -->
        <div class="contact-left-col">
          <!-- Mascota Bani de pie sobre el lateral izquierdo -->
          <aside class="contact-mascot" aria-label="Bani, mascota oficial de Urbanikawsay">
            <ResponsiveImage
              :asset="baniAsset"
              alt="Bani, mascota de Urbanikawsay con casco y chaleco de seguridad"
              picture-class="mascot-picture"
              img-class="mascot-img"
              sizes="(min-width: 1200px) 340px, (min-width: 768px) 280px, 220px"
              loading="lazy"
            />
          </aside>

          <!-- Textos y canales de contacto -->
          <div class="contact-info-content">
            <div class="section-header contact-header">
              <p class="section-eyebrow">Contáctanos</p>
              <h2 id="contact-title" class="section-title contact-heading">¡Llama ya!</h2>
              <p class="section-lead contact-lead">
                ¡Aprovecha esta oportunidad de inversión en un terreno de 120 m² junto
                al mega puerto y disfruta de los beneficios de invertir cerca de uno de
                los mejores proyectos de la década!
              </p>
            </div>

            <ul class="list-contact-modern">
              <li class="contact-item">
                <div class="icon-circle-badge">
                  <BaseIcon name="phone" :size="18" decorative />
                </div>
                <div class="contact-item-text">
                  <span class="label">Teléfonos</span>
                  <div class="phones-line">
                    <a :href="`tel:+${siteData.contact.phoneMainIntl}`">{{ siteData.contact.phoneMain }}</a>
                    <span class="phone-sep">·</span>
                    <a :href="`tel:+51926353563`">{{ siteData.contact.phoneSecondary }}</a>
                  </div>
                </div>
              </li>

              <li class="contact-item">
                <div class="icon-circle-badge">
                  <BaseIcon name="mail" :size="18" decorative />
                </div>
                <div class="contact-item-text">
                  <span class="label">Correo</span>
                  <a :href="`mailto:${siteData.contact.email}`">{{ siteData.contact.email }}</a>
                </div>
              </li>

              <li class="contact-item">
                <div class="icon-circle-badge">
                  <BaseIcon name="location" :size="18" decorative />
                </div>
                <div class="contact-item-text">
                  <span class="label">Dirección</span>
                  <span>{{ siteData.contact.address1 }}</span>
                </div>
              </li>

              <li class="contact-item">
                <div class="icon-circle-badge">
                  <BaseIcon name="clock" :size="18" decorative />
                </div>
                <div class="contact-item-text">
                  <span class="label">Horario</span>
                  <span>Lun – Vie: 9:00 a.m. a 5:00 p.m.</span>
                  <span>Sáb: 9:00 a.m. a 1:00 p.m.</span>
                </div>
              </li>
            </ul>

            <!-- Slogan Pill de Confianza -->
            <div class="contact-slogan-pill">
              <div class="slogan-icon">
                <BaseIcon name="check" :size="14" decorative />
              </div>
              <p class="slogan-text">
                Invertir hoy, es asegurar <span class="slogan-highlight">tu futuro.</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Columna Derecha: Tarjeta de Formulario Flotante -->
        <div class="contact-right-col">
          <form class="contact-form-card" @submit.prevent="handleSubmit">
            <div class="form-header">
              <div class="form-icon-badge">
                <BaseIcon name="chat" :size="24" decorative />
              </div>
              <div class="form-title-group">
                <h3 class="form-title">Envíanos tu consulta</h3>
                <span class="form-title-accent" aria-hidden="true"></span>
              </div>
            </div>

            <div class="field-group">
              <div class="field-item">
                <label for="ct-nombre" class="field-label">
                  <BaseIcon name="user" :size="16" decorative />
                  <span>Nombre</span>
                </label>
                <input
                  id="ct-nombre"
                  v-model="form.nombre"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  required
                  :aria-invalid="!!errors.nombre"
                  aria-describedby="ct-nombre-err"
                  class="field-input"
                />
                <p v-if="errors.nombre" id="ct-nombre-err" class="field-error">{{ errors.nombre }}</p>
              </div>

              <div class="field-item">
                <label for="ct-email" class="field-label">
                  <BaseIcon name="mail" :size="16" decorative />
                  <span>Correo electrónico</span>
                </label>
                <input
                  id="ct-email"
                  v-model="form.email"
                  type="email"
                  placeholder="Ej: juanperez@email.com"
                  required
                  :aria-invalid="!!errors.email"
                  aria-describedby="ct-email-err"
                  class="field-input"
                />
                <p v-if="errors.email" id="ct-email-err" class="field-error">{{ errors.email }}</p>
              </div>

              <div class="field-item">
                <label for="ct-tel" class="field-label">
                  <BaseIcon name="phone" :size="16" decorative />
                  <span>Teléfono</span>
                </label>
                <input
                  id="ct-tel"
                  v-model="form.telefono"
                  type="tel"
                  placeholder="Ej: 987 654 321"
                  class="field-input"
                />
              </div>

              <div class="field-item">
                <label for="ct-msg" class="field-label">
                  <BaseIcon name="edit" :size="16" decorative />
                  <span>Mensaje</span>
                </label>
                <textarea
                  id="ct-msg"
                  v-model="form.mensaje"
                  rows="4"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                  :aria-invalid="!!errors.mensaje"
                  aria-describedby="ct-msg-err"
                  class="field-input field-textarea"
                ></textarea>
                <p v-if="errors.mensaje" id="ct-msg-err" class="field-error">{{ errors.mensaje }}</p>
              </div>
            </div>

            <!-- Botón de Envío Naranja Vibrante con Ícono Send -->
            <button type="submit" class="btn-submit-orange">
              <BaseIcon name="send" :size="18" decorative />
              <span>Enviar mensaje</span>
            </button>

            <!-- Nota de Privacidad y Seguridad -->
            <div class="form-security-note">
              <BaseIcon name="lock" :size="14" decorative />
              <span>Tu información está segura con nosotros.</span>
            </div>

            <p v-if="submitted" class="form-success" aria-live="polite">
              Gracias. Se abrirá tu cliente de correo para completar el envío.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  position: relative;
  background: var(--color-surface);
  overflow: hidden;
}

@media (min-width: 900px) {
  .contact-section {
    padding-block: clamp(2.5rem, 4vw, 4rem);
  }
}

/* Paisaje de fondo del lado izquierdo */
.contact-landscape-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

@media (min-width: 768px) {
  .contact-landscape-bg {
    width: clamp(360px, 43vw, 620px);
  }
}

:deep(.landscape-picture) {
  display: block;
  width: 100%;
  height: 100%;
}

:deep(.landscape-img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left center;
  opacity: 1;
}

.landscape-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(253, 252, 247, 0) 0%,
    rgba(253, 252, 247, 0.12) 45%,
    rgba(253, 252, 247, 0.72) 75%,
    #FDFCF7 100%
  ),
  linear-gradient(
    to bottom,
    rgba(253, 252, 247, 0.1) 0%,
    rgba(253, 252, 247, 0) 40%,
    rgba(253, 252, 247, 0.7) 100%
  );
}

@media (max-width: 767px) {
  .landscape-mask {
    background: linear-gradient(
      to bottom,
      rgba(253, 252, 247, 0.3) 0%,
      rgba(253, 252, 247, 0.88) 50%,
      #FDFCF7 100%
    );
  }
}

/* Curva verde superior */
.contact-top-curve {
  position: absolute;
  top: -10px;
  left: clamp(80px, 12vw, 220px);
  width: clamp(240px, 28vw, 420px);
  height: auto;
  pointer-events: none;
  z-index: 1;
  display: none;
}

.contact-container {
  position: relative;
  z-index: 2;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: start;
}

@media (min-width: 992px) {
  .contact-grid {
    grid-template-columns: 1.4fr 1fr;
    gap: 3.5rem;
  }
}

@media (min-width: 1200px) {
  .contact-grid {
    grid-template-columns: 320px minmax(250px, 1fr) 340px;
    gap: 1.25rem;
    align-items: center;
  }

  .contact-left-col {
    display: contents;
  }
}

/* Columna Izquierda: Mascota y Textos */
.contact-left-col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 640px) {
  .contact-left-col {
    display: grid;
    grid-template-columns: minmax(180px, 260px) 1fr;
    gap: 2rem;
    align-items: flex-end;
  }
}

@media (min-width: 1200px) {
  .contact-left-col {
    grid-template-columns: 290px 1fr;
    gap: 2.5rem;
  }
}

.contact-mascot {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-shrink: 0;
  width: 12rem;
  margin-inline: auto;
}

@media (min-width: 640px) {
  .contact-mascot {
    width: 100%;
    max-width: 280px;
    margin-inline: 0;
  }
}

@media (min-width: 1200px) {
  .contact-mascot {
    grid-column: 1;
    width: 320px;
    max-width: 320px;
    justify-self: start;
    align-self: end;
  }
}

:deep(.mascot-picture) {
  display: block;
  width: 100%;
}

:deep(.mascot-img) {
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 16px 32px rgba(9, 46, 28, 0.28));
  transition: transform 0.3s ease;
}

.contact-mascot:hover :deep(.mascot-img) {
  transform: translateY(-6px) scale(1.02);
}

.contact-info-content {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

@media (min-width: 1200px) {
  .contact-info-content {
    grid-column: 2;
    max-width: 340px;
    justify-self: start;
  }
}

.contact-header {
  margin-bottom: 0;
}

.contact-heading {
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  font-weight: 800;
  color: var(--color-brand-primary);
  line-height: 1.08;
  margin-top: 0.25rem;
}

.contact-lead {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

/* Lista de Contacto */
.list-contact-modern {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
}

.icon-circle-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 9999px;
  background: #FFFFFF;
  border: 1px solid rgba(46, 170, 77, 0.35);
  box-shadow: 0 2px 8px rgba(13, 77, 46, 0.06);
  color: var(--color-brand-secondary);
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.contact-item-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.9rem;
}

.contact-item-text .label {
  font-weight: 700;
  color: var(--color-brand-primary);
  font-size: 0.85rem;
  text-transform: capitalize;
}

.contact-item-text a {
  color: var(--color-text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-item-text a:hover {
  color: var(--color-brand-secondary);
  text-decoration: underline;
}

.contact-item-text span {
  color: var(--color-text-primary);
}

.phones-line {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.phone-sep {
  color: var(--color-text-secondary);
}

/* Slogan Pill de Confianza */
.contact-slogan-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #0B331F;
  color: #FFFFFF;
  padding: 0.45rem 1.15rem 0.45rem 0.55rem;
  border-radius: 9999px;
  box-shadow: 0 4px 14px rgba(11, 51, 31, 0.25);
  align-self: flex-start;
  margin-top: 0.5rem;
}

.slogan-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.15);
  color: #7ED957;
}

.slogan-text {
  font-size: 0.82rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.01em;
}

.slogan-highlight {
  color: #7ED957;
  font-weight: 700;
}

/* Columna Derecha: Tarjeta de Formulario */
.contact-form-card {
  background: #FFFFFF;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 14px 40px -8px rgba(13, 77, 46, 0.09), 0 4px 14px -2px rgba(13, 77, 46, 0.05);
  border: 1px solid rgba(213, 221, 210, 0.6);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .contact-form-card {
    padding: 2.25rem;
  }
}

@media (min-width: 1200px) {
  .contact-right-col {
    grid-column: 3;
  }

  .contact-form-card {
    padding: 1.25rem;
    gap: 0.6rem;
    border-radius: 1.25rem;
  }

  .field-group {
    gap: 0.5rem;
  }

  .field-item {
    gap: 0.25rem;
  }

  .field-input {
    padding-block: 0.38rem;
    font-size: 0.82rem;
  }

  .field-textarea {
    min-height: 3.25rem;
  }

  .btn-submit-orange {
    padding-block: 0.55rem;
    font-size: 0.86rem;
  }
}

.form-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 0.25rem;
}

.form-icon-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.85rem;
  background: var(--color-brand-primary);
  color: #FFFFFF;
  flex-shrink: 0;
}

.form-title-group {
  display: flex;
  flex-direction: column;
}

.form-title {
  font-family: var(--font-display);
  color: var(--color-brand-primary);
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.form-title-accent {
  width: 2.5rem;
  height: 3px;
  background: var(--color-accent);
  border-radius: 9999px;
  margin-top: 0.35rem;
}

/* Campos */
.field-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.field-label svg {
  color: var(--color-text-secondary);
}

.field-input {
  width: 100%;
  border: 1px solid #D5DDD2;
  border-radius: 0.65rem;
  padding: 0.75rem 0.95rem;
  font-family: inherit;
  font-size: 0.92rem;
  background: #FFFFFF;
  color: var(--color-text-primary);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field-input::placeholder {
  color: #9CA3AF;
}

.field-input:hover {
  border-color: var(--color-border-strong);
}

.field-input:focus {
  border-color: var(--color-brand-secondary);
  box-shadow: 0 0 0 3px rgba(46, 170, 77, 0.15);
}

.field-textarea {
  resize: vertical;
  min-height: 5.5rem;
}

.field-error {
  font-size: 0.8rem;
  color: var(--color-error);
  margin-top: 0.15rem;
}

/* Botón Naranja Vibrante */
.btn-submit-orange {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 9999px;
  background: linear-gradient(90deg, #FF7A00 0%, #FFA800 100%);
  color: #FFFFFF;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px -4px rgba(255, 122, 0, 0.45);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  margin-top: 0.25rem;
}

.btn-submit-orange:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -4px rgba(255, 122, 0, 0.55);
  filter: brightness(1.04);
}

.btn-submit-orange:active {
  transform: translateY(0);
  box-shadow: 0 4px 10px -2px rgba(255, 122, 0, 0.4);
}

/* Nota de Seguridad */
.form-security-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  font-size: 0.8rem;
  color: #4B6354;
  text-align: center;
}

.form-security-note svg {
  color: var(--color-brand-secondary);
  flex-shrink: 0;
}

.form-success {
  font-size: 0.88rem;
  color: var(--color-brand-primary);
  background: var(--color-surface-soft);
  border: 1px solid rgba(46, 170, 77, 0.3);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
}

@media (min-width: 1200px) {
  .contact-info-content {
    max-width: 360px;
  }

  .contact-heading {
    font-size: 2.65rem;
  }

  .form-icon-badge {
    width: 2.35rem;
    height: 2.35rem;
  }

  .form-title {
    font-size: 1.1rem;
  }

  .field-group {
    gap: 0.5rem;
  }

  .field-item {
    gap: 0.25rem;
  }

  .field-label {
    font-size: 0.76rem;
  }

  .field-input {
    padding-block: 0.38rem;
    font-size: 0.82rem;
  }

  .field-textarea {
    min-height: 3.25rem;
  }

  .form-security-note {
    font-size: 0.72rem;
  }

  .btn-submit-orange {
    padding-block: 0.55rem;
    font-size: 0.86rem;
  }
}

/* La referencia usa una composición panorámica continua en escritorio. */
@media (min-width: 900px) {
  .contact-grid {
    grid-template-columns: 1.15fr 1fr 1.4fr;
    gap: 1rem;
    align-items: center;
  }

  .contact-left-col {
    display: contents;
  }

  .contact-mascot {
    grid-column: 1;
    width: 100%;
    max-width: 360px;
    justify-self: start;
    align-self: end;
  }

  .contact-info-content {
    grid-column: 2;
    width: 100%;
    max-width: 290px;
    justify-self: start;
    gap: 1.1rem;
  }

  .contact-heading {
    font-size: 2.6rem;
    white-space: nowrap;
  }

  .contact-lead {
    font-size: 0.85rem;
    line-height: 1.48;
  }

  .contact-right-col {
    grid-column: 3;
    width: 100%;
    max-width: 400px;
    justify-self: end;
  }

  .contact-form-card {
    padding: 1.5rem;
    gap: 0.9rem;
    border-radius: 1.25rem;
  }

  .form-icon-badge {
    width: 2.5rem;
    height: 2.5rem;
  }

  .form-title {
    font-size: 1.3rem;
  }

  .field-group {
    gap: 0.75rem;
  }

  .field-item {
    gap: 0.3rem;
  }

  .field-label {
    font-size: 0.78rem;
  }

  .field-input {
    padding-block: 0.55rem;
    font-size: 0.84rem;
  }

  .field-textarea {
    min-height: 4.5rem;
  }

  .btn-submit-orange {
    padding-block: 0.7rem;
    font-size: 0.9rem;
  }

  .form-security-note {
    font-size: 0.72rem;
  }
}
</style>
