/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "Towers";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DataObjects/rectangle.ts":
/*!**************************************!*\
  !*** ./src/DataObjects/rectangle.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Rectangle {\r\n    constructor(left, top, width, height) {\r\n        this.left = left;\r\n        this.top = top;\r\n        this.width = width;\r\n        this.height = height;\r\n        this.updateRight();\r\n        this.updateBottom();\r\n    }\r\n    updateRight() {\r\n        this.right = this.left + this.width;\r\n    }\r\n    updateBottom() {\r\n        this.bottom = this.top + this.height;\r\n    }\r\n    intersectRect(rectangle) {\r\n        return !(rectangle.left > this.right ||\r\n            rectangle.right < this.left ||\r\n            rectangle.top > this.bottom ||\r\n            rectangle.bottom < this.top);\r\n    }\r\n    containsRect(rectangle) {\r\n        return (this.left <= rectangle.left &&\r\n            rectangle.right <= this.right &&\r\n            this.top <= rectangle.top &&\r\n            rectangle.bottom <= this.bottom);\r\n    }\r\n    getCenterWidth() {\r\n        this.updateRight();\r\n        return this.right - this.width / 2;\r\n    }\r\n    getCenterHeight() {\r\n        this.updateRight();\r\n        return this.bottom - this.height / 2;\r\n    }\r\n    clone() {\r\n        return new Rectangle(this.left, this.top, this.width, this.height);\r\n    }\r\n    equals(rect) {\r\n        return (this.left == rect.left &&\r\n            this.top == rect.top &&\r\n            this.width == rect.width &&\r\n            this.height == rect.height);\r\n    }\r\n}\r\nexports.Rectangle = Rectangle;\r\n\n\n//# sourceURL=webpack:///./src/DataObjects/rectangle.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst globals_1 = __webpack_require__(/*! ./globals */ \"./src/globals.ts\");\r\nconst rectangle_1 = __webpack_require__(/*! ./DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\r\nclass Game {\r\n    constructor(gameTime) {\r\n        this.gameTime = gameTime;\r\n    }\r\n    start() {\r\n        if (this.running) {\r\n            return;\r\n        }\r\n        this.running = true;\r\n        this.loop();\r\n    }\r\n    loop() {\r\n        this.gameTime.update();\r\n        globals_1.Globals.renderEngine.renderRect(new rectangle_1.Rectangle(0, 0, 100, 100), 'red', true);\r\n        requestAnimationFrame(() => this.loop());\r\n    }\r\n}\r\nexports.Game = Game;\r\n\n\n//# sourceURL=webpack:///./src/game.ts?");

/***/ }),

/***/ "./src/globals.ts":
/*!************************!*\
  !*** ./src/globals.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst renderEngine_1 = __webpack_require__(/*! ./renderEngine */ \"./src/renderEngine.ts\");\r\nvar Globals;\r\n(function (Globals) {\r\n    Globals.gameCanvas = document.getElementById('game-canvas');\r\n    Globals.graphicsContext = Globals.gameCanvas.getContext('2d');\r\n    Globals.renderEngine = new renderEngine_1.RenderEngine(Globals.graphicsContext);\r\n})(Globals = exports.Globals || (exports.Globals = {}));\r\n\n\n//# sourceURL=webpack:///./src/globals.ts?");

/***/ }),

/***/ "./src/renderEngine.ts":
/*!*****************************!*\
  !*** ./src/renderEngine.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass RenderEngine {\r\n    constructor(context) {\r\n        this.context = context;\r\n    }\r\n    clearRect(rect) {\r\n        if (rect) {\r\n            this.context.clearRect(rect.left, rect.top, rect.width, rect.height);\r\n        }\r\n    }\r\n    renderRect(rect, color, fill) {\r\n        if (fill) {\r\n            this.context.fillStyle = color;\r\n            this.context.fillRect(rect.left, rect.top, rect.width, rect.height);\r\n        }\r\n        else {\r\n            this.context.beginPath();\r\n            this.context.strokeStyle = color;\r\n            this.context.strokeRect(rect.left, rect.top, rect.width, rect.height);\r\n        }\r\n    }\r\n}\r\nexports.RenderEngine = RenderEngine;\r\n\n\n//# sourceURL=webpack:///./src/renderEngine.ts?");

/***/ })

/******/ });