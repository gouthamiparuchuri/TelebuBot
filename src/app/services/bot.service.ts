import { Injectable } from '@angular/core';
import { constantApis } from '../constant/constantapis';
import { HttpService } from './http.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class BotService {
    botData: any;
    botId: string;
    private _botData$: Subject<any> = new Subject<any>();

    constructor(private _http: HttpService, private _toastr: ToastrService) { }

    public setBotData(botData: any): void {
        this._botData$.next(botData);
    }
    public getBotData(): Observable<any> {
        return this._botData$.asObservable();
    }
    getBot(): void {
        this._http.loginCall(constantApis.getBots + this.botId, 'get', {}).subscribe(res => {
            this.botData = { ...res };
            this.setBotData(res)
        }, error => {
            console.warn("error at getting bots", error)
            this._toastr.info("something went wrong")
        })
    }
}