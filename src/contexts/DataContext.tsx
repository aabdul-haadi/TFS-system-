import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../lib/supabase';
import { Student, Teacher, FeeRecord, ClassType, ClassSchedule, getNextClass } from '../types';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface DataContextType {
  students: Student[];
  teachers: Teacher[];
  feeRecords: FeeRecord[];
  schedules: ClassSchedule[];
  addStudent: (student: Student) => Promise<void>;
  updateStudent: (student: Student) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  addTeacher: (teacher: Teacher) => Promise<void>;
  updateTeacher: (teacher: Teacher) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  addFeeRecord: (record: FeeRecord) => Promise<void>;
  updateFeeRecord: (record: FeeRecord) => Promise<void>;
  getStudentsByClass: (classType: ClassType) => Student[];
  getPassedOutStudents: () => Student[];
  getStudentById: (id: string) => Student | undefined;
  getTeacherById: (id: string) => Teacher | undefined;
  getFeeRecordsByStudent: (studentId: string, year: number) => FeeRecord[];
  getFeeRecordsByMonth: (month: number, year: number) => FeeRecord[];
  addSchedule: (schedule: Omit<ClassSchedule, 'id'>) => Promise<void>;
  updateSchedule: (schedule: ClassSchedule) => Promise<void>;
  getScheduleByClass: (classType: ClassType) => ClassSchedule | undefined;
  promoteAllClasses: () => Promise<void>;
  undoPromotion: () => Promise<void>;
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  checkRegistrationId: (registrationId: string, excludeId?: string) => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([]);
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [promotionHistory, setPromotionHistory] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const studentsSubscription = supabase
      .channel('students-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, loadStudents)
      .subscribe();

    const teachersSubscription = supabase
      .channel('teachers-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'teachers' }, loadTeachers)
      .subscribe();

    const feeRecordsSubscription = supabase
      .channel('fee-records-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fee_records' }, loadFeeRecords)
      .subscribe();

    const schedulesSubscription = supabase
      .channel('schedules-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'class_schedules' }, loadSchedules)
      .subscribe();

    return () => {
      studentsSubscription.unsubscribe();
      teachersSubscription.unsubscribe();
      feeRecordsSubscription.unsubscribe();
      schedulesSubscription.unsubscribe();
    };
  }, []);

  const loadData = async () => {
    await Promise.all([
      loadStudents(),
      loadTeachers(),
      loadFeeRecords(),
      loadSchedules(),
      loadPromotionHistory()
    ]);
  };

  const loadStudents = async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading students:', error);
      return;
    }
    setStudents(data || []);
  };

  const loadTeachers = async () => {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading teachers:', error);
      return;
    }
    setTeachers(data || []);
  };

  const loadFeeRecords = async () => {
    const { data, error } = await supabase
      .from('fee_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading fee records:', error);
      return;
    }
    setFeeRecords(data || []);
  };

  const loadSchedules = async () => {
    const { data, error } = await supabase
      .from('class_schedules')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading schedules:', error);
      return;
    }
    setSchedules(data || []);
  };

  const loadPromotionHistory = async () => {
    const { data, error } = await supabase
      .from('promotion_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading promotion history:', error);
      return;
    }
    setPromotionHistory(data || []);
  };

  const checkRegistrationId = async (registrationId: string, excludeId?: string): Promise<boolean> => {
    let query = supabase
      .from('students')
      .select('id')
      .eq('registration_id', registrationId);
    
    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { data, error } = await query.single();

    if (error && error.code === 'PGRST116') {
      // No data found - registration ID is available
      return false;
    }

    // Data found - registration ID exists
    return true;
  };

  const addStudent = async (student: Student) => {
    // Check if registration ID already exists
    const exists = await checkRegistrationId(student.registration_id);
    if (exists) {
      toast.error('Registration ID already exists');
      throw new Error('Registration ID already exists');
    }

    const newStudent = {
      id: uuidv4(),
      registration_id: student.registration_id,
      name: student.name,
      father_name: student.father_name,
      phone_number: student.phone_number,
      class: student.class,
      status: student.status,
      joining_date: student.joining_date,
      academic_year: student.academic_year
    };

    const { error } = await supabase.from('students').insert([newStudent]);
    
    if (error) {
      console.error('Error adding student:', error);
      toast.error('Failed to add student');
      throw error;
    }
    
    toast.success('Student added successfully');
    await loadStudents();
  };

  const updateStudent = async (student: Student) => {
    // Check if registration ID already exists (excluding current student)
    const exists = await checkRegistrationId(student.registration_id, student.id);
    if (exists) {
      toast.error('Registration ID already exists');
      throw new Error('Registration ID already exists');
    }

    const { error } = await supabase
      .from('students')
      .update({
        registration_id: student.registration_id,
        name: student.name,
        father_name: student.father_name,
        phone_number: student.phone_number,
        class: student.class,
        status: student.status,
        joining_date: student.joining_date,
        academic_year: student.academic_year
      })
      .eq('id', student.id);

    if (error) {
      console.error('Error updating student:', error);
      toast.error('Failed to update student');
      throw error;
    }

    toast.success('Student updated successfully');
    await loadStudents();
  };

  const deleteStudent = async (id: string) => {
    const { error } = await supabase.from('students').delete().eq('id', id);
    
    if (error) {
      console.error('Error deleting student:', error);
      toast.error('Failed to delete student');
      throw error;
    }
    
    toast.success('Student deleted successfully');
    await loadStudents();
  };

  const addTeacher = async (teacher: Teacher) => {
    const newTeacher = {
      id: uuidv4(),
      name: teacher.name,
      phone_number: teacher.phoneNumber || '', // Ensure phone_number is never null
      joining_date: teacher.joiningDate,
      status: teacher.status
    };

    const { error } = await supabase.from('teachers').insert([newTeacher]);
    
    if (error) {
      console.error('Error adding teacher:', error);
      toast.error('Failed to add teacher');
      throw error;
    }
    
    toast.success('Teacher added successfully');
    await loadTeachers();
  };

  const updateTeacher = async (teacher: Teacher) => {
    const { error } = await supabase
      .from('teachers')
      .update({
        name: teacher.name,
        phone_number: teacher.phoneNumber || '', // Ensure phone_number is never null
        joining_date: teacher.joiningDate,
        status: teacher.status
      })
      .eq('id', teacher.id);

    if (error) {
      console.error('Error updating teacher:', error);
      toast.error('Failed to update teacher');
      throw error;
    }

    toast.success('Teacher updated successfully');
    await loadTeachers();
  };

  const deleteTeacher = async (id: string) => {
    const { error } = await supabase.from('teachers').delete().eq('id', id);
    
    if (error) {
      console.error('Error deleting teacher:', error);
      toast.error('Failed to delete teacher');
      throw error;
    }
    
    toast.success('Teacher deleted successfully');
    await loadTeachers();
  };

  const addFeeRecord = async (record: FeeRecord) => {
    const { error } = await supabase
      .from('fee_records')
      .insert([{
        id: uuidv4(),
        student_id: record.student_id,
        month: record.month,
        year: record.year,
        amount: record.amount,
        status: record.status,
        paid_date: record.status !== 'Unpaid' ? new Date().toISOString() : null
      }]);

    if (error) {
      console.error('Error adding fee record:', error);
      toast.error('Failed to add fee record');
      throw error;
    }

    toast.success('Fee record added successfully');
    await loadFeeRecords();
  };

  const updateFeeRecord = async (record: FeeRecord) => {
    const { error } = await supabase
      .from('fee_records')
      .update({
        amount: record.amount,
        status: record.status,
        paid_date: record.status !== 'Unpaid' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', record.id);

    if (error) {
      console.error('Error updating fee record:', error);
      toast.error('Failed to update fee record');
      throw error;
    }

    toast.success('Fee record updated successfully');
    await loadFeeRecords();
  };

  const addSchedule = async (schedule: Omit<ClassSchedule, 'id'>) => {
    try {
      const newSchedule = {
        id: uuidv4(),
        ...schedule
      };

      const { error } = await supabase.from('class_schedules').insert([newSchedule]);
      
      if (error) {
        if (error.code === '23505') {
          toast.error('A schedule already exists for this class at the selected time');
          throw new Error('Schedule already exists');
        }
        console.error('Error adding schedule:', error);
        toast.error('Failed to add schedule');
        throw error;
      }
      
      toast.success('Schedule added successfully');
      await loadSchedules();
    } catch (error) {
      throw error;
    }
  };

  const updateSchedule = async (schedule: ClassSchedule) => {
    if (!schedule.id) {
      console.error('Cannot update schedule without id');
      toast.error('Invalid schedule update');
      return;
    }

    try {
      const { error } = await supabase
        .from('class_schedules')
        .update({
          class: schedule.class,
          day_of_week: schedule.day_of_week,
          start_time: schedule.start_time,
          end_time: schedule.end_time,
          subject: schedule.subject,
          teacher_id: schedule.teacher_id
        })
        .eq('id', schedule.id);

      if (error) {
        if (error.code === '23505') {
          toast.error('A schedule already exists for this class at the selected time');
          throw new Error('Schedule already exists');
        }
        console.error('Error updating schedule:', error);
        toast.error('Failed to update schedule');
        throw error;
      }

      toast.success('Schedule updated successfully');
      await loadSchedules();
    } catch (error) {
      throw error;
    }
  };

  const getStudentsByClass = (classType: ClassType): Student[] => {
    return students.filter(student => student.class === classType);
  };

  const getPassedOutStudents = (): Student[] => {
    return students.filter(student => student.status === 'pass-out');
  };

  const getStudentById = (id: string): Student | undefined => {
    return students.find(student => student.id === id);
  };

  const getTeacherById = (id: string): Teacher | undefined => {
    return teachers.find(teacher => teacher.id === id);
  };

  const getFeeRecordsByStudent = (studentId: string, year: number): FeeRecord[] => {
    return feeRecords.filter(record => record.student_id === studentId && record.year === year);
  };

  const getFeeRecordsByMonth = (month: number, year: number): FeeRecord[] => {
    return feeRecords.filter(record => record.month === month && record.year === year);
  };

  const getScheduleByClass = (classType: ClassType): ClassSchedule | undefined => {
    return schedules.find(schedule => schedule.class === classType);
  };

  const promoteAllClasses = async () => {
    try {
      const { error: historyError } = await supabase
        .from('promotion_history')
        .insert([{
          id: uuidv4(),
          promoted_by: user?.id,
          previous_state: students
        }]);

      if (historyError) throw historyError;

      for (const student of students.filter(s => s.status === 'active')) {
        const nextClass = getNextClass(student.class);
        const update = {
          class: nextClass || student.class,
          status: nextClass ? 'active' : 'pass-out',
          academic_year: selectedYear + 1
        };

        const { error } = await supabase
          .from('students')
          .update(update)
          .eq('id', student.id);
        
        if (error) throw error;
      }

      toast.success('All classes promoted successfully');
      await loadStudents();
    } catch (error) {
      console.error('Error promoting classes:', error);
      toast.error('Failed to promote classes');
    }
  };

  const undoPromotion = async () => {
    try {
      const { data: history, error: historyError } = await supabase
        .from('promotion_history')
        .select('*')
        .order('promoted_at', { ascending: false })
        .limit(1)
        .single();

      if (historyError) throw historyError;

      if (!history) {
        toast.error('No promotion history found');
        return;
      }

      const previousState = history.previous_state;
      for (const student of previousState) {
        const { error } = await supabase
          .from('students')
          .update({
            class: student.class,
            status: student.status,
            academic_year: student.academic_year
          })
          .eq('id', student.id);
        
        if (error) throw error;
      }

      await supabase
        .from('promotion_history')
        .delete()
        .eq('id', history.id);

      toast.success('Last promotion undone successfully');
      await loadStudents();
    } catch (error) {
      console.error('Error undoing promotion:', error);
      toast.error('Failed to undo promotion');
    }
  };

  return (
    <DataContext.Provider value={{
      students,
      teachers,
      feeRecords,
      schedules,
      addStudent,
      updateStudent,
      deleteStudent,
      addTeacher,
      updateTeacher,
      deleteTeacher,
      addFeeRecord,
      updateFeeRecord,
      getStudentsByClass,
      getPassedOutStudents,
      getStudentById,
      getTeacherById,
      getFeeRecordsByStudent,
      getFeeRecordsByMonth,
      addSchedule,
      updateSchedule,
      getScheduleByClass,
      promoteAllClasses,
      undoPromotion,
      selectedYear,
      setSelectedYear,
      checkRegistrationId
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};