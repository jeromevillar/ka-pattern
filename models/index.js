const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    'ka_pattern',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 20,
            min: 0,
            acquire: 60000,
            idle: 10000
        }
    }
);


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bonusmania = require("./bonusmania.model")(sequelize, Sequelize);
db.treasurebowl = require("./treasurebowl.model")(sequelize, Sequelize);
db.luck88 = require("./luck88.model")(sequelize, Sequelize);
db.goldenbull = require("./goldenbull.model")(sequelize, Sequelize);
db.cocorico = require("./cocorico.model")(sequelize, Sequelize);
db.treasuretiger = require("./treasuretiger.model")(sequelize, Sequelize);
db.kingofdragon = require("./kingofdragon.model")(sequelize, Sequelize);
db.fortuneganesha = require("./fortuneganesha.model")(sequelize, Sequelize);
db.fantasyoktoberfest = require("./fantasyoktoberfest.model")(sequelize, Sequelize);
db.yummythanksgiving = require("./yummythanksgiving.model")(sequelize, Sequelize);
db.blazingcircus = require("./blazingcircus.model")(sequelize, Sequelize);
db.edgeofthestars = require("./edgeofthestars.model")(sequelize, Sequelize);
db.greatestshow = require("./greatestshow.model")(sequelize, Sequelize);
db.sultansfortune = require("./sultansfortune.model")(sequelize, Sequelize);
db.cinderellasglassslipper = require("./cinderellasglassslipper.model")(sequelize, Sequelize);
db.yuncaitongzi = require("./yuncaitongzi.model")(sequelize, Sequelize);
db.genghiskhan = require("./genghiskhan.model")(sequelize, Sequelize);
db.bookofskull = require("./bookofskull.model")(sequelize, Sequelize);
db.wuzetian = require("./wuzetian.model")(sequelize, Sequelize);
db.butterflywilddance = require("./butterflywilddance.model")(sequelize, Sequelize);
db.bombingfruit = require("./bombingfruit.model")(sequelize, Sequelize);
db.legendofsword = require("./legendofsword.model")(sequelize, Sequelize);
db.buzzkillbonanza = require("./buzzkillbonanza.model")(sequelize, Sequelize);
db.aliceinwonderland = require("./aliceinwonderland.model")(sequelize, Sequelize);
db.chivalrousgirl = require("./chivalrousgirl.model")(sequelize, Sequelize);
db.tao = require("./tao.model")(sequelize, Sequelize);
db.boxingroo = require("./boxingroo.model")(sequelize, Sequelize);
db.dimsum = require("./dimsum.model")(sequelize, Sequelize);
db.dragonslegend = require("./dragonslegend.model")(sequelize, Sequelize);
db.magicalstore = require("./magicalstore.model")(sequelize, Sequelize);
db.wilddetective = require("./wilddetective.model")(sequelize, Sequelize);
db.firefighters = require("./firefighters.model")(sequelize, Sequelize);
db.gypsy = require("./gypsy.model")(sequelize, Sequelize);
db.jellymania = require("./jellymania.model")(sequelize, Sequelize);
db.theguardofhades = require("./theguardofhades.model")(sequelize, Sequelize);
db.monsterparade = require("./monsterparade.model")(sequelize, Sequelize);
db.daji = require("./daji.model")(sequelize, Sequelize);
db.legendofthewhitesnake = require("./legendofthewhitesnake.model")(sequelize, Sequelize);
db.whitesnakelegend = require("./whitesnakelegend.model")(sequelize, Sequelize);
db.monsterfile = require("./monsterfile.model")(sequelize, Sequelize);
db.wizardry = require("./wizardry.model")(sequelize, Sequelize);



module.exports = db;
