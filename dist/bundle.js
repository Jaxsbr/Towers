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

/***/ "./src/AssetLoading/assetManager.ts":
/*!******************************************!*\
  !*** ./src/AssetLoading/assetManager.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst imageAsset_1 = __webpack_require__(/*! ./imageAsset */ \"./src/AssetLoading/imageAsset.ts\");\r\nconst mapAsset_1 = __webpack_require__(/*! ./mapAsset */ \"./src/AssetLoading/mapAsset.ts\");\r\nclass AssetManager {\r\n    constructor() {\r\n        this.images = [];\r\n        this.maps = [];\r\n    }\r\n    init() {\r\n        this.loadCompleted = false;\r\n        this.totalAssets = 0;\r\n        this.loadedAssets = 0;\r\n        this.initAssets();\r\n    }\r\n    initAssets() {\r\n        let imageAssets;\r\n        let mapAssets;\r\n        let request = new XMLHttpRequest();\r\n        request.onload = event => {\r\n            if (request.status === 200) {\r\n                let data = JSON.parse(request.responseText);\r\n                imageAssets = data.imageAssets;\r\n                mapAssets = data.mapAssets;\r\n                this.initImages(imageAssets);\r\n                //this.initMaps(mapAssets);\r\n            }\r\n        };\r\n        request.open('get', './assets/assetManifest.json', true);\r\n        request.send();\r\n    }\r\n    initImages(imageAssets) {\r\n        if (imageAssets) {\r\n            this.totalAssets += imageAssets.length;\r\n        }\r\n        imageAssets.forEach(asset => {\r\n            let image = new imageAsset_1.ImageAsset(this, asset.key, asset.src);\r\n            this.images.push(image);\r\n        });\r\n        this.images.forEach(img => {\r\n            img.init();\r\n        });\r\n    }\r\n    initMaps(mapAssets) {\r\n        if (mapAssets) {\r\n            this.totalAssets += mapAssets.length;\r\n        }\r\n        mapAssets.forEach(asset => {\r\n            let map = new mapAsset_1.MapAsset(this, asset.key, asset.src);\r\n            this.maps.push(map);\r\n        });\r\n        this.maps.forEach(map => {\r\n            map.init();\r\n        });\r\n    }\r\n    update() {\r\n        if (this.totalAssets !== 0 && this.totalAssets === this.loadedAssets) {\r\n            this.loadCompleted = true;\r\n        }\r\n    }\r\n    getImage(key) {\r\n        let image;\r\n        for (let img of this.images) {\r\n            if (img.key === key) {\r\n                return img.image;\r\n            }\r\n        }\r\n    }\r\n}\r\nexports.AssetManager = AssetManager;\r\n\n\n//# sourceURL=webpack:///./src/AssetLoading/assetManager.ts?");

/***/ }),

/***/ "./src/AssetLoading/imageAsset.ts":
/*!****************************************!*\
  !*** ./src/AssetLoading/imageAsset.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass ImageAsset {\r\n    constructor(assetManager, key, src) {\r\n        this.assetManager = assetManager;\r\n        this.key = key;\r\n        this.src = src;\r\n    }\r\n    init() {\r\n        this.image = new Image();\r\n        this.image.onload = () => {\r\n            this.assetManager.loadedAssets++;\r\n        };\r\n        this.image.src = this.src;\r\n    }\r\n}\r\nexports.ImageAsset = ImageAsset;\r\n\n\n//# sourceURL=webpack:///./src/AssetLoading/imageAsset.ts?");

/***/ }),

