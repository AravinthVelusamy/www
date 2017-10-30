import {Box, Text, Flex, Heading, Subhead} from 'rebass'
import { color, space } from 'styled-system'
import styled from 'styled-components'
import React, {Component} from 'react'

import PricingTable from '../components/PricingTable'
import FeatureList from '../components/FeatureList'
import Container from '../components/Container'
import Separator from '../components/Separator'
import SearchBox from '../components/SearchBox'
import DemoLinks from '../components/DemoLinks'
import CodeCard from '../components/CodeCard'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Logo from '../components/Logo'
import {textGradient} from '../theme'

const CustomSubhead = Subhead.extend`
  ${textGradient} text-align: center;
  font-weight: normal;
  max-width: 40rem;
`

const Section = styled.section`
${color}
${space}
`

const Main = styled.main`
${color}
${space}
`

const CustomHeading = Heading.extend`
  letter-spacing: 2px;
`

const URL_FALLBACK = 'https://vimeo.com/188175573'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {loading: false, url: URL_FALLBACK}
    this.loaderStop = this.loaderStop.bind(this)
    this.setUrl = this.setUrl.bind(this)
  }

  getUrl (apiEndpoint, url) {
    return `${apiEndpoint}/?url=${url}&palette`
  }

  setUrl (url) {
    if (url !== this.state.url) this.setState({loading: true, url})
  }

  loaderStop () {
    this.setState({loading: false})
  }

  render () {
    const url = this.state.url || URL_FALLBACK
    const {apiEndpoint, data} = this.props
    const demos = data.demos.edges.map(item => item.node)

    return (
      <Main>
        <NavBar bg='white' color='black' py={1} mx='auto' />
        <Section bg='#FAFBFC' pt={[0, 5]} id='home'>
          <Container px={[0, '310px']} pt={3}>
            <Flex is='section' justify='center' direction='column' align='center'>
              <Flex justify='center' direction='column' align='center' py={3}>
                <CustomHeading f={[5, 6]} pb={2} color='#222' bold>
                  Microlink <Logo ml={1} width={['32px', '48px']} />
                </CustomHeading>
                <CustomSubhead f={[3, 4]}>
                  Turns any link into information
                </CustomSubhead>
              </Flex>
              <SearchBox
                bg='white'
                width={['80%', '100%']}
                my={3}
                loading={this.state.loading}
                placeholder={URL_FALLBACK}
                value={this.state.url !== URL_FALLBACK && this.state.url}
                onChange={this.setUrl}
              />
            </Flex>
          </Container>

          <Box pt={4}>
            <Flex is='section' justify='center' direction='column' align='center'>
              <Text pb={2} f={1} color='gray8'>
                Click to see it in action →
              </Text>
            </Flex>

            <DemoLinks
              pt={[2, 3]} px={[3, 6]}
              links={demos}
              onClick={({url}) => this.setUrl(url)}
            />
          </Box>

          <Container bg='#FAFBFC' pt={3} pb={4} px={3}>
            <CodeCard
              url={this.getUrl(apiEndpoint, url)}
              bg='#FAFBFC'
              py={[0, 4]} px={[0, 5]}
              loaderStop={this.loaderStop}
            />

          </Container>
        </Section>

        <Section bg='#FAFBFC' pt={[3, 4]} pb={[3, 4]} id='features'>
          <FeatureList />
        </Section>

        <Section bg='white' id='pricing' py={[3, 4]}>
          <Separator title='Pricing' py={3} />
          <Container py={[3, 4]}>
            <PricingTable />
          </Container>
        </Section>

        <Section bg='#FAFBFC'>
          <Footer mx={-2} py={[3, 4]} px={[3, 7]} />
        </Section>

      </Main>
    )
  }
}

export const query = graphql`
  query LandingPage {
    demos: allDemosYaml {
      edges {
        node {
          favicon
          url
        }
      }
    }
  }
`
