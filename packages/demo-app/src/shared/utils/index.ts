export interface IJoinClassNameParam {
    [key : string]: boolean | string | undefined
  }
  


export const toPx = (size: number) => `${size}px`
export const joinClassName = (param: IJoinClassNameParam, notRequired: boolean | any = false) => {
  if (notRequired) {
    return ''
  }
  const keys = Object.keys(param)
  return keys.map((key) => param[key] ? key : '').join(' ')
}



export const getOnOffInitialState = (val: boolean, defaultValue = 'on') => {
    if (val === undefined) {
      return defaultValue
    }
  
    return val ? 'on' : 'off'
  }


  export const addDefaultProps = (props: any, defaultProps: any) => {
    const keys = Object.keys({...props, ...defaultProps})
    const newProps: any = {}
  
    for (const key of keys) {
      newProps[key] = props[key] === undefined ? defaultProps[key] : props[key]
    }
    return newProps
  }


  export const getSelectList = (obj: any) => {
    const  keys = Object.keys(obj)
    return keys.map((key) => ({
      label: key,
      value: key
    }))
  }

  export function detectMob() {
    return ( ( window.innerWidth <= 800 ) );
  }