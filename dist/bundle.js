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

/***/ "./src/DataObjects/imageObject.ts":
/*!****************************************!*\
  !*** ./src/DataObjects/imageObject.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst rectangle_1 = __webpack_require__(/*! ./rectangle */ \"./src/DataObjects/rectangle.ts\");\r\nclass ImageObject {\r\n    constructor() {\r\n        this._sourceRectangle = null;\r\n        this._destinationRectangle = null;\r\n    }\r\n    get sourceRectangle() {\r\n        if (this._sourceRectangle == null) {\r\n            this._sourceRectangle = new rectangle_1.Rectangle(this.sx, this.sy, this.swidth, this.sheight);\r\n        }\r\n        return this._sourceRectangle;\r\n    }\r\n    get destinationRectangle() {\r\n        if (this._destinationRectangle == null) {\r\n            this._destinationRectangle = new rectangle_1.Rectangle(this.x, this.y, this.width, this.height);\r\n        }\r\n        return this._destinationRectangle;\r\n    }\r\n}\r\nexports.ImageObject = ImageObject;\r\n\n\n//# sourceURL=webpack:///./src/DataObjects/imageObject.ts?");

/***/ }),

/***/ "./src/DataObjects/rectangle.ts":
/*!**************************************!*\
  !*** ./src/DataObjects/rectangle.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Rectangle {\r\n    constructor(left, top, width, height) {\r\n        this.left = left;\r\n        this.top = top;\r\n        this.width = width;\r\n        this.height = height;\r\n        this.update();\r\n    }\r\n    updateRight() {\r\n        this.right = this.left + this.width;\r\n    }\r\n    updateBottom() {\r\n        this.bottom = this.top + this.height;\r\n    }\r\n    update() {\r\n        this.updateRight();\r\n        this.updateBottom();\r\n    }\r\n    intersectRect(rectangle) {\r\n        return !(rectangle.left > this.right ||\r\n            rectangle.right < this.left ||\r\n            rectangle.top > this.bottom ||\r\n            rectangle.bottom < this.top);\r\n    }\r\n    containsRect(rectangle) {\r\n        return (this.left <= rectangle.left &&\r\n            rectangle.right <= this.right &&\r\n            this.top <= rectangle.top &&\r\n            rectangle.bottom <= this.bottom);\r\n    }\r\n    get getCenterWidth() {\r\n        this.updateRight();\r\n        return this.right - this.width / 2;\r\n    }\r\n    get getCenterHeight() {\r\n        this.updateRight();\r\n        return this.bottom - this.height / 2;\r\n    }\r\n    clone() {\r\n        return new Rectangle(this.left, this.top, this.width, this.height);\r\n    }\r\n    equals(rect) {\r\n        return (this.left == rect.left &&\r\n            this.top == rect.top &&\r\n            this.width == rect.width &&\r\n            this.height == rect.height);\r\n    }\r\n}\r\nexports.Rectangle = Rectangle;\r\n\n\n//# sourceURL=webpack:///./src/DataObjects/rectangle.ts?");

/***/ }),

/***/ "./src/DataObjects/vector2.ts":
/*!************************************!*\
  !*** ./src/DataObjects/vector2.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Vector2 {\r\n    constructor(x = 0, y = 0) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    subtract(vector2) {\r\n        return new Vector2(this.x - vector2.x, this.y - vector2.y);\r\n    }\r\n    distance(vector2) {\r\n        var x = (this.x - vector2.x) * (this.x - vector2.x);\r\n        var y = (this.y - vector2.y) * (this.y - vector2.y);\r\n        return Math.sqrt(x + y);\r\n    }\r\n    magnitude() {\r\n        return Math.sqrt(this.x * this.x + this.y * this.y);\r\n    }\r\n    normalize() {\r\n        let distance = Math.sqrt(this.x * this.x + this.y * this.y);\r\n        var normalX = this.x / distance;\r\n        var normalY = this.y / distance;\r\n        return new Vector2(isNaN(normalX) ? 0 : normalX, isNaN(normalY) ? 0 : normalY);\r\n    }\r\n}\r\nexports.Vector2 = Vector2;\r\n\n\n//# sourceURL=webpack:///./src/DataObjects/vector2.ts?");

/***/ }),

