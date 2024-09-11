import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, ForbiddenException } from '@nestjs/common';
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

  @Post("init")
  init() {
    const projects =[
      {
        "name": "Anticipando la crecida",
        "description": "Estrategias comunitarias para la reducción de desastres e inundaciones urbanas.Contribuir en la reducción de riesgos ante desastres asociados a eventos hidro-meteorológicos, mediante el diálogo con actores territoriales con el fin de fortalecer el sistema de alerta temprana comunitario centrado en la población",
        "image": "https://img.freepik.com/free-vector/nature-forest-landscape-daytime-scene-with-long-river-flowing-through-meadow_1308-58511.jpg",
        "web": "https://www.unq.edu.ar/",
        "available": true,
        "areas": ["1"]
      },
      {
        "name": "GeoVin",
        "description": "Estudio de enfermedades transmitidas por vectores (animales transmisores).Proveer de herramientas interactivas, educativas, lúdicas y gratuitas a personas usuarias no especializadas, que permitan contribuir a la problemática relacionada con las vinchucas en todo el país.Fomentar la concientización acerca de la problemática de salud relacionada con la Enfermedad de Chagas, involucrando a la ciudadanía en el monitoreo de su vector.",
        "image": "https://img.freepik.com/free-vector/nature-forest-landscape-daytime-scene-with-long-river-flowing-through-meadow_1308-58511.jpg",
        "web": "https://www.unq.edu.ar/",
        "available": true,
        "areas": ["1"]
      },
      {
        "name": "Caza Mosquitos",
        "description": "Estudio de enfermedades transmitidas por vectores (animales transmisores).Estudiar la distribución de mosquitos vectores de enfermedades, incluido el Aedes aegypti, vector de los virus dengue, zika, chikungunya y fiebre amarilla.Involucrar a la ciudadanía en el análisis y cuestionamiento de su entorno, tomando acciones individuales para contribuir con la prevención de la propagación del insecto vector.",
        "image": "https://img.freepik.com/free-vector/nature-forest-landscape-daytime-scene-with-long-river-flowing-through-meadow_1308-58511.jpg",
        "web": "https://www.unq.edu.ar/",
        "available": false,
        "areas": ["2"]
      },
      {
        "name": "PreserVamos",
        "description": "Monitoreo ambiental de ecosistemas acuáticos de agua dulce.PreserVamos es una iniciativa del Laboratorio de Aceleración del Programa para el Desarrollo de Naciones Unidas (PNUD) junto con el proyecto de ciencia participativa AppEAR, y diferentes municipios de la provincia de Buenos Aires para estudiar los ambientes acuáticos de agua dulce",
        "image": "https://img.freepik.com/free-vector/nature-forest-landscape-daytime-scene-with-long-river-flowing-through-meadow_1308-58511.jpg",
        "web": "https://www.unq.edu.ar/",
        "available": true,
        "areas": ["1"]
      },
      {
        "name": "ArgentiNat.org",
        "description": "Biodiversidad.Conocer más acerca de los ciclos de vida, la distribución y la dinámica poblacional de todas las especies que habitan en Argentina",
        "image": "https://img.freepik.com/free-vector/nature-forest-landscape-daytime-scene-with-long-river-flowing-through-meadow_1308-58511.jpg",
        "web": "https://www.unq.edu.ar/",
        "available": true,
        "areas": ["2"]
      },
      {
        "name": "Mi habitat",
        "description": "Saneamiento y gestión de residuos; enfermedades transmitidas por vectores.Concientizar a las personas jóvenes y a los núcleos familiares sobre los riesgos sanitarios que representan los basurales, roedores y parásitos en sus comunidades.Impulsar, junto con la comunidad educativa, a los barrios en situación de mayor vulnerabilidad (debido este tipo de contaminación) a generar acciones que mejoren su calidad de vida ",
        "image": "https://img.freepik.com/free-vector/nature-forest-landscape-daytime-scene-with-long-river-flowing-through-meadow_1308-58511.jpg",
        "web": "https://www.unq.edu.ar/",
        "available": true,
        "areas": ["1"]
      },
      {
        "name": "Cyano",
        "description": "Eutrofización de cuerpos de agua y cianobacterias.Se aborda la eutrofización de cuerpos de agua superficiales de manera interrelacionada con su cuenca de aporte, los diferentes usos del agua y el Cianosemáforo, para la prevención del riesgo en aguas de uso recreativo",
        "image": "https://img.freepik.com/free-vector/nature-forest-landscape-daytime-scene-with-long-river-flowing-through-meadow_1308-58511.jpg",
        "web": "https://www.unq.edu.ar/",
        "available": false,
        "areas": ["2"]
      }
    ]
    return projects.map(async p => await this.projectService.create(p))
  }
}
