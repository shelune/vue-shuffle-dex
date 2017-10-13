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
