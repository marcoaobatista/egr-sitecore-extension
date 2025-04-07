// notification.js
import { Config } from './config.js';
import { Logger } from './logger.js';

export const Notification = {
    show(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.innerHTML = message;
        notification.style.cssText = Config.STYLES.notification;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);

        Logger.log('Notification shown:', message);
    }
};