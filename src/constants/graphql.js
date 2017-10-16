import gql from 'graphql-tag'

export const ALL_STAGES_QUERY = gql`
  query AllStagesQuery {
    allStages {
      id,
      name,
      type,
      stageNo,
      hitPts
    }
  }
`

export const CREATE_STAGE_MUTATION = gql`
  mutation CreateStageMutation(
    $ability: String!,
    $basePower: Int!,
    $captureRate: String!,
    $clearingStrategy: String!,
    $disruptions: String!,
    $hitPts: Int!,
    $icon: String!,
    $initialBoardSetup: String!,
    $moves: Int!,
    $name: String!,
    $pokemon: Int!,
    $recommendedParty: String!,
    $srankingStrategy: String!,
    $stageNo: Int!,
    $suggestedSrank: String!,
    $suggestedTeam: String!,
    $type: String!
  ) {
    addStage(
      ability: $ability,
      basePower: $basePower,
      captureRate: $captureRate,
      clearingStrategy: $clearingStrategy,
      disruptions: $disruptions,
      hitPts: $hitPts,
      icon: $icon,
      initialBoardSetup: $initialBoardSetup,
      moves: $moves,
      name: $name,
      pokemon: $pokemon,
      recommendedParty: $recommendedParty,
      srankingStrategy: $srankingStrategy,
      stageNo: $stageNo,
      suggestedSrank: $suggestedSrank,
      suggestedTeam: $suggestedTeam,
      type: $type
    ) {
      id,
      name,
      stageNo,
      type,
      basePower,
      ability
    }
  }
`
