<template>
   <div>
          <input type="text" v-model="searchText">
          <ul>
            <li v-for="product in customFilter">{{ product }}</li>
          </ul>
    </div>
  </template>
  
  <script>
   import {productMixin} from './productMixin.js'
  export default {
      mixins:[productMixin]

    // FIRST WAY
    // data(){
    //   return {
    //     products:["Monitor", "Keyboard", "Mouse", "Printer", "Scanner"],
    //     searchText:''
    //   }
    // },
    // computed:{
    //    customFilter(){
    //     return this.products.filter((element)=>{
    //       return  element.match(this.searchText);
    //     })
    //    }
    // }
  }
  </script>