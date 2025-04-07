// ui.js
import { Logger } from './logger.js';
import { ButtonContainer } from './buttonContainer.js';
import { ClipboardHandler } from './clipboardHandler.js';
import { UrlGenerator } from './urlGenerator.js';
import { MSUTodayArticleProcessor } from './msutoday.js';
import { ExpandTree } from './expandTree.js';

export const UI = {
    buttonContainer: null,

    init() {
        this.buttonContainer = new ButtonContainer();
        this.buttonContainer.init();

        // Register buttons
        this.buttonContainer.addButton('Process Clipboard HTML', () => ClipboardHandler.process());
        this.buttonContainer.addButton('Copy Published URL', () => UrlGenerator.copyToClipboard());
        this.buttonContainer.addButton('MSUToday Article', () => MSUTodayArticleProcessor.processAndCopy());
        this.buttonContainer.addButton('Expand Tree', () => ExpandTree.expand());
        Logger.log('UI initialized');
    },

    start() {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            Logger.log('DOM ready, running immediately');
            this.init();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                Logger.log('DOMContentLoaded fired');
                this.init();
            });
        }
    }
};