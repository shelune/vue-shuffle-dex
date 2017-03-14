<template>
  <div class="column card card-team">
    <div class="card_hdr">{{ stratTitle }}</div>
    <div class="container card_body">
      <div class="card-team_content" v-for="team in teamData">
        <p class="card-team_supports">
          <strong>Pokemons: </strong>
          <span v-for="support, index in team.slots" :class="index == 0 ? 'mega' : ''">{{ support ? support : '?' }}{{ index == team.slots.length - 1 ? '.' : ', ' }}</span>
        </p>
        <p class="card-team_items">
          <strong>Items: </strong>
          <span>{{ team.items.length > 1 ? team.items : 'Varied' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      megaData: {pokemonIcon: '', pokemonName: '', location: ''},
      supportsData: []
    }
  },
  props: ['teamData', 'stratTitle'],
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
@import "../styles/base/_all.scss";
@import "~bulma/bulma.sass";
@import "../styles/components/_card.scss";

</style>
