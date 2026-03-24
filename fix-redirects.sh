#!/bin/bash
# Script to fix _redirects directory issue

# Remove the directory
rm -rf public/_redirects

# Create the file
cat > public/_redirects << 'EOF'
/* /index.html 200
EOF

echo "✅ Fixed _redirects file"
echo "Now run: git add public/_redirects && git commit -m 'Fix _redirects' && git push"
