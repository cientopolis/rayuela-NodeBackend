import { Injectable } from '@nestjs/common';
import { Task } from '../../../task/entities/task.entity';
import { User } from '../../../auth/users/user.entity';
import { Checkin } from '../checkin.entity';

@Injectable()
export class AdaptiveRecommendationEngine {
  constructor() {}

  /**
   * Calcula la similitud entre dos usuarios según sus check-ins y movimientos.
   */
  private calculateUserSimilarity(userA: User, userB: User): number {
    let similarityScore = 0;

    /* {
      userId: '1-areaId',
      cantidad: 1,
    },
    {
      userId: '1-tipoDeTarea',
      cantidad: 0,
    }*/

    // Comparar check-ins en base a ubicación y tiempo
    userA.checkins.forEach((checkinA: Checkin) => {
      userB.checkins.forEach((checkinB: Checkin) => {
        if (
          checkinA.relatedTask.areaGeoJSON.properties.id ===
          checkinB.relatedTask.areaGeoJSON.properties.id
        ) {
          similarityScore += 1;
        }
        if (checkinA.taskType === checkinB.taskType) {
          similarityScore += 1;
        }
        if (
          checkinA.relatedTask.timeInterval.name ===
          checkinB.relatedTask.timeInterval.name
        ) {
          similarityScore += 1;
        }
      });
    });

    return similarityScore;
  }

  /**
   * Predice una puntuación para una tarea en función de la similitud con otros usuarios.
   */
  private predictTaskScore(
    targetUser: User,
    task: Task,
    allUsers: User[],
  ): number {
    let weightedSum = 0;
    let similaritySum = 0;

    // Mockear los k mas cercanos
    // Solamente evaluar los K mas cercanos!
    // usar redis
    // COmo hacer para poder tener precalculados los K mas cercanos, hacerlo en el checkin o aca?
    // Cuando hacer el calculo de la similitud entre users
    allUsers.forEach((user) => {
      if (
        user.id !== targetUser.id &&
        user.checkins.find((c: Checkin) => task.getId() === c.contributesTo)
      ) {
        // Calcula que tan similares los usuarios
        const similarity = this.calculateUserSimilarity(targetUser, user);
        // Compara el score que hizo el usuario observado
        const score = user.getRatingForTaskId(task.getId()) || 0;
        // Pondera el score con la similarity
        weightedSum += similarity * score; // TODO Este valor tiene que estar entre 0 y 1
        similaritySum += similarity;
      }
    });

    return similaritySum === 0 ? 0 : weightedSum / similaritySum;
  }

  /**
   * Genera recomendaciones personalizadas de tareas según múltiples criterios.
   */
  generateRecommendations(
    targetUser: User,
    allTasks: Task[],
    allUsers: User[],
  ): { task: Task; predictedScore: number }[] {
    return allTasks
      .map((task) => ({
        task: task,
        predictedScore: this.predictTaskScore(targetUser, task, allUsers),
      }))
      .sort((a, b) => b.predictedScore - a.predictedScore); // Ordenar de mayor a menor puntuación
  }
}
