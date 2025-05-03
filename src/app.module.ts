import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [SharedModule, CoreModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
