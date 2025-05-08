module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Disallow deeply nested ternary operators',
            category: 'Best Practices',
            recommended: true,
        },
        messages: {
            nestedTernary: 'Nested ternary operators are discouraged.',
        },
        schema: [],
    },

    create(context) {
        // Max nesting level allowed (set this to 1 if you want to allow only single-level ternaries)
        const MAX_DEPTH = 1;

        // Function to check nesting depth of ternary operators
        function checkDepth(node, currentDepth) {
            if (node.type === "ConditionalExpression") {
                // Increase depth and check recursively for ternary inside both consequent and alternate
                currentDepth++;

                // If the current depth exceeds the allowed limit, report it
                if (currentDepth > MAX_DEPTH) {
                    context.report({
                        node,
                        message: "Avoid deeply nested ternary operators.",
                    });
                }

                // Check the consequent and alternate parts recursively
                checkDepth(node.consequent, currentDepth);
                checkDepth(node.alternate, currentDepth);
            }
        }

        return {
            // Trigger on encountering a ternary (ConditionalExpression)
            ConditionalExpression(node) {
                checkDepth(node, 0);  // Start checking with depth 0
            },
        };
    },
};