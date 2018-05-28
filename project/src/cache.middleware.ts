import {Injectable, MiddlewareFunction, NestMiddleware} from "@nestjs/common";
@Injectable()
export class CacheMiddleware implements NestMiddleware{
    resolve(ruta: string): MiddlewareFunction {
        return (request, response, next) => {
            const respuesta = {
                baseUrl: request.baseUrl,
                hostname: request.hostname,
                path: request.path,
            };

            if(ruta!=null){
                console.log('CACHE', ruta);
                console.log(respuesta);
            }
            else{
                console.log('CACHE', ruta);
            }
            next();
        }
        };
}