<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h3>Filter ve Mixins</h3>
        <p> {{message | toUpper | toLower}}</p>
        <filtered-products></filtered-products>
        <!-- Changes to mixin in one component does not affect another component -->
        <button @click="products.push('Notebook')">Add Product</button>
        <input type="text" v-model="searchText">
          <ul>
            <li v-for="product in customFilter">{{ product }}</li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Filter from './Filter.vue'
import {productMixin} from './productMixin.js'
export default {
  components:{
    filteredProducts: Filter
  },
  mixins:[productMixin],
  data(){
    return {
      message: " Hello this is me Ruler of Dragons",
    }
  },
  filters:{
    toUpper(value){
       return value.toUpperCase();
    }
  }
  
}
</script>

<style>

</style>
