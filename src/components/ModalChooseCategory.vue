<template>
	<modal name="choose-category" :height="270" :width="600" class="modal-window">
    <div class="modal-title">
        <h2>Choose a category</h2>
        <img src="../assets/cancel.svg" alt="" class="icon-close" @click="hide()">
    </div>
    <ul v-if="rootCategory && !loading">
      <li class="category-item" v-for="category in categories" @click="fetchSubcategory(category.slug)">
        <img :src="getIconURL(category.slug)" alt="" class="icon-category-item">
        <span>{{ category.name }}</span>
      </li>
    </ul>

    <div class="subcategories-wrapper" v-else>

      <div v-if="loading" class="loading">
        <vue-loading spinner="wave"></vue-loading>
      </div>

      <div v-else class="subcategories-container">
        <div v-for="subcategory in categories" class="category-item subcategory-item" ref="subCategory_item" @click="fetchSubSubCategory(subcategory.slug)">{{ subcategory.name }}<img src="../assets/categoryIcons/arrow-right.svg" v-if="subcategory.is_leaf_node == false" class="icon-arrow-right"></div>
      </div>

<!--       <div class="subcategories-container">
        <div v-for="subSubCategory in categories" class="category-item subcategory-item">{{ subSubCategory.name }}</div>
      </div> -->

    </div>
	</modal>
</template>

<script>
import VueLoading from 'vue-simple-loading'

export default {
  components: {
    VueLoading
  },
  // data () {
  //   return {
  //     chosenCategory: ''
  //   }
  // },
  props: {
    rootCategory: Boolean,
    fetchSubcategory: Function
  },

  methods: {
    getIconURL (category) {
      return require(`@/assets/categoryIcons/${category}.svg`)
    },
    hide () {
      this.$modal.hide('choose-category')
    },
    fetchSubSubCategory (item) {
      this.$store.dispatch('GET_CATEGORIES', {category: item, isLeafNode: false})
      this.$refs.subCategory_item.hidden = true
    }
  },
  computed: {
    subCategories() {
      return this.$store.getters.getCategories.staleResults
    },
    categories() {
      return this.$store.getters.getCategories.results
    },
    loading () {
      return this.$store.getters.getLoading
    }
  }
}
</script>

<style scoped lang="scss">
  .subcategories-wrapper {
    display: flex;
  }
  .modal-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 10px;
    h2 {
      font-weight: 600;
      padding-left: 15px;
    }
    .icon-close {
       width: 25px;
       height: 25px;
       cursor: pointer;
    }
  }
  /deep/ .v--modal-box {
    padding: 15px;
  }
  .category-item {
    cursor: pointer;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 5px 5px 10px;
    &:hover {
      box-shadow: 0 0 2px 1px rgba(121,87,213,.7);
      border-radius: 10px;
    }
    .icon-category-item {
      width: 35px;
      height: 35px;
      margin-right: 15px;
      margin-left: 10px;
    }
  }
  .subcategory-item {
    padding: 3px 5px 3px 10px;
    margin-bottom: 5px;
    min-width: 150px;
    .icon-arrow-right {
      width: 10px;
      height: 10px;
      margin-left: 5px;
    }
  }
</style>