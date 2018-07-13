import {LessonCardId} from "./LessonCardId";

export class LessonCard{
  lessonCardId: LessonCardId = new LessonCardId();
  successCount: number;
  failedCount: number;
  targetCount: number;

  constructor(){}
}
