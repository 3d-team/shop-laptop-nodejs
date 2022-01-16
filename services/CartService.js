const Loader = require("./../core/Loader");
const ProductModel = Loader.model('product');
const OrderModel = require('./../modules/orders/models/OrderModel')
const OrderItemModel = require('./../modules/orders/models/OrderItemModel');

class CartService {
	async addCartItem(productId, cart) {
		let item = {};

		const isOrdered = cart.items.has(productId);
		if (isOrdered) {
			item = cart.items.get(productId);
			if(item.quantity >= item.remainQuantity){
				return false;
			}
			item.quantity += 1;
			item.unit += item.price;
		} else {
			const product = await ProductModel.findOne({where: {id: productId}});

			item = {
				product_id: product.id,
				name: product.name,
				remainQuantity: product.quantity,
				quantity: 1,
				price: product.price, 
				unit: product.price,
				image: product.image
			};
			cart.items.set(productId, item);
		}
		cart.number += 1;
		cart.total_unit += item.price;
		return true;
	}

	modifyCartItem(productID, unit, cart) {
		const item = cart.items.get(productID);
		
		if(parseInt(unit) > item.remainQuantity){
			return false;
		}
		

		cart.number += (unit - item.quantity);
		cart.total_unit += item.price * (unit - item.quantity);

		item.unit += item.price * (unit - item.quantity);
		item.quantity = parseInt(unit);
		
		return item;
	}

	removeCartItem(productID, cart) {
		const item = cart.items.get(productID);
		cart.total_unit -= item.unit;
		cart.number -= item.quantity;

		return cart.items.delete(productID);
	}

	async submitCart(request, cart) {
		const orderRepository = request.app.get('context').make('orderRepository');

		let data = {
			customer_id: request.user.id,
			payment_status: 'Chưa thanh toán!',
			delivery_status: 'Đang chuẩn bị hàng!',
			delivery_address: request.body.address,
			phone_receiver: request.body.phone_receiver,
			fullname_receiver: request.body.fullname_receiver,
			total_unit: cart.total_unit
		}
		const order = await orderRepository.createOrder(data);
		
		for (const value of cart.items.values()) {
			await ProductModel.update(
				{quantity: value.remainQuantity - value.quantity},
				{
					where:{
						id: value.product_id
					}
				}
			)
			const orderDetail = {
				order_id: order.code,
				product_id: value.product_id,
				quantity: value.quantity,
				unit: value.unit
			};
			orderRepository.createOrderDetail(orderDetail);
		}
	}

	destroyCart(cart) {
		cart.items.clear();
		cart.number = 0;
		cart.total_unit = 0;
	}
}

module.exports = CartService;