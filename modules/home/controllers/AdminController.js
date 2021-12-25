// const Loader = require("./../../../core/Loader");
const sequelize = require("../../../config/database");
const OrderModel = require('../../orders/models/OrderModel');
const OrderItemModel = require('../../orders/models/OrderItemModel');

const { QueryTypes, where } = require('sequelize');

class AdminController {

	index(req, res) {

		res.render('adminIndex', {
			title: "Home",
			content: "Admin: index"
		});
	}

	revenue(req, res) {

		res.render('revenue', {
			title: "Home",
			content: "Admin: index"
		});
	}

 	async getRevenueData(req, res){
		console.log(req.body);
		var order_items, orders, title;
		if(req.body.option == 'date'){
			order_items = await sequelize.query(` select sum(quantity) as quantity, sum(unit) as total_unit
												from order_items
												where date(created_at) = '${req.body.date}'`);

			orders = await sequelize.query(` select count(*) as sum_order
												from orders
												where date(created_at) = '${req.body.date}'`);
			title = 'Kết quả thống kê trong ngày '+ req.body.day + ' tháng ' + req.body.month + ' năm ' + req.body.year;
						
		}
		if(req.body.option == 'month'){
			order_items = await sequelize.query(` select sum(quantity) as quantity, sum(unit) as total_unit
						from order_items
						where month(created_at) = '${req.body.month}' and year(created_at) = '${req.body.year}'`);

			orders = await sequelize.query(` select count(*) as sum_order
						from orders
						where month(created_at) = '${req.body.month}' and year(created_at) = '${req.body.year}'`);
			
			title = 'Kết quả thống kê trong tháng ' + req.body.month + ' năm ' + req.body.year;
		}
		if(req.body.option == 'quarter'){
			let m_floor = Math.floor((req.body.month-1)/3)*3;
			let m_ceil = Math.ceil((req.body.month-1)/3)*3;
			console.log(m_floor);
			console.log(m_ceil);
			order_items = await sequelize.query(` select sum(quantity) as quantity, sum(unit) as total_unit
						from order_items
						where month(created_at) > ${m_floor} and month(created_at) <= ${m_ceil} and year(created_at) = '${req.body.year}'`);

			orders = await sequelize.query(` select count(*) as sum_order
						from orders
						where month(created_at) > ${m_floor} and month(created_at) <= ${m_ceil} and year(created_at) = '${req.body.year}'`);
			
			title = 'Kết quả thống kê trong quý ' + Math.ceil((req.body.month-1)/3) + ' năm ' + req.body.year;
		}
		if(req.body.option == 'year'){
			order_items = await sequelize.query(` select sum(quantity) as quantity, sum(unit) as total_unit
						from order_items
						where year(created_at) = '${req.body.year}'`);

			orders = await sequelize.query(` select count(*) as sum_order
						from orders
						where year(created_at) = '${req.body.year}'`);
			
			title = 'Kết quả thống kê trong năm ' + req.body.year;
		}
		// console.log(order_items);
		// console.log(order_items[0][0].quantity);
		// console.log(order_items[0][0].total_unit);
		// console.log(orders[0][0].sum_order);
		res.json({msg:'success', 
					sum_product: order_items[0][0].quantity, 
					total_unit: order_items[0][0].total_unit, 
					sum_order: orders[0][0].sum_order,
					title: title});
		// res.json({msg: 'success'});
	}

	bestseller(req, res) {

		sequelize.query(`select @row := @row + 1 as stt, PT.id, PT.name, PT.price, ret.quantity, ret.unit
						from products as PT,
						(select pt.id, sum(pt.price*ot.quantity) as unit, sum(ot.quantity) as quantity
						from order_items as ot, products as pt
						where ot.product_id = pt.id
						group by pt.id) as ret, (SELECT @row := 0) r
						where PT.id = ret.id
						order by ret.quantity DESC
						LIMIT 10`, { type: QueryTypes.SELECT }
		).then((ret)=>{
			// console.log(ret);
			// res.json({msg: 'success', items: ret});
			res.render('bestseller', {
				title: "Home",
				content: "Admin: index",
				data: ret
			});
		}).catch((err)=>{
			console.log(err);
		});
	}

	
}

module.exports = new AdminController();