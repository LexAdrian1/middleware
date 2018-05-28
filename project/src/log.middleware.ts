import {Injectable, MiddlewareFunction, NestMiddleware} from "@nestjs/common";

const fs = require('fs');

@Injectable()
export class LogMiddleware implements NestMiddleware {
    resolve(nombreAplicacion: string, nivelDeLog: string): MiddlewareFunction {
        return (request, response, next) => {
            const respuesta = {
                baseUrl: request.baseUrl,
                hostname: request.hostname,
                subdomains: request.subdomains,
                ip: request.ip,
                method: request.method,
                originalUrl: request.originalUrl,
                path: request.path,
                protocol: request.protocol,
                headers: request.headers,
            };
            //Transformar a String
            const json = JSON.stringify(respuesta);
            switch(nivelDeLog){
                case 'archivo':
                    console.log('MIDDLEWARE ARCHIVO', nombreAplicacion, nivelDeLog);
                    fs.writeFile("logs.txt", json, function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    break;
                case 'consola':
                    console.log('MIDDLEWARE CONSOLA', nombreAplicacion, nivelDeLog);
                    console.log(respuesta);
                    break;
                case 'todo':
                    console.log('MIDDLEWARE TODO', nombreAplicacion, nivelDeLog);
                    fs.writeFile("logs.txt", json, function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    console.log(respuesta);
                    break;
                default:
            }
            next(); // ERROR SI NO SE LLAMA
        };
    }
}
