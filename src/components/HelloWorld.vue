<template>
  <div class="main-content">
    <div class="tab-wrap">
    
        <!-- Tab 1 : Cheapest -->
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
        
        <!-- Tab 2 : Fastest -->
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
        
        <!-- Tab 3 : Best -->
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
          </div>
        </div>
        
        <div class="slide"></div>    
    </div>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList'
import productsData from '@/assets/products.json'

export default {
  components: { ProductList },
  data () {
    return {
      productList: [],
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
      return this.productList.slice(0).sort((a, b) => a.cost - b.cost)
    },
    itemsSortedByTime(){
      return this.productList.slice(0).sort((a, b) => a.lead_time - b.lead_time || a.cost - b.cost )
    },
    bestDeals(){
      return this.getBestDeals(this.itemsSortedByPrice,this.itemsSortedByTime)
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
    getBestDeals(cheapestList,fastestList){
      var bestDealsList = []

      cheapestList.forEach(function (value1, i){
          fastestList.forEach(function (value2, j){
            if (value1 === value2) bestDealsList.push({product: value1, index: i+j})
        })
      })
      bestDealsList = bestDealsList.sort(function(a, b){return a.index-b.index})
      return  bestDealsList.map(obj => obj.product)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/global.scss';

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
  .tab-wrap {
    width: 80%;
    margin-left: 10%;
    top: -106px;
  }
}
</style>