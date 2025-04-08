// notification.js
import { Config } from './config.js';
import { Logger } from './logger.js';

export const Notification = {
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

        document.body.appendChild(toast);

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