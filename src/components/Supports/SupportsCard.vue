<template>
  <div :class="['column', 'card card-supports', slotIsMega ? 'card-supports-mega' : '']">
    <div class="card_hdr">{{ this.supportsTitle }}</div>
    <div class="container card_body">
      <ul class="supports columns is-multiline is-mobile">
        <li v-for="slot in slots" class="column is-narrow" :data-attr="`${slot.pokemonName} - stage ${slot.location}`">
          <img :src="slot.pokemonIcon || ''" alt="slot">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    slotIsMega () {
      return this.supportsTitle == 'Mega Slot'
    }
  },
  props: ['supportsTitle', 'slots']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../styles/base/_all.scss";

// card styling in support section
.card-supports {
  min-height: 100px;

  &-mega {
    .card_hdr {
      background: $pal-red;
    }
  }

  .supports {

    >li {
      position: relative;

      img {
        @extend %pokemon-slot;
      }

      &:after {
        @extend %tooltip;
      }

      &:hover {
        &:after {
          visibility: visible;
          opacity: 1;
          bottom: -60px;
        }
      }
    }
  }
}


</style>
