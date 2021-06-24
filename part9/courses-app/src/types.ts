export interface HeaderProps {
  courseName: string;
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDescriptions extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CoursePartWithDescriptions {
  type: "normal";
}
export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartWithDescriptions {
  type: "submission";
  exerciseSubmissionLink: string;
}
export interface CourseSpecialPart extends CoursePartWithDescriptions {
  type: "special";
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

export interface Courses {
  courseParts: CoursePart[];
}