/***/ "./src/AssetLoading/mapAsset.ts":
/*!**************************************!*\
  !*** ./src/AssetLoading/mapAsset.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass MapAsset {\r\n    constructor(assetManager, key, src) {\r\n        this.assetManager = assetManager;\r\n        this.key = key;\r\n        this.src = src;\r\n    }\r\n    init() {\r\n        let request = new XMLHttpRequest();\r\n        request.onload = event => {\r\n            if (request.status === 200) {\r\n                let data = JSON.parse(request.responseText);\r\n                this.jsonRaw = data;\r\n                this.assetManager.loadedAssets++;\r\n            }\r\n        };\r\n        request.open('get', this.src, true);\r\n        request.send();\r\n    }\r\n}\r\nexports.MapAsset = MapAsset;\r\n\n\n//# sourceURL=webpack:///./src/AssetLoading/mapAsset.ts?");

/***/ }),

/***/ "./src/DataObjects/gameTime.ts":
/*!*************************************!*\
  !*** ./src/DataObjects/gameTime.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass GameTime {\r\n    constructor() {\r\n        this.delta = 0;\r\n        this.previousLoopTime = Date.now();\r\n    }\r\n    update() {\r\n        const currentTime = Date.now();\r\n        let delta = currentTime - this.previousLoopTime;\r\n        this.delta = delta / 1000;\r\n        this.previousLoopTime = currentTime;\r\n    }\r\n}\r\nexports.GameTime = GameTime;\r\n\n\n//# sourceURL=webpack:///./src/DataObjects/gameTime.ts?");

/***/ }),

/***/ "./src/DataObjects/rectangle.ts":
/*!**************************************!*\
  !*** ./src/DataObjects/rectangle.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Rectangle {\r\n    constructor(left, top, width, height) {\r\n        this.left = left;\r\n        this.top = top;\r\n        this.width = width;\r\n        this.height = height;\r\n        this.updateRight();\r\n        this.updateBottom();\r\n    }\r\n    updateRight() {\r\n        this.right = this.left + this.width;\r\n    }\r\n    updateBottom() {\r\n        this.bottom = this.top + this.height;\r\n    }\r\n    intersectRect(rectangle) {\r\n        return !(rectangle.left > this.right ||\r\n            rectangle.right < this.left ||\r\n            rectangle.top > this.bottom ||\r\n            rectangle.bottom < this.top);\r\n    }\r\n    containsRect(rectangle) {\r\n        return (this.left <= rectangle.left &&\r\n            rectangle.right <= this.right &&\r\n            this.top <= rectangle.top &&\r\n            rectangle.bottom <= this.bottom);\r\n    }\r\n    getCenterWidth() {\r\n        this.updateRight();\r\n        return this.right - this.width / 2;\r\n    }\r\n    getCenterHeight() {\r\n        this.updateRight();\r\n        return this.bottom - this.height / 2;\r\n    }\r\n    clone() {\r\n        return new Rectangle(this.left, this.top, this.width, this.height);\r\n    }\r\n    equals(rect) {\r\n        return (this.left == rect.left &&\r\n            this.top == rect.top &&\r\n            this.width == rect.width &&\r\n            this.height == rect.height);\r\n    }\r\n}\r\nexports.Rectangle = Rectangle;\r\n\n\n//# sourceURL=webpack:///./src/DataObjects/rectangle.ts?");

/***/ }),

/***/ "./src/Scenes/gameScene.ts":
/*!*********************************!*\
  !*** ./src/Scenes/gameScene.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass GameScene {\r\n    constructor(game, sceneManager, renderEngine) {\r\n        this.game = game;\r\n        this.sceneManager = sceneManager;\r\n        this.renderEngine = renderEngine;\r\n    }\r\n    init() {\r\n        this.backgroundImage = this.game.assetManager.getImage('background');\r\n    }\r\n    update(delta) {\r\n    }\r\n    render() {\r\n        this.renderEngine.clearRect(this.game.screenBounds);\r\n        this.renderEngine.renderImage(this.backgroundImage, 0, 0, 800, 480);\r\n    }\r\n    mouseDown() {\r\n    }\r\n    mouseUp() {\r\n    }\r\n    mouseMove(x, y) {\r\n    }\r\n    resize() {\r\n    }\r\n}\r\nexports.GameScene = GameScene;\r\n\n\n//# sourceURL=webpack:///./src/Scenes/gameScene.ts?");

/***/ }),