/***/ "./src/Enemies/enemy.ts":
/*!******************************!*\
  !*** ./src/Enemies/enemy.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vector2_1 = __webpack_require__(/*! ../DataObjects/vector2 */ \"./src/DataObjects/vector2.ts\");\r\nconst rectangle_1 = __webpack_require__(/*! ../DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\r\nclass Enemy {\r\n    constructor(gameScene, enemyImage, movementWayPoints) {\r\n        this.wayPointReachedThreshold = 0.5;\r\n        this.moveSpeed = 100;\r\n        this.gameScene = gameScene;\r\n        this.enemyImage = enemyImage;\r\n        this.originalWayPoints = movementWayPoints;\r\n        this.reset();\r\n    }\r\n    update(delta) {\r\n        if (!this.active) {\r\n            return;\r\n        }\r\n        var onLastWaypoint = false;\r\n        if (this.movementWayPoints.length <= 0) {\r\n            onLastWaypoint = true;\r\n        }\r\n        if (!this.nextMovePoint) {\r\n            var firstWayPoint = this.movementWayPoints.shift();\r\n            var waypointBounds = this.gameScene.tileMap.tileMatrix[firstWayPoint.y][firstWayPoint.x].bounds;\r\n            this.nextMovePoint = new vector2_1.Vector2(waypointBounds.getCenterWidth, waypointBounds.getCenterHeight);\r\n        }\r\n        this.updateBounds();\r\n        this.direction = this.nextMovePoint.subtract(this.center);\r\n        this.distanceFromNextWaypoint = this.direction.magnitude();\r\n        if (this.nextWaypointReached()) {\r\n            if (onLastWaypoint) {\r\n                this.nextMovePoint = null;\r\n                this.active = false;\r\n                return;\r\n            }\r\n            else {\r\n                var nextWayPoint = this.movementWayPoints.shift();\r\n                var waypointBounds = this.gameScene.tileMap.tileMatrix[nextWayPoint.y][nextWayPoint.x].bounds;\r\n                this.nextMovePoint.x = waypointBounds.getCenterWidth;\r\n                this.nextMovePoint.y = waypointBounds.getCenterHeight;\r\n                this.direction = this.center.subtract(this.nextMovePoint);\r\n            }\r\n        }\r\n        this.normalizedDirection = this.direction.normalize();\r\n        if (!isNaN(this.normalizedDirection.x) && !isNaN(this.normalizedDirection.y)) {\r\n            this.velocity.x = this.normalizedDirection.x * (this.moveSpeed * delta);\r\n            this.velocity.y = this.normalizedDirection.y * (this.moveSpeed * delta);\r\n            this.setMoveDirection();\r\n        }\r\n        this.applyVelocity();\r\n    }\r\n    draw() {\r\n        if (!this.active) {\r\n            return;\r\n        }\r\n        // TODO:\r\n        // Implement animation class and call draw\r\n        // Animation class to handle source rect updates.\r\n        var sourceRectangle = new rectangle_1.Rectangle(0, 0, 68, 80);\r\n        this.gameScene.renderEngine.renderImageSource(this.enemyImage, sourceRectangle, this.bounds);\r\n    }\r\n    reset() {\r\n        this.active = false;\r\n        this.movementWayPoints = this.originalWayPoints.slice();\r\n        this.movements = { left: false, right: false, up: false, down: false };\r\n        this.position = new vector2_1.Vector2(0, 0);\r\n        this.size = new vector2_1.Vector2(48, 48);\r\n        this.center = new vector2_1.Vector2(0, 0);\r\n        this.velocity = new vector2_1.Vector2(0, 0);\r\n        this.bounds = new rectangle_1.Rectangle(0, 0, 0, 0);\r\n    }\r\n    nextWaypointReached() {\r\n        return this.distanceFromNextWaypoint < this.wayPointReachedThreshold;\r\n    }\r\n    updateBounds() {\r\n        this.bounds.left = this.position.x;\r\n        this.bounds.top = this.position.y;\r\n        this.bounds.width = this.size.x;\r\n        this.bounds.height = this.size.y;\r\n        this.bounds.update();\r\n        this.center.x = this.bounds.getCenterWidth;\r\n        this.center.y = this.bounds.getCenterHeight;\r\n    }\r\n    setMoveDirection() {\r\n        this.movements.left = this.velocity.x < 0;\r\n        this.movements.right = this.velocity.x > 0;\r\n        this.movements.up = this.velocity.y < 0;\r\n        this.movements.down = this.velocity.y > 0;\r\n        if ((this.movements.left || this.movements.right) &&\r\n            (this.movements.up || this.movements.down)) {\r\n            // We detect if both horizontal and vertical movement is set.\r\n            // As we can only play one animation per axis movement we should determine\r\n            // what axis has the greater velocity value and use that as the direction.\r\n            let horizontalValue = this.velocity.x < 0 ? this.velocity.x * -1 : this.velocity.x;\r\n            let verticalValue = this.velocity.y < 0 ? this.velocity.y * -1 : this.velocity.y;\r\n            if (horizontalValue > verticalValue) {\r\n                this.movements.left = this.velocity.x < 0;\r\n                this.movements.right = this.velocity.x > 0;\r\n                this.movements.up = false;\r\n                this.movements.down = false;\r\n            }\r\n            else {\r\n                this.movements.up = this.velocity.y < 0;\r\n                this.movements.down = this.velocity.y > 0;\r\n                this.movements.left = false;\r\n                this.movements.right = false;\r\n            }\r\n        }\r\n    }\r\n    applyVelocity() {\r\n        this.position.x += this.velocity.x;\r\n        this.position.y += this.velocity.y;\r\n    }\r\n}\r\nexports.Enemy = Enemy;\r\n\n\n//# sourceURL=webpack:///./src/Enemies/enemy.ts?");

