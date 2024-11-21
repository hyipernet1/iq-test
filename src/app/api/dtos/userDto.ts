export class UserDto {
  email: string;
  id: number;
  firstName: string;
  lastName: string;
  tier: string;

  constructor(model: {
    email: string;
    id: number;
    firstName: string;
    lastName: string;
    tier: string;
  }) {
    this.email = model.email;
    this.id = model.id;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.tier = model.tier;
  }
}
