<template>

  <div class="main-container">
	<div class="content">

    <div class="top-section">
      	<div class="product-grid__product-wrapper" v-for="item in topProducts" >
          {{item.category}}
					<div class="product-grid__product">
						<div class="product-grid__img-wrapper">			
							<img :src="getIcon(item.product.product)" class="product-grid__img" />
            </div>
						<span class="product-grid__title">{{ item.product.product}}</span>
						<span class="product-grid__price">               
              <span class="cost">{{ item.product.cost}}</span>
              {{item.product.currency}}
            </span>
            <span class="product-grid__time">
              Lead time :         
              <span class="days">{{ item.product.lead_time}} Days</span>          
            </span>
            
            <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated" 
              role="progressbar" 

              :style="getWidth(item.product.lead_time)">
              </div>
            </div>
				  </div>
        </div>

    </div>

    <div class="sorting-wrapper">
      Sort by
      <select class="select-class" 
      v-model="selected">
        <option v-for="option in options" v-bind:value="option.id" >{{ option.name }}</option>
      </select>
    </div>

  	<!-- <button @click="enableSort = !enableSort">Toggle sort</button> -->
    Filtred by :
    <div class="form-check form-check-inline" v-for="item in companies">
      <input class="form-check-input" 
      type="checkbox" 
      :id="item" 
      :value="item"
      v-model="selectedCompanies"
      @change="handleCompanies(item)">
      <label class="form-check-label" for="inlineCheckbox1">{{item}}</label>
    </div>

		<!-- content here -->
		<div class="product-grid product-grid--flexbox">
			<div class="product-grid__wrapper">
				<!-- Product list start here -->

				<!-- Single product -->
				<div class="product-grid__product-wrapper" v-for=" product in sortedItems" >
					<div class="product-grid__product">
						<div class="product-grid__img-wrapper">			
							<img :src="getIcon(product.product)" class="product-grid__img" />
            </div>
						<span class="product-grid__title">{{ product.product}}</span>
						<span class="product-grid__price">               
              <span class="cost">{{ product.cost}}</span>
              {{product.currency}}
            </span>
            <span class="product-grid__time">
              Lead time :         
              <span class="days">{{ product.lead_time}} Days</span>          
            </span>
            
            <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated" 
              role="progressbar" 

              :style="getWidth(product.lead_time)">
              </div>
            </div>
				</div>
				<!-- end Single product --> 

         </div>		
      </div>
    </div>

	</div>

  </div>
</template>

<script>

import productsData from '../assets/products.json'

export default {
  name: 'HelloWorld',
  data () {
    return {
      productList: [],
      sorting: -1,
      selected: '',
      options: [{name: 'Cheapest',id:1}, {name:'Fastest',id:2}],
      companies: ['dhl','tnt','ups','dsv'],
      selectedCompanies: [],
      topProducts: []
    }
  },
  mounted(){
    this.productList = productsData.items
  },
  computed: {
  	sortedItems () {
      //filter checked
      if(this.selectedCompanies.length > 0){
        var filtredProducts = []
        this.selectedCompanies.forEach(item => {

            this.productList.forEach(product => {
              if(product.product.indexOf(item) > -1){
                filtredProducts.push(product)
              }
            })         
          
        })
        return filtredProducts
      }
      var result = []
      if (this.selected === 1){
        result = this.productList.slice(0).sort((a, b) => a.cost < b.cost ? this.sorting : -this.sorting )
        this.topProducts.push({category: 'Cheapest', product: result[0]})
        return result
      } else if (this.selected === 2) {
        result = this.productList.slice(0).sort((a, b) => a.lead_time < b.lead_time ? this.sorting : -this.sorting )
        this.topProducts.push({category:'Fastest', product: result[0]})
        return result
      } else return this.productList
    }
  },
  watch: {
  	sortedItems() {
    	console.log('sortedItems changed')
    },
    selected() {
      console.log('selected is', this.selected)
    },
    selectedCompanies: function (newVal, oldVal) {
      // Do what you want with the selected objects:
      console.log(newVal)
    }
  },
  methods: {
    getIcon: function (name, ext = 'svg') {
      var newname = name.substr(0,name.indexOf('_'))
      return require(`../assets/img/${newname}.${ext}`)
    },
    getWidth: function (days) {
        const percentage = days === undefined ? '0' : days * 10
        return 'width: ' + percentage + '%'
    },
    handleCompanies(item){
      console.log('items is ', item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


.wrapper {
	width: 68em;
}
.sorting-wrapper {
  text-align: left;
}
.select-class{
  width: 100px;
}


// Start here

$title-color: #222;
$font-color: #777;
$light-gray: #eee;
$blue-color: blue;

// product
$product-box-shadow: 0px 0px 0px 1px $light-gray;

.main-container {
	color: $font-color;
	font-family: 'Open Sans', Arial, sans-serif;
  box-sizing: border-box;
}


.product-grid {
	width: 60em;
	margin: 2rem auto;
	// TODO: apply clearfix
	

	// If want a flexbox grid.
	&.product-grid--flexbox {
		.product-grid__wrapper {
			display: flex;
			flex-wrap: wrap;
		}
		
		.product-grid__title {
			height: auto;
		}
	}
	

	&__wrapper {
		margin-left: -1rem;
		margin-right: -1rem;
		//background: #000;
	}
	
	&__product-wrapper {
		padding: 1rem;
		float: left;
		width: 20%;
	}
	
	
	&__product {
		padding: 1rem;
		// width: 33.33333%;
		// float: left;
		position: relative;
		cursor: pointer;
		background: #fff;
		box-shadow: $product-box-shadow;
		border-radius: 4px;
	}
	
			
	// product image wrapper
	&__img-wrapper {
		width: 100%;
		text-align: center;
		height: 100%;
	}
	
	
		// product image
		&__img {
			max-width: 100%;
			height: 70px;
      width: 70px;
			max-height: 100%;
		}
	
	
	//	product title
	&__title {
		margin-top: .5rem;
		display: block;
		font-size: 1.125em;
		color: $title-color;
    margin-bottom: .5rem;
	}
	
	&__price {
		font-weight: bold;
		letter-spacing: .4px;
    .cost {
      color:$blue-color;
      font-size: 1.3em;
    }
	}
  	&__time {
      display: block;
    .days {
      font-weight: bold;
    }
	}

}

// progress bar

.progress {
  border-radius: 1px;
  margin-bottom: 2px;
}
.progress-bar {
  min-width: 1%;
  span {
    color: red;
  }
}

</style>
