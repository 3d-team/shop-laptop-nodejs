$(document).ready(function(){
    $('#submit-statistics-button').click(function(){
        var date = new Date($('#date-input').val());
        var day = date.getDate();
        if(isNaN(day)){
            alert("Bạn chưa chọn ngày/tháng/năm!");
            return;
        }
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        // console.log([year, month, day].join('-'));
        var option = $('#statistic-option-select').val();
        
        $.ajax({
            url:'/admin/statistics/getRevenueData',  // post target
            method:'post',
            dataType:'json', 
            data:{'option': option,
                'date': [year, month, day].join('-'),
                'day': day,
                'month': month,
                'year': year},
            success:function(response){  
                if(response.msg=='success'){ 
                //    console.log(response);
                $('#title-result').text(response.title);
                   if(response.total_unit){
                        $('#sum_product_header').text(response.sum_product);
                        $('#total_unit_header').text(response.total_unit);
                   }
                   else{
                        $('#sum_product_header').text(0);
                        $('#total_unit_header').text(0);
                   }
                   $('#sum_order_header').text(response.sum_order);
                }
            },  
            error:function(response){                  
                console.log('server error occured')  
            }  
        })
    });
});