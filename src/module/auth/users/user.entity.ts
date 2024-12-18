import { UserRole } from './user.schema';
import { points } from '@turf/helpers';

export class User {
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _completeName: string;
  private _points: number;
  private _username: string;
  private _email: string;
  private _password: string;
  private _profileImage: string | null;
  private _verified: boolean;
  private _role: UserRole;
  private _projects: string[];
  private _id: string;

  constructor(
    completeName: string,
    points: number,
    username: string,
    email: string,
    password: string,
    profileImage: string | null = null,
    verified: boolean = false,
    role: UserRole = UserRole.Volunteer,
    projects: string[] = [],
    id?: string,
  ) {
    this._completeName = completeName;
    this._points = points;
    this._username = username;
    this._email = email;
    this._password = password;
    this._profileImage = profileImage;
    this._verified = verified;
    this._role = role;
    this._projects = projects;
    this._id = id;
  }

  // Getters

  get password(): string {
    return this._password;
  }

  get completeName(): string {
    return this._completeName;
  }

  get points(): number {
    return this._points;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }

  get profileImage(): string | null {
    return this._profileImage;
  }

  get verified(): boolean {
    return this._verified;
  }

  get role(): UserRole {
    return this._role;
  }

  get projects(): string[] {
    return this._projects;
  }

  // Setters
  set completeName(value: string) {
    this._completeName = value;
  }

  set points(value: number) {
    this._points = value;
  }

  set username(value: string) {
    this._username = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set profileImage(value: string | null) {
    this._profileImage = value;
  }

  set verified(value: boolean) {
    this._verified = value;
  }

  set role(value: UserRole) {
    this._role = value;
  }

  set projects(value: string[]) {
    this._projects = value;
  }

  addProject(projectId: string): void {
    if (!this._projects.includes(projectId)) {
      this._projects.push(projectId);
    }
  }

  removeProject(projectId: string): void {
    this._projects = this._projects.filter((id) => id !== projectId);
  }

  incrementPoints(amount: number): void {
    this._points += amount;
  }

  verifyAccount(): void {
    this._verified = true;
  }
}
