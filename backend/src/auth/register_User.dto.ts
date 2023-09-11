import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  lastName: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  firstName: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  eMail: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
  address: {
    street: string;
    houseNumber: string;
    city: string;
    postalCode: string;
  };
}
