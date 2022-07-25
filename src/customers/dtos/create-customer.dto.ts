import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CustomerAddressDto } from './create-address.dto';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => CustomerAddressDto)
  @IsNotEmptyObject()
  address: CustomerAddressDto;
}
