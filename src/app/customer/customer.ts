import { DatePipe } from "@angular/common";

export class Customer{
    id?: number;
    nome: string;
    _dt_nascimento: string;
    telefone: string;
    cpf: string;
    rg: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;

    get dt_nascimento(){
        return this._dt_nascimento;
    }

    set dt_nascimento(dt){
        var datePipe = new DatePipe('en');
        this._dt_nascimento = datePipe.transform(dt, 'dd/MM/yyyy');
    }
}