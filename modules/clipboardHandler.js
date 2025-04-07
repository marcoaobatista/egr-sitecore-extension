// clipboardHandler.js
import { Logger } from './logger.js';
import { HtmlProcessor } from './htmlProcessor.js';
import { Notification } from './notification.js';

export const ClipboardHandler = {
    async process() {
        try {
            const clipboardText = await navigator.clipboard.readText();
            if (!clipboardText) {
                Notification.show('Clipboard is empty!', 3000);
                return;
            }

            Logger.log('Original clipboard content:', clipboardText);
            const cleanedHtml = HtmlProcessor.process(clipboardText);
            Logger.log('Processed HTML:', cleanedHtml);

            await navigator.clipboard.writeText(cleanedHtml);
            Notification.show('Processed HTML copied to clipboard!', 3000);
        } catch (error) {
            Logger.error('Error processing clipboard:', error.message);
            Notification.show(`Failed to process clipboard: ${error.message}`, 3000);
        }
    }
};