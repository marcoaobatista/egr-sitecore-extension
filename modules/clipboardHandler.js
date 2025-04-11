/**
 * @fileoverview Handles reading and processing clipboard HTML content.
 * Cleans up copied HTML using HtmlProcessor, logs the result, and writes the
 * cleaned version back to the clipboard. Displays user-facing notifications for success or failure.
 */
import { Logger } from './logger.js';
import { HtmlProcessor } from './htmlProcessor.js';
import { Notification } from './notification.js';
import { ResultsBox } from './resultsBox.js';

export const ClipboardHandler = {
    /**
     * Reads HTML content from the user's clipboard, processes it using
     * the HtmlProcessor, and writes the cleaned HTML back to the clipboard.
     * Displays notifications for success, failure, or if the clipboard is empty.
     *
     * @return {Promise<void>} A promise that resolves when processing is complete.
     */
    async process() {
        try {
            const clipboardText = await navigator.clipboard.readText();
            if (!clipboardText) {
                Notification.show('Clipboard is empty!', 3000);
                return;
            }

            Logger.log('Original clipboard content:', clipboardText);
            const cleanedHtml = HtmlProcessor.process(clipboardText);

            ResultsBox.show('Processed HTML', cleanedHtml);

            Logger.log('Processed HTML:', cleanedHtml);

            await navigator.clipboard.writeText(cleanedHtml);
            Notification.show('Processed HTML copied to clipboard!', 3000);
        } catch (error) {
            Logger.error('Error processing clipboard:', error.message);
            Notification.show(`Failed to process clipboard: ${error.message}`, 3000);
        }
    }
};