/***/ "./src/Scenes/loadScene.ts":
/*!*********************************!*\
  !*** ./src/Scenes/loadScene.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst rectangle_1 = __webpack_require__(/*! ../DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\r\nconst scenes_enum_1 = __webpack_require__(/*! ./scenes.enum */ \"./src/Scenes/scenes.enum.ts\");\r\nclass LoadScene {\r\n    constructor(game, sceneManager, renderEngine) {\r\n        this.game = game;\r\n        this.sceneManager = sceneManager;\r\n        this.renderEngine = renderEngine;\r\n    }\r\n    init() {\r\n    }\r\n    update(delta) {\r\n        this.game.assetManager.update();\r\n        if (this.game.assetManager.loadCompleted) {\r\n            // TODO: \r\n            // Implement an global enum for scenes.\r\n            // Make game and load scene private in Game class.\r\n            this.sceneManager.toggleActiveScene(scenes_enum_1.Scenes.game);\r\n        }\r\n    }\r\n    render() {\r\n        this.renderEngine.renderRect(new rectangle_1.Rectangle(0, 0, 800, 480), 'black', true);\r\n    }\r\n    mouseDown() {\r\n    }\r\n    mouseUp() {\r\n    }\r\n    mouseMove(x, y) {\r\n    }\r\n    resize() {\r\n    }\r\n}\r\nexports.LoadScene = LoadScene;\r\n\n\n//# sourceURL=webpack:///./src/Scenes/loadScene.ts?");

/***/ }),

/***/ "./src/Scenes/sceneManager.ts":
/*!************************************!*\
  !*** ./src/Scenes/sceneManager.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst loadScene_1 = __webpack_require__(/*! ../Scenes/loadScene */ \"./src/Scenes/loadScene.ts\");\r\nconst gameScene_1 = __webpack_require__(/*! ../Scenes/gameScene */ \"./src/Scenes/gameScene.ts\");\r\nconst scenes_enum_1 = __webpack_require__(/*! ./scenes.enum */ \"./src/Scenes/scenes.enum.ts\");\r\nclass SceneManager {\r\n    constructor(game, renderEngine) {\r\n        this.game = game;\r\n        this.renderEngine = renderEngine;\r\n        // TODO:\r\n        // Inject depependencies, no initialization\r\n        this.loadScene = new loadScene_1.LoadScene(this.game, this, this.renderEngine);\r\n        this.gameScene = new gameScene_1.GameScene(this.game, this, this.renderEngine);\r\n    }\r\n    toggleActiveScene(newScene) {\r\n        switch (+newScene) {\r\n            case scenes_enum_1.Scenes.loading:\r\n                this.game.currentScene = this.loadScene;\r\n                break;\r\n            case scenes_enum_1.Scenes.game:\r\n                this.game.currentScene = this.gameScene;\r\n                break;\r\n        }\r\n        this.game.currentScene.init();\r\n    }\r\n}\r\nexports.SceneManager = SceneManager;\r\n\n\n//# sourceURL=webpack:///./src/Scenes/sceneManager.ts?");

/***/ }),

