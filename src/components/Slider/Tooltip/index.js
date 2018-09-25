import styled from 'styled-components'

export const Tooltip = styled.div`
  position: absolute;
  left: ${props => props.value}%;
  bottom: 26px;
  transform: translate(-50%);
  display: flex;
  justify-content: center;
  margin-top: -22px;
  text-align: center;
  font-size: 16px;
  font-weight: ${props => props.theme.fontWeight.black};
  line-height: 0.94;
  letter-spacing: 0.3px;
  color: ${props => props.theme.colors.primary.base};
  opacity: ${props => (props.value > 0 ? '1' : '0')};
`
