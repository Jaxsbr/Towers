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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst imageAsset_1 = __webpack_require__(/*! ./imageAsset */ \"./src/AssetLoading/imageAsset.ts\");\nconst mapAsset_1 = __webpack_require__(/*! ./mapAsset */ \"./src/AssetLoading/mapAsset.ts\");\nclass AssetManager {\n    constructor() {\n        this.images = [];\n        this.maps = [];\n        this.levelInfo = [];\n    }\n    init() {\n        this.loadCompleted = false;\n        this.totalAssets = 0;\n        this.loadedAssets = 0;\n        this.initAssets();\n    }\n    initAssets() {\n        let imageAssets;\n        let mapAssets;\n        let request = new XMLHttpRequest();\n        request.onload = event => {\n            if (request.status === 200) {\n                let data = JSON.parse(request.responseText);\n                this.totalAssets = data.assetCount;\n                imageAssets = data.imageAssets;\n                mapAssets = data.mapAssets;\n                this.initImages(imageAssets);\n                this.initLevelInfo(data.levelInfoFile);\n            }\n        };\n        request.open('get', './assets/assetManifest.json', true);\n        request.send();\n    }\n    initImages(imageAssets) {\n        imageAssets.forEach(asset => {\n            let image = new imageAsset_1.ImageAsset(this, asset.key, asset.src);\n            this.images.push(image);\n        });\n        this.images.forEach(img => {\n            img.init();\n        });\n    }\n    initMaps(mapAssets) {\n        mapAssets.forEach(asset => {\n            let map = new mapAsset_1.MapAsset(this, asset.key, asset.src);\n            this.maps.push(map);\n        });\n        this.maps.forEach(map => {\n            map.init();\n        });\n    }\n    initLevelInfo(levelInfoFile) {\n        if (!levelInfoFile) {\n            console.error(\"no level info file provided\");\n            return;\n        }\n        let request = new XMLHttpRequest();\n        request.onload = event => {\n            if (request.status === 200) {\n                let data = JSON.parse(request.responseText);\n                this.levelInfo = data;\n                this.loadedAssets++;\n            }\n        };\n        request.open('get', levelInfoFile, true);\n        request.send();\n    }\n    update() {\n        if (this.totalAssets !== 0 && this.totalAssets === this.loadedAssets) {\n            this.loadCompleted = true;\n        }\n    }\n    getImage(key) {\n        let image;\n        for (let img of this.images) {\n            if (img.key === key) {\n                return img.image;\n            }\n        }\n    }\n}\nexports.AssetManager = AssetManager;\n\n\n//# sourceURL=webpack:///./src/AssetLoading/assetManager.ts?");

/***/ }),

/***/ "./src/AssetLoading/imageAsset.ts":
/*!****************************************!*\
  !*** ./src/AssetLoading/imageAsset.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass ImageAsset {\n    constructor(assetManager, key, src) {\n        this.assetManager = assetManager;\n        this.key = key;\n        this.src = src;\n    }\n    init() {\n        this.image = new Image();\n        this.image.onload = () => {\n            this.assetManager.loadedAssets++;\n        };\n        this.image.src = this.src;\n    }\n}\nexports.ImageAsset = ImageAsset;\n\n\n//# sourceURL=webpack:///./src/AssetLoading/imageAsset.ts?");

/***/ }),

/***/ "./src/AssetLoading/mapAsset.ts":
/*!**************************************!*\
  !*** ./src/AssetLoading/mapAsset.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass MapAsset {\n    constructor(assetManager, key, src) {\n        this.assetManager = assetManager;\n        this.key = key;\n        this.src = src;\n    }\n    init() {\n        let request = new XMLHttpRequest();\n        request.onload = event => {\n            if (request.status === 200) {\n                let data = JSON.parse(request.responseText);\n                this.jsonRaw = data;\n                this.assetManager.loadedAssets++;\n            }\n        };\n        request.open('get', this.src, true);\n        request.send();\n    }\n}\nexports.MapAsset = MapAsset;\n\n\n//# sourceURL=webpack:///./src/AssetLoading/mapAsset.ts?");

/***/ }),

/***/ "./src/DataObjects/gameTime.ts":
/*!*************************************!*\
  !*** ./src/DataObjects/gameTime.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass GameTime {\n    constructor() {\n        this.delta = 0;\n        this.previousLoopTime = Date.now();\n    }\n    update() {\n        const currentTime = Date.now();\n        let delta = currentTime - this.previousLoopTime;\n        this.delta = delta / 1000;\n        this.previousLoopTime = currentTime;\n    }\n}\nexports.GameTime = GameTime;\n\n\n//# sourceURL=webpack:///./src/DataObjects/gameTime.ts?");

/***/ }),

/***/ "./src/DataObjects/imageObject.ts":
/*!****************************************!*\
  !*** ./src/DataObjects/imageObject.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst rectangle_1 = __webpack_require__(/*! ./rectangle */ \"./src/DataObjects/rectangle.ts\");\nclass ImageObject {\n    constructor() {\n        this._sourceRectangle = null;\n        this._destinationRectangle = null;\n    }\n    get sourceRectangle() {\n        if (this._sourceRectangle == null) {\n            this._sourceRectangle = new rectangle_1.Rectangle(this.sx, this.sy, this.swidth, this.sheight);\n        }\n        return this._sourceRectangle;\n    }\n    get destinationRectangle() {\n        if (this._destinationRectangle == null) {\n            this._destinationRectangle = new rectangle_1.Rectangle(this.x, this.y, this.width, this.height);\n        }\n        return this._destinationRectangle;\n    }\n}\nexports.ImageObject = ImageObject;\n\n\n//# sourceURL=webpack:///./src/DataObjects/imageObject.ts?");

/***/ }),

