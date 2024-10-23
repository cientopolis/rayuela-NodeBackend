import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { UserJWT } from '../auth/auth.service';
import { UserService } from '../auth/users/user.service';
import { ProjectService } from '../project/project.service';
import { ProjectTemplate } from '../project/persistence/project.schema';

@Injectable()
export class VolunteerService {
  constructor(
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  async subscribeToProject(user: UserJWT, projectId: string) {
    const dbUser: any = await this.userService.getByUserId(user.userId);

    if (dbUser.projects.includes(projectId)) {
      throw new BadRequestException('Subscription already exists');
    }

    return this.userService.update(user.userId, {
      ...dbUser._doc,
      projects: dbUser._doc.projects.concat([projectId]),
    });
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
          user.projects.find((pid) => pid === p._id.toString()),
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
