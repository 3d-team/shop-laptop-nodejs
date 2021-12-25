const Loader = require("./../../../core/Loader");
const sequelize = require("../../../config/database");
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