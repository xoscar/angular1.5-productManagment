import '../productList/product-list.component.ts';
import '../productDetail/product-detail.component.ts';
import '../productAdd/product-add.component.ts';

/**
 * Main Parent component of the Application
 */
export namespace ProductManagment {

  /**
   * Class that represents main component of the Project
   */
   export class ProductManagmentController {
    constructor() {}
  }

  angular.module('product-managment-web-app')
    .component('productmanagmentcelweb', {
      template: require('./product-managment-web-app.template.html'),
      controller: ProductManagmentController,
      $routeConfig: [{
        path: '/products',
        name: 'Products List',
        component: 'productList',
        useAsDefault: true,
      }, {
        path: '/products/:id',
        name: 'Product Detail',
        component: 'productDetail',
      }, {
        path: '/products/add',
        name: 'Product Add',
        component: 'productAdd',
      }, {
        path: '/products/update/:id',
        name: 'Product Update',
        component: 'productAdd',
      }],
    });
}
