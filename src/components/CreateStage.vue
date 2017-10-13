<template>
  <div class="container">
    <h1 class="title has-text-centered">Submit New Stage</h1>
    <div class="columns">
      <div class="column stage_no">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Stage No.</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="number" placeholder="ID" v-model="stageNo">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_name">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Stage Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="text" placeholder="Name" v-model="name">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_hp">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Stage HP</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="number" placeholder="HP" v-model="hitPts">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_type">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Stage Type</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="text" placeholder="Type" v-model="type">
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column stage_icon">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Stage Icon</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="number" placeholder="Icon" v-model="icon">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_ability">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Stage Ability</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="text" placeholder="Ability" v-model="ability">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_turns">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Stage Turns</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="number" placeholder="Turns" v-model="moves">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_supportCount">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Stage Supports Count</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <label class="radio">
                  <input type="radio" name="supportCount" value="3" v-model="supportCount">
                  3
                </label>
                <label class="radio">
                  <input type="radio" name="supportCount" value="4" v-model="supportCount">
                  4
                </label>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column stage_capture-base">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Base Capture Rate</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="number" placeholder="Base %" v-model="captureRateBase">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_capture-bonus">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Bonus Capture Rate</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="number" placeholder="Bonus %" v-model="captureRateBonus">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_layout">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Board Layout</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="text" placeholder="Board layout" v-model="initialBoardSetup">
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_added">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Added Support?</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="text" placeholder="Added Support" v-model="disruptionAdded">
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column stage_disruptions-board">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Disruption Board</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="e.g. Board Disruptions" v-model="disruptionBoard"></textarea>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_disruptions-init">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Disruption Initial</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="e.g. Initial Disruptions" v-model="disruptionInitial"></textarea>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_disruptions-timer">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Disruption Timer</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="e.g. Timer Disruptions" v-model="disruptionTimer"></textarea>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_disruptions-conditional">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Disruption Conditional</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="e.g. Conditional Disruptions" v-model="disruptionCondition"></textarea>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column stage_clearingStrat">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Stage Clearing Strat</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="e.g. Hello world" v-model="clearingStrategy"></textarea>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_sRankStrat">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Stage S-Rank Strat</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="e.g. Hello world" v-model="srankingStrategy"></textarea>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column stage_clearingTeam">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Stage Clearing Team</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input type="text" class="input" placeholder="Clearing Mega" v-model="suggestedClearingMega">
              </p>
            </div>
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="Clearing Team" v-model="suggestedClearingSupports"></textarea>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column stage_sRankTeam">
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">Stage S-Rank Team</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input type="text" class="input" placeholder="Srank Mega" v-model="suggestedSrankMega">
              </p>
            </div>
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="SRank Team" v-model="suggestedSrankSupports"></textarea>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <div class="control">
            <button class="button is-primary" @click.prevent="addStage">Submit</button>
          </div>
        </div>
      </div>
      <div class="column">
        <h3>Result</h3>
        <pre>
          <code>
            {{`{
              name: ${this.name},
              ability: ${this.ability},
              basePower: ${this.basePower},
              captureRateBase: ${this.captureRateBase},
              captureRateBonus: ${this.captureRateBonus},
              disruptionBoard: ${this.disruptionBoard},
              disruptionInitial: ${this.disruptionInitial},
              disruptionTimer: ${this.disruptionTimer},
              disruptionAdded: ${this.disruptionAdded},
              disruptionCondition: ${this.disruptionCondition},
              hitPts: ${this.hitPts},
              icon: ${this.icon},
              initialBoardSetup: ${this.initialBoardSetup},
              moves: ${this.moves},
              supportCount: ${this.supportCount},
              recommendedParty: ${this.recommendedParty},
              clearingStrategy: ${this.clearingStrategy},
              srankingStrategy: ${this.srankingStrategy},
              stageNo: ${this.stageNo},
              suggestedSrankMega: ${this.suggestedSrankMega},
              suggestedSrankSupports: ${this.suggestedSrankSupports},
              suggestedClearingMega: ${this.suggestedClearingMega},
              suggestedClearingSupports: ${this.suggestedClearingSupports},
              type: ${this.type}
            }`}}
          </code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      ability: '',
      basePower: 0,
      captureRateBase: '',
      captureRateBonus: '',
      disruptionBoard: '',
      disruptionInitial: '',
      disruptionTimer: '',
      disruptionAdded: '',
      disruptionCondition: '',
      hitPts: '',
      icon: '',
      initialBoardSetup: '',
      mobileNotes: '',
      moves: '',
      supportCount: 4,
      recommendedParty: '',
      clearingStrategy: '',
      srankingStrategy: '',
      stageNo: 0,
      suggestedSrankMega: '',
      suggestedSrankSupports: '',
      suggestedClearingMega: '',
      suggestedClearingSupports: '',
      type: ''
    }
  },
  methods: {
    createStage() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/base/_variables.scss";

.field {
  margin-bottom: 20px;
}

.title {
  margin-top: 20px;
}
</style>
