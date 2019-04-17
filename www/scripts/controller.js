var app = function(app) {  // module pattern
    app.makeController = function(m, v, stage) {
        const c = {};
        frame.on('resize',function () {
          v.manager.resize();
          stage.update();
        })

        var heroAreaObjectArray = [v.heroAreaObject1,v.heroAreaObject2,v.heroAreaObject3,v.heroAreaObject4];
        var heroArray = [v.hero1,v.hero2,v.hero3,v.hero4];
        var pathsArray = [v.path,v.path2,v.path3];

        v.playButton.on('click',function (e) {
          console.log(e);
          v.pages.go(v.battlePage,"down");
          playGame(heroArray,heroAreaObjectArray,pathsArray);
        });

        v.menu.on('click',function (e) {
          console.log(e);
        })

        function playGame(heros,areas,paths){
          var clicks=0;
          //console.log(v.botGui.children);

            loop(v.topGui,function (opt) {
              console.log(opt);
              opt.on("click",function (e) {
                zog(e.currentTarget.id);
                if (e.currentTarget.id==36) {
                  //settings
                  v.pages.go(v.settingsPage,"right");
                  Ticker.remove(gameTicker);
                  //attackInterval.pause();
                  enemySpawn.pause();
                }
                if (e.currentTarget.id==38) {
                  console.log("customize");
                  Ticker.remove(gameTicker);
                  //attackInterval.pause();
                  enemySpawn.pause();
                }
                if (e.currentTarget.id==40) {
                  v.topGui.mouseEnabled = false;
                  console.log("ZA WARUDO");
                  timeout(20,pausePower);
                }
              });
            });

            v.back.on("click",function () {
              zog("back");
              v.pages.go(v.battlePage,"left");
              Ticker.add(gameTicker);
              //attackInterval.pause(false);
              enemySpawn.pause(false);
            });
            //console.log(v.botGui);
            // console.log(heros);
            // console.log(areas);
            // console.log(paths);

            var areaToggled = false;
            var selectedHero;

            heros[0].body.center(areas[0].area);
            heros[1].body.center(areas[1].area);
            heros[2].body.center(areas[2].area);
            heros[3].body.center(areas[3].area);


            loop(areas,function (area) {
              Ticker.add(function (e) {
                if (area.currentHero.active==true) {
                  area.currentHero.body.alp(.4)
                } else {
                  area.currentHero.body.alp(1);
                }
              })

              area.area.on("click",function (e) {
                clicks+=1;
                if (areaToggled==false&&clicks==1&&area.currentHero.active==false) {
                  areaToggled = true;
                  e.currentTarget.color = "white";
                  selectedHero = area;
                  lastHero = selectedHero.currentHero;
                  console.log(selectedHero.currentHero.name);
                  stage.update();
                }
                if (areaToggled==true&&clicks==3) {
                  clicks=0;
                  areaToggled = false;
                  e.currentTarget.color = "black";
                  stage.update();
                }
                if (clicks>=3) {
                  clicks=0;
                }
                 console.log(clicks);
               })
            })

            loop(paths,function (path) {
              path.shape.on("click",function (e) {
                if (path.filled==false) {
                  if (areaToggled==true&&selectedHero.currentHero.active==false) {
                    areaToggled=false;
                    selectedHero.currentHero.active=true;
                    selectedHero.area.color = black;
                    path.hero = selectedHero;
                    path.filled = true;
                    selectedHero.copy.body.addTo(path.shape).sca(.13).mov(10,20);
                    selectedHero.weaponCopy.center(selectedHero.copy.body);
                    clicks=0;
                  }
                } else {
                  if (areaToggled==true&&selectedHero.currentHero.name!=path.hero.currentHero.name) {
                    clicks=0;
                    path.hero.currentHero.active = false;
                    path.hero.copy.body.removeFrom()
                    timeout(10,function () {
                      path.hero = selectedHero;
                      areaToggled=false;
                      selectedHero.currentHero.active=true;
                      selectedHero.area.color = black;
                      selectedHero.currentHero.active = true;
                      selectedHero.copy.body.addTo(path.shape).sca(.13).mov(10,20);
                      selectedHero.weaponCopy.center(selectedHero.copy.body);
                    })
                  }
                }
              })

            });

            // over encompassing ticker for game and movements
            var gameTicker = Ticker.add(function () {
              // moving individually created enemies and bullets
              loop(v.enemyArray,function (enmy) {
                enmy.shape.x -= 2;
                if (enmy.shape.x < -stage.width+stage.width*.98) {
                  //console.log("yo");
                }
              });
              loop(v.enemyArray2,function (enmy) {
                enmy.shape.x -= 1;
                if (enmy.shape.x < -stage.width+stage.width*.98) {
                  //console.log("yo");
                }
              });
              loop(v.enemyArray3,function (enmy) {
                enmy.shape.x -= 3;
                if (enmy.shape.x < -stage.width+stage.width*.98) {
                  //console.log("yo");
                }
              });

              if (v.path.filled==true) {
                if (v.enemy.x < stage.width-v.path.hero.currentHero.range) {
                  //sniper.pause(false);
                  loop(v.attackArray,function (atk) {
                    atk.shape.x += 10;
                  });
                }
              }
            });

            var sniper = interval(1000,function () {
              var attack = {
                dmg:v.path.hero.currentHero.damage,
                shape:new Circle(10,white)
              }
              v.attackArray.push(attack);
              attack.shape.center(v.path.hero.copy.body);
            })
            sniper.pause();

            // interval for spawning enemies
            var enemySpawn = interval(4000,function () {
              var enemy = {
                hp:100,
                shape:copy(v.enemy1,true)
              }
              v.enemyArray.push(enemy);
              enemy.shape.addTo(v.path.shape).mov(stage.width,30);

              var enemy2 = {
                hp:100,
                shape:copy(v.enemy1,true)
              }
              v.enemyArray2.push(enemy2);
              enemy2.shape.addTo(v.path2.shape).mov(stage.width,25);

              var enemy3 = {
                hp:100,
                shape:copy(v.enemy1,true)
              }
              v.enemyArray3.push(enemy3);
              enemy3.shape.addTo(v.path3.shape).mov(stage.width,20);
            });

            // var attackInterval = interval(500,function () {
            //   var attack = {
            //     dmg:2,
            //     shape:copy(v.heroAttack,true)
            //   }
            //   v.attackArray.push(attack);
            //   attack.shape.center(v.heroArea);
            //
            //   var attack2 = {
            //     dmg:5,
            //     shape:copy(v.heroAttack2,true)
            //   }
            //   v.attackArray2.push(attack2);
            //   attack2.shape.center(v.heroArea2);
            //
            //   var attack3 = {
            //     dmg:1,
            //     shape:copy(v.heroAttack3,true)
            //   }
            //   v.attackArray3.push(attack3);
            //   attack3.shape.center(v.heroArea3);
            // });

            function pausePower(){
              Ticker.remove(gameTicker);
              //attackInterval.pause();
              enemySpawn.pause();
              //v.pauseActive.alp(0).bot();


              timeout(5000,function () {
                Ticker.add(gameTicker);
                //attackInterval.pause(false);
                enemySpawn.pause(false);
                v.topGui.mouseEnabled = true;
              });
            }

        }// end of playGame function



        // stageUpdate = Ticker.add(function () {
        //   stage.update();
        // })
        return c;
    }
    return app; // module pattern
}(app||{}); // module pattern
