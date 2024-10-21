"use strict"
const assert = require('assert');
const XamlToHtmlConverter = require('../index');

describe("Render Test",async function(){
    it("render", async function(){
        const converter = new XamlToHtmlConverter();
  
        try {
          // Read and convert a XAML file
          const html = await converter.parseXamlFile('./example.xaml');
          
          // Output the converted HTML
          console.log('Converted HTML:', html);
      
          // Optionally, write the HTML to a file (for example, to render in a browser)
          fs.writeFileSync('./output.html', html, 'utf8');
          console.log('HTML output written to output.html');
          assert.ok(fs.existSync('./output.html','HTML output written to output.html'))
        } catch (err) {
          console.error('Error:', err);
        }
      
    })
})