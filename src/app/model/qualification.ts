import { Student } from "./student";
import { AcademicSubject } from "./subject";
import { Teacher } from "./teacher";

export class Qualification{
    idQualification: number;
    student: Student;
    teacher: Teacher;
    subject: AcademicSubject;
    note: number;
    

}