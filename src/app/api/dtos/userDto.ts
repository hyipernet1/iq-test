export class UserDto {
  email: string;
  id: number;
  customerId: string | null;
  tier: string;

  constructor(model: {
    email: string;
    id: number;
    customerId: string | null;
    tier: string;
  }) {
    this.email = model.email;
    this.id = model.id;
    this.tier = model.tier;
    this.customerId = model.customerId;
  }
}
