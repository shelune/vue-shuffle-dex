<template>
  <section class="section section-supports">
    <div class="container">
      <h1 class="section_title">Supports</h1>
      <div class="columns">
        <supports-card :slots="slotsMega" supports-title="Mega Slot"></supports-card>
        <supports-card :slots="slotsMain" supports-title="Main Stage"></supports-card>
        <supports-card :slots="slotsExpert" supports-title="Expert Stage"></supports-card>
        <supports-card :slots="slotsSpecial" supports-title="Special Stage"></supports-card>
      </div>
      <h2 class="section_title">Suggested Team</h2>
      <div class="columns parties">
        <supports-party-alt :teamData="teamsClearing" stratTitle="Clearing"></supports-party-alt>
        <supports-party-alt :teamData="teamsSrank" stratTitle="S-Ranking"></supports-party-alt>
      </div>
    </div>
  </section>
</template>

<script>
import SupportsCard from 'components/SupportsCard.vue'
import SupportsParty from 'components/SupportsParty.vue'
import SupportsPartyAlt from 'components/SupportsPartyAlt.vue'

import _ from 'lodash'
import * as Processor from './../processor'

export default {
  data () {
    return {
      teamsSrank: {},
      teamsClearing: {},
      slotsMega: [],
      slotsMain: [],
      slotsExpert: [],
      slotsSpecial: []
    }
  },
  watch: {
    stageData() {
      this.resetData()
      this.updateMegaSlots()
      this.updateOtherSlots()
      this.updateTeam(this.stageData.suggestedTeam, this.teamsClearing)
      this.updateTeam(this.stageData.suggestedSrank, this.teamsSrank)
    }
  },
  props: ['stageData'],
  components: {
    SupportsCard,
    SupportsPartyAlt
  },
  methods: {
    resetData() {
      this.teamsSrank = [],
      this.teamsClearing = []
      this.slotsMega = []
      this.slotsMain = []
      this.slotsExpert = []
      this.slotsSpecial = []
    },
    updateTeam(source, destination) {
      let teams = _.compact(_.split(source, '\n'))

      _.each(_.compact(teams), team => {
        let teamNames = []
        let teamSingleObj = {items: '', slots: []}

        // if source provides items choice
        if (_.indexOf(team, '_') != -1) {
          // extract the 'team' part and split into array of names
          teamNames = _.split(team.slice(0, _.indexOf(team, '_')), ',')

          // extract the 'item' part
          teamSingleObj.items = _.trim(team.slice(_.indexOf(team, '_') + 1))
        } else {
          teamNames = _.split(team, ',')
        }

        // find the mega from teamNames and format it
        _.each(teamNames, (support, index) => {
          if (support.includes('[') && support.includes(']')) {
            support = 'Mega ' + support.slice(1, -1)
          }
          teamSingleObj.slots.push(_.trim(support))
        })
        destination.push(teamSingleObj)
      })
    },
    updateMegaSlots() {
      let megas = Processor.getMegaSupports(this.stageData.recommendedParty)

      _.each(megas, (mega) => {
        let configSupportMega = {name: mega.slice(1, -1) || '', isMega: true, separateDivision: ''}

        Processor.getStagePokemon(configSupportMega).then(data => {
          if (data) {
            this.slotsMega.push(data)
          }
        })
      })
      //console.log('mega slots: ', this.slotsMega)
    },
    updateOtherSlots() {
      let supports = Processor.getOtherSupports(this.stageData.recommendedParty)
      console.log('support choices: ', supports)

      // NEED REWORKING
      _.each(supports, (support) => {
        let configSupportMain = {name: support || '', isMega: false, separateDivision: 'main'}
        let configSupportExpert = {name: support || '', isMega: false, separateDivision: 'expert'}
        let configSupportSpecial = {name: support || '', isMega: false, separateDivision: 'special'}

        Processor.getStagePokemon(configSupportMain).then(data => {
          if (data) {
            this.slotsMain.push(data)
          }
        })
        Processor.getStagePokemon(configSupportExpert).then(data => {
          if (data) {
            this.slotsExpert.push(data)
          }
        })
        Processor.getStagePokemon(configSupportSpecial).then(data => {
          if (data) {
            this.slotsSpecial.push(data)
          }
        })
      })
      // console.log('special supports: ', this.slotsSpecial)
    }
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

</style>
