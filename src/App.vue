<template>
<div>
  <div class="container is-fluid" :style="{margin: '0'}">
    <nav class="nav nav-main">
      <div class="nav-right">
        <router-link class="nav-item" to="home">About</router-link>
      </div>
    </nav>
  </div>
  <div class="container is-fluid" :style="[stickUp ? stickyStyling : null, {margin: '0'}]">
    <nav class="level nav-stages">
      <div class="level-left">
        <form><strong>Stage</strong>
          <span class="eac">
            <input id="stage-selector" v-model="stageIdApp" class="stagesSelector" type="text" placeholder="?" @keyup.enter.prevent="submit">
          </span>
        </form>
      </div>
      <div class="level-right">
        <div class="mode">
          <input type="checkbox" id="switch-toggle" value="mode">
          <label for="switch-toggle" @click="toggleMode"></label>
          <h2 class="modeIndicator modeIndicator-main">Main</h2>
          <h2 class="modeIndicator modeIndicator-expert">Expert</h2>
        </div>
      </div>
    </nav>
  </div>
  <div class="container">
    <!-- STAGE COMPONENT -->
    <div class="stageSteps is-clearfix">
      <a href="#0" class="is-pulled-left" @click.prevent="back()"> &larr; Previous</a>
      <a href="#0" class="is-pulled-right" @click.prevent="next()" :style="{marginTop: '0'}">Next &rarr;</a>
    </div>

   <stage :stageIdApp="this.stageIdApp" :mode="stageMode"></stage>

    <div class="stageSteps is-clearfix">
      <a href="#0" class="is-pulled-left" @click.prevent="back()"> &larr; Previous</a>
      <a href="#0" class="is-pulled-right" @click.prevent="next()" :style="{marginTop: '0'}">Next &rarr;</a>
    </div>
  </div>
  <footer class="footer">
    <div class="container is-flex">
      <div><a href="https://www.reddit.com/r/PokemonShuffle/comments/584xvt/acronyms_used_on_rpokemonshuffle/" target="_blank">Glossary</a></div>
      <div>
        <p>
          Built by <strong>Shelune</strong>. With <a href="http://bulma.io/">Bulma</a> & <a href="https://vuejs.org/">Vue</a>.
        </p>
      </div>
      <div>
        <strong><a href="https://www.paypal.me/shelune" target="_blank">Donation goes here maybe?</a></strong>
      </div>
    </div>
  </footer>
</div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import easyAutocomplete from 'easy-autocomplete'

import Stage from 'components/Stage.vue'
import * as Resources from './resources'

export default {
  data() {
    return {
      stageIdApp: !isNaN(this.$route.params.stageId) ? this.$route.params.stageId : 0,
      stageUrl: '',
      stageMode: 'main',
      stickUp: false,
      stickyStyling: {
        margin: 0,
        position: 'fixed',
        zIndex: 2,
        width: '100%',
        top: 0
      }
    }
  },
  components: {
    Stage
  },
  watch: {
    stageMode() {
      this.autoComplete(this.stageMode)
    },
    $route() {
      this.stageIdApp = !isNaN(this.$route.params.stageId) ? this.$route.params.stageId : 0
    }
  },
  methods: {
    calculatePosY() {
      let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
      if (scrollTop > 80) {
        this.stickUp = true
      } else {
        this.stickUp = false
      }
    },
    submit() {
      console.log('pressed Enter does nothing though... Should send you away but idk')
    },
    next() {
      this.$router.push({
        name: 'home',
        params: {
          stageId: _.parseInt(this.stageIdApp) + 1
        }
      })
      //this.stageIdApp = _.parseInt(this.stageIdApp) + 1
    },
    back() {
      this.$router.push({
        name: 'home',
        params: {
          stageId: _.parseInt(this.stageIdApp) - 1
        }
      })
    },
    toggleMode() {
      if (this.stageMode == 'main') {
        this.stageMode = 'expert'
      } else {
        this.stageMode = 'main'
      }
    },
    autoComplete(mode) {
      let self = this
      let options = {
        url: Resources.stageCollectionUrl,
        listLocation: mode,
        getValue: "pokemonName",
        list: {
          match: {
            enabled: true
          },
          onClickEvent: function() {
            let stageId = _.parseInt($('#stage-selector').getSelectedItemData()['location'])
            if (isNaN(stageId)) {
              self.stageIdApp = 0
            } else {
              self.stageIdApp = _.trim(_.toString(stageId))
            }
            self.$forceUpdate()
          },
        },
        highlightPhrase: false,
        template: {
          type: "custom",
            method: function(name, pokemon) {
              return "<strong>" + name + " </strong> @" + pokemon.location;
            }
        }
      }
      $('#stage-selector').easyAutocomplete(options)
    }
  },
  mounted () {
    console.log('current stage: ', this.stageIdApp)
    this.$nextTick(() => {
      window.addEventListener('scroll', this.calculatePosY);
      this.calculatePosY()
      this.autoComplete(this.stageMode)
    })
  }
}
</script>

