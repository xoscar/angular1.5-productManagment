/**
 * Main Parent component of the Application
 */
export namespace ProductManagment {

  /**
   * Class that represents main component of the Project
   */
   export class ProductDetailController {
    title: string;
    id: string;
    product: any;

    static $inject = ['productService'];

    constructor(private productService: any) {
      this.title = 'Product Detail';
    }

    public $routerOnActivate(next: any, previous: any) {
      this.productService.getProduct(next.params.id)

      .then(product => (
        this.product = product
       ));
    }
  }

  angular.module('product-managment-web-app')
    .component('productDetail', {
      template: require('./product-detail.template.html'),
      controller: ProductDetailController,
    });
}
