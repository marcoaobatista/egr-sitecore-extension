/**
 * @fileoverview Provides a UI utility for showing temporary notification toasts
 * using Bootstrap styling inside a shadow DOM. Notifications are accessible,
 * dismissible, and can auto-hide after a configurable duration.
 */
import { Config } from './config.js';
import { Logger } from './logger.js';

/**
 * A utility object for displaying temporary notification toasts in the UI.
 * Provides a method to show dismissible messages with optional auto-hide duration.
 */
export const Notification = {
    /**
     * Displays a notification toast with the provided message.
     * The toast automatically fades out after a specified duration, but can also be dismissed manually.
     *
     * @param {string} message - The notification message to display.
     * @param {number=} duration - Duration in milliseconds before auto-dismiss (default is 3000 ms).
     */
    show(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.classList.add(...Config.STYLES.notification);
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.style.zIndex = Config.Z_INDEX;

        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
            </div>
        `;

        const shadowHost= document.getElementById("shadowHostRoot").shadowRoot;
        shadowHost.appendChild(toast);

        // Fade in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Auto-dismiss after duration
        const hideTimeout = setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);

        // Manual dismiss
        toast.querySelector('.btn-close').addEventListener('click', () => {
            clearTimeout(hideTimeout);
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });

        Logger.log('Notification shown:', message);
    }
};