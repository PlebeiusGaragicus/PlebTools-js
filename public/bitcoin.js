// async function getBlockCount() {
//     const response = await fetch(`${SERVER_URL}/block-height`);

//     if (response.ok) {
//         const data = await response.json();
//         return data.blockHeight;
//     } else {
//         throw new Error(`Failed to fetch block height: ${response.statusText}`);
//     }
// }

// async function updateBlockHeight() {
//     console.log('Updating block height...')
//     try {
//         const blockHeight = await getBlockCount();
//         document.getElementById('blockHeight').textContent = blockHeight;
//     } catch (error) {
//         console.error(error);
//         document.getElementById('blockHeight').textContent = 'Error fetching block height';
//     }
// }



// app.get('/block-height', async (req, res) => {
//     try {
//         const blockHeight = await getBlockCount();
//         res.json({ blockHeight });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error fetching block height');
//     }
// });

export function subsidyAt(height) {
    const halvings = BigInt(Math.floor(height / 210000))
    if (halvings >= 64) return 0
    else {
        let sats = BigInt(5000000000)
        sats >>= halvings
        return Number(sats)
    }
}
