var app = function(app) {  // module pattern
    app.makeController = function(m, v, stage) {
        const c = {};

        frame.on("resize", () => {
            stage.update();
        });

        v.playButton.on("click",function () {
          zog("play");
          v.pages.go(v.battlePage,"down");
        });

        v.settingsButton.on("click",function () {
          zog("settings");
          v.pages.go(v.settingsPage,"right");
          Ticker.remove(gameTicker);
          attackInterval.pause();
          enemySpawn.pause();
          zog("paused");
        });

        v.pausePower.on("click",function () {
          zog("THE POWERRRRRR");
          pausePower();
        });

        v.back.on("click",function () {
          zog("back");
          v.pages.go(v.battlePage,"left");
          Ticker.add(gameTicker);
          attackInterval.pause(false);
          enemySpawn.pause(false);
        });

        // storing the heros position in his area at start
        var lastHeroPosX = v.hero.x;
        var lastHeroPosY = v.hero.y;

        // over encompassing ticker for game and movements
        var gameTicker = Ticker.add(function () {
          // Forcing the hero back to his area if he is
          // let go of outside of it
          v.hero.on("pressmove",function () {
            v.hero.x = event.clientX;
            v.hero.y = event.clientY;
          });
          v.hero.on("pressup",function () {
            if (v.hero.x > v.heroArea.x+v.heroArea.width ||
                v.hero.y > v.heroArea.y+v.heroArea.height) {
              v.hero.x = lastHeroPosX;
              v.hero.y = lastHeroPosY;
            }
          });

          // moving individually created enemies and bullets
          loop(v.enemyArray,function (enmy) {
            enmy.shape.x -= 2;
          });
          loop(v.enemyArray2,function (enmy) {
            enmy.shape.x -= 1;
          });
          loop(v.enemyArray3,function (enmy) {
            enmy.shape.x -= 3;
          });

          loop(v.attackArray,function (atk) {
            atk.shape.x += 10;
          });
          loop(v.attackArray2,function (atk) {
            atk.shape.x += 20;
          });
          loop(v.attackArray3,function (atk) {
            atk.shape.x += 3;
          });

          // checking for contact between a bullet and an enemy
          // enemy takes damage and disappears when hp=0
          loop(v.attackArray,function (a) {
            loop(v.enemyArray,function (e) {
              // if bullet touches enemy, hurt enemy
              if (e.shape.hitTestCircle(a.shape)) {
                a.shape.removeFrom();
                //v.attackArray.shift();
                e.hp-=a.dmg;
                if (e.hp <=0) {
                  e.shape.removeFrom();
                  //v.enemyArray.shift();
                }
              }

              // if bullet reaches end of screen, destroy bullet
              if (a.shape.x > stage.width) {
                a.shape.removeFrom();
                //v.attackArray.shift();
              }
              // if enemy reaches end of screen, destroy enemy
              if (e.shape.x < -stage.width) {
                e.shape.removeFrom();
                //v.enemyArray.shift();
              }
            },true);
          },true);

          loop(v.attackArray2,function (a2) {
            loop(v.enemyArray2,function (e2) {
              // if bullet touches enemy, hurt enemy
              if (e2.shape.hitTestCircle(a2.shape)) {
                a2.shape.removeFrom();
                v.attackArray2.shift();
                e2.hp-=a2.dmg;
                if (e2.hp <=0) {
                  e2.shape.removeFrom();
                  //v.enemyArray2.shift();
                }
              }

              // if bullet reaches end of screen, destroy bullet
              if (a2.shape.x > stage.width) {
                a2.shape.removeFrom();
                //v.attackArray2.shift();
              }
              // if enemy reaches end of screen, destroy enemy
              if (e2.shape.x < -stage.width) {
                e2.shape.removeFrom();
                //v.enemyArray2.shift();
              }
            },true);
          },true);

          loop(v.attackArray3,function (a3) {
            loop(v.enemyArray3,function (e3) {
              // if bullet touches enemy, hurt enemy
              if (e3.shape.hitTestCircle(a3.shape)) {
                a3.shape.removeFrom();
                v.attackArray3.shift();
                e3.hp-=a3.dmg;
                if (e3.hp <=0) {
                  e3.shape.removeFrom();
                  //v.enemyArray3.shift();
                }
              }

              // if bullet reaches end of screen, destroy bullet
              if (a3.shape.x > stage.width) {
                a3.shape.removeFrom();
                //v.attackArray3.shift();
              }
              // if enemy reaches end of screen, destroy enemy
              if (e3.shape.x < -stage.width) {
                e3.shape.removeFrom();
                //v.enemyArray3.shift();
              }
            },true);
          },true);
        });

        // interval for spawning bullets shot by heroes
        var attackInterval = interval(500,function () {
          var attack = {
            dmg:2,
            shape:copy(v.heroAttack,true)
          }
          v.attackArray.push(attack);
          attack.shape.center(v.heroArea);

          var attack2 = {
            dmg:5,
            shape:copy(v.heroAttack2,true)
          }
          v.attackArray2.push(attack2);
          attack2.shape.center(v.heroArea2);

          var attack3 = {
            dmg:1,
            shape:copy(v.heroAttack3,true)
          }
          v.attackArray3.push(attack3);
          attack3.shape.center(v.heroArea3);
        });

        // interval for spawning enemies
        var enemySpawn = interval(4000,function () {
          var enemy = {
            hp:10,
            shape:copy(v.enemy,true)
          }
          v.enemyArray.push(enemy);
          enemy.shape.addTo(v.topPath).pos(stage.width,v.topPath.height-enemy.shape.width-5);

          var enemy2 = {
            hp:10,
            shape:copy(v.enemy2,true)
          }
          v.enemyArray2.push(enemy2);
          enemy2.shape.addTo(v.midPath).pos(stage.width,v.midPath.height-enemy2.shape.width-5);

          var enemy3 = {
            hp:10,
            shape:copy(v.enemy3,true)
          }
          v.enemyArray3.push(enemy3);
          enemy3.shape.addTo(v.botPath).pos(stage.width,v.botPath.height-enemy3.shape.width-5);
        });

        function pausePower(){
          Ticker.remove(gameTicker);
          attackInterval.pause();
          enemySpawn.pause();

          timeout(5000,function () {
            Ticker.add(gameTicker);
            attackInterval.pause(false);
            enemySpawn.pause(false);
          });
        }

        function normalPause(){
          gameTicker.remove();
          attackInterval.pause();
          enemySpawn.pause();
          zog("paused");
        }


        return c;
    }
    return app; // module pattern
}(app||{}); // module pattern
