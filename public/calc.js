import { getTipHeight, getBlockHeader, extractTargetFromHeader, calculateDifficulty } from './mempool.js';
import { subsidyAt } from './bitcoin.js';

document.addEventListener('DOMContentLoaded', function () {
    const miningForm = document.getElementById('miningForm');
    miningForm.addEventListener('submit', validateForm);
    loadForm();
});


export async function loadForm() {
    try {
        const blockHeight = await getTipHeight();
        const blockHeader = await getBlockHeader(blockHeight);
        const target = extractTargetFromHeader(blockHeader);
        const difficulty = calculateDifficulty(target);
        const difficultyInput = document.getElementById('difficulty');
        difficultyInput.value = difficulty;

        const subsidy = subsidyAt(blockHeight);
        const subsidyInput = document.getElementById('subsidy');
        subsidyInput.value = subsidy;

        console.log(`blockHeight: ${blockHeight}`)
        if (blockHeight !== null) {
            const blockHeightInput = document.getElementById('blockHeight');
            blockHeightInput.value = blockHeight;
        } else {
            console.error('Failed to fetch block height');
        }
    } catch (error) {
        console.error('Error in loadForm:', error);
    }
}

function validateForm(event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    const blockHeightInput = document.getElementById('blockHeight');
    const difficultyInput = document.getElementById('difficulty');
    const myHashrateInput = document.getElementById('myHashrate');
    const subsidyInput = document.getElementById('subsidy');

    // Example validation: check if blockHeight is an even number
    if (blockHeightInput.value % 2 !== 0) {
        alert('Block height must be an even number.');
        return false;
    }

    if (myHashrateInput.value == '') {
        alert('Please enter your hashrate.');
        return false;
    }

    // If all validations pass, submit the form
    event.target.submit();
}
