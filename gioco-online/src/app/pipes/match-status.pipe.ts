import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { MatchStatusType } from '../models';

@Pipe({
    name: 'matchStatus'
})

export class MatchStatusPipe implements PipeTransform {

    transform(value: MatchStatusType): string {
        switch (value) {
            case MatchStatusType.onHold:
                return 'In Attesa altro giocatore';
            case MatchStatusType.onGoing:
                return 'In Corso';
            case MatchStatusType.end:
                return 'Terminata';
            default:
                return '';
        }
    }

}