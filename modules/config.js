// config.js
export const Config = {
    MSU_COLORS: {
        SPARTAN_GREEN: '#18453B',
        WHITE: '#FFFFFF',
        LIGHT_GRAY: '#E5E5E5',
        LIGHTER_GREEN: '#2E6B5F'
    },
    STYLES: {
        notification: `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #18453B;
            color: #FFFFFF;
            padding: 10px 20px;
            border-radius: 20px;
            border: 1px solid #FFFFFF;
            font-family: 'Arial', sans-serif;
            font-size: 14px;
            font-weight: bold;
            z-index: 100002;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        `,
        toggleButton: `
            text-transform: capitalize;
            position: fixed;
            top: 40px;
            right: 30px;
            border: 2px solid white;
            background-color: #18453B;
            color: #FFFFFF;
            padding: 10px 35px;
            font-family: 'Arial', sans-serif;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            z-index: 100001;
            box-shadow: 2px 2px 0px white;
            transition: background-color 0.2s;
        `,
        buttonContainer: `
            border-radius: 8px;
            position: fixed;
            top: 90px;
            right: 30px;
            background-color: #FFFFFF;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            z-index: 100000;
            display: none;
            gap: 10px 0px;
            flex-direction: column;
        `,
        actionButton: `
            background-color: #FFFFFF;
            color: #18453B;
            padding: 10px 35px;
            border-radius: 4px;
            border: none;
            font-family: 'Arial', sans-serif;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            display: block;
            width: 100%;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: background-color 0.2s;
        `,
    },
    ALLOWED_TAGS: ['p', 'a', 'em', 'strong', 'ul', 'li', 'ol', 'h3', 'h4', 'h5', 'h6'],
    READ_MORE_LINK: {
        href: '/news-events/news',
        class: 'cta',
        text: 'Read more news'
    }
};