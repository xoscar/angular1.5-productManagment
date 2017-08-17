import 'angular';
import '@angular/router/angular1/angular_1_router';
import 'angular-sanitize';
import 'jquery';
import 'ng-storage';

namespace ProductManagment {
  const appModule: ng.IModule = angular.module('product-managment-web-app', ['ngComponentRouter', 'ngSanitize', 'ngStorage' ]);

  appModule.value('$routerRootComponent', 'productmanagmentcelweb');
}

// component
import './common/components/product-managment-web-app/product-managment-web-app.component.ts';

// css
import './main.scss';

// services
import './common/services/productService.ts';
import './common/services/localStorage.ts';
