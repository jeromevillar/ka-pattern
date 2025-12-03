
const db = require('../models');
const Model = db.butterflywilddance;
const gameCode = "ButterflyWildDance";

exports.loadPattern = async (req, res) => {
    let resData = req.body;

    let big = await Model.max('big');
    if (!big) {
        big = 0;
    }
    big++;
    
    const betAmount = 0.20 * 100;
    let gameDone = 0;
    let small = 1;
    try {
        let isFree = false;
        if (resData.res.md.fs == false && resData.res.md.fsw > 0) {
            isFree = true;
            gameDone = 0;
        } else if (resData.res.md.fs == true) {
            isFree = true;
            gameDone = 0;
            if (resData.res.md.fsr == 0) {
                gameDone = 1;
            }
        } else {
            gameDone = 1;
        }

        console.log("=============================> big:" + big + " win:" + resData.res.md.tw);
    
        if (!isFree) {
            return res.status(200).send({
                result: 'success'
            });
        }

        await Model.create({
            gameCode: gameCode,
            pType: isFree ? 'free' : resData.res.md.tw > 0 ? 'base-win' : 'base-zero',
            type: isFree ? 'free' : 'spin',
            gameDone: gameDone,
            big,
            small: small,
            win: resData.res.md.tw ? resData.res.md.tw : 0,
            totalWin: resData.res.md.tsw,
            totalBet: betAmount,
            virtualBet: betAmount,
            rtp: (resData.res.md.tw / betAmount) * 100,
            balance: resData.res.cr ? resData.res.cr : 0,
            pattern: JSON.stringify(resData)
        });
    } catch(e) {
        console.log("error:" + e);
    }
    
    return res.status(200).send({
        result: 'success'
    });
}