/***/ "./src/Scenes/scenes.enum.ts":
/*!***********************************!*\
  !*** ./src/Scenes/scenes.enum.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Scenes;\r\n(function (Scenes) {\r\n    Scenes[Scenes[\"loading\"] = 0] = \"loading\";\r\n    Scenes[Scenes[\"game\"] = 1] = \"game\";\r\n})(Scenes = exports.Scenes || (exports.Scenes = {}));\r\n\n\n//# sourceURL=webpack:///./src/Scenes/scenes.enum.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst gameTime_1 = __webpack_require__(/*! ./DataObjects/gameTime */ \"./src/DataObjects/gameTime.ts\");\r\nconst rectangle_1 = __webpack_require__(/*! ./DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\r\nconst renderEngine_1 = __webpack_require__(/*! ./renderEngine */ \"./src/renderEngine.ts\");\r\nconst assetManager_1 = __webpack_require__(/*! ./AssetLoading/assetManager */ \"./src/AssetLoading/assetManager.ts\");\r\nconst sceneManager_1 = __webpack_require__(/*! ./Scenes/sceneManager */ \"./src/Scenes/sceneManager.ts\");\r\nconst scenes_enum_1 = __webpack_require__(/*! ./Scenes/scenes.enum */ \"./src/Scenes/scenes.enum.ts\");\r\nclass Game {\r\n    constructor() {\r\n        this.screenBounds = new rectangle_1.Rectangle(0, 0, 800, 480);\r\n        this.gameTime = new gameTime_1.GameTime();\r\n        this.renderEngine = new renderEngine_1.RenderEngine();\r\n        this.assetManager = new assetManager_1.AssetManager();\r\n        this.assetManager.init();\r\n        this.initSceneManager();\r\n    }\r\n    start() {\r\n        if (this.running) {\r\n            return;\r\n        }\r\n        this.running = true;\r\n        this.loop();\r\n    }\r\n    initSceneManager() {\r\n        this.sceneManager = new sceneManager_1.SceneManager(this, this.renderEngine);\r\n        this.sceneManager.toggleActiveScene(scenes_enum_1.Scenes.loading);\r\n    }\r\n    loop() {\r\n        this.gameTime.update();\r\n        if (this.currentScene) {\r\n            this.currentScene.update(this.gameTime.delta);\r\n            this.currentScene.render();\r\n        }\r\n        requestAnimationFrame(() => this.loop());\r\n    }\r\n}\r\nexports.Game = Game;\r\nwindow.addEventListener('load', () => {\r\n    const game = new Game();\r\n    game.start();\r\n});\r\n\n\n//# sourceURL=webpack:///./src/game.ts?");

/***/ }),

/***/ "./src/renderEngine.ts":
/*!*****************************!*\
  !*** ./src/renderEngine.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass RenderEngine {\r\n    constructor() {\r\n        const gameCanvas = document.getElementById('game-canvas');\r\n        this.context = gameCanvas.getContext('2d');\r\n    }\r\n    clearRect(rect) {\r\n        if (rect) {\r\n            this.context.clearRect(rect.left, rect.top, rect.width, rect.height);\r\n        }\r\n    }\r\n    renderRect(rect, color, fill) {\r\n        if (fill) {\r\n            this.context.fillStyle = color;\r\n            this.context.fillRect(rect.left, rect.top, rect.width, rect.height);\r\n        }\r\n        else {\r\n            this.context.beginPath();\r\n            this.context.strokeStyle = color;\r\n            this.context.strokeRect(rect.left, rect.top, rect.width, rect.height);\r\n        }\r\n    }\r\n    renderText(text, x, y) {\r\n        // TODO:\r\n        // Manage font family, style, size and color\r\n        this.context.fillStyle = 'red';\r\n        this.context.font = '20px Calibri';\r\n        this.context.fillText(text, x, y);\r\n    }\r\n    renderImageRect(image, bounds) {\r\n        this.renderImage(image, bounds.left, bounds.top, bounds.width, bounds.height);\r\n    }\r\n    renderImage(image, x, y, width = null, height = null) {\r\n        var w = width == null ? image.width : width;\r\n        var h = height == null ? image.height : height;\r\n        this.context.drawImage(image, x, y, w, h);\r\n    }\r\n    renderImageSource(image, sourceRect, destRect) {\r\n        if (sourceRect.left < 0 || sourceRect.top < 0 || sourceRect.height <= 0 || sourceRect.height <= 0) {\r\n            return;\r\n        }\r\n        this.context.drawImage(image, sourceRect.left, sourceRect.top, sourceRect.width, sourceRect.height, destRect.left, destRect.top, destRect.width, destRect.height);\r\n    }\r\n}\r\nexports.RenderEngine = RenderEngine;\r\n\n\n//# sourceURL=webpack:///./src/renderEngine.ts?");

/***/ })

/******/ });