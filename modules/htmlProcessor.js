// htmlProcessor.js
import { Config } from './config.js';

export const HtmlProcessor = {
    process(htmlString) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;

        this.removeStyles(tempDiv);
        this.filterTags(tempDiv);
        this.formatParagraphs(tempDiv);
        this.convertBulletsToLists(tempDiv);
        this.appendReadMoreLink(tempDiv);

        return this.formatHTML(tempDiv.innerHTML);
    },

    convertBulletsToLists(container) {
        const bulletPatterns = /^[\u25CF\u2022\u25E6\u2043\u2219\u00B7\u00A0\*\-‣·]+/;
        let elements = Array.from(container.children);
        let resultHTML = '';
        let listItems = [];
        let inList = false;
    
        elements.forEach(el => {
            let html = el.innerHTML.trim();
            let text = el.textContent.trim();
            let match = text.match(bulletPatterns);
    
        // handle existing ul tags
        if (el.tagName.toLowerCase() === 'ul') {  
            resultHTML += el.outerHTML;
        } 
        else if (match) {
            if (!inList) {
                resultHTML += '<ul>';
                inList = true;
            }
            let contentWithoutBullet = html.replace(bulletPatterns, '');
            listItems.push(`<li>${contentWithoutBullet}</li>`);
        } else {
            if (inList) {
                resultHTML += listItems.join('') + '</ul>';
                inList = false;
                listItems = [];
            } 
            resultHTML += `<p>${html}</p>`;
        }
    });
    
        if (inList) {
            resultHTML += listItems.join('') + '</ul>';
        }
    
        container.innerHTML = resultHTML;
    },

    removeStyles(container) {
        container.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'));
        container.querySelectorAll('style').forEach(styleTag => styleTag.remove());
    },

    filterTags(container) {
        container.querySelectorAll('*').forEach(el => {
            const tagName = el.tagName.toLowerCase();
            if (!Config.ALLOWED_TAGS.includes(tagName)) {
                this.unwrapElement(el);
            } else {
                this.preserveElement(el, tagName);
            }
        });
    },

    unwrapElement(el) {
        const parent = el.parentNode;
        while (el.firstChild) {
            parent.insertBefore(el.firstChild, el);
        }
        parent.removeChild(el);
    },

    parseUrl(url) {
        if (!url) return url;
        // Match urldefense.com URLs with or without a version (e.g., /v3/, /v2/, etc.)
        const urlDefensePattern = /https:\/\/urldefense\.com\/(?:v\d+\/)?__([^_]+)__/;
        const match = url.match(urlDefensePattern);
        if (match && match[1]) {
            return match[1]; // Return the actual URL
        }
        return url; // Return the original URL if not a urldefense.com link
    },
    
    preserveElement(el, tagName) {
        const newEl = document.createElement(tagName);
        if (tagName === 'a') {
            const href = el.getAttribute('href');
            if (href) {
                const parsedHref = this.parseUrl(href); // Parse the URL to remove urldefense wrapper
                newEl.setAttribute('href', parsedHref);
            }
        }
        while (el.firstChild) {
            newEl.appendChild(el.firstChild);
        }
        el.parentNode.replaceChild(newEl, el);
    },

    formatParagraphs(container) {
        let content = container.innerHTML
            .replace(/<br\s*\/?>\s*/g, '\n\n')
            .replace(/\n\s*\n+/g, '</p><p>');
        if (!content.trim().startsWith('<p>')) content = '<p>' + content;
        if (!content.trim().endsWith('</p>')) content += '</p>';
        container.innerHTML = content;

        container.querySelectorAll('p').forEach(p => {
            p.innerHTML = p.innerHTML
                .replace(/<(strong|em)[^>]*>\s*<\/\1>/g, '')
                .replace(/[\s ]+/g, ' ')
                .trim();
            const textContent = p.textContent.trim();
            if (!textContent || textContent === '' || textContent === ' ') {
                p.remove();
            } else {
                p.innerHTML = p.innerHTML.replace(/[\s ]+/g, ' ').trim();
            }
        });
    },

    appendReadMoreLink(container) {
        const readMoreP = document.createElement('p');
        const aTag = document.createElement('a');
        aTag.setAttribute('href', Config.READ_MORE_LINK.href);
        aTag.setAttribute('class', Config.READ_MORE_LINK.class);
        aTag.innerHTML = Config.READ_MORE_LINK.text;
        readMoreP.appendChild(aTag);
        container.appendChild(readMoreP);
    },

    formatHTML(html) {
        const formatted = html.replace(/>\s*</g, '>\n<');
        let pad = 0;
        return formatted.split('\n').map(line => {
            let indent = 0;
            if (line.match(/<\/\w/)) {
                if (pad > 0) pad -= 1;
            } else if (line.match(/^<\w[^>]*[^\/]>.*$/)) {
                indent = pad;
                pad += 1;
            } else {
                indent = pad;
            }
            return ' '.repeat(indent * 2) + line;
        }).join('\n');
    }
};