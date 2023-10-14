export type CourseType = {
  id: number;
  title: string;
  studentsCount: number;
}

export type UserType = {
  id: number;
  userName: string;
}

export type StudentsCourseBindingType = {
  studentId: number;
  courseId: number;
  date: Date;
}

export type RootDBType = {
  courses: CourseType[];
  users: UserType[];
  studentsCourseBinding: StudentsCourseBindingType[];
}