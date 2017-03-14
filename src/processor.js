import * as api from './api'
import _ from 'lodash'

const typeColors = [
  {
    type: 'bug',
    code: '#87980F'
  },
  {
    type: 'dark',
    code: '#3C3025'
  },
  {
    type: 'dragon',
    code: '#6F35FC'
  },
  {
    type: 'electric',
    code: '#F7D02C'
  },
  {
    type: 'fairy',
    code: '#D685AD'
  },
  {
    type: 'flying',
    code: '#A98FF3'
  },
  {
    type: 'fighting',
    code: '#C22E28'
  },
  {
    type: 'fire',
    code: '#EE8130'
  },
  {
    type: 'ghost',
    code: '#735797'
  },
  {
    type: 'grass',
    code: '#7AC74C'
  },
  {
    type: 'ground',
    code: '#E2BF65'
  },
  {
    type: 'ice',
    code: '#96D9D6'
  },
  {
    type: 'normal',
    code: '#A8A77A'
  },
  {
    type: 'poison',
    code: '#A33EA1'
  },
  {
    type: 'psychic',
    code: '#F95587'
  },
  {
    type: 'rock',
    code: '#B6A136'
  },
  {
    type: 'steel',
    code: '#B7B7CE'
  },
  {
    type: 'water',
    code: '#6390F0'
  }
]

function getStage(config) {
  return api.get(config.url)
    .then(resp => {
      return _.find(resp.body, (stageObj) => {
        return stageObj.stageNo == config.id
      })
    })
    .catch((error) => {
      console.log('there is some error here!')
    })
}

function getTypeColor(type) {
  let color = _.find(typeColors, (pair) => {
    return pair.type == type.toLowerCase()
  })
  return color.code
}

function getCaptureRate(source) {
  let captureRates = breakLine(source)

  let captureRateBase = captureRates[0].slice(5, -1)
  let captureRateBonus = captureRates[1].slice(6, -5)

  if (isNaN(parseInt(captureRateBonus)) || isNaN(parseInt(captureRateBase))) {
    return {base: '0', bonus: '0'}
  } else {
    return {base: captureRateBase, bonus: captureRateBonus}
  }
}

function getMembers(team) {
  // break team string into array of members
  return _.words(team, /[^, ]+/g)
}

function getMegaSupports(source) {
  // get the mega array in brackets
  return _.words(source, /\[(.*?)\]/g)
}

function getOtherSupports(source) {
  // break the suggestions into mega & support arrays, drop the mega array
  let supportsArr = _.drop(breakLine(source))
  return _.words(_.compact(supportsArr), /[^, ]+/g)
}

function getCollectionData() {
  // fetch the pokemonCollection blob
  let url = './static/scripts/pokemonCollection.json'

  return api.get(url)
    .then(resp => {
      return resp.body
    })
    .catch((error) => {
      console.log('there is some error getting stage collection here!')
    })
}

function getStagePokemon(config) {
  // match pokemon name with full pokemon data from serebii
  let divisionMega = {}, divisionOthers = {},
      divisionMain = [], divisionSpecial = [], divisionExpert = []

  return getCollectionData()
  .then((collection) => {
    divisionMega = _.flatten(_.toArray(_.pick(collection, 'mega')))
    divisionOthers = _.flatten(_.toArray(_.pick(collection, ['expert', 'main', 'special'])))

    divisionMain = _.flatten(_.toArray(_.pick(collection, 'main')))
    divisionExpert = _.flatten(_.toArray(_.pick(collection, 'expert')))
    divisionSpecial = _.flatten(_.toArray(_.pick(collection, 'special')))
  })
  .then(() => {
    if (config.isMega) {
      return _.find(divisionMega, (pokemon) => {
        return isIncluded(config.name, pokemon.pokemonName)
      })
    } else if (config.separateDivision == '') {
      return _.find(divisionOthers, (pokemon) => {
        return isIncluded(config.name, pokemon.pokemonName)
      })
    } else {
      if (config.separateDivision == 'main') {
        return _.find(divisionMain, (pokemon) => {
          return isIncluded(config.name, pokemon.pokemonName) && !_.toLower(pokemon.pokemonName).includes('mega ')
        })
      }

      if (config.separateDivision == 'expert') {
        return _.find(divisionExpert, (pokemon) => {
          return isIncluded(config.name, pokemon.pokemonName)
        })
      }

      if (config.separateDivision == 'special') {
        if (config.name.toLowerCase().includes('costume')) {
          return isIncluded(config.name, pokemon.pokemonName)
        }
        return _.find(divisionSpecial, (pokemon) => {
          return isIncluded(config.name, pokemon.pokemonName) && !_.toLower(pokemon.pokemonName).includes('mega ') && !_.toLower(pokemon.pokemonName).includes('costume')
        })
      }
    }
  })
}

function breakLine(string) {
  if (string) {
		return string.split('\n');
	}
}

function breakSentences(config) {
  if (config.string) {
    return config.string.split(config.mark)
  }
}

function isIncluded(target, source) {
  return _.toLower(source).includes(_.toLower(target))
}

export {getStage, getTypeColor, getCaptureRate, getMembers, getCollectionData, getStagePokemon, getMegaSupports, getOtherSupports}