/***/ "./src/DataObjects/rectangle.ts":
/*!**************************************!*\
  !*** ./src/DataObjects/rectangle.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Rectangle {\n    constructor(left, top, width, height) {\n        this.left = left;\n        this.top = top;\n        this.width = width;\n        this.height = height;\n        this.update();\n    }\n    updateRight() {\n        this.right = this.left + this.width;\n    }\n    updateBottom() {\n        this.bottom = this.top + this.height;\n    }\n    update() {\n        this.updateRight();\n        this.updateBottom();\n    }\n    intersectRect(rectangle) {\n        return !(rectangle.left > this.right ||\n            rectangle.right < this.left ||\n            rectangle.top > this.bottom ||\n            rectangle.bottom < this.top);\n    }\n    containsRect(rectangle) {\n        return (this.left <= rectangle.left &&\n            rectangle.right <= this.right &&\n            this.top <= rectangle.top &&\n            rectangle.bottom <= this.bottom);\n    }\n    get getCenterWidth() {\n        this.updateRight();\n        return this.right - this.width / 2;\n    }\n    get getCenterHeight() {\n        this.updateBottom();\n        return this.bottom - this.height / 2;\n    }\n    clone() {\n        return new Rectangle(this.left, this.top, this.width, this.height);\n    }\n    equals(rect) {\n        return (this.left == rect.left &&\n            this.top == rect.top &&\n            this.width == rect.width &&\n            this.height == rect.height);\n    }\n    toString() {\n        return 'x:' + this.left + ' y: ' + this.top + ' w: ' + this.width + ' h:' + this.height;\n    }\n}\nexports.Rectangle = Rectangle;\n\n\n//# sourceURL=webpack:///./src/DataObjects/rectangle.ts?");

/***/ }),

/***/ "./src/DataObjects/vector2.ts":
/*!************************************!*\
  !*** ./src/DataObjects/vector2.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Vector2 {\n    constructor(x = 0, y = 0) {\n        this.x = x;\n        this.y = y;\n    }\n    subtract(vector2) {\n        return new Vector2(this.x - vector2.x, this.y - vector2.y);\n    }\n    distance(vector2) {\n        var x = (this.x - vector2.x) * (this.x - vector2.x);\n        var y = (this.y - vector2.y) * (this.y - vector2.y);\n        return Math.sqrt(x + y);\n    }\n    magnitude() {\n        return Math.sqrt(this.x * this.x + this.y * this.y);\n    }\n    normalize() {\n        let distance = Math.sqrt(this.x * this.x + this.y * this.y);\n        var normalX = this.x / distance;\n        var normalY = this.y / distance;\n        return new Vector2(isNaN(normalX) ? 0 : normalX, isNaN(normalY) ? 0 : normalY);\n    }\n}\nexports.Vector2 = Vector2;\n\n\n//# sourceURL=webpack:///./src/DataObjects/vector2.ts?");

/***/ }),

/***/ "./src/Enemies/enemy.ts":
/*!******************************!*\
  !*** ./src/Enemies/enemy.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst vector2_1 = __webpack_require__(/*! ../DataObjects/vector2 */ \"./src/DataObjects/vector2.ts\");\nconst rectangle_1 = __webpack_require__(/*! ../DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\nclass Enemy {\n    constructor(gameScene, enemyImage, movementWayPoints) {\n        this.wayPointReachedThreshold = 2;\n        this.moveSpeed = 75;\n        this.hp = 0;\n        this.maxHp = 5;\n        this.topPadding = 10;\n        this.alive = false;\n        this.gameScene = gameScene;\n        this.enemyImage = enemyImage;\n        this.originalWayPoints = movementWayPoints;\n        this.reset(0, 0);\n    }\n    reset(moveSpeed, maxHp) {\n        this.active = false;\n        this.alive = false;\n        this.maxHp = maxHp;\n        this.hp = this.maxHp;\n        this.moveSpeed = moveSpeed;\n        this.movementWayPoints = this.originalWayPoints.slice();\n        this.movements = { left: false, right: false, up: false, down: false };\n        this.position = new vector2_1.Vector2(0, 0);\n        this.size = new vector2_1.Vector2(48, 48);\n        this.center = new vector2_1.Vector2(0, 0);\n        this.velocity = new vector2_1.Vector2(0, 0);\n        this.bounds = new rectangle_1.Rectangle(0, 0, 0, 0);\n        this.nextMovePoint = null;\n        this.hpBounds = new rectangle_1.Rectangle(this.bounds.left, this.bounds.top - this.topPadding, this.bounds.width, this.bounds.height);\n        this.liveBounds = this.hpBounds.clone();\n        this.enemyName = Math.random().toString();\n    }\n    update(delta) {\n        if (!this.active) {\n            return;\n        }\n        var onLastWaypoint = false;\n        if (this.movementWayPoints.length <= 0) {\n            onLastWaypoint = true;\n        }\n        if (!this.nextMovePoint) {\n            var firstWayPoint = this.movementWayPoints.shift();\n            var waypointBounds = this.gameScene.tileMap.tileMatrix[firstWayPoint.y][firstWayPoint.x].bounds;\n            this.nextMovePoint = new vector2_1.Vector2(waypointBounds.getCenterWidth, waypointBounds.getCenterHeight);\n        }\n        this.updateBounds();\n        this.updateHpBounds();\n        this.direction = this.nextMovePoint.subtract(this.center);\n        this.distanceFromNextWaypoint = this.direction.magnitude();\n        if (this.nextWaypointReached()) {\n            if (onLastWaypoint) {\n                this.nextMovePoint = null;\n                this.active = false;\n                //console.log(this.enemyName + ': end reached');\n                window.dispatchEvent(new CustomEvent('enemyReachedEnd'));\n                return;\n            }\n            else {\n                var nextWayPoint = this.movementWayPoints.shift();\n                var waypointBounds = this.gameScene.tileMap.tileMatrix[nextWayPoint.y][nextWayPoint.x].bounds;\n                this.nextMovePoint.x = waypointBounds.getCenterWidth;\n                this.nextMovePoint.y = waypointBounds.getCenterHeight;\n                this.direction = this.center.subtract(this.nextMovePoint);\n            }\n        }\n        this.normalizedDirection = this.direction.normalize();\n        if (!isNaN(this.normalizedDirection.x) && !isNaN(this.normalizedDirection.y)) {\n            this.velocity.x = this.normalizedDirection.x * (this.moveSpeed * delta);\n            this.velocity.y = this.normalizedDirection.y * (this.moveSpeed * delta);\n            this.setMoveDirection();\n        }\n        this.applyVelocity();\n    }\n    nextWaypointReached() {\n        return this.distanceFromNextWaypoint < this.wayPointReachedThreshold;\n    }\n    updateBounds() {\n        this.bounds.left = this.position.x;\n        this.bounds.top = this.position.y;\n        this.bounds.width = this.size.x;\n        this.bounds.height = this.size.y;\n        this.bounds.update();\n        this.updateHpBounds();\n        this.updateLifeBounds();\n        this.center.x = this.bounds.getCenterWidth;\n        this.center.y = this.bounds.getCenterHeight;\n    }\n    updateHpBounds() {\n        var percentageRemaining = this.hp * 100 / this.maxHp;\n        var percentageDiff = 100 - percentageRemaining;\n        var percentageLive = this.liveBounds.width * percentageDiff / 100;\n        this.hpBounds.width = this.liveBounds.width - (percentageLive);\n        this.hpBounds.left = this.bounds.left;\n        this.hpBounds.top = this.bounds.top;\n        this.hpBounds.height = this.bounds.height / this.topPadding;\n        this.hpBounds.update();\n    }\n    updateLifeBounds() {\n        this.liveBounds.left = this.bounds.left;\n        this.liveBounds.top = this.bounds.top;\n        this.liveBounds.width = this.bounds.width;\n        this.liveBounds.height = this.bounds.height / this.topPadding;\n        this.liveBounds.update();\n    }\n    draw() {\n        if (!this.active) {\n            return;\n        }\n        // TODO:\n        // Implement animation class and call draw\n        // Animation class to handle source rect updates.\n        var sourceRectangle = new rectangle_1.Rectangle(0, 0, 68, 80);\n        this.gameScene.renderEngine.renderImageSource(this.enemyImage, sourceRectangle, this.bounds);\n        // TODO:\n        // Introduce damage percentage bar\n        this.drawHPBar(\"red\", this.liveBounds);\n        this.drawHPBar(\"green\", this.hpBounds);\n    }\n    drawHPBar(color, bounds) {\n        //debugger;\n        this.gameScene.renderEngine.renderRect(bounds, color, true);\n    }\n    setMoveDirection() {\n        this.movements.left = this.velocity.x < 0;\n        this.movements.right = this.velocity.x > 0;\n        this.movements.up = this.velocity.y < 0;\n        this.movements.down = this.velocity.y > 0;\n        if ((this.movements.left || this.movements.right) &&\n            (this.movements.up || this.movements.down)) {\n            // We detect if both horizontal and vertical movement is set.\n            // As we can only play one animation per axis movement we should determine\n            // what axis has the greater velocity value and use that as the direction.\n            let horizontalValue = this.velocity.x < 0 ? this.velocity.x * -1 : this.velocity.x;\n            let verticalValue = this.velocity.y < 0 ? this.velocity.y * -1 : this.velocity.y;\n            if (horizontalValue > verticalValue) {\n                this.movements.left = this.velocity.x < 0;\n                this.movements.right = this.velocity.x > 0;\n                this.movements.up = false;\n                this.movements.down = false;\n            }\n            else {\n                this.movements.up = this.velocity.y < 0;\n                this.movements.down = this.velocity.y > 0;\n                this.movements.left = false;\n                this.movements.right = false;\n            }\n        }\n    }\n    applyVelocity() {\n        this.position.x += this.velocity.x;\n        this.position.y += this.velocity.y;\n    }\n    hit() {\n        if (this.active) {\n            this.hp--;\n            //console.log(this.enemyName + ': hit ' + this.hp);\n            if (this.hp <= 0) {\n                this.active = false;\n                //console.log(this.enemyName + ': killed');\n                window.dispatchEvent(new CustomEvent('enemyKilled'));\n            }\n        }\n    }\n}\nexports.Enemy = Enemy;\n\n\n//# sourceURL=webpack:///./src/Enemies/enemy.ts?");

