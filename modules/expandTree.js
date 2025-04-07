// expandTree.js
export const ExpandTree = {
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