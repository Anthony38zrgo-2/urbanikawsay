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
          <h2 id="about-title" class="section-eyebrow">¿QUIÉNES SOMOS?</h2>
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
        <figure class="about-media">
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
.section-eyebrow {
  font-family: var(--font-display);
  color: var(--color-brand-secondary);
  font-size: 0.9rem;
  letter-spacing: 0.12em;
  margin-bottom: 0.75rem;
}
.about-copy {
  color: var(--color-text-primary);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}
.about-subtitle {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--color-brand-primary);
  margin-bottom: 0.75rem;
}
.about-media {
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.about-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
