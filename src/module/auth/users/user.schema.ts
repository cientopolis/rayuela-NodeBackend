import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  Admin = 'Admin',
  Volunteer = 'Volunteer',
}

@Schema()
export class User {
  @Prop({ required: true })
  complete_name: string;  // Nombre completo del usuario

  @Prop({ required: true, unique: true })
  username: string;  // Nombre de usuario único

  @Prop({ required: true, unique: true })
  email: string;  // Email único

  @Prop({ required: true })
  password: string;  // Contraseña (hash)

  @Prop({ default: null })
  profile_image: string;  // Imagen de perfil (puede ser una URL)

  @Prop({ default: false })
  verified: boolean;  // Indica si el usuario ha verificado su cuenta

  @Prop({ enum: UserRole, default: UserRole.Volunteer })
  role: UserRole;  // Rol del usuario (Admin o Volunteer)

  @Prop({ type: [String], default: [] })
  projects: string[];  // IDs de proyectos asociados al usuario
}

export const UserSchema = SchemaFactory.createForClass(User);
