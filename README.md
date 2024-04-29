
This library is highly customizable and can be used in
various applications where flexible layout management is required.

[![resizable-panes-react](https://github.com/BipanKishore/resizable-panes-react/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/BipanKishore/resizable-panes-react/actions/workflows/build.yml)  [![Cypress Tests](https://github.com/BipanKishore/resizable-panes-react/actions/workflows/cypress.yml/badge.svg?branch=master)](https://cloud.cypress.io/projects/2xc7po/branches/master/overview) ![nycrc config on GitHub](https://img.shields.io/nycrc/BipanKishore/resizable-panes-react)
 [![NPM Version](https://img.shields.io/npm/v/resizable-panes-react)](https://www.npmjs.com/package/resizable-panes-react) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/resizable-panes-react)](https://www.npmjs.com/package/resizable-panes-react) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BipanKishore_resizable-panes-react&branch=master&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=BipanKishore_resizable-panes-react)

 [Cypress Recoreded tests are available here](https://cloud.cypress.io/projects/2xc7po/branches/master/overview)

## Key Features

* **Smooth Resizing:** Enjoy smooth and fast pane resizing without performance issues.

* **No Unnecessary Rerenders:** Child components in the panes won't rerender during resizing, ensuring a seamless experience.

* **Show and Hide Panes:** Easily show and hide panes, considering the minimum and maximum size constraints of other panes.

* **Custom Resizers:** Customize resizer handles to match your app's design.

* **Unique Resizers:** Single Resizer handle can push and pull n number of Panes in forward and backword direction.

* **Responsive:** In ratio mode, It adjusts pane sizes responsively to fit in available space, making it perfect for dynamic layouts.

* **Auto-Save Sizes:** Pane size and visibility are automatically saved in the browser's memory for consistent layouts across sessions.

### [Demo and Docs](https://bipankishore.github.io/resizable-panes-demo/)

## Usage

```css
.bg-slate-500{
    background-color: rgb(100 116 139);
}
```

```jsx
import { Pane, ResizablePanes } from 'resizable-panes-react';

function App() {
  return (
    <div
      style={{
        height: '300px',
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
