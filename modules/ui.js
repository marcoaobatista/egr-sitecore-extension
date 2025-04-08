// ui.js
import { Logger } from './logger.js';
import { ButtonContainer } from './buttonContainer.js';
import { ClipboardHandler } from './clipboardHandler.js';
import { UrlGenerator } from './urlGenerator.js';
import { MSUTodayArticleProcessor } from './msutoday.js';
import { ExpandTree } from './expandTree.js';

const buttons = [
    {
      label: 'Process Clipboard HTML',
      onClick: () => ClipboardHandler.process(),
      instructions: `Cleans and formats copied HTML content by removing unwanted styles, fixing structure, and appending a "Read More" link. 
  To use: Paste content in the Sitecore Rich Text Editor (Design tab), copy from the HTML tab, and click this button.`,
      category: "News Story"
    },
    {
      label: 'Copy Published URL',
      onClick: () => UrlGenerator.copyToClipboard(),
      instructions: `Generates and copies the published URL of the selected page in the Sitecore content tree. 
  To use: Select a page, expand the toolbox, and click this button.`,
      category: "Miscellaneous"
    },
    {
      label: 'MSUToday Article',
      onClick: () => MSUTodayArticleProcessor.processAndCopy(),
      instructions: `Fetches and formats an MSUToday article’s HTML, adjusts links, and copies it to the clipboard. 
  To use: Open an MSUToday article page, then click this button.`,
      category: "News Story"
    },
    {
      label: 'Expand Tree',
      onClick: () => ExpandTree.expand(),
      instructions: `Automatically expands all nodes in the Sitecore content tree, excluding preset folders. 
  To use: Open the Content Editor and click this button.`,
      category: "Miscellaneous"
    }
  ]

export const UI = {
    buttonContainer: null,

    init() {
        this.buttonContainer = new ButtonContainer('News Story');
        this.buttonContainer.init();

        // Register buttons
        buttons.forEach(button => {
            this.buttonContainer.addButton(button['label'], button['instructions'], button['onClick'], button['category']);
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