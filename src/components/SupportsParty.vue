<template>
  <div :class="['column is-4 card card-party', partyIsOptimal ? 'party-optimal' : 'party-alt']">
    <div class="card_tag">{{ this.partyTitle }}</div>
    <div class="card-party_content">
      <div :class="['card-party_slot', 'card-party_slot-mega']">
        <img :src="megaSlot ? megaSlot.pokemonIcon : ''" alt="Mega Slot">
      </div>
      <div v-for="support in supportSlots" :class="['card-party_slot', support]">
        <img :src="support ? support.pokemonIcon : ''" :alt="support ? support.pokemonName : '?'">
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import * as Processor from './../processor'

export default {
  data () {
    return {
      megaData: {pokemonIcon: '', pokemonName: '', location: ''},
      supportsData: []
    }
  },
  watch: {
    teamData() {
      this.resetData()
      // this.updateThumbnails()
    }
  },
  props: ['teamData', 'partyTitle'],
  computed: {
    partyIsOptimal () {
      return this.partyTitle == 'Optimal'
    },
    megaSlot() {
      return this.teamData ? this.teamData[0] : ''
    },
    supportSlots() {
      let supports = _.drop(this.teamData)
      return supports
    }
  },
  methods: {
    resetData() {
      this.megaData = {pokemonIcon: '', pokemonName: '', location: ''}
      this.supportsData = []
    },
    updateThumbnails() {
      console.log('team data: ', this.teamData);

      // mega thumbnails
      let configMega = {name: _.trim(this.megaSlot) || '', isMega: true, separateDivision: ''}
      Processor.getStagePokemon(configMega).then((data) => {
        this.megaData = data
      })

      // supports thumbnails
      _.each(this.supportSlots, (support) => {
        let configSupport = {name: _.trim(support) || '', isMega: false, separateDivision: ''}
        Processor.getStagePokemon(configSupport).then(data => {
          this.supportsData.push(data)
        })
      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/base/_all.scss";
@import "~bulma/bulma.sass";
@import "../styles/components/_card.scss";

</style>