/***/ }),

/***/ "./src/Enemies/enemySpawner.ts":
/*!*************************************!*\
  !*** ./src/Enemies/enemySpawner.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst enemy_1 = __webpack_require__(/*! ./enemy */ \"./src/Enemies/enemy.ts\");\r\nclass EnemySpawner {\r\n    constructor(gameScene) {\r\n        this.enemies = [];\r\n        this.gameScene = gameScene;\r\n        this.enemyImage = this.gameScene.game.assetManager.getImage('squid');\r\n    }\r\n    update(delta) {\r\n        this.enemies.forEach(enemy => {\r\n            enemy.update(delta);\r\n            if (!enemy.active) {\r\n                enemy.reset();\r\n                enemy.active = true;\r\n            }\r\n        });\r\n    }\r\n    draw() {\r\n        this.enemies.forEach(enemy => {\r\n            enemy.draw();\r\n        });\r\n    }\r\n    createEnemy() {\r\n        var enemy = new enemy_1.Enemy(this.gameScene, this.enemyImage, this.gameScene.tileMap.wayPoints);\r\n        enemy.active = true;\r\n        this.enemies.push(enemy);\r\n    }\r\n}\r\nexports.EnemySpawner = EnemySpawner;\r\n\n\n//# sourceURL=webpack:///./src/Enemies/enemySpawner.ts?");

/***/ }),

/***/ "./src/Projectiles/projectile.ts":
/*!***************************************!*\
  !*** ./src/Projectiles/projectile.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vector2_1 = __webpack_require__(/*! ../DataObjects/vector2 */ \"./src/DataObjects/vector2.ts\");\r\nconst rectangle_1 = __webpack_require__(/*! ../DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\r\nclass Projectile {\r\n    constructor(gameScene) {\r\n        this.moveSpeed = 20;\r\n        this.gameScene = gameScene;\r\n        this.worldBounds = this.gameScene.game.screenBounds;\r\n        this.bounds = new rectangle_1.Rectangle(0, 0, 25, 25);\r\n        this.velocity = new vector2_1.Vector2(0, 0);\r\n    }\r\n    update(delta) {\r\n        this.updateInWorldBounds();\r\n        this.updateAlive();\r\n        // TODO:        \r\n        // Apply velocity in target direction\r\n        this.velocity.x = this.moveSpeed * delta;\r\n        this.velocity.y = this.moveSpeed * delta;\r\n    }\r\n    updateInWorldBounds() {\r\n        this.inWorldBounds = this.worldBounds.containsRect(this.bounds);\r\n    }\r\n    updateAlive() {\r\n        if (!this.active) {\r\n            return;\r\n        }\r\n        if (!this.inWorldBounds) {\r\n            this.active = false;\r\n        }\r\n    }\r\n    draw() {\r\n        if (!this.active) {\r\n            return;\r\n        }\r\n        this.gameScene.renderEngine.renderRect(this.bounds, 'white', true);\r\n    }\r\n    reset(startPosition, direction, moveSpeed) {\r\n        this.active = true;\r\n        this.startPosition = startPosition;\r\n        this.direction = direction;\r\n        this.moveSpeed = moveSpeed;\r\n        this.bounds.left = this.startPosition.x;\r\n        this.bounds.top = this.startPosition.y;\r\n    }\r\n}\r\nexports.Projectile = Projectile;\r\n\n\n//# sourceURL=webpack:///./src/Projectiles/projectile.ts?");

