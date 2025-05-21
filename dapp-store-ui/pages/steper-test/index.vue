<template>
    <!-- <v-stepper
      v-model="step"
      
      show-actions
    >
    <v-stepper-header>
      <div class="d-flex" v-for="(item ,i) in items" :key="i" >
        <v-icon>{{ item.iconSuccess }}</v-icon>
        <div>{{ item.title }}</div>
        <hr style="color: red;">
      </div>
    </v-stepper-header>
    <v-stepper-items>

      <template v-slot:items.1>
        <h3 class="text-h6">Order</h3>
  
        <br>
  
        <v-sheet border>
          <v-table>
            <thead>
              <tr>
                <th>Description</th>
                <th class="text-end">Quantity</th>
                <th class="text-end">Price</th>
              </tr>
            </thead>
  
            <tbody>
              <tr v-for="(product, index) in products" :key="index">
                <td v-text="product.name"></td>
                <td class="text-end" v-text="product.quantity"></td>
                <td class="text-end" v-text="product.quantity * product.price"></td>
              </tr>
  
              <tr>
                <th>Total</th>
                <th></th>
                <th class="text-end">
                  ${{ subtotal }}
                </th>
              </tr>
            </tbody>
          </v-table>
        </v-sheet>
      </template>
  
      <template v-slot:items.2>
        <h3 class="text-h6">Shipping</h3>
  
        <br>
  
        <v-radio-group v-model="shipping" label="Delivery Method">
          <v-radio label="Standard Shipping" value="5"></v-radio>
          <v-radio label="Priority Shipping" value="10"></v-radio>
          <v-radio label="Express Shipping" value="15"></v-radio>
        </v-radio-group>
      </template>
  
      <template v-slot:items.3>
        <h3 class="text-h6">Confirm</h3>
  
        <br>
  
        <v-sheet border>
          <v-table>
            <thead>
              <tr>
                <th>Description</th>
                <th class="text-end">Quantity</th>
                <th class="text-end">Price</th>
              </tr>
            </thead>
  
            <tbody>
              <tr v-for="(product, index) in products" :key="index">
                <td v-text="product.name"></td>
                <td class="text-end" v-text="product.quantity"></td>
                <td class="text-end" v-text="product.quantity * product.price"></td>
              </tr>
  
              <tr>
                <td>Shipping</td>
                <td></td>
                <td class="text-end" v-text="shipping"></td>
              </tr>
  
              <tr>
                <th>Total</th>
                <th></th>
                <th class="text-end">
                  ${{ total }}
                </th>
              </tr>
            </tbody>
          </v-table>
        </v-sheet>
      </template>
    </v-stepper-items>
    </v-stepper> -->
    
    <div>
    <v-stepper non-linear>
      <v-stepper-header>
        <v-stepper-item
          value="1"
         
        >
          Select campaign settings
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          value="2"
          editable
        >
          Create an ad group
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          value="3"
          editable
        >
          Create an ad
        </v-stepper-item>
      </v-stepper-header>
    </v-stepper>
  </div>
  </template>

<script setup>
 let shipping=ref(0);
     let step= ref(1);
     const items = reactive([
    { title: 'Step 1', iconSuccess: 'mdi-lead-pencil', isValid: true },
    { title: 'Step 2', iconSuccess: 'mdi-lead-pencil', isValid: true },
    { title: 'Step 3', iconSuccess: 'mdi-lead-pencil', isValid: true },
  ]);
     let products= ref( [
        {
          name: 'Product 1',
          price: 10,
          quantity: 2,
        },
        {
          name: 'Product 2',
          price: 15,
          quantity: 10,
        },
      ]);
</script>

<style scoped>

</style>