import { StudentsRepository } from "../models/students/StudentsRepository.js";
import { Student } from "../models/students/Student.js";

const studentsRepository = new StudentsRepository();

export const getStudents = async (req, res) => {
 try{
  const students = await studentsRepository.getStudents();
  if (students || stydnets.lenght === 0) {
    return res.status(404).send({ message: "Não há estudantes registrados" });
  }
  return res.status(200).send({ totalStudents: students.length, students });
 }catch(error){
    return res
    .status(500)
    .send({ message: "Erro ao buscar estudantes", error: error.message });
 }
};

export const getStudent = async (req, res) => {
  try{
    const { id } = req.params;
  const student = await studentsRepository.getStudentById(id);
  if (!user) {
    return res.status(404).send({ message: "estudante não encontrado" });
  }
  return res.status(200).send({ message: "estudante encontrado", student });
  }catch(error){
    return res
    .status(500)
    .send({ message: "Erro ao buscar estudante", error: error.message });
  }
};

export const createStudent = async (req, res) => {
  try{
    const { name, age, email, code, grade } = req.body;
  const studentAlredyExist = await studentsRepository.getStudentByEmail(email);
  if (studentAlredyExist){
    return res.status(409).send({ message: "Estudante já cadastrado" });
  }

  const student = new Student(name, age, email, code, grade);
  await studentsRepository.addStudent(student);

  return res.status(201).send("usuario criado com sucesso", student);
  }catch(error){
    return res
      .status(500)
      .send({ message: "Erro ao criar estudante", error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try{
    const { id } = req.params;
  const { name, age, email, code, grade } = req.body;

  const studentById = await studentsRepository.getStudentById(id);

  if (!studentById){
    res.status(404).send({ message: "Estudante não encontrado!" });
  }

  const studentByEmail = await studentsRepository.getStudentByEmail(email);

  if(studentByEmail && studentByEmail.id !== id){
    return res.status(409).send({ message: "Email já cadastrado" });
  }

  const updatedStudent= await studentsRepository.updateStudent(id, name, age, email, code, grade);

  return res
  .status(200)
  .send({ message: "Estudante atualizado com sucesso", updatedStudent });
  }catch(error){
    return res
      .status(500)
      .send({ message: "Erro ao atualizar usuário", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try{
    const { id } = req.params;
  const student = await studentsRepository.getStudentById(id);

  if (!student){
     res.status(404).send({ message: "Estudante não encontrado!" });
    }

  await studentsRepository.deleteStudent(id);
  return res.status(200).send({ message: "Estudante deletado com sucesso" })
  }catch(error){
    return res
    .status(500)
    .send({ message: "Erro ao deletar estudante", error: error.message });
  }
};
