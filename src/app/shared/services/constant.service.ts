import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConstantService {

 API_URL: string = environment.API_ENDPOINT;

 BUYER_API_URL: string = environment.BUYER_API_ENDPOINT;

 SELLER_API_URL: string = environment.SELLER_API_ENDPOINT;

 AUTH = '/auth';

 REGISTER = '/register';

 SELLER = '/seller';

 COUNTRIES = '/countries';

 MARKETPLACE = '/marketplace';

 LANDING = '/landing';

 OFFERING = '/offering';

 FILTERS = '/filters'

 PURCHASE = '/purchase';

 OFFERINGS = '/offerings';

 SEARCH = '/search';
 
  constructor() { }
  getUrl(path: string, params: any[] = []) {
    return !params.length
      ? [this.API_URL, path].join('')
      : [[this.API_URL, path].join(''), params.join('/')].join('/');
  }
  getBuyerUrl(path: string, params: any[] = []) {
    return !params.length
      ? [this.BUYER_API_URL, path].join('')
      : [[this.BUYER_API_URL, path].join(''), params.join('/')].join('/');
  }
  getSellerUrl(path: string, params: any[] = []) {
    return !params.length
      ? [this.SELLER_API_URL, path].join('')
      : [[this.SELLER_API_URL, path].join(''), params.join('/')].join('/');
  }

}
