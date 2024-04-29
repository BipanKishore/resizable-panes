
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

🌟 I'm looking Sponsors <img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/BipanKishore">

## 👋 Hi there! If you find this project useful or valuable, please consider sponsoring its development

🚀 By sponsoring, you'll:

**Receive Recognition**:
Sponsors will be prominently displayed on the project's README and other relevant documentation([Doc website](https://bipankishore.github.io/resizable-panes-demo/)), showcasing your support to the community.

**Influence Roadmap**: Your feedback and suggestions will carry significant weight in shaping the project's future direction and features.

🙏 Your sponsorship, no matter the size, is greatly appreciated and goes a long way in sustaining this project's growth. Thank you for considering it!

### [Demo and Docs](https://bipankishore.github.io/resizable-panes-demo/)

## ResizablePanes Props

| Prop              | Type               | Default | Required            | Description                                                                                                                        |
|--------------------|--------------------|---------|---------------------|------------------------------------------------------------------------------------------------------------------------------------|
| uniqueId           | string             |         | true                | Helps identify ResizablePanes component.                                                                                           |
| className          | string             |         | false               | It will get attached to ResizablePanes  container element.                                                                         |
| vertical           | boolean            | false   | false               | It sets the orientation of Panes.                                                                                                  |
| unit               | 'ratio' or 'pixel' | 'ratio' | false               | It sets the unit of size of panes.                                                                                                 |
| minMaxUnit         | 'ratio' or 'pixel' | ratio   | false               | It sets the unit of minSize and maxSize of panes.                                                                                  |
| visibility         | Object             |         |                     | It accepts a boolean map of Pane Ids visibility.                                                                                   |
| storageApi         | Object             |         | false               | It used to store data across session. It can be localStorage, sessionStorage or any other following the interface of localStorage. |
| resizer            | ReactElement       |         | false               | It will replace the in build resizer.                                                                                              |
| resizerSize        | number             | 2       | optionally required | It is the size of resizer. If the size of resizer is other than 2px you will have to provide the value.                            |
| onResize           | function           |         | false               | It emits size map of while resizing layout.                                                                                        |
| onResizeStop       | function           |         | false               | It emits size map after the layout resizing is complete.                                                                           |
| onReady            | function           |         | false               | It emits ResizablePanes component's api once it is constructed.                                                                    |
| onChangeVisibility | function           |         | false               | It emits visibility map when there is change in visibility.                                                                        |

## Pane Props

| Prop       | Type         | Default  | Required            | Description                                                                                              |
|-------------|--------------|----------|---------------------|----------------------------------------------------------------------------------------------------------|
| id          | string       |          | true                | Helps identify Pane component.                                                                           |
| size        | number       |          | true                | Sets the size of Pane.                                                                                   |
| className   | string       |          | false               | It will get attached to Pane element.                                                                    |
| maxSize     | number       | Infinity | false               | The maximum size limit of the Pane.                                                                      |
| minSize     | number       | 0        | false               | The minimum size limit of the Pane.                                                                      |
| resizer     | ReactElement |          | false               | It will replace the in build resizer of Pane.                                                            |
| resizerSize | number       |          | Optionally required | It is the size of attached Resizer Element. It is required when we have passed resizer prop to the Pane. |

## Custom Resizer Component (resizer prop of ResizablePanes/Pane)

| Prop                | Type     | Default | Required | Description                                                                                                                |
|---------------------|----------|---------|----------|----------------------------------------------------------------------------------------------------------------------------|
| onMouseDown         | function |         |          | Attached it to the element that, upon being clicked and dragged, initiates the resizing of the Pane's size.                |
| onTouchStartCapture |          |         |          | Attached it to the element that, upon being clicked and dragged, initiates the resizing of the Pane's size.(Touch devices) |
| isMouseDown         | boolean  |         |          | Use it style you Custom resizer element behavior.

## ResizablePanes component api

| Method          | Params | Description                                                           |
|-----------------|--------|-----------------------------------------------------------------------|
| restoreDefault  |        | It restores the default view of layout.                               |
| setVisibility   | Object | It sets the visibility of Panes using the Boolean map of id of Panes. |
| getSizes        |        | It returns the size map object  of Ids of Panes                       |
| getVisibilities |        | It returns the visibility map object of Ids of Panes                  |
| getState        |        | It return the current state of all Panes.                             |
