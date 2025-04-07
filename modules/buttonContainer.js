// buttonContainer.js
import { Config } from './config.js';
import { Logger } from './logger.js';

export class ButtonContainer {
    constructor() {
        this.isOpen = false;
        this.toggleButton = null;
        this.container = null;
        this.buttons = [];
    }

    init() {
        this.createToggleButton();
        this.createButtonContainer();
    }

    createToggleButton() {
        this.toggleButton = document.createElement('button');
        this.toggleButton.innerHTML = 'Tools';
        this.toggleButton.style.cssText = Config.STYLES.toggleButton;

        this.toggleButton.addEventListener('click', () => this.toggle());

        document.body.appendChild(this.toggleButton);
    }

    createButtonContainer() {
        this.container = document.createElement('div');
        this.container.style.cssText = Config.STYLES.buttonContainer;
        document.body.appendChild(this.container);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.container.style.display = this.isOpen ? 'flex' : 'none';
        this.toggleButton.innerHTML = this.isOpen ? 'Hide' : 'Tools';
    }

    addButton(label, onClick) {
        const button = document.createElement('button');
        button.innerHTML = label;
        button.style.cssText = Config.STYLES.actionButton;

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            onClick();
        });

        this.container.appendChild(button);
        this.buttons.push(button);
        Logger.log(`Button "${label}" added to container`);
    }
}