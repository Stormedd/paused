var app = function(app) {  // module pattern
    app.makeView = function(m, stage) {
        const v = {};

        var stageW = stage.width;
        var stageH = stage.height;

        // MAIN MENU START
        const menuPage = v.menuPage = new Container(stageW,stageH);
        const playButton = v.playButton = new Rectangle(50,50);
        const playButton2 = v.playButton2 = new Rectangle(50,50);
        const menu = v.menu = new Tile({
          obj:series(playButton,playButton2),
          cols:2
        }).addTo(menuPage)
        const menuPageLayout = new Layout(menuPage,[
          {object:menu}
        ]);
        // MAIN MENU END

        // BATTLE PAGE START
        const battlePage = v.battlePage = new Container(stageW,stageH);
        var customizeButton = v.customizeButton = new Rectangle(stageW*.20,stageH*.20,grey);
        var settingsButton = v.settingsButton = new Rectangle(stageW*.20,stageH*.20,purple);
        var pausePower = v.pausePower = new Rectangle(stageW*.60,stageH*.20,white);
        v.topGui = new Tile({
          obj:series(settingsButton,customizeButton,pausePower),
          cols:3, rows:1,
          height:stageH*.20, width:stageW,
          clone:false
        }).addTo(battlePage);

        v.topPath = new Rectangle(stageW,stageH*.20,green).addTo(battlePage);
        v.midPath = new Rectangle(stageW,stageH*.20,blue).addTo(battlePage);
        v.botPath = new Rectangle(stageW,stageH*.20,orange).addTo(battlePage);
        v.pathArray = [v.topPath,v.midPath,v.botPath];

        v.heroArea = new Rectangle(v.topPath.width*.10,v.topPath.height,grey).addTo(v.topPath);
        v.heroArea2 = new Rectangle(v.midPath.width*.10,v.midPath.height,grey).addTo(v.midPath);
        v.heroArea3 = new Rectangle(v.botPath.width*.10,v.botPath.height,grey).addTo(v.botPath);
        v.areaArray = [v.heroArea,v.heroArea2,v.heroArea3];

        v.attackArray = [];
        v.heroAttack = new Circle(8,black);
        v.hero = new Circle(v.heroArea.width*.40,green).center(v.heroArea);//.pos(v.topPath.width*.001,v.topPath.height*4.6);

        v.attackArray2 = [];
        v.heroAttack2 = new Circle(8,black);
        v.hero2 = new Circle(v.heroArea2.width*.40,blue).center(v.heroArea2);

        v.attackArray3 = [];
        v.heroAttack3 = new Circle(8,black);
        v.hero3 = new Circle(v.heroArea3.width*.40,orange).center(v.heroArea3);

        v.enemyArray = [];
        v.enemy = new Circle(v.heroArea.width*.40,red);

        v.enemyArray2 = [];
        v.enemy2 = new Circle(v.heroArea2.width*.40,red);

        v.enemyArray3 = [];
        v.enemy3 = new Circle(v.heroArea3.width*.40,red);

        v.heroSelect1 = new Rectangle(stageW*.25,stageH*.20,black);
        v.heroSelect2 = new Rectangle(stageW*.25,stageH*.20,black);
        v.heroSelect3 = new Rectangle(stageW*.25,stageH*.20,black);
        v.heroSelect4 = new Rectangle(stageW*.25,stageH*.20,black);
        v.botGui = new Tile({
          obj:series(v.heroSelect1,v.heroSelect2,v.heroSelect3,v.heroSelect4),
          cols:4, rows:1,
          height:stageH*.20, width:stageW
        }).addTo(battlePage);

        v.heroAvatar1 = new Circle(v.heroSelect1.width*.20,green).center(v.botGui.children[0]);
        v.heroAvatar2 = new Circle(v.heroSelect2.width*.20,blue).center(v.botGui.children[1]);
        v.heroAvatar3 = new Circle(v.heroSelect3.width*.20,orange).center(v.botGui.children[2]);
        v.heroAvatar4 = new Circle(v.heroSelect4.width*.20,pink).center(v.botGui.children[3]);

        v.pauseActive = new Rectangle(stageW,stageH*.60,blue).center(battlePage).alp(0);

        const battlePageLayout = new Layout(battlePage,[
          {object:v.topGui},
          {object:v.topPath},
          {object:v.midPath},
          {object:v.botPath},
          {object:v.botGui}
        ]);
        // BATTLE PAGE END

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
