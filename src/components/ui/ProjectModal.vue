<script setup>
import { computed, ref, watch } from "vue";
import BaseModal from "./BaseModal.vue";
import BaseIcon from "./BaseIcon.vue";
import ResponsiveImage from "./ResponsiveImage.vue";
import { projects } from "@/constants/site";
import { useWhatsApp } from "@/composables/useWhatsApp";
import { imageAssets } from "@/assets/generated/image-assets.js";
import imgPortico from "@/assets/images/proyectos/amenidad-portico.jpg";
import imgLotes from "@/assets/images/proyectos/amenidad-lotes.jpg";
import imgParque from "@/assets/images/proyectos/amenidad-parque.jpg";

const props = defineProps({
  open: { type: Boolean, default: false },
  slug: { type: String, default: "" },
});

const emit = defineEmits(["close"]);

const { createWhatsAppUrl } = useWhatsApp();

const project = computed(() => projects.find((p) => p.slug === props.slug));

const imageSrc = computed(() => {
  if (!project.value) return null;
  return imageAssets[project.value.imageUrl] || null;
});

const logoSrc = computed(() => {
  if (!project.value?.logoUrl) return null;
  return imageAssets[project.value.logoUrl] || null;
});

// Carrusel de imágenes del proyecto: galería propia o Portada + 3 imágenes adicionales
const gallerySlides = computed(() => {
  if (!project.value) return [];

  const custom = project.value.gallery || [];
  if (custom.length) {
    return custom
      .filter((name) => imageAssets[name])
      .map((name, index) => ({
        type: "asset",
        asset: imageAssets[name],
        alt: `Vista ${index + 1} de ${project.value.name}`,
        tag: `Vista ${index + 1}`,
      }));
  }

  return [
    {
      type: "asset",
      asset: imageSrc.value,
      alt: `Portada oficial de ${project.value.name}`,
      tag: "Portada principal",
    },
    {
      type: "url",
      src: imgPortico,
      alt: `Pórtico de ingreso y control de acceso - ${project.value.name}`,
      tag: "Pórtico de ingreso y seguridad",
    },
    {
      type: "url",
      src: imgLotes,
      alt: `Distribución de lotes de 120m² - ${project.value.name}`,
      tag: "Lotes habilitados de 120 m²",
    },
    {
      type: "url",
      src: imgParque,
      alt: `Parques y áreas recreativas - ${project.value.name}`,
      tag: "Parques y áreas verdes",
    },
  ];
});

const currentSlide = ref(0);

const nextSlide = () => {
  if (gallerySlides.value.length === 0) return;
  currentSlide.value = (currentSlide.value + 1) % gallerySlides.value.length;
};

const prevSlide = () => {
  if (gallerySlides.value.length === 0) return;
  currentSlide.value =
    (currentSlide.value - 1 + gallerySlides.value.length) %
    gallerySlides.value.length;
};

const goToSlide = (idx) => {
  currentSlide.value = idx;
};

watch(
  () => [props.slug, props.open],
  () => {
    currentSlide.value = 0;
  },
);

const whatsappCta = computed(() =>
  project.value
    ? createWhatsAppUrl(
        `Hola, quiero separar mi lote en el proyecto ${project.value.name}.`,
      )
    : "#",
);

const youtubeEmbedUrl = computed(() => {
  if (!project.value?.youtubeUrl) return null;
  const url = project.value.youtubeUrl;
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
  );
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
});
</script>

