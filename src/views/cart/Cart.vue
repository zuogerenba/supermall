<template>
  <div>
    <cart-nav-bar></cart-nav-bar>
  </div>
</template>

<script>
// import NavBar from 'components/common/navbar/NavBar'
import CartNavBar from './cartChild/CartNavBar'

export default {
  name: 'Cart',
 
  data () {
    return {
      
    };
  },
  components: {CartNavBar},
  mounted () {},
  methods: {}
}
</script>

<style scoped>
</style>