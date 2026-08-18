<script setup>
import { ref } from 'vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import fortaleza01 from '@/assets/images/fortaleza/fortaleza-01.jpg'
import fortaleza02 from '@/assets/images/fortaleza/fortaleza-02.jpg'
import fortaleza03 from '@/assets/images/fortaleza/fortaleza-03.jpg'
import fortaleza04 from '@/assets/images/fortaleza/fortaleza-04.jpg'
import fortaleza05 from '@/assets/images/fortaleza/fortaleza-05.jpg'

const backgroundSlides = [
  {
    src: fortaleza01,
    alt: 'Trazado general y habilitación urbana de lotes de terreno',
  },
  {
    src: fortaleza02,
    alt: 'Delimitación de lotes y módulos de atención en campo',
  },
  {
    src: fortaleza03,
    alt: 'Infraestructura vial, electrificación y lotización',
  },
  {
    src: fortaleza04,
    alt: 'Panorámica aérea de lotes y visitas guiadas',
  },
  {
    src: fortaleza05,
    alt: 'Avenida principal y distribución de manzanas residenciales',
  },
]

const activeTab = ref('mision')

const values = [
  { title: 'Experiencia Probada', text: 'Con años de trayectoria exitosa, nuestra experiencia sólida es tu garantía de recibir servicios inmobiliarios de calidad.' },
  { title: 'Compromiso Inquebrantable', text: 'Nuestra dedicación incansable a la satisfacción del cliente garantiza que trabajaremos para cumplir tus expectativas.' },
  { title: 'Énfasis en la Transparencia', text: 'La transparencia en todas nuestras transacciones fortalece la confianza y brinda seguridad en cada paso.' },
  { title: 'Red de Expertos', text: 'Contamos con una red de profesionales que garantiza que tengas a los mejores respaldándote en cada decisión.' },
]

const attributes = [
  { title: 'Personalización Excepcional', text: 'Creamos espacios que reflejan tu estilo único y transforman tu visión en una realidad tangible.' },
  { title: 'Sostenibilidad Integrada', text: 'Diseñamos con conciencia ambiental, incorporando soluciones sostenibles para tu hogar.' },
  { title: 'Innovación en Diseño', text: 'Abrazamos las últimas tendencias para que tu hogar sea estéticamente impresionante y funcional.' },
  { title: 'Experiencia sin Preocupaciones', text: 'Un proceso sin complicaciones, desde la concepción hasta la entrega. Cuidamos todos los detalles.' },
]

const tabs = [
  { id: 'mision', label: 'Nuestra Misión', heading: 'Transformamos terrenos en ventajas financieras', text: 'Convertimos aspiraciones en realidad. Hacemos que tus ideas y proyectos sean realidad. Únete a nuestra oportunidad de invertir.' },
  { id: 'vision', label: 'Nuestra Visión', heading: 'Nuestra visión para tu terreno soñado', text: 'Aspiramos a ser arquitectos de sueños, construyendo un futuro donde cada familia encuentre el espacio perfecto para sus aspiraciones y proyectos.' },
]
</script>