/***/ }),

/***/ "./src/Enemies/enemySpawner.ts":
/*!*************************************!*\
  !*** ./src/Enemies/enemySpawner.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst enemy_1 = __webpack_require__(/*! ./enemy */ \"./src/Enemies/enemy.ts\");\nclass EnemySpawner {\n    constructor(gameScene) {\n        this.enemies = [];\n        this.enemySpawnCount = 0;\n        this.enemySpawnElapsed = 0;\n        this.enemiesKilled = 0;\n        this.enemiesEscaped = 0;\n        this.gameScene = gameScene;\n        this.enemyImage = this.gameScene.game.assetManager.getImage('squid');\n        this.setCurrentLevel();\n        window.addEventListener('enemyKilled', () => { this.enemiesKilled++; });\n        window.addEventListener('enemyReachedEnd', () => { this.enemiesEscaped++; });\n    }\n    update(delta) {\n        this.enemies.forEach(enemy => {\n            enemy.update(delta);\n        });\n        this.updateSpawner(delta);\n        this.updateRoundCheck();\n    }\n    updateSpawner(delta) {\n        if (this.enemySpawnCount >= this.enemySpawnCountMax) {\n            return;\n        }\n        this.enemySpawnElapsed += delta;\n        if (this.enemySpawnElapsed >= this.enemySpawnRate) {\n            this.enemySpawnElapsed = 0;\n            this.createEnemy();\n            this.enemySpawnCount++;\n        }\n    }\n    updateRoundCheck() {\n        if (this.enemiesEscaped + this.enemiesKilled == this.gameScene.levelManager.currentLevel.enemySpawnCountMax) {\n            this.enemiesKilled = 0;\n            this.enemiesEscaped = 0;\n            this.enemySpawnCount = 0;\n            this.gameScene.levelManager.nextLevel();\n            this.setCurrentLevel();\n        }\n    }\n    draw() {\n        this.enemies.forEach(enemy => {\n            enemy.draw();\n        });\n    }\n    createEnemy() {\n        // TODO:\n        // Reset inactive enemies from pool instead of creating new ones\n        // THIS IS A LEAK BTW\n        //console.clear();\n        //console.log(\"enemy in array count: \" + this.enemies.length);\n        var enemy = new enemy_1.Enemy(this.gameScene, this.enemyImage, this.gameScene.tileMap.wayPoints);\n        enemy.reset(this.gameScene.levelManager.currentLevel.enemyMoveSpeed, this.gameScene.levelManager.currentLevel.enemyMaxHp);\n        enemy.active = true;\n        this.enemies.push(enemy);\n    }\n    setCurrentLevel() {\n        this.enemySpawnCountMax = this.gameScene.levelManager.currentLevel.enemySpawnCountMax;\n        this.enemySpawnRate = this.gameScene.levelManager.currentLevel.enemySpawnRate;\n    }\n}\nexports.EnemySpawner = EnemySpawner;\n\n\n//# sourceURL=webpack:///./src/Enemies/enemySpawner.ts?");

/***/ }),

/***/ "./src/Levels/levelManager.ts":
/*!************************************!*\
  !*** ./src/Levels/levelManager.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass LevelManager {\n    constructor(levelInfo) {\n        this.levelInfo = levelInfo;\n        this.loadLevel();\n    }\n    loadLevel() {\n        if (this.currentLevel == null) {\n            this.currentLevel = this.levelInfo[0];\n            return;\n        }\n    }\n    nextLevel() {\n        var index = this.currentLevel.levelIndex + 1;\n        for (var l = 0; l < this.levelInfo.length; l++) {\n            if (this.levelInfo[l].levelIndex == index) {\n                this.currentLevel = this.levelInfo[l];\n                return;\n            }\n        }\n        // NOTE: If we get here, no more level exist\n        // TODO:\n        // Raise end of level notification\n        //console.log(\"last level done\")\n    }\n}\nexports.LevelManager = LevelManager;\n\n\n//# sourceURL=webpack:///./src/Levels/levelManager.ts?");

/***/ }),

