import { Component, OnInit } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  


  constructor(public servicio: MiservicioPrincipalService) { }

  ngOnInit() {
  }

  scrollToElement(element): void {
    element.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  }

}
