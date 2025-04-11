/**
 * @fileoverview Centralized configuration object for UI styling, theming, and constants
 * used across the extension. Includes MSU color definitions, z-index layering,
 * CSS class groupings for common UI components, and other static configuration values.
 * 
 * @see https://getbootstrap.com/ — Bootstrap framework used for UI styling and components
 */
export const Config = {
    MSU_COLORS: {
        SPARTAN_GREEN: '#18453B',
        WHITE: '#FFFFFF',
        LIGHT_GRAY: '#E5E5E5',
        LIGHTER_GREEN: '#2E6B5F'
    },
    Z_INDEX: "100000",
    STYLES: {
        resultsBox: [
            'align-items-center',
            'border-0',
            'position-fixed',
            'top-0',
            'start-0',
            'm-4',
            'fade',
            'h-50',
            'shadow-lg'
        ],
        notification: [
            'toast',
            'align-items-center',
            'text-bg-success',
            'border-0',
            'position-fixed',
            'bottom-0',
            'end-0',
            'm-4',
            'fade'
        ],
        toggleButton:[
            'btn',
            'btn-success',
            'shadow-sm',
            'position-fixed',
            'shadow-lg'
        ],
        toolbox: [
            'rounded-3', 
            'bg-white', 
            'p-3',
            'd-none',
            'flex-column',
            'position-fixed',
            'gap-3',
            'shadow-lg'
        ],
        
        actionButton: [
            'btn', 
            'btn-outline-dark',
            'shadow-sm',
        ],
    },
    ALLOWED_TAGS: ['p', 'a', 'em', 'strong', 'ul', 'li', 'ol', 'h3', 'h4', 'h5', 'h6'],
    READ_MORE_LINK: {
        href: '/news-events/news',
        class: 'cta',
        text: 'Read more news'
    }
};