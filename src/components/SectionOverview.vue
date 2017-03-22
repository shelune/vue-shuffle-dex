<template>
  <section class="section section-overview" :style="{paddingTop: '0'}">
    <div class="container">
      <h1 class="section_title" :style="{marginTop: '0'}">Overview</h1>
      <div class="columns">
        <overview-stage :stageData="stageData" :class="showStage ? '' : 'is-hidden-mobile'" @switch-overview="switchView"></overview-stage>
        <overview-pokemon :stageData="stageData" :class="showPokemon ? '' : 'is-hidden-mobile'" @switch-overview="switchView"></overview-pokemon>
      </div>
    </div>
  </section>
</template>

<script>
import OverviewStage from 'components/OverviewStage.vue'
import OverviewPokemon from 'components/OverviewPokemon.vue'

export default {
  data () {
    return {
      viewIsPokemon: true,
      screenMode: ''
    }
  },
  components: {
    OverviewStage,
    OverviewPokemon
  },
  props: ['stageData'],
  methods: {
    switchView() {
      this.viewIsPokemon = !this.viewIsPokemon
    },
    calculateScreensize(event) {
      let width = document.documentElement.clientWidth
      if (width <= 768) {
        this.screenMode = 'tablet'
      } else {
        this.screenMode = 'desktop'
      }
    }
  },
  computed: {
    showStage () {
      if (this.screenMode == 'desktop') {
        return true
      } else {
        if (!this.viewIsPokemon) {
          return true
        }
        return false
      }
    },
    showPokemon () {
      if (this.screenMode == 'desktop') {
        return true
      } else {
        if (this.viewIsPokemon) {
          return true
        }
        return false
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.calculateScreensize);
      this.calculateScreensize()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/base/_all.scss";
@import "~bulma/bulma.sass";
@import "../styles/components/_all.scss";

.section {
  background: $pal-white;
}

.hidden {
  opacity: 0;
  visibility: hidden;
}

</style>
