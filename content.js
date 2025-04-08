// content.js
(async function() {
    try {
      const bootstrapCSS = document.createElement("link");
      bootstrapCSS.rel = "stylesheet";
      bootstrapCSS.href = chrome.runtime.getURL("bootstrap/css/bootstrap.min.css");
      document.head.appendChild(bootstrapCSS);

      // Dynamically import modules
      const { Logger } = await import(chrome.runtime.getURL('modules/logger.js'));
      const { UI } = await import(chrome.runtime.getURL('modules/ui.js'));
      
      Logger.log('Content script started', 'URL:', window.location.href);
      UI.start();
    } catch (error) {
      console.error('Error in content script:', error.message);
    }
  })();