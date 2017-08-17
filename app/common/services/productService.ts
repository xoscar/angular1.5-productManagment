import { Promise } from 'ts-promise';
const staticProducts = require('../static/products');

export namespace ProductManagment {
	export interface IProductService  {
		products: any[];
		getProduct(id: number): any;
		getAllProducts(): any;
		addProduct(body: any): any;
		updateProduct(id: number, body: any): any;
		deleteProduct(id: number): any;
		validateBody(body: any): any[];
		save(): boolean;
	}

	export class ProductService implements IProductService {
		static $inject = ['$http', 'localStorageService'];
		static contentId = 'managment-products';
		static requiredKeys = ['productName', 'productCode', 'releaseDate', 'description', 'price', 'imageUrl'];
		products: any[];

		constructor(private $http: ng.IHttpService, private localStorageService: any) {
			const storageProducts = localStorageService.getItem(ProductService.contentId)
			this.products =	JSON.parse(storageProducts) || staticProducts;
		}

		validateBody(body: any): any[] {
			return ProductService.requiredKeys.filter(key => (
				!body[key]
			))
		}

		getProduct(id: number) {
			return this.$http({
				method: 'GET',
				url: '/api/products/' + String(id),
			})

			.catch(() => (
				Promise.resolve(this.products.filter(product => +id === product.productId)[0] || { productId: 0 })
			))
		}

		save() {
			return !Boolean(this.localStorageService.setItem(ProductService.contentId, JSON.stringify(this.products)));
		}

		getAllProducts() {
			return this.$http({
				method: 'GET',
				url: `/api/products`,
			})

			.catch(() => (
				Promise.resolve(this.products)
			));
		}

		updateProduct(id: number, body: any): any {
			const missingFields = this.validateBody(body);
			if (missingFields.length !== 0) {
				return Promise.reject(new Error(JSON.stringify(missingFields)));
			}

			return this.$http({
				method: 'PUT',
				url: '/api/products/' + id,
				headers: {
					'Content-type': 'application/json',
				},
				data: body,
			})

			.then(() => (
				Promise.resolve(this.getAllProducts())
			), () => {
				const productToUpdate = this.products.filter(product => (
					product.productId === id
				))[0];

				if (!productToUpdate) {
					return Promise.reject(new Error('Product not found'));
				}

				this.products.map((product) => (
					product.productId === id ? (<any>Object).assign(product, body) : product
				))

				return Promise.resolve(this.save());
			})
		}

		deleteProduct(id: number): any {
			const removeProduct = () => {
				this.products = this.products.filter(product => (
					product.productId !== id
				));
				this.save();
				return Promise.resolve(this.products);
			}

			return this.$http({
				method: 'DELETE',
				url: '/api/products/' + id,
			})

			.then(() => (
				removeProduct()
			), () => (
				removeProduct()
			));
		}

		addProduct(body: any): any {
			const missingFields = this.validateBody(body);
			if (missingFields.length !== 0) {
				return Promise.reject(new Error(JSON.stringify(missingFields)));
			}

			const addToLocalStorage = () => {
				this.products.push((<any>Object).assign(body, {
					productId: this.products.length + 1,
				}));

				return Promise.resolve(this.save());
			};

			return this.$http({
				method: 'POST',
				url: '/api/products',
				headers: {
					'Content-Type': 'application/json',
				},
				data: (<any>Object).assign(body, {
					productId: this.products.length,
				}),
			})

			.then(() => (
				addToLocalStorage()
			), () => (
				addToLocalStorage()
			))
		}
	}

	angular.module('product-managment-web-app')
		.service('productService', ProductService);
}