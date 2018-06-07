<template>
	<div class="main-container">
		<aside class="filters-box">
	      <div v-if="categories.loading" class="loading">
	        <vue-loading spinner="wave"></vue-loading>
	      </div>
		  <category-filter
	        v-else="filtersData"
	        :data="filtersData">
	      </category-filter>
	      <vue-slider v-if="!ads.loading"></vue-slider>
		</aside>
		<div class="content-wrapper">
        <bread-crumbs></bread-crumbs>
        <span class="dropdown-el" @click.stop="toggleClass" v-bind:class="{'expanded': isOpen}">
          <input type="radio" name="sortType" value="Relevance" id="-created"
          :checked="'-created' == currentSortId" @click.stop="setCurrentOrdering('-created')">
              <label for="-created"><span class="checked-mark">&#10004;</span> By date</label>
          <input type="radio" name="sortType" value="PriceIncreasing" id="price"
          :checked="'price' == currentSortId" @click.stop="setCurrentOrdering('price')">
              <label for="price"><span class="checked-mark">&#10004;</span> By price Low to High</label>
          <input type="radio" name="sortType" value="PriceDecreasing" id="-price"
          :checked="'-price' == currentSortId" @click.stop="setCurrentOrdering('-price')">
              <label for="-price"><span class="checked-mark">&#10004;</span> By price High to Low</label>
        </span>
	      <div v-if="ads.loading" class="loading">
	        <vue-loading spinner="wave"></vue-loading>
	      </div>
			<div v-else class="ad-cards-container">
				<div class="ad-card" v-for="ad in ads.results">
					<div class="ad-img-wrapper" @click="openAdDetails(ad.slug)">
						<img :src="ad.image || getDefaultImage" alt="" class="ad-img">
					</div>
					<div class="ad-description-box">
						<div>
							<div class="ad-price">{{ ad.price }} грн</div>
							<strong class="ad-subject">{{ ad.subject }}</strong>
							<div class="ad-category">{{ ad.category.name }}</div>
						</div>
						<div>
							<div class="ad-location">{{ ad.location }}</div>
							<div class="date-star-wrapper">
								<div class="ad-date">{{ getDate(ad.created) }}</div>
								<popper trigger="hover" :options="{placement: 'left'}">
							    <div class="popper">
							      Добавить в избранное
							    </div>
							    <svg slot="reference" viewBox="0 0 140 130" height="270" class="star-svg" @click.stop="addProductToSelected(ad.slug)" v-bind:class="{'star-selected': slugs.includes(ad.slug)}">
							    <polygon points="70,5 90,41 136,48 103,80 111,126
							                     70,105 29,126 36,80 5,48 48,41" />
								  </svg>
								</popper>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="no-results-box" v-if="ads.count == 0 && !ads.loading">
					<img src="../assets/searching-magnifying-glass.svg" alt="" class="no-results-icon">
					<span class="no-results-span" v-translate>Sorry, no results were found.</span>
			</div>
			<div class="wrapper-paginate">
			  <paginate v-if="adsPageCount >= 2 && !ads.loading"
			    :page-count="adsPageCount"
			    :page-range="3"
			    :margin-pages="2"
			    :prev-text="'Prev'"
			    :next-text="'Next'"
			    :container-class="'pagination'"
			    :click-handler="clickCallback"
			    :initial-page="parseInt(this.$route.query.page) - 1 || 0">
			  </paginate>
			</div>
		</div>
	</div>
</template>

<script>

import breadCrumbs from '@/components/BreadCrumbs'
import CategoryFilter from '@/components/filters/CategoryFilter'
import VueSlider from '@/components/filters/slider-chart/VueSlider'
import VueLoading from 'vue-simple-loading'
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/css/vue-popper.css'

