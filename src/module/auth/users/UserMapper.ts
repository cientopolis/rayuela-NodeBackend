import { User } from './user.entity';
import { UserDocument, UserTemplate } from './user.schema';

export class UserMapper {
  static toEntity(userDocument: UserDocument): User {
    return new User(
      userDocument.complete_name,
      userDocument.points,
      userDocument.username,
      userDocument.email,
      userDocument.password,
      userDocument.profile_image,
      userDocument.verified,
      userDocument.role,
      userDocument.projects,
      userDocument._id,
      userDocument.badges,
    );
  }

  // Convierte una entidad User en un objeto UserTemplate
  static toTemplate(user: User): UserTemplate {
    return {
      complete_name: user.completeName,
      points: user.points,
      username: user.username,
      email: user.email,
      password: user.password,
      profile_image: user.profileImage,
      verified: user.verified,
      role: user.role,
      projects: user.projects,
      badges: user.badges,
    };
  }
}
