export default interface TokenPayloadDto {
  type: 'access' | 'refresh' | 'activation' | 'new-email';
  id: number;
}
