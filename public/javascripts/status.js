$(() => {
  let status

  $.get('/status/getStatus', (obj) => {
    status = obj.status


    if (status == 0) {
      //Picked

      $("#status").html(`
        <br>
       
        <h1 style="text-align: center">Delivery Status Page</h1>
    
      <br><br>
      <h1 style="text-align: center">Status : Picked</h1>
            <br><br><br>
    <h3 style="text-align: center">Click This Button When Stubble Is Delivered</h3>
    <form action="/notifier" method="GET">
      <button style = "display: block; margin: 0 auto;" id = "delivered"class="btn btn-lg btn-primary" style="text-align: center">Delivered</button>
    </form>
    <script>
    
    $("#delivered").click(() => {
      $.post('/status/getStatus', (obj) => {
        if(obj.success) {
            alert("Delivered")
            document.location.reload()
        }                    
    })
    })
    </script>
      `)
    }


    if (status == 1) {
      // Delivered

      $("#status").html(`
        <br>
        <h1 style="text-align: center">Delivery Status Page</h1>
       <br><br>
      <h1 style="text-align: center">Status : Delivered</h1>
        
    <br><br>
    <h3 style="text-align: center">Thank You !!</h3>
   
      `)
    }

  })


})