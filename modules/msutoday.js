// msutoday.js
import { Logger } from './logger.js';
import { Notification } from './notification.js';

export const MSUTodayHtmlProcessor = {
    formatHTML(html) {
        // Create a temporary DOM element to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Process all <a> tags
        const links = doc.getElementsByTagName('a');
        for (let link of links) {
            const href = link.getAttribute('href');
            if (href?.startsWith('/-/media/')) {
                link.setAttribute('href', 'https://msutoday.msu.edu' + href);
            }
        }
        
        // Process all <img> tags
        const images = doc.getElementsByTagName('img');
        for (let img of images) {
            const src = img.getAttribute('src');
            if (src?.startsWith('/-/media/')) {
                img.setAttribute('src', 'https://msutoday.msu.edu' + src);
            }
        }
        
        // Create container for appending new elements
        const container = doc.createElement('div');
        container.innerHTML = doc.body.innerHTML;

        // Append Media and Public Relations paragraph
        const mediaAndPR = doc.createElement('p');
        mediaAndPR.innerHTML = '<em>MSU College of Engineering <a href="~/link.aspx?_id=CEB8C1366CA24A32A44EB82A0C39FCCF&_z=z">Media and Public Relations page</a></em>';
        container.appendChild(mediaAndPR);

        // Append Read More News paragraph
        const ReadMoreNews = doc.createElement('p');
        ReadMoreNews.innerHTML = '<a href="/news-events/news" class="cta">Read more news</a>';
        container.appendChild(ReadMoreNews);
        
        // Return the modified HTML
        return container.innerHTML;
    }
};

export const MSUTodayArticleProcessor = {
    processAndCopy() {
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) {
            Notification.show('Article content not found.', 3000);
            return;
        }

        const formattedHTML = MSUTodayHtmlProcessor.formatHTML(articleContent.innerHTML);

        navigator.clipboard.writeText(formattedHTML)
            .then(() => {
                Notification.show('Formatted article content copied to clipboard.', 3000);
            })
            .catch(err => {
                Logger.error('Error copying to clipboard:', err);
                Notification.show('Failed to copy content.', 3000);
            });
    },
};