export namespace ProductManagment {
  export interface IProductAddController {
    productName: string;
    title: string;
    productCode: string;
    releaseDate: string;
    description: string;
    price: number;
    productId: number;
    imageUrl: string;
    clean(): void;
    addProduct(): any;
    fromProduct(product: any): any;
  }

   export class ProductAddController implements IProductAddController{
    title: string;

    // creation of the product
    productName: string;
    productCode: string;
    releaseDate: string;
    description: string;
    price: number;
    imageUrl: string;
    productId: number;

    static $inject = ['productService'];
    constructor(private productService: any) {
      this.title = 'Add Product';
      this.clean();
    }

    addProduct() {
      const body = {
        productName: this.productName,
        productCode: this.productCode,
        releaseDate: this.releaseDate,
        description: this.description,
        price: this.price,
        imageUrl: this.imageUrl,
      };

      !this.productId ? this.productService.addProduct(body) : this.productService.updateProduct(this.productId, body);

      this.clean();
    }

    clean() {
      this.productName = '';
      this.productCode = '';
      this.releaseDate = '';
      this.description = '';
      this.price = 0;
      this.imageUrl = '';
      this.productId = null;
    }

    fromProduct(product: any) {
      this.productName = product.productName;
      this.productCode = product.productCode;
      this.releaseDate = product.releaseDate;
      this.description = product.description;
      this.price = product.price;
      this.imageUrl = product.imageUrl;
      this.productId = product.productId;
      this.title = 'Update Product';
    }

    public $routerOnActivate(next: any, previous: any) {
      if (next.params && next.params.id) {
        this.productService.getProduct(next.params.id)

        .then(product => (
          this.fromProduct(product)
         ));
      }
    }
  }

  angular.module('product-managment-web-app')
    .component('productAdd', {
      template: require('./product-add.template.html'),
      controller: ProductAddController,
    });
}
