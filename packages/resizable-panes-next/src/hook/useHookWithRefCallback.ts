import {useCallback, useRef} from 'react'
import {noop} from '../../../resizable-core'
export function useHookWithRefCallback (callBack: any, callBackForNoNode: any = noop) {
  const ref = useRef(null)
  const setRef = useCallback((node: any) => {
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
    }

    if (node) {
      callBack(node)
    } else {
      callBackForNoNode(ref.current)
    }

    // Save a reference to the node
    ref.current = node
  }, [])

  return [setRef]
}

// https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
