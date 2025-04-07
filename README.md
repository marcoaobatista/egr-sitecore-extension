# Sitecore EGR Extension

The Sitecore EGR Extension consists of toolkit designed to enhance your Sitecore content management workflow. This extension provides a set of specialized tools that simplify common tasks, improve content formatting, and streamline your publishing process.

## Overview

The Sitecore EGR Extension adds a convenient toolbox to the top right corner of your Sitecore environment, accessible on:

- https://msutoday.msu.edu/
- https://webcms.sitecore.msu.edu/sitecore/

This documentation will guide you through the features, functionality, and usage of each tool within the extension, helping you leverage its capabilities to enhance your content management experience.

## Key Features

### Process Clipboard HTML

Cleans, restructures, and formats an HTML string by removing unwanted styles, filtering tags, converting bullet points to lists, properly structuring paragraphs, preserving valid elements, sanitizing URLs, appending a “Read More” link, and formatting the final HTML output for readability.
How it works
This button does the following to the content in the user’s clipboard:

- **Processes an HTML string** by cleaning and reformatting its content.
- **Removes inline styles** and \<style> tags to ensure a cleaner output.
- **Filters out disallowed HTML tags** based on the allowed list.
- **Unwraps disallowed tags** while preserving their child content.
- **Converts bullet points into unordered lists (\<ul>\<li>...\</li>\</ul>)** if they match common bullet symbols.
- **Formats paragraphs** by handling line breaks properly and removing empty or unnecessary tags.
- **Preserves specific elements** (e.g., \<a> tags) while ensuring URLs are clean, especially removing urldefense.com wrappers.
- **Appends a “Read More” button** at the end of the content.
- **Formats the final HTML structure** with indentation for better readability.

#### How to use it

1. Copy the news story from a given email or Word document.
2. Paste the content in the Sitecore Rich Text Editor, in the _Design_ tab.
3. In the _HTML_ tab, copy the text from the text area.
4. Expand the toolbox, and click the _Process Clipboard HTML_ button.
5. Paste the content in the _HTML_ tab text area.

### Copy Published URL

Extracts the active content tree node’s path, constructs the URL of the published page, and copies it to the clipboard.
How it works

- **Generates a published URL** based on the selected content tree node in a web-based content management system.
- **Extracts the hierarchical path** from the active content tree node and page title.
- **Trims unnecessary parts** of the path before constructing the final URL.
- **Logs the generated URL** and displays notifications for success or failure.
- **Copies the generated URL to the clipboard** and notifies the user upon success or failure.

#### How to use it

1. In the Sitecore content tree, select a page.
2. Expand the toolbox, and click the _Copy Published URL_ button.
3. The link will be copied to your clipboard.

### MSUToday Article

Gets content from MSUToday news article, formats article content by updating links, and copying the processed HTML to the clipboard while providing user notifications.
How it works

- **Formats HTML content** by processing links, images, and appending additional elements.
- **Corrects relative URLs** for \<a> and \<img> tags by prefixing them with https://msutoday.msu.edu.
- **Appends additional content**, including a Media and Public Relations link and a “Read More News” call-to-action.
- **Processes and copies article content**, ensuring it is formatted correctly before copying it to the clipboard.
- **Displays notifications** for success or failure when copying the formatted content.

#### How to use it

1. Open MSUToday article page.
2. Expand the toolbox, and click the _MSUToday Article_ button.
3. Article HTML will be copied to your clipboard.

### Expand Tree

Automatically expands non-excluded nodes in a Sitecore content tree by detecting and clicking collapsed nodes.

#### How it works

- **Expands specific nodes** in a Sitecore content tree by simulating clicks on collapsed nodes.
- **Excludes certain nodes** (like “Global Configurations” and “Media Library”) from being expanded.
- **Identifies collapsed nodes** by checking if their expansion glyph (treemenu_collapsed.png) is present.
- **Automates tree expansion** while ensuring excluded nodes remain untouched.

#### How to use it

1. Simply open the Content Editor, expand the toolbox, and click the _Expand Tree_ button.
