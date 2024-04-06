import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { WatchListModule } from './watch-list/watch-list.module';
import { CartModule } from './cart/cart.module';
import { PageModule } from './page/page.module';
import { ChatModule } from './chat/chat.module';
import { TransactionModule } from './transaction/transaction.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AdminModule, ProductsModule, UsersModule, WatchListModule, CartModule, PageModule, ChatModule, TransactionModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
