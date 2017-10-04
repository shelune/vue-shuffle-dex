<template>
  <div :class="['column is-4 card card-party', partyIsOptimal ? 'party-optimal' : 'party-alt']">
    <div class="card_tag">{{ this.partyTitle }}</div>
    <div class="card-party_content">
      <div :class="['card-party_slot', 'card-party_slot-mega']">
        <img :src="megaSlot ? megaSlot.pokemonIcon : ''" alt="Mega Slot">
        <div class="candy show"></div>
      </div>
      <div v-for="support in supportSlots" :class="['card-party_slot', support]">
        <img :src="support ? support.pokemonIcon : ''" :alt="support ? support.pokemonName : '?'">
        <div class="ss show"></div>
        <div class="sb sb-3 show"></div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import * as Processor from './../../processor'

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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../styles/base/_all.scss";

// card styling in team selection section
.card-party {
  box-shadow: $shadow-default, inset 0 5px $pal-navy;
  background: $pal-white;
  color: $pal-black;
  padding: 10px;
  border-radius: 0 0 30px 0;
  text-align: center;
  margin-bottom: 30px;

  &_content {
    padding: 20px;
    display: flex;
    align-items: center;
  }

  &_slot {
    margin: 0 5px;
    position: relative;
    width: 60px;
    height: 60px;

    .candy {
      @extend %enhancement;
      background-image: url('/static/img/msu.png');
      top: -12px;
      left: -12px;
    }

    .sb {
      @extend %enhancement;
      bottom: -15px;
      right: 0px;

      &-3 {
        background-image: url('/static/img/skill-booster-lv3.png');
      }

      &-4 {
        background-image: url('/static/img/skill-booster-lv4.png');
      }

      &-5 {
        background-image: url('/static/img/skill-booster-lv5.png');
      }
    }

    .ss {
      @extend %enhancement;
      background-image: url('/static/img/skill_swapper.png');
      top: -15px;
      left: 0px;
    }

    > img {
      @extend %pokemon-slot;
      width: 100%;
      height: auto;
    }

    &:after {
      width: 30px;
      height: 30px;
      content: '';
      border-radius: 50%;
      border: 2px solid $pal-white;
      box-shadow: $shadow-default;
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-15px);
      display: none;
    }
  }

  &.party-optimal {
    box-shadow: $shadow-default, inset 0 5px $pal-red;

    .card_tag {
      background: $pal-red;
    }
  }
}

</style>
