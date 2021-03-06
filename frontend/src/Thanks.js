import React from 'react'
import { css } from 'react-emotion'
import { Query } from 'react-apollo'
import { Trans } from '@lingui/macro'
import { H1 } from './utils/headers'
import { Stats } from './Stats'
import { GET_LANGUAGE_QUERY } from './utils/queriesAndMutations'
import { TrackPageViews } from './TrackPageViews'

const getCyberSafeLink = lang => {
  return lang === 'en'
    ? 'https://www.getcybersafe.gc.ca/index-en.aspx'
    : 'https://www.pensezcybersecurite.gc.ca/index-fr.aspx'
}

const getCyberTipsLink = lang => {
  return lang === 'en'
    ? 'http://www.rcmp-grc.gc.ca/to-ot/tis-set/cyber-tips-conseils-eng.htm'
    : 'http://www.rcmp-grc.gc.ca/to-ot/tis-set/cyber-tips-conseils-fra.htm'
}

const centercontent = css`
  max-width: 750px;
  margin: auto;
`
const paragraph = css`
  padding-top: 20pt;
  padding-bottom: 20pt;
  font-size: 20pt;
`

export const Thanks = () => (
  <Query query={GET_LANGUAGE_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`

      let { language } = data
      return (
        <div className={centercontent}>
          <H1>
            <Trans>Thank you for sharing your story.</Trans>
          </H1>

          <Stats />

          <TrackPageViews />
          <div className={paragraph}>
            <Trans>
              For more information on how to stay safe online, you can visit{' '}
              <a href={getCyberSafeLink(language)}>GetCyberSafe</a> and the{' '}
              <a href={getCyberTipsLink(language)}>
                Top 10 Cyber Crime Prevention Tips.
              </a>
            </Trans>
          </div>
        </div>
      )
    }}
  </Query>
)
