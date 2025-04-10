/**
 * @fileoverview Entry point content script for the browser extension.
 * Injects a shadow DOM host into the page, loads required CSS and JS dependencies
 * (e.g., Bootstrap, jQuery), and initializes the UI module within an isolated shadow DOM context.
 * Also sets up Bootstrap tooltips scoped to the shadow DOM.
 */
(async function() {
    try {
      // Create shadow host node
      const shadowRoot = document.createElement('div');
      shadowRoot.id = 'shadowHostRoot';
      document.body.appendChild(shadowRoot);
      const shadowHost= shadowRoot.attachShadow({ mode: "open" });

      // Include extension CSS
      const extensionCSS = document.createElement("link");
      extensionCSS.rel = "stylesheet";
      extensionCSS.href = chrome.runtime.getURL("./extension-global.css");
      shadowHost.appendChild(extensionCSS);
      
      // Load Bootstrap Bundle JS (includes Popper)
      const jQueryScript = document.createElement("script");
      jQueryScript.src = chrome.runtime.getURL("./jquery-3.7.1.min.js");
      shadowHost.appendChild(jQueryScript);
      
      // Load Bootstrap Bundle JS (includes Popper)
      const bootstrapScript = document.createElement("script");
      bootstrapScript.src = chrome.runtime.getURL("bootstrap/js/bootstrap.bundle.js");
      shadowHost.appendChild(bootstrapScript);
      
      // Then include Bootstrap CSS
      const bootstrapCSS = document.createElement("link");
      bootstrapCSS.rel = "stylesheet";
      bootstrapCSS.href = chrome.runtime.getURL("bootstrap/css/bootstrap.css");
      shadowHost.appendChild(bootstrapCSS);
      
      // Dynamically import modules
      const { Logger } = await import(chrome.runtime.getURL('modules/logger.js'));
      const { UI } = await import(chrome.runtime.getURL('modules/ui.js'));
      
      Logger.log('Content script started', 'URL:', window.location.href);
      UI.start(shadowHost);

      // Enable tooltip
      const tooltipTriggerList = shadowHost.querySelectorAll('[data-bs-toggle="tooltip"]')
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
          container: shadowHost
        })
      })

    } catch (error) {
      console.error('Error in content script:', error.message);
    }
  })();