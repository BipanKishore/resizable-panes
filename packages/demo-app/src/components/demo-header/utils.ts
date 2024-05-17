import { getLibName } from "../resizable-demo/util";

export const react = 'react'
export const js = 'js'
export const next = 'next'

export const getDetailsByLib = () => {
    const libType = getLibName()

    const npmLink = `https://www.npmjs.com/package/resizable-panes-${libType}`
    const libName = `resizable-panes-${libType}`
    const getTitle = (type: string) => `Resizable Panes ${type}`

    switch (libType) {
        case react:
            return {
                libName,
                title: getTitle(`React`),
                npmLink,
                libType
            }
        case js:
            return {
                libName,
                title: getTitle(`JS`),
                npmLink,
                libType
            }
        case next:
            return {
                libName,
                title: getTitle(`Next`),
                npmLink,
                libType
            }
    }

    return {}
}