export default {
  components: {
    CategoryFilter,
    VueSlider,
    VueLoading,
    breadCrumbs,
   'popper': Popper
  },
  data () {
  	return {
  		slugs: [],
  		starSelected: null
  	}
  },
  created () {
  	this.currentSortId = this.$route.query.ordering || '-created'
	  if(!(['created', 'price', '-price'].includes(this.$route.query.ordering))) {
  		this.currentSortId = '-created'
  	}
    this.$store.dispatch('GET_FILTERED_AD_LIST', this.$route.query)
    if (!this.$store.getters.getCategories.length) {
      this.$store.dispatch('GET_CATEGORIES', {
        category: this.$route.query.category, isLeafNode: false, language: this.$language.current
      })
    }
  },
  mounted () {
	  const slugs = JSON.parse(this.$localStorage.get('slug'))
	  if (slugs) {
	    this.slugs = slugs
	  }
	},
  methods: {
  	addProductToSelected (slug) {
  		this.slugs.push(slug);
  		if(!this.$localStorage.get('slug') || !JSON.parse(this.$localStorage.get('slug')).includes(slug)) {
	  		this.$localStorage.set('slug', JSON.stringify(this.slugs));
  		}
  	},
    setCurrentOrdering (id) {
    	this.currentSortId = id
    	if(this.$route.query.ordering != id) {
	    	this.$store.dispatch('GET_FILTERED_AD_LIST', {...this.$route.query, ordering: id})
	    }
    },
    toggleClass () {
      this.$store.commit('setOrderingState', {isOpen: !this.isOpen})
    },
  	getDate (created) {
  		let now = this.$moment()
  		let date = this.$moment(created)
  		if (now.diff(date, 'hours') > 2) {
  			return date.locale('en').format('ll')
  		}
  		return this.$moment(created).fromNow()
  	},
    clickCallback (pageNum) {
      this.$store.dispatch('GET_FILTERED_AD_LIST', {...this.$route.query, page: pageNum})
    },
    openAdDetails (slug) {
    	this.$router.push({ name: 'adDetails', params: { slug }})
    }
  },
  computed: {
    isOpen () {
      return this.$store.getters.getOrdering.isOpen
    },
    getDefaultImage () {
      return require('@/assets/default.png')
    },
    filtersData () {
      const categories = this.$store.getters.getCategories;
      if (categories.results.length) {
        let data = []
        data.push({
          text: {
            slug: categories.results[0].parent_slug,
            name: categories.results[0].parent,
          },
          state: {expanded: true},
          children: []
        })
        for (const category of categories.results) {
          data[0].children.push({
            text: {
              parent_slug: category.parent_slug,
              slug: category.slug,
              isLeafNode: category.is_leaf_node,
              name: category.name,
              count: category.count
            }
          })
        }
        return data
      }
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    ads () {
      return this.$store.getters.getAds;
    },
    adsPageCount () {
      return Math.ceil(this.$store.getters.getAds.count / 16)
    }
  }
}
</script>

<style scoped lang="scss">
  .main-container {
    display: flex;
    margin-top: 55px;
    min-height: calc(100vh - 55px - 125px);
    box-shadow: inset 0 20px 50px -20px rgba(0,0,0,.06);
    .filters-box {
			width: 300px;
			padding: 12px 20px 0 10px;
		}
    .content-wrapper {
			width: calc(100% - 300px);
			margin-right: 15px;
      position: relative;
      .dropdown-el {
        position: absolute;
        z-index: 30;
        min-width: 200px;
        display: inline-block;
        min-height: 2em;
        max-height:2em;
        overflow:hidden;
        cursor: pointer;
        text-align: left;
        white-space: nowrap;
        color: #444;
        outline: none;
        border-radius: 5px;
        background-color: rgba(121,87,213,.5);
        transition: .3s all ease-in-out;
        font-size: 14px;
        left: 10px;
        top: 17px;
        input {
          display:none;
        }
        label {
          display:block;
          color: #343434;
          height: 2em;
          line-height: 2em;
          padding-left: 18px;
          padding-right: 3em;
          cursor: pointer;
          position: relative;
          transition: .3s color ease-in-out;
          &:nth-child(2) {
            margin-top: 2em;
          }
         .checked-mark {
            display: none;
            position: absolute;
            left: 5px;
          }
        }
        input:checked + label {
          display:block;
          border-top: none;
          position: absolute;
          top: 0;

          &:nth-child(2) {
            margin-top: 0;
            position: relative;
          }
        }
        &::after {
          content:"";
          position: absolute;
          right: 0.8em;
          top: 0.9em;
          border: .3em solid white;
          border-color: white transparent transparent transparent;
          transition: .4s all ease-in-out;
        }
        &.expanded {
          background: #fff;
          border-radius: .25em;
          padding: 0;
          box-shadow: 0 1px 8px rgba(0,0,0,.25);
          max-height:15em;
          label {
            &:hover {
              color:#7957d5;
            }
            &:hover .checked-mark {
              display: inline;
            }
          }
          &::after {
            transform: rotate(-180deg);
            top:.55em;
          }
        }
      }
			.loading {
		    position: fixed;
        top: 40%;
        left: 50%;
				/deep/ .sk-wave .sk-rect {
				 	background-color: #7b4fad;
				}
      }
			.ad-cards-container {
				width: 100%;
				display: grid;
				grid-template-columns: repeat(auto-fill,minmax(240px, 1fr));
				grid-template-rows: auto [last-line];
			    .ad-card {
				    margin:10px 0 0 12px;
				    height: 400px;
				    font-size: 16px;
				    border: 1px solid #D7D7D7;
				    &:hover {
				    	border: solid 1px #CCC;
			    		box-shadow: 1px 1px 3px #999;
				    }
				    .ad-img-wrapper {
					    margin: 15px;
					    height: 200px;
					    width: auto;
					    position: relative;
					    display: flex;
					    justify-content: center;
					    align-items: center;
					    background: #f7f7f7;
					    cursor: pointer;
					    .ad-img {
					    	max-width: 100%;
					    	max-height: 100%;
					    	object-fit: contain;
					  	}
				  	}
				  	.ad-description-box {
				    	margin: 15px;
				    	height: 155px;
				    	display: flex;
				    	flex-direction: column;
				    	justify-content: space-between;
				    	.ad-price {
								padding-bottom: 10px;
								font-size: 18px;
								font-weight: 600;
								line-height: 16px;
							}
							.ad-subject {
								max-height: 40px;
								font-size: 17px;
								overflow: hidden;
								line-height: 20px;
								word-wrap: break-word;
								color: #8c40b8;
								display: block;
							}
							.ad-category, .ad-date {
								text-overflow: ellipsis;
							  overflow: hidden;
							  white-space: nowrap;
								max-height: 20px;
								margin-top: 10px;
								margin-bottom: 10px;
								font-size: 14px;
								line-height: 18px;
								color: #b4b4b4;
								min-height: 15px;
							}
							.ad-location {
								font-size: 14px;
								line-height: 16px;
								font-weight: 700;
								color: #909090;
								min-height: 15px;
							}
							.date-star-wrapper {
								display: flex;
								justify-content: space-between;
								align-items: center;
								margin-top: 10px;
								.ad-date {
									font-size:12px;
									line-height: 1;
									margin-bottom: 0;
									margin-top: 0;
								}
								.star-svg {
									width: 17px;
									height: 17px;
									cursor: pointer;
									polygon {
										stroke: black;
										fill: white;
										stroke-width: 3;
										&:hover {
											stroke: #FCA700;
											fill: #FCA700;
										}
									}
								}
								.star-selected {
									polygon {
											stroke: #FCA700;
											fill: #FCA700;										
									}
								}
								
							}
				  	}
				}
			}
			.no-results-box {
				display: flex;
				justify-content: flex-start;
				flex-direction: column;
				align-items: center;
				height: 100%;
		  	.no-results-span {
					font-size: 22px;
		  	}
		  	.no-results-icon {
					width: 100px;
					height: 100px;
					margin-top: 80px;
					margin-bottom: 15px;
		  	}
		  }
		  .wrapper-paginate {
				display: flex;
		    justify-content: center;
		    margin: 30px 0 0 10px;
		    /deep/ .pagination {
		    	& li:first-child a {
		    		border-top-left-radius: 5px;
		    		border-bottom-left-radius: 5px;
		    	}
		    	& li:last-child a {
		    		border-top-right-radius: 5px;
		    		border-bottom-right-radius: 5px;
		    		border-right: 1px solid #ccc;
		    	}
		    	& .active a {
			    	color: #fff;
						background-color: #7957d5;
						border-color: #7957d5;
						&:hover {
							background-color: #7957d5;
						}
		    	}
		    	& .disabled:hover a {
		    		cursor: not-allowed;
		    	}
		    	& > li > a {
		        color: #7957d5;
		        padding: 5px 10px;
		        border-left: 1px solid #ccc;
		        border-bottom: 1px solid #ccc;
		        border-top: 1px solid #ccc;
		        &:hover {
		        	background-color: #f4f4f4;
		        }
		  		}
		    }
			}
		}
	}
	@media screen and (max-width:767px){
		.main-container {
			flex-direction: column;
			.filters-box {
				width: 50%;
			}
			.content-wrapper {
				width: 100%;
				padding-right: 15px;
				.ad-cards-container {
					width: 100%;
			    .ad-card {
				    margin:10px 0 0 15px;
					}
				}
			}
		}
	}
	@media screen and (max-width:575px){
		.main-container {
			.filters-box {
				width: 100%;
			}
		}
	}
	@media screen and (max-width:320px){
		.main-container {
			.filters-box {
				width: 100%;
			}
			.content-wrapper {
				width: 100%;
				.ad-cards-container {
					width: 100%;
				}
			}
		}
	}
</style>
