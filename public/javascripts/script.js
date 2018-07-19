document.addEventListener('DOMContentLoaded', () => {

  console.log('You got in!');

  
  $(".deleteAlert").on("click", function (e){
    if (confirm("Are you sure?")){
      $(this).submit();
      return;
    } else {
      e.preventDefault();
    }
  });


}, false);

