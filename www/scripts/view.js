var app = function(app) {  // module pattern
    app.makeView = function(m, stage) {
        const v = {};

        var stageW = stage.width;
        var stageH = stage.height;

        // MAIN MENU START
        const menuPage = v.menuPage = new Container(stageW,stageH);
        const playButton = v.playButton = new Rectangle(50,50);
        const playButton2 = v.playButton2 = new Rectangle(50,50,grey);
        const menu = v.menu = new Tabs({
          width:stageW, height:stageH,
          tabs:[playButton,playButton2],
          backgroundColor:black,
          color:black
        }).addTo(menuPage);
        const menuPageLayout = new Layout(menuPage,[
          {object:menu}
        ]);
        // MAIN MENU END

        // BATTLE PAGE START
        const battlePage = v.battlePage = new Container(stageW,stageH);
        var bg = frame.asset("bg.png").center(battlePage).mov(0,20);
        var bgScroll = new Scroller(bg,1,true,1,null,stage);
        var customizeButton = v.customizeButton = new Rectangle(stageW*.20,stageH*.20,grey);
        var settingsButton = v.settingsButton = new Rectangle(stageW*.20,stageH*.20,purple);
        var pausePower = v.pausePower = new Rectangle(stageW*.60,stageH*.20,white);
        v.topGui = new Tile({
          obj:series(settingsButton,customizeButton,pausePower),
          cols:3, rows:1,
          height:stageH*.20, width:stageW,
          clone:false
        }).addTo(battlePage);

        var top = new Rectangle(stageW,stageH*.20,"rgba(0,0,0,0)").addTo(battlePage).mov(-10,40);
        var topImg = frame.asset("top.png").sca(1).addTo(top).mov(-10,40);

        var middle = new Rectangle(stageW,stageH*.20,"rgba(0,0,0,0)").addTo(battlePage).mov(-10,20);
        var middleImg = frame.asset("middle.png").sca(1).addTo(middle).mov(-10,20);

        var bottom = new Rectangle(stageW,stageH*.20,"rgba(0,0,0,0)").addTo(battlePage).mov(-10);
        var bottomImg = frame.asset("bottom.png").sca(1).addTo(bottom).mov(-10);

        v.path = {
          filled:false,
          hero:0,
          enemies:0,
          shape:top
        }
        v.path2 = {
          filled:false,
          hero:0,
          enemies:0,
          shape:middle
        }
        v.path3 = {
          filled:false,
          hero:0,
          enemies:0,
          shape:bottom
        }

        var heroArea1 = v.heroArea1 = new Rectangle(stageW*.25,stageH*.20,green)//.addTo(battlePage)//.center().mov(-100);
        var heroArea2 = v.heroArea2 = new Rectangle(stageW*.25,stageH*.20,blue)//.addTo(battlePage)//.center().mov(100);
        var heroArea3 = v.heroArea3 = new Rectangle(stageW*.25,stageH*.20,orange)//.addTo(battlePage)//.center().mov(0,100);
        var heroArea4 = v.heroArea4 = new Rectangle(stageW*.25,stageH*.20,purple)//.addTo(battlePage)//.center().mov(200,100);

        var hero1Body = v.hero1Body = frame.asset("hero1.png").sca(.22)//new Circle(heroArea1.width*.18,green);
        var hero2Body = v.hero2Body = frame.asset("hero2.png").sca(.22)//new Circle(heroArea2.width*.18,blue);
        var hero3Body = v.hero3Body = frame.asset("hero3.png").sca(.22)//new Circle(heroArea3.width*.18,orange);
        var hero4Body = v.hero4Body = frame.asset("hero4.png").sca(.22)//new Circle(heroArea4.width*.18,pink);

        var sniper = v.sniper = new Rectangle(150,15,grey);//.center(hero1Body).mov(50);
        var sword = v.sword = new Rectangle(10,90,grey);//.center(hero2Body).mov(40,-20);
        var rock = v.rock = new Rectangle(30,30,"brown");//.center(hero3Body);
        var rocket = v.rocket = new Rectangle(100,40,"grey");//.center(hero4Body).mov(25);

        var hero1Name = v.hero1Name = "Ben";
        var hero2Name = v.hero2Name = "Steve";
        var hero3Name = v.hero3Name = "Tommy";
        var hero4Name = v.hero4Name = "Frank";

        v.enemyArray = [];
        v.enemy = new Circle(v.heroArea1.width*.10,red);

        v.enemyArray2 = [];
        v.enemy2 = new Circle(v.heroArea2.width*.10,red);

        v.enemyArray3 = [];
        v.enemy3 = new Circle(v.heroArea3.width*.10,red);

        v.enemy1 = frame.asset("enemy1.png").sca(.13);

        var hero1 = v.hero1 = {
          name:hero1Name,
          level:0,
          exp:0,
          hp:100,
          weapon:sniper,
          range:200,
          damage:50,
          body:hero1Body,
          active:false,
          copy:copy(hero1Body,true)
        }
        v.attackArray = [];

        var hero2 = v.hero2 = {
          name:hero2Name,
          level:0,
          exp:0,
          hp:100,
          weapon:sword,
          range:10,
          damage:100,
          body:hero2Body,
          active:false,
          copy:copy(hero2Body,true)
        }
        v.attackArray2 = [];

        var hero3 = v.hero3 = {
          name:hero3Name,
          level:0,
          exp:0,
          hp:100,
          weapon:rock,
          range:10,
          damage:20,
          body:hero3Body,
          active:false,
          copy:copy(hero3Body,true)
        }
        v.attackArray3 = [];

        var hero4 = v.hero4 = {
          name:hero4Name,
          level:0,
          exp:0,
          hp:100,
          weapon:rocket,
          range:50,
          damage:100,
          body:hero4Body,
          active:false,
          copy:copy(hero4Body,true)
        }
        v.attackArray4 = [];

        v.heroAreaObject1 = {
          area:heroArea1,
          currentHero:hero1,
          copy:copy(hero1,true),
          weaponCopy:copy(hero1.weapon,true)
        };
        v.heroAreaObject2 = {
          area:heroArea2,
          currentHero:hero2,
          copy:copy(hero2,true),
          weaponCopy:copy(hero2.weapon,true)
        }
        v.heroAreaObject3 = {
          area:heroArea3,
          currentHero:hero3,
          copy:copy(hero3,true),
          weaponCopy:copy(hero3.weapon,true)
        }
        v.heroAreaObject4 = {
          area:heroArea4,
          currentHero:hero4,
          copy:copy(hero4,true),
          weaponCopy:copy(hero4.weapon,true)
        }

        v.botGui = new Tabs({
          width:stageW,
          height:stageH*.20,
          tabs:[v.heroAreaObject1.area,v.heroAreaObject2.area,v.heroAreaObject3.area,v.heroAreaObject4.area],
          currentSelected:false,
          keyEnabled:false
        }).addTo(battlePage);

        const battlePageLayout = new Layout(battlePage,[
          {object:v.topGui},
          {object:v.path.shape},
          {object:v.path2.shape},
          {object:v.path3.shape},
          {object:v.botGui}
        ]);
        // END BATTLE PAGE

        // CUSTOMIZE PAGE START
        // CUSTOMIZE PAGE END

        // SETTINGS PAGE START
        const settingsPage = v.settingsPage = new Container(stageW,stageH);
        v.normal = new Label({
          text:"normal mode",
          size:42,
          color:white,
          rollColor:black
        }).center(settingsPage);

        v.hard = new Label({
          text:"hard mode",
          size:42,
          color:white,
          rollColor:black
        }).center(settingsPage);

        v.back = new Label({
          text:"back",
          size:32,
          color:white,
          rollColor:black
        }).center(settingsPage);

        const settingsPageLayout = new Layout(settingsPage,[
          {object:v.normal},
          {object:v.hard},
          {object:v.back}
        ]);
        // SETTINGS PAGE END

         v.manager = new Manager();

         v.manager.add(menuPageLayout);
         v.manager.add(battlePageLayout);
         v.manager.add(settingsPageLayout);

         const pages = v.pages = new Pages([
           {page:menuPage},
           {page:battlePage},
           {page:settingsPage}
         ],"slide").addTo();

         v.manager.add(pages);

        return v;
    }
    return app; // module pattern
}(app||{}); // module pattern
