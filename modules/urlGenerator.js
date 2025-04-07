// urlGenerator.js
import { Logger } from './logger.js';
import { Notification } from './notification.js';

export const UrlGenerator = {
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