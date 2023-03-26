export async function getTipHeight() {
    const URL = 'https://mempool.space/api/blocks/tip/height';

    return fetch(URL)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            return json;
        })
        .catch(err => {
            console.error('error:' + err)
            return null;
        });
}


// export async function getBlockHash(height) {
//     const URL = `https://mempool.space/api/block-height/${height}`

//     return fetch(URL)
//         .then(res => {
//             console.log(res.text())
//             return res.text();
//         })
//         .catch(err => {
//             console.log(height)
//             console.error('error:' + err)
//             return null;
//         });
// }

export async function getBlockHash(height) {
    const URL = `https://mempool.space/api/block-height/${height}`;

    return fetch(URL)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error fetching block hash: ${res.status}`);
            }
            return res.text(); // This returns a Promise
        })
        .then(text => {
            console.log(text);
            return text.trim(); // Make sure to trim any whitespace or newline characters
        })
        .catch(err => {
            console.log(height);
            console.error('error:' + err);
            return null;
        });
}



// export async function getBlockHeader(height) {
//     const hash = await getBlockHash(height);
//     console.log(`hash: ${hash}`)

//     const URL = `https://mempool.space/api/block/${hash}/header`

//     return fetch(URL)
//         // .then(res => res.json())
//         .catch(err => {
//             console.error('error:' + err)
//             return null;
//         });
// }

export async function getBlockHeader(height) {
    const hash = await getBlockHash(height);
    const URL = `https://mempool.space/api/block/${hash}/header`;

    return fetch(URL)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error fetching block header: ${res.status}`);
            }
            return res.text(); // Convert the response to text
        })
        .catch(err => {
            console.error('error:' + err);
            return null;
        });
}



// export function extractDifficultyFromHeader(header) {
//     const HEADER_LENGTH = 80;
//     const DIFFICULTY_START = 72;
//     const DIFFICULTY_LENGTH = 4;

//     // if (header.length !== HEADER_LENGTH * 2) {
//     //     throw new Error('Invalid header length');
//     // }

//     const difficultyTargetHex = header.slice(DIFFICULTY_START * 2, (DIFFICULTY_START + DIFFICULTY_LENGTH) * 2);
//     const difficultyTarget = parseInt(difficultyTargetHex, 16);

//     // Calculate the difficulty based on the target
//     const maxTarget = BigInt(2) ** BigInt(224);
//     const difficulty = Number(maxTarget / BigInt(difficultyTarget));

//     return difficulty;
// }


export function extractTargetFromHeader(header) {
    const TARGET_START = 72;
    const TARGET_LENGTH = 4;

    const targetHexLE = header.slice(TARGET_START * 2, (TARGET_START + TARGET_LENGTH) * 2);
    const targetHexBE = reverseByteOrder(targetHexLE);
    const exponent = parseInt(targetHexBE.slice(0, 2), 16);
    const coefficient = parseInt(targetHexBE.slice(2), 16);

    const target = coefficient * 2 ** (8 * (exponent - 3));
    return target;
}

export function calculateDifficulty(target) {
    const maxTarget = BigInt('0x00000000FFFF0000000000000000000000000000000000000000000000000000');
    const difficulty = maxTarget / BigInt(target);
    return Number(difficulty);
}


function reverseByteOrder(hexString) {
    const hexArray = [];
    for (let i = 0; i < hexString.length; i += 2) {
        hexArray.push(hexString.slice(i, i + 2));
    }
    return hexArray.reverse().join('');
}


// 46843400286277
// 386269758

