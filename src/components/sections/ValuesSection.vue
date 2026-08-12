<script setup>
import { ref } from 'vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

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
    <div class="container-page">
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
          <BaseIcon name="check" :size="22" decorative />
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
  background: var(--color-surface-soft);
}
.tabs-pill {
  display: flex;
  margin-inline: auto;
  margin-bottom: 2.5rem;
  width: fit-content;
}
.tab-panel {
  max-width: 40rem;
  margin-inline: auto;
  text-align: center;
  margin-bottom: 2.5rem;
}
.tab-heading {
  font-family: var(--font-display);
  color: var(--color-brand-primary);
  font-size: var(--text-heading-lg);
  margin-bottom: 0.5rem;
}
.tab-text {
  color: var(--color-text-secondary);
}
.values-grid {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}
@media (min-width: 768px) {
  .values-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .values-grid { grid-template-columns: repeat(4, 1fr); }
}
.values-card {
  padding: 1.5rem;
  color: var(--color-brand-primary);
}
.values-card svg {
  color: var(--color-brand-secondary);
  margin-bottom: 0.75rem;
}
.values-card-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
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
  background: var(--color-surface);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius-md);
  padding: 1.25rem;
}
.attr-title {
  font-family: var(--font-display);
  color: var(--color-brand-primary);
  margin-bottom: 0.4rem;
}
.attr-text {
  color: var(--color-text-secondary);
  font-size: 0.92rem;
}
</style>
