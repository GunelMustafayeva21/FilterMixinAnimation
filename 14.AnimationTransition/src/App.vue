<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h3>Animation ve Transition</h3>
        <hr>
        <select class="form-control" v-model="activeEffect">
          <option value="fade">Fade</option>
          <option value="slide">Slide</option>
        </select>
        <br> 
        <button class="btn btn-warning" @click="show=!show">Show / Hide</button>
        <br> <br>
         <!-- name="fade" is static but :name="activeEffect" is dynamic 
              you can choose name of animation from select -->
         <transition :name="activeEffect">
          <div class="alert alert-success" v-if="show">This is 1-st alert box</div>
          <!-- <div class="alert alert-success" v-else="!show">This is 2-nd alert box</div> -->
         </transition>
         <br> 
         <!-- you can use from v-show instead of v-if -->
         <!-- v-show add display none class to element -->
         <!-- appear transition is working on onload when condition is true -->
         <!-- type tells that animation and transition must finish at the same time -->
         <transition :name="activeEffect" type="animation" appear>
          <div class="alert alert-danger" v-if="show">This is 2-nd alert box</div>
         </transition>
         <!-- enter-class and leave-class da ola bilir -->
         <transition 
          enter-class=""
          enter-active-class="animated shake"
          leave-class=""
          leave-active-class="animated swing"
          appear>
          <div class="alert alert-warning" v-if="show">This is 3-rd alert box</div>
         </transition>
         <!-- For transition divs are same so make them different we will add key -->
         <!-- mode="out-in" 4-ün animasiyası bitəndə 5 onun yerinə hoppanmasın deyə -->
         <transition name="slide" mode="out-in">
          <div class="alert alert-success" v-if="show" key="four">This is 4-th alert box</div>
          <div class="alert alert-success" v-else key="five">This is 5-th alert box</div>
         </transition>
         <h3>Animation with JavaScript</h3>
         <hr>
         <button class="btn btn-danger" @click="showJS=!showJS">Show / Hide</button>
         <!-- :css="false" deyir ki animation js ile olacaq arxada animationName-enter, 
         animationName-enter-active, animationName-leave, animationName-leave-active 
         kimi sheyler axtarma -->
         <br> <br>
         <transition
         :css="false"
         @before-enter="beforeEnter"
         @enter="Enter"
         @after-enter="afterEnter"
         @after-enter-cancelled="afterEnterCancelled"

         @before-leave="beforeLeave"
         @leave="Leave"
         @after-leave="afterLeave"
         @after-leave-cancelled="afterLeaveCancelled"
         >
         <!-- css="false" false string amma :css="false" false is boolean -->
          <div style="width:100; height:50px; background-color: #fbbd08; border:1px solid #666" v-if="showJS">This is showJS alert box</div>
         </transition>
         
         <h3>Dynamic Components arasında geçiş</h3>
         <hr>
         <button class="btn btn-success" @click="currentComponent='appPost'" >Show Post Component</button>
         <button class="btn btn-primary" @click="currentComponent='appHome'">Show Home Component</button>
         <br> <br>
         <transition name="fade" mode="out-in">
         <component :is="currentComponent"></component>
         </transition>
         <!-- <app-post></app-post>
         <app-home></app-home> -->
         <h3>Animation with lists</h3>
         <hr>
         <button class="btn btn-warning" @click="addNewElement">Add new Element</button>
         <br> <br>
         <!-- transition-group -->
         <ul class="list-group">
          <transition-group name="slide">
            <li :key="index" class="list-group-item" v-for="(element, index) in numberList" @click="removeThisElement(index)">Number: {{ element }}</li>
          </transition-group>
          
         </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Post from './components/Post.vue'
import Home from './components/Home.vue'
// ANIMATE.CSS
export default {
  components:{
  appPost: Post,
  appHome: Home
  },
 data(){
  return {
    show:true,
    showJS:false,
    activeEffect:'fade',
    elemengtWidth:100,
    currentComponent:'appPost',
    numberList:[1, 2, 3, 4, 5]
  }
 }, 
 methods:{
  beforeEnter(el){
     this.elemengtWidth=100;
     el.style.width=this.elemengtWidth + 'px';
  },
  Enter(el, done){
   let round=1;
   const interval= setInterval(()=>{
   el.style.width= (this.elemengtWidth+round*10)+'px';
   round++;
   if(round>45){
   clearInterval(interval);
    done();
   }
   },50);
  
  },
  afterEnter(el){

  },
  afterEnterCancelled(el){

  },
  beforeLeave(el){
    this.elemengtWidth=550;
    el.style.width=this.elemengtWidth + 'px';
  },
  Leave(el, done){
    let round=1;
   const interval= setInterval(()=>{
   el.style.width= (this.elemengtWidth-round*10)+'px';
   round++;
   if(round>45){
   clearInterval(interval);
    done();
   }
   },50);
  },
  afterLeave(el){

  },
  afterLeaveCancelled(el){

  },
  addNewElement(){
     const position = Math.floor(Math.random()*this.numberList.length);
     this.numberList.splice(position, 0, this.numberList.length+1);
  },
  removeThisElement(index){
    this.numberList.splice(index,1);
  }
 }
}
</script>

<style>
.fade-enter{
 opacity: 0;
}
.fade-enter-active{
transition: opacity 1s;
}
/* .leave-enter{
  opacity: 1;
} */
.fade-leave-active{
   opacity: 0;
   transition: opacity 1s;
}
.slide-enter{
 opacity: 0;
}
.slide-enter-active{
  animation: slide-in 1s ease-out forwards;
  transition: opacity 0.5s;
}
/* .slide-leave{

} */
.slide-leave-active{
  animation: slide-out 1s ease-out forwards;
  opacity: 0;
  transition: opacity 3s;
  position: absolute;
  /* Element silinende digerleri onun yerine atlamasin deye */
}
/* For transition-group  */
.slide-move{
   transition: transform 1s;
}
@keyframes slide-in{
  from{
    transform: translateY(20px);
  }
  to{
    transform: translateY(0px);
  }
}
@keyframes slide-out{
  from{
    transform: translateY(0px);
  }
  to{
    transform: translateY(20px);
  }
}
</style>
