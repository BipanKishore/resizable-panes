# The modern library that solve all resizing use cases. Don't trust! Try it

[![resizable-panes-react][build-n-deploy-badge-link]][build-n-deploy-link]
[![nycrc config on GitHub][nyc-link]][build-n-deploy-link]
[![NPM Version][npm-version-badge]][npm-link]
[![npm bundle size][npm-min-size-badge-link]][npm-min-size-link]
 [![Quality Gate Status][sonar-react-badge-link]][sonar-react-link]

<!-- [Cypress Recoreded tests are available here](https://cloud.cypress.io/projects/2xc7po/branches/master/overview) -->

## [Quick Demo!][quick-demo-link]

## Key Features

- **Smooth Resizing:** Enjoy smooth and fast pane resizing without performance issues.

- **No Unnecessary Rerenders:** Child components in the panes won't rerender during resizing, ensuring a seamless experience.

- **Show and Hide Panes:** Easily show and hide panes, considering the minimum and maximum size constraints of other panes.

- **Custom Resizers:** Customize resizer handles to match your app's design.

- **Unique Resizers:** Single Resizer handle can push and pull n number of Panes in forward and backword direction.

- **Responsive:** In ratio mode, It adjusts pane sizes responsively to fit in available space, making it perfect for dynamic layouts.

- **Auto-Save Sizes:** Pane size and visibility are automatically saved in the browser's memory for consistent layouts across sessions.

## Installation

```bash
npm i resizable-panes-react --save
# or
yarn add resizable-panes-react
```

## Usage

```css
.bg-slate-500 {
  background-color: rgb(100 116 139);
}
```

```jsx
import { Pane, ResizablePanes } from "resizable-panes-react";

function App() {
  return (
    <div
      style={{
        height: "300px",
      }}
    >
      <ResizablePanes uniqueId="uniqueId" vertical resizerClass="bg-slate-500">
        <Pane id="P0" size={1}>
          Your component 1
        </Pane>
        <Pane id="P1" size={2}>
          Your component 2
        </Pane>
        <Pane id="P2" size={3}>
          Your component 3
        </Pane>
      </ResizablePanes>
    </div>
  );
}
```

## 👋 Hi there! If you find this project useful or valuable do give it star on GitHub or [Buy Me a Coffee]()

## ResizablePanes Props

| Prop               | Type               | Default | Required            | Description                                                                                                                                                       |
| ------------------ | ------------------ | ------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uniqueId           | string             |         | true                | Helps identify ResizablePanes component.                                                                                                                          |
| unmountOnHide      | boolean            | true    | false               | true - Unmounts the child or children of Pane in Hidden state. <br /> false - keeps the child or children of Pane in DOM in Hidden state.                         |
| className          | string             |         | false               | It will get attached to ResizablePanes container element.                                                                                                         |
| vertical           | boolean            | false   | false               | It sets the orientation of Panes.                                                                                                                                 |
| unit               | 'ratio' or 'pixel' | ratio   | false               | It sets the unit of size of panes.                                                                                                                                |
| minMaxUnit         | 'ratio' or 'pixel' | Same value as of unit props   | false               | It sets the unit of minSize and maxSize of panes.                                                                                                                 |
| detectionRadius    | number             |  6      | false               | It create the extra margin on both side for handle/resizer detection.  |
| visibility         | Object             |         | false               | It accepts a boolean map of Pane Ids visibility.                                                                                                                  |
| storageApi         | Object             |         | false               | It used to store data across session. It can be localStorage, sessionStorage or any other following the interface of localStorage.                                |
| resizerClass       | string             |         | false               | It gets applied to the main resizer element in normal state.                                                                                                      |
| activeResizerClass | string             |         | false               | It gets applied to the main resizer element in active state.                                                                                                      |
| resizer            | ReactElement       |         | false               | It will replace the in build resizer.                                                                                                                             |
| resizerSize        | number             | 2       | optionally required | It is the size of resizer. If the size of resizer is other than 2px you will have to provide the value.                                                           |
| onResize           | function           |         | false               | It emits size map while resizing layout.                                                                                                                       |
| onResizeStop       | function           |         | false               | It emits size map after the layout resizing is complete.                                                                                                          |
| onReady            | function           |         | false               | It emits ResizablePanes component's api once it is constructed.                                                                                                   |
| onChangeVisibility | function           |         | false               | It emits visibility map when there is change in visibility. A Pane can have 'visible', 'hidden' or 'zipped' state.                                                |
| onMinSize       | (id: string, minSize:number) => void       |         | false               | It emits when a Pane enters min size. |
| onMaxSize       | (id: string, maxSize:number) => void       |         | false               | It emits when a Pane enters max size. |
| onNormalSize    | (id: string) => void       |         | false               | It emits when a Pane enters normal size. |

## Pane Props

| Prop          | Type         | Default  | Required            | Description                                                                                              |
| ------------- | ------------ | -------- | ------------------- | -------------------------------------------------------------------------------------------------------- |
| id            | string       |          | true                | Helps identify Pane component.                                                                           |
| size          | number       |          | true                | Sets the size of Pane.                                                                                   |
| unmountOnHide | boolean      |          |                     | Same behaviour as of ResizablePanes Prop but works for individual Pane.                                  |
| className     | string       |          | false               | It will get attached to Pane element.                                                                    |
| maxSize       | number       | Infinity | false               | The maximum size limit of the Pane.                                                                      |
| minSize       | number       | 0        | false               | The minimum size limit of the Pane.                                                                      |
| resizer       | ReactElement |          | false               | It will replace the in build resizer of Pane.                                                            |
| resizerSize   | number       |          | Optionally required | It is the size of attached Resizer Element. It is required when we have passed resizer prop to the Pane. |
| detectionRadius    | number  |  6      | false     | Works at individual Pane level.  |
| onMinSize       | (id: string, minSize:number) => void       |         | false               | It emits when it enters min size of the Pane. |
| onMaxSize       | (id: string, maxSize:number) => void       |         | false               | It emits when it enters max size of the Pane. |
| onNormalSize    | (id: string) => void       |         | false               | It emits when it enters normal size of the Pane. |

## ResizablePanes component api

| Method          | Params                                                       | Description                                                                                                                              |
| --------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| restore  |                                                              | It restores the default view of layout.                                                                                                  |
| setSize         | (paneId: string, size: number, <br /> behaviour: ISetSizeBehaviour) | It excepts the positive number. It sets the size of Pane depending upon: <br /> 1. Its min and max. <br />2. Min and max of other panes.|
| setSizeRatio         | (paneId: string, size: number, <br /> behaviour: ISetSizeBehaviour) | Pass value 0 to 1. It will automatically covert it percent in Pixel. <br /> 1 corresponds to the sum of size of visible Panes.|
| setVisibilities   | Object                                                       | It sets the visibility of Panes using the Boolean map of id of Panes.                                                                    |
| getSizes        |                                                              | It returns the size map object of Ids of Panes                                                                                           |
| getVisibilities |                                                              | It returns the visibility map object of Ids of Panes                                                                                     |
| getState        |                                                              | It return the current state of all Panes.                                                                                                |

## Custom Resizer Component (resizer prop of ResizablePanes/Pane)

| Prop                | Type     | Default | Required | Description                                                                                                                |
| ------------------- | -------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| isMouseDown         | boolean  |         |          | Use it style you Custom resizer element behavior.                                                                          |

```tsx

interface ICustomResizerProp {
    isMouseDown: boolean,
  }


export const CustomResizer = ({
    isMouseDown
}: ICustomResizerProp) => {

 // isMouseDown: use it to style the elements

  return (
    <SOME_ELEMENT>
      <TARGET_ELEMENT>

      </TARGET_ELEMENT>
    </SOME_ELEMENT>
  )
}

```

## Nesting

```tsx

      <ResizablePanes uniqueId="uniqueId" vertical resizerClass="bg-slate-500">

      <Pane id="P0" size={1}>    
          <ResizablePanes uniqueId="uniqueId2" resizerClass="bg-slate-500">

            <Pane id="P01" size={2}>
              Your child component 1
            </Pane>
            <Pane id="P01" size={3}>
              Your child component 2
            </Pane>

          </ResizablePanes>
      </Pane>

        <Pane id="P1" size={2}>
          Your component 2
        </Pane>
        <Pane id="P2" size={3}>
          Your component 3
        </Pane>
      </ResizablePanes>

```

## How to move Pane by n pixel

```tsx

import {RATIO, BUTTOM_FIRST, TOP_FIRST} from 'resizable-panes-react'

    const n = 100
    const paneId = 'P2'

    // resizableApi: Emitted by onReady event 
    const currentP2Size = resizableApi.getSizes()[paneId]
    resizableApi.setSize(paneId, currentP2Size - n, TOP_FIRST)

    const nowP2Size = resizableApi.getSizes()[paneId]
    resizableApi.setSize(P2, nowP2Size + n, BUTTOM_FIRST)
```

## [Quick Demo][quick-demo-link]

### Feel Free to Raise Pull Request

[quick-demo-link]:https://bipankishore.github.io/resizable-panes?lib=react

[nyc-link]:https://img.shields.io/nycrc/BipanKishore/resizable-panes?config=%2Fpackages%2Fresizable-panes-react%2F.nycrc

[npm-link]: https://www.npmjs.com/package/resizable-panes-next
[npm-version-badge]: https://img.shields.io/npm/v/resizable-panes-next

[npm-min-size-badge-link]: https://img.shields.io/bundlephobia/minzip/resizable-panes-next
[npm-min-size-link]: https://github.com/BipanKishore/resizable-panes

[sonar-react-badge-link]: https://sonarcloud.io/api/project_badges/measure?project=BipanKishore_resizable-panes-react&branch=master&metric=alert_status
[sonar-react-link]:https://sonarcloud.io/summary/new_code?id=BipanKishore_resizable-panes-react

[build-n-deploy-badge-link]: https://github.com/BipanKishore/resizable-panes-react/actions/workflows/build-n-deploy.yml/badge.svg?branch=master
[build-n-deploy-link]: https://github.com/BipanKishore/resizable-panes/actions/workflows/build-n-deploy.yml?query=branch%3Amaster
