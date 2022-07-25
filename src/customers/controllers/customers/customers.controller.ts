import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/create-customer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getCustomers() {
    return this.customersService.findCustomers();
  }

  @Get(':id')
  getCustomersById(@Param('id', ParseIntPipe) id: number) {
    const customers = this.customersService.findCustomersById(id);

    if (customers) return customers;
    else
      throw new HttpException(
        `Customers with id ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.createCustomer(createCustomerDto);
  }
}
