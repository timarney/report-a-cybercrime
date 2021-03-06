import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import fetch from 'isomorphic-fetch'
import gql from 'graphql-tag'

const typeDefs = `
  type Mutation {
    switchLanguage: String
  }

  type Query {
    language: String
  }
  
  type Query {
    stats {
      reportCount: Int
    }
  }
`

function createApolloClient({
  initialState = { language: 'en' },
  ssrMode = true,
  uri,
}) {
  const cache = new InMemoryCache().restore(initialState)

  const stateLink = withClientState({
    cache,
    resolvers: {
      Mutation: {
        switchLanguage: (_, args, { cache }) => {
          let query = gql`
            {
              language @client
            }
          `
          let current = cache.readQuery({ query })
          const data = {
            language: current.language === 'en' ? 'fr' : 'en',
          }
          cache.writeQuery({ data, query })
          return null
        },
      },
    },
    defaults: {
      language: initialState.language,
      whatHappened: '',
      whatWasInvolved: [],
      whatWasInvolvedOther: '',
      howWereYouAffected: '',
    },
    typeDefs,
  })

  return new ApolloClient({
    ssrMode,
    link: ApolloLink.from([
      stateLink,
      createHttpLink({
        uri,
        credentials: 'same-origin',
        fetch,
      }),
    ]),
    cache,
  })
}

export default createApolloClient
