export const productMixin={
    data(){
        return {
          products:["Monitor", "Keyboard", "Mouse", "Printer", "Scanner"],
          searchText:''
        }
      },
      computed:{
         customFilter(){
          return this.products.filter((element)=>{
            return  element.match(this.searchText);
          })
         }
      }
}