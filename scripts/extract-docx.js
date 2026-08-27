const mammoth = require('mammoth')
const fs = require('fs')
const path = require('path')

async function extract() {
  const docxPath = path.join(process.cwd(), 'trinity new code sample.docx')
  if (!fs.existsSync(docxPath)) {
    console.error('docx file not found at', docxPath)
    process.exit(1)
  }

  const result = await mammoth.extractRawText({ path: docxPath })
  const outPath = path.join(process.cwd(), 'DOCX_EXTRACT.txt')
  fs.writeFileSync(outPath, result.value)
  console.log('Extracted text written to', outPath)
}

extract().catch((e) => { console.error(e); process.exit(1) })
