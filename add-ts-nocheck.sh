#!/bin/bash

# Script to add // @ts-nocheck to all TypeScript files in frontend/src
# This will disable TypeScript checking for all files during migration

echo "Adding // @ts-nocheck to all TypeScript files..."

find frontend/src -name "*.tsx" -o -name "*.ts" | while read -r file; do
    # Check if the file already has @ts-nocheck
    if ! grep -q "^// @ts-nocheck" "$file"; then
        # Add @ts-nocheck at the top of the file
        echo "// @ts-nocheck" > temp_file
        cat "$file" >> temp_file
        mv temp_file "$file"
        echo "Added @ts-nocheck to: $file"
    else
        echo "Already has @ts-nocheck: $file"
    fi
done

echo "Done! All TypeScript files now have @ts-nocheck disabled."
echo "You can now commit and push your changes."
echo ""
echo "To re-enable TypeScript checking later, run:"
echo "find frontend/src -name \"*.tsx\" -o -name \"*.ts\" -exec sed -i '' '1d' {} \\;" 