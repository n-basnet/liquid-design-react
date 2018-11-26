import styled from 'styled-components'

export default styled.section`
  max-width: 100%;
  background: ${props => props.theme.colors.white.base};
  overflow: hidden;
  height: ${props => props.chartHeight}px;
`
