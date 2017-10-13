<template>
  <div class="container">
    <div v-for="stage in allStages" :key="stage.id">{{ `Stage Name: ${stage.name}. HP: ${stage.hitPts}` }}</div>
  </div>
</template>

<script>
import { ALL_STAGES_QUERY } from '../constants/graphql'

export default {
  data() {
    return {
      stage: null
    }
  },
  apollo: {
    allStages: {
      query: ALL_STAGES_QUERY
    }
  },
  mounted() {
    console.log(this)
  }
}
</script>
