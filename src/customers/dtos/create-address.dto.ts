import { IsNotEmpty, IsString } from 'class-validator';

export class CustomerAddressDto {
  @IsString()
  @IsNotEmpty()
  line1: string;

  line2?: string;

  @IsNotEmpty()
  zip: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;
}
