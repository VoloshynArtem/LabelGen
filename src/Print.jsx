
export default function Print(items, maxW = Infinity, maxH = Infinity){
  var iframe = document.createElement("iframe");
  if(maxW == "")
    maxW = Infinity;
  if(maxH == "")
    maxH = Infinity;
  
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
        border: 1px solid black;
        display: flex;
        box-sizing: border-box;
        padding-inline: 1mm;
        align-items: center;
        white-space: pre;
        max-width: ${maxW}mm;
        line-height: ${maxH}mm; 
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
        html += `<div class="label" style="max-height:${maxH * i.text.split('\n').length}mm; font-size:${Math.min(maxW/longestSet, maxH)}mm">${i.text}</div>\n`;
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

