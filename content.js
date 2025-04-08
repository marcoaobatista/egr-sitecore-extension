// content.js
(async function() {
    try {
      // Include Popper.js first
      const popperScript = document.createElement("script");
      popperScript.src = chrome.runtime.getURL("./popper.min.js");
      document.head.appendChild(popperScript);

      // Then include Bootstrap CSS
      const bootstrapCSS = document.createElement("link");
      bootstrapCSS.rel = "stylesheet";
      bootstrapCSS.href = chrome.runtime.getURL("bootstrap/css/bootstrap.min.css");
      document.head.appendChild(bootstrapCSS);

      // Include extension CSS
      const extensionCSS = document.createElement("link");
      extensionCSS.rel = "stylesheet";
      extensionCSS.href = chrome.runtime.getURL("./extension-global.css");
      document.head.appendChild(extensionCSS);
      
      // Dynamically import modules
      const { Logger } = await import(chrome.runtime.getURL('modules/logger.js'));
      const { UI } = await import(chrome.runtime.getURL('modules/ui.js'));
      
      Logger.log('Content script started', 'URL:', window.location.href);
      UI.start();

      // Enable tooltip
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    } catch (error) {
      console.error('Error in content script:', error.message);
    }
  })();