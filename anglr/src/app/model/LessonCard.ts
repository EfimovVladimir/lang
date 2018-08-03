import {LessonCardId} from "./LessonCardId";
import {Lesson} from "./Lesson";
import {Card} from "./Card";

export class LessonCard{
  lessonCardId: LessonCardId = new LessonCardId();
  successCount: number;
  failedCount: number;
  targetCount: number;

  lesson: Lesson = new Lesson();
  card: Card = new Card();

  constructor(){}
}
