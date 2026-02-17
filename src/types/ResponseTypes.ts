import { Types } from 'mongoose';

export interface SkillResult {
  _id: Types.ObjectId;
  name: string;
  proficiency: number;
}

export interface CategoryWithSkills {
  _id: Types.ObjectId;
  name: string;
  description: string;
  skills: SkillResult[];
  skillCount: number;
}
