const fs = require('fs');
const path = require('path');

const files = [
    'src/pages/DatabaseSQL.jsx',
    'src/pages/ComputerFundamentals.jsx',
    'src/pages/Aptitude.jsx',
    'src/pages/CodingMCQ.jsx'
];

const pattern = /(<div className="page-header"[^>]*>)\s*(<div>[\s\S]*?<\/h1>\s*<\/div>)\s*(<button[^>]*>[\s\S]*?Back[\s\S]*?<\/button>)\s*<\/div>/g;

for (const file of files) {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf-8');
        let newContent = content.replace(pattern, (match, p1, p2, p3) => {
            // Add a margin-bottom to the button so it pushes the header down slightly
            let buttonStr = p3;
            if (buttonStr.includes('style={{')) {
                buttonStr = buttonStr.replace('style={{', "style={{ marginBottom: '16px', ");
            } else {
                buttonStr = buttonStr.replace('<button', "<button style={{ marginBottom: '16px' }}");
            }
            return buttonStr + '\n        ' + p1 + '\n          ' + p2 + '\n        </div>';
        });
        
        if (newContent !== content) {
            fs.writeFileSync(file, newContent, 'utf-8');
            console.log('Fixed ' + file);
        }
    }
}
