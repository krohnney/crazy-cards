import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Card, CardModel, User } from '../models/models';


@Injectable()
export class ApiService {
    private API_URL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getCards(): Observable<Card[]> {
        return this.http
            .get(`${this.API_URL}/cards`).pipe(
                take(1),
                catchError((error) => of(error.json()))
            );
    }

    getUser(id: number): Observable<User> {
        return this.http
            .get(`${this.API_URL}/users/${id}`).pipe(
                take(1),
                catchError(error => of(error.json()))
            );
    }
}