<template>
  <BaseModal
    :open="open"
    :title="project ? project.name : ''"
    :labelled-by="`project-${slug}-title`"
    @close="emit('close')"
  >
    <template v-if="project">
      <!-- Carrusel de Galería del Proyecto (Portada + 3 fotos) -->
      <div
        class="project-carousel-container"
        aria-roledescription="carousel"
        :aria-label="`Galería de imágenes de ${project.name}`"
      >
        <div class="project-carousel-wrapper">
          <div
            v-for="(slide, index) in gallerySlides"
            :key="index"
            class="modal-carousel-slide"
            :class="{ active: index === currentSlide }"
            :aria-hidden="index !== currentSlide"
          >
            <ResponsiveImage
              v-if="slide.type === 'asset' && slide.asset"
              :asset="slide.asset"
              :alt="slide.alt"
              picture-class="project-image-picture"
              img-class="project-image"
              sizes="(min-width: 768px) 40rem, 100vw"
            />
            <img
              v-else-if="slide.type === 'url'"
              :src="slide.src"
              :alt="slide.alt"
              class="project-image"
              loading="lazy"
            />
            <div class="slide-tag">
              <span>{{ slide.tag }}</span>
            </div>
          </div>

          <!-- Botones de Navegación -->
          <button
            type="button"
            class="carousel-btn prev"
            aria-label="Imagen anterior"
            @click="prevSlide"
          >
            <BaseIcon name="chevron-left" :size="18" decorative />
          </button>
          <button
            type="button"
            class="carousel-btn next"
            aria-label="Imagen siguiente"
            @click="nextSlide"
          >
            <BaseIcon name="chevron-right" :size="18" decorative />
          </button>

          <!-- Indicador de Puntos -->
          <div class="carousel-dots" role="tablist">
            <button
              v-for="(_, index) in gallerySlides"
              :key="index"
              type="button"
              class="dot"
              :class="{ active: index === currentSlide }"
              :aria-label="`Ver imagen ${index + 1}`"
              :aria-selected="index === currentSlide"
              @click="goToSlide(index)"
            ></button>
          </div>
        </div>
      </div>

      <div v-if="logoSrc" class="project-modal-brand">
        <div class="project-modal-titles">
          <h3 class="project-modal-name">{{ project.name }}</h3>
          <span class="project-modal-location">{{ project.location }}</span>
        </div>
      </div>

      <!-- Condiciones comerciales destacadas -->
      <div
        v-if="project.price || project.initialPayment"
        class="commercial-box"
      >
        <div v-if="project.price" class="commercial-item">
          <span class="commercial-label">Precio</span>
          <strong class="commercial-val">{{ project.price }}</strong>
        </div>
        <div v-if="project.initialPayment" class="commercial-item">
          <span class="commercial-label">Cuota Inicial</span>
          <strong class="commercial-val highlight">{{
            project.initialPayment
          }}</strong>
        </div>
        <div v-if="project.financing" class="commercial-item">
          <span class="commercial-label">Financiamiento</span>
          <strong class="commercial-val">{{ project.financing }}</strong>
        </div>
        <div v-if="project.monthlyQuota" class="commercial-item">
          <span class="commercial-label">Cuotas desde</span>
          <strong class="commercial-val">{{ project.monthlyQuota }}</strong>
        </div>
      </div>

      <dl class="project-specs">
        <div class="spec">
          <BaseIcon name="location" decorative />
          <div>
            <dt class="sr-only">Ubicación</dt>
            <dd>{{ project.distanceToPort }} · {{ project.lotSize }}</dd>
          </div>
        </div>
      </dl>

      <p class="project-desc">{{ project.description }}</p>

      <!-- Enlace Ver en Maps (sin fondo verde, solo ícono y texto) -->
      <div class="project-maps-wrapper">
        <a
          :href="project.mapsUrl || 'https://maps.google.com'"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-maps-link"
          :aria-label="`Ver ubicación de ${project.name} en Google Maps`"
        >
          <BaseIcon name="location" :size="18" decorative />
          <span>Ver en maps</span>
        </a>
      </div>

      <h4 class="features-title">Equipamiento y características:</h4>
      <ul class="list-check feature-list">
        <li v-for="feature in project.features" :key="feature">
          <BaseIcon name="check" decorative />
          <span>{{ feature }}</span>
        </li>
      </ul>

      <!-- Sección condicional de Video de YouTube -->
      <div v-if="youtubeEmbedUrl" class="project-video-section">
        <h4 class="video-title">Recorrido en video del proyecto</h4>
        <div class="video-frame">
          <iframe
            :src="youtubeEmbedUrl"
            :title="`Video de presentación de ${project.name}`"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share;
            "
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div class="project-actions">
        <a
          :href="whatsappCta"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-aero btn-aero-primary"
        >
          {{ project.ctaLabel }}
        </a>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped>
