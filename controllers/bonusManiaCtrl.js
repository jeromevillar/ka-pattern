
const db = require('../models');
const Model = db.bonusmania;
const gameCode = "BonusMania";

exports.loadPattern = async (req, res) => {
    let resData = req.body;

    let big = await Model.max('big');
    if (!big) {
        big = 0;
    }
    big++;
    
    const betAmount = 0.15;
    let totalWin = 0;
    let balance = 0;
    try {
        if (resData.res.md.tw && resData.res.md.tw > 0) {
            totalWin = resData.res.md.tw / 100.0;
        }

        let isFree = false;
        if (resData.res.md.as) {
            isFree = true;
        }   

        console.log("=============================> big:" + big + " win:" + totalWin);
    
        await Model.create({
            gameCode: gameCode,
            pType: isFree ? 'free' : totalWin ? 'base-win' : 'base-zero',
            type: isFree ? 'free' : 'spin',
            gameDone: 1,
            big,
            small: 1,
            win: totalWin ? totalWin : 0,
            totalWin: totalWin ? totalWin : 0,
            totalBet: betAmount,
            virtualBet: betAmount,
            rtp: totalWin ? totalWin / betAmount * 100 : 0,
            balance: balance,
            pattern: JSON.stringify(resData)
        });
    } catch(e) {
        console.log("error:" + e);
    }
    
    return res.status(200).send({
        result: 'success'
    });
}