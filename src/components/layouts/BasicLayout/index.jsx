import { Container } from 'semantic-ui-react'

import Header from '../../Header'

const BasicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  )
}

export default BasicLayout
