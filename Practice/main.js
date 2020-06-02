Vue.component('product',{
  props:{
    premium:{
      type:Boolean,
      required:true
    }
  },
template:`<div class="product">
                        <div class="product-image">
                            <img v-bind:src="image"/>
                        </div>
                        <div class="product-info">
                            <h1>{{ title }}</h1>
                            <p v-if="instock">In Stock</p>
                            <p v-else>Out of Stock</p>
                            <p> Shipping: {{shipping}} </p>
                            <ul>
                                    <li v-for="detail in details">{{detail}}</li>
                            </ul>
                            <div v-for="(variant,index) in variants"
                                 :key="variant.variantId"
                                 class="color-box"
                                 :style="{backgroundColor:variant.variantColor}"
                                 @mouseover="updateProduct(index)">
                            </div>
                            <button v-on:click="addToCart"
                                    :disabled="!instock"
                                    :class="{disabledButton: !instock}" > Add to Cart</button>
                        </div>
                        <div>
                        <h2>Review</h2>
                        <p v-if="!reviews.length">There are no reviews yet.</p>
                        <ul>
                            <li v-for="review in reviews">
                            <p>{{review.name}}</p>
                            <p>{{review.rating}}</p>
                            <p>{{review.review}}</p>
                            </li>

                        </ul>
                        </div>
                        <product-review @review-submitted="addReview"></product-review>
                </div>`,
                data()
                {
                return  {
                  brand:'Vue Mastery ',
                product: 'Socks',
                selectedVariant:0,
                details:["80% cotton","20%Polyester","Gender-neutral"],
                variants:[
                  {
                    variantId:2234,
                    variantColor:"green",
                    variantImage:'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
                    variantQuantity:10
                  },
                  {
                    variantId:2235,
                    variantColor:"blue",
                    variantImage:'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                    variantQuantity:0
                  }
                ],
                reviews:[]
              }
              },
                methods:{
                  addToCart(){
                    this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId)
                  },
                  updateProduct(index){
                      this.selectedVariant=index
                      console.log(index)
                  },
                  addReview(productReview){
                      this.reviews.push(productReview)
                  }
                },
                computed:{
                  title(){
                    return this.brand +''+this.product
                  },
                  image(){
                    return this.variants[this.selectedVariant].variantImage
                  },
                  instock() {
                    return this.variants[this.selectedVariant].variantQuantity
                  },
                  shipping(){
                   if(this.premium){
                     return "free"
                   }
                   return 2.99
                  }
                }

})

Vue.component('product-review',{
  template:`<form class="review-form" @submit.prevent="onSubmit">
   <p>
     <label for="name">Name:</label>
     <input id="name" v-model="name" placeholder="name">
   </p>
   <p>
   <label for="review">Review:</label>
   <textarea id="review" v-model="review"></textarea>
   </p>
   <p>
   <label for="rating">Rating:</label>
   <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
   </p>
   <p>
   <input type="submit" value="submit">
   </p>
   </form>
  `,
  data(){
    return{
      name:null,
      review:null,
      rating:null3
    }
  },
  methods:{
    onSubmit(){
      let productReview={
        name:this.name,
        review:this.review,
        rating:this.rating
      }
      this.$emit('review-submitted',productReview)
      this.name=null,
      this.review=null,
      this.rating=null
    
    }
  }
})

var app = new Vue({
    el: '#app',
     data:{
       premium:false,
       cart:[]
     },
     methods:{
      updateCart(id){
        this.cart.push(id)
      }
     }
  })