import { User } from './user.entity';
import { UserDocument, UserTemplate } from './user.schema';

export class UserMapper {
  static toEntity(userDocument: UserDocument): User {
    return new User(
      userDocument.complete_name,
      userDocument.username,
      userDocument.email,
      userDocument.password,
      userDocument.profile_image,
      userDocument.verified,
      userDocument.role,
      userDocument._id,
      userDocument.gameProfiles,
    );
  }

  // Convierte una entidad User en un objeto UserTemplate
  static toTemplate(user: User): UserTemplate {
    return {
      complete_name: user.completeName,
      username: user.username,
      email: user.email,
      password: user.password,
      profile_image: user.profileImage,
      verified: user.verified,
      role: user.role,
      gameProfiles: user.gameProfiles,
    };
  }
}