/***/ }),

/***/ "./src/Projectiles/projectileEngine.ts":
/*!*********************************************!*\
  !*** ./src/Projectiles/projectileEngine.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst projectile_1 = __webpack_require__(/*! ./projectile */ \"./src/Projectiles/projectile.ts\");\r\nclass ProjectileEngine {\r\n    constructor(gameScene) {\r\n        this.projectiles = [];\r\n        this.poolSize = 100;\r\n        this.gameScene = gameScene;\r\n        for (var i = 0; i < this.poolSize; i++) {\r\n            var projectile = new projectile_1.Projectile(this.gameScene);\r\n            this.projectiles.push(projectile);\r\n        }\r\n    }\r\n    update(delta) {\r\n        this.projectiles.forEach((projectile) => {\r\n            projectile.update(delta);\r\n        });\r\n    }\r\n    draw() {\r\n        this.projectiles.forEach((projectile) => {\r\n            projectile.draw();\r\n        });\r\n    }\r\n    activateProjectile(startPosition, direction, moveSpeed) {\r\n        this.projectiles.forEach((projectile) => {\r\n            if (!projectile.active) {\r\n                projectile.reset(startPosition, direction, moveSpeed);\r\n            }\r\n        });\r\n    }\r\n}\r\nexports.ProjectileEngine = ProjectileEngine;\r\n\n\n//# sourceURL=webpack:///./src/Projectiles/projectileEngine.ts?");

/***/ }),

/***/ "./src/Scenes/gameScene.ts":
/*!*********************************!*\
  !*** ./src/Scenes/gameScene.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tileMap_1 = __webpack_require__(/*! ../Tiles/tileMap */ \"./src/Tiles/tileMap.ts\");\r\nconst enemySpawner_1 = __webpack_require__(/*! ../Enemies/enemySpawner */ \"./src/Enemies/enemySpawner.ts\");\r\nconst towerManager_1 = __webpack_require__(/*! ../Towers/towerManager */ \"./src/Towers/towerManager.ts\");\r\nconst projectileEngine_1 = __webpack_require__(/*! ../Projectiles/projectileEngine */ \"./src/Projectiles/projectileEngine.ts\");\r\nclass GameScene {\r\n    constructor(game, sceneManager, renderEngine) {\r\n        this.game = game;\r\n        this.sceneManager = sceneManager;\r\n        this.renderEngine = renderEngine;\r\n    }\r\n    init() {\r\n        this.backgroundImage = this.game.assetManager.getImage('background');\r\n        this.tileImage = this.game.assetManager.getImage('tiles');\r\n        this.tileMap = new tileMap_1.TileMap(this, this.game.screenBounds, this.tileImage);\r\n        this.enemySpawner = new enemySpawner_1.EnemySpawner(this);\r\n        this.towerManager = new towerManager_1.TowerManager(this);\r\n        this.projectileEngine = new projectileEngine_1.ProjectileEngine(this);\r\n        // TODO: Remove, towers to be added with user input\r\n        this.towerManager.createTower(this.tileMap.tileMatrix[1][1]);\r\n        // TODO: Remove, enemies to spawned per round from enemy spawner\r\n        this.enemySpawner.createEnemy();\r\n    }\r\n    update(delta) {\r\n        this.enemySpawner.update(delta);\r\n        this.towerManager.update(delta);\r\n        this.projectileEngine.update(delta);\r\n    }\r\n    render() {\r\n        this.renderEngine.clearRect(this.game.screenBounds);\r\n        this.renderEngine.renderImage(this.backgroundImage, 0, 0, 800, 480);\r\n        this.tileMap.draw();\r\n        this.enemySpawner.draw();\r\n        this.towerManager.draw();\r\n        this.projectileEngine.draw();\r\n    }\r\n    mouseDown() {\r\n    }\r\n    mouseUp() {\r\n    }\r\n    mouseMove(x, y) {\r\n    }\r\n    resize() {\r\n    }\r\n}\r\nexports.GameScene = GameScene;\r\n\n\n//# sourceURL=webpack:///./src/Scenes/gameScene.ts?");

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

