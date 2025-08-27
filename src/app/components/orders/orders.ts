import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { IOrder } from '../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CommonModule ],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit {
  orders: IOrder[] = [];
  selectedStatus: { [orderId: string]: string } = {};
  constructor(private _orderS: OrderService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this._orderS.getAllOrders().subscribe({
      next: res => {
        this.orders = Array.isArray(res) ? res : res.data;
        console.log('orders fetched:', this.orders);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  updateOrderStatus(orderId:string, orderStatus:string){
    this.selectedStatus[orderId] = orderStatus;
    this._orderS.updateOrderStatus(orderStatus,orderId).subscribe({
      next: (res) => {
        const order = this.orders.find(o => o._id === orderId);
        if (order) {
          order.status = orderStatus;
        }
        console.log('order status is updated to: ', orderStatus);
      },
      error: error =>{
        console.log('Failed to update order status: ',error)
      }
    })
  }
}
