$(document).ready(function(){
    $('.change-number-item').bind('keyup input', function(){
        // get prodruct id
        productId = this.id;
        val = this.value;
        $.ajax({
            url:'/orders/changeNumberItem',  // post target
            method:'post',
            dataType:'json', 
            data:{'product_id': productId, number: val},
            success:function(response){  
                if(response.msg=='success'){ 
                    $("#total-unit-of-cart").text('Tổng tiền: ' +  response.total_unit +' VND');
                    $("#number-item-in-cart").text(response.cart_number);
                    $('#total-unit-item-'+productId).text(response.total_unit_item + '.VND');
                }

                if (response.msg == 'negative-number'){ 
                    alert("Số lượng sản phẩm không được nhỏ hơn 0!");
                }

                if(response.msg == 'out of stock'){
                    alert('Vượt quá số lượng trong kho!');
                }
                
            },  
            error:function(response){                  
                console.log('server error occured')  
            }  
        })
    });

    $('.button-add-to-cart').click(function(){
        // get prodruct id
        productId = this.id;
        $.ajax({
            url:'/orders/add',  // post target
            method:'post',
            dataType:'json', 
            data:{'product_id': productId},
            success:function(response){  
                if(response.msg == 'success'){ 
                    $("#number-item-in-cart").text(response.cart_number);
                }
                if(response.msg=='out of stock'){
                    alert('Vượt quá số lượng trong kho!');
                }
            },  
            error:function(response){                  
                console.log('server error occured')  
            }  
        })
    });

    $('.delete-cart-item-btn').click(function(){
        // get prodruct id
        productId = this.id;
        $.ajax({
            url:'/orders/remove',  // post target
            method:'post',
            dataType:'json',  
            data:{'product_id': productId},
            success:function(response){  
                if(response.msg=='success'){
                    $("#total-unit-of-cart").text('Tổng tiền: ' +  response.total_unit +' VND');
                    $("#number-item-in-cart").text(response.cart_number);
                    console.log('remove item-' + productId +'from cart successful');  
                }
            },  
            error:function(response){  
                console.log('server error occured')  
            }  
        })
    });    

    $('#submit-cart-btn').click(function(){
        var deliveryAddress = document.getElementById('delivery-address').value;
        var fullnameReceiver = document.getElementById('fullname-receiver').value;
        var phoneReceiver = document.getElementById('phone-receiver').value;
        if(deliveryAddress === ''){
            $('#delivery-address-err').text(' --Mục này không được bỏ trống');
            return;
        }
        $('#delivery-address-err').text('');
        if(fullnameReceiver === ''){
            $('#fullname-receiver-err').text(' --Mục này không được bỏ trống');
            return;
        }
        $('#fullname-receiver-err').text('');
        if(phoneReceiver === ''){
            $('#phone-receiver-err').text(' --Mục này không được bỏ trống');
            return;
        }
        $('#phone-receiver-err').text('');


        
        $.ajax({
            url:'/orders/submit',  // post target
            method:'post',
            dataType:'json',
            data:{'confirm_submit': 'YES',
                    'address': deliveryAddress,
                    'phone_receiver': phoneReceiver,
                    'fullname_receiver': fullnameReceiver},
            success:function(response){  
                if(response.msg == 'success'){
                    $("#total-unit-of-cart").text('Tổng tiền: ' +  0 +' VND');
                    $("#number-item-in-cart").text('0');
                    $("#delivery-address").val('');
                    $("#fullname-receiver").val('');
                    $("#phone-receiver").val('');

                    $('#item-lists').toggle("blind");
                    alert("Đặt hàng thành công!");
                }
                if(response.msg == 'empty'){
                    alert("Giỏ hàng trống!");
                }
                if(response.msg == 'not-login'){
                    alert("Bạn chưa đăng nhập!");
                }
            },  
            error:function(response){
                console.log('server error occured')  
            }  
        })
    });

    $('#destroy-cart-btn').click(function(){
        // get prodruct id
        productId = this.id;
        $.ajax({
            url:'/orders/destroy',  // post target
            method:'post',
            dataType:'json',  
            data:{'confirm_destroy': 'YES'},
            success:function(response){  
                if(response.msg=='success'){  
                    $("#total-unit-of-cart").text('Tổng tiền: ' +  0 +' VND');
                    $("#number-item-in-cart").text('0');
                    $("#delivery-address").val('');
                    $("#fullname-receiver").val('');
                    $("#phone-receiver").val('');
                    $('#item-lists').toggle("blind");
                }
            },  
            error:function(response){  
                console.log('server error occured')  
            }  
        })
    });
})