import { Pipe, PipeTransform } from "@angular/core";
import { Heroe } from "../interfaces/heroe.interface";


@Pipe({
    name: 'img'
})
export class ImgPipe implements PipeTransform {

    transform(heroe: Heroe): string {
        if((!heroe.id && !heroe.alt_img) || heroe.alt_img == '') {
            return 'assets/no-image.png';
        } else if(heroe.alt_img) {
            return heroe.alt_img;
        } else {
            return `assets/heroes/${heroe.id}.jpg`;
        }
         
    }

}