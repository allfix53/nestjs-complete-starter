import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  // implement middleware for specific path
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateCustomerMiddleware).forRoutes({
      path: 'customers',
      method: RequestMethod.GET,
    });
    /**
     * Or you can register by controller
     * so, all route with registered controller will be implement middleware
     */
  }
}
