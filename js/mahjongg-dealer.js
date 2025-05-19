document.addEventListener('DOMContentLoaded', () => {
    console.log('Mahjongg Dealer script loaded.');

    const deal13Button = document.getElementById('deal-13-btn');
    const deal14Button = document.getElementById('deal-14-btn');
    const dealtHandContainer = document.getElementById('dealt-hand-container');

    const SUITS = ['C', 'B', 'D']; // Craks, Bams, Dots
    const WINDS = ['EW', 'SW', 'WW', 'NW']; // East, South, West, North
    const DRAGONS = ['RD', 'GD', 'WD']; // Red, Green, White (Soap)
    const NUM_SUITED_TILES_EACH = 9; // 1-9
    const NUM_COPIES_EACH_REGULAR_TILE = 4;
    const NUM_FLOWERS = 8;
    const NUM_JOKERS = 8;

    function createFullDeck() {
        const deck = [];

        // 1. Suited Tiles (Craks, Bams, Dots)
        for (const suit of SUITS) {
            for (let i = 1; i <= NUM_SUITED_TILES_EACH; i++) {
                for (let copy = 0; copy < NUM_COPIES_EACH_REGULAR_TILE; copy++) {
                    deck.push(`${i}${suit}`); // e.g., "1C", "9D"
                }
            }
        }

        // 2. Wind Tiles
        for (const wind of WINDS) {
            for (let copy = 0; copy < NUM_COPIES_EACH_REGULAR_TILE; copy++) {
                deck.push(wind);
            }
        }

        // 3. Dragon Tiles
        for (const dragon of DRAGONS) {
            for (let copy = 0; copy < NUM_COPIES_EACH_REGULAR_TILE; copy++) {
                deck.push(dragon);
            }
        }

        // 4. Flower Tiles
        for (let i = 0; i < NUM_FLOWERS; i++) {
            deck.push('FL'); // Representing all flowers as 'FL' for now
        }

        // 5. Joker Tiles
        for (let i = 0; i < NUM_JOKERS; i++) {
            deck.push('JK');
        }
        
        console.log(`Deck created with ${deck.length} tiles.`);
        return deck;
    }

    // Fisher-Yates Shuffle Algorithm
    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
        }
        return deck;
    }

    function dealHand(numTiles) {
        const fullDeck = createFullDeck();
        const shuffledDeck = shuffleDeck(fullDeck);
        const hand = shuffledDeck.slice(0, numTiles);
        
        console.log(`Dealt hand (${numTiles} tiles):`, hand);
        displayHand(hand);
    }

    function displayHand(hand) {
        dealtHandContainer.innerHTML = ''; // Clear previous hand

        for (const tileCode of hand) {
            const tileDiv = document.createElement('div');
            tileDiv.classList.add('tile');
            
            // Simple text representation for now
            // We'll enhance this for better visuals later
            let tileDisplayValue = tileCode;
            let specificClass = '';

            if (tileCode.includes('C')) specificClass = 'tile-crak';
            else if (tileCode.includes('B')) specificClass = 'tile-bam';
            // Specific Dragon checks MUST come before general 'includes D'
            else if (tileCode === 'RD') specificClass = 'tile-dragon-red';
            else if (tileCode === 'GD') specificClass = 'tile-dragon-green';
            else if (tileCode === 'WD') specificClass = 'tile-dragon-white';
            else if (tileCode.includes('D')) specificClass = 'tile-dot'; // Now this is correct for actual Dots
            else if (WINDS.includes(tileCode)) specificClass = 'tile-wind';
            else if (tileCode === 'FL') specificClass = 'tile-flower';
            else if (tileCode === 'JK') specificClass = 'tile-joker';

            if (specificClass) tileDiv.classList.add(specificClass);

            // For Winds and Dragons, use more readable characters if possible
            // This is a placeholder - ideally use images or SVG for real tiles
            if (tileCode === 'EW') tileDisplayValue = 'E'; // East
            else if (tileCode === 'SW') tileDisplayValue = 'S'; // South
            else if (tileCode === 'WW') tileDisplayValue = 'W'; // West
            else if (tileCode === 'NW') tileDisplayValue = 'N'; // North
            else if (tileCode === 'RD') tileDisplayValue = 'Red'; // Red Dragon
            else if (tileCode === 'GD') tileDisplayValue = 'Green'; // Green Dragon
            else if (tileCode === 'WD') tileDisplayValue = 'Soap'; // White Dragon (Soap)
            else if (tileCode === 'FL') tileDisplayValue = '🌺'; // Flower emoji (Hibiscus)
            else if (tileCode === 'JK') tileDisplayValue = 'Joker';

            tileDiv.textContent = tileDisplayValue;
            dealtHandContainer.appendChild(tileDiv);
        }
    }

    // Event Listeners
    deal13Button.addEventListener('click', () => dealHand(13));
    deal14Button.addEventListener('click', () => dealHand(14));

    // Initial welcome or instruction (optional)
    // displayHand([]); // Display empty initially
});
