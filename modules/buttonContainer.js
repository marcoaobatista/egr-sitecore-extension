// buttonContainer.js
import { Config } from './config.js';
import { Logger } from './logger.js';

export class ButtonContainer {
    constructor(defaultCategory = 'News Story', shadowHost) {
        this.defaultCategory = defaultCategory;
        this.isOpen = false;
        this.toggleButton = null;
        this.container = null;
        this.buttons = [];
        this.tabs = {};
        this.shadowHost = shadowHost;
    }

    init() {
        this.createToggleButton();
        this.createButtonContainer();
        
        this.container.addEventListener('shown.bs.tab', (event) => {
            const allPanes = this.shadowHost.querySelectorAll('.tab-pane');
            allPanes.forEach(pane => pane.classList.remove('d-flex'));
        
            const targetPane = this.shadowHost.querySelector(event.target.dataset.bsTarget);
            if (targetPane) targetPane.classList.add('d-flex');
        });
    }

    createToggleButton() {
        this.toggleButton = document.createElement('button');
        this.toggleButton.innerHTML = 'Tools';
        this.toggleButton.classList.add(...Config.STYLES.toggleButton);
        this.toggleButton.style.zIndex = Config.Z_INDEX;
        this.toggleButton.style.top = "40px";
        this.toggleButton.style.right = "30px";
        this.toggleButton.addEventListener('click', () => this.toggle());

        this.shadowHost.appendChild(this.toggleButton);
    }

    createButtonContainer() {
        this.container = document.createElement('div');
        this.container.classList.add(...Config.STYLES.buttonContainer);
        this.container.style.zIndex = Config.Z_INDEX;
        this.container.style.top = "90px";
        this.container.style.right = "30px";

        // Create tabs
        const tabNav = document.createElement('ul');
        tabNav.className = 'nav nav-tabs';
        tabNav.role = 'tablist';

        this.tabNav = tabNav;
        this.container.appendChild(tabNav);

        // Tab content container
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content';
        this.tabContent = tabContent;
        this.container.appendChild(tabContent);

        this.shadowHost.appendChild(this.container);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.container.classList.add('d-flex', 'flex-column');
            this.container.classList.remove('d-none');
            this.toggleButton.innerHTML = 'Hide';
        } else {
            this.container.classList.remove('d-flex');
            this.container.classList.add('d-none');
            this.toggleButton.innerHTML = 'Tools';
        }
    }

    ensureTab(category) {
        if (this.tabs[category]) return;
    
        const isActive = Object.keys(this.tabs).length === 0 && category === this.defaultCategory;
        const tabId = `tab-${category.replace(/\s+/g, '-').toLowerCase()}`;
    
        // Create tab button
        const tabButton = document.createElement('li');
        tabButton.className = 'nav-item';
        tabButton.role = 'presentation';
    
        const tabLink = document.createElement('button');
        tabLink.className = 'nav-link' + (isActive ? ' active' : '');
        tabLink.type = 'button';
        tabLink.role = 'tab';
        tabLink.innerText = category;
        tabLink.dataset.tabId = tabId;
    
        // Custom tab switch logic
        tabLink.addEventListener('click', () => {
            // Remove 'active' from all tabs and content
            const allLinks = this.shadowHost.querySelectorAll('.nav-link');
            const allPanes = this.shadowHost.querySelectorAll('.tab-pane');
            // Remove 'active' from all tabs and content
            allLinks.forEach(link => link.classList.remove('active'));
            allPanes.forEach(pane => pane.classList.remove('show', 'active', 'd-flex'));

            // Activate the selected ones
            tabLink.classList.add('active');
            tabPane.classList.add('show', 'active', 'd-flex');
        });
    
        tabButton.appendChild(tabLink);
        this.tabNav.appendChild(tabButton);
    
        // Create tab content pane
        const tabPane = document.createElement('div');
        tabPane.className = `tab-pane fade ${isActive ? 'show active d-flex' : ''} flex-column gap-2 p-2`;
        tabPane.id = tabId;
        tabPane.role = 'tabpanel';
    
        this.tabContent.appendChild(tabPane);
        this.tabs[category] = tabPane;
    }

    addButton(label, instructions, onClick, category = 'News Story') {
        this.ensureTab(category);

        const button = document.createElement('button');
        button.innerHTML = label;

        // Tooltip attributes
        button.setAttribute('data-bs-toggle', 'tooltip');
        button.setAttribute('data-bs-placement', 'left');
        button.setAttribute('data-bs-title', instructions);
        button.setAttribute('type', 'button');

        button.classList.add(...Config.STYLES.actionButton);

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            onClick();
        });

        this.tabs[category].appendChild(button);
        this.buttons.push(button);

        Logger.log(`Button "${label}" added to category "${category}"`);
    }
}