.project-carousel-container {
  margin-bottom: 1rem;
}

.project-carousel-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface-soft);
  box-shadow: 0 4px 16px rgba(13, 77, 46, 0.08);
  border: 1px solid var(--color-border);
}

.modal-carousel-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.4s ease,
    visibility 0.4s ease;
}

.modal-carousel-slide.active {
  opacity: 1;
  visibility: visible;
}

:deep(.project-image-picture) {
  display: block;
  width: 100%;
  height: 100%;
}

:deep(.project-image),
.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-tag {
  position: absolute;
  bottom: 0.85rem;
  left: 0.85rem;
  background: rgba(9, 46, 28, 0.82);
  backdrop-filter: blur(4px);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  pointer-events: none;
}

/* Botones de navegación — S5 44px */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  color: var(--color-brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition:
    background 0.2s ease,
    transform 0.2s ease,
    color 0.2s ease;
  z-index: 4;
}

.carousel-btn:hover {
  background: #ffffff;
  color: var(--color-accent-strong);
  transform: translateY(-50%) scale(1.08);
}

.carousel-btn.prev {
  left: 0.6rem;
}

.carousel-btn.next {
  right: 0.6rem;
}

/* Dots */
.carousel-dots {
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  display: flex;
  gap: 0.4rem;
  z-index: 4;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
  padding: 0.3rem 0.5rem;
  border-radius: 9999px;
}

.dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.6);
  border: none;
  padding: 0;
  cursor: pointer;
  transition:
    width 0.2s ease,
    background-color 0.2s ease;
}

.dot.active {
  width: 1.1rem;
  background: #ffffff;
}

.project-modal-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface-soft);
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
}
:deep(.modal-logo-picture) {
  display: flex;
  align-items: center;
  height: 2.75rem;
  width: auto;
  max-width: 5.5rem;
  flex-shrink: 0;
}
:deep(.modal-logo) {
  height: 2.75rem;
  width: auto;
  max-width: 5.5rem;
  object-fit: contain;
}
.project-modal-titles {
  display: flex;
  flex-direction: column;
}
.project-modal-name {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-brand-primary);
  margin: 0;
}
.project-modal-location {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
}
.commercial-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  padding: 0.9rem;
  background: var(--color-surface-flat-soft);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
}
@media (min-width: 768px) {
  .commercial-box {
    grid-template-columns: repeat(4, 1fr);
  }
}
.commercial-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.commercial-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  font-weight: 600;
}
.commercial-val {
  font-size: 0.95rem;
  color: var(--color-brand-primary);
  font-family: var(--font-display);
}
.commercial-val.highlight {
  color: var(--color-accent-strong);
}
.project-specs {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
.spec {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--color-brand-primary);
  font-size: 0.92rem;
}
.spec dd {
  color: var(--color-text-secondary);
  margin: 0;
}
.project-desc {
  color: var(--color-text-primary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}
.project-maps-wrapper {
  margin-bottom: 1.25rem;
}
.btn-maps-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  color: var(--color-brand-primary);
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
  padding: 0.2rem 0;
}
.btn-maps-link:hover {
  color: var(--color-brand-secondary);
  text-decoration: underline;
  transform: translateX(3px);
}
.btn-maps-link svg {
  color: var(--color-brand-secondary);
  flex-shrink: 0;
}
.features-title {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--color-brand-primary);
  margin-bottom: 0.5rem;
}
.feature-list {
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.45rem;
}
@media (min-width: 480px) {
  .feature-list {
    grid-template-columns: 1fr 1fr;
  }
}
.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}
.feature-list li svg {
  color: var(--color-brand-secondary);
  flex-shrink: 0;
  margin-top: 0.15rem;
}
.project-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.project-video-section {
  margin-bottom: 1.5rem;
}
.video-title {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--color-brand-primary);
  margin-bottom: 0.6rem;
}
.video-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: #000000;
  box-shadow: 0 4px 16px rgba(13, 77, 46, 0.12);
  border: 1px solid var(--color-border);
}
.video-frame iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
