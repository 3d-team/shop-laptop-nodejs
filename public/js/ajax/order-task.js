$(document).ready(function(){
    $('.button-add-to-cart').click(function(){
        // get prodruct id
        productId = this.id;
        $.ajax({
            url:'/orders/add',  // post target
            method:'post',
            dataType:'json',  
            data:{'product_id': productId},
            success:function(response){  
                if(response.msg=='success'){ 
                    var numberItem = document.getElementById('number-item-in-cart');
                    numberItem.innerText = response.cart_number;
                    console.log('add to cart success');  
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
                    var totalUnitTag = document.getElementById('total-unit-of-cart');
                    totalUnitTag.innerText = 'Tổng tiền: ' +  response.total_unit +' VND';
                    var numberItem = document.getElementById('number-item-in-cart');
                    numberItem.innerText = response.cart_number;
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
        $.ajax({
            url:'/orders/submit',  // post target
            method:'post',
            dataType:'json',
            data:{'confirm_submit': 'YES',
                    'address': deliveryAddress},
            success:function(response){  
                if(response.msg == 'success'){
                    var totalUnitTag = document.getElementById('total-unit-of-cart');
                    totalUnitTag.innerText = 'Tổng tiền: ' +  '0' +' VND';
                    var numberItem = document.getElementById('number-item-in-cart');
                    numberItem.innerText = '0';
                    $('#item-lists').toggle("blind");
                    alert("Đặt hàng thành công!");
                }
                if(response.msg == 'empty'){
                    alert("Giỏ hàng trống!");
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
                    var totalUnitTag = document.getElementById('total-unit-of-cart');
                    totalUnitTag.innerText = 'Tổng tiền: ' +  '0' +' VND';
                    var numberItem = document.getElementById('number-item-in-cart');
                    numberItem.innerText = '0';
                    $('#item-lists').toggle("blind");
                }
            },  
            error:function(response){  
                console.log('server error occured')  
            }  
        })
    });
})