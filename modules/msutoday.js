/**
 * @fileoverview Provides specialized formatting utilities for MSUToday articles.
 * Includes logic for rewriting media URLs, and appending standard footers to 
 * article content. Also supports copying processed HTML to clipboard.
 */
import { Logger } from './logger.js';
import { Notification } from './notification.js';

export const MSUTodayHtmlProcessor = {
    /**
     * Formats raw HTML from MSUToday articles. Rewrites relative media URLs to absolute,
     * adds green line styling to image captions when present, and appends standard footer paragraphs.
     *
     * @param {string} html - Raw HTML string from article content.
     * @return {string} Cleaned and enhanced HTML string.
     */
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

            // if the lightbox image has a caption, add a green line if not present

            // find the <a> tag
            const link_location = img.closest('a');
            console.log(link_location);

            // if an <a> tag was found
            if (link_location) {
                // caption placement
                const caption = link_location.nextElementSibling;
                console.log(caption);
                
                // if the next div is the caption, then add the green line
                if (caption && caption.tagName === 'DIV') {
                    caption.classList.add('line');
                    console.log(caption);
                }
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
    /**
     * Extracts article content from the page, processes it with MSUTodayHtmlProcessor,
     * and writes the formatted HTML to the clipboard. Displays notifications for success or failure.
     */
    processAndCopy() {
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) {
            Notification.show('Article content not found.', 3000);
            return;
        }

        const formattedHTML = MSUTodayHtmlProcessor.formatHTML(articleContent.innerHTML);

        navigator.clipboard.writeText(formattedHTML)
            .then(() => {
                ResultsBox.show('MSUToday Article HTML', cleanedHtml);
                Notification.show('Formatted article content copied to clipboard.', 3000);
            })
            .catch(err => {
                Logger.error('Error copying to clipboard:', err);
                Notification.show('Failed to copy content.', 3000);
            });
    },
};