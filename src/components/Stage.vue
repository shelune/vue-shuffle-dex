<template>
  <div class="stage">
    <section-overview :stageData="stageData"></section-overview>
    <section-disruptions :stageData="stageData"></section-disruptions>
    <section-strategy :stageData="stageData"></section-strategy>
    <section-supports :stageData="stageData"></section-supports>
  </div>
</template>

<script>
import SectionOverview from 'components/SectionOverview.vue'
import SectionDisruptions from 'components/SectionDisruptions.vue'
import SectionStrategy from 'components/SectionStrategy.vue'
import SectionSupports from 'components/SectionSupports.vue'

import _ from 'lodash'
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
    stageIdApp() {
      this.getUrlFromId()
      this.updateStageData()
    },
    mode() {
      this.getUrlFromId()
      this.updateStageData()
    }
  },
  props: ['stageIdApp', 'mode'],
  methods: {
    updateStageData: _.debounce(function () {
      let processorConfig = {
        url: this.stageUrlStage,
        id: this.stageIdApp
      }
      Processor.getStage(processorConfig).then((data) => {
        console.log('stage phase: ', this.stageUrlStage);
        if (data) {
          this.stageData = data
          let sranking = data.srankingStrategy
          let srankMoves = sranking.match(/\d+/g, '')[0]
          this.stageData.srankMoves = srankMoves
        } else {
          console.log('encountered error when getting stage')
        }
      })
      console.log('FINAL STAGE DATA: ', this.stageData);
    }, 1000),
    getUrlFromId () {
      this.stageUrlStage = Resources.getStageUrl(this.mode, this.stageIdApp)
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/base/_variables.scss";

</style>
