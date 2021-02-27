<template>

  <div id="app">
    
    <h1 style="margin-bottom: 4rem;">NANO Transactions</h1>
    <div v-for="transaction in transactions" :key="transaction.hash" class="transaction">

      <p><b>Account:</b> {{ transaction.account }}</p>
      <p><b>Amount RAW:</b> {{ transaction.amount }}</p>
      <p><b>Amount NANO:</b> {{ transaction.amount | raw_to_nano}}</p>
      
      <hr style="margin-top: 2rem;">

    </div>

  </div>

</template>

<script>
import { transactionsArray } from './vendor/nano_websocket.js'
import * as NanoCurrency from './vendor/nanocurrency.umd.js'

export default {
  name: 'App',

  data() {

    return {

      transactions: "Test"

    }

  },
  
  filters: {

    raw_to_nano: function (raw) {

      return NanoCurrency.convert(raw, {
        from: 'raw',
        to: 'Nano',
      });
        
    }

  },

  components: {



  },
  mounted() {

    this.transactions = transactionsArray 

  },

  computed: {

   
  }

}

</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
}

.transaction {
  margin-bottom: 2rem;
}
</style>
