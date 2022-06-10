// Define a slot machine with three reels that can individually
// spin(), and then display() the curren content of all the reels

// A reel only know how to display() its current slot symbol,
// but a slot machine typically shows three symbols per reel:
// the current slot (position), one slot above (position - 1)
// and one slot below (position + 1), si displaying the slot 
// machine should end up displaying a 3 x 3 grid of slot symbols


function randMax(max) {
    return Math.trunc(1E9 * Math.random()) % max;
}

var reel = {
    symbols: ["X","Y","Z","W","$","*","<","@"],
    spin() {

        if (this.position == null) {
            this.position = randMax(this.symbols.length - 1)
        }

        this.position = (
            this.position + 100 + randMax(100)
        ) % this.symbols.length;

    },
    display() {

        if (this.position == null) {
            this.position = randMax(this.symbols.length - 1)
        }
        return this.symbols[this.position];

    }
}

var slotMachine = {
    reels: [
        // This slot machine needs 3 separate reels
        // hint: Object.create()
        Object.create(reel),
        Object.create(reel),
        Object.create(reel),
    ],
    spin() {
        this.reels.forEach(function spinReel(reel) {
            reel.spin();
        })
    },
    display() {
        // TODO
        var lines = [];
        
        // Display all 3 lines on the slot machine

        for (let lp=-1; lp <= 1; lp++) {
            let line = this.reels.map(function getSlot(reel) {
                var slot = Object.create(reel);
                slot.position = (
                    reel.symbols.length +
                    reel.position +
                    lp
                ) % reel.symbols.length;
                return reel.display.call(slot);
            })
            lines.push(line.join(" | "));
        }

        return lines.join("\n");
    }
}

// Desired Behavior
// < | @ | *
// @ | X | <
// X | Y | @
slotMachine.spin();
console.log(slotMachine.display());

console.log('\n')
slotMachine.spin();
console.log(slotMachine.display());
