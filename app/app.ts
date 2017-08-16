import 'angular';
import '@angular/router/angular1/angular_1_router';
import 'angular-sanitize';
import 'jquery';

namespace ProductManagment {
  const appModule: ng.IModule = angular.module('product-managment-web-app', ['ngComponentRouter', 'ngSanitize' ]);

  appModule.value('$routerRootComponent', 'productmanagmentcelweb');
}

import './common/components/product-managment-web-app/product-managment-web-app.component.ts';
import './main.scss';
import './common/services/productService.ts';
