import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/models';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable()
export class UserResolver implements Resolve<User> {

    constructor(private apiService: ApiService) { }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<User> {

        const userId = +route.paramMap.get('id');
        return this.apiService.getUser(userId);
    }
}
