<template>
  <div class="column card card-overview card-overview-pokemon">
    <div class="card_tag">
      Pokemon Info
    </div>
    <div class="card_tag card_tag-switch is-hidden-desktop" @click="switchView">Switch To Stage Info</div>
    <div class="columns">
      <div class="column">
        <h2>{{ name }}
          <div class="stage_pokemonThumbnail" :style="{backgroundImage: pokemonThumbnail}"></div>
        </h2>
        <div class="glances">
          <div class="glance glance-type">
            <strong class="is-pulled-left">Type</strong>
            <span class="is-pulled-right" :style="{color: type.code, fontFamily: 'AvenirHeavy'}">{{ type.name }}</span>
          </div>
          <div class="glance glance-basepower">
            <strong class="is-pulled-left">Base Power</strong>
            <span class="is-pulled-right">{{ basePower }}</span>
          </div>
          <div class="glance glance-ability">
            <strong class="is-pulled-left">Ability</strong>
            <span class="is-pulled-right">{{ ability }}</span>
          </div>
          <div class="glance glance-catchrate">
            <strong class="is-pulled-left">Base Catch Rate</strong>
            <span class="is-pulled-right">{{ captureRate.base }}%</span>
          </div>
          <div class="glance glance-catchrate glance-catchrate-bonus">
            <strong class="is-pulled-left">Bonus Catch Rate</strong>
            <span class="is-pulled-right">{{ `${captureRate.bonus} / move` }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Processor from './../../processor'

export default {
  data () {
    return {
      thumbnail: '01',
      name: '?',
      type: {name: '?', code: ''},
      basePower: '?',
      ability: '?',
      captureRate: {base: '', bonus: ''}
    }
  },
  props: ['stageData'],
  watch: {
    stageData() {
      this.updateName()

      this.updateThumbnail()
      this.updateType()
      this.updateBP()
      this.updateAbility()
      this.updateCaptureRates()
    }
  },
  methods: {
    switchView() {
      this.$emit('switch-overview')
    },
    updateName() {
      this.name = this.stageData.name
    },
    updateThumbnail() {
      this.thumbnail = this.stageData.icon
    },
    updateType() {
      this.type.code = Processor.getTypeColor(this.stageData.type)
      this.type.name = this.stageData.type
    },
    updateBP() {
      this.basePower = this.stageData.basePower
    },
    updateAbility() {
      this.ability = this.stageData.ability
    },
    updateCaptureRates() {
      this.captureRate = Processor.getCaptureRate(this.stageData.captureRate)
    }
  },
  computed: {
    pokemonThumbnail () {
      return `url('./static/img/sprites/icon_${this.thumbnail}.png')`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../styles/base/_all.scss";
@import "~bulma/bulma.sass";

.column {
  text-align: center;
}

// card styling in overview section

// card styling in overview section
.card-overview {
  box-shadow: $shadow-default, inset 0 5px $pal-navy;
  background: $pal-white;
  color: $pal-black;
  padding: 40px;
  border-radius: 0 0 30px 0;
  text-align: center;

  h2 {
    @include title-card;
    margin-bottom: 20px;
    position: relative;
    display: inline-block;
  }

  .glance {
    position: relative;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    line-height: 40px;

    &:after {
      position: absolute;
      content: '';
      width: 100%;
      height: 5px;
      background: $pal-red;
      bottom: -10px;
      left: 0;
    }

    > strong {
      display: inline-block;
      text-align: left;
    }

    > span {
      display: inline-block;
      text-align: right;
    }

    &:last-of-type {
      &:after {
        display: none;
      }
    }
  }

  &-pokemon {
    margin-left: 20px;

    h2 {
      margin-right: 30px;
    }

    .stage_pokemonThumbnail {
      display: block;
      width: 60px;
      height: 60px;
      background-size: 60px;
      border-radius: 50%;
      background-color: transparent;
      position: absolute;
      right: -65px;
      top: 50%;
      transform: translateY(-50%);
    }

    @include mobile() {
      margin: 0 10px;

      h2 {
        margin-right: 0;
      }

      .stage_pokemonThumbnail {
        margin: 0 auto;
        transform: none;
        top: 0;
        right: 0;
        position: relative;
      }
    }
  }
}

</style>
