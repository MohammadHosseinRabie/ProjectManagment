"use client"

// components/KanbanBoard.jsx
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Container,
  Badge
} from '@chakra-ui/react';

// کامپوننت کارت برای نمایش یک تسک
const TaskCard = ({ task }) => {
  return (
    <Box
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="sm"
      mb={2}
      borderWidth="1px"
      width="100%"
    >
      <Heading size="sm" mb={2}>{task.title}</Heading>
      <Text fontSize="sm" color="gray.600">{task.description}</Text>
      {task.tag && (
        <Badge mt={2} colorScheme="blue">{task.tag}</Badge>
      )}
    </Box>
  );
};

// کامپوننت قابل جابجایی برای کارت‌ها
const SortableTaskCard = ({ task, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      cursor="grab"
      width="100%"
    >
      <TaskCard task={task} />
    </Box>
  );
};

// کامپوننت ستون کانبان
const Column = ({ title, tasks, id }) => {
  const droppableId = `column-${id}`;
  
  return (
    <Box
      id={droppableId}
      bg="gray.50"
      p={4}
      borderRadius="lg"
      width="300px"
      height="fit-content"
      minH="400px"
      borderWidth="1px"
    >
      <Heading size="md" mb={4}>{title}</Heading>
      <VStack spacing={3} align="stretch">
        <SortableContext
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} id={task.id} task={task} />
          ))}
        </SortableContext>
      </VStack>
    </Box>
  );
};

// کامپوننت اصلی تخته کانبان
const KanbanBoard = () => {
  // داده‌های اولیه
  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      title: 'در انتظار',
      tasks: [
        { id: 'task-1', title: 'طراحی UI', description: 'طراحی رابط کاربری صفحه اصلی', tag: 'طراحی' },
        { id: 'task-2', title: 'پیاده‌سازی API', description: 'ایجاد اندپوینت‌های REST', tag: 'بک‌اند' },
        { id: 'task-3', title: 'تست واحد', description: 'نوشتن تست‌های واحد برای کامپوننت‌ها', tag: 'تست' }
      ]
    },
    inProgress: {
      id: 'inProgress',
      title: 'در حال انجام',
      tasks: [
        { id: 'task-4', title: 'بهینه‌سازی عملکرد', description: 'بهبود عملکرد صفحه اصلی', tag: 'فرانت‌اند' },
        { id: 'task-5', title: 'رفع باگ‌ها', description: 'رفع باگ‌های گزارش شده', tag: 'توسعه' }
      ]
    },
    done: {
      id: 'done',
      title: 'تکمیل شده',
      tasks: [
        { id: 'task-6', title: 'تحقیق محصول', description: 'تحقیق درباره نیازهای کاربران', tag: 'محصول' },
        { id: 'task-7', title: 'تنظیم پروژه', description: 'راه‌اندازی محیط توسعه', tag: 'DevOps' }
      ]
    }
  });

  // حسگرهای لازم برای drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  // تابع برای انتقال تسک بین ستون‌ها
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!active || !over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;
    
    // پیدا کردن ستون‌های مبدا و مقصد
    let sourceColumnId = null;
    let sourceTaskIndex = -1;
    let destinationColumnId = null;
    let destinationTaskIndex = -1;
    
    // پیدا کردن ستون مبدا و ایندکس تسک
    Object.keys(columns).forEach(columnId => {
      const taskIndex = columns[columnId].tasks.findIndex(task => task.id === activeId);
      if (taskIndex >= 0) {
        sourceColumnId = columnId;
        sourceTaskIndex = taskIndex;
      }
    });
    
    // اگر تسک یا ستون مبدا پیدا نشد، کاری نمی‌کنیم
    if (sourceColumnId === null || sourceTaskIndex === -1) {
      return;
    }
    
    // بررسی می‌کنیم آیا over یک تسک است یا یک ستون
    if (overId.startsWith('column-')) {
      // اگر روی ستون رها شده است، به انتهای ستون اضافه می‌کنیم
      destinationColumnId = overId.replace('column-', '');
      destinationTaskIndex = columns[destinationColumnId].tasks.length;
    } else {
      // اگر روی تسک رها شده است، ستون و ایندکس آن را پیدا می‌کنیم
      Object.keys(columns).forEach(columnId => {
        const taskIndex = columns[columnId].tasks.findIndex(task => task.id === overId);
        if (taskIndex >= 0) {
          destinationColumnId = columnId;
          destinationTaskIndex = taskIndex;
        }
      });
    }
    
    // اگر مقصد پیدا نشد، کاری نمی‌کنیم
    if (destinationColumnId === null) {
      return;
    }
    
    // کپی از وضعیت فعلی ستون‌ها می‌گیریم
    const newColumns = { ...columns };
    
    // تسک مورد نظر را از ستون مبدا برمی‌داریم
    const taskToMove = { ...newColumns[sourceColumnId].tasks[sourceTaskIndex] };
    newColumns[sourceColumnId].tasks = newColumns[sourceColumnId].tasks.filter((_, index) => index !== sourceTaskIndex);
    
    // تسک را به ستون مقصد اضافه می‌کنیم
    newColumns[destinationColumnId].tasks = [
      ...newColumns[destinationColumnId].tasks.slice(0, destinationTaskIndex),
      taskToMove,
      ...newColumns[destinationColumnId].tasks.slice(destinationTaskIndex)
    ];
    
    // وضعیت را به‌روزرسانی می‌کنیم
    setColumns(newColumns);
  }
  

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6} size="lg">تخته کانبان پروژه</Heading>
      <Flex gap={6}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {Object.values(columns).map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={column.tasks}
            />
          ))}
        </DndContext>
      </Flex>
    </Container>
  );
};

export default KanbanBoard;