/***/ "./src/Menu/menu.ts":
/*!**************************!*\
  !*** ./src/Menu/menu.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Menu {\n    constructor(gameScene) {\n        this.stagedTowerImageWidth = 48;\n        this.stagedTowerImageHeight = 48;\n        this.gameScene = gameScene;\n        window.addEventListener('plainTowerClicked', () => { this.towerClicked(\"plain\"); });\n        window.addEventListener('slowTowerClicked', () => { this.towerClicked(\"slow\"); });\n        this.menuHeight = document.getElementById('tower_menu').clientHeight;\n        this.imageDictionary = [\n            { key: 'plain', image: this.gameScene.game.assetManager.getImage(\"towerplain\") },\n            { key: 'slow', image: this.gameScene.game.assetManager.getImage(\"towerslow\") }\n        ];\n        // this.plainTowerImage = this.gameScene.game.assetManager.getImage(\"towerplain\");\n        // this.slowTowerImage = this.gameScene.game.assetManager.getImage(\"towerslow\");\n    }\n    clearStagedTower() {\n        this.stagedTower = '';\n    }\n    towerClicked(type) {\n        this.stagedTower = type;\n    }\n    draw() {\n        // TODO: Refactor this, code being duplicated here when only image changes        \n        // TODO: Fix staged image render layout\n        // Behavoir: The staged tower renders at the mouse pointer y and x + 1/2. \n        //           On clicking, the tower can be placed on an adjacent tile to the expected tile.\n        // Fix: Render the staged tower image's center over the mouse pointer.\n        if (!this.gameScene.mouseInfo) {\n            return;\n        }\n        const tX = this.gameScene.mouseInfo.x - (this.stagedTowerImageWidth / 2);\n        const tY = this.gameScene.mouseInfo.y - (this.stagedTowerImageHeight / 2) - this.menuHeight;\n        const image = this.imageDictionary.find(x => x.key == this.stagedTower).image;\n        this.gameScene.renderEngine.renderImage(image, tX, tY, this.stagedTowerImageWidth, this.stagedTowerImageHeight);\n        // switch (this.stagedTower) {\n        //     case 'plain':\n        //             this.gameScene.renderEngine.renderImage(this.plainTowerImage, tX, tY, this.stagedTowerImageWidth, this.stagedTowerImageHeight);\n        //         break;\n        //     case 'slow':\n        //             this.gameScene.renderEngine.renderImage(this.slowTowerImage, tX, tY, this.stagedTowerImageWidth, this.stagedTowerImageHeight);\n        //         break;\n        //     default:\n        //         break;\n        // }        \n    }\n}\nexports.Menu = Menu;\n\n\n//# sourceURL=webpack:///./src/Menu/menu.ts?");

/***/ }),

/***/ "./src/Projectiles/projectile.ts":
/*!***************************************!*\
  !*** ./src/Projectiles/projectile.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst vector2_1 = __webpack_require__(/*! ../DataObjects/vector2 */ \"./src/DataObjects/vector2.ts\");\nconst rectangle_1 = __webpack_require__(/*! ../DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\nclass Projectile {\n    constructor(gameScene, projectileImage) {\n        this.active = false;\n        this.moveSpeed = 0.5;\n        this.ttl = 0;\n        this.ttlMax = 2;\n        this.gameScene = gameScene;\n        this.projectileImage = projectileImage;\n        this.worldBounds = this.gameScene.game.screenBounds;\n        this.bounds = new rectangle_1.Rectangle(0, 0, 24, 24);\n        this.velocity = new vector2_1.Vector2(0, 0);\n        this.projectileColor = 'black';\n        this.imageSourceRect = new rectangle_1.Rectangle(0, 0, 32, 32);\n    }\n    update(delta) {\n        this.bounds.update();\n        this.updateTTL(delta);\n        this.updateVelocity(delta);\n    }\n    updateTTL(delta) {\n        if (!this.active) {\n            return;\n        }\n        this.ttl -= delta;\n        if (this.ttl <= 0) {\n            this.active = false;\n        }\n    }\n    updateVelocity(delta) {\n        if (!this.direction || !this.active) {\n            return;\n        }\n        this.velocity.x = this.direction.x * (this.moveSpeed * delta);\n        this.velocity.y = this.direction.y * (this.moveSpeed * delta);\n        this.bounds.left += this.velocity.x;\n        this.bounds.top += this.velocity.y;\n    }\n    draw() {\n        if (!this.active) {\n            return;\n        }\n        this.gameScene.renderEngine.renderImageSource(this.projectileImage, this.imageSourceRect, this.bounds);\n        //this.gameScene.renderEngine.renderRect(this.bounds, this.projectileColor, true);\n    }\n    reset(startPosition, direction, moveSpeed) {\n        this.active = true;\n        this.ttl = this.ttlMax;\n        this.startPosition = startPosition;\n        this.direction = direction;\n        this.moveSpeed = moveSpeed;\n        this.velocity.x = 0;\n        this.velocity.y = 0;\n        this.bounds.left = this.startPosition.x - (this.bounds.width / 2);\n        this.bounds.top = this.startPosition.y - (this.bounds.height / 2);\n        this.bounds.update();\n    }\n}\nexports.Projectile = Projectile;\n\n\n//# sourceURL=webpack:///./src/Projectiles/projectile.ts?");

/***/ }),

/***/ "./src/Projectiles/projectileEngine.ts":
/*!*********************************************!*\
  !*** ./src/Projectiles/projectileEngine.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst projectile_1 = __webpack_require__(/*! ./projectile */ \"./src/Projectiles/projectile.ts\");\nclass ProjectileEngine {\n    constructor(gameScene) {\n        this.projectiles = [];\n        this.gameScene = gameScene;\n        this.projectileImage = this.gameScene.game.assetManager.getImage('projectile');\n    }\n    update(delta) {\n        this.projectiles.forEach((projectile) => {\n            projectile.update(delta);\n        });\n    }\n    draw() {\n        this.projectiles.forEach((projectile) => {\n            projectile.draw();\n        });\n    }\n    activateProjectile(startPosition, direction, moveSpeed) {\n        var poolSufficient = false;\n        for (var i = 0; i < this.projectiles.length; i++) {\n            if (!this.projectiles[i].active) {\n                this.projectiles[i].reset(startPosition, direction, moveSpeed);\n                poolSufficient = true;\n                //console.log('projectile reset');\n                break;\n            }\n        }\n        if (!poolSufficient) {\n            this.expandProjectilePool(startPosition, direction, moveSpeed);\n        }\n    }\n    expandProjectilePool(startPosition, direction, moveSpeed) {\n        var projectile = new projectile_1.Projectile(this.gameScene, this.projectileImage);\n        this.projectiles.push(projectile);\n        //console.log('grow pool size: ' + this.projectiles.length);\n        this.activateProjectile(startPosition, direction, moveSpeed);\n        return projectile;\n    }\n}\nexports.ProjectileEngine = ProjectileEngine;\n\n\n//# sourceURL=webpack:///./src/Projectiles/projectileEngine.ts?");

