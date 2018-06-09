import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../models/models';

@Component({
    selector: 'app-card-details',
    template: `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ card.name }}</h5>
                <p class="card-text">
                    <span class="d-block">{{ card.apr }}%</span>
                    <span class="d-block">{{ card.balanceTransferOfferDuration }} months</span>
                    <span class="d-block">{{ card.purchaseOfferDuration }} months</span>
                    <span class="d-block">{{ card.credit | currency : '£' }}</span>
                </p>
            </div>
        </div>
    `,
    styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
    @Input() card: Card;

    constructor() {
    }

    ngOnInit() {
    }

}
