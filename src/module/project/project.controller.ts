import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserRole } from '../auth/users/user.schema';
import { Roles } from '../auth/role.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { UserService } from '../auth/users/user.service';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('subscription/:id')
  subscribe(@Request() req, @Param('id') id: string) {
    return this.userService.subscribeToProject(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post()
  create(@Request() req, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: CreateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }

  @Post('init')
  init() {
    const projects = [
      {
        name: 'Anticipando la crecida',
        description:
          'Estrategias comunitarias para la reducción de desastres e inundaciones urbanas. Contribuir en la reducción de riesgos ante desastres asociados a eventos hidro-meteorológicos, mediante el diálogo con actores territoriales con el fin de fortalecer el sistema de alerta temprana comunitario centrado en la población.',
        image: 'rayuelaApp/static/project_image/rio.jpg',
        web: 'https://www.unq.edu.ar/',
        available: true,
        areas: [
          {
            name: 'area 0',
            type: 'Feature',
            properties: {
              Ciudad: 'La Plata',
              AreaAInterceptar: 'Bosque de la Plata',
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-57.9414, -34.9119],
                  [-57.9276, -34.9119],
                  [-57.9276, -34.9062],
                  [-57.9414, -34.9062],
                  [-57.9414, -34.9119],
                ],
              ],
            },
          },
        ],
      },
      {
        name: 'GeoVin',
        description:
          'Estudio de enfermedades transmitidas por vectores (animales transmisores). Proveer de herramientas interactivas, educativas, lúdicas y gratuitas a personas usuarias no especializadas, que permitan contribuir a la problemática relacionada con las vinchucas en todo el país. Fomentar la concientización acerca de la problemática de salud relacionada con la Enfermedad de Chagas, involucrando a la ciudadanía en el monitoreo de su vector.',
        image: 'rayuelaApp/static/project_image/rio.jpg',
        web: 'https://www.unq.edu.ar/',
        available: true,
        areas: [
          {
            name: 'area 1',
            type: 'Feature',
            properties: {
              Ciudad: 'Buenos Aires',
              AreaAInterceptar: 'Palermo',
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-58.4194, -34.5803],
                  [-58.4114, -34.5803],
                  [-58.4114, -34.5738],
                  [-58.4194, -34.5738],
                  [-58.4194, -34.5803],
                ],
              ],
            },
          },
        ],
      },
      {
        name: 'Caza Mosquitos',
        description:
          'Estudio de enfermedades transmitidas por vectores (animales transmisores). Estudiar la distribución de mosquitos vectores de enfermedades, incluido el Aedes aegypti, vector de los virus dengue, zika, chikungunya y fiebre amarilla. Involucrar a la ciudadanía en el análisis y cuestionamiento de su entorno, tomando acciones individuales para contribuir con la prevención de la propagación del insecto vector.',
        image: 'rayuelaApp/static/project_image/rio.jpg',
        web: 'https://www.unq.edu.ar/',
        available: false,
        areas: [
          {
            name: 'area 2',
            type: 'Feature',
            properties: {
              Ciudad: 'CABA',
              AreaAInterceptar: 'Recoleta',
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-58.3974, -34.5934],
                  [-58.3914, -34.5934],
                  [-58.3914, -34.5884],
                  [-58.3974, -34.5884],
                  [-58.3974, -34.5934],
                ],
              ],
            },
          },
        ],
      },
      {
        name: 'PreserVamos',
        description:
          'Monitoreo ambiental de ecosistemas acuáticos de agua dulce. PreserVamos es una iniciativa del Laboratorio de Aceleración del Programa para el Desarrollo de Naciones Unidas (PNUD) junto con el proyecto de ciencia participativa AppEAR, y diferentes municipios de la provincia de Buenos Aires para estudiar los ambientes acuáticos de agua dulce.',
        image: 'rayuelaApp/static/project_image/rio.jpg',
        web: 'https://www.unq.edu.ar/',
        available: true,
        areas: [
          {
            name: 'area 3',
            type: 'Feature',
            properties: {
              Ciudad: 'Bahía Blanca',
              AreaAInterceptar: 'Río Colorado',
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-60.1937, -38.7594],
                  [-60.1857, -38.7594],
                  [-60.1857, -38.7504],
                  [-60.1937, -38.7504],
                  [-60.1937, -38.7594],
                ],
              ],
            },
          },
        ],
      },
      {
        name: 'ArgentiNat.org',
        description:
          'Biodiversidad. Conocer más acerca de los ciclos de vida, la distribución y la dinámica poblacional de todas las especies que habitan en Argentina.',
        image: 'rayuelaApp/static/project_image/rio.jpg',
        web: 'https://www.unq.edu.ar/',
        available: true,
        areas: [
          {
            name: 'area 4',
            type: 'Feature',
            properties: {
              Ciudad: 'Mendoza',
              AreaAInterceptar: 'Cordillera de los Andes',
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-69.1865, -32.8891],
                  [-69.1755, -32.8891],
                  [-69.1755, -32.8731],
                  [-69.1865, -32.8731],
                  [-69.1865, -32.8891],
                ],
              ],
            },
          },
        ],
      },
      {
        name: 'Mi habitat',
        description:
          'Saneamiento y gestión de residuos; enfermedades transmitidas por vectores. Concientizar a las personas jóvenes y a los núcleos familiares sobre los riesgos sanitarios que representan los basurales, roedores y parásitos en sus comunidades. Impulsar, junto con la comunidad educativa, a los barrios en situación de mayor vulnerabilidad (debido a este tipo de contaminación) a generar acciones que mejoren su calidad de vida.',
        image: 'rayuelaApp/static/project_image/rio.jpg',
        web: 'https://www.unq.edu.ar/',
        available: true,
        areas: [
          {
            name: 'area 5',
            type: 'Feature',
            properties: {
              Ciudad: 'Rosario',
              AreaAInterceptar: 'Zona Norte',
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-60.6658, -32.9408],
                  [-60.6608, -32.9408],
                  [-60.6608, -32.9338],
                  [-60.6658, -32.9338],
                  [-60.6658, -32.9408],
                ],
              ],
            },
          },
        ],
      },
      {
        name: 'Cyano',
        description:
          'Eutrofización de cuerpos de agua y cianobacterias. Se aborda la eutrofización de cuerpos de agua superficiales de manera interrelacionada con su cuenca de aporte, los diferentes usos del agua y el Cianosemáforo, para la prevención del riesgo en aguas de uso recreativo.',
        image: 'rayuelaApp/static/project_image/rio.jpg',
        web: 'https://www.unq.edu.ar/',
        available: false,
        areas: [
          {
            name: 'area 6',
            type: 'Feature',
            properties: {
              Ciudad: 'San Fernando del Valle de Catamarca',
              AreaAInterceptar: 'Embalse El Jumeal',
            },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [-65.7885, -28.4691],
                  [-65.7805, -28.4691],
                  [-65.7805, -28.4611],
                  [-65.7885, -28.4611],
                  [-65.7885, -28.4691],
                ],
              ],
            },
          },
        ],
      },
    ];

    return projects.map(async (p) => await this.projectService.create(p));
  }
}
