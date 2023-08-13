export class BanUserDto {
  readonly userId: number;
  readonly banReason: string;
  readonly toBan: boolean;
}
