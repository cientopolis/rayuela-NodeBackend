import { ProjectTemplate } from '../persistence/project.schema';
import { Project } from './project';

export class ProjectMapper {
  static toEntity(template: ProjectTemplate & { _id: string }): Project {
    return new Project(
      template._id,
      template.name,
      template.description,
      template.image,
      template.web,
      template.available,
      template.areas,
      template.taskTypes,
      template.timeIntervals,
      template.ownerId,
      null, // Asumiendo que `gamification` no está en el template y debe ser manejado de otra forma
    );
  }

  static toTemplate(entity: Project): Partial<ProjectTemplate> {
    return {
      name: entity.name,
      description: entity.description,
      image: entity.image,
      web: entity.web,
      available: entity.available,
      areas: entity.areas,
      taskTypes: entity.taskTypes,
      timeIntervals: entity.timeIntervals,
      ownerId: entity.ownerId,
    };
  }
}
