import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {LogMiddleware} from './log.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
    nombreAplicacion = 'EPN';

    configure(consumer: MiddlewareConsumer)
        : void {
        consumer
            .apply(LogMiddleware)
            .with(this.nombreAplicacion, 'todo')
            .forRoutes(
                //UsuarioController,
                AppController,
            )
        //.apply(OtroMiddleware)
        //.forRoutes(Otras rutas);
    }
}
