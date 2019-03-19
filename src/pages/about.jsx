import React from 'react'
import { Global, css, keyframes } from '@emotion/core'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import globalStyles from '../styles/global'

const containerCss = css`
  display: grid;
  height: 100vh;
  grid-template-columns: 2fr 1fr;
  background-color: black;
`

const mainCss = css`
  display: grid;
  color: white;
`

const headerCss = css`
  margin: auto;
`

const h1Css = css`
  position: relative;
  left: -100%;
  &::before {
    content: attr(data-about-me);
    display: inline;
    position: absolute;
    bottom: -30%;
    left: 10%;
    font-size: 9rem;
    opacity: 0.2;
    white-space: nowrap;
  }
`

const blink = keyframes`
  from, 19.999%, 25%, to {
    z-index: 0;
  }

  20%, 24.999% {
    z-index: 11;
  }
`

const distort = keyframes`
  0.5%, 1.5%, 2.5% {
    filter: contrast(150%) blur(1px) hue-rotate(-45deg);
  }

  1%, 3%, 5% {
    filter: contrast(100%) blur(0) hue-rotate(0);
  }

  30%, 31.999%, 32.999% {
    filter: saturate(200%);
  }

  29.999%, 32%, 44% {
    filter: saturate(100%);
  }

  70% {
    filter: hue-rotate(220deg);
  }

  69.999%, 73% {
    filter: hue-rotate(0);
  }

  74%, from {
    filter: sepia(0);
  }

  to {
    filter: sepia(50%);
  }
`

const asideCss = css`
  position: relative;
  height: 100%;
  &:hover .mask {
    z-index: 11;
    &:nth-of-type(1) {
      animation: ${blink} 2s infinite alternate;
    }
    &:nth-of-type(2) {
      animation: ${blink} 2s -100ms infinite;
    }
    &:nth-of-type(3) {
      animation: ${blink} 2s -200ms infinite;
    }
    &:nth-of-type(4) {
      animation: ${blink} 2s -300ms infinite alternate;
    }
    &:nth-of-type(5) {
      animation: ${blink} 2s -400ms infinite alternate;
    }
    &:nth-of-type(6) {
      animation: ${blink} 2s -500ms infinite;
    }
  }
  &:hover :not(.mask) {
    animation: ${distort} 10s infinite;
  }
`

const AboutPage = () => {
  const images = useStaticQuery(graphql`
    query {
      placeholderImage: allFile(
        filter: { sourceInstanceName: { eq: "images" } }
      ) {
        edges {
          node {
            extension
            childImageSharp {
              fluid {
                originalName
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <Global styles={globalStyles} />
      <div css={containerCss}>
        <main css={mainCss}>
          <header css={headerCss}>
            <h1 css={h1Css} data-about-me="About me">About me</h1>
          </header>
          <p css={css`margin-bottom: 2rem;`}>Get to know me better.</p>
        </main>
        <aside css={asideCss}>
          {images.placeholderImage.edges.map(({ node }) => {
            const { fluid } = node.childImageSharp
            const { originalName } = fluid
            const { extension } = node

            return (
              <Img
                fluid={fluid}
                alt={originalName}
                style={{
                  height: `100%`,
                  ...(extension === `png`)
                  && {
                    position: `absolute`,
                    width: `100%`,
                    filter: `brightness(90%) contrast(122%)`,
                  }
                }}
                className={(extension === `png`) ? "mask" : ""}
              />
            )
          })}
        </aside>
      </div>
    </>
  )
}

export default AboutPage
