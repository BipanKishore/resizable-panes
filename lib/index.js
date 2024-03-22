(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["resizable-panes-react"] = factory();
	else
		root["resizable-panes-react"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constant.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DIRECTIONS: () => (/* binding */ DIRECTIONS),
/* harmony export */   MINUS: () => (/* binding */ MINUS),
/* harmony export */   MINUS_ONE: () => (/* binding */ MINUS_ONE),
/* harmony export */   PLUS: () => (/* binding */ PLUS),
/* harmony export */   RATIO: () => (/* binding */ RATIO),
/* harmony export */   RESIZER: () => (/* binding */ RESIZER),
/* harmony export */   RIGHT_BUTTON_VALUE: () => (/* binding */ RIGHT_BUTTON_VALUE),
/* harmony export */   SIZE: () => (/* binding */ SIZE),
/* harmony export */   VISIBILITY: () => (/* binding */ VISIBILITY),
/* harmony export */   ZERO: () => (/* binding */ ZERO)
/* harmony export */ });
var DIRECTIONS = {
  DOWN: 'Down',
  NONE: 'None',
  UP: 'UP'
};
var RIGHT_BUTTON_VALUE = 0;
var ZERO = 0;
var MINUS_ONE = -1;

// export const APP_NAME = 'react-split-pane'

