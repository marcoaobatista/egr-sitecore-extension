/**
 * @fileoverview Utility for generating and copying published URLs for Sitecore content nodes.
 * Constructs the URL based on the current selection in the Sitecore content tree,
 * and provides a method to copy the generated URL to the clipboard.
 */
import { Logger } from './logger.js';
import { Notification } from './notification.js';

export const UrlGenerator = {
    /**
     * Generates a published URL based on the currently active node in the Sitecore content tree.
     * Traverses up the tree to build the full path and appends the page title.
     * Displays notifications if the node is not selected or the path is too short.
     *
     * @return {?string} The generated URL string, or null if an error occurs.
     */
    generatePublishedUrl() {
        try {
            const selectedNode = document.querySelector(".scContentTreeNodeActive");
            if (!selectedNode) {
                Notification.show('No active node selected in the content tree!', 3000);
                return null;
            }

            const pathParts = [];
            let currentNode = selectedNode;

            while (currentNode) {
                const nodeLink = currentNode.querySelector("a");
                if (nodeLink) {
                    const nodeName = nodeLink.textContent.trim();
                    pathParts.unshift(nodeName);
                }
                currentNode = currentNode.closest("div.scContentTreeNode")?.parentElement?.closest("div.scContentTreeNode");
            }

            const currentPageElement = document.querySelector(".scEditorHeaderTitle");
            const currentPageName = currentPageElement ? currentPageElement.textContent.trim() : "";
            if (currentPageName) pathParts.push(currentPageName);

            const trimmedPathParts = pathParts.slice(4);
            if (trimmedPathParts.length === 0) {
                Notification.show('Path is too short to generate a URL!', 3000);
                return null;
            }

            const finalPath = trimmedPathParts.join("/");
            const url = `https://engineering.msu.edu/${finalPath}`;
            Logger.log('Generated URL:', url);
            return url;
        } catch (error) {
            Logger.error('Error generating URL:', error.message);
            Notification.show(`Failed to generate URL: ${error.message}`, 3000);
            return null;
        }
    },

    /**
     * Copies the generated published URL to the clipboard.
     * Notifies the user on success or failure.
     *
     * @return {Promise<void>}
     */
    async copyToClipboard() {
        const url = this.generatePublishedUrl();
        if (!url) return;

        try {
            await navigator.clipboard.writeText(url);
            Notification.show('Published URL copied to clipboard!', 3000);
        } catch (error) {
            Logger.error('Error copying URL to clipboard:', error.message);
            Notification.show(`Failed to copy URL to clipboard: ${error.message}`, 3000);
        }
    }
};