$('.update-cart-button').click(function(){
    let val = $('#deliver-status-option').val();
    $('#deliver-tag-'+this.id).text(val);
    let cart_id = this.id;
    $.ajax({
        url:'/orders/updateCart',  // post target
        method:'post',
        dataType:'json',
        data:{'code': cart_id, 'delivery_status': val},
        success:function(response){  
            if(response.msg == 'success'){ 
                alert('Đã cập nhật trạng thái giao hàng');
            }            
        },  
        error:function(response){                  
            console.log('server error occured')  
        }  
    })

});
