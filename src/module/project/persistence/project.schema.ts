import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop({ required: true, minlength: 1, maxlength: 30 })
    name: string;

    @Prop({ maxlength: 500 })
    description: string;

    @Prop({ required: true, maxlength: 500 })
    image: string;

    @Prop({ maxlength: 100 })
    web: string;

    @Prop({ required: true })
    available: boolean;

    @Prop({ type: [MongooseSchema.Types.Mixed], default: [] })  // Permite cualquier tipo
    areas: any[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
