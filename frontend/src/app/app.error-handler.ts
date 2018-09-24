import { Response } from '@angular/http'

import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';

export class ErrorHandler {
    static handleError(error: Response | any) {
        let errorMessage: string
        
        if(error instanceof Response) {
            errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`;
        } else {
            errorMessage = error.toString();
        }
        errorMessage = `Erro: ${JSON.parse(error._body).errors[0]}`
        
        return Observable.throw(errorMessage)
    }
}
