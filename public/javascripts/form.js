$(() => {
    $.get('/form/getWarehouseName', (obj) => {
      $('#data').html(`
      <h4> User 1, You Are Supposed To Deliver Stubble To Warehouse:  ${obj.warehouse}</h4>
      <br>
      <h4> Type Of Crop:  ${obj.crop}</h4>
      <br>
      <h4> Estimated Quantity:  ${obj.quantity}</h4>

      `)

    })
})