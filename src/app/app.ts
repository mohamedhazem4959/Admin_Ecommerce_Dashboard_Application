import { Component, signal } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { Login } from "./components/login/login";
import { Register } from "./components/register/register";
import { Home } from "./components/home/home";
import { Nav } from "./components/nav/nav";
import { Products } from "./components/products/products";
import { Categories } from "./components/categories/categories";
import { Orders } from "./components/orders/orders";
import { Testimoinals } from "./components/testimoinals/testimoinals";
import { SideBar } from "./components/side-bar/side-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ecommerce_Dashboard');
}