/***/ "./src/Tiles/tile.ts":
/*!***************************!*\
  !*** ./src/Tiles/tile.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Tile {\r\n    constructor(gameScene, bounds, imageObject) {\r\n        this.gameScene = gameScene;\r\n        this.bounds = bounds;\r\n        this.imageObject = imageObject;\r\n    }\r\n    draw() {\r\n        this.gameScene.renderEngine.renderImageSource(this.imageObject.image, this.imageObject.sourceRectangle, this.imageObject.destinationRectangle);\r\n    }\r\n}\r\nexports.Tile = Tile;\r\n\n\n//# sourceURL=webpack:///./src/Tiles/tile.ts?");

/***/ }),

/***/ "./src/Tiles/tileMap.ts":
/*!******************************!*\
  !*** ./src/Tiles/tileMap.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst rectangle_1 = __webpack_require__(/*! ../DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\r\nconst imageObject_1 = __webpack_require__(/*! ../DataObjects/imageObject */ \"./src/DataObjects/imageObject.ts\");\r\nconst tile_1 = __webpack_require__(/*! ./tile */ \"./src/Tiles/tile.ts\");\r\nclass TileMap {\r\n    constructor(gameScene, bounds, tileImage) {\r\n        this.wayPoints = [];\r\n        this.rows = 10;\r\n        this.cols = 10;\r\n        this.tileWidth = 48;\r\n        this.tileHeight = 48;\r\n        this.gameScene = gameScene;\r\n        this.bounds = bounds;\r\n        this.tileImage = tileImage;\r\n        this.initTileMatrix();\r\n    }\r\n    initTileMatrix() {\r\n        // TODO:\r\n        // Read matrix data from configurable file\r\n        var matrix = [\r\n            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n            [1, 1, 1, 0, 1, 1, 1, 0, 0, 0],\r\n            [0, 0, 1, 0, 1, 0, 1, 0, 0, 0],\r\n            [0, 0, 1, 1, 1, 0, 1, 0, 0, 0],\r\n            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],\r\n            [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],\r\n            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],\r\n            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],\r\n            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],\r\n        ];\r\n        this.wayPoints = [\r\n            { x: 0, y: 0 },\r\n            { x: 0, y: 1 },\r\n            { x: 0, y: 2 },\r\n            { x: 1, y: 2 },\r\n            { x: 2, y: 2 },\r\n            { x: 2, y: 3 },\r\n            { x: 2, y: 4 },\r\n            { x: 3, y: 4 },\r\n            { x: 4, y: 4 },\r\n            { x: 4, y: 3 },\r\n            { x: 4, y: 2 },\r\n            { x: 5, y: 2 },\r\n            { x: 6, y: 2 },\r\n            { x: 6, y: 3 },\r\n            { x: 6, y: 4 },\r\n            { x: 6, y: 5 },\r\n            { x: 6, y: 6 },\r\n            { x: 5, y: 6 },\r\n            { x: 4, y: 6 },\r\n            { x: 4, y: 7 },\r\n            { x: 4, y: 8 },\r\n            { x: 5, y: 8 },\r\n            { x: 5, y: 9 },\r\n            { x: 6, y: 9 },\r\n            { x: 7, y: 9 },\r\n            { x: 8, y: 9 },\r\n            { x: 9, y: 9 },\r\n        ];\r\n        this.tileMatrix = [];\r\n        for (var row = 0; row < this.rows; row++) {\r\n            this.tileMatrix[row] = [];\r\n            for (var col = 0; col < this.cols; col++) {\r\n                var matrixValue = matrix[row][col];\r\n                var tileImageObject = this.getTileImageObject(matrixValue, this.tileWidth * col, this.tileHeight * row);\r\n                // TODO:\r\n                // Tile should provide underlying imageObject with coordinates and size values.                \r\n                // Abstract source rectangle values into \"tilesSpriteSheet\" configuration.\r\n                var tileBounds = new rectangle_1.Rectangle(this.tileWidth * col, this.tileHeight * row, this.tileWidth, this.tileHeight);\r\n                this.tileMatrix[row][col] = new tile_1.Tile(this.gameScene, tileBounds, tileImageObject);\r\n            }\r\n        }\r\n    }\r\n    getTileImageObject(matrixValue, destinationX, destinationY) {\r\n        var tileImageObject = new imageObject_1.ImageObject();\r\n        tileImageObject.image = this.tileImage;\r\n        tileImageObject.x = destinationX;\r\n        tileImageObject.y = destinationY;\r\n        tileImageObject.width = this.tileWidth;\r\n        tileImageObject.height = this.tileHeight;\r\n        tileImageObject.swidth = 32;\r\n        tileImageObject.sheight = 32;\r\n        if (matrixValue == 0) {\r\n            tileImageObject.sx = 0;\r\n            tileImageObject.sy = 0;\r\n        }\r\n        else {\r\n            tileImageObject.sx = 32;\r\n            tileImageObject.sy = 0;\r\n        }\r\n        return tileImageObject;\r\n    }\r\n    draw() {\r\n        for (var row = 0; row < this.rows; row++) {\r\n            for (var col = 0; col < this.cols; col++) {\r\n                this.tileMatrix[row][col].draw();\r\n            }\r\n        }\r\n    }\r\n}\r\nexports.TileMap = TileMap;\r\n\n\n//# sourceURL=webpack:///./src/Tiles/tileMap.ts?");

