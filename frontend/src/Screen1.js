import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { Link, navigate } from '@reach/router'
import { css } from 'react-emotion'
import { Trans } from '@lingui/macro'
import { Form, Field } from 'react-final-form'
import Button from '@govuk-react/button'
import { H1 } from './utils/headers'
import ListItem from '@govuk-react/list-item'
import Breadcrumb from '@govuk-react/breadcrumb'
import { TrackPageViews } from './TrackPageViews'

const warning = css`
  display: block;
  color: green;
  padding-top: 10pt;
  margin-left: 0pt;
  margin-bottom: 20pt;
  font-size: 19pt;
`
const centercontent = css`
  max-width: 750px;
  margin: auto;
`
const submitButton = css`
  margin-top: 20pt;
`
const listitem = css`
  margin: 5pt;
  margin-left: 20pt;
  font-size: 19pt;
`
const textArea = css`
  width: 500pt;
  height: 200pt;
  font-size: 19pt;
`

const submitAndNavigate = (client, data) => {
  client.writeData({ data: data })
  navigate('/form2')
}

const validate = () => {}

const MyForm = () => (
  <ApolloConsumer>
    {client => (
      <Form
        onSubmit={data => submitAndNavigate(client, data)}
        validate={validate}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="whatHappened"
                component="textarea"
                className={textArea}
                placeholder=""
              />
            </div>

            <Button
              className={submitButton}
              type="submit"
              disabled={pristine || invalid}
            >
              <Trans>Next</Trans>
            </Button>
          </form>
        )}
      />
    )}
  </ApolloConsumer>
)

export const Screen1 = () => (
  <div className={centercontent}>
    <Breadcrumb>
      <Link to={'/'}>
        <Trans>Landing Page</Trans>
      </Link>
    </Breadcrumb>

    <H1>
      <Trans>Describe what happened</Trans>
    </H1>

    <TrackPageViews />
    <ListItem className={listitem}>
      <Trans>When did it take place?</Trans>
    </ListItem>
    <ListItem className={listitem}>
      <Trans>In general terms, who was involved?</Trans>
    </ListItem>
    <ListItem className={listitem}>
      <Trans>How were you affected?</Trans>
    </ListItem>

    <span className={warning}>
      <Trans> Please do not provide any personal information. </Trans>
    </span>

    {MyForm()}
  </div>
)
