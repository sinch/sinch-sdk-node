export type BadRequest = Omit<BadRequestFromApi, never>;
export interface BadRequestFromApi {
  message: string;
}