var RATIO = 'ratio';
var RESIZER = 'resizer';
var VISIBILITY = 'visibility';
var SIZE = 'size';
var PLUS = '+';
var MINUS = '-';

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `
.d-flex{
    display: flex;
}

.d-block {
    display: block;
}

.f-column{
    flex-direction: column;
}

.f-row {
    flex-direction: row;
}

.h-200{
    height: 200px;
}

.w-fit-content{
    width: fit-content;
}

.m-auto {
    margin: auto;
}

.resizer {
    box-sizing: border-box;
    background-clip: padding-box;
    background-color: grey;
}

.resizer-vertical {
    min-height: 12px;
    margin: -5px 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    cursor: row-resize;
}

.resizer-horizontal {
    min-width: 12px;
    margin: 0 -5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    cursor: col-resize;
}

.resizer:hover{
    background-color: whitesmoke;
}


.full-page-class {
    display: block;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 1000px;
    bottom: 100px;
    width: 100%;
}


.h-20 {
    height: 20px;
}

.w-20 {
    width: 20px;
}

.overflow-hidden {
    overflow: hidden;   
   }


.w-100p{
    width: 100%
}

.h-100p{
    height: 100%;
}

.flex-shrink-0{
    flex-shrink: 0;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":";AACA;IACI,aAAa;AACjB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,sBAAsB;IACtB,4BAA4B;IAC5B,sBAAsB;AAC1B;;AAEA;IACI,gBAAgB;IAChB,cAAc;IACd,iCAAiC;IACjC,oCAAoC;IACpC,kBAAkB;AACtB;;AAEA;IACI,eAAe;IACf,cAAc;IACd,kCAAkC;IAClC,mCAAmC;IACnC,kBAAkB;AACtB;;AAEA;IACI,4BAA4B;AAChC;;;AAGA;IACI,cAAc;IACd,YAAY;IACZ,eAAe;IACf,QAAQ;IACR,SAAS;IACT,aAAa;IACb,aAAa;IACb,WAAW;AACf;;;AAGA;IACI,YAAY;AAChB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,gBAAgB;GACjB;;;AAGH;IACI;AACJ;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,cAAc;AAClB","sourcesContent":["\r\n.d-flex{\r\n    display: flex;\r\n}\r\n\r\n.d-block {\r\n    display: block;\r\n}\r\n\r\n.f-column{\r\n    flex-direction: column;\r\n}\r\n\r\n.f-row {\r\n    flex-direction: row;\r\n}\r\n\r\n.h-200{\r\n    height: 200px;\r\n}\r\n\r\n.w-fit-content{\r\n    width: fit-content;\r\n}\r\n\r\n.m-auto {\r\n    margin: auto;\r\n}\r\n\r\n.resizer {\r\n    box-sizing: border-box;\r\n    background-clip: padding-box;\r\n    background-color: grey;\r\n}\r\n\r\n.resizer-vertical {\r\n    min-height: 12px;\r\n    margin: -5px 0;\r\n    border-top: 5px solid transparent;\r\n    border-bottom: 5px solid transparent;\r\n    cursor: row-resize;\r\n}\r\n\r\n.resizer-horizontal {\r\n    min-width: 12px;\r\n    margin: 0 -5px;\r\n    border-left: 5px solid transparent;\r\n    border-right: 5px solid transparent;\r\n    cursor: col-resize;\r\n}\r\n\r\n.resizer:hover{\r\n    background-color: whitesmoke;\r\n}\r\n\r\n\r\n.full-page-class {\r\n    display: block;\r\n    height: 100%;\r\n    position: fixed;\r\n    top: 0px;\r\n    left: 0px;\r\n    right: 1000px;\r\n    bottom: 100px;\r\n    width: 100%;\r\n}\r\n\r\n\r\n.h-20 {\r\n    height: 20px;\r\n}\r\n\r\n.w-20 {\r\n    width: 20px;\r\n}\r\n\r\n.overflow-hidden {\r\n    overflow: hidden;   \r\n   }\r\n\r\n\r\n.w-100p{\r\n    width: 100%\r\n}\r\n\r\n.h-100p{\r\n    height: 100%;\r\n}\r\n\r\n.flex-shrink-0{\r\n    flex-shrink: 0;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_singletonStyleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/style-loader/dist/runtime/singletonStyleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_singletonStyleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_singletonStyleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

;
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_singletonStyleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_5__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_5__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_5__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_5__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/singletonStyleDomAPI.js":
/***/ ((module) => {



/* istanbul ignore next  */
var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join("\n");
  };
}();

/* istanbul ignore next  */
function apply(styleElement, index, remove, obj) {
  var css;
  if (remove) {
    css = "";
  } else {
    css = "";
    if (obj.supports) {
      css += "@supports (".concat(obj.supports, ") {");
    }
    if (obj.media) {
      css += "@media ".concat(obj.media, " {");
    }
    var needLayer = typeof obj.layer !== "undefined";
    if (needLayer) {
      css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
    }
    css += obj.css;
    if (needLayer) {
      css += "}";
    }
    if (obj.media) {
      css += "}";
    }
    if (obj.supports) {
      css += "}";
    }
  }

  // For old IE
  /* istanbul ignore if  */
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = styleElement.childNodes;
    if (childNodes[index]) {
      styleElement.removeChild(childNodes[index]);
    }
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index]);
    } else {
      styleElement.appendChild(cssNode);
    }
  }
}
var singletonData = {
  singleton: null,
  singletonCounter: 0
};

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") return {
    update: function update() {},
    remove: function remove() {}
  };

  // eslint-disable-next-line no-undef,no-use-before-define
  var styleIndex = singletonData.singletonCounter++;
  var styleElement =
  // eslint-disable-next-line no-undef,no-use-before-define
  singletonData.singleton || (
  // eslint-disable-next-line no-undef,no-use-before-define
  singletonData.singleton = options.insertStyleElement(options));
  return {
    update: function update(obj) {
      apply(styleElement, styleIndex, false, obj);
    },
    remove: function remove(obj) {
      apply(styleElement, styleIndex, true, obj);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./src/components/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pane: () => (/* reexport safe */ _pane__WEBPACK_IMPORTED_MODULE_0__.Pane),
/* harmony export */   ResizablePanes: () => (/* reexport safe */ _resizable_pane_provider__WEBPACK_IMPORTED_MODULE_2__.ResizablePaneProvider),
/* harmony export */   Resizer: () => (/* reexport safe */ _resizer__WEBPACK_IMPORTED_MODULE_1__.Resizer)
/* harmony export */ });
/* harmony import */ var _pane__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/components/pane.tsx");
/* harmony import */ var _resizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/components/resizer.tsx");
/* harmony import */ var _resizable_pane_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/components/resizable-pane-provider.tsx");





/***/ }),

/***/ "./src/components/pane.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pane: () => (/* binding */ Pane)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/utils/dom.ts");
/* harmony import */ var _context_resizable_panes_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/context/resizable-panes-context.ts");
/* harmony import */ var _resizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/components/resizer.tsx");
/* harmony import */ var _hook_useHookWithRefCallback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/hook/useHookWithRefCallback.ts");






var Pane = function (props) {
    var _a;
    var context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_resizable_panes_context__WEBPACK_IMPORTED_MODULE_3__.ResizablePaneContext);
    var vertical = context.vertical, registerPane = context.registerPane, getPaneSizeStyle = context.getPaneSizeStyle, parentResizer = context.props.resizer;
    var className = props.className, children = props.children, resizer = props.resizer, id = props.id;
    var setPaneRef = (0,_hook_useHookWithRefCallback__WEBPACK_IMPORTED_MODULE_5__.useHookWithRefCallback)(function (node) {
        var setSize = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getSetSize)(node, vertical);
        registerPane({
            setSize: setSize
        }, id);
    })[0];
    var classname = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_2__.joinClassName)((_a = {
            'overflow-hidden flex-shrink-0': true
        },
        _a[className] = className,
        _a));
    var style = getPaneSizeStyle(id);
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: classname, ref: setPaneRef, style: style, children: children }, id), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_resizer__WEBPACK_IMPORTED_MODULE_4__.Resizer, { id: id, children: resizer || parentResizer })] }));
};


/***/ }),

/***/ "./src/components/resizable-pane-provider.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResizablePaneProvider: () => (/* binding */ ResizablePaneProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_resizable_panes_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/context/resizable-panes-context.ts");
/* harmony import */ var _resizable_panes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/components/resizable-panes.tsx");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/utils/util.ts");
/* harmony import */ var _hook_use_resizable_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/hook/use-resizable-api.ts");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/utils/storage.ts");
/* harmony import */ var _services_singleton_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/services/singleton-service.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};








var ResizablePaneProviderDefaultProps = {
    onResize: _utils_util__WEBPACK_IMPORTED_MODULE_4__.noop,
    onResizeStop: _utils_util__WEBPACK_IMPORTED_MODULE_4__.noop,
    onReady: _utils_util__WEBPACK_IMPORTED_MODULE_4__.noop,
    onChangeVisibility: _utils_util__WEBPACK_IMPORTED_MODULE_4__.noop,
    vertical: false,
    storageApi: undefined,
    unit: undefined,
    resizer: undefined,
    resizerSize: 2,
    visibility: undefined
};
var ResizablePaneProvider = function (props) {
    var currentProps = (0,_utils_util__WEBPACK_IMPORTED_MODULE_4__.addDefaultProps)(props, ResizablePaneProviderDefaultProps);
    var uniqueId = currentProps.uniqueId, visibility = currentProps.visibility, storageApi = currentProps.storageApi;
    var context = _services_singleton_service__WEBPACK_IMPORTED_MODULE_7__.singletonService.getService(uniqueId, function () { return (0,_context_resizable_panes_context__WEBPACK_IMPORTED_MODULE_2__.getResizableContext)(currentProps); });
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        return function () {
            _services_singleton_service__WEBPACK_IMPORTED_MODULE_7__.singletonService.clearService(uniqueId);
        };
    }, [uniqueId]);
    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(true);
    (0,_hook_use_resizable_api__WEBPACK_IMPORTED_MODULE_5__.useResizableApi)(context, currentProps);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        (0,_utils_storage__WEBPACK_IMPORTED_MODULE_6__.onResizeClearSizesMapFromStore)(uniqueId, storageApi);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        if (ref.current === false) {
            context.setVisibility(visibility);
        }
        else {
            ref.current = false;
        }
    }, [visibility, ref]);
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_context_resizable_panes_context__WEBPACK_IMPORTED_MODULE_2__.ResizablePaneContext.Provider, { value: context, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_resizable_panes__WEBPACK_IMPORTED_MODULE_3__.ResizablePanes, __assign({}, currentProps)) }));
};


/***/ }),

/***/ "./src/components/resizable-panes.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResizablePanes: () => (/* binding */ ResizablePanes)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/style.css");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/utils/dom.ts");
/* harmony import */ var _context_resizable_panes_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/context/resizable-panes-context.ts");
/* harmony import */ var _hook_useHookWithRefCallback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/hook/useHookWithRefCallback.ts");
/* harmony import */ var _utils_resizable_pane__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/utils/resizable-pane.ts");







var ResizablePanes = function (props) {
    var children = props.children, className = props.className, unit = props.unit, vertical = props.vertical;
    var context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_resizable_panes_context__WEBPACK_IMPORTED_MODULE_4__.ResizablePaneContext);
    var containerRef = (0,_hook_useHookWithRefCallback__WEBPACK_IMPORTED_MODULE_5__.useHookWithRefCallback)((0,_utils_resizable_pane__WEBPACK_IMPORTED_MODULE_6__.registerContainer)(context))[0];
    var classname = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getContainerClass)(vertical, className, unit);
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: classname, ref: containerRef, children: children }));
};


/***/ }),

/***/ "./src/components/resizer.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Resizer: () => (/* binding */ Resizer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_resizable_panes_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/context/resizable-panes-context.ts");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/utils/dom.ts");
/* harmony import */ var _utils_panes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/utils/panes.ts");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/utils/util.ts");
/* harmony import */ var _hook_useHookWithRefCallback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/hook/useHookWithRefCallback.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};







var Resizer = function (props) {
    var children = props.children, id = props.id;
    var context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_resizable_panes_context__WEBPACK_IMPORTED_MODULE_2__.ResizablePaneContext);
    var getIdToSizeMap = context.getIdToSizeMap, myChildren = context.myChildren;
    var _a = context.props, vertical = _a.vertical, uniqueId = _a.uniqueId;
    var index = (0,_utils_panes__WEBPACK_IMPORTED_MODULE_4__.findIndexInChildrenbyId)(myChildren, id);
    var isNotLastIndex = index < (myChildren.length - 1);
    var previousTouchEvent = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), isMouseDown = _b[0], setIsMouseDown = _b[1];
    var onMouseMove = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (e) {
        var resizableEvent = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getResizableEvent)(e, vertical, previousTouchEvent);
        context.calculateAndSetHeight(resizableEvent);
        var resizeParams = getIdToSizeMap();
        context.props.onResize(resizeParams);
    }, [vertical, getIdToSizeMap, context]);
    var onTouchMove = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (e) {
        e.preventDefault();
        onMouseMove(e);
    }, [onMouseMove]);
    var onMoveEnd = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('touchmove', onTouchMove);
        var resizeParams = getIdToSizeMap();
        context.storage.setStorage(context.contextDetails);
        setIsMouseDown(false);
        context.props.onResizeStop(resizeParams);
        document.removeEventListener('mouseup', onMoveEnd);
        document.removeEventListener('touchend', onMoveEnd);
    }, [uniqueId, onMouseMove, context, getIdToSizeMap]);
    var onMouseDown = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (e) {
        setIsMouseDown(true);
        var resizableEvent = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getResizableEvent)(e, vertical, previousTouchEvent);
        context.setMouseDownDetails(resizableEvent, id);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('mouseup', onMoveEnd);
        document.addEventListener('touchend', onMoveEnd);
    }, [
        context,
        onMouseMove,
        onTouchMove,
        vertical,
        id,
        onMoveEnd
    ]);
    var getVisibleSize = function (node) {
        if (children) {
            var rect = node.getBoundingClientRect();
            return rect[(0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getSizeKey)(vertical)];
        }
        return 2;
    };
    var onNewRef = function (node) {
        var setSize = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getSetSize)(node, vertical, true, children ? 0 : 12);
        context.registerResizer({
            getVisibleSize: function () { return getVisibleSize(node); },
            setSize: setSize,
            visibility: isNotLastIndex
        }, id);
    };
    var setResizerRef = (0,_hook_useHookWithRefCallback__WEBPACK_IMPORTED_MODULE_6__.useHookWithRefCallback)(onNewRef)[0];
    var className = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.joinClassName)({
        resizer: true,
        'resizer-horizontal': vertical,
        'resizer-vertical': !vertical
    }, children);
    var isValidResizer = (0,react__WEBPACK_IMPORTED_MODULE_1__.isValidElement)(children);
    var cloneChild;
    if (isValidResizer) {
        cloneChild = (0,react__WEBPACK_IMPORTED_MODULE_1__.cloneElement)(children, __assign(__assign({}, children.props), { onMouseDown: onMouseDown, onTouchStartCapture: onMouseDown, isMouseDown: isMouseDown }));
    }
    var onMouseDownElement = isValidResizer ? _utils_util__WEBPACK_IMPORTED_MODULE_5__.noop : onMouseDown;
    if (isNotLastIndex) {
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { className: className, ref: setResizerRef, onMouseDown: onMouseDownElement, onTouchStartCapture: onMouseDownElement, children: cloneChild }));
    }
    return null;
};


/***/ }),

/***/ "./src/context/resizable-panes-context.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResizablePaneContext: () => (/* binding */ ResizablePaneContext),
/* harmony export */   getResizableContext: () => (/* binding */ getResizableContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/utils/util.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/constant.js");
/* harmony import */ var _utils_panes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/utils/panes.ts");
/* harmony import */ var _utils_resizable_pane__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/utils/resizable-pane.ts");
/* harmony import */ var _utils_development_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/utils/development-util.ts");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/utils/dom.ts");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/utils/storage.ts");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./src/utils/api.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};









var getResizableContext = function (props) {
    var vertical = props.vertical, children = props.children, unit = props.unit, uniqueId = props.uniqueId, storageApi = props.storageApi, onResizeStop = props.onResizeStop, onChangeVisibility = props.onChangeVisibility;
    var myChildren = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_6__.toArray)(children);
    var storage = new _utils_storage__WEBPACK_IMPORTED_MODULE_7__.ResizeStorage(uniqueId, storageApi);
    var panesList = (0,_utils_panes__WEBPACK_IMPORTED_MODULE_3__.createPaneModelList)(myChildren, props, storage);
    var contextDetails = {
        vertical: vertical,
        panesList: panesList,
        resizersList: (0,_utils_panes__WEBPACK_IMPORTED_MODULE_3__.createResizerModelList)(myChildren, props, storage),
        isSetRatioMode: false,
        newVisibilityModel: false
    };
    var syncAxisSizes = function () { return (0,_utils_panes__WEBPACK_IMPORTED_MODULE_3__.syncAxisSizesFn)(contextDetails.panesList); };
    var setUISizes = function () { return (0,_utils_panes__WEBPACK_IMPORTED_MODULE_3__.setUISizesOfAllElement)(contextDetails.panesList, contextDetails.resizersList); };
    var setCurrentMinMaxAndAxes = function (index) {
        (0,_utils_resizable_pane__WEBPACK_IMPORTED_MODULE_4__.setCurrentMinMax)(contextDetails, index);
        (0,_utils_development_util__WEBPACK_IMPORTED_MODULE_5__.minMaxTotal)(contextDetails);
    };
    var setActiveIndex = function (index) {
        contextDetails.activeIndex = index;
    };
    var registerPane = function (pane, id) {
        var index = (0,_utils_panes__WEBPACK_IMPORTED_MODULE_3__.findIndexInChildrenbyId)(myChildren, id);
        contextDetails.panesList[index].registerRef(pane);
    };
    var registerResizer = function (resizer, id) {
        var index = (0,_utils_panes__WEBPACK_IMPORTED_MODULE_3__.findIndexInChildrenbyId)(myChildren, id);
        if (index < (myChildren).length - 1) {
            contextDetails.resizersList[index].register(resizer);
        }
    };
    var registerContainer = function (_a) {
        var getContainerRect = _a.getContainerRect;
        contextDetails.getContainerRect = getContainerRect;
        if (storage.empty && unit === _constant__WEBPACK_IMPORTED_MODULE_2__.RATIO && !contextDetails.isSetRatioMode) {
            (0,_utils_resizable_pane__WEBPACK_IMPORTED_MODULE_4__.toRatioModeFn)(contextDetails);
            contextDetails.isSetRatioMode = true;
        }
    };
    var getIdToSizeMap = function () { return (0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.createMap)(contextDetails.panesList, _constant__WEBPACK_IMPORTED_MODULE_2__.SIZE); };
    var setMouseDownDetails = function (_a, id) {
        var mouseCoordinate = _a.mouseCoordinate;
        var index = (0,_utils_panes__WEBPACK_IMPORTED_MODULE_3__.findIndexInChildrenbyId)(myChildren, id);
        setActiveIndex(index);
        contextDetails.prevDirection = _constant__WEBPACK_IMPORTED_MODULE_2__.DIRECTIONS.NONE;
        contextDetails.axisCoordinate = mouseCoordinate;
        syncAxisSizes();
    };
    var calculateAndSetHeight = function (e) {
        var movement = e.movement;
        if (movement) {
            setDirection(e);
            var isChangeRequired = setAxisConfig(e);
            if (isChangeRequired) {
                if (movement > _constant__WEBPACK_IMPORTED_MODULE_2__.ZERO) {
                    (0,_utils_resizable_pane__WEBPACK_IMPORTED_MODULE_4__.goingDownLogic)(e, contextDetails);
                }
                else if (movement < _constant__WEBPACK_IMPORTED_MODULE_2__.ZERO) {
                    (0,_utils_resizable_pane__WEBPACK_IMPORTED_MODULE_4__.goingUpLogic)(e, contextDetails);
                }
            }
            contextDetails.newVisibilityModel = false;
            setUISizes();
        }
    };
    var setDirection = function (e) {
        var prevDirection = contextDetails.prevDirection;
        var direction = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_6__.getDirection)(e);
        if (prevDirection !== direction) {
            directionChangeActions(e);
            contextDetails.prevDirection = direction;
        }
    };
    var directionChangeActions = function (e) {
        contextDetails.axisCoordinate = e.mouseCoordinate;
        syncAxisSizes();
        setCurrentMinMaxAndAxes();
    };
    var setAxisConfig = function (e) {
        var panesList = contextDetails.panesList, activeIndex = contextDetails.activeIndex;
        var _a = (0,_utils_resizable_pane__WEBPACK_IMPORTED_MODULE_4__.calculateAxes)(contextDetails), bottomAxis = _a.bottomAxis, topAxis = _a.topAxis;
        if (e.mouseCoordinate <= topAxis) {
            (0,_utils_panes__WEBPACK_IMPORTED_MODULE_3__.setUpMaxLimits)(panesList, activeIndex);
            syncAxisSizes();
            contextDetails.axisCoordinate = topAxis;
            return false;
        }
        else if (e.mouseCoordinate >= bottomAxis) {
            (0,_utils_panes__WEBPACK_IMPORTED_MODULE_3__.setDownMaxLimits)(panesList, activeIndex);
            syncAxisSizes();
            contextDetails.axisCoordinate = bottomAxis;
            return false;
        }
        return true;
    };
    var getPaneSizeStyle = function (id) {
        var _a;
        var panesList = contextDetails.panesList;
        var size = (_a = (0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.findById)(panesList, id)) === null || _a === void 0 ? void 0 : _a.getSize();
        return (0,_utils_dom__WEBPACK_IMPORTED_MODULE_6__.getSizeStyle)(vertical, size);
    };
    var setVisibility = function (param) {
        if (!param) {
            return;
        }
        var oldVisibilityMap = (0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.createMap)(contextDetails.panesList, _constant__WEBPACK_IMPORTED_MODULE_2__.VISIBILITY);
        var keys = Object.keys(oldVisibilityMap);
        var isNoChange = keys.every(function (key) { return oldVisibilityMap[key] === param[key]; });
        if (isNoChange) {
            return;
        }
        var newMap = __assign(__assign({}, oldVisibilityMap), param);
        var panesList = contextDetails.panesList, newVisibilityModel = contextDetails.newVisibilityModel;
        if (!newVisibilityModel) {
            contextDetails.newVisibilityModel = true;
            panesList.forEach(function (pane) { return pane.setOldVisibilityModel(); });
        }
        (0,_utils_api__WEBPACK_IMPORTED_MODULE_8__.setVisibilityFn)(contextDetails, newMap);
        var visibilityMap = (0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.createMap)(contextDetails.panesList, _constant__WEBPACK_IMPORTED_MODULE_2__.VISIBILITY);
        var sisesMap = getIdToSizeMap();
        if (onResizeStop) {
            onResizeStop(sisesMap);
        }
        if (onChangeVisibility) {
            onChangeVisibility(visibilityMap);
        }
        storage.setStorage(contextDetails);
    };
    return {
        setActiveIndex: setActiveIndex,
        registerPane: registerPane,
        registerResizer: registerResizer,
        registerContainer: registerContainer,
        getIdToSizeMap: getIdToSizeMap,
        setMouseDownDetails: setMouseDownDetails,
        vertical: vertical,
        calculateAndSetHeight: calculateAndSetHeight,
        props: props,
        contextDetails: contextDetails,
        storage: storage,
        myChildren: myChildren,
        getPaneSizeStyle: getPaneSizeStyle,
        setVisibility: setVisibility
    };
};
var ResizablePaneContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});


/***/ }),

/***/ "./src/hook/use-resizable-api.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useResizableApi: () => (/* binding */ useResizableApi)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/utils/api.ts");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/utils/util.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};



var useResizableApi = function (context, props) {
    var contextDetails = context.contextDetails, setVisibility = context.setVisibility;
    var onReady = props.onReady;
    var restoreDefault = function () { return (0,_utils_api__WEBPACK_IMPORTED_MODULE_1__.restoreDefaultFn)(contextDetails); };
    var getMap = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return _utils_util__WEBPACK_IMPORTED_MODULE_2__.createMap.apply(void 0, __spreadArray([contextDetails.panesList], keys, false));
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        var api = {
            restoreDefault: restoreDefault,
            setVisibility: setVisibility,
            getMap: getMap
        };
        onReady(api);
    }, [context]);
};


/***/ }),

/***/ "./src/hook/useHookWithRefCallback.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useHookWithRefCallback: () => (/* binding */ useHookWithRefCallback)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/utils/util.ts");


function useHookWithRefCallback(callBack, callBackForNoNode) {
    if (callBackForNoNode === void 0) { callBackForNoNode = _utils_util__WEBPACK_IMPORTED_MODULE_1__.noop; }
    var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    var setRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (node) {
        if (ref.current) {
        }
        if (node) {
            callBack(node);
        }
        else {
            callBackForNoNode(ref.current);
        }
        ref.current = node;
    }, []);
    return [setRef];
}


/***/ }),

/***/ "./src/models/pane-model.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaneModel: () => (/* binding */ PaneModel)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/constant.js");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/utils/util.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var PaneModel = (function () {
    function PaneModel(paneProps, resizableProps, store) {
        this.storedSize = 0;
        this.axisSize = 0;
        this.oldVisibleSize = 0;
        this.oldVisibility = true;
        var id = paneProps.id, _a = paneProps.minSize, minSize = _a === void 0 ? _constant__WEBPACK_IMPORTED_MODULE_0__.ZERO : _a, size = paneProps.size, _b = paneProps.maxSize, maxSize = _b === void 0 ? Infinity : _b;
        var show = true;
        var storedPane = store.getStoredPane(id);
        if (storedPane) {
            var size_1 = storedPane.size, defaultMaxSize = storedPane.defaultMaxSize, defaultMinSize = storedPane.defaultMinSize, visibility = storedPane.visibility, storedSize = storedPane.storedSize;
            this.initializeSizes(size_1, defaultMinSize, defaultMaxSize, storedSize, visibility);
        }
        else {
            var freshSize = show ? size : 0;
            this.initializeSizes(freshSize, minSize, maxSize, size, show);
        }
        var vertical = resizableProps.vertical;
        this.id = id;
        this.vertical = vertical;
        if (size < minSize) {
            throw Error('Size can not be smaller than minSize for pane id ' + id);
        }
        if (size > maxSize) {
            throw Error('Size can not be greatter than maxSize for pane id ' + id);
        }
        if (minSize > maxSize) {
            throw Error('minSize can not be greatter than maxSize for pane id ' + id);
        }
    }
    PaneModel.prototype.initializeSize = function (size) {
        this.size = size;
        this.defaultSize = size;
        this.storedSize = size;
    };
    PaneModel.prototype.initializeSizes = function (size, minSize, maxSize, storedSize, visibility) {
        this.initializeSize(size);
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.defaultMinSize = minSize;
        this.defaultMaxSize = maxSize;
        this.storedSize = storedSize;
        this.visibility = visibility;
    };
    PaneModel.prototype.getStoreObj = function () {
        var t = (0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.getObj)(this, 'id', 'size', 'defaultSize', 'defaultMinSize', 'visibility', 'storedSize');
        return __assign(__assign({}, t), { defaultMaxSize: this.defaultMaxSize.toString() });
    };
    PaneModel.prototype.getSize = function () {
        if (this.visibility) {
            return this.size;
        }
        return 0;
    };
    PaneModel.prototype.setVisibilitySize = function (newSize) {
        this.restoreLimits();
        if (this.visibility) {
            if (newSize >= this.minSize && newSize <= this.maxSize) {
                this.size = newSize;
                return _constant__WEBPACK_IMPORTED_MODULE_0__.ZERO;
            }
            else if (newSize > this.maxSize) {
                this.size = this.maxSize;
            }
            else {
                this.size = this.minSize;
            }
            return newSize - this.size;
        }
        else {
            return newSize;
        }
    };
    PaneModel.prototype.addVisibilitySize = function (sizeChange) {
        var newSize = this.size + sizeChange;
        return this.setVisibilitySize(newSize);
    };
    PaneModel.prototype.removeVisibilitySize = function (sizeChange) {
        var newSize = this.size - sizeChange;
        return this.setVisibilitySize(newSize);
    };
    PaneModel.prototype.changeSize = function (sizeChange, operation) {
        var newSize = this.axisSize + (operation === '+' ? sizeChange : -sizeChange);
        if (this.visibility) {
            if (newSize >= this.minSize && newSize <= this.maxSize) {
                this.size = newSize;
                return _constant__WEBPACK_IMPORTED_MODULE_0__.ZERO;
            }
            else if (newSize > this.maxSize) {
                this.size = this.maxSize;
            }
            else {
                this.size = this.minSize;
            }
            return Math.abs(this.size - newSize);
        }
        else {
            return sizeChange;
        }
    };
    PaneModel.prototype.setFixSize = function (size) {
        this.size = size;
    };
    PaneModel.prototype.setUISize = function () {
        if (this.pane) {
            this.pane.setSize(this.visibility ? this.size : 0);
            return this.size;
        }
    };
    PaneModel.prototype.registerRef = function (pane) {
        if (this.pane) {
            this.pane = pane;
            this.setUISize();
        }
        this.pane = pane;
    };
    PaneModel.prototype.synPreservedSize = function () {
        if (!this.storedSize) {
            this.storedSize = this.size;
        }
    };
    PaneModel.prototype.synSizeToStored = function () {
        this.size = this.storedSize;
    };
    PaneModel.prototype.syncAxisSize = function () {
        this.axisSize = this.size;
    };
    PaneModel.prototype.restore = function () {
        this.size = this.defaultSize;
    };
    PaneModel.prototype.restoreLimits = function () {
        this.minSize = this.defaultMinSize;
        this.maxSize = this.defaultMaxSize;
    };
    PaneModel.prototype.resetMax = function (reduce) {
        if (reduce === void 0) { reduce = 0; }
        if (this.visibility) {
            this.maxSize = this.defaultMaxSize - reduce;
            return this.maxSize;
        }
        else {
            this.maxSize = 0;
        }
        return _constant__WEBPACK_IMPORTED_MODULE_0__.ZERO;
    };
    PaneModel.prototype.resetMin = function () {
        if (this.visibility) {
            this.minSize = this.defaultMinSize;
            return this.minSize;
        }
        else {
            this.minSize = 0;
        }
        return _constant__WEBPACK_IMPORTED_MODULE_0__.ZERO;
    };
    PaneModel.prototype.synMaxToSize = function () {
        this.maxSize = this.size;
        return this.size;
    };
    PaneModel.prototype.synMinToSize = function () {
        this.minSize = this.size;
        return this.size;
    };
    PaneModel.prototype.getMinDiff = function () {
        if (this.visibility) {
            return this.size - this.defaultMinSize;
        }
        return _constant__WEBPACK_IMPORTED_MODULE_0__.ZERO;
    };
    PaneModel.prototype.getMaxDiff = function () {
        if (this.visibility) {
            return this.defaultMaxSize - this.size;
        }
        else {
            this.maxSize = 0;
        }
        return _constant__WEBPACK_IMPORTED_MODULE_0__.ZERO;
    };
    PaneModel.prototype.synSizeToMinSize = function () {
        if (this.visibility) {
            this.size = this.minSize;
        }
    };
    PaneModel.prototype.synSizeToMaxSize = function () {
        if (this.visibility) {
            this.size = this.maxSize;
        }
    };
    PaneModel.prototype.toRatioMode = function (containerSize, maxRatioValue) {
        var storeSize = (0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.ratioAndRoundOff)(containerSize, maxRatioValue, this.size);
        var minSize = (0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.ratioAndRoundOff)(containerSize, maxRatioValue, this.minSize);
        var maxSize = (0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.ratioAndRoundOff)(containerSize, maxRatioValue, this.maxSize);
        var size = this.visibility ? storeSize : 0;
        this.initializeSizes(size, minSize, maxSize, storeSize, this.visibility);
    };
    PaneModel.prototype.fixChange = function (key, change) {
        if (this.visibility) {
            this[key] = this[key] + change;
        }
    };
    PaneModel.prototype.setVisibilityNew = function (visibility) {
        this.visibility = visibility;
        if (visibility) {
            this.maxSize = this.defaultMaxSize;
            this.minSize = this.defaultMinSize;
        }
        else {
            this.maxSize = 0;
            this.minSize = 0;
        }
    };
    PaneModel.prototype.setOldVisibilityModel = function () {
        this.oldVisibleSize = this.size;
        this.oldVisibility = this.visibility;
    };
    PaneModel.prototype.syncToOldVisibilityModel = function () {
        this.size = this.oldVisibleSize;
        this.visibility = this.oldVisibility;
    };
    return PaneModel;
}());



/***/ }),

/***/ "./src/models/resizer-model.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResizerModel: () => (/* binding */ ResizerModel)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/constant.js");
/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/utils/util.ts");


var ResizerModel = (function () {
    function ResizerModel(paneProps, resizableProps, store) {
        var _this = this;
        this.isRegistered = false;
        this.getStoreModel = function () {
            return (0,_utils_util__WEBPACK_IMPORTED_MODULE_1__.getObj)(_this, 'id', 'visibility');
        };
        var id = paneProps.id;
        var resizerSize = resizableProps.resizerSize, _a = resizableProps.visibility, visibility = _a === void 0 ? {} : _a;
        this.visibilityMap = resizableProps.visibility;
        var show = visibility[id] !== undefined ? visibility[id] : true;
        this.id = "".concat(_constant__WEBPACK_IMPORTED_MODULE_0__.RESIZER, "-").concat(id);
        this.isStorPresent = !store.empty;
        if (this.isStorPresent) {
            var storedResizer = store.getStoredResizer(this.id);
            if (storedResizer) {
                this.visibility = storedResizer.visibility;
            }
        }
        else {
            this.visibility = show;
        }
        this.resizerSize = paneProps.resizerSize || resizerSize;
    }
    ResizerModel.prototype.registerMe = function () {
        switch (true) {
            case !this.isRegistered:
                this.setUISize();
                break;
            case this.isRegistered:
                this.visibility = this.api.visibility;
        }
        this.isRegistered = true;
    };
    ResizerModel.prototype.register = function (api) {
        this.api = api;
        if (!this.visibilityMap) {
            this.resizerSize = api.getVisibleSize();
        }
        this.registerMe();
    };
    ResizerModel.prototype.getSize = function () {
        return this.isRegistered ? (this.visibility ? this.resizerSize : 0) : 0;
    };
    ResizerModel.prototype.setUISize = function () {
        if (this.api) {
            var uiSize = 0;
            if (this.visibility) {
                if (this.resizerSize) {
                    uiSize = this.resizerSize;
                }
                else {
                    uiSize = this.api.getVisibleSize();
                }
            }
            this.api.setSize(uiSize);
        }
    };
    ResizerModel.prototype.setVisibilityNew = function (visibility) {
        if (!this.isRegistered) {
            return;
        }
        this.visibility = visibility;
    };
    return ResizerModel;
}());



/***/ }),

/***/ "./src/services/singleton-service.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   singletonService: () => (/* binding */ singletonService)
/* harmony export */ });
function SingletonService() {
    var serviceMap = {};
    var getService = function (id, createService) {
        serviceMap[id] = serviceMap[id] ? serviceMap[id] : createService();
        return serviceMap[id];
    };
    var clearService = function (id) {
        return delete serviceMap[id];
    };
    return {
        getService: getService,
        clearService: clearService
    };
}
var singletonService = SingletonService();


/***/ }),

/***/ "./src/utils/api.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeSizeInRatio: () => (/* binding */ changeSizeInRatio),
/* harmony export */   restoreDefaultFn: () => (/* binding */ restoreDefaultFn),
/* harmony export */   setResizersVisibility: () => (/* binding */ setResizersVisibility),
/* harmony export */   setVisibilityFn: () => (/* binding */ setVisibilityFn),
/* harmony export */   visibilityOperationFn: () => (/* binding */ visibilityOperationFn)
/* harmony export */ });
/* harmony import */ var _panes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/utils/panes.ts");
/* harmony import */ var _resizable_pane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/utils/resizable-pane.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/utils/util.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};



var restoreDefaultFn = function (_a) {
    var panesList = _a.panesList, resizersList = _a.resizersList;
    panesList.forEach(function (pane) { return pane.restore(); });
    setResizersVisibility(resizersList, true);
    (0,_panes__WEBPACK_IMPORTED_MODULE_0__.setUISizesFn)(panesList);
};
var visibilityOperationFn = function (panesList, actionList, maxPaneSize) {
    var currentPanesSize = (0,_panes__WEBPACK_IMPORTED_MODULE_0__.getPanesSizeSum)(panesList);
    var sizeChange = maxPaneSize - currentPanesSize;
    if (sizeChange === 0 || actionList.length === 0) {
        return;
    }
    changeSizeInRatio(panesList, actionList, sizeChange, maxPaneSize);
};
var changeSizeInRatio = function (panesList, actionList, sizeChange, maxPaneSize) {
    var operationKey = sizeChange > 0 ? 'addVisibilitySize' : 'removeVisibilitySize';
    var sizeChangeAbsolute = Math.abs(sizeChange);
    if (sizeChangeAbsolute <= actionList.length) {
        (0,_panes__WEBPACK_IMPORTED_MODULE_0__.change1PixelToPanes)(panesList, sizeChangeAbsolute, sizeChange > 0 ? '+' : '-');
        return;
    }
    var ratioSum = (0,_panes__WEBPACK_IMPORTED_MODULE_0__.getSizeByIndexes)(panesList, actionList);
    var nextActionList = [];
    actionList.forEach(function (i) {
        var size = panesList[i].getSize();
        var newSize = Math.round(sizeChangeAbsolute * (size / ratioSum));
        var remainingSize = panesList[i][operationKey](newSize);
        if (remainingSize === 0) {
            nextActionList.push(i);
        }
    });
    visibilityOperationFn(panesList, nextActionList, maxPaneSize);
};
var setVisibilityFn = function (contextDetails, idMap) {
    var panesList = contextDetails.panesList, resizersList = contextDetails.resizersList;
    panesList.forEach(function (pane) { return pane.syncToOldVisibilityModel(); });
    var paneVisibilityList = [];
    for (var i = 0; i < panesList.length; i++) {
        var pane = panesList[i];
        var id = pane.id;
        var visibility = Boolean(idMap[id]);
        var index = (0,_util__WEBPACK_IMPORTED_MODULE_2__.findIndex)(panesList, id);
        if (visibility) {
            paneVisibilityList.push(index);
        }
        pane.setVisibilityNew(visibility);
    }
    var lastVisibleIndex = __spreadArray([], paneVisibilityList, true).pop();
    for (var i = 0; i < panesList.length; i++) {
        var pane = panesList[i];
        var id = pane.id;
        var visibility = Boolean(idMap[id]);
        var index = (0,_util__WEBPACK_IMPORTED_MODULE_2__.findIndex)(panesList, id);
        if (i === lastVisibleIndex) {
            resizersList[index].setVisibilityNew(false);
        }
        else {
            resizersList[index].setVisibilityNew(visibility);
        }
    }
    var maxPaneSize = (0,_resizable_pane__WEBPACK_IMPORTED_MODULE_1__.getMaxContainerSizes)(contextDetails).maxPaneSize;
    visibilityOperationFn(panesList, paneVisibilityList, maxPaneSize);
    (0,_panes__WEBPACK_IMPORTED_MODULE_0__.setUISizesOfAllElement)(panesList, resizersList);
};
var setResizersVisibility = function (resizersList, visibility) {
    for (var _i = 0, resizersList_1 = resizersList; _i < resizersList_1.length; _i++) {
        var resizer = resizersList_1[_i];
        resizer.setVisibilityNew(visibility);
    }
};


/***/ }),

/***/ "./src/utils/development-util.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getList: () => (/* binding */ getList),
/* harmony export */   keyConsole: () => (/* binding */ keyConsole),
/* harmony export */   localConsole: () => (/* binding */ localConsole),
/* harmony export */   minMaxTotal: () => (/* binding */ minMaxTotal),
/* harmony export */   paneConsole: () => (/* binding */ paneConsole),
/* harmony export */   setPaneList: () => (/* binding */ setPaneList),
/* harmony export */   sizesConsole: () => (/* binding */ sizesConsole),
/* harmony export */   useMountingConsole: () => (/* binding */ useMountingConsole)
/* harmony export */ });
/* harmony import */ var _resizable_pane__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/utils/resizable-pane.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var keyConsole = function (obj, add) {
    if (obj === void 0) { obj = {}; }
    if (add === void 0) { add = 'v--'; }
    var keys = Object.keys(obj);
    var str = keys.reduce(function (p, v) { return p + ' ' + v + ': ' + obj[v]; }, add);
};
var localConsole = function (obj, key) {
    if (obj === void 0) { obj = {}; }
};
var minMaxTotal = function (serviceRefCurrent) {
    var panesList = serviceRefCurrent.panesList;
    var visiblePanesList = (0,_resizable_pane__WEBPACK_IMPORTED_MODULE_0__.getVisiblePaneModelsAndActiveIndex)(panesList, 0).visiblePanesList;
    var maxPaneSize = (0,_resizable_pane__WEBPACK_IMPORTED_MODULE_0__.getMaxContainerSizes)(serviceRefCurrent).maxPaneSize;
    var sum = 0;
    visiblePanesList
        .forEach(function (_a) {
        var minSize = _a.minSize, maxSize = _a.maxSize;
        maxSize = Number.isFinite(maxSize) ? maxSize : 0;
        sum += ((maxSize || 0) + (minSize || 0));
    });
    var paneSizeTotal = sum / 2;
    console.warn("Valid Sum: [".concat(sum, ", ").concat(paneSizeTotal, "], value :").concat(maxPaneSize));
    if ((Math.trunc(maxPaneSize) !== Math.trunc(sum) && Math.trunc(maxPaneSize) !== Math.trunc(paneSizeTotal))) {
        throw new Error("Max Pane sum total: ".concat(maxPaneSize, " = ").concat(sum, " or ").concat(maxPaneSize, " = ").concat(paneSizeTotal));
    }
};
var getList = function (panesList, key) {
    return panesList.map(function (pane) { return pane[key]; });
};
var paneConsole = function (panesList, key) {
};
var setPaneList = function (panesList, keys, value) {
    if (keys === void 0) { keys = []; }
    if (value === void 0) { value = null; }
    panesList.forEach(function (pane) { return keys.forEach(function (key) { return (pane[key] = value); }); });
};
var sizesConsole = function (panesList) {
};
var useMountingConsole = function (name) {
    console.log("rerender -> ".concat(name));
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
        console.error("v-----  Mountttttttiinnnnnng -> ".concat(name));
        return function () { return console.error("v----- Uuuuuuuuuunmountiiiiiiiiiiinnnnnnnngggggg ->".concat(name)); };
    }, []);
};


/***/ }),

/***/ "./src/utils/dom.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getContainerClass: () => (/* binding */ getContainerClass),
/* harmony export */   getDirection: () => (/* binding */ getDirection),
/* harmony export */   getResizableEvent: () => (/* binding */ getResizableEvent),
/* harmony export */   getResizableEventFromMouse: () => (/* binding */ getResizableEventFromMouse),
/* harmony export */   getResizableEventFromTouch: () => (/* binding */ getResizableEventFromTouch),
/* harmony export */   getSetSize: () => (/* binding */ getSetSize),
/* harmony export */   getSizeKey: () => (/* binding */ getSizeKey),
/* harmony export */   getSizeStyle: () => (/* binding */ getSizeStyle),
/* harmony export */   isTouchEvent: () => (/* binding */ isTouchEvent),
/* harmony export */   joinClassName: () => (/* binding */ joinClassName),
/* harmony export */   toArray: () => (/* binding */ toArray),
/* harmony export */   toPx: () => (/* binding */ toPx)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/constant.js");

var toPx = function (size) { return "".concat(size, "px"); };
var getSizeKey = function (vertical) { return vertical ? 'width' : 'height'; };
var getSizeStyle = function (vertical, size) {
    var _a;
    return (_a = {},
        _a[getSizeKey(vertical)] = toPx(size),
        _a);
};
var joinClassName = function (param, notRequired) {
    if (notRequired === void 0) { notRequired = false; }
    if (notRequired) {
        return '';
    }
    var keys = Object.keys(param);
    return keys.map(function (key) { return param[key] ? key : ''; }).join(' ');
};
var getContainerClass = function (vertical, className, unit) {
    var _a;
    return joinClassName((_a = {
            'd-flex': true,
            'f-row w-fit-content h-100p': vertical,
            'f-column': !vertical,
            'w-100p h-100p': unit === _constant__WEBPACK_IMPORTED_MODULE_0__.RATIO
        },
        _a[className] = className,
        _a));
};
var isTouchEvent = function (event) { return event.type.startsWith('touch'); };
var resizableEvent = function (mouseCoordinate, movement) { return ({
    mouseCoordinate: mouseCoordinate,
    movement: movement
}); };
var getResizableEventFromTouch = function (e, vertical, previousTouchEvent) {
    var _a;
    var currentTouch = e.targetTouches[0];
    var _b = (_a = previousTouchEvent.current) !== null && _a !== void 0 ? _a : {}, _c = _b.pageX, pageX = _c === void 0 ? 0 : _c, _d = _b.pageY, pageY = _d === void 0 ? 0 : _d;
    previousTouchEvent.current = currentTouch;
    if (vertical) {
        return resizableEvent(currentTouch.clientX, currentTouch.pageX - pageX);
    }
    else {
        return resizableEvent(currentTouch.clientY, currentTouch.pageY - pageY);
    }
};
var getResizableEventFromMouse = function (e, vertical) {
    e.preventDefault();
    var clientX = e.clientX, clientY = e.clientY, movementX = e.movementX, movementY = e.movementY;
    return vertical ? resizableEvent(clientX, movementX) : resizableEvent(clientY, movementY);
};
var getResizableEvent = function (e, vertical, previousTouchEvent) {
    return isTouchEvent(e)
        ? getResizableEventFromTouch(e, vertical, previousTouchEvent)
        : getResizableEventFromMouse(e, vertical);
};
var getDirection = function (e) { return e.movement < 0 ? _constant__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS.UP : _constant__WEBPACK_IMPORTED_MODULE_0__.DIRECTIONS.DOWN; };
var toArray = function (items) { return Array.isArray(items) ? items : [items]; };
var getSetSize = function (node, vertical, addOverFlowLogic, addMinSize) {
    if (addOverFlowLogic === void 0) { addOverFlowLogic = false; }
    if (addMinSize === void 0) { addMinSize = 0; }
    return function (size) {
        node.style[getSizeKey(vertical)] = toPx(size);
        if (addOverFlowLogic) {
            if (size === 0) {
                node.style.overflow = 'hidden';
            }
            else {
                node.style.overflow = 'visible';
            }
        }
        if (addMinSize) {
            var key = "min".concat(vertical ? 'Width' : 'Height');
            node.style[key] = toPx(size === 0 ? size : addMinSize);
        }
    };
};


/***/ }),

/***/ "./src/utils/panes.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   change1PixelToPanes: () => (/* binding */ change1PixelToPanes),
/* harmony export */   createPaneModelList: () => (/* binding */ createPaneModelList),
/* harmony export */   createResizerModelList: () => (/* binding */ createResizerModelList),
/* harmony export */   findIndexInChildrenbyId: () => (/* binding */ findIndexInChildrenbyId),
/* harmony export */   getMaxSizeSum: () => (/* binding */ getMaxSizeSum),
/* harmony export */   getMinSizeSum: () => (/* binding */ getMinSizeSum),
/* harmony export */   getPanesSizeSum: () => (/* binding */ getPanesSizeSum),
/* harmony export */   getResizerSum: () => (/* binding */ getResizerSum),
/* harmony export */   getSizeByIndexes: () => (/* binding */ getSizeByIndexes),
/* harmony export */   getSum: () => (/* binding */ getSum),
/* harmony export */   setDownMaxLimits: () => (/* binding */ setDownMaxLimits),
/* harmony export */   setUISizesFn: () => (/* binding */ setUISizesFn),
/* harmony export */   setUISizesOfAllElement: () => (/* binding */ setUISizesOfAllElement),
/* harmony export */   setUpMaxLimits: () => (/* binding */ setUpMaxLimits),
/* harmony export */   synPanesMaxToSize: () => (/* binding */ synPanesMaxToSize),
/* harmony export */   synPanesMinToSize: () => (/* binding */ synPanesMinToSize),
/* harmony export */   syncAxisSizesFn: () => (/* binding */ syncAxisSizesFn)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_pane_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/models/pane-model.ts");
/* harmony import */ var _models_resizer_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/models/resizer-model.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/constant.js");
/* harmony import */ var _development_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/utils/development-util.ts");





var syncAxisSizesFn = function (panesList) {
    return panesList.forEach(function (pane) { return pane.syncAxisSize(); });
};
var setUISizesFn = function (modelList) {
    return modelList.forEach(function (pane) { return pane.setUISize(); });
};
var setUISizesOfAllElement = function (panesList, resizersList) {
    setUISizesFn(panesList);
    setUISizesFn(resizersList);
};
function getSum(list, getNumber, start, end) {
    if (start === void 0) { start = 0; }
    if (end === void 0) { end = list.length - 1; }
    var sum = 0;
    for (var i = start; i <= end; i++) {
        sum += getNumber(list[i]);
    }
    return sum;
}
var getSizeByIndexes = function (panesList, indexList) {
    var sum = 0;
    indexList.forEach(function (i) {
        sum += panesList[i].getSize();
    });
    return sum;
};
var synPanesMaxToSize = function (panesList, start, end) {
    return getSum(panesList, function (pane) { return pane.synMaxToSize(); }, start, end);
};
var synPanesMinToSize = function (panesList, start, end) {
    return getSum(panesList, function (pane) { return pane.synMinToSize(); }, start, end);
};
var getPanesSizeSum = function (panesList, start, end) {
    return getSum(panesList, function (pane) { return pane.getSize(); }, start, end);
};
var getResizerSum = function (resizersList, start, end) {
    return getSum(resizersList, function (resizer) { return resizer.getSize(); }, start, end);
};
var getMaxSizeSum = function (panesList, start, end) {
    return getSum(panesList, function (pane) {
        (0,_development_util__WEBPACK_IMPORTED_MODULE_4__.localConsole)({
            maxSize: pane.maxSize,
            minL: pane.minSize
        }, pane.id);
        return pane.maxSize;
    }, start, end);
};
var getMinSizeSum = function (panesList, start, end) {
    return getSum(panesList, function (pane) { return pane.minSize; }, start, end);
};
var setDownMaxLimits = function (panesList, index) {
    for (var i = 0; i <= index; i++) {
        panesList[i].synSizeToMaxSize();
    }
    for (var i = index + 1; i < panesList.length; i++) {
        panesList[i].synSizeToMinSize();
    }
};
var setUpMaxLimits = function (panesList, index) {
    for (var i = 0; i <= index; i++) {
        panesList[i].synSizeToMinSize();
    }
    for (var i = index + 1; i < panesList.length; i++) {
        panesList[i].synSizeToMaxSize();
    }
};
var findIndexInChildrenbyId = function (children, _id) {
    return children.findIndex(function (_a) {
        var id = _a.props.id;
        return id === _id;
    });
};
var fixChangeCallBack = function (pane, change, operation) {
    var newSize = pane.size + (operation === _constant__WEBPACK_IMPORTED_MODULE_3__.PLUS ? change : -change);
    pane.initializeSize(newSize);
};
var change1PixelToPanes = function (panesList, sizeChange, operation) {
    var count = 0;
    var len = panesList.length;
    var index;
    while (sizeChange > 1) {
        index = count % len;
        if (panesList[index].visibility) {
            fixChangeCallBack(panesList[index], 1, operation);
            --sizeChange;
        }
        ++count;
    }
    while (1) {
        index = count % len;
        if (panesList[index].visibility) {
            fixChangeCallBack(panesList[index], sizeChange, operation);
            return;
        }
        ++count;
    }
};
var createPaneModelList = function (children, props, store) {
    var paneList = [];
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var child = children_1[_i];
        if ((0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child)) {
            paneList.push(new _models_pane_model__WEBPACK_IMPORTED_MODULE_1__.PaneModel(child.props, props, store));
        }
    }
    return paneList;
};
var createResizerModelList = function (children, resizerSize, store) {
    var resizersList = [];
    for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
        var child = children_2[_i];
        if ((0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child)) {
            resizersList.push(new _models_resizer_model__WEBPACK_IMPORTED_MODULE_2__.ResizerModel(child.props, resizerSize, store));
        }
    }
    return resizersList;
};


/***/ }),

/***/ "./src/utils/resizable-pane.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateAxes: () => (/* binding */ calculateAxes),
/* harmony export */   getMaxContainerSizes: () => (/* binding */ getMaxContainerSizes),
/* harmony export */   getVisiblePaneModelsAndActiveIndex: () => (/* binding */ getVisiblePaneModelsAndActiveIndex),
/* harmony export */   goingDownLogic: () => (/* binding */ goingDownLogic),
/* harmony export */   goingUpLogic: () => (/* binding */ goingUpLogic),
/* harmony export */   minMaxLogicDown: () => (/* binding */ minMaxLogicDown),
/* harmony export */   minMaxLogicUp: () => (/* binding */ minMaxLogicUp),
/* harmony export */   registerContainer: () => (/* binding */ registerContainer),
/* harmony export */   setCurrentMinMax: () => (/* binding */ setCurrentMinMax),
/* harmony export */   toRatioModeFn: () => (/* binding */ toRatioModeFn)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/constant.js");
/* harmony import */ var _development_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/utils/development-util.ts");
/* harmony import */ var _panes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/utils/panes.ts");



var goingDownLogic = function (e, _a) {
    var axisCoordinate = _a.axisCoordinate, panesList = _a.panesList, activeIndex = _a.activeIndex;
    var sizeChange = e.mouseCoordinate - axisCoordinate;
    if (sizeChange < 0) {
    }
    else if (sizeChange === 0) {
        return;
    }
    var sizeChangeUp = sizeChange;
    for (var i = activeIndex; i > _constant__WEBPACK_IMPORTED_MODULE_0__.MINUS_ONE; i -= 1) {
        sizeChangeUp = panesList[i].changeSize(sizeChangeUp, _constant__WEBPACK_IMPORTED_MODULE_0__.PLUS);
    }
    sizeChange -= sizeChangeUp;
    for (var i = activeIndex + 1; i < panesList.length; i += 1) {
        sizeChange = panesList[i].changeSize(sizeChange, _constant__WEBPACK_IMPORTED_MODULE_0__.MINUS);
    }
};
var goingUpLogic = function (e, _a) {
    var axisCoordinate = _a.axisCoordinate, panesList = _a.panesList, activeIndex = _a.activeIndex;
    var sizeChange = axisCoordinate - e.mouseCoordinate;
    if (sizeChange < 0) {
    }
    else if (sizeChange === 0) {
        return;
    }
    var sizeChangeUp = sizeChange;
    for (var i = activeIndex + 1; i < panesList.length; i++) {
        sizeChangeUp = panesList[i].changeSize(sizeChangeUp, _constant__WEBPACK_IMPORTED_MODULE_0__.PLUS);
    }
    sizeChange -= sizeChangeUp;
    for (var i = activeIndex; i > _constant__WEBPACK_IMPORTED_MODULE_0__.MINUS_ONE; i -= 1) {
        sizeChange = panesList[i].changeSize(sizeChange, _constant__WEBPACK_IMPORTED_MODULE_0__.MINUS);
    }
};
var getVisiblePaneModelsAndActiveIndex = function (panesList, _activeIndex) {
    var visiblePanesList = panesList.filter(function (item) { return item.visibility; });
    var activePane = panesList[_activeIndex];
    var activeIndex = visiblePanesList.indexOf(activePane);
    return {
        visiblePanesList: visiblePanesList,
        activeIndex: activeIndex
    };
};
var setCurrentMinMax = function (serviceRefCurrent, index) {
    var panesList = serviceRefCurrent.panesList, activeIndex = serviceRefCurrent.activeIndex;
    var maxPaneSize = getMaxContainerSizes(serviceRefCurrent).maxPaneSize;
    var _idx = (index || activeIndex);
    var _a = getVisiblePaneModelsAndActiveIndex(panesList, _idx), visiblePanesList = _a.visiblePanesList, idx = _a.activeIndex;
    var nextIdx = idx + 1;
    var aMaxChangeUp = panesList[idx].getMinDiff();
    var bMaxChangeUp = visiblePanesList[nextIdx].getMaxDiff();
    (0,_development_util__WEBPACK_IMPORTED_MODULE_1__.setPaneList)(visiblePanesList, ['minSize', 'maxSize'], null);
    minMaxLogicUp(visiblePanesList, aMaxChangeUp - bMaxChangeUp, idx, nextIdx, 0, maxPaneSize);
    var aMaxChangeDown = visiblePanesList[nextIdx].getMinDiff();
    var bMaxChangeDown = visiblePanesList[idx].getMaxDiff();
    minMaxLogicDown(visiblePanesList, bMaxChangeDown - aMaxChangeDown, idx, nextIdx, 0, maxPaneSize);
};
var calculateAxes = function (serviceRefCurrent) {
    var panesList = serviceRefCurrent.panesList, resizersList = serviceRefCurrent.resizersList, activeIndex = serviceRefCurrent.activeIndex;
    var maxTopAxis = getMaxContainerSizes(serviceRefCurrent).maxTopAxis;
    var _a = getVisiblePaneModelsAndActiveIndex(panesList, activeIndex), visiblePanesList = _a.visiblePanesList, idx = _a.activeIndex;
    var resizerSizeHalf = Math.floor(resizersList[idx].getSize() / 2);
    var resizerAddon = (0,_panes__WEBPACK_IMPORTED_MODULE_2__.getResizerSum)(resizersList, 0, idx - 1) + resizerSizeHalf;
    var bottomAxis = maxTopAxis + (0,_panes__WEBPACK_IMPORTED_MODULE_2__.getMaxSizeSum)(visiblePanesList, 0, idx) + resizerAddon;
    var topAxis = maxTopAxis + (0,_panes__WEBPACK_IMPORTED_MODULE_2__.getMinSizeSum)(visiblePanesList, 0, idx) + resizerAddon;
    (0,_development_util__WEBPACK_IMPORTED_MODULE_1__.localConsole)({
        activeIndex: activeIndex,
        resizerAddon: resizerAddon,
        bottomAxis: bottomAxis,
        topAxis: topAxis
    }, 'calculateAxes');
    return {
        bottomAxis: bottomAxis,
        topAxis: topAxis
    };
};
var minMaxLogicUp = function (panesList, value, aIndex, bIndex, sum, maxPaneSize) {
    if (sum === void 0) { sum = 0; }
    var lastIndex = panesList.length - 1;
    var nextValue;
    var nextAIndex = aIndex;
    var nextBIndex = bIndex;
    var paneA = panesList[aIndex];
    var paneB = panesList[bIndex];
    switch (true) {
        case aIndex > 0 && bIndex < lastIndex:
            switch (true) {
                case value < 0:
                    sum += paneA.resetMin();
                    nextAIndex = aIndex - 1;
                    nextValue = panesList[nextAIndex].getMinDiff() + value;
                    break;
                case value === 0:
                    sum += paneA.resetMin();
                    sum += paneB.resetMax();
                    nextAIndex = aIndex - 1;
                    nextBIndex = bIndex + 1;
                    nextValue = panesList[nextAIndex].getMinDiff() - panesList[nextBIndex].getMaxDiff();
                    break;
                case value > 0:
                    sum += paneB.resetMax();
                    nextBIndex = bIndex + 1;
                    nextValue = value - panesList[nextBIndex].getMaxDiff();
                    break;
            }
            break;
        case aIndex === 0 && bIndex < lastIndex:
            switch (true) {
                case value < 0:
                    sum += paneA.resetMin();
                    sum += (0,_panes__WEBPACK_IMPORTED_MODULE_2__.synPanesMaxToSize)(panesList, bIndex + 1, lastIndex);
                    paneB.maxSize = maxPaneSize - sum;
                    return;
                case value === 0:
                    sum += paneA.resetMin();
                    sum += paneB.resetMax();
                    sum += (0,_panes__WEBPACK_IMPORTED_MODULE_2__.synPanesMaxToSize)(panesList, bIndex + 1, lastIndex);
                    return;
                case value > 0:
                    sum += paneB.resetMax();
                    nextBIndex = bIndex + 1;
                    nextValue = value - panesList[nextBIndex].getMaxDiff();
                    break;
            }
            break;
        case aIndex > 0 && bIndex === lastIndex:
            switch (true) {
                case value < 0:
                    sum += paneA.resetMin();
                    nextAIndex = aIndex - 1;
                    nextValue = panesList[nextAIndex].getMinDiff() + value;
                    break;
                case value === 0:
                    sum += paneA.resetMin();
                    sum += paneB.resetMax();
                    sum += (0,_panes__WEBPACK_IMPORTED_MODULE_2__.synPanesMinToSize)(panesList, 0, aIndex - 1);
                    return;
                case value > 0:
                    sum += paneB.resetMax();
                    sum += (0,_panes__WEBPACK_IMPORTED_MODULE_2__.synPanesMinToSize)(panesList, 0, aIndex - 1);
                    paneA.minSize = maxPaneSize - sum;
                    return;
            }
            break;
        case aIndex === 0 && bIndex === lastIndex:
            switch (true) {
                case value < 0:
                    sum += paneA.resetMin();
                    paneB.maxSize = maxPaneSize - sum;
                    return;
                case value === 0:
                    sum += paneA.resetMin();
                    sum += paneB.resetMax();
                    return;
                case value > 0:
                    sum += paneB.resetMax();
                    paneA.minSize = maxPaneSize - sum;
                    return;
            }
        default:
            console.error('v---------------------------------------------------------------');
            break;
    }
    minMaxLogicUp(panesList, nextValue, nextAIndex, nextBIndex, sum, maxPaneSize);
};
var minMaxLogicDown = function (panesList, value, aIndex, bIndex, sum, maxPaneSize) {
    if (sum === void 0) { sum = 0; }
    var lastIndex = panesList.length - 1;
    var nextValue;
    var nextAIndex = aIndex;
    var nextBIndex = bIndex;
    var paneA = panesList[aIndex];
    var paneB = panesList[bIndex];
    switch (true) {
        case aIndex > 0 && bIndex < lastIndex:
            switch (true) {
                case value < 0:
                    sum += paneA.resetMax();
                    nextAIndex = aIndex - 1;
                    nextValue = panesList[nextAIndex].getMaxDiff() + value;
                    break;
                case value === 0:
                    sum += paneA.resetMax();
                    sum += paneB.resetMin();
                    nextAIndex = aIndex - 1;
                    nextBIndex = bIndex + 1;
                    nextValue = panesList[nextAIndex].getMaxDiff() - panesList[nextBIndex].getMinDiff();
                    break;
                case value > 0:
                    sum += paneB.resetMin();
                    nextBIndex = bIndex + 1;
                    nextValue = value - panesList[nextBIndex].getMinDiff();
                    break;
            }
            break;
        case aIndex === 0 && bIndex < lastIndex:
            switch (true) {
                case value < 0:
                    sum += paneA.resetMax();
                    sum += (0,_panes__WEBPACK_IMPORTED_MODULE_2__.synPanesMinToSize)(panesList, bIndex + 1, lastIndex);
                    paneB.minSize = maxPaneSize - sum;
                    return;
                case value === 0:
                    sum += paneA.resetMax();
                    sum += paneB.resetMin();
                    sum += (0,_panes__WEBPACK_IMPORTED_MODULE_2__.synPanesMinToSize)(panesList, bIndex + 1, lastIndex);
                    return;
                case value > 0:
                    sum += paneB.resetMin();
                    nextBIndex = bIndex + 1;
                    nextValue = value - panesList[nextBIndex].getMinDiff();
                    break;
            }
            break;
        case aIndex > 0 && bIndex === lastIndex:
            switch (true) {
                case value < 0:
                    sum += paneA.resetMax();
                    nextAIndex = aIndex - 1;
                    nextValue = panesList[nextAIndex].getMaxDiff() + value;
                    break;
                case value === 0:
                    sum += paneA.resetMax();
                    sum += paneB.resetMin();
                    sum += (0,_panes__WEBPACK_IMPORTED_MODULE_2__.synPanesMaxToSize)(panesList, 0, aIndex - 1);
                    return;
                case value > 0:
                    sum += paneB.resetMin();
                    sum += (0,_panes__WEBPACK_IMPORTED_MODULE_2__.synPanesMaxToSize)(panesList, 0, aIndex - 1);
                    paneA.maxSize = maxPaneSize - sum;
                    return;
            }
            break;
        case aIndex === 0 && bIndex === lastIndex:
            switch (true) {
                case value < 0:
                    sum += paneA.resetMax();
                    paneB.minSize = maxPaneSize - sum;
                    return;
                case value === 0:
                    sum += paneB.resetMin();
                    sum += paneA.resetMax();
                    return;
                case value > 0:
                    sum += paneB.resetMin();
                    paneA.maxSize = maxPaneSize - sum;
                    return;
            }
        default:
            console.error('v---------------------------------------------------------------');
            break;
    }
    minMaxLogicDown(panesList, nextValue, nextAIndex, nextBIndex, sum, maxPaneSize);
};
var getMaxContainerSizes = function (_a) {
    var getContainerRect = _a.getContainerRect, vertical = _a.vertical, panesList = _a.panesList, resizersList = _a.resizersList;
    var _b = getContainerRect(), top = _b.top, height = _b.height, left = _b.left, width = _b.width;
    var maxTopAxis = vertical ? left : top;
    var containerSize = Math.round(vertical ? width : height);
    var resizersSize = (0,_panes__WEBPACK_IMPORTED_MODULE_2__.getResizerSum)(resizersList, 0, panesList.length - 2);
    var maxPaneSize = containerSize - resizersSize;
    return {
        containerSize: containerSize,
        maxTopAxis: maxTopAxis,
        maxPaneSize: maxPaneSize,
        resizersSize: resizersSize
    };
};
var registerContainer = function (context) { return function (node) {
    context.registerContainer({ getContainerRect: function () { return node.getBoundingClientRect(); } });
}; };
var toRatioModeFn = function (contextDetails) {
    var panesList = contextDetails.panesList, resizersList = contextDetails.resizersList;
    var maxPaneSize = getMaxContainerSizes(contextDetails).maxPaneSize;
    var maxRatioValue = (0,_panes__WEBPACK_IMPORTED_MODULE_2__.getPanesSizeSum)(panesList, 0, panesList.length - 1);
    panesList
        .forEach(function (pane) {
        pane.toRatioMode(maxPaneSize, maxRatioValue);
    });
    var sizeSum = (0,_panes__WEBPACK_IMPORTED_MODULE_2__.getPanesSizeSum)(panesList, 0, panesList.length - 1);
    var leftOverTotalSize = maxPaneSize - sizeSum;
    var changeOperation = leftOverTotalSize < 0 ? _constant__WEBPACK_IMPORTED_MODULE_0__.MINUS : _constant__WEBPACK_IMPORTED_MODULE_0__.PLUS;
    (0,_panes__WEBPACK_IMPORTED_MODULE_2__.change1PixelToPanes)(panesList, Math.abs(leftOverTotalSize), changeOperation);
    (0,_panes__WEBPACK_IMPORTED_MODULE_2__.setUISizesOfAllElement)(panesList, resizersList);
};


/***/ }),

/***/ "./src/utils/storage.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResizeStorage: () => (/* binding */ ResizeStorage),
/* harmony export */   onResizeClearSizesMapFromStore: () => (/* binding */ onResizeClearSizesMapFromStore)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _panes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/utils/panes.ts");


var onResizeClearSizesMapFromStore = function (uniqueId, storageApi) {
    window.addEventListener('resize', function () {
        if (storageApi) {
            storageApi.removeItem(uniqueId);
        }
    });
};
var ResizeStorage = (function () {
    function ResizeStorage(uniqueId, storageApi) {
        this.store = null;
        this.empty = false;
        this.uniqueId = uniqueId;
        this.storageApi = storageApi;
        this.getStorage();
    }
    ResizeStorage.prototype.setStorage = function (contextDetails, _containerSize) {
        var getContainerRect = contextDetails.getContainerRect, panesList = contextDetails.panesList, vertical = contextDetails.vertical, resizersList = contextDetails.resizersList;
        var _a = this, uniqueId = _a.uniqueId, storageApi = _a.storageApi;
        var _b = getContainerRect(), width = _b.width, height = _b.height;
        var containerSize = _containerSize || (vertical ? width : height) -
            (0,_panes__WEBPACK_IMPORTED_MODULE_1__.getResizerSum)(resizersList, 0, resizersList.length - 1);
        var objectToSave = {
            panesMap: panesList.reduce(function (acc, pane) {
                acc[pane.id] = pane.getStoreObj();
                return acc;
            }, {}),
            resizerMap: resizersList.reduce(function (acc, resizer) {
                acc[resizer.id] = resizer.getStoreModel();
                return acc;
            }, {}),
            containerSize: containerSize
        };
        this.store = objectToSave;
        if (storageApi) {
            storageApi.setItem(uniqueId, JSON.stringify(objectToSave));
        }
    };
    ResizeStorage.prototype.getStorage = function () {
        var _a = this, store = _a.store, uniqueId = _a.uniqueId, storageApi = _a.storageApi;
        if (store) {
            return store;
        }
        var value;
        if (storageApi) {
            value = storageApi.getItem(uniqueId);
            var parsedValue = JSON.parse(value, function (key, value) {
                if (key === 'defaultMaxSize') {
                    return Number(value);
                }
                return value;
            });
            if (toString.call(parsedValue) === '[object Object]') {
                this.store = parsedValue;
                return parsedValue;
            }
        }
        this.empty = true;
        return {
            panesMap: {},
            resizerMap: {}
        };
    };
    ResizeStorage.prototype.getStoredPane = function (id) {
        var _a;
        var panesMap = this.getStorage().panesMap;
        return (_a = panesMap[id]) !== null && _a !== void 0 ? _a : null;
    };
    ResizeStorage.prototype.getStoredResizer = function (id) {
        var _a;
        var resizerMap = this.getStorage().resizerMap;
        return (_a = resizerMap[id]) !== null && _a !== void 0 ? _a : null;
    };
    ResizeStorage.prototype.readPaneChange = function (children, context) {
        var _a = this.getStorage(), panesMap = _a.panesMap, containerSize = _a.containerSize;
        if (!containerSize) {
            return;
        }
        var panesList = context.contextDetails.panesList;
        var isVisibilityChanged = false;
        var visibleIds = children.filter(function (child) { return (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child); }).map(function (child) { return child.props.id; });
        panesList.forEach(function (pane) {
            var visibility = visibleIds.includes(pane.id);
            if (pane.visibility !== visibility) {
                pane.visibility = visibility;
                isVisibilityChanged = true;
            }
            pane.size = panesMap[pane.id].size;
        });
        if (isVisibilityChanged) {
            context.contextDetails.isSetRatioMode = true;
        }
    };
    return ResizeStorage;
}());



/***/ }),

/***/ "./src/utils/util.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDefaultProps: () => (/* binding */ addDefaultProps),
/* harmony export */   createMap: () => (/* binding */ createMap),
/* harmony export */   findById: () => (/* binding */ findById),
/* harmony export */   findIndex: () => (/* binding */ findIndex),
/* harmony export */   getObj: () => (/* binding */ getObj),
/* harmony export */   isUndefinedOrNull: () => (/* binding */ isUndefinedOrNull),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   ratioAndRoundOff: () => (/* binding */ ratioAndRoundOff),
/* harmony export */   ratioToNumber: () => (/* binding */ ratioToNumber)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var noop = function (_) { return _; };
var findById = function (list, _id) {
    return list.find(function (_a) {
        var id = _a.id;
        return id === _id;
    });
};
var createMap = function (paneList) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var map = {};
    paneList.forEach(function (pane) {
        var id = pane.id;
        if (keys.length === 1) {
            map[id] = pane[keys[0]];
        }
        else {
            map[id] = keys.reduce(function (acc, key) {
                acc[key] = pane[key];
                return acc;
            }, {});
        }
    });
    return map;
};
var isUndefinedOrNull = function (value) { return value === undefined || value === null; };
var findIndex = function (list, value, key) {
    if (key === void 0) { key = 'id'; }
    return list.findIndex(function (item) { return item[key] === value; });
};
var ratioToNumber = function (totalSize, maxRatioValue, size) {
    return Number((totalSize * (size / maxRatioValue)).toFixed(0));
};
var ratioAndRoundOff = function (totalSize, maxRatioValue, size) { return Math.round(ratioToNumber(totalSize, maxRatioValue, size)); };
var addDefaultProps = function (props, defaultProps) {
    var keys = Object.keys(__assign(__assign({}, props), defaultProps));
    var newProps = {};
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        newProps[key] = props[key] === undefined ? defaultProps[key] : props[key];
    }
    return newProps;
};
var getObj = function (obj) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var retObj = {};
    keys.forEach(function (key) {
        retObj[key] = obj[key];
    });
    return retObj;
};


/***/ }),

/***/ "react":
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-runtime":
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pane: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.Pane),
/* harmony export */   Panes: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.Pane),
/* harmony export */   ResizablePanes: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_0__.ResizablePanes)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/components/index.ts");


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map