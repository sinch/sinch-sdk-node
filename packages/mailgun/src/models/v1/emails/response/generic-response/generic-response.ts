export type GenericResponse = Omit<GenericResponseFromApi, never>

export interface GenericResponseFromApi {
  message: string;
}
