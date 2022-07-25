import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/create-customer.dto';

@Injectable()
export class CustomersService {
  customers: Customers[] = [
    {
      id: 1,
      email: 'user1@gmail.com',
      name: 'User 1',
    },
    {
      id: 2,
      email: 'user2@gmail.com',
      name: 'User 2 ',
    },
    {
      id: 3,
      email: 'user3@gmail.com',
      name: 'User 3',
    },
    {
      id: 4,
      email: 'user4@gmail.com',
      name: 'User 4',
    },
    {
      id: 5,
      email: 'user5@gmail.com',
      name: 'User 5',
    },
  ];

  findCustomers() {
    return this.customers;
  }

  findCustomersById(id: number) {
    return this.customers.find((user) => user.id == id);
  }

  createCustomer(dto: CreateCustomerDto) {
    this.customers.push(dto);
  }
}
