
export default function Print(items, parameters){
  var iframe = document.createElement("iframe");
  parameters.width.current = (typeof parameters.width.current === 'undefined') ? Infinity : parameters.width.current;
  parameters.height.current = (typeof parameters.height.current === 'undefined') ? Infinity : parameters.height.current;
  
  var html = `
  <!DOCTYPE html>
  <html>

  <head>

    <style>
      
      @page {
        size: auto;
        margin: 0;
      }

      div.label {
        border: 1px ${parameters.border.current};
        display: flex;
        box-sizing: border-box;
        padding-inline: 1mm;
        align-items: center;
        white-space: pre;
        max-width: ${parameters.width.current}mm;
        line-height: ${parameters.height.current}mm; 
      }
      
      body{
        display: flex;
        flex-wrap: wrap;
        margin: 4.2 mm;
      }
      
    </style>
  
  </head>

  <body>
`
      
  for(const i of [...items].reverse()){
    let longestSet = Math.max(...i.text.split('\n').map(line => line.length));
    html += `<div class="label" style="max-height:${parameters.height.current * i.text.split('\n').length}mm; font-size:${Math.min(parameters.width.current/longestSet, parameters.height.current)}mm">${i.text}</div>\n`;
  }
      
  html += `
  </body>  
  </html>`;
  document.body.appendChild(iframe);
  iframe.style.display = "none";
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(html);
  iframe.contentWindow.document.close();
  iframe.contentWindow.print();
}

