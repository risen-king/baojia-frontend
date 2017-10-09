
import { Interceptor, InterceptedRequest, InterceptedResponse }  from 'ng2-interceptors';

/*
  Generated class for the AuthInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class AuthInterceptor implements Interceptor{
 

   public interceptBefore(request: InterceptedRequest): InterceptedRequest {
        
        alert(1111);

        return request;
        
    }

    public interceptAfter(response: InterceptedResponse): InterceptedResponse {

      console.log(22222222222);
  
        return response;
       
    }
}
