import {Lesson} from "./Lesson";
import {Card} from "./Card";
import {LessonCard} from "./LessonCard";
import {Section} from "./Section";
import {Tag} from "./Tag";

export class CurrentState{
  lesson: Lesson = new Lesson();
  card: Card = new Card();
  lessonCard: LessonCard = new LessonCard();
  section: Section = new Section();
  tag: Tag = new Tag();

  constructor(){}
}
