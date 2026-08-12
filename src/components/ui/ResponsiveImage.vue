<script setup>
defineOptions({ inheritAttrs: false })

defineProps({
  asset: { type: Object, required: true },
  alt: { type: String, default: '' },
  pictureClass: { type: String, default: '' },
  imgClass: { type: String, default: '' },
  sizes: { type: String, default: '100vw' },
  loading: { type: String, default: 'lazy' },
  fetchpriority: { type: String, default: 'auto' },
})

const srcsetFor = (sources) => sources?.map((source) => `${source.src} ${source.width}w`).join(', ')
</script>

<template>
  <picture class="responsive-picture" :class="pictureClass">
    <source
      v-if="asset.avif?.length"
      type="image/avif"
      :srcset="srcsetFor(asset.avif)"
      :sizes="sizes"
    />
    <source
      v-if="asset.webp?.length"
      type="image/webp"
      :srcset="srcsetFor(asset.webp)"
      :sizes="sizes"
    />
    <img
      v-bind="$attrs"
      :src="asset.fallback"
      :alt="alt"
      :width="asset.width"
      :height="asset.height"
      :loading="loading"
      :fetchpriority="fetchpriority"
      decoding="async"
      :class="['responsive-image', imgClass]"
    />
  </picture>
</template>
