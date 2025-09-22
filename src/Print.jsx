
export default function Print(items, maxW = Infinity, maxH = Infinity){
  var iframe = document.createElement("iframe");
  
  var html = `
  <!DOCTYPE html>
  <html>

  <head>
    <script type="text/javascript" src="script.js"></script>

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
        `
        
        html += "max-height:" +maxH + "mm;";
        html += "max-width:" +maxW + ";";
        html += "font-size: " + Math.min(maxH, maxW) + "mm;";
        
        html += `
        
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
         html += `<div class="label">` + i.text + `</div>`;
       }
      
  html += "</html>"  
;
    document.body.appendChild(iframe);
    iframe.style.display = "none";
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
    iframe.contentWindow.print();
}

