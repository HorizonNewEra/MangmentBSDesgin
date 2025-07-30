import { Component, OnInit } from '@angular/core';
import { AgendaDayView, AgendaView } from 'src/app/Interfaces/payment-interfaces';
import { PaymentServiceService } from 'src/app/Service/payment-service.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  isloding:boolean=true;
    agendaView:AgendaView | undefined
    agendaDayView: AgendaDayView[] = [];
    Month: number = new Date().getMonth();
    Year: number = new Date().getFullYear();
    apierror: string = '';
    constructor(private paymentService: PaymentServiceService) {}
ngOnInit() {
    this.getAgenda();
  }
  onMonthSelected(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.Month = parseInt(selectedValue);
  }
  onYearSelected(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.Year = parseInt(selectedValue);
  }
  getAgenda() {
    this.isloding = true;
    this.paymentService.GetAgenda(this.Month,this.Year).subscribe({
      next: (response) => {
        this.agendaView = response;
        this.agendaDayView = response.dayView;
        this.isloding = false;
      },
      error: (err) => {
        this.apierror = err.error.message;
        this.isloding = false;
      }
    });
  }
}