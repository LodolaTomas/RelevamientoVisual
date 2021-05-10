import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { UsuariosService } from '../services/usuarios.service';
import { map } from 'rxjs/operators';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {
  title;
  verFotosLindas: boolean;
  imagenesRT: any[];
  class = 'heart-outline';
  constructor(private router: Router, public photoService: PhotoService, public usuarioSrv: UsuariosService) {
    if (this.router.url === '/lista/cosasLindas') {
      this.title = 'Cosas Lindas';
      this.verFotosLindas = true
    } else {
      this.title = 'Cosas Feas';
      this.verFotosLindas = false
    }
    this.imagenesRT = this.photoService.ObtenerTodos();
  }

  ngOnInit() {
  }

  doRefresh(event) {
    setTimeout(() => {
      this.imagenesRT.splice(0, this.imagenesRT.length)
      this.imagenesRT = this.photoService.ObtenerTodos();
      console.log(this.imagenesRT)
      event.target.complete();
    }, 2000);
  }
  async fotoDes() {
    this.imagenesRT.splice(0, this.imagenesRT.length)
    this.imagenesRT = await this.photoService.ObtenerTodos()

  }

  addPhotoToGallery() {
    this.photoService.sacarFoto();
  }

  public cambiarClass(unaFoto) {
    this.imagenesRT.forEach(function (unaImagen) {
      if (unaImagen.referencia == unaFoto.referencia) {
        if (unaImagen.like == true) {
          unaFoto.like = false;
          unaFoto.votos--;
        } else {
          unaFoto.like = true;
          unaFoto.votos++;
        }
      }
    })
    console.log(this.photoService.modificarFoto(unaFoto, unaFoto.id));
  }
}