<style lang="scss">
@import "./styles/base/_all.scss";
@import "~bulma/bulma.sass";
@import "./styles/components/_all.scss";
@import "~easy-autocomplete/src/sass/easy-autocomplete.scss";



@font-face {
  font-family: "AvenirRoman";
  src: url("/static/fonts/Avenir-Roman.eot");
  src: url("/static/fonts/Avenir-Roman.eot?#iefix") format("embedded-opentype"),
  url("/static/fonts/Avenir-Roman.woff") format("woff"),
  url("/static/fonts/Avenir-Roman.ttf") format("truetype"),
  url("/static/fonts/Avenir-Roman#Avenir-Roman") format("svg");
  font-style: normal;
}

@font-face {
  font-family: "AvenirOblique";
  src: url("/static/fonts/Avenir-Oblique.eot");
  src: url("/static/fonts/Avenir-Oblique.eot?#iefix") format("embedded-opentype"),
  url("/static/fonts/Avenir-Oblique.woff") format("woff"),
  url("/static/fonts/Avenir-Oblique.ttf") format("truetype"),
  url("/static/fonts/fonts/Avenir-Oblique#Avenir-Oblique") format("svg");
  font-style: normal;
}

@font-face {
  font-family: "AvenirLight";
  src: url("/static/fonts/Avenir-Light.eot");
  src: url("/static/fonts/Avenir-Light.eot?#iefix") format("embedded-opentype"),
  url("/static/fonts/Avenir-Light.woff") format("woff"),
  url("/static/fonts/Avenir-Light.ttf") format("truetype"),
  url("/static/fonts/Avenir-Light#Avenir-Light") format("svg");
  font-style: normal;
}

