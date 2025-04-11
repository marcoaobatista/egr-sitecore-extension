import { Config } from './config.js';
import { Logger } from './logger.js';

export const ResultsBox = {
    // Function to remove previous boxes
    removePreviousBoxes() {
        return new Promise(resolve => {
            const shadowHost= document.getElementById("shadowHostRoot").shadowRoot;
            const boxes = shadowHost.querySelectorAll('.resultsBox');
            boxes.forEach(box => {
                box.classList.remove('show');
            });

            // Wait for transition to complete before removing
            setTimeout(() => {
                boxes.forEach(box => box.remove());
                resolve();
            }, 200);
        });
    },

    show(title, result) {
            const box = document.createElement('div');
            box.classList.add(...Config.STYLES.resultsBox);
            box.classList.add("resultsBox");
            box.style.width = "500px";
            box.style.zIndex = Config.Z_INDEX;

            box.innerHTML = `
            <div class="bg-white d-flex h-100 p-3 rounded-3 bg-light d-flex flex-column">
                <div class="align-items-center p-2 d-flex flex-row justify-content-between align-center">
                    <p class="m-0 fs-5">${title}</p>
                    <button class="btn btn-close"></button>
                </div>
                <textarea class="h-100 form-control" value="${result}"></textarea>
            </div>
            `;
    
            const shadowHost= document.getElementById("shadowHostRoot").shadowRoot;
            shadowHost.appendChild(box);

            // First remove old boxes, then show the new one
            this.removePreviousBoxes().then(() => {
                // Now safe to add/show new box
                shadowHost.appendChild(box);

                setTimeout(() => {
                    box.classList.add('show');
                }, 10);

                box.querySelector('.btn-close').addEventListener('click', () => {
                    box.classList.remove('show');
                    setTimeout(() => box.remove(), 200);
                });

                Logger.log('Notification shown:', result);
            });
        }
}