/***/ }),

/***/ "./src/Scenes/gameScene.ts":
/*!*********************************!*\
  !*** ./src/Scenes/gameScene.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst tileMap_1 = __webpack_require__(/*! ../Tiles/tileMap */ \"./src/Tiles/tileMap.ts\");\nconst enemySpawner_1 = __webpack_require__(/*! ../Enemies/enemySpawner */ \"./src/Enemies/enemySpawner.ts\");\nconst towerManager_1 = __webpack_require__(/*! ../Towers/towerManager */ \"./src/Towers/towerManager.ts\");\nconst projectileEngine_1 = __webpack_require__(/*! ../Projectiles/projectileEngine */ \"./src/Projectiles/projectileEngine.ts\");\nconst levelManager_1 = __webpack_require__(/*! ../Levels/levelManager */ \"./src/Levels/levelManager.ts\");\nconst menu_1 = __webpack_require__(/*! ../Menu/menu */ \"./src/Menu/menu.ts\");\nconst rectangle_1 = __webpack_require__(/*! ../DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\nclass GameScene {\n    constructor(game, sceneManager, renderEngine) {\n        // TODO: Abstract into a manager\n        this.collisionCheckElapsed = 0;\n        this.game = game;\n        this.sceneManager = sceneManager;\n        this.renderEngine = renderEngine;\n    }\n    init() {\n        this.backgroundImage = this.game.assetManager.getImage('background');\n        this.tileImage = this.game.assetManager.getImage('tiles');\n        this.levelManager = new levelManager_1.LevelManager(this.game.assetManager.levelInfo);\n        this.menu = new menu_1.Menu(this);\n        this.tileMap = new tileMap_1.TileMap(this, this.game.screenBounds, this.tileImage);\n        this.enemySpawner = new enemySpawner_1.EnemySpawner(this);\n        this.towerManager = new towerManager_1.TowerManager(this);\n        this.projectileEngine = new projectileEngine_1.ProjectileEngine(this);\n        // TODO: Remove, towers to be added with user input      \n        this.towerManager.createTower(this.tileMap.tileMatrix[3][3]);\n        this.towerManager.createTower(this.tileMap.tileMatrix[5][5]);\n        this.towerManager.createTower(this.tileMap.tileMatrix[8][7]);\n    }\n    update(delta) {\n        this.checkProjectileEnemyCollision(delta);\n        this.towerManager.update(delta);\n        this.enemySpawner.update(delta);\n        this.projectileEngine.update(delta);\n    }\n    // TODO: Abstract into a manager\n    checkProjectileEnemyCollision(delta) {\n        // TODO: Reduce the rate at which collision check is done\n        //       This saves browser performance but is less accurate, \n        //       missing some collisions.\n        this.collisionCheckElapsed += delta;\n        if (this.collisionCheckElapsed <= 0.001) {\n            return;\n        }\n        this.collisionCheckElapsed = 0;\n        this.enemySpawner.enemies.forEach((enemy) => {\n            this.projectileEngine.projectiles.forEach((projectile) => {\n                if (projectile.active && enemy.active && enemy.bounds.containsRect(projectile.bounds)) {\n                    enemy.hit();\n                    projectile.active = false;\n                }\n            });\n        });\n    }\n    render() {\n        this.renderEngine.clearRect(this.game.screenBounds);\n        this.renderEngine.renderImage(this.backgroundImage, 0, 0, 480, 480);\n        this.tileMap.draw();\n        // TODO:\n        // Create abstraction into animated text rendering.\n        this.renderEngine.renderText(this.levelManager.currentLevel.levelName, 64, 32, 'red', 32, 'impact');\n        this.enemySpawner.draw();\n        this.towerManager.draw();\n        this.projectileEngine.draw();\n        this.menu.draw();\n    }\n    isOverMouseMenu() {\n        let menuBounds = this.getElementBounds(\"tower_menu\");\n        return menuBounds.containsRect(new rectangle_1.Rectangle(this.mouseInfo.x, this.mouseInfo.y, 1, 1));\n    }\n    getElementBounds(elementId) {\n        let element = document.getElementById(elementId);\n        return new rectangle_1.Rectangle(element.clientLeft, element.clientTop, element.clientWidth, element.clientHeight);\n    }\n    mouseDown() {\n    }\n    mouseUp() {\n        if (this.isOverMouseMenu()) {\n            return;\n        }\n        let x = Math.floor(this.mouseInfo.x / this.tileMap.tileWidth);\n        let y = Math.floor((this.mouseInfo.y - this.tileMap.tileHeight) / this.tileMap.tileHeight);\n        let destinationTile = this.tileMap.tileMatrix[y][x];\n        this.menu.clearStagedTower();\n        this.towerManager.createTower(destinationTile);\n        console.log(`tileX:${x} tileY:${y} destTile:${destinationTile.bounds} mouseX:${this.mouseInfo.x} mouseY:${this.mouseInfo.y}`);\n    }\n    mouseMove(x, y) {\n    }\n    resize() {\n    }\n}\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack:///./src/Scenes/gameScene.ts?");

/***/ }),

/***/ "./src/Scenes/loadScene.ts":
/*!*********************************!*\
  !*** ./src/Scenes/loadScene.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst rectangle_1 = __webpack_require__(/*! ../DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\nconst scenes_enum_1 = __webpack_require__(/*! ./scenes.enum */ \"./src/Scenes/scenes.enum.ts\");\nclass LoadScene {\n    constructor(game, sceneManager, renderEngine) {\n        this.game = game;\n        this.sceneManager = sceneManager;\n        this.renderEngine = renderEngine;\n    }\n    init() {\n    }\n    update(delta) {\n        this.game.assetManager.update();\n        if (this.game.assetManager.loadCompleted) {\n            // TODO: \n            // Implement an global enum for scenes.\n            // Make game and load scene private in Game class.\n            this.sceneManager.toggleActiveScene(scenes_enum_1.Scenes.game);\n        }\n    }\n    render() {\n        this.renderEngine.renderRect(new rectangle_1.Rectangle(0, 0, 800, 480), 'black', true);\n    }\n    mouseDown() {\n    }\n    mouseUp() {\n    }\n    mouseMove(x, y) {\n    }\n    resize() {\n    }\n}\nexports.LoadScene = LoadScene;\n\n\n//# sourceURL=webpack:///./src/Scenes/loadScene.ts?");

