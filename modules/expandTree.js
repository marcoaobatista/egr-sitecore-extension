/**
 * @fileoverview Provides a utility to programmatically expand nodes in the Sitecore content tree,
 * excluding predefined folders that are typically not relevant for routine editing.
 */
export const ExpandTree = {
    /**
     * Expands all collapsed Sitecore content tree nodes except those listed in the exclusion array.
     * Nodes are identified by their label text and a collapsed tree glyph image.
     */
    expand(){
        const excludedNodes = [
            'Global Configurations',
            'EGR Components',
            'EGR Configuration',
            'Global Components',
            'Media Library',
            'Page Components',
            'Faculty Items',
            'Job Cards'
        ];
        
        document.querySelectorAll('.scContentTreeNode').forEach(node => {
            const nodeName = node.querySelector('.scContentTreeNodeNormal span')?.textContent.trim();
        
            // Check if the node is collapsed and not in the excluded list
            if (nodeName && !excludedNodes.includes(nodeName)) {
                const glyph = node.querySelector('.scContentTreeNodeGlyph');
                if (glyph && glyph.src.includes('treemenu_collapsed.png')) {
                    glyph.click();
                }
            }
        });        
    }
}