/***/ }),

/***/ "./src/Towers/baseTower.ts":
/*!*********************************!*\
  !*** ./src/Towers/baseTower.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vector2_1 = __webpack_require__(/*! ../DataObjects/vector2 */ \"./src/DataObjects/vector2.ts\");\r\nconst rectangle_1 = __webpack_require__(/*! ../DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\r\nclass BaseTower {\r\n    constructor(gameScene, destinationTile, towerImage) {\r\n        this.shootRange = 128;\r\n        this.shootRate = 0.5;\r\n        this.shootElapsed = 0;\r\n        this.gameScene = gameScene;\r\n        this.destinationTile = destinationTile;\r\n        this.towerImage = towerImage;\r\n        this.center = new vector2_1.Vector2(0, 0);\r\n    }\r\n    update(delta) {\r\n        this.center.x = this.destinationTile.bounds.getCenterWidth;\r\n        this.center.y = this.destinationTile.bounds.getCenterHeight;\r\n        this.updateTarget();\r\n        this.updateTargetInRange();\r\n        this.updateRotation();\r\n        //console.log('targetInRange: ' + this.targetInRange);\r\n    }\r\n    draw() {\r\n        // TODO:\r\n        // Implement animation class and call draw\r\n        // Animation class to handle source rect updates.\r\n        var sourceRectangle = new rectangle_1.Rectangle(0, 0, 32, 32);\r\n        this.gameScene.renderEngine.renderRotatedImageSource(this.towerImage, sourceRectangle, this.destinationTile.bounds, this.rotation);\r\n    }\r\n    updateTargetInRange() {\r\n        if (this.target !== null && this.target.active) {\r\n            this.targetDirection = this.center.subtract(this.target.center);\r\n            //console.log('target direction  y: ' + this.targetDirection.x + ' y: ' + this.targetDirection.y);\r\n            let distance = this.targetDirection.magnitude();\r\n            if (distance <= this.shootRange) {\r\n                //console.log('ranged');\r\n                this.targetInRange = true;\r\n                return;\r\n            }\r\n        }\r\n        this.targetInRange = false;\r\n    }\r\n    updateRotation() {\r\n        // Rotate the tower towards it's current target or\r\n        // rotate to default position if no target exist or if target not in range.\r\n        if (this.targetInRange) {\r\n            var xDistance = this.target.center.x - this.center.x;\r\n            var yDistance = this.target.center.y - this.center.y;\r\n            this.rotation = (Math.atan2(yDistance, xDistance) * (180 / Math.PI)) - 270;\r\n        }\r\n        // else {\r\n        //     if (this.rotation > 0) {\r\n        //         this.rotation = this.rotation - 0.01;\r\n        //     } else {\r\n        //         this.rotation = -90;\r\n        //     }\r\n        // }        \r\n        // this.rotation = this.rotation - 270;\r\n    }\r\n    updateTarget() {\r\n        var distance = 0;\r\n        var closestDistance = 99999;\r\n        var closestEnemy;\r\n        for (var e = 0; e < this.gameScene.enemySpawner.enemies.length; e++) {\r\n            var enemy = this.gameScene.enemySpawner.enemies[e];\r\n            distance = enemy.center.distance(this.center);\r\n            if (closestEnemy) {\r\n                closestDistance = distance;\r\n                closestEnemy = enemy;\r\n                continue;\r\n            }\r\n            if (distance < closestDistance) {\r\n                closestDistance = distance;\r\n                closestEnemy = enemy;\r\n            }\r\n        }\r\n        ;\r\n        this.target = closestEnemy;\r\n    }\r\n}\r\nexports.BaseTower = BaseTower;\r\n\n\n//# sourceURL=webpack:///./src/Towers/baseTower.ts?");

