// content.js
(async function() {
    try {
      // Dynamically import modules
      const { Logger } = await import(chrome.runtime.getURL('modules/logger.js'));
      const { UI } = await import(chrome.runtime.getURL('modules/ui.js'));
      
      Logger.log('Content script started', 'URL:', window.location.href);
      UI.start();
    } catch (error) {
      console.error('Error in content script:', error.message);
    }
  })();