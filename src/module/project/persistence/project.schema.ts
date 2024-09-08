import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @Prop({ required: true, minlength: 1, maxlength: 30 })
    name: string;

    @Prop({ maxlength: 500 })
    description: string;

    @Prop({ required: true, maxlength: 100 })
    image: string;

    @Prop({ maxlength: 100 })
    web: string;

    @Prop({ required: true })
    available: boolean;

    @Prop({ type: [String], default: [] })  // Array de strings
    areas: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
