<script>
import VueGallery from 'vue-gallery'

export default {
  extends: VueGallery,
  methods: {
  	onSlideCustom(index, slide) {
        this.$emit('onslide', { index, slide });

        const image = this.images[index];
        console.log(this.instance)
        if (image !== undefined && this.instance !== null) {
          const text = image.description;
          const node = this.instance.container.find('.description');
          if (text) {
            node.empty();
            node[0].appendChild(document.createTextNode(text));
          }
        }
    }
  }
}
</script>