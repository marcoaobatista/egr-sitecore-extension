// ui.js
import { Logger } from './logger.js';
import { ButtonContainer } from './buttonContainer.js';
import { ClipboardHandler } from './clipboardHandler.js';
import { UrlGenerator } from './urlGenerator.js';
import { MSUTodayArticleProcessor } from './msutoday.js';
import { ExpandTree } from './expandTree.js';

const buttons = [
    {
        'label': 'Process Clipboard HTML',
        'onClick': () => ClipboardHandler.process(),
        'instructions': `1. Copy the news story from a given email or Word document.
2. Paste the content in the Sitecore Rich Text Editor, in the Design tab.
3. In the HTML tab, copy the text from the text area.
4. Expand the toolbox, and click the Process Clipboard HTML button.
5. Paste the content in the HTML tab text area.`
    },
    {
        'label': 'Copy Published URL',
        'onClick': () => UrlGenerator.copyToClipboard(),
        'instructions': `1. In the Sitecore content tree, select a page.
2. Expand the toolbox, and click the Copy Published URL button.
3. The link will be copied to your clipboard.`
    },
    {
        'label': 'MSUToday Article',
        'onClick': () => MSUTodayArticleProcessor.processAndCopy(),
        'instructions': `1. Open MSUToday article page.
2. Expand the toolbox, and click the MSUToday Article button.
3. Article HTML will be copied to your clipboard.`
    },
    {
        'label': 'Expand Tree',
        'onClick': () => ExpandTree.expand(),
        'instructions': `1. Simply open the Content Editor, expand the toolbox, and click the Expand Tree button.`
    },

]

export const UI = {
    buttonContainer: null,

    init() {
        this.buttonContainer = new ButtonContainer();
        this.buttonContainer.init();

        // Register buttons
        buttons.forEach(button => {
            this.buttonContainer.addButton(button['label'], button['instructions'], button['onClick']);
        });

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