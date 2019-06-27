!function(e){var t={};function i(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(s,n,function(t){return e[t]}.bind(null,n));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="Towers",i(i.s=3)}([function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class s{constructor(e,t,i,s){this.left=e,this.top=t,this.width=i,this.height=s,this.update()}updateRight(){this.right=this.left+this.width}updateBottom(){this.bottom=this.top+this.height}update(){this.updateRight(),this.updateBottom()}intersectRect(e){return!(e.left>this.right||e.right<this.left||e.top>this.bottom||e.bottom<this.top)}containsRect(e){return this.left<=e.left&&e.right<=this.right&&this.top<=e.top&&e.bottom<=this.bottom}get getCenterWidth(){return this.updateRight(),this.right-this.width/2}get getCenterHeight(){return this.updateRight(),this.bottom-this.height/2}clone(){return new s(this.left,this.top,this.width,this.height)}equals(e){return this.left==e.left&&this.top==e.top&&this.width==e.width&&this.height==e.height}}t.Rectangle=s},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.loading=0]="loading",e[e.game=1]="game"}(t.Scenes||(t.Scenes={}))},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class s{constructor(e=0,t=0){this.x=e,this.y=t}subtract(e){return new s(this.x-e.x,this.y-e.y)}distance(e){var t=(this.x-e.x)*(this.x-e.x),i=(this.y-e.y)*(this.y-e.y);return Math.sqrt(t+i)}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){let e=Math.sqrt(this.x*this.x+this.y*this.y);var t=this.x/e,i=this.y/e;return new s(isNaN(t)?0:t,isNaN(i)?0:i)}}t.Vector2=s},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(4),n=i(0),a=i(5),r=i(6),h=i(9),o=i(1);class c{constructor(){this.screenBounds=new n.Rectangle(0,0,800,480),this.gameTime=new s.GameTime,this.renderEngine=new a.RenderEngine,this.assetManager=new r.AssetManager,this.assetManager.init(),this.initSceneManager()}start(){this.running||(this.running=!0,this.loop())}initSceneManager(){this.sceneManager=new h.SceneManager(this,this.renderEngine),this.sceneManager.toggleActiveScene(o.Scenes.loading)}loop(){this.gameTime.update(),this.currentScene&&(this.currentScene.update(this.gameTime.delta),this.currentScene.render()),setInterval(this.loop.bind(this),1)}}t.Game=c,window.addEventListener("load",()=>{(new c).start()})},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.GameTime=class{constructor(){this.delta=0,this.previousLoopTime=Date.now()}update(){const e=Date.now();let t=e-this.previousLoopTime;this.delta=t/1e3,this.previousLoopTime=e}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(0);t.RenderEngine=class{constructor(){const e=document.getElementById("game-canvas");this.context=e.getContext("2d")}clearRect(e){e&&this.context.clearRect(e.left,e.top,e.width,e.height)}renderRect(e,t,i){i?(this.context.fillStyle=t,this.context.fillRect(e.left,e.top,e.width,e.height)):(this.context.beginPath(),this.context.strokeStyle=t,this.context.strokeRect(e.left,e.top,e.width,e.height))}renderText(e,t,i){this.context.fillStyle="red",this.context.font="20px Calibri",this.context.fillText(e,t,i)}renderImageRect(e,t){this.renderImage(e,t.left,t.top,t.width,t.height)}renderImage(e,t,i,s=null,n=null){var a=null==s?e.width:s,r=null==n?e.height:n;this.context.drawImage(e,t,i,a,r)}renderImageSource(e,t,i){t.left<0||t.top<0||t.height<=0||t.height<=0||this.context.drawImage(e,t.left,t.top,t.width,t.height,i.left,i.top,i.width,i.height)}renderRotatedImageSource(e,t,i,n=0){this.context.save(),this.context.translate(i.getCenterWidth,i.getCenterWidth),this.context.rotate((n-90)*(Math.PI/180));var a=new s.Rectangle(-i.width/2,-i.height/2,i.width,i.height);this.renderImageSource(e,t,a),this.context.restore()}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(7),n=i(8);t.AssetManager=class{constructor(){this.images=[],this.maps=[]}init(){this.loadCompleted=!1,this.totalAssets=0,this.loadedAssets=0,this.initAssets()}initAssets(){let e,t,i=new XMLHttpRequest;i.onload=(s=>{if(200===i.status){let s=JSON.parse(i.responseText);e=s.imageAssets,t=s.mapAssets,this.initImages(e)}}),i.open("get","./assets/assetManifest.json",!0),i.send()}initImages(e){e&&(this.totalAssets+=e.length),e.forEach(e=>{let t=new s.ImageAsset(this,e.key,e.src);this.images.push(t)}),this.images.forEach(e=>{e.init()})}initMaps(e){e&&(this.totalAssets+=e.length),e.forEach(e=>{let t=new n.MapAsset(this,e.key,e.src);this.maps.push(t)}),this.maps.forEach(e=>{e.init()})}update(){0!==this.totalAssets&&this.totalAssets===this.loadedAssets&&(this.loadCompleted=!0)}getImage(e){for(let t of this.images)if(t.key===e)return t.image}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.ImageAsset=class{constructor(e,t,i){this.assetManager=e,this.key=t,this.src=i}init(){this.image=new Image,this.image.onload=(()=>{this.assetManager.loadedAssets++}),this.image.src=this.src}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.MapAsset=class{constructor(e,t,i){this.assetManager=e,this.key=t,this.src=i}init(){let e=new XMLHttpRequest;e.onload=(t=>{if(200===e.status){let t=JSON.parse(e.responseText);this.jsonRaw=t,this.assetManager.loadedAssets++}}),e.open("get",this.src,!0),e.send()}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(10),n=i(11),a=i(1);t.SceneManager=class{constructor(e,t){this.game=e,this.renderEngine=t,this.loadScene=new s.LoadScene(this.game,this,this.renderEngine),this.gameScene=new n.GameScene(this.game,this,this.renderEngine)}toggleActiveScene(e){switch(+e){case a.Scenes.loading:this.game.currentScene=this.loadScene;break;case a.Scenes.game:this.game.currentScene=this.gameScene}this.game.currentScene.init()}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(0),n=i(1);t.LoadScene=class{constructor(e,t,i){this.game=e,this.sceneManager=t,this.renderEngine=i}init(){}update(e){this.game.assetManager.update(),this.game.assetManager.loadCompleted&&this.sceneManager.toggleActiveScene(n.Scenes.game)}render(){this.renderEngine.renderRect(new s.Rectangle(0,0,800,480),"black",!0)}mouseDown(){}mouseUp(){}mouseMove(e,t){}resize(){}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(12),n=i(15),a=i(17);t.GameScene=class{constructor(e,t,i){this.game=e,this.sceneManager=t,this.renderEngine=i}init(){this.backgroundImage=this.game.assetManager.getImage("background"),this.tileImage=this.game.assetManager.getImage("tiles"),this.tileMap=new s.TileMap(this,this.game.screenBounds,this.tileImage),this.enemySpawner=new n.EnemySpawner(this),this.towerManager=new a.TowerManager(this),this.towerManager.createTower(this.tileMap.tileMatrix[1][1]),this.enemySpawner.createEnemy()}update(e){this.enemySpawner.update(e),this.towerManager.update()}render(){this.renderEngine.clearRect(this.game.screenBounds),this.renderEngine.renderImage(this.backgroundImage,0,0,800,480),this.tileMap.draw(),this.enemySpawner.draw(),this.towerManager.draw()}mouseDown(){}mouseUp(){}mouseMove(e,t){}resize(){}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(0),n=i(13),a=i(14);t.TileMap=class{constructor(e,t,i){this.wayPoints=[],this.rows=10,this.cols=10,this.tileWidth=48,this.tileHeight=48,this.gameScene=e,this.bounds=t,this.tileImage=i,this.initTileMatrix()}initTileMatrix(){var e=[[1,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0],[1,1,1,0,1,1,1,0,0,0],[0,0,1,0,1,0,1,0,0,0],[0,0,1,1,1,0,1,0,0,0],[0,0,0,0,0,0,1,0,0,0],[0,0,0,0,1,1,1,0,0,0],[0,0,0,0,1,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,1,1,1,1,1]];this.wayPoints=[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:2,y:3},{x:2,y:4},{x:3,y:4},{x:4,y:4},{x:4,y:3},{x:4,y:2},{x:5,y:2},{x:6,y:2},{x:6,y:3},{x:6,y:4},{x:6,y:5},{x:6,y:6},{x:5,y:6},{x:4,y:6},{x:4,y:7},{x:4,y:8},{x:5,y:8},{x:5,y:9},{x:6,y:9},{x:7,y:9},{x:8,y:9},{x:9,y:9}],this.tileMatrix=[];for(var t=0;t<this.rows;t++){this.tileMatrix[t]=[];for(var i=0;i<this.cols;i++){var n=e[t][i],r=this.getTileImageObject(n,this.tileWidth*i,this.tileHeight*t),h=new s.Rectangle(this.tileWidth*i,this.tileHeight*t,this.tileWidth,this.tileHeight);this.tileMatrix[t][i]=new a.Tile(this.gameScene,h,r)}}}getTileImageObject(e,t,i){var s=new n.ImageObject;return s.image=this.tileImage,s.x=t,s.y=i,s.width=this.tileWidth,s.height=this.tileHeight,s.swidth=32,s.sheight=32,0==e?(s.sx=0,s.sy=0):(s.sx=32,s.sy=0),s}draw(){for(var e=0;e<this.rows;e++)for(var t=0;t<this.cols;t++)this.tileMatrix[e][t].draw()}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(0);t.ImageObject=class{constructor(){this._sourceRectangle=null,this._destinationRectangle=null}get sourceRectangle(){return null==this._sourceRectangle&&(this._sourceRectangle=new s.Rectangle(this.sx,this.sy,this.swidth,this.sheight)),this._sourceRectangle}get destinationRectangle(){return null==this._destinationRectangle&&(this._destinationRectangle=new s.Rectangle(this.x,this.y,this.width,this.height)),this._destinationRectangle}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Tile=class{constructor(e,t,i){this.gameScene=e,this.bounds=t,this.imageObject=i}draw(){this.gameScene.renderEngine.renderImageSource(this.imageObject.image,this.imageObject.sourceRectangle,this.imageObject.destinationRectangle)}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(16);t.EnemySpawner=class{constructor(e){this.enemies=[],this.gameScene=e,this.enemyImage=this.gameScene.game.assetManager.getImage("squid")}update(e){this.enemies.forEach(t=>{t.update(e),t.active||(t.reset(),t.active=!0)})}draw(){this.enemies.forEach(e=>{e.draw()})}createEnemy(){var e=new s.Enemy(this.gameScene,this.enemyImage,this.gameScene.tileMap.wayPoints);e.active=!0,this.enemies.push(e)}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(2),n=i(0);t.Enemy=class{constructor(e,t,i){this.wayPointReachedThreshold=.5,this.moveSpeed=200,this.gameScene=e,this.enemyImage=t,this.originalWayPoints=i,this.reset()}update(e){if(console.log("enemy: "+e),console.log("enemy coords: x:"+this.position.x+" y:"+this.position.y),this.active){var t=!1;if(this.movementWayPoints.length<=0&&(t=!0),!this.nextMovePoint){var i=this.movementWayPoints.shift(),n=this.gameScene.tileMap.tileMatrix[i.y][i.x].bounds;this.nextMovePoint=new s.Vector2(n.getCenterWidth,n.getCenterHeight)}if(this.updateBounds(),this.direction=this.nextMovePoint.subtract(this.center),this.distanceFromNextWaypoint=this.direction.magnitude(),this.nextWaypointReached()){if(t)return this.nextMovePoint=null,void(this.active=!1);var a=this.movementWayPoints.shift();n=this.gameScene.tileMap.tileMatrix[a.y][a.x].bounds,this.nextMovePoint.x=n.getCenterWidth,this.nextMovePoint.y=n.getCenterHeight,this.direction=this.center.subtract(this.nextMovePoint)}this.normalizedDirection=this.direction.normalize(),isNaN(this.normalizedDirection.x)||isNaN(this.normalizedDirection.y)||(this.velocity.x=this.normalizedDirection.x*(this.moveSpeed*e),this.velocity.y=this.normalizedDirection.y*(this.moveSpeed*e),this.setMoveDirection()),this.applyVelocity()}}draw(){if(this.active){var e=new n.Rectangle(0,0,68,80);this.gameScene.renderEngine.renderImageSource(this.enemyImage,e,this.bounds)}}reset(){this.active=!1,this.movementWayPoints=this.originalWayPoints.slice(),this.movements={left:!1,right:!1,up:!1,down:!1},this.position=new s.Vector2(0,0),this.size=new s.Vector2(48,48),this.center=new s.Vector2(0,0),this.velocity=new s.Vector2(0,0),this.bounds=new n.Rectangle(0,0,0,0)}nextWaypointReached(){return this.distanceFromNextWaypoint<this.wayPointReachedThreshold}updateBounds(){this.bounds.left=this.position.x,this.bounds.top=this.position.y,this.bounds.width=this.size.x,this.bounds.height=this.size.y,this.bounds.update(),this.center.x=this.bounds.getCenterWidth,this.center.y=this.bounds.getCenterHeight}setMoveDirection(){this.movements.left=this.velocity.x<0,this.movements.right=this.velocity.x>0,this.movements.up=this.velocity.y<0,this.movements.down=this.velocity.y>0,(this.movements.left||this.movements.right)&&(this.movements.up||this.movements.down)&&((this.velocity.x<0?-1*this.velocity.x:this.velocity.x)>(this.velocity.y<0?-1*this.velocity.y:this.velocity.y)?(this.movements.left=this.velocity.x<0,this.movements.right=this.velocity.x>0,this.movements.up=!1,this.movements.down=!1):(this.movements.up=this.velocity.y<0,this.movements.down=this.velocity.y>0,this.movements.left=!1,this.movements.right=!1))}applyVelocity(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(18);t.TowerManager=class{constructor(e){this.towers=[],this.gameScene=e,this.towerImage=this.gameScene.game.assetManager.getImage("towerplain")}update(){this.towers.forEach(e=>{e.update()})}draw(){this.towers.forEach(e=>{e.draw()})}createTower(e){this.towers.push(new s.PlainTower(this.gameScene,e,this.towerImage))}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(19);t.PlainTower=class extends s.BaseTower{constructor(e,t,i){super(e,t,i),super.shootRange=1024}update(){super.update()}draw(){super.draw()}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=i(2),n=i(0);t.BaseTower=class{constructor(e,t,i){this.shootRange=128,this.shootRate=.5,this.shootElapsed=0,this.gameScene=e,this.destinationTile=t,this.towerImage=i,this.center=new s.Vector2(0,0)}update(){this.center.x=this.destinationTile.bounds.getCenterWidth,this.center.y=this.destinationTile.bounds.getCenterHeight,this.updateTarget(),this.updateTargetInRange(),this.updateRotation()}draw(){var e=new n.Rectangle(0,0,32,32);this.gameScene.renderEngine.renderRotatedImageSource(this.towerImage,e,this.destinationTile.bounds,this.rotation)}updateTargetInRange(){if(null!==this.target&&this.target.active&&this.center.subtract(this.target.center).magnitude()<=this.shootRange)return console.log("ranged"),void(this.targetInRange=!0);this.targetInRange=!1}updateRotation(){if(this.targetInRange){var e=this.target.center.x-this.center.x,t=this.target.center.y-this.center.y;this.rotation=Math.atan2(t,e)*(180/Math.PI)-270}}updateTarget(){for(var e,t=0,i=99999,s=0;s<this.gameScene.enemySpawner.enemies.length;s++){var n=this.gameScene.enemySpawner.enemies[s];t=n.center.distance(this.center),e?(i=t,e=n):t<i&&(i=t,e=n)}this.target=e}}}]);