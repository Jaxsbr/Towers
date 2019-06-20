!function(e){var t={};function s(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="Towers",s(s.s=2)}([function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class i{constructor(e,t,s,i){this.left=e,this.top=t,this.width=s,this.height=i,this.update()}updateRight(){this.right=this.left+this.width}updateBottom(){this.bottom=this.top+this.height}update(){this.updateRight(),this.updateBottom()}intersectRect(e){return!(e.left>this.right||e.right<this.left||e.top>this.bottom||e.bottom<this.top)}containsRect(e){return this.left<=e.left&&e.right<=this.right&&this.top<=e.top&&e.bottom<=this.bottom}getCenterWidth(){return this.updateRight(),this.right-this.width/2}getCenterHeight(){return this.updateRight(),this.bottom-this.height/2}clone(){return new i(this.left,this.top,this.width,this.height)}equals(e){return this.left==e.left&&this.top==e.top&&this.width==e.width&&this.height==e.height}}t.Rectangle=i},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.loading=0]="loading",e[e.game=1]="game"}(t.Scenes||(t.Scenes={}))},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(3),n=s(0),o=s(4),h=s(5),r=s(8),a=s(1);class c{constructor(){this.screenBounds=new n.Rectangle(0,0,800,480),this.gameTime=new i.GameTime,this.renderEngine=new o.RenderEngine,this.assetManager=new h.AssetManager,this.assetManager.init(),this.initSceneManager()}start(){this.running||(this.running=!0,this.loop())}initSceneManager(){this.sceneManager=new r.SceneManager(this,this.renderEngine),this.sceneManager.toggleActiveScene(a.Scenes.loading)}loop(){this.gameTime.update(),this.currentScene&&(this.currentScene.update(this.gameTime.delta),this.currentScene.render()),requestAnimationFrame(()=>this.loop())}}t.Game=c,window.addEventListener("load",()=>{(new c).start()})},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.GameTime=class{constructor(){this.delta=0,this.previousLoopTime=Date.now()}update(){const e=Date.now();let t=e-this.previousLoopTime;this.delta=t/1e3,this.previousLoopTime=e}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.RenderEngine=class{constructor(){const e=document.getElementById("game-canvas");this.context=e.getContext("2d")}clearRect(e){e&&this.context.clearRect(e.left,e.top,e.width,e.height)}renderRect(e,t,s){s?(this.context.fillStyle=t,this.context.fillRect(e.left,e.top,e.width,e.height)):(this.context.beginPath(),this.context.strokeStyle=t,this.context.strokeRect(e.left,e.top,e.width,e.height))}renderText(e,t,s){this.context.fillStyle="red",this.context.font="20px Calibri",this.context.fillText(e,t,s)}renderImageRect(e,t){this.renderImage(e,t.left,t.top,t.width,t.height)}renderImage(e,t,s,i=null,n=null){var o=null==i?e.width:i,h=null==n?e.height:n;this.context.drawImage(e,t,s,o,h)}renderImageSource(e,t,s){t.left<0||t.top<0||t.height<=0||t.height<=0||this.context.drawImage(e,t.left,t.top,t.width,t.height,s.left,s.top,s.width,s.height)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(6),n=s(7);t.AssetManager=class{constructor(){this.images=[],this.maps=[]}init(){this.loadCompleted=!1,this.totalAssets=0,this.loadedAssets=0,this.initAssets()}initAssets(){let e,t,s=new XMLHttpRequest;s.onload=(i=>{if(200===s.status){let i=JSON.parse(s.responseText);e=i.imageAssets,t=i.mapAssets,this.initImages(e)}}),s.open("get","./assets/assetManifest.json",!0),s.send()}initImages(e){e&&(this.totalAssets+=e.length),e.forEach(e=>{let t=new i.ImageAsset(this,e.key,e.src);this.images.push(t)}),this.images.forEach(e=>{e.init()})}initMaps(e){e&&(this.totalAssets+=e.length),e.forEach(e=>{let t=new n.MapAsset(this,e.key,e.src);this.maps.push(t)}),this.maps.forEach(e=>{e.init()})}update(){0!==this.totalAssets&&this.totalAssets===this.loadedAssets&&(this.loadCompleted=!0)}getImage(e){for(let t of this.images)if(t.key===e)return t.image}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.ImageAsset=class{constructor(e,t,s){this.assetManager=e,this.key=t,this.src=s}init(){this.image=new Image,this.image.onload=(()=>{this.assetManager.loadedAssets++}),this.image.src=this.src}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.MapAsset=class{constructor(e,t,s){this.assetManager=e,this.key=t,this.src=s}init(){let e=new XMLHttpRequest;e.onload=(t=>{if(200===e.status){let t=JSON.parse(e.responseText);this.jsonRaw=t,this.assetManager.loadedAssets++}}),e.open("get",this.src,!0),e.send()}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(9),n=s(10),o=s(1);t.SceneManager=class{constructor(e,t){this.game=e,this.renderEngine=t,this.loadScene=new i.LoadScene(this.game,this,this.renderEngine),this.gameScene=new n.GameScene(this.game,this,this.renderEngine)}toggleActiveScene(e){switch(+e){case o.Scenes.loading:this.game.currentScene=this.loadScene;break;case o.Scenes.game:this.game.currentScene=this.gameScene}this.game.currentScene.init()}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),n=s(1);t.LoadScene=class{constructor(e,t,s){this.game=e,this.sceneManager=t,this.renderEngine=s}init(){}update(e){this.game.assetManager.update(),this.game.assetManager.loadCompleted&&this.sceneManager.toggleActiveScene(n.Scenes.game)}render(){this.renderEngine.renderRect(new i.Rectangle(0,0,800,480),"black",!0)}mouseDown(){}mouseUp(){}mouseMove(e,t){}resize(){}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(11),n=s(14);t.GameScene=class{constructor(e,t,s){this.game=e,this.sceneManager=t,this.renderEngine=s}init(){this.backgroundImage=this.game.assetManager.getImage("background"),this.tileImage=this.game.assetManager.getImage("tiles"),this.enemyImage=this.game.assetManager.getImage("squid"),this.tileMap=new i.TileMap(this,this.game.screenBounds,this.tileImage),this.enemySpawner=new n.EnemySpawner(this,this.enemyImage)}update(e){this.enemySpawner.update()}render(){this.renderEngine.clearRect(this.game.screenBounds),this.renderEngine.renderImage(this.backgroundImage,0,0,800,480),this.tileMap.draw(),this.enemySpawner.draw()}mouseDown(){}mouseUp(){}mouseMove(e,t){}resize(){}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(12),n=s(13);t.TileMap=class{constructor(e,t,s){this.wayPoints=[],this.rows=10,this.cols=10,this.tileWidth=48,this.tileHeight=48,this.gameScene=e,this.bounds=t,this.tileImage=s,this.initTileMatrix()}initTileMatrix(){var e=[[1,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0],[1,1,1,0,1,1,1,0,0,0],[0,0,1,0,1,0,1,0,0,0],[0,0,1,1,1,0,1,0,0,0],[0,0,0,0,0,0,1,0,0,0],[0,0,0,0,1,1,1,0,0,0],[0,0,0,0,1,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,1,1,1,1,1]];this.wayPoints=[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:2,y:3},{x:2,y:4},{x:3,y:4},{x:4,y:4},{x:4,y:3},{x:4,y:2},{x:5,y:2},{x:6,y:2},{x:6,y:3},{x:6,y:4},{x:6,y:5},{x:6,y:6},{x:5,y:6},{x:4,y:6},{x:4,y:7},{x:4,y:8},{x:5,y:8},{x:5,y:9},{x:6,y:9},{x:7,y:9},{x:8,y:9},{x:9,y:9}],this.tileMatrix=[];for(var t=0;t<this.rows;t++){this.tileMatrix[t]=[];for(var s=0;s<this.cols;s++){var i=e[t][s],o=this.getTileImageObject(i,this.tileWidth*s,this.tileHeight*t);this.tileMatrix[t][s]=new n.Tile(this.gameScene,null,o)}}}getTileImageObject(e,t,s){var n=new i.ImageObject;return n.image=this.tileImage,n.x=t,n.y=s,n.width=this.tileWidth,n.height=this.tileHeight,n.swidth=32,n.sheight=32,0==e?(n.sx=0,n.sy=0):(n.sx=32,n.sy=0),n}draw(){for(var e=0;e<this.rows;e++)for(var t=0;t<this.cols;t++)this.tileMatrix[e][t].draw()}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0);t.ImageObject=class{constructor(){this._sourceRectangle=null,this._destinationRectangle=null}get sourceRectangle(){return null==this._sourceRectangle&&(this._sourceRectangle=new i.Rectangle(this.sx,this.sy,this.swidth,this.sheight)),this._sourceRectangle}get destinationRectangle(){return null==this._destinationRectangle&&(this._destinationRectangle=new i.Rectangle(this.x,this.y,this.width,this.height)),this._destinationRectangle}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Tile=class{constructor(e,t,s){this.gameScene=e,this.bounds=t,this.imageObject=s}draw(){this.gameScene.renderEngine.renderImageSource(this.imageObject.image,this.imageObject.sourceRectangle,this.imageObject.destinationRectangle)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(15);t.EnemySpawner=class{constructor(e,t){this.enemy1=new i.Enemy(e,t,e.tileMap.wayPoints)}update(){this.enemy1.update()}draw(){this.enemy1.draw()}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(16),n=s(0);t.Enemy=class{constructor(e,t,s){this.wayPointReachedThreshold=.5,this.gameScene=e,this.enemyImage=t,this.movementWayPoints=s,this.movements={left:!1,right:!1,up:!1,down:!1},this.position=new i.Vector2(0,0),this.size=new i.Vector2(48,48),this.center=new i.Vector2(0,0),this.velocity=new i.Vector2(0,0),this.bounds=new n.Rectangle(0,0,0,0)}update(){this.bounds.left=this.position.x,this.bounds.top=this.position.y,this.bounds.width=this.size.x,this.bounds.height=this.size.y,this.bounds.update(),this.center.x=this.bounds.getCenterWidth(),this.center.y=this.bounds.getCenterHeight(),this.setMoveDirection(),this.applyVelocity()}draw(){var e=new n.Rectangle(0,0,68,80);this.gameScene.renderEngine.renderImageSource(this.enemyImage,e,this.bounds)}setMoveDirection(){this.movements.left=this.velocity.x<0,this.movements.right=this.velocity.x>0,this.movements.up=this.velocity.y<0,this.movements.down=this.velocity.y>0,(this.movements.left||this.movements.right)&&(this.movements.up||this.movements.down)&&((this.velocity.x<0?-1*this.velocity.x:this.velocity.x)>(this.velocity.y<0?-1*this.velocity.y:this.velocity.y)?(this.movements.left=this.velocity.x<0,this.movements.right=this.velocity.x>0,this.movements.up=!1,this.movements.down=!1):(this.movements.up=this.velocity.y<0,this.movements.down=this.velocity.y>0,this.movements.left=!1,this.movements.right=!1))}applyVelocity(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Vector2=class{constructor(e=0,t=0){this.x=e,this.y=t}}}]);