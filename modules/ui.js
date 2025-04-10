/**
 * @fileoverview UI module for initializing the toolbox and action buttons in the extension.
 * Dynamically injects UI controls and connects them to core logic modules like ClipboardHandler,
 * MSUTodayProcessor, and others. Ensures setup is delayed until DOM is ready.
 */
import { Logger } from './logger.js';
import { Toolbox } from './toolbox.js';
import { ClipboardHandler } from './clipboardHandler.js';
import { UrlGenerator } from './urlGenerator.js';
import { MSUTodayArticleProcessor } from './msutoday.js';
import { ExpandTree } from './expandTree.js';

// Configuration for UI buttons including their label, instructions, click behavior, and category.
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
  ];

export const UI = {
    Toolbox: null,

    /**
     * Initializes the Toolbox component and registers all UI buttons.
     *
     * @param {HTMLElement} shadowHost - The shadow DOM host where the toolbox will be injected.
     */
    init(shadowHost) {
        // Initialize button container
        this.Toolbox = new Toolbox(shadowHost);
        this.Toolbox.init();

        // Add buttons to container
        buttons.forEach(button => {
            this.Toolbox.addButton(button['label'], button['instructions'], button['onClick'], button['category']);
        });

        Logger.log('UI initialized');
    },

    /**
     * Starts the UI by initializing it once the DOM is fully loaded.
     * If the DOM is already ready, it runs immediately.
     *
     * @param {HTMLElement} shadowHost - The shadow DOM host for the UI components.
     */
    start(shadowHost) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            Logger.log('DOM ready, running immediately');
            this.init(shadowHost);
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                Logger.log('DOMContentLoaded fired');
                this.init(shadowHost);
            });
        }
    }
};