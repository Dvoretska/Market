<template>
	<modal name="choose-category" :width="600" :scrollable="true" class="modal-window" :height="'auto'">
    <div class="modal-window-contant">
      <div class="modal-title">
          <h2>Choose a category</h2>
          <img src="../assets/cancel.svg" alt="" class="icon-close" @click="hide">
      </div>
      <ul v-if="rootCategory && !loading" class="categories-wrapper">
        <li class="category-item" v-for="category_item in categories" @click="fetchSubcategory(category_item.slug)">
          <img :src="getIconURL(category_item.slug)" alt="" class="icon-category-item">
          <span>{{ category_item.name }}</span>
        </li>
      </ul>

      <div class="subcategories-wrapper" v-else>

        <div v-if="loading" class="loading">
          <vue-loading spinner="wave"></vue-loading>
        </div>

        <div v-else class="subcategories-container categories-wrapper">
          <div v-for="subcategory in categories" class="category-item subcategory-item" @click="subcategory.is_leaf_node == true ? hide(subcategory) : fetchSubSubCategory(subcategory)">{{ subcategory.name }}<img src="../assets/categoryIcons/arrow-right.svg" v-if="subcategory.is_leaf_node == false" class="icon-arrow-right"></div>
        </div>

      </div>
    </div>
	</modal>
</template>

<script>
import VueLoading from 'vue-simple-loading'

export default {
  components: {
    VueLoading
  },
  props: {
    rootCategory: Boolean,
    fetchSubcategory: Function,
    fetchSubSubCategory: Function
  },
  methods: {
    getIconURL (category) {
      try {
        return require(`@/assets/categoryIcons/${category}.svg`)        
      }
      catch (ex) {
        console.log(ex)
      }
    },
    hide (subcategory) {
      this.$emit('subcategory', subcategory)
      this.$modal.hide('choose-category')
    }
  },
  computed: {
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
  .modal-window-contant {
    max-width: 600px;
    .categories-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
  }
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
    width: 170px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 5px 5px 10px;
    font-size: 12px;
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
    word-wrap: break-word;
    .icon-arrow-right {
      width: 10px;
      height: 10px;
      margin-left: 5px;
    }
  }
  @media screen and (max-width:575px){
    /deep/ .v--modal-box {
      width: 100% !important;
    }
  }
</style>