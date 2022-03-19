(()=>{"use strict";var e={709:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AssetManager=void 0;const s=i(893);t.AssetManager=class{constructor(){this.images=[],this.levelInfo=[]}init(){this.levelInfoLoaded=!1,this.loadCompleted=!1,this.totalAssets=0,this.initAssets()}initAssets(){const e=new XMLHttpRequest;e.onload=()=>{if(200===e.status){const t=JSON.parse(e.responseText);this.totalAssets=t.assetCount,this.initImages(t.imageAssets),this.initLevelInfo(t.levelInfoFile)}},e.open("get","./assets/assetManifest.json",!0),e.send()}initImages(e){e.forEach((e=>{const t=new s.ImageAsset(e.key,e.src);this.images.push(t)})),this.images.forEach((e=>{e.init()}))}initLevelInfo(e){if(!e)return void console.error("no level info file provided");const t=new XMLHttpRequest;t.onload=()=>{if(200===t.status){const e=JSON.parse(t.responseText);this.levelInfo=e,this.levelInfoLoaded=!0}},t.open("get",e,!0),t.send()}update(){this.loadedAssetCount=this.images.filter((e=>e.loaded)).length,this.loadedAssetCount=this.levelInfoLoaded?this.loadedAssetCount+=1:this.loadedAssetCount,0!==this.totalAssets&&this.totalAssets===this.loadedAssetCount&&(this.loadCompleted=!0)}getImage(e){return this.images.filter((t=>t.key===e)).at(0).image}}},893:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ImageAsset=void 0,t.ImageAsset=class{constructor(e,t){this.loaded=!1,this.key=e,this.src=t}init(){this.image=new Image,this.image.onload=()=>{this.loaded=!0},this.image.src=this.src}}},681:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameTime=void 0,t.GameTime=class{constructor(){this.delta=0,this.previousLoopTime=Date.now()}update(){const e=Date.now(),t=e-this.previousLoopTime;this.delta=t/1e3,this.previousLoopTime=e}}},70:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ImageObject=void 0;const s=i(274);t.ImageObject=class{constructor(){this.sourceRect=null,this.destinationRect=null}get sourceRectangle(){return null==this.sourceRect&&(this.sourceRect=new s.Rectangle(this.sx,this.sy,this.swidth,this.sheight)),this.sourceRect}get destinationRectangle(){return null==this.destinationRect&&(this.destinationRect=new s.Rectangle(this.x,this.y,this.width,this.height)),this.destinationRect}}},274:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Rectangle=void 0;class i{constructor(e,t,i,s){this.left=e,this.top=t,this.width=i,this.height=s,this.update()}updateRight(){this.right=this.left+this.width}updateBottom(){this.bottom=this.top+this.height}update(){this.updateRight(),this.updateBottom()}intersectRect(e){return!(e.left>this.right||e.right<this.left||e.top>this.bottom||e.bottom<this.top)}containsRect(e){return this.left<=e.left&&e.right<=this.right&&this.top<=e.top&&e.bottom<=this.bottom}get getCenterWidth(){return this.updateRight(),this.right-this.width/2}get getCenterHeight(){return this.updateBottom(),this.bottom-this.height/2}clone(){return new i(this.left,this.top,this.width,this.height)}equals(e){return this.left===e.left&&this.top===e.top&&this.width===e.width&&this.height===e.height}toString(){return`x:${this.left} y: ${this.top} w: ${this.width} h:${this.height}`}static get empty(){return new i(0,0,0,0)}}t.Rectangle=i},779:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Vector2=void 0;class i{constructor(e=0,t=0){this.x=e,this.y=t}subtract(e){return new i(this.x-e.x,this.y-e.y)}distance(e){const t=(this.x-e.x)*(this.x-e.x),i=(this.y-e.y)*(this.y-e.y);return Math.sqrt(t+i)}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){const e=Math.sqrt(this.x*this.x+this.y*this.y),t=this.x/e,s=this.y/e;return new i(Number.isNaN(t)?0:t,Number.isNaN(s)?0:s)}static get empty(){return new i(0,0)}}t.Vector2=i},656:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Enemy=void 0;const s=i(274),n=i(779);t.Enemy=class{constructor(e){this.wayPointReachedThreshold=2,this.moveSpeed=75,this.hp=0,this.maxHp=5,this.topPadding=10,this.hpRemainingBarColor="red",this.hpFullBarColor="green",this.alive=!1,this.enemyImage=e,this.originalWayPoints=window.tileMap.wayPoints,this.reset(0,0)}reset(e,t){this.active=!1,this.alive=!1,this.maxHp=t,this.hp=this.maxHp,this.moveSpeed=e,this.movementWayPoints=this.originalWayPoints.slice(),this.movements={left:!1,right:!1,up:!1,down:!1},this.position=n.Vector2.empty,this.futurePosition=n.Vector2.empty,this.size=window.gameConfig.enemySize,this.center=n.Vector2.empty,this.velocity=n.Vector2.empty,this.bounds=new s.Rectangle(0,0,0,0),this.nextMovePoint=null,this.hpBounds=new s.Rectangle(this.bounds.left,this.bounds.top-this.topPadding,this.bounds.width,this.bounds.height),this.liveBounds=this.hpBounds.clone(),this.enemyName=Math.random().toString()}update(e){if(!this.active)return;let t=!1;if(this.movementWayPoints.length<=0&&(t=!0),!this.nextMovePoint){const e=this.movementWayPoints.shift(),t=window.tileMap.tileMatrix[e.y][e.x].bounds;this.nextMovePoint=new n.Vector2(t.getCenterWidth,t.getCenterHeight)}if(this.updateBounds(),this.updateHpBounds(),this.direction=this.nextMovePoint.subtract(this.center),this.distanceFromNextWaypoint=this.direction.magnitude(),this.nextWaypointReached()){if(t)return this.nextMovePoint=null,this.active=!1,void window.dispatchEvent(new CustomEvent("enemyReachedEnd"));const e=this.movementWayPoints.shift(),i=window.tileMap.tileMatrix[e.y][e.x].bounds;this.nextMovePoint.x=i.getCenterWidth,this.nextMovePoint.y=i.getCenterHeight,this.direction=this.center.subtract(this.nextMovePoint)}this.normalizedDirection=this.direction.normalize(),Number.isNaN(this.normalizedDirection.x)||Number.isNaN(this.normalizedDirection.y)||(this.velocity.x=this.normalizedDirection.x*(this.moveSpeed*e),this.velocity.y=this.normalizedDirection.y*(this.moveSpeed*e),this.setMoveDirection()),this.applyVelocity()}nextWaypointReached(){return this.distanceFromNextWaypoint<this.wayPointReachedThreshold}updateBounds(){this.bounds.left=this.position.x,this.bounds.top=this.position.y,this.bounds.width=this.size.x,this.bounds.height=this.size.y,this.bounds.update(),this.updateHpBounds(),this.updateLifeBounds(),this.center.x=this.bounds.getCenterWidth,this.center.y=this.bounds.getCenterHeight,this.futurePosition.x=this.center.x,this.futurePosition.y=this.center.y,this.futurePosition.x=this.center.x+this.velocity.x*window.gameConfig.enemyFuturePositionModifier,this.futurePosition.y=this.center.y+this.velocity.y*window.gameConfig.enemyFuturePositionModifier}updateHpBounds(){const e=100-100*this.hp/this.maxHp,t=this.liveBounds.width*e/100;this.hpBounds.width=this.liveBounds.width-t,this.hpBounds.left=this.bounds.left,this.hpBounds.top=this.bounds.top,this.hpBounds.height=this.bounds.height/this.topPadding,this.hpBounds.update()}updateLifeBounds(){this.liveBounds.left=this.bounds.left,this.liveBounds.top=this.bounds.top,this.liveBounds.width=this.bounds.width,this.liveBounds.height=this.bounds.height/this.topPadding,this.liveBounds.update()}draw(){if(!this.active)return;const e=new s.Rectangle(0,0,68,80);window.renderEngine.renderImageSource(this.enemyImage,e,this.bounds),this.drawRemainingHPBar(),this.drawFullHPBar()}drawRemainingHPBar(){window.renderEngine.renderRect(this.liveBounds,this.hpRemainingBarColor,!0)}drawFullHPBar(){window.renderEngine.renderRect(this.hpBounds,this.hpFullBarColor,!0)}setMoveDirection(){this.movements.left=this.velocity.x<0,this.movements.right=this.velocity.x>0,this.movements.up=this.velocity.y<0,this.movements.down=this.velocity.y>0,(this.movements.left||this.movements.right)&&(this.movements.up||this.movements.down)&&((this.velocity.x<0?-1*this.velocity.x:this.velocity.x)>(this.velocity.y<0?-1*this.velocity.y:this.velocity.y)?(this.movements.left=this.velocity.x<0,this.movements.right=this.velocity.x>0,this.movements.up=!1,this.movements.down=!1):(this.movements.up=this.velocity.y<0,this.movements.down=this.velocity.y>0,this.movements.left=!1,this.movements.right=!1))}applyVelocity(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y}hit(){this.active&&(this.hp-=1,this.hp<=0&&(this.active=!1,window.dispatchEvent(new CustomEvent("enemyKilled"))))}}},396:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EnemySpawner=void 0;const s=i(656);t.EnemySpawner=class{constructor(){this.enemies=[],this.enemySpawnCount=0,this.enemySpawnElapsed=0,this.enemiesKilled=0,this.enemiesEscaped=0,this.enemyImage=window.assetManager.getImage("squid"),this.setCurrentLevel(),window.addEventListener("enemyKilled",(()=>{this.enemiesKilled+=1})),window.addEventListener("enemyReachedEnd",(()=>{this.enemiesEscaped+=1}))}update(e){this.enemies.forEach((t=>{t.update(e)})),this.updateSpawner(e),this.updateRoundCheck()}updateSpawner(e){this.enemySpawnCount>=this.enemySpawnCountMax||(this.enemySpawnElapsed+=e,this.enemySpawnElapsed>=this.enemySpawnRate&&(this.enemySpawnElapsed=0,this.createEnemy(),this.enemySpawnCount+=1))}updateRoundCheck(){this.enemiesEscaped+this.enemiesKilled===window.levelManager.currentLevel.enemySpawnCountMax&&(this.enemiesKilled=0,this.enemiesEscaped=0,this.enemySpawnCount=0,window.levelManager.nextLevel(),this.setCurrentLevel())}draw(){this.enemies.forEach((e=>{e.draw()}))}createEnemy(){const e=new s.Enemy(this.enemyImage);e.reset(window.levelManager.currentLevel.enemyMoveSpeed,window.levelManager.currentLevel.enemyMaxHp),e.active=!0,this.enemies.push(e)}setCurrentLevel(){this.enemySpawnCountMax=window.levelManager.currentLevel.enemySpawnCountMax,this.enemySpawnRate=window.levelManager.currentLevel.enemySpawnRate}}},643:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LevelManager=void 0,t.LevelManager=class{constructor(e){this.levelInfo=e,this.loadLevel()}loadLevel(){null==this.currentLevel&&(this.currentLevel=this.levelInfo.at(0))}nextLevel(){const e=this.currentLevel.levelIndex+1;for(let t=0;t<this.levelInfo.length;t+=1)if(this.levelInfo[t].levelIndex===e)return void(this.currentLevel=this.levelInfo[t])}}},38:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Menu=void 0,t.Menu=class{constructor(){this.stagedTowerImageWidth=window.gameConfig.menuStagedTowerImageWidth,this.stagedTowerImageHeight=window.gameConfig.menuStagedTowerImageHeight,this.hasStagedTower=!1,window.addEventListener("plainTowerClicked",(()=>{this.towerClicked("plain")})),window.addEventListener("slowTowerClicked",(()=>{this.towerClicked("slow")})),this.menuHeight=document.getElementById("tower_menu").clientHeight,this.imageDictionary=[{key:"plain",image:window.assetManager.getImage("towerplain")},{key:"slow",image:window.assetManager.getImage("towerslow")}]}clearStagedTower(){this.stagedTower="",this.hasStagedTower=!1}towerClicked(e){this.stagedTower=e,this.hasStagedTower=!0}draw(){if(!window.mouseInfo||!this.stagedTower)return;const e=window.mouseInfo.x-this.stagedTowerImageWidth/2,t=window.mouseInfo.y-this.stagedTowerImageHeight/2-this.menuHeight,{image:i}=this.imageDictionary.find((e=>e.key===this.stagedTower));window.renderEngine.renderImage(i,e,t,this.stagedTowerImageWidth,this.stagedTowerImageHeight)}}},721:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Projectile=void 0;const s=i(274),n=i(779);t.Projectile=class{constructor(e){this.active=!1,this.moveSpeed=.5,this.ttl=0,this.ttlMax=2,this.projectileImage=e,this.worldBounds=window.tileMap.bounds,this.bounds=new s.Rectangle(0,0,24,24),this.velocity=n.Vector2.empty,this.projectileColor="black",this.imageSourceRect=new s.Rectangle(0,0,32,32)}update(e){this.bounds.update(),this.updateTTL(e),this.updateVelocity(e)}updateTTL(e){this.active&&(this.ttl-=e,this.ttl<=0&&(this.active=!1))}updateVelocity(e){this.direction&&this.active&&(this.velocity.x=this.direction.x*(this.moveSpeed*e),this.velocity.y=this.direction.y*(this.moveSpeed*e),this.bounds.left+=this.velocity.x,this.bounds.top+=this.velocity.y)}draw(){this.active&&window.renderEngine.renderImageSource(this.projectileImage,this.imageSourceRect,this.bounds)}reset(e,t,i){this.active=!0,this.ttl=this.ttlMax,this.startPosition=e,this.direction=t,this.moveSpeed=i,this.velocity.x=0,this.velocity.y=0,this.bounds.left=this.startPosition.x-this.bounds.width/2,this.bounds.top=this.startPosition.y-this.bounds.height/2,this.bounds.update()}}},369:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ProjectileEngine=void 0;const s=i(721);t.ProjectileEngine=class{constructor(){this.projectiles=[],this.projectileImage=window.assetManager.getImage("projectile")}update(e){this.projectiles.forEach((t=>{t.update(e)}))}draw(){this.projectiles.forEach((e=>{e.draw()}))}activateProjectile(e,t,i){let s=!1;for(let n=0;n<this.projectiles.length;n+=1)if(!this.projectiles[n].active){this.projectiles[n].reset(e,t,i),s=!0;break}s||this.expandProjectilePool(e,t,i)}expandProjectilePool(e,t,i){const n=new s.Projectile(this.projectileImage);return this.projectiles.push(n),this.activateProjectile(e,t,i),n}}},661:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameScene=void 0;const s=i(274),n=i(396),o=i(643),a=i(38),h=i(369),r=i(143),d=i(501);class l{constructor(){this.collisionCheckElapsed=0}init(){this.backgroundImage=window.assetManager.getImage("background"),this.tileImage=window.assetManager.getImage("tiles"),window.levelManager=new o.LevelManager(window.assetManager.levelInfo),this.menu=new a.Menu,window.tileMap=new r.TileMap(this.tileImage),window.enemySpawner=new n.EnemySpawner,this.towerManager=new d.TowerManager,window.projectileEngine=new h.ProjectileEngine,this.towerManager.createTower(window.tileMap.tileMatrix[3][3]),window.addEventListener("mousemove",(e=>{this.mouseMove(e.x,e.y)})),window.addEventListener("mousedown",(()=>{this.mouseDown()})),window.addEventListener("mouseup",(()=>{this.mouseUp()}))}update(){const{delta:e}=window.gameTime;this.checkProjectileEnemyCollision(e),this.towerManager.update(),window.enemySpawner.update(e),window.projectileEngine.update(e),this.updateNewTowerDestinationTile()}isValidTowerStage(){return!l.isOverMouseMenu()&&!!l.isOverGameBounds()&&!!this.menu.hasStagedTower}updateNewTowerDestinationTile(){if(!this.isValidTowerStage())return;const e=Math.floor(window.mouseInfo.x/window.tileMap.tileWidth),t=Math.floor((window.mouseInfo.y-window.tileMap.tileHeight)/window.tileMap.tileHeight);e<0||t<0||(this.newTowerDestinationTile=window.tileMap.tileMatrix[t][e])}checkProjectileEnemyCollision(e){this.collisionCheckElapsed+=e,this.collisionCheckElapsed<=.001||(this.collisionCheckElapsed=0,window.enemySpawner.enemies.forEach((e=>{window.projectileEngine.projectiles.forEach((t=>{t.active&&e.active&&e.bounds.containsRect(t.bounds)&&(e.hit(),t.active=!1)}))})))}render(){window.renderEngine.clearRect(window.tileMap.bounds),window.tileMap.draw(),window.renderEngine.renderText(window.levelManager.currentLevel.levelName,64,32,"red",32,"impact"),window.enemySpawner.draw(),window.projectileEngine.draw(),this.towerManager.draw(),this.menu.draw(),this.renderOccupiedTiles()}renderOccupiedTiles(){if(!this.isValidTowerStage())return;const e=this.newTowerDestinationTile?this.newTowerDestinationTile.bounds:s.Rectangle.empty;this.towerManager.isTileEmpty(e)||window.renderEngine.renderRect(e,"red",!0)}static isOverMouseMenu(){return l.getElementBounds("tower_menu").containsRect(new s.Rectangle(window.mouseInfo.x,window.mouseInfo.y,1,1))}static isOverGameBounds(){return window.tileMap.bounds.containsRect(new s.Rectangle(window.mouseInfo.x,window.mouseInfo.y,1,1))}static getElementBounds(e){const t=document.getElementById(e);return new s.Rectangle(t.clientLeft,t.clientTop,t.clientWidth,t.clientHeight)}mouseDown(){if(this.menu.hasStagedTower)return;const e=new s.Rectangle(window.mouseInfo.x,window.mouseInfo.y-this.menu.menuHeight,1,1);this.towerManager.mouseDown(e)}mouseUp(){this.isValidTowerStage()&&this.towerManager.isTileEmpty(this.newTowerDestinationTile.bounds)&&(this.menu.clearStagedTower(),this.towerManager.createTower(this.newTowerDestinationTile))}mouseMove(e,t){}resize(){}}t.GameScene=l},420:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LoadScene=void 0;const s=i(534);t.LoadScene=class{constructor(){this.loadScreenRect=window.gameConfig.loadScreenRect}init(){}update(){this.loadingText=`${window.assetManager.loadedAssetCount}/${window.assetManager.totalAssets}`,window.assetManager.update(),window.assetManager.loadCompleted&&window.sceneManager.toggleActiveScene(s.Scenes.game)}render(){window.renderEngine.renderText(this.loadingText,0,0,"blue",30,"impact"),window.renderEngine.renderRect(this.loadScreenRect,"black",!0)}mouseDown(){}mouseUp(){}mouseMove(e,t){}resize(){}}},586:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SceneManager=void 0;const s=i(661),n=i(420),o=i(534);t.SceneManager=class{constructor(){this.loadScene=new n.LoadScene,this.gameScene=new s.GameScene}toggleActiveScene(e){e===o.Scenes.loading&&(this.currentScene=this.loadScene),e===o.Scenes.game&&(this.currentScene=this.gameScene),this.currentScene.init()}update(){this.currentScene&&this.currentScene.update()}render(){this.currentScene&&this.currentScene.render()}}},534:(e,t)=>{var i;Object.defineProperty(t,"__esModule",{value:!0}),t.Scenes=void 0,(i=t.Scenes||(t.Scenes={}))[i.loading=0]="loading",i[i.game=1]="game"},865:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Tile=void 0,t.Tile=class{constructor(e,t){this.fontSize=12,this.bounds=e,this.imageObject=t}draw(e,t){window.renderEngine.renderImageSource(this.imageObject.image,this.imageObject.sourceRectangle,this.imageObject.destinationRectangle)}}},143:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TileMap=void 0;const s=i(70),n=i(274),o=i(865);t.TileMap=class{constructor(e){this.wayPoints=[],this.rows=window.gameConfig.tileMapRows,this.cols=window.gameConfig.tileMapCols,this.tileWidth=window.gameConfig.tileMapTileWidth,this.tileHeight=window.gameConfig.tileMapTileHeight,this.tileImage=e,this.initTileMatrix(),this.bounds=new n.Rectangle(0,0,this.cols*this.tileWidth,this.rows*this.tileHeight)}initTileMatrix(){const e=[[1,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0],[1,1,1,0,1,1,1,0,0,0],[0,0,1,0,1,0,1,0,0,0],[0,0,1,1,1,0,1,0,0,0],[0,0,0,0,0,0,1,0,0,0],[0,0,0,0,1,1,1,0,0,0],[0,0,0,0,1,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,1,1,1,1,1]];this.wayPoints=[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:2,y:3},{x:2,y:4},{x:3,y:4},{x:4,y:4},{x:4,y:3},{x:4,y:2},{x:5,y:2},{x:6,y:2},{x:6,y:3},{x:6,y:4},{x:6,y:5},{x:6,y:6},{x:5,y:6},{x:4,y:6},{x:4,y:7},{x:4,y:8},{x:5,y:8},{x:5,y:9},{x:6,y:9},{x:7,y:9},{x:8,y:9},{x:9,y:9}],this.tileMatrix=[];for(let t=0;t<this.rows;t+=1){this.tileMatrix[t]=[];for(let i=0;i<this.cols;i+=1){const s=e[t][i],a=this.getTileImageObject(s,this.tileWidth*i,this.tileHeight*t),h=new n.Rectangle(this.tileWidth*i,this.tileHeight*t,this.tileWidth,this.tileHeight);this.tileMatrix[t][i]=new o.Tile(h,a)}}}getTileImageObject(e,t,i){const n=new s.ImageObject;return n.image=this.tileImage,n.x=t,n.y=i,n.width=this.tileWidth,n.height=this.tileHeight,n.swidth=32,n.sheight=32,0===e?(n.sx=0,n.sy=0):(n.sx=32,n.sy=0),n}draw(){for(let e=0;e<this.rows;e+=1)for(let t=0;t<this.cols;t+=1)this.tileMatrix[e][t].draw(t,e)}}},891:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BaseTower=void 0;const s=i(274),n=i(779);t.BaseTower=class{constructor(e,t){this.shootRange=2e4,this.rotation=0,this.selected=!1,this.southAngle=180,this.destinationTile=e,this.towerImage=t,this.center=n.Vector2.empty}update(){this.center.x=this.destinationTile.bounds.getCenterWidth,this.center.y=this.destinationTile.bounds.getCenterHeight,this.destinationTile.bounds.update(),this.updateTarget(),this.updateTargetInRange(),this.updateRotation()}draw(){this.drawRange();const e=new s.Rectangle(0,0,32,32);window.renderEngine.renderRotatedImageSource(this.towerImage,e,this.destinationTile.bounds,this.rotation),this.selected&&this.drawSelection()}setSelection(e){this.selected=e}drawRange(){window.renderEngine.renderEllipse(this.center.x,this.center.y,"red",.5,this.shootRange,!1)}drawSelection(){window.renderEngine.renderEllipse(this.center.x,this.center.y,"yellow",.5,this.destinationTile.bounds.height,!0)}updateTargetInRange(){null!=this.target&&this.target.active&&(this.targetDirection=this.center.subtract(this.target.center),this.targetDirection.magnitude()<=this.shootRange)?this.targetInRange=!0:this.targetInRange=!1}updateRotation(){this.target?this.targetInRange&&this.calculateRotation(new n.Vector2(this.target.center.x-this.center.x,this.target.center.y-this.center.y)):this.rotation<-90&&this.rotation>-270?this.rotation-=1.5:this.rotation>-180&&this.rotation<0?this.rotation+=1.5:this.rotation=-270}calculateRotation(e){this.rotation=Math.atan2(e.y,e.x)*(180/Math.PI)-180}updateTarget(){let e,t=0,i=99999;const s=window.enemySpawner.enemies.filter((e=>e.active));for(let n=0;n<s.length;n+=1){const o=s[n];t=o.center.distance(this.center),(t<i||null==e)&&(i=t,e=o)}this.target=e}}},193:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PlainTower=void 0;const s=i(779),n=i(891);class o extends n.BaseTower{constructor(e,t){super(e,t),this.plainTowerShootSpeed=window.gameConfig.plainTowerShootSpeed,this.plainTowerShootRate=window.gameConfig.plainTowerShootRate,this.shootElapsed=0,this.accuracyEnabled=!0,super.shootRange=window.gameConfig.plainTowerShootRange}update(){super.update(),this.updateShoot()}updateShoot(){const{delta:e}=window.gameTime;if(this.shootElapsed+=e,this.targetInRange&&this.shootElapsed>=this.plainTowerShootRate){this.shootElapsed=0;let e=s.Vector2.empty;e=this.accuracyEnabled?this.target.futurePosition.subtract(this.center):this.target.center.subtract(this.center);const t=e.normalize();window.projectileEngine.activateProjectile(this.center,t,this.plainTowerShootSpeed)}}draw(){super.draw()}}t.PlainTower=o},501:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TowerManager=void 0;const s=i(193);class n{constructor(){this.towers=[],this.towerImage=window.assetManager.getImage("towerplain")}update(){this.towers.forEach((e=>{e.update()}))}draw(){this.towers.forEach((e=>{e.draw()}))}isTileEmpty(e){return 0===this.towers.filter((t=>t.destinationTile.bounds.left===e.left&&t.destinationTile.bounds.top===e.top)).length}createTower(e){this.towers.push(new s.PlainTower(e,this.towerImage))}mouseDown(e){this.selectTower(e)}selectTower(e){let t=!1,i=null;for(let s=0;s<this.towers.length;s+=1){const n=this.towers[s];n.destinationTile.bounds.containsRect(e)?(n.setSelection(!0),t=!0,i=n):n.setSelection(!1)}n.setSelectionInfo(t,i)}static setSelectionInfo(e,t){const i=document.getElementById("info_pane");e?(i.classList.remove("hidden"),t&&(document.getElementById("info_img").src=window.assetManager.getImage("towerplain").src,document.getElementById("info_text").innerText="Plain Tower")):i.classList.add("hidden")}}t.TowerManager=n},346:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameConfig=void 0;const s=i(274),n=i(779);t.GameConfig=class{constructor(){this.canvasWidth=480,this.canvasHeight=480,this.backgroundBounds=new s.Rectangle(0,0,this.canvasWidth,this.canvasHeight),this.loadScreenRect=new s.Rectangle(0,0,this.canvasWidth,this.canvasHeight),this.tileMapRows=10,this.tileMapCols=10,this.tileMapTileWidth=48,this.tileMapTileHeight=48,this.plainTowerShootSpeed=250,this.plainTowerShootRate=.7,this.plainTowerShootRange=150,this.enemyFuturePositionModifier=20,this.menuStagedTowerImageWidth=48,this.menuStagedTowerImageHeight=48,this.enemySize=new n.Vector2(48,48)}}},151:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RenderEngine=void 0;const s=i(274);t.RenderEngine=class{constructor(){const e=document.getElementById("game-canvas");this.context=e.getContext("2d")}clearRect(e){e&&this.context.clearRect(e.left,e.top,e.width,e.height)}renderRect(e,t,i){const s=this.context.fillStyle,n=this.context.strokeStyle;i?(this.context.fillStyle=t,this.context.fillRect(e.left,e.top,e.width,e.height)):(this.context.beginPath(),this.context.strokeStyle=t,this.context.strokeRect(e.left,e.top,e.width,e.height)),this.context.fillStyle=s,this.context.strokeStyle=n}renderText(e,t,i,s,n,o){this.context.fillStyle=s,this.context.font=`${n}px ${o}`,this.context.fillText(e,t,i)}renderImageRect(e,t){this.renderImage(e,t.left,t.top,t.width,t.height)}renderImage(e,t,i,s=null,n=null){const o=null==s?e.width:s,a=null==n?e.height:n;this.context.drawImage(e,t,i,o,a)}renderImageSource(e,t,i){t.left<0||t.top<0||t.height<=0||t.height<=0||this.context.drawImage(e,t.left,t.top,t.width,t.height,i.left,i.top,i.width,i.height)}renderRotatedImageSource(e,t,i,n=0){this.context.save(),this.context.translate(i.getCenterWidth,i.getCenterHeight),this.context.rotate((n-90)*(Math.PI/180));const o=new s.Rectangle(-i.width/2,-i.height/2,i.width,i.height);this.renderImageSource(e,t,o),this.context.restore()}renderEllipse(e,t,i,s,n,o){this.context.save(),this.context.globalAlpha=s,this.context.strokeStyle=i,this.context.beginPath(),this.context.ellipse(e,t,n,n,Math.PI/4,0,2*Math.PI),o?this.context.fill():this.context.stroke(),this.context.restore()}}}},t={};function i(s){var n=t[s];if(void 0!==n)return n.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,i),o.exports}(()=>{const e=i(709),t=i(681),s=i(346),n=i(151),o=i(586),a=i(534);class h{constructor(){window.gameConfig=new s.GameConfig,window.renderEngine=new n.RenderEngine,window.assetManager=new e.AssetManager,window.assetManager.init(),window.sceneManager=new o.SceneManager,window.sceneManager.toggleActiveScene(a.Scenes.loading),window.gameTime=new t.GameTime,window.mouseInfo={x:0,y:0},window.addEventListener("mousemove",(e=>{h.mouseMove(e)}))}start(){this.running||(this.running=!0,this.loop())}loop(){window.gameTime.update(),window.sceneManager&&(window.sceneManager.update(),window.sceneManager.render()),requestAnimationFrame((()=>this.loop()))}static mouseMove(e){window.mouseInfo={x:e.x,y:e.y}}}window.addEventListener("load",(()=>{(new h).start()}))})()})();
//# sourceMappingURL=bundle.js.map