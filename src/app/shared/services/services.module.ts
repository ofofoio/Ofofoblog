import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpConfigInterceptorService } from "./httpconfig.interceptor.service";
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptorService,
    multi: true
  }]
})
export class ServiceModule { }
