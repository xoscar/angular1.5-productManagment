/**
 * Main Parent component of the Application
 */
export namespace ProductManagment {

  /**
   * Class that represents main component of the Project
   */
   export class ProductListController {
    title: string;
    products: any [];
    showImage: boolean;
    static $inject = ['productService'];

    constructor(private productService: any) {
      this.title = 'Products';
      this.showImage = true;
      
      productService.getAllProducts()

      .then(products => {
        this.products = products;
      });
    }

    toggleImage() {
      this.showImage = !this.showImage;
    }

    deleteProduct(id) {
      this.productService.deleteProduct(id)

      .then((products) => (
        this.products = products
      ))
    }
  }

  angular.module('product-managment-web-app')
    .component('productList', {
      template: require('./product-list.template.html'),
      controller: ProductListController,
    });
}
