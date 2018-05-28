import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {LogMiddleware} from './log.middleware';
import {ParametrosController} from "./parametros.controller";
import {CacheMiddleware} from "./cache.middleware";

@Module({
  imports: [],
  controllers: [AppController,ParametrosController],
  providers: [AppService],
})

export class AppModule implements NestModule {
    nombreAplicacion = 'EPN';

    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(LogMiddleware)
            .with(this.nombreAplicacion, 'todo')
            .forRoutes(
                AppController,
            )
        .apply(CacheMiddleware)
        .forRoutes(ParametrosController);
    }
}