@font-face {
  font-family: "AvenirHeavy";
  src: url("/static/fonts/Avenir-85Heavy.eot");
  src: url("/static/fonts/Avenir-85Heavy.eot?#iefix") format("embedded-opentype"),
  url("/static/fonts/Avenir-85Heavy.woff") format("woff"),
  url("/static/fonts/Avenir-85Heavy.ttf") format("truetype"),
  url("/static/fonts/Avenir-85Heavy#Avenir-85Heavy") format("svg");
  font-style: normal;
}


  html {
      font-size: 16px;
  }

  body {
    font-family: 'AvenirRoman', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: $pal-white;
  }

  .nav {
    .nav-item {
      padding: 0;
        &:hover {
          color: $pal-red;
        }
    }
  }

  .nav-right {
      margin-right: 40px;
  }

  .nav {
    &-main {
      background-color: $pal-navy;
      height: 80px;

      a {
        color: $pal-white;
        font-size: $size-large;
      }
    }

    &-stages {
      @include text-label;
      min-height: 60px;
      border-bottom: 3px solid $pal-gray;
      background: $pal-white;

      .level-left {
        margin-left: 40px;

        form {
          > strong {
            font-size: 18px;
            vertical-align: middle;
            display: inline-block;
          }
        }
      }

      .level-right {
        margin-right: 40px;
      }

      @include mobile() {
        display: flex;
        align-items: center;

        .level-left {
          margin: 0;
          margin-left: 20px;
        }

        .level-right {
          margin: 0;
          margin-right: 20px;
        }
      }
    }
  }

  // Stage Mode Selector

  .mode {
    display: flex;
    align-items: center;
    position: relative;

    input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      visibility: hidden;

      &:checked + label::after {
        margin-left: 66px;
      }
    }

    > label {
      order: 2;
      display: block;
      width: 100px;
      height: 32px;
      background-color: $pal-red;
      border-radius: 50px;
      position: relative;
      cursor: pointer;
      outline: none;
      margin: 0 10px;
      transition: all 0.3s ease;

      &::before, &::after {
        position: absolute;
        content: '';
      }

      &::before {
        top: 2px;
        left: 2px;
        bottom: 2px;
        right: 2px;
        background-color: $pal-white;
        border-radius: 50px;
        transition: all 0.3s ease;
      }

      &::after {
        top: 3px;
        left: 4px;
        background-color: $pal-red;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        transition: all 0.3s ease;
      }
    }

    @include mobile {
      input[type=checkbox]:checked ~ .modeIndicator-main {
          visibility: hidden;
        }

      input[type=checkbox]:checked ~ .modeIndicator-expert {
        visibility: visible;
        right: 45px;
      }
    }

    &Indicator {
      &-main {
        order: 1;
      }

      &-expert {
        order: 3;
      }

      @include mobile {
        position: absolute;
        font-size: 0.85rem;
        right: 6px;
        top: calc(50% + 1px);
        transform: translateY(-50%);
        z-index: 1;

        &-main {
          visibility: visible;
          right: 30px;
        }

        &-expert {
          visibility: hidden;
        }
      }
    }
  }

  // Stage ID Selector

  .stages {
    &Selector {
      border: none;
      border-bottom: 2px solid $pal-gray;
      line-height: $size-medium;
      font-size: $size-normal;
      outline: none;
      width: 120px;
      text-align: center;
    }
  }


  .stageSteps {
    padding: 24px;
    margin: 0;

    > a {
      font-family: AvenirHeavy;
      color: $pal-red;
    }

    &-left, &-right {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-size: 20px;
      background-repeat: no-repeat;
    }

    &-left {
      background-image: url('/static/img/back.png');
    }

    &-right {
      background-image: url
    }
  }

  .eac {
    display: inline-block;
    margin-left: 10px;

    input {
      border: none;
      border-radius: 0;
      border-bottom: 3px solid $pal-navy;
      box-shadow: none;
      width: 60px;

      &:focus {
        width: 180px;

        @include mobile() {
          width: 140px;
        }
      }
    }
  }

  .easy-autocomplete-container {
    ul {
      border-top: none;
      box-shadow: $shadow-default;
      width: 180px;

      @include mobile() {
        width: 140px;
      }
    }

    ul li {
      padding: 10px 12px;
      border: none;

      div {
        @include text-std;
        @include font-size(12px/14);
        text-transform: none;

        strong {
          @include font-size(12px/14);
          font-weight: 700;
        }
      }

      &.selected {
        background: $pal-navy;
        color: $pal-white;

        strong {
          color: $pal-white;
        }
      }
    }
  }

  .section {
    padding-top: 30px;
    &_title {
      @include title-section;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 60px;
    }

    @include mobile() {
      padding-bottom: 10px;
    }
  }

  .section-disruptions {
    .section_ftr {
      margin-top: 30px;
    }

    .addedSupp {
      display: flex;
      align-items: center;
      border-radius: 15px;
      box-shadow: $shadow-default;

      &_header {
        @include title-tile;
        color: $pal-white;
        border-radius: 15px 0 0 15px;
        background: $pal-navy;
        padding: 25px 40px;
      }

      &_content {
        padding: 10px 20px;
        display: flex;
        align-items: center;

        > img {
          @extend %pokemon-slot;
        }
      }

      @include mobile() {
        flex-direction: column;

        &_header {
          width: 100%;
          border-radius: 15px 15px 0 0;
          text-align: center;
        }
      }
    }
  }

  .section-supports {
    h2 {
      margin-bottom: 50px;
      margin-top: 30px;
    }

    .supports {
      li {
        padding: 0;
        margin: 5px;
      }
    }

    .parties {
      flex-wrap: wrap;
    }
  }


  .footer {
    padding: 30px 0 30px 0;

    .container {
      justify-content: space-between;

      > div {
        margin: 0 20px;

        @include mobile() {
          margin: 0 auto;
        }
      }
    }
  }

  @include mobile() {
    .nav-right {
        margin-right: 20px;
    }

    .nav-right {
        align-self: center;

        .nav-item {
            justify-content: flex-end;
        }
    }

    footer {
      .container {
        flex-direction: column;
      }
    }
  }
</style>
