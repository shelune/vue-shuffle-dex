<template>
  <div class="column card card-disruptions card-disruptions-board">
    <div class="card_hdr">{{ disruptionTitle }}</div>
    <div class="container card_body">
      <ul class="disruptions">
        <li v-if="disruptionsTrigger"> <strong>Condition:</strong> {{ disruptionsTrigger }}</li>
        <li v-for="disruption in disruptions">{{ capitalize(disruption) }}{{ capitalize(disruption).endsWith('.') ? '' : '.' }}</li>
        <li v-if="variations.length > 0">
          <ul>
            <li v-for="variation in variations"> {{ capitalize(variation) }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hasVariations: false
    }
  },
  props: ['disruptionTitle', 'disruptions', 'disruptionsTrigger', 'variations'],
  watch: {
    disruptions() {
      this.updateVariations()
    }
  },
  methods: {
    updateVariations() {
      if (_.isArray(this.variations) && this.variations.length > 0) {
        this.hasVariations = true
      }
    },
    capitalize(string) {
      return string.length > 0 ? _.upperFirst(string) : 'Unknown'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../styles/base/_all.scss";
@import "~bulma/bulma.sass";

// card styling in disruptions section
.card-disruptions {
  .disruptions {
    > li {
      margin: 20px 0 10px 0;
      padding-bottom: 10px;
      border-bottom: 5px solid $pal-turquoise;

      &:first-of-type {
        margin-top: 0;
      }

      &:not(:only-of-type):last-of-type {
        border-bottom: none;
      }
    }

    ul {
      padding-left: 30px;

      >li {
        margin: 10px 0 5px 0;
        padding-bottom: 5px;
        border-bottom: 2px solid $pal-turquoise;

        &:first-of-type {
          margin-top: 0;
        }

        &:last-of-type {
          border-bottom: none;
        }
      }
    }
  }
}


</style>
