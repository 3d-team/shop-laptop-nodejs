$(document).ready(function(){
    $('.button-add-to-cart').click(function(){
        // console.log("Thật tuyệt vời!!");
        productId = this.id;
        $.ajax({
            url:'/products/add',  
            method:'post',
            dataType:'json',  
            data:{'product_id': productId},
            success:function(response){  
                if(response.msg=='success'){  
                    console.log('add to cart success');  
                }
            },  
            error:function(response){  
                console.log('server error occured')  
            }  
        })
    });
})