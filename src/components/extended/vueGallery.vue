<template>
  <div
    :id="id"
    class="blueimp-gallery blueimp-gallery-controls"
    :class="{'blueimp-gallery-carousel': carousel}">

    <div class="slides"></div>
    <h3 class="title"></h3>
    <div class="description"></div>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a v-if="!carousel" class="close">×</a>
    <ol v-if="!carousel" class="indicator"></ol>
    <a v-if="carousel" class="play-pause"></a>
  </div>
</template>

<script>
import VueGallery from 'vue-gallery'

export default {
  extends: VueGallery,
  methods: {
  	onSlideCustom(index, slide) {
        this.$emit('onslide', { index, slide });

        const image = this.images[index];
        if (image !== undefined && this.instance !== null) {
          const text = image.description;
          const node = this.instance.container.find('.description');
          if (text) {
            node.empty();
            let div = document.createElement('div');
            node[0].appendChild(div);
            div.innerHTML = text;
          }
        }
    }
  }
}
</script>

<style>
.blueimp-gallery.blueimp-gallery-carousel > .description {
  width: 40%;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
}
</style>