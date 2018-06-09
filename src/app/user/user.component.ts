import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { CardService } from '../services/card.service';
import { Card, CardModel, User } from '../models/models';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    providers: [CardService]
})
export class UserComponent implements OnInit {
    user$: Observable<User>;
    userCards$: Observable<Card[]>;
    userSelectedCards$: Observable<Card[]>;

    constructor(private route: ActivatedRoute,
                public cardService: CardService) {
    }

    ngOnInit() {
        this.user$ = this.route.data.pipe(
            map((data) => data.user),
            tap(() => this.cardService.reset())
        );

        this.userCards$ = this.user$.pipe(
            switchMap(user => this.cardService.cards$.pipe(
                map((cards) => cards.map((card) => new CardModel(card))),
                map((cards) => {
                    return cards.reduce((acc, card) => {
                        return card.show(user) ? acc.concat(card) : acc;
                    }, []);
                })
            ))
        );

        this.userSelectedCards$ = this.cardService.cards$.pipe(
            map((cards) => {
                return cards.reduce(
                    (acc, card) => card.selected ? acc.concat(card) : acc, []);
            }),
            map((cards) => cards.length ? cards : null)
        );
    }

    totalCredit(cards: Card[]) {
        return cards.reduce((credit, card) => credit + card.credit, 0);
    }
}