/***/ }),

/***/ "./src/Scenes/sceneManager.ts":
/*!************************************!*\
  !*** ./src/Scenes/sceneManager.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst loadScene_1 = __webpack_require__(/*! ../Scenes/loadScene */ \"./src/Scenes/loadScene.ts\");\nconst gameScene_1 = __webpack_require__(/*! ../Scenes/gameScene */ \"./src/Scenes/gameScene.ts\");\nconst scenes_enum_1 = __webpack_require__(/*! ./scenes.enum */ \"./src/Scenes/scenes.enum.ts\");\nclass SceneManager {\n    constructor(game, renderEngine) {\n        this.game = game;\n        this.renderEngine = renderEngine;\n        // TODO:\n        // Inject depependencies, no initialization\n        this.loadScene = new loadScene_1.LoadScene(this.game, this, this.renderEngine);\n        this.gameScene = new gameScene_1.GameScene(this.game, this, this.renderEngine);\n    }\n    toggleActiveScene(newScene) {\n        switch (+newScene) {\n            case scenes_enum_1.Scenes.loading:\n                this.game.currentScene = this.loadScene;\n                break;\n            case scenes_enum_1.Scenes.game:\n                this.game.currentScene = this.gameScene;\n                break;\n        }\n        this.game.currentScene.init();\n    }\n}\nexports.SceneManager = SceneManager;\n\n\n//# sourceURL=webpack:///./src/Scenes/sceneManager.ts?");

/***/ }),

/***/ "./src/Scenes/scenes.enum.ts":
/*!***********************************!*\
  !*** ./src/Scenes/scenes.enum.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Scenes;\n(function (Scenes) {\n    Scenes[Scenes[\"loading\"] = 0] = \"loading\";\n    Scenes[Scenes[\"game\"] = 1] = \"game\";\n})(Scenes = exports.Scenes || (exports.Scenes = {}));\n\n\n//# sourceURL=webpack:///./src/Scenes/scenes.enum.ts?");

/***/ }),

/***/ "./src/Tiles/tile.ts":
/*!***************************!*\
  !*** ./src/Tiles/tile.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Tile {\n    constructor(gameScene, bounds, imageObject) {\n        this.fontSize = 12;\n        this.gameScene = gameScene;\n        this.bounds = bounds;\n        this.imageObject = imageObject;\n    }\n    draw(col, row) {\n        this.gameScene.renderEngine.renderImageSource(this.imageObject.image, this.imageObject.sourceRectangle, this.imageObject.destinationRectangle);\n        // this.gameScene.renderEngine.renderText(\n        //     col + '_' + row, \n        //     this.bounds.left,\n        //     this.bounds.top + this.fontSize,\n        //     'black',\n        //     this.fontSize,\n        //     'Calibri');\n    }\n}\nexports.Tile = Tile;\n\n\n//# sourceURL=webpack:///./src/Tiles/tile.ts?");

/***/ }),

/***/ "./src/Tiles/tileMap.ts":
/*!******************************!*\
  !*** ./src/Tiles/tileMap.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst rectangle_1 = __webpack_require__(/*! ../DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\nconst imageObject_1 = __webpack_require__(/*! ../DataObjects/imageObject */ \"./src/DataObjects/imageObject.ts\");\nconst tile_1 = __webpack_require__(/*! ./tile */ \"./src/Tiles/tile.ts\");\nclass TileMap {\n    constructor(gameScene, bounds, tileImage) {\n        this.wayPoints = [];\n        this.rows = 10;\n        this.cols = 10;\n        this.tileWidth = 48;\n        this.tileHeight = 48;\n        this.gameScene = gameScene;\n        this.bounds = bounds;\n        this.tileImage = tileImage;\n        this.initTileMatrix();\n    }\n    initTileMatrix() {\n        // TODO:\n        // Read matrix data from configurable file\n        var matrix = [\n            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n            [1, 1, 1, 0, 1, 1, 1, 0, 0, 0],\n            [0, 0, 1, 0, 1, 0, 1, 0, 0, 0],\n            [0, 0, 1, 1, 1, 0, 1, 0, 0, 0],\n            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],\n            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],\n            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],\n            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],\n            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],\n        ];\n        this.wayPoints = [\n            { x: 0, y: 0 },\n            { x: 0, y: 1 },\n            { x: 0, y: 2 },\n            { x: 1, y: 2 },\n            { x: 2, y: 2 },\n            { x: 2, y: 3 },\n            { x: 2, y: 4 },\n            { x: 3, y: 4 },\n            { x: 4, y: 4 },\n            { x: 4, y: 3 },\n            { x: 4, y: 2 },\n            { x: 5, y: 2 },\n            { x: 6, y: 2 },\n            { x: 6, y: 3 },\n            { x: 6, y: 4 },\n            { x: 6, y: 5 },\n            { x: 6, y: 6 },\n            { x: 5, y: 6 },\n            { x: 4, y: 6 },\n            { x: 4, y: 7 },\n            { x: 4, y: 8 },\n            { x: 5, y: 8 },\n            { x: 5, y: 9 },\n            { x: 6, y: 9 },\n            { x: 7, y: 9 },\n            { x: 8, y: 9 },\n            { x: 9, y: 9 },\n        ];\n        this.tileMatrix = [];\n        for (var row = 0; row < this.rows; row++) {\n            this.tileMatrix[row] = [];\n            for (var col = 0; col < this.cols; col++) {\n                var matrixValue = matrix[row][col];\n                var tileImageObject = this.getTileImageObject(matrixValue, this.tileWidth * col, this.tileHeight * row);\n                // TODO:\n                // Tile should provide underlying imageObject with coordinates and size values.                \n                // Abstract source rectangle values into \"tilesSpriteSheet\" configuration.\n                var tileBounds = new rectangle_1.Rectangle(this.tileWidth * col, this.tileHeight * row, this.tileWidth, this.tileHeight);\n                //console.log('col:' + col + ' row:' + row)\n                this.tileMatrix[row][col] = new tile_1.Tile(this.gameScene, tileBounds, tileImageObject);\n            }\n        }\n    }\n    getTileImageObject(matrixValue, destinationX, destinationY) {\n        var tileImageObject = new imageObject_1.ImageObject();\n        tileImageObject.image = this.tileImage;\n        tileImageObject.x = destinationX;\n        tileImageObject.y = destinationY;\n        tileImageObject.width = this.tileWidth;\n        tileImageObject.height = this.tileHeight;\n        tileImageObject.swidth = 32;\n        tileImageObject.sheight = 32;\n        if (matrixValue == 0) {\n            tileImageObject.sx = 0;\n            tileImageObject.sy = 0;\n        }\n        else {\n            tileImageObject.sx = 32;\n            tileImageObject.sy = 0;\n        }\n        return tileImageObject;\n    }\n    draw() {\n        for (var row = 0; row < this.rows; row++) {\n            for (var col = 0; col < this.cols; col++) {\n                this.tileMatrix[row][col].draw(col, row);\n            }\n        }\n    }\n}\nexports.TileMap = TileMap;\n\n\n//# sourceURL=webpack:///./src/Tiles/tileMap.ts?");

