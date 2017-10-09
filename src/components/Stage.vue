<template>
  <div class="stage">
    <section-overview :stageData="stageData" :mode="mode"></section-overview>
    <section-disruptions :stageData="stageData"></section-disruptions>
    <section-strategy :stageData="stageData"></section-strategy>
    <section-supports :stageData="stageData"></section-supports>
    <p :style="{textAlign: 'center', marginBottom: '20px'}">--- You can contribute to this guide by filling in <strong><a href="https://docs.google.com/forms/d/e/1FAIpQLSeXthwhdfmoUm9GOGjkGP-S-7N_reKfWVhPQYE3UfBUdMsBoA/viewform?c=0&w=1" target="_blank">this form</a></strong> too! ---</p>
  </div>
</template>

<script>
import SectionOverview from 'components/SectionOverview.vue'
import SectionDisruptions from 'components/SectionDisruptions.vue'
import SectionStrategy from 'components/SectionStrategy.vue'
import SectionSupports from 'components/SectionSupports.vue'

import _ from 'lodash'
import $ from 'jquery'
import * as Processor from './../processor'
import * as Resources from './../resources'

export default {
  data () {
    return {
      stageUrlStage: '',
      stageData: {},
      stageId: ''
    }
  },
  components: {
    SectionOverview,
    SectionDisruptions,
    SectionStrategy,
    SectionSupports
  },
  watch: {
    $route() {
      this.getUrlFromId()
      this.updateStageData()
    },
    mode() {
      this.getUrlFromId()
      this.updateStageData()
    }
  },
  props: ['mode'],
  methods: {
    updateStageData() {
      let processorConfig = {
        url: this.stageUrlStage,
        id: this.$route.params.stageId
      }
      Processor.getStage(processorConfig).then((data) => {
        //console.log('stage phase: ', this.stageUrlStage);
        if (data) {
          this.stageData = data
          let sranking = data.srankingStrategy
          let srankMoves = _.includes(sranking, 'at least') ? sranking.match(/\d+/g, '')[0] : null
          this.stageData.srankMoves = srankMoves
          //console.log('sranking: ', this.stageData.srankMoves)
          //console.log('FINAL STAGE DATA: ', this.stageData)
          $('#stage-selector').blur()
        } else {
          console.log('encountered error when getting stage')
        }
      })
    },
    getUrlFromId () {
      this.stageUrlStage = Resources.getStageUrl(this.mode, this.$route.params.stageId)
    }
  },
  mounted() {
    if (this.$route.params.stageId) {
      this.getUrlFromId()
      this.updateStageData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/base/_variables.scss";

</style>
