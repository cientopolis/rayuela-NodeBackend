export class CreateProjectDto {
  name: string;
  description?: string;
  image: string;
  web?: string;
  available: boolean;
  areas: any[];
}