/***/ }),

/***/ "./src/Towers/plainTower.ts":
/*!**********************************!*\
  !*** ./src/Towers/plainTower.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst baseTower_1 = __webpack_require__(/*! ./baseTower */ \"./src/Towers/baseTower.ts\");\r\nconst vector2_1 = __webpack_require__(/*! ../DataObjects/vector2 */ \"./src/DataObjects/vector2.ts\");\r\nclass PlainTower extends baseTower_1.BaseTower {\r\n    constructor(gameScene, destinationTile, towerImage) {\r\n        super(gameScene, destinationTile, towerImage);\r\n        this.plainTowerMoveSpeed = 20;\r\n        this.gameScene = gameScene;\r\n        super.shootRange = 1024;\r\n    }\r\n    update(delta) {\r\n        super.update(delta);\r\n        this.updateShoot(delta);\r\n    }\r\n    updateShoot(delta) {\r\n        this.shootElapsed += delta;\r\n        if (this.targetInRange && this.shootElapsed >= this.shootRate) {\r\n            this.shootElapsed = 0;\r\n            console.log('shoot');\r\n            this.gameScene.projectileEngine.activateProjectile(new vector2_1.Vector2(this.destinationTile.bounds.left, this.destinationTile.bounds.right), this.targetDirection, this.plainTowerMoveSpeed);\r\n        }\r\n    }\r\n    draw() {\r\n        super.draw();\r\n    }\r\n}\r\nexports.PlainTower = PlainTower;\r\n\n\n//# sourceURL=webpack:///./src/Towers/plainTower.ts?");

/***/ }),

/***/ "./src/Towers/towerManager.ts":
/*!************************************!*\
  !*** ./src/Towers/towerManager.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst plainTower_1 = __webpack_require__(/*! ./plainTower */ \"./src/Towers/plainTower.ts\");\r\nclass TowerManager {\r\n    constructor(gameScene) {\r\n        this.towers = [];\r\n        this.gameScene = gameScene;\r\n        this.towerImage = this.gameScene.game.assetManager.getImage('towerplain');\r\n    }\r\n    update(delta) {\r\n        this.towers.forEach(tower => {\r\n            tower.update(delta);\r\n        });\r\n    }\r\n    draw() {\r\n        this.towers.forEach(tower => {\r\n            tower.draw();\r\n        });\r\n    }\r\n    createTower(destinationTile) {\r\n        this.towers.push(new plainTower_1.PlainTower(this.gameScene, destinationTile, this.towerImage));\r\n    }\r\n}\r\nexports.TowerManager = TowerManager;\r\n\n\n//# sourceURL=webpack:///./src/Towers/towerManager.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst gameTime_1 = __webpack_require__(/*! ./DataObjects/gameTime */ \"./src/DataObjects/gameTime.ts\");\r\nconst rectangle_1 = __webpack_require__(/*! ./DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\r\nconst renderEngine_1 = __webpack_require__(/*! ./renderEngine */ \"./src/renderEngine.ts\");\r\nconst assetManager_1 = __webpack_require__(/*! ./AssetLoading/assetManager */ \"./src/AssetLoading/assetManager.ts\");\r\nconst sceneManager_1 = __webpack_require__(/*! ./Scenes/sceneManager */ \"./src/Scenes/sceneManager.ts\");\r\nconst scenes_enum_1 = __webpack_require__(/*! ./Scenes/scenes.enum */ \"./src/Scenes/scenes.enum.ts\");\r\nclass Game {\r\n    constructor() {\r\n        this.screenBounds = new rectangle_1.Rectangle(0, 0, 800, 480);\r\n        this.gameTime = new gameTime_1.GameTime();\r\n        this.renderEngine = new renderEngine_1.RenderEngine();\r\n        this.assetManager = new assetManager_1.AssetManager();\r\n        this.assetManager.init();\r\n        this.initSceneManager();\r\n    }\r\n    start() {\r\n        if (this.running) {\r\n            return;\r\n        }\r\n        this.running = true;\r\n        this.loop();\r\n    }\r\n    initSceneManager() {\r\n        this.sceneManager = new sceneManager_1.SceneManager(this, this.renderEngine);\r\n        this.sceneManager.toggleActiveScene(scenes_enum_1.Scenes.loading);\r\n    }\r\n    loop() {\r\n        this.gameTime.update();\r\n        if (this.currentScene) {\r\n            this.currentScene.update(this.gameTime.delta);\r\n            this.currentScene.render();\r\n        }\r\n        //requestAnimationFrame(() => this.loop());\r\n        setInterval(this.loop.bind(this), 1);\r\n    }\r\n}\r\nexports.Game = Game;\r\nwindow.addEventListener('load', () => {\r\n    const game = new Game();\r\n    game.start();\r\n});\r\n\n\n//# sourceURL=webpack:///./src/game.ts?");

