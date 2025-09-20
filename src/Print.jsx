
export default function Print(items){
  var iframe = document.createElement('iframe');
  
    
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

      div.dotted {
        border: 1px solid black;
        
        height: 16mm;
        display: flex;
        align-items: center; 
        justify-content: center; 
        box-sizing: border-box;
        font-size: 16mm; 
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

      for(const i of items.reverse()){
         html += `<div class="dotted">` + i.text + `</div>`;
       }
      
  html += '</html>'  
;
    document.body.appendChild(iframe);
    iframe.style.display = 'none';
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
    iframe.contentWindow.print();
}