import {Controller, Get,Param, Post, Query, Req, Res} from "@nestjs/common";


@Controller('Parametros')

export class ParametrosController {
    nombre = 'Alexis'
    valor = '22'
    @Get('cookie')
    establecerCookie(@Req() request,@Res() response){

        const parametros = {
            nombreCookie: this.nombre,
            valorCookie:  this.valor,
        };
        response.cookie(parametros.nombreCookie, parametros.valorCookie);
        return response.send(parametros)
    }

    @Get('cookie/:nombre')
    leerCookie(@Req() request, @Res() response) {
        const nombreCookie = request.params.nombre;
        const existeCookie = request.cookies[nombreCookie];
        if (existeCookie) {
            return response.send({
                valor: existeCookie + "Se encuentra en Cache"
            })
        } else {
            return response.status(404).send(
                {
                    mensaje: 'No en Cache'
                })
        }
    }
}
