#!/bin/bash

# Remove all @ts-expect-error comments from TypeScript files
echo "Removing @ts-expect-error comments..."

# Find all TypeScript files and remove @ts-expect-error lines
find src -name "*.tsx" -o -name "*.ts" | while read -r file; do
    echo "Processing: $file"
    # Remove lines that start with // @ts-expect-error
    sed -i '' '/^[[:space:]]*\/\/ @ts-expect-error/d' "$file"
done

echo "Done! All @ts-expect-error comments have been removed."
echo "Run 'npx tsc --noEmit' to see the actual TypeScript errors." 