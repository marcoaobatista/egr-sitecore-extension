// config.js
export const Config = {
    MSU_COLORS: {
        SPARTAN_GREEN: '#18453B',
        WHITE: '#FFFFFF',
        LIGHT_GRAY: '#E5E5E5',
        LIGHTER_GREEN: '#2E6B5F'
    },
    Z_INDEX: "100000",
    STYLES: {
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
        buttonContainer: [
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