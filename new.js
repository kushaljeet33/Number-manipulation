document.addEventListener("DOMContentLoaded", () => {
    const maxNumber = 150;
    const minNumber = 0;
    
    let num = 0;
    let history = [];
    let historyIndex = -1;

    const numberDisplay = document.getElementById('numberDisplay');
    const progressBar = document.querySelector('.progress-bar');
    const subtractButton = document.getElementById('subtract');
    const addButton = document.getElementById('add');
    const undoButton = document.getElementById('undo');
    const redoButton = document.getElementById('redo');

    function updateDisplay() {
        numberDisplay.textContent = num;
        progressBar.style.width = `${(num / maxNumber) * 100}%`;
    }

    function recordState(action) {
        if (historyIndex < history.length - 1) {
            history = history.slice(0, historyIndex + 1);
        }
        history.push({ num, action });
        historyIndex++;
        updateButtons();
    }

    function updateButtons() {
        undoButton.disabled = historyIndex < 0;
        redoButton.disabled = historyIndex >= history.length - 1;
    }

    function undo() {
        if (historyIndex >= 0) {
            const lastState = history[historyIndex];
            num = lastState.num;
            updateDisplay();
            historyIndex--;
            updateButtons();
        }
    }

    function redo() {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            const nextState = history[historyIndex];
            num = nextState.num;
            updateDisplay();
            updateButtons();
        }
    }

    subtractButton.addEventListener('click', () => {
        if (num > minNumber) {
            num--;
            updateDisplay();
            recordState('subtract');
        }
    });

    addButton.addEventListener('click', () => {
        if (num < maxNumber) {
            num++;
            updateDisplay();
            recordState('add');
        }
    });

    undoButton.addEventListener('click', undo);
    redoButton.addEventListener('click', redo);

    updateDisplay();
});
