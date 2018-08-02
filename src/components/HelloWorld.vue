<template>
    <div class="main-content">

    <div class="tab-wrap">
    
        <input type="radio" name="tabs" id="tab1" checked>
        <div class="tab-label-content" id="tab1-content">
          <label for="tab1">Cheapest<br>
            <span class="details-wrapper">
              <span class="cost"> {{cheapest.cost}} </span><span class="currency"> {{cheapest.currency}}</span>
            </span>
          </label>
          
          <div class="tab-content">
            <ProductList :sortedItems="itemsSortedByPrice"/>
          </div>
        </div>
        
        <input type="radio" name="tabs" id="tab2">
        <div class="tab-label-content" id="tab2-content">
          <label for="tab2">Fastest<br>
            <span class="details-wrapper">
              <span class="days"> {{fastest.lead_time}} </span><span class="info"> {{lead_time_days}}</span>
            </span>
          </label>
          
          <div class="tab-content">
            <ProductList :sortedItems="itemsSortedByTime"/>
          </div>
        </div>
        
        <input type="radio" name="tabs" id="tab3">
        <div class="tab-label-content" id="tab3-content">
          <label for="tab3">Best<br>
            <span class="details-wrapper">
              <span class="days"> {{bestDealDetails.cost}}<span class="currency"> {{cheapest.currency}}</span> / </span>
              <span class="days"> {{bestDealDetails.lead_time}} days </span>
            </span>
          </label>

          <div class="tab-content">
            <ProductList :sortedItems="bestDeals"/>
            {{ bestDeals}}
          </div>
        </div>
        
        <div class="slide"></div>
    
    </div>
    </div>
</template>

<script>
import ProductList from '@/components/ProductList'
import productsData from '../assets/products.json'


export default {
  components: { ProductList },
  data () {
    return {
      productList: [],
      sorting: -1,
      cheapest: {},
      fastest: {},
      lead_time_days: '',
      bestDealDetails: {}
    }
  },
  mounted(){
    this.productList = productsData.items
  },
  computed: {
    itemsSortedByPrice(){
      return this.productList.slice(0).sort((a, b) => a.cost < b.cost ? this.sorting : -this.sorting )
    },
    itemsSortedByTime(){
        return this.productList.slice(0).sort((a, b) => a.lead_time < b.lead_time ? this.sorting : -this.sorting )
    },
    bestDeals(){
      var self = this
      var bestDealsList = []
      self.itemsSortedByPrice.forEach(function (value1, i){

          self.itemsSortedByTime.forEach(function (value2, j){
            if (value1 === value2){
              bestDealsList.push({product: value1, index: i+j})
            }
        })
        bestDealsList = bestDealsList.sort(function(a, b){return a.index-b.index})
      })
      bestDealsList = bestDealsList.map(obj => obj.product)
      
      return  bestDealsList
    }
  },
  watch: {
  	itemsSortedByPrice() {
      this.cheapest = this.itemsSortedByPrice[0]
      this.fastest = this.itemsSortedByTime[0]
      this.lead_time_days = this.fastest.lead_time > 1 ? 'days' : 'day'
      this.bestDealDetails = this.bestDeals[0]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
$cyan: #00bcd4;
$yellow: #ffeb3b;
$grey: #9e9e9e;

$num-of-tabs: 3;

@mixin tabs {
  @for $i from 1 through $num-of-tabs {
    &:nth-of-type(#{$i}) {
      &:checked {
        ~ .slide {
          left: calc((100% / #{$num-of-tabs}) * #{$i - 1});
        }
      }
    }
  }
}

.main-content {
  margin-right: 300px;
  margin-left: 300px;
}

.tab-wrap {
  width: 100%;
  position: relative;
  display: flex;
}

input[type="radio"][name="tabs"] {
  position: absolute;
  z-index: -1;
  &:checked {
    + .tab-label-content {
      label {
        color: white;
        font-size: 18px;
        font-weight: bold;
      }
      .tab-content {
        display: block;
      }
    }
  }
  @include tabs;
  &:first-of-type {
    &:checked {
      ~ .slide {
        left: 0;
      }
    }
  }
}

label {
  cursor: pointer;
  color: rgba(255,255,255,0.8);
  background-color: $cyan;
  box-sizing: border-box;
  //display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 56px;
  transition: color 0.2s ease;
  width: 100%;
  font-size: 14px;

  .details-wrapper{
    .cost,.days{
      font-size: 14px;
    }
    .currency,.info{
      font-size: 12px;
    }
  }
}

.slide {
  background: $yellow;
  width: calc(100% / #{$num-of-tabs});
  height: 4px;
  position: absolute;
  left: 0;
  top: calc(100% - 4px);
  transition: left 0.3s ease-out;
}

.tab-label-content {
  width: 100%;
  .tab-content {
    position: absolute;
    top: 60px;
    left: 0px;
    line-height: 130%;
    display: none;

  }
}

@media screen and (max-width: 800px) {
  h1 {
    padding: 40px 0 90px 10%;
  }
  .tab-wrap {
    width: 80%;
    margin-left: 10%;
    top: -106px;
  }
}

//---------------------------------------------

.follow {
  width: 42px;
  height: 42px;
  border-radius: 50px;
  background: #03A9F4;
  display: block;
  margin: 300px auto 0;
  white-space: nowrap;
  padding: 13px;
  box-sizing: border-box;
  color: white;
  transition: all 0.2s ease;
  font-family: Roboto, sans-serif;
  text-decoration: none;
  box-shadow: 0 5px 6px 0 rgba(0,0,0,0.2);
  i {
    margin-right: 20px;
    transition: margin-right 0.2s ease;
  }
  &:hover {
    width: 134px;
    i {
      margin-right: 10px;
    }
  }
}

@media screen and (max-width: 800px) {
  .follow {
    margin: 400px auto 0;
  }
}
</style>