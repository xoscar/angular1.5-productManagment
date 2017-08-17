import { Promise } from 'ts-promise';

export namespace ProductManagment {
	export interface ILocalStorageService  {
		getItem(id: string): any;
		setItem(id: string, content: any): any;
		deleteItem(id: string): any;

		deleteItems(items: string[]): any;
		getItems(items: string[]): any[];
	}

	export class LocalStorageService implements ILocalStorageService {
		constructor() {}

		getItem(id: string) {
			return localStorage.getItem(id);
		}

		setItem(id: string, content: any) {
			return localStorage.setItem(id, content);
		}

		deleteItem(id: string) {
			return localStorage.removeItem(id);
		}

		getItems(items: string[]) {
			return items.map(item => (
				localStorage.getItem(item)
			));
		}

		deleteItems(items: string[]) {
			return items.forEach(item => {
				localStorage.removeItem(item);
			});
		}
	}

	angular.module('product-managment-web-app')
		.service('localStorageService', LocalStorageService);
}