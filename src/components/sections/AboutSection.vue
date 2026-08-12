<script setup>
const imageModules = import.meta.glob('@/assets/images/*.png', {
  eager: true,
  import: 'default',
})
const mapa = imageModules['/src/assets/images/mapa.png']
</script>

<template>
  <section id="nosotros" class="section-pad anchor-offset" aria-labelledby="about-title">
    <div class="container-page">
      <div class="about-grid">
        <div class="about-content">
          <div class="section-header">
            <p class="section-eyebrow">¿Quiénes somos?</p>
            <h2 id="about-title" class="section-title">Somos arquitectos de sueños inmobiliarios</h2>
          </div>
          <p class="about-copy">
            En Urbanika somos un equipo de especialistas en el rubro inmobiliario.
            Contamos con líderes expertos, asesores con amplia trayectoria, un área
            administrativa especializada y un equipo de postventa enfocado en la
            calidad de atención. Todos trabajamos con un mismo objetivo: brindarte
            una inversión segura, clara y confiable.
          </p>
          <h3 class="about-subtitle">Nuestra trayectoria en el mercado</h3>
          <p class="about-copy">
            En el tejido del mercado inmobiliario, nuestra compañía se destaca como
            arquitecta de sueños y custodia de historias inolvidables. Hemos ido
            más allá de simplemente vender propiedades: hemos construido la
            oportunidad de iniciar en el rubro inmobiliario, dando tranquilidad
            financiera y futuros prometedores.
          </p>
        </div>
        <figure class="about-media media-frame media-frame--rounded-lg aspect-4-3">
          <img :src="mapa" alt="Ubicación de Urbanikawsay Inmobiliaria en Lima" class="about-img" />
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;
}
@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: 1.2fr 1fr;
  }
}
.about-copy {
  color: var(--color-text-primary);
  font-size: var(--text-body-lg);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}
.about-subtitle {
  font-family: var(--font-display);
  font-size: var(--text-heading-lg);
  color: var(--color-brand-primary);
  margin-bottom: 0.75rem;
}
.about-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
