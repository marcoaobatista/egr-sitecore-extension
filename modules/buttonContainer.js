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
        this.toggleButton.classList.add(...Config.STYLES.toggleButton);
        this.toggleButton.style.zIndex = Config.Z_INDEX;
        this.toggleButton.style.top = "40px";
        this.toggleButton.style.right = "30px";
        this.toggleButton.addEventListener('click', () => this.toggle());

        document.body.appendChild(this.toggleButton);
    }

    createButtonContainer() {
        this.container = document.createElement('div');

        this.container.classList.add(...Config.STYLES.buttonContainer);

        this.container.style.zIndex = Config.Z_INDEX;
        this.container.style.top = "90px";
        this.container.style.right = "30px";

        document.body.appendChild(this.container);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.container.classList.add('d-flex');
            this.container.classList.remove('d-none');
            this.toggleButton.innerHTML = 'Hide';
        } else {
            this.container.classList.remove('d-flex');
            this.container.classList.add('d-none');
            this.toggleButton.innerHTML = 'Tools';
        }
    }

    addButton(label, instructions, onClick) {
        const button = document.createElement('button');
        button.innerHTML = label;
    
        // Bootstrap tooltip attributes
        button.setAttribute('data-bs-toggle', 'tooltip');
        button.setAttribute('data-bs-placement', 'left');
        button.setAttribute('title', instructions);
    
        button.classList.add(...Config.STYLES.actionButton);
    
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            onClick();
        });
    
        this.container.appendChild(button);
        this.buttons.push(button);
    
        Logger.log(`Button "${label}" added to container`);
    }
}