/***/ }),

/***/ "./src/Towers/baseTower.ts":
/*!*********************************!*\
  !*** ./src/Towers/baseTower.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst vector2_1 = __webpack_require__(/*! ../DataObjects/vector2 */ \"./src/DataObjects/vector2.ts\");\nconst rectangle_1 = __webpack_require__(/*! ../DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\nclass BaseTower {\n    constructor(gameScene, destinationTile, towerImage) {\n        this.shootRange = 20000;\n        this.gameScene = gameScene;\n        this.destinationTile = destinationTile;\n        this.towerImage = towerImage;\n        this.center = new vector2_1.Vector2(0, 0);\n    }\n    update(delta) {\n        this.center.x = this.destinationTile.bounds.getCenterWidth;\n        this.center.y = this.destinationTile.bounds.getCenterHeight;\n        this.destinationTile.bounds.update();\n        this.updateTarget();\n        this.updateTargetInRange();\n        this.updateRotation();\n        //console.log('targetInRange: ' + this.targetInRange);\n    }\n    draw() {\n        this.drawRange();\n        // TODO:\n        // Implement animation class and call draw\n        // Animation class to handle source rect updates.\n        var sourceRectangle = new rectangle_1.Rectangle(0, 0, 32, 32);\n        this.gameScene.renderEngine.renderRotatedImageSource(this.towerImage, sourceRectangle, this.destinationTile.bounds, this.rotation);\n        this.drawSelection();\n    }\n    setSelection(selected) {\n        this.selected = selected;\n    }\n    drawRange() {\n        // this.gameScene.renderEngine.renderEllipse(this.center.x, this.center.y, \"red\", 0.8, this.shootRange, true);\n        this.gameScene.renderEngine.renderEllipse(this.center.x, this.center.y, \"red\", 0.5, this.shootRange, false);\n    }\n    drawSelection() {\n        // TODO:\n        // Draw any overlay selection effects \n    }\n    updateTargetInRange() {\n        if (this.target != null && this.target.active) {\n            this.targetDirection = this.center.subtract(this.target.center);\n            //console.log('target direction  y: ' + this.targetDirection.x + ' y: ' + this.targetDirection.y);\n            let distance = this.targetDirection.magnitude();\n            if (distance <= this.shootRange) {\n                //console.log('ranged');            \n                this.targetInRange = true;\n                return;\n            }\n        }\n        this.targetInRange = false;\n    }\n    updateRotation() {\n        // Rotate the tower towards it's current target or\n        // rotate to default position if no target exist or if target not in range.\n        if (this.targetInRange) {\n            var xDistance = this.target.center.x - this.center.x;\n            var yDistance = this.target.center.y - this.center.y;\n            this.rotation = (Math.atan2(yDistance, xDistance) * (180 / Math.PI)) - 270;\n        }\n        // else {\n        //     if (this.rotation > 0) {\n        //         this.rotation = this.rotation - 0.01;\n        //     } else {\n        //         this.rotation = -90;\n        //     }\n        // }        \n        // this.rotation = this.rotation - 270;\n    }\n    updateTarget() {\n        var distance = 0;\n        var closestDistance = 99999;\n        var closestEnemy;\n        for (var e = 0; e < this.gameScene.enemySpawner.enemies.length; e++) {\n            var enemy = this.gameScene.enemySpawner.enemies[e];\n            distance = enemy.center.distance(this.center);\n            if (closestEnemy == null) {\n                closestDistance = distance;\n                closestEnemy = enemy;\n                continue;\n            }\n            if (distance < closestDistance) {\n                closestDistance = distance;\n                closestEnemy = enemy;\n            }\n        }\n        ;\n        this.target = closestEnemy;\n    }\n}\nexports.BaseTower = BaseTower;\n\n\n//# sourceURL=webpack:///./src/Towers/baseTower.ts?");

/***/ }),

/***/ "./src/Towers/plainTower.ts":
/*!**********************************!*\
  !*** ./src/Towers/plainTower.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst baseTower_1 = __webpack_require__(/*! ./baseTower */ \"./src/Towers/baseTower.ts\");\nclass PlainTower extends baseTower_1.BaseTower {\n    constructor(gameScene, destinationTile, towerImage) {\n        super(gameScene, destinationTile, towerImage);\n        this.plainTowerShootSpeed = 250;\n        this.plainTowerShootRate = 0.7;\n        this.shootElapsed = 0;\n        this.gameScene = gameScene;\n        super.shootRange = 128;\n    }\n    update(delta) {\n        super.update(delta);\n        this.updateShoot(delta);\n    }\n    updateShoot(delta) {\n        this.shootElapsed += delta;\n        if (this.targetInRange && this.shootElapsed >= this.plainTowerShootRate) {\n            this.shootElapsed = 0;\n            //console.log('shoot');\n            var direction = this.target.center.subtract(this.center);\n            var normalizedDirection = direction.normalize();\n            this.gameScene.projectileEngine.activateProjectile(this.center, normalizedDirection, this.plainTowerShootSpeed);\n        }\n    }\n    draw() {\n        super.draw();\n    }\n}\nexports.PlainTower = PlainTower;\n\n\n//# sourceURL=webpack:///./src/Towers/plainTower.ts?");

/***/ }),

/***/ "./src/Towers/towerManager.ts":
/*!************************************!*\
  !*** ./src/Towers/towerManager.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst plainTower_1 = __webpack_require__(/*! ./plainTower */ \"./src/Towers/plainTower.ts\");\nclass TowerManager {\n    constructor(gameScene) {\n        this.towers = [];\n        this.gameScene = gameScene;\n        this.towerImage = this.gameScene.game.assetManager.getImage('towerplain');\n    }\n    update(delta) {\n        this.towers.forEach(tower => {\n            tower.update(delta);\n        });\n    }\n    draw() {\n        this.towers.forEach(tower => {\n            tower.draw();\n        });\n    }\n    createTower(destinationTile) {\n        this.towers.push(new plainTower_1.PlainTower(this.gameScene, destinationTile, this.towerImage));\n    }\n}\nexports.TowerManager = TowerManager;\n\n\n//# sourceURL=webpack:///./src/Towers/towerManager.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst gameTime_1 = __webpack_require__(/*! ./DataObjects/gameTime */ \"./src/DataObjects/gameTime.ts\");\nconst rectangle_1 = __webpack_require__(/*! ./DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\nconst renderEngine_1 = __webpack_require__(/*! ./renderEngine */ \"./src/renderEngine.ts\");\nconst assetManager_1 = __webpack_require__(/*! ./AssetLoading/assetManager */ \"./src/AssetLoading/assetManager.ts\");\nconst sceneManager_1 = __webpack_require__(/*! ./Scenes/sceneManager */ \"./src/Scenes/sceneManager.ts\");\nconst scenes_enum_1 = __webpack_require__(/*! ./Scenes/scenes.enum */ \"./src/Scenes/scenes.enum.ts\");\nclass Game {\n    constructor() {\n        this.screenBounds = new rectangle_1.Rectangle(0, 0, 800, 480);\n        this.gameTime = new gameTime_1.GameTime();\n        this.renderEngine = new renderEngine_1.RenderEngine();\n        this.assetManager = new assetManager_1.AssetManager();\n        this.assetManager.init();\n        this.initSceneManager();\n        window.addEventListener('mousemove', (e) => { this.mouseMove(e); });\n        window.addEventListener('mousedown', () => { this.mouseDown(); });\n        window.addEventListener('mouseup', () => { this.mouseUp(); });\n    }\n    start() {\n        if (this.running) {\n            return;\n        }\n        this.running = true;\n        this.loop();\n    }\n    initSceneManager() {\n        this.sceneManager = new sceneManager_1.SceneManager(this, this.renderEngine);\n        this.sceneManager.toggleActiveScene(scenes_enum_1.Scenes.loading);\n    }\n    loop() {\n        this.gameTime.update();\n        if (this.currentScene) {\n            this.currentScene.update(this.gameTime.delta);\n            this.currentScene.render();\n        }\n        requestAnimationFrame(() => this.loop());\n        //setInterval(this.loop.bind(this), 1);\n    }\n    mouseMove(event) {\n        this.currentScene.mouseInfo = { x: event.x, y: event.y };\n        this.currentScene.mouseMove(event.x, event.y);\n    }\n    mouseDown() {\n        //console.log('mousedown');\n        this.currentScene.mouseDown();\n    }\n    mouseUp() {\n        //console.log('mouseup');\n        this.currentScene.mouseUp();\n    }\n}\nexports.Game = Game;\nwindow.addEventListener('load', () => {\n    const game = new Game();\n    game.start();\n});\n\n\n//# sourceURL=webpack:///./src/game.ts?");

/***/ }),

/***/ "./src/renderEngine.ts":
/*!*****************************!*\
  !*** ./src/renderEngine.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst rectangle_1 = __webpack_require__(/*! ./DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\nclass RenderEngine {\n    constructor() {\n        const gameCanvas = document.getElementById('game-canvas');\n        this.context = gameCanvas.getContext('2d');\n    }\n    clearRect(rect) {\n        if (rect) {\n            this.context.clearRect(rect.left, rect.top, rect.width, rect.height);\n        }\n    }\n    renderRect(rect, color, fill) {\n        var originalFillStyle = this.context.fillStyle;\n        var originalStrokeStyle = this.context.strokeStyle;\n        if (fill) {\n            this.context.fillStyle = color;\n            this.context.fillRect(rect.left, rect.top, rect.width, rect.height);\n        }\n        else {\n            this.context.beginPath();\n            this.context.strokeStyle = color;\n            this.context.strokeRect(rect.left, rect.top, rect.width, rect.height);\n        }\n        this.context.fillStyle = originalFillStyle;\n        this.context.strokeStyle = originalStrokeStyle;\n    }\n    renderText(text, x, y, color, fontSize, fontFamily) {\n        this.context.fillStyle = color;\n        this.context.font = fontSize + 'px ' + fontFamily;\n        this.context.fillText(text, x, y);\n    }\n    renderImageRect(image, bounds) {\n        this.renderImage(image, bounds.left, bounds.top, bounds.width, bounds.height);\n    }\n    renderImage(image, x, y, width = null, height = null) {\n        var w = width == null ? image.width : width;\n        var h = height == null ? image.height : height;\n        this.context.drawImage(image, x, y, w, h);\n    }\n    renderImageSource(image, sourceRect, destRect) {\n        if (sourceRect.left < 0 || sourceRect.top < 0 || sourceRect.height <= 0 || sourceRect.height <= 0) {\n            return;\n        }\n        this.context.drawImage(image, sourceRect.left, sourceRect.top, sourceRect.width, sourceRect.height, destRect.left, destRect.top, destRect.width, destRect.height);\n    }\n    renderRotatedImageSource(image, sourceRect, destRect, rotation = 0) {\n        this.context.save();\n        this.context.translate(destRect.getCenterWidth, destRect.getCenterHeight);\n        this.context.rotate((rotation - 90) * (Math.PI / 180));\n        var rotatedDestRect = new rectangle_1.Rectangle(-((destRect.width) / 2), -((destRect.height) / 2), destRect.width, destRect.height);\n        this.renderImageSource(image, sourceRect, rotatedDestRect);\n        this.context.restore();\n    }\n    renderEllipse(centerX, centerY, color, opacity, radius, fill) {\n        this.context.save();\n        this.context.globalAlpha = opacity;\n        this.context.strokeStyle = color;\n        this.context.beginPath();\n        this.context.ellipse(centerX, centerY, radius, radius, Math.PI / 4, 0, 2 * Math.PI);\n        if (fill) {\n            this.context.fill();\n        }\n        else {\n            this.context.stroke();\n        }\n        this.context.restore();\n    }\n}\nexports.RenderEngine = RenderEngine;\n\n\n//# sourceURL=webpack:///./src/renderEngine.ts?");

/***/ })

/******/ });