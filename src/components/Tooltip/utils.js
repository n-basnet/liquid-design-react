import { css } from 'styled-components'

import { ARROW_SIZE, WALLS, SIDES } from '../../components/Tooltip/consts'

const isHorizontalWall = wall => wall === WALLS.top || wall === WALLS.bottom

const getYAttribute = ({ wall, side }) => {
  if (
    wall === WALLS.top ||
    (wall === WALLS.left && side === SIDES.right) ||
    (wall === WALLS.right && side === SIDES.left)
  ) {
    return WALLS.top
  } else {
    return WALLS.bottom
  }
}

const getXAttribute = ({ wall, side }) => {
  if (
    wall === WALLS.right ||
    (wall === WALLS.top && side === SIDES.right) ||
    (wall === WALLS.bottom && side === SIDES.left)
  ) {
    return SIDES.right
  } else {
    return SIDES.left
  }
}

const getArrow = ({ color, direction, size = ARROW_SIZE }) =>
  ({
    top: css`
      border-bottom: ${size}px solid ${color};
      border-left: ${size}px solid transparent;
      border-right: ${size}px solid transparent;
    `,
    bottom: css`
      border-top: ${size}px solid ${color};
      border-left: ${size}px solid transparent;
      border-right: ${size}px solid transparent;
    `,
    right: css`
      border-top: ${size}px solid transparent;
      border-bottom: ${size}px solid transparent;
      border-left: ${size}px solid ${color};
    `,
    left: css`
      border-top: ${size}px solid transparent;
      border-bottom: ${size}px solid transparent;
      border-right: ${size}px solid ${color};
    `,
  }[direction])

export const getArrowStyle = ({ color, wall, side }) => css`
  ${getYAttribute({ wall, side })}: ${isHorizontalWall(wall) ? -10 : 20}px;
  ${getXAttribute({ wall, side })}: ${isHorizontalWall(wall)
    ? ARROW_SIZE
    : -ARROW_SIZE}px;
  ${getArrow({ direction: wall, color })};
`

const getYPosValue = ({ wall, side }) => {
  if (isHorizontalWall(wall)) {
    return wall === WALLS.top ? 28 : 43
  } else {
    return wall === side ? -17 : -26
  }
}

const getXPosAttribute = ({ wall, side }) => {
  if (
    wall === WALLS.left ||
    (wall === WALLS.top && side === SIDES.left) ||
    (wall === WALLS.bottom && side === SIDES.right)
  ) {
    return SIDES.left
  } else {
    return SIDES.right
  }
}

export const getPosition = props => css`
  ${getYAttribute(props)}: ${getYPosValue(props)}px;
  ${getXPosAttribute(props)}: ${isHorizontalWall(props.wall) ? -10 : 40}px;
`
