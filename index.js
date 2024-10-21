const fs = require('fs');
const xml2js = require('xml2js');

// XAML to HTML Converter Class
class XamlToHtmlConverter {
  constructor() {
    this.parser = new xml2js.Parser({
      explicitArray: false, // Do not put single children into arrays
      mergeAttrs: true,     // Merge attributes into the element
    });
  }

  // Parse XAML string and convert to HTML
  parseXamlString(xamlString) {
    return new Promise((resolve, reject) => {
      this.parser.parseString(xamlString, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const html = this.convertXamlToHtml(result);
          resolve(html);
        }
      });
    });
  }

  // Convert parsed XAML object to HTML
  convertXamlToHtml(xamlObj) {
    if (xamlObj.Window) {
      return this.renderWindow(xamlObj.Window);
    } else {
      return '<div>Error: No Window element found</div>';
    }
  }

  // Render the Window element
  renderWindow(windowObj) {
    const title = windowObj.Title || "Untitled Window";
    const width = windowObj.Width || "600px";
    const height = windowObj.Height || "400px";

    return `
      <div class="w3-container">
        <h1 class="w3-center">${title}</h1>
        <div class="w3-card w3-padding" style="width:${width}; height:${height};">
          ${this.renderGrid(windowObj.Grid)}
        </div>
      </div>
    `;
  }

  // Render the Grid element (just a div in HTML)
  renderGrid(gridObj) {
    if (!gridObj) return '';

    let html = '<div class="w3-row w3-padding">';
    if (gridObj.Button) {
      html += this.renderButton(gridObj.Button);
    }
    if (gridObj.TextBlock) {
      html += this.renderTextBlock(gridObj.TextBlock);
    }
    html += '</div>';
    return html;
  }

  // Render the Button element
  renderButton(buttonObj) {
    const content = buttonObj.Content || "Button";
    const width = buttonObj.Width || "100px";
    const height = buttonObj.Height || "50px";

    return `
      <div class="w3-col s12 m4">
        <button class="w3-button w3-blue" style="width:${width}; height:${height};" onclick="handleButtonClick()">
          ${content}
        </button>
      </div>
    `;
  }

  // Render the TextBlock element
  renderTextBlock(textBlockObj) {
    const text = textBlockObj.Text || "";
    const fontSize = textBlockObj.FontSize || "16px";

    return `
      <div class="w3-col s12 m8 w3-padding">
        <p style="font-size:${fontSize};">${text}</p>
      </div>
    `;
  }

  // Parse XAML file and convert to HTML
  parseXamlFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, xamlContent) => {
        if (err) {
          reject(err);
        } else {
          this.parseXamlString(xamlContent)
            .then(resolve)
            .catch(reject);
        }
      });
    });
  }
}

module.exports = XamlToHtmlConverter;