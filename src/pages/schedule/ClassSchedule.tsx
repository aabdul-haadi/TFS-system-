import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { ALL_CLASSES, DAYS_OF_WEEK, ClassType, ClassSchedule } from '../../types';
import UpdateButton from '../../components/UpdateButton';

const ClassScheduleComponent: React.FC = () => {
  const { teachers, schedules, addSchedule, updateSchedule } = useData();
  const [selectedClass, setSelectedClass] = useState<ClassType>('Class 1');
  const [isUpdatingDay, setIsUpdatingDay] = useState<Record<string, boolean>>({});
  const [pendingChanges, setPendingChanges] = useState<Record<string, Partial<ClassSchedule>>>({});

  const existingSchedule = schedules.filter((s) => s.class === selectedClass);

  const handleAddTimeSlot = async (day: string) => {
    const dayIndex = DAYS_OF_WEEK.indexOf(day);
    if (dayIndex === -1) return;

    const slotKey = `${selectedClass}-${dayIndex}-new`;
    setIsUpdatingDay((prev) => ({ ...prev, [slotKey]: true }));

    try {
      const newSlot: Omit<ClassSchedule, 'id'> = {
        class: selectedClass,
        day_of_week: dayIndex,
        start_time: '08:00',
        end_time: '09:00',
        subject: '',
        teacher_id: null
      };

      await addSchedule(newSlot);
    } finally {
      setIsUpdatingDay((prev) => ({ ...prev, [slotKey]: false }));
    }
  };

  const handleInputChange = (
  schedule: ClassSchedule,
  field: keyof ClassSchedule,
  value: string | number | null
) => {
  const key = String(schedule.id);
  const current = pendingChanges[key] || {};

  if (value !== schedule[field]) {
    setPendingChanges((prev) => ({
      ...prev,
      [key]: {
        ...current,
        [field]: value,
      },
    }));
  } else {
    const updated = { ...current };
    delete updated[field];

    if (Object.keys(updated).length === 0) {
      const updatedChanges = { ...pendingChanges };
      delete updatedChanges[key];
      setPendingChanges(updatedChanges);
    } else {
      setPendingChanges((prev) => ({
        ...prev,
        [key]: updated,
      }));
    }
  }
};
  const handleUpdateDay = async (dayIndex: number) => {
    const dayKey = `${selectedClass}-${dayIndex}`;
    setIsUpdatingDay((prev) => ({ ...prev, [dayKey]: true }));

    const changesForDay = Object.entries(pendingChanges).filter(([id]) => {
      const sched = existingSchedule.find((s) => String(s.id) === id);
      return sched?.day_of_week === dayIndex;
    });

    try {
      for (const [id, updates] of changesForDay) {
        const original = existingSchedule.find((s) => String(s.id) === id);
        if (original) {
          await updateSchedule({ ...original, ...updates });
        }
      }

      // Clear all pending changes for the day
      setPendingChanges((prev) => {
        const next = { ...prev };
        for (const [id] of changesForDay) {
          delete next[id];
        }
        return next;
      });
    } finally {
      setIsUpdatingDay((prev) => ({ ...prev, [dayKey]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Class Schedule</h1>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value as ClassType)}
          className="border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        >
          {ALL_CLASSES.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-gray-200">
          {DAYS_OF_WEEK.map((day) => {
            const dayIndex = DAYS_OF_WEEK.indexOf(day);
            const daySchedules = existingSchedule.filter(s => s.day_of_week === dayIndex);
            const dayKey = `${selectedClass}-${dayIndex}`;

            const hasAnyChanges = daySchedules.some((s) => pendingChanges[String(s.id)]);

            return (
              <div key={day} className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">{day}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddTimeSlot(day)}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Add Time Slot
                    </button>
                    {hasAnyChanges && (
                      <UpdateButton
                        onClick={() => handleUpdateDay(dayIndex)}
                        isLoading={isUpdatingDay[dayKey]}
                        disabled={!hasAnyChanges}
                      >
                        Update Day
                      </UpdateButton>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {daySchedules.map((schedule) => {
                    const key = String(schedule.id);
                    const current = pendingChanges[key] || {};
                    return (
                      <div key={key} className="flex items-center space-x-4">
                        <input
                          type="time"
                          value={current.start_time || schedule.start_time}
                          onChange={(e) => handleInputChange(schedule, 'start_time', e.target.value)}
                          className="border-gray-300 rounded-md"
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={current.end_time || schedule.end_time}
                          onChange={(e) => handleInputChange(schedule, 'end_time', e.target.value)}
                          className="border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          value={current.subject || schedule.subject}
                          onChange={(e) => handleInputChange(schedule, 'subject', e.target.value)}
                          placeholder="Subject"
                          className="flex-1 border-gray-300 rounded-md"
                        />
                        <select
                          value={current.teacher_id || schedule.teacher_id || ''}
                          onChange={(e) =>
                            handleInputChange(schedule, 'teacher_id', e.target.value || null)
                          }
                          className="border-gray-300 rounded-md"
                        >
                          <option value="">Select Teacher</option>
                          {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                              {teacher.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClassScheduleComponent;
