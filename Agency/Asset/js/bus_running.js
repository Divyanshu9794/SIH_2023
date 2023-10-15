$(document).ready(function() {
    var dataTable = $('#filtertable').DataTable({
        "pageLength":5,
        'aoColumnDefs':[{
            'bSortable':false,
            'aTargets':['nosort'],
        }],
        columnDefs:[
            {type:'date-dd-mm-yyyy',aTargets:[5]}
        ],
        "aoColumns":[
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        "order":false,
        "bLengthChange":false,
        "dom":'<"top">ct<"top"p><"clear">'
    });
    $("#filterbox").keyup(function(){
        dataTable.search(this.value).draw();
    });
  } );
  let result = document.getElementById("source");
   
          function changeColor(color) {
              document.body.style.background = color;
          }
   
          function change() {
              changeColor('#8b9096');
              result.innerHTML = "Inactive";
          }  
     /*     let result = document.getElementById("source2");
   
          function changeColor(color) {
              document.body.style.background = color;
          }
   
          function change() {
              changeColor('#8b9096');
              result.innerHTML = "Inactive";
          }   
  
          let result = document.getElementById("source3");
   
          function changeColor(color) {
              document.body.style.background = color;
          }
   
          function change() {
              changeColor('#8b9096');
              result.innerHTML = "Inactive";
          }   
  
          let result = document.getElementById("source4");
   
          function changeColor(color) {
              document.body.style.background = color;
          }
   
          function change() {
              changeColor('#8b9096');
              result.innerHTML = "Inactive";
          }   
  
          let result = document.getElementById("source5");
   
          function changeColor(color) {
              document.body.style.background = color;
          }
   
          function change() {
              changeColor('#8b9096');
              result.innerHTML = "Inactive";
          }   
  
          let result = document.getElementById("source6");
   
          function changeColor(color) {
              document.body.style.background = color;
          }
   
          function change() {
              changeColor('#8b9096');
              result.innerHTML = "Inactive";
          }   
  
          let result = document.getElementById("source7");
   
          function changeColor(color) {
              document.body.style.background = color;
          }
   
          function change() {
              changeColor('#8b9096');
              result.innerHTML = "Inactive";
          }   
  
          let result = document.getElementById("source8");
   
          function changeColor(color) {
              document.body.style.background = color;
          }
   
          function change() {
              changeColor('#8b9096');
              result.innerHTML = "Inactive";
          } 
          let result = document.getElementById("source9");
   
          function changeColor(color) {
              document.body.style.background = color;
          }
   
          function change() {
              changeColor('#8b9096');
              result.innerHTML = "Inactive";
          }   
  
          let result = document.getElementById("source10");
   
          function changeColor(color) {
              document.body.style.background = color;
          }
   
          function change() {
              changeColor('#8b9096');
              result.innerHTML = "Inactive";
          } */