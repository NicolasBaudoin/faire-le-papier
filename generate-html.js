const fs = require('fs');

const htmlPath = 'index.html'; // Path relative to the repository root
const cssPath = 'styles.css';   // Path relative to the repository root
const jsPath = 'script.js';    // Path relative to the repository root
const outputPath = 'packaged.html'; // Path relative to the repository root

const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const cssContent = fs.readFileSync(cssPath, 'utf-8');
const jsContent = fs.readFileSync(jsPath, 'utf-8');

const combinedHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    ${cssContent}
  </style>
</head>
<body>
  ${htmlContent}
  <script>
    ${jsContent}
  </script>
</body>
</html>
`;

fs.writeFileSync(outputPath, combinedHtml);

console.log('Packaging complete!');