<template>
  <section class="section-pad values-section" aria-labelledby="values-title">
    <div class="values-bg-layer" aria-hidden="true">
      <div class="values-slider">
        <figure
          v-for="(slide, index) in backgroundSlides"
          :key="index"
          class="values-slide"
          :style="{ '--i': index }"
        >
          <img
            :src="slide.src"
            :alt="slide.alt"
            class="values-slide-img animate-kenburns"
            :loading="index === 0 ? 'eager' : 'lazy'"
          />
        </figure>
      </div>
      <div class="values-overlay"></div>
    </div>

    <div class="container-page values-content">
      <div class="section-header section-header--center">
        <p class="section-eyebrow">Nuestra fortaleza</p>
        <h2 id="values-title" class="section-title">Nuestra fortaleza, tu garantía</h2>
        <p class="section-lead">Dando forma a sonrisas en cada terreno. Felices hogares, paso a paso.</p>
      </div>

      <div class="tabs-pill" role="tablist" aria-label="Misión y visión">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :id="`tab-${tab.id}`"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab.id"
          :aria-controls="`panel-${tab.id}`"
          :tabindex="activeTab === tab.id ? 0 : -1"
          :class="{ 'tab-pill': true, 'is-active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :id="`panel-${tab.id}`"
        role="tabpanel"
        :aria-labelledby="`tab-${tab.id}`"
        :hidden="activeTab !== tab.id"
        class="tab-panel"
      >
        <h3 class="tab-heading">{{ tab.heading }}</h3>
        <p class="tab-text">{{ tab.text }}</p>
      </div>

      <ul class="values-grid">
        <li v-for="value in values" :key="value.title" class="card values-card">
          <BaseIcon name="check" :size="24" decorative />
          <h3 class="values-card-title">{{ value.title }}</h3>
          <p class="values-card-text">{{ value.text }}</p>
        </li>
      </ul>

      <ul class="attr-grid">
        <li v-for="attr in attributes" :key="attr.title" class="attr-item">
          <h3 class="attr-title">{{ attr.title }}</h3>
          <p class="attr-text">{{ attr.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.values-section {
  position: relative;
  overflow: hidden;
  color: var(--color-text-inverse);
}

.values-bg-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.values-slider {
  position: absolute;
  inset: 0;
  display: flex;
}

.values-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: valuesCrossfade 25s infinite;
  animation-delay: calc(var(--i) * 5s);
  margin: 0;
}

.values-slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.values-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(9, 46, 28, 0.88) 0%,
    rgba(9, 46, 28, 0.78) 50%,
    rgba(9, 46, 28, 0.94) 100%
  );
}

@keyframes valuesCrossfade {
  0%, 16% { opacity: 1; }
  20%, 96% { opacity: 0; }
  100% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .values-slide {
    animation: none;
    opacity: 0;
  }
  .values-slide:first-child {
    opacity: 1;
  }
}

.values-content {
  position: relative;
  z-index: 1;
}

.values-section .section-eyebrow {
  color: var(--color-brand-secondary-bright);
}

.values-section .section-title {
  color: #FFFFFF;
}

.values-section .section-lead {
  color: rgba(253, 252, 247, 0.92);
}

.tabs-pill {
  display: flex;
  margin-inline: auto;
  margin-bottom: 2.5rem;
  width: fit-content;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  padding: 0.35rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.tab-pill {
  color: #FFFFFF;
  opacity: 0.9;
}

.tab-pill:hover {
  color: #FFFFFF;
  opacity: 1;
}

.tab-pill.is-active {
  background: #FFFFFF;
  color: var(--color-brand-primary);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  opacity: 1;
}

.tab-panel {
  max-width: 42rem;
  margin-inline: auto;
  text-align: center;
  margin-bottom: 2.5rem;
}

.tab-heading {
  font-family: var(--font-display);
  color: #FFFFFF;
  font-size: var(--text-heading-lg);
  margin-bottom: 0.6rem;
  text-wrap: balance;
}

.tab-text {
  color: rgba(253, 252, 247, 0.92);
  line-height: 1.7;
}

.values-grid {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 640px) {
  .values-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .values-grid { grid-template-columns: repeat(4, 1fr); }
}

.values-card {
  background: #FFFFFF;
  border-radius: var(--radius-lg);
  padding: 1.75rem 1.5rem;
  color: var(--color-brand-primary);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.values-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px -6px rgba(0, 0, 0, 0.28);
}

.values-card svg {
  color: var(--color-brand-secondary);
  margin-bottom: 0.85rem;
}

.values-card-title {
  font-family: var(--font-display);
  color: var(--color-brand-primary);
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
}

.values-card-text {
  color: var(--color-text-secondary);
  font-size: 0.92rem;
  line-height: 1.6;
}

.attr-grid {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .attr-grid { grid-template-columns: repeat(2, 1fr); }
}

.attr-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius-md);
  padding: 1.25rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.attr-title {
  font-family: var(--font-display);
  color: #FFFFFF;
  margin-bottom: 0.4rem;
}

.attr-text {
  color: rgba(253, 252, 247, 0.88);
  font-size: 0.92rem;
  line-height: 1.6;
}
</style>
