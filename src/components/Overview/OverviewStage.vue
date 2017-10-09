<template>
  <div class="column card card-overview card-overview-stage is-6">
    <div class="modal" :class="modalOpened ? 'show' : ''">
      <div class="modal-background"></div>
      <div class="modal-content">
        <img :src="layout" alt="stage view" class="stage_view">
      </div>
      <button class="modal-close" @click="closeModal"></button>
    </div>
    <h2>Stage {{ number }} / {{ mode == 'main' ? stageLimit.main : stageLimit.expert }}</h2>
    <div :class="['stage_supportLimit', parseInt(supportLim) >= 4 ? 'stage_supportLimit-4' : 'stage_supportLimit-3']"></div>
    <div class="card_tag">
      Stage Info
    </div>
    <div class="card_tag card_tag-switch is-hidden-desktop" @click="switchView">Switch To Pokemon Info</div>
    <div class="columns">
      <div class="column is-7">
        <div class="glances">
          <div v-if="requirements > 1" class="glance glance-reqs">
            <strong>Requirements</strong>
            <span>{{ requirements }} S-Ranks</span>
          </div>
          <div class="glance glance-hp">
            <strong>Hit Points</strong>
            <span>{{ hitPts }}</span>
          </div>
          <div class="glance glance-moves">
            <strong>{{ this.time.length > 1 ? 'Time' : 'Moves' }}</strong>
            <span>{{ this.time.length > 1 ? time : moves }}</span>
          </div>
          <div class="glance glance-sranks">
            <strong>S-Ranks</strong>
            <span>{{ srankCount }}</span>
          </div>
          <div class="glance glance-layout">
            <strong @click="openModal">Click for starting board</strong>
          </div>
        </div>
      </div>
      <div class="column stage_visuals">
        <img :src="layout" alt="stage view" class="stage_view">
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import * as Resources from './../../resources'

export default {
  data () {
    return {
      number: '?',
      layout: '/static/img/pikachu-angry.svg',
      moves: '?',
      time: '?',
      sRank: '?',
      hitPts: '?',
      supportLim: '',
      requirements: '?',
      modalOpened: false,
      stageLimit: {main: Resources.mainStageCap, expert: Resources.expertStageCap}
    }
  },
  props: ['stageData', 'mode'],
  computed: {
    srankCount() {
      //console.log(`${this.moves / 2} / ${this.moves}`);
      if (this.time.length > 1) {
        //console.log('srank in time')
        return this.sRank
      } else {
        if (this.sRank) {
          //console.log('srank provided', this.sRank)
          return `${this.sRank} / ${this.moves}`
        }
        //console.log('srank not provided')
        return `${_.floor(this.moves / 2)} / ${this.moves}`
      }
    }
  },
  watch: {
    stageData() {
      this.updateStageNo()
      this.updateRanksRequirements()
      this.updateHP()
      this.updateMoves()
      this.updateSRanks()
      this.updateLayout()
      this.updateSupportLim()
    }
  },
  methods: {
    switchView() {
      this.$emit('switch-overview')
    },
    updateStageNo() {
      this.number = this.stageData.stageNo
    },
    updateHP() {
      this.hitPts = this.stageData.hitPts
    },
    updateMoves() {
      this.moves = '?'
      this.time = '?'
      if (this.stageData.moves) {
        this.moves = this.stageData.moves
      }
      if (this.stageData.time) {
        this.time = this.stageData.time
      }
    },
    updateRanksRequirements() {
      this.requirements = ''
      if (this.stageData.srank) {
        this.requirements = _.parseInt(this.stageData.srank)
      }
    },
    updateSRanks() {
      this.sRank = this.stageData.srankMoves
    },
    updateLayout() {
      if (this.stageData.initialBoardSetup && this.stageData.initialBoardSetup.includes('http')) {
        this.layout = this.stageData.initialBoardSetup
      }
    },
    updateSupportLim() {
      this.supportLim = this.stageData.pokemon
    },
    openModal() {
      this.modalOpened = true
    },
    closeModal() {
      this.modalOpened = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../styles/base/_all.scss";
@import "~bulma/bulma.sass";


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


    &-layout {
      display: none;
      cursor: pointer;

      @include mobile() {
        display: block;
        text-align: center;

        > strong {
          color: $pal-red;
        }
      }
    }

  }
}

.stage_visuals {
  display: flex;
  align-items: center;

  >img {
    width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    max-width: 200px;
  }

  @include mobile() {
    display: none;
  }
}

.stage_supportLimit {
  position: absolute;
  bottom: -40px;
  left: -40px;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-size: 100px;
  border: 5px solid $pal-white;
  box-shadow: $shadow-default;
  background-color: $pal-turquoise;
  background-repeat: no-repeat;
  background-position: 50%;
  z-index: 1;

  &:after {
    @extend %tooltip;
    content: 'Number of supports you have';
    left: 125%;
    bottom: 10px;
  }

  &:hover {
    &:after {
      visibility: visible;
      opacity: 1;
    }
  }

  &-4 {
    background-image: url("./../../assets/img/misc/supportLim-4.png");
  }

  &-3 {
    background-image: url("./../../assets/img/misc/supportLim-3.png");
  }

  @include mobile() {
    top: -40px;
    left: -10px;
  }
}

@include tablet-only() {
  >.columns {
    display: block;

    .is-7 {
      width: 100%;
    }
  }
}


.modal {
  &.show {
    display: block;
  }

  &-content {
    margin: 20px auto;
    width: calc(100% - 20px);
  }

  &-close {
    background-color: $pal-red;

    &:hover {
      background-color: $pal-white;

      &::after, &::before {
        background: $pal-red;
      }
    }
  }
}

</style>
