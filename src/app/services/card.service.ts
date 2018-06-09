import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { Card } from '../models/models';
import { ApiService } from './api.service';


@Injectable()
export class CardService {
    private cardsSubject = new BehaviorSubject<Card[]>([]);
    public cards$ = this.cardsSubject.asObservable();

    constructor(private apiService: ApiService) {
        this.init();
    }

    init() {
        this.apiService.getCards().subscribe((cards) => {
            this.cardsSubject.next(cards);
        });
    }

    reset() {
        this.cardsSubject.pipe(
            take(1),
            map((cards) => {
                return cards.map((card) => {
                    card.selected = false;
                    return card;
                });
            }),
            tap((cards) => {
                this.cardsSubject.next(cards);
            }),
        ).subscribe();
    }

    toggleCard(selectedCard: Card) {
        this.cardsSubject.pipe(
            take(1),
            map((cards) => {
                return cards.map((card) => {
                    if (card.id === selectedCard.id) {
                        card.selected = !card.selected;
                    }
                    return card;
                });
            }),
            tap((cards) => {
                this.cardsSubject.next(cards);
            }),
        ).subscribe();
    }

}