/***/ }),

/***/ "./src/renderEngine.ts":
/*!*****************************!*\
  !*** ./src/renderEngine.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst rectangle_1 = __webpack_require__(/*! ./DataObjects/rectangle */ \"./src/DataObjects/rectangle.ts\");\r\nclass RenderEngine {\r\n    constructor() {\r\n        const gameCanvas = document.getElementById('game-canvas');\r\n        this.context = gameCanvas.getContext('2d');\r\n    }\r\n    clearRect(rect) {\r\n        if (rect) {\r\n            this.context.clearRect(rect.left, rect.top, rect.width, rect.height);\r\n        }\r\n    }\r\n    renderRect(rect, color, fill) {\r\n        if (fill) {\r\n            this.context.fillStyle = color;\r\n            this.context.fillRect(rect.left, rect.top, rect.width, rect.height);\r\n        }\r\n        else {\r\n            this.context.beginPath();\r\n            this.context.strokeStyle = color;\r\n            this.context.strokeRect(rect.left, rect.top, rect.width, rect.height);\r\n        }\r\n    }\r\n    renderText(text, x, y) {\r\n        // TODO:\r\n        // Manage font family, style, size and color\r\n        this.context.fillStyle = 'red';\r\n        this.context.font = '20px Calibri';\r\n        this.context.fillText(text, x, y);\r\n    }\r\n    renderImageRect(image, bounds) {\r\n        this.renderImage(image, bounds.left, bounds.top, bounds.width, bounds.height);\r\n    }\r\n    renderImage(image, x, y, width = null, height = null) {\r\n        var w = width == null ? image.width : width;\r\n        var h = height == null ? image.height : height;\r\n        this.context.drawImage(image, x, y, w, h);\r\n    }\r\n    renderImageSource(image, sourceRect, destRect) {\r\n        if (sourceRect.left < 0 || sourceRect.top < 0 || sourceRect.height <= 0 || sourceRect.height <= 0) {\r\n            return;\r\n        }\r\n        this.context.drawImage(image, sourceRect.left, sourceRect.top, sourceRect.width, sourceRect.height, destRect.left, destRect.top, destRect.width, destRect.height);\r\n    }\r\n    renderRotatedImageSource(image, sourceRect, destRect, rotation = 0) {\r\n        this.context.save();\r\n        this.context.translate(destRect.getCenterWidth, destRect.getCenterWidth);\r\n        this.context.rotate((rotation - 90) * (Math.PI / 180));\r\n        var rotatedDestRect = new rectangle_1.Rectangle(-((destRect.width) / 2), -((destRect.height) / 2), destRect.width, destRect.height);\r\n        this.renderImageSource(image, sourceRect, rotatedDestRect);\r\n        this.context.restore();\r\n    }\r\n}\r\nexports.RenderEngine = RenderEngine;\r\n\n\n//# sourceURL=webpack:///./src/renderEngine.ts?");

/***/ })

/******/ });