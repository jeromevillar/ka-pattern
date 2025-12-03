const pako = require('pako') ;
const WebSocket = require('ws');

let pingTimer = null;
const validTypes = [
    "open",
    "close",
    "ping",
    "pong",
    "message",
    "upgrade",
    "noop"
];

exports.delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.startPing = (ws) => {
    const PING_INTERVAL = 3000; // 3 seconds

    if (pingTimer) clearInterval(pingTimer);

    pingTimer = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send("2");
        } else {
            console.warn("❌ Cannot send ping, WebSocket not open");
            clearInterval(pingTimer);
        }
    }, PING_INTERVAL);
}
exports.stopPing = () => {
    if (pingTimer) clearInterval(pingTimer);
}
exports.sendInitial = async (ws, spinRound, token) => {
    const spinInit = `42${spinRound}["initial",{"token":"${token}","clientType":"web","deviceInfo":{"browser":{"name":"chrome","version":"142.0.0.0"},"os":{"name":"Windows","version":"","versionName":0},"platform":{"type":"DESKTOP_BROWSER"},"engine":{"name":"cocos creator 3.7.2"}},"locale":"en"}]`;
    console.log("======>", spinInit);
    ws.send(spinInit);
}
exports.sendSpin = async (ws, spinRound, token) => {
    const spinReq = `42${spinRound}["spin",{"ratioIndex":1,"ratioValue":0.05,"stakeIndex":0,"stakeValue":1,"updateStake":true,"token":"${token}","locale":"en"}]`;
    console.log("======>", spinReq);
    ws.send(spinReq);
}
exports.sendCloseSpin = async (ws, spinRound, token, spinId) => {
    const closeReq = `42${spinRound}["closeSpin",{"spinId":"${spinId}","token":"${token}","locale":"en"}]`;
    console.log("======>", closeReq);
    ws.send(closeReq);
}
exports.receiveMessage = async (res) => {
    console.log(res);
     var decObj = decodePacket(res);
    // if (decObj["type"] == "message") {
    //     console.log(decObj["data"]);
    // }
    // return inflateAndParse(res);
}
exports.saveSpin = async (Model, data, big, gameCode, betAmount, win, isFree, userBalance) => {
    await Model.create({
        gameCode: gameCode,
        pType: isFree ? 'free' : ( win > 0 ? 'base-win' : 'base-zero'),
        type: isFree ? 'free' : 'spin',
        gameDone: 1,
        big,
        small: 1,
        win: win.toFixed(2),
        totalWin: win.toFixed(2),
        totalBet: betAmount.toFixed(2),
        virtualBet: betAmount.toFixed(2),
        rtp: (win / betAmount * 100).toFixed(2),
        balance: userBalance.toFixed(2).toString(),
        pattern: JSON.stringify(data)
    });
}
function decodePacket(data) {
    if (data === undefined) {
        return {
            "type": "error",
            "data": "parser error"
        };
    }
    if (typeof data === "string") {
        // Return an object with type and optional data
        if (data.length > 1) {
            return {
                type: validTypes[firstChar],
                data: data.substring(1) // Get substring from index 1 onward
            };
        } else {
            return {
                type: validTypes[firstChar]
            };
        }
    }

    var _0x1ed07e = new Uint8Array(data);
    var firstChar = _0x1ed07e[0x0];
    var _0x1dacfb = sliceArrayBuffer(_0x1ed07e, 0x1);
    
    return {
        'type': validTypes[firstChar],
        'data': _0x1dacfb
    };
}

exports.sliceArrayBuffer = async (arrayBuffer, start = 0, end) => {
    // Determine the length of the input ArrayBuffer
    const length = arrayBuffer.byteLength;
    
    // Set the default end to the length of the buffer if not provided
    if (end === undefined) {
        end = length;
    }

    // Handle negative indices
    if (start < 0) {
        start += length;
    }
    if (end < 0) {
        end += length;
    }
    
    // Ensure valid range values
    if (end > length) {
        end = length;
    }
    if (start >= length || start >= end || length === 0) {
        return new ArrayBuffer(0); // Return an empty ArrayBuffer if out of bounds
    }

    // Create a typed array from the original ArrayBuffer
    const sourceArray = new Uint8Array(arrayBuffer);
    
    // Create a new typed array for the sliced data
    const slicedArray = new Uint8Array(end - start);
    
    // Copy the specified range from the source to the new array
    for (let i = start, j = 0; i < end; i++, j++) {
        slicedArray[j] = sourceArray[i];
    }

    return slicedArray.buffer; // Return the ArrayBuffer of the sliced data
} 
function compressToZlib(obj) {
    // Convert the object to a JSON string
    const jsonString = JSON.stringify(obj);
    
    // Convert the string to a Uint8Array
    const input = new TextEncoder().encode(jsonString);
    
    // 3. Compress with pako
    const compressedData = pako.deflate(input);
    
    // 4. Create a byte array with the first byte (0x04)
    const type = new Uint8Array([4]);
    
    // 5. Concatenate the type byte and compressed data
    const result = new Uint8Array(type.byteLength + compressedData.byteLength);
    result.set(type, 0);
    result.set(compressedData, type.byteLength);
    
    return result;
}
exports.inflateAndParse = async(data) => {
    // 1. Decompress the data using pako
    const decompressed = pako.inflate(data);
    
    // 2. Convert the decompressed bytes to a UTF-8 string
    const jsonString = new TextDecoder('utf-8').decode(decompressed);
    
    // 3. Parse the JSON string into an object
    const jsonObject = JSON.parse(jsonString);
    
    return jsonObject;
}
