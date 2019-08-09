const BUTTON_COLOR = '#DDD'
const BUTTON_BACKGROUND_COLOR = 'darkred'
const BUTTON_BACKGROUND_COLOR_DISABLED = '#AAA'
const BUTTON_SHADOW_COLOR = '#FFF'

const styleDefault = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  textDecoration: 'none',
  fontSize: '1em',
  fontFamily:
    'Lucida Grande,Lucida Sans Unicode,Lucida Sans,Geneva,Verdana,sans-serif',
  margin: 0,
  padding: '0.309em 0.618em',
  background: `${BUTTON_BACKGROUND_COLOR}`,
  border: 'none',
  filter: `drop-shadow(2px 2px 0 ${BUTTON_SHADOW_COLOR})`,
  color: BUTTON_COLOR,
  transition: 'all 0.2s ease 0s',
  outline: 'none',
  borderRadius: '1.618em',
  transform: 'translateY(-1px)',
}

const styleHoverDefault = {
  cursor: 'pointer',
}
const stylePressDefault = {
  transform: 'translateY(1px)',
  filter: `drop-shadow(0 0 0 ${BUTTON_SHADOW_COLOR})`,
}
const styleFocusDefault = {}
const styleDisableDefault = {
  background: BUTTON_BACKGROUND_COLOR_DISABLED,
}

export function mergeButtonStyles(hovering, pressing, focusing, disabled) {
  return {
    ...styleDefault,
    ...(hovering ? styleHoverDefault : {}),
    ...(pressing ? stylePressDefault : {}),
    ...(focusing ? styleFocusDefault : {}),
    ...(disabled ? styleDisableDefault : {}),
  }
}
