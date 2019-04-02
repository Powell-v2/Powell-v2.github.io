import React from 'react'
import { Global, css } from '@emotion/core'

import Header from '../components/Header'
import Cube from '../components/Cube'

import globalStyles from '../styles/global'
import { palette } from '../styles/meta'

const containerCss = css`
  display: grid;
  height: 100vh;
  grid-template-rows: 1fr 7fr;
  background-color: ${palette.black};
`

const IndexPage = () => (
  <>
    <Global styles={globalStyles} />
    <div css={containerCss}>
      <Header />
      <Cube />
    </div>
  </>
)

export default IndexPage
