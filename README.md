This library is highly customizable and can be used in
various applications where flexible layout management is required.

[![resizable-panes-react](https://github.com/BipanKishore/resizable-panes-react/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/BipanKishore/resizable-panes-react/actions/workflows/build.yml) ![nycrc config on GitHub](https://img.shields.io/nycrc/BipanKishore/resizable-panes-react)
[![NPM Version](https://img.shields.io/npm/v/resizable-panes-react)](https://www.npmjs.com/package/resizable-panes-react) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/resizable-panes-react)](https://www.npmjs.com/package/resizable-panes-react) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BipanKishore_resizable-panes-react&branch=master&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=BipanKishore_resizable-panes-react)

<!---
[![Cypress Tests](https://github.com/BipanKishore/resizable-panes-react/actions/workflows/cypress.yml/badge.svg?branch=master)](https://cloud.cypress.io/projects/2xc7po/branches/master/overview)
-->


[Cypress Recoreded tests are available here](https://cloud.cypress.io/projects/2xc7po/branches/master/overview)

## [Quick Demo](https://bipankishore.github.io/resizable-panes/)

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

<img height="24px" alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/BipanKishore">

## 👋 Hi there! If you find this project useful or valuable, please consider [Sponsoring Its Development]() or [Buy Me a Coffee]()

🚀 By sponsoring, you'll:

**Receive Recognition**:
Sponsors will be prominently displayed on the project's README and other relevant documentation([Doc website](https://bipankishore.github.io/resizable-panes-demo/)).

**Influence Roadmap**: Your feedback and suggestions will carry significant weight in shaping the project's future direction and features.

🙏 If You liked this project do give it a star

## ResizablePanes Props

| Prop               | Type               | Default | Required            | Description                                                                                                                                                       |
| ------------------ | ------------------ | ------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uniqueId           | string             |         | true                | Helps identify ResizablePanes component.                                                                                                                          |
| unmountOnHide      | boolean            | true    | false               | true - Unmounts the child or children of Pane in Hidden state. <br /> false - keeps the child or children of Pane in DOM in Hidden state.                         |
| className          | string             |         | false               | It will get attached to ResizablePanes container element.                                                                                                         |
| zipping            | boolean            | true    | false               | When true & Pane's minSize = 0 - If we will push Pane's size bellow zero it will hide resizer also. <br /> When true - Resizer will have no effect while resizing |
| vertical           | boolean            | false   | false               | It sets the orientation of Panes.                                                                                                                                 |
| unit               | 'ratio' or 'pixel' | ratio   | false               | It sets the unit of size of panes.                                                                                                                                |
| minMaxUnit         | 'ratio' or 'pixel' | ratio   | false               | It sets the unit of minSize and maxSize of panes.                                                                                                                 |
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

## Custom Resizer Component (resizer prop of ResizablePanes/Pane)

| Prop                | Type     | Default | Required | Description                                                                                                                |
| ------------------- | -------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| onMouseDown         | function |         |          | Attached it to the element that, upon being clicked and dragged, initiates the resizing of the Pane's size.                |
| onTouchStartCapture |          |         |          | Attached it to the element that, upon being clicked and dragged, initiates the resizing of the Pane's size.(Touch devices) |
| isMouseDown         | boolean  |         |          | Use it style you Custom resizer element behavior.                                                                          |

## ResizablePanes component api

| Method          | Params                                                       | Description                                                                                                                              |
| --------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| restore  |                                                              | It restores the default view of layout.                                                                                                  |
| setSize         | (paneId: string, size: number, behaviour: ISetSizeBehaviour) | It excepts the positive number. It sets the size of Pane depending upon: <br /> 1. Its min and max. <br />2. min and max of other panes. <br/> type ISetSizeBehaviour = 'ratio' / 'buttomFirst' / 'topFirst'|
| setVisibilities   | Object                                                       | It sets the visibility of Panes using the Boolean map of id of Panes.                                                                    |
| getSizes        |                                                              | It returns the size map object of Ids of Panes                                                                                           |
| getVisibilities |                                                              | It returns the visibility map object of Ids of Panes                                                                                     |
| getState        |                                                              | It return the current state of all Panes.                                                                                                |

## [Quick Demo](https://bipankishore.github.io/resizable-panes/)
