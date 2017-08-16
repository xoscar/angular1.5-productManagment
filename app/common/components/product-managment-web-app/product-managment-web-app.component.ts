import '../productList/product-list.component.ts';
import '../productDetail/product-detail.component.ts';

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
      }],
    });
}
