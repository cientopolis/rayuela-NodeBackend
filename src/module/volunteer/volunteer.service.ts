import { Injectable } from '@nestjs/common';
import { UserJWT } from '../auth/auth.service';
import { UserService } from '../auth/users/user.service';
import { ProjectService } from '../project/project.service';
import { ProjectTemplate } from '../project/persistence/project.schema';
import { User } from '../auth/users/user.entity';

@Injectable()
export class VolunteerService {
  constructor(
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  async subscribeToProject(user: UserJWT, projectId: string) {
    const dbUser: User = await this.userService.getByUserId(user.userId);

    let newProjects: string[] = [];
    if (dbUser.projects.includes(projectId)) {
      newProjects = dbUser.projects.filter((p: string) => p !== projectId);
    } else {
      newProjects = dbUser.projects.concat([projectId]);
    }
    dbUser.projects = newProjects;
    return this.userService.update(user.userId, dbUser);
  }

  async findProjects(userId) {
    const user = await this.userService.getByUserId(userId);
    const projects = await this.projectService.findAll();
    return this.sortSubscriptions(this.mapSubscriptions(projects, user));
  }

  private mapSubscriptions(
    projects: (ProjectTemplate & { _id: string })[],
    user,
  ) {
    return projects.map((p) => {
      return {
        ...p,
        subscribed: Boolean(
          user?.projects?.find((pid) => pid === p._id.toString()),
        ),
      };
    });
  }

  private sortSubscriptions(subs) {
    return subs.sort((a, b) => {
      // Si `a.subscribed` es true y `b.subscribed` es false, a se coloca primero
      return a.subscribed === b.subscribed ? 0 : a.subscribed ? -1 : 1;
    });
  }
}
