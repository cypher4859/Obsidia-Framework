<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/blackmesa_logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'HelloWorld'
})
export default class HelloWorld extends Vue {
}
</script>
