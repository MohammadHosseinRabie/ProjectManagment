"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Container,
  Badge,
} from "@chakra-ui/react";

const TaskCard = ({ task }) => {
  return (
    <Box
      bg="cyan.50"
      p={4}
      borderRadius="md"
      boxShadow="sm"
      mb={2}
      borderWidth="1px"
      width="100%"
    >
      <Heading size="sm" mb={2} color={"GrayText"}>
        {task.title}
      </Heading>
      <Text fontSize="sm" color="gray.600">
        {task.description}
      </Text>
      {task.tag && (
        <Badge mt={2} colorScheme="blue">
          {task.tag}
        </Badge>
      )}
    </Box>
  );
};

const SortableTaskCard = ({ task, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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

const Column = ({ title, tasks, id }) => {
  return (
    <Box
      bg="gray.50"
      p={4}
      borderRadius="lg"
      width="300px"
      height="fit-content"
      minH="400px"
      borderWidth="1px"
    >
      <Heading size="md" mb={4} color={"GrayText"}>
        {title}
      </Heading>
      <VStack spacing={3} align="stretch">
        <SortableContext
          items={tasks.map((task) => task.id)}
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

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: {
      id: "todo",
      title: "در انتظار",
      tasks: [
        {
          id: "task-1",
          title: "طراحی UI",
          description: "طراحی رابط کاربری صفحه اصلی",
          tag: "طراحی",
        },
        {
          id: "task-2",
          title: "پیاده‌سازی API",
          description: "ایجاد اندپوینت‌های REST",
          tag: "بک‌اند",
        },
        {
          id: "task-3",
          title: "تست واحد",
          description: "نوشتن تست‌های واحد برای کامپوننت‌ها",
          tag: "تست",
        },
      ],
    },
    inProgress: {
      id: "inProgress",
      title: "در حال انجام",
      tasks: [
        {
          id: "task-4",
          title: "بهینه‌سازی عملکرد",
          description: "بهبود عملکرد صفحه اصلی",
          tag: "فرانت‌اند",
        },
        {
          id: "task-5",
          title: "رفع باگ‌ها",
          description: "رفع باگ‌های گزارش شده",
          tag: "توسعه",
        },
      ],
    },
    done: {
      id: "done",
      title: "تکمیل شده",
      tasks: [
        {
          id: "task-6",
          title: "تحقیق محصول",
          description: "تحقیق درباره نیازهای کاربران",
          tag: "محصول",
        },
        {
          id: "task-7",
          title: "تنظیم پروژه",
          description: "راه‌اندازی محیط توسعه",
          tag: "DevOps",
        },
      ],
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) {
      return;
    }

    const sourceColumnId = Object.keys(columns).find((columnId) =>
      columns[columnId].tasks.some((task) => task.id === active.id)
    );

    const destinationColumnId = Object.keys(columns).find((columnId) =>
      columns[columnId].tasks.some((task) => task.id === over.id)
    );

    if (sourceColumnId === destinationColumnId) {
      const column = columns[sourceColumnId];
      const oldIndex = column.tasks.findIndex((task) => task.id === active.id);
      const newIndex = column.tasks.findIndex((task) => task.id === over.id);

      const newTasks = arrayMove(column.tasks, oldIndex, newIndex);

      setColumns({
        ...columns,
        [sourceColumnId]: {
          ...column,
          tasks: newTasks,
        },
      });
    } else if (sourceColumnId && destinationColumnId) {
      const sourceColumn = columns[sourceColumnId];
      const destColumn = columns[destinationColumnId];

      const taskToMove = sourceColumn.tasks.find(
        (task) => task.id === active.id
      );
      const destinationIndex = destColumn.tasks.findIndex(
        (task) => task.id === over.id
      );

      const newSourceTasks = sourceColumn.tasks.filter(
        (task) => task.id !== active.id
      );
      const newDestTasks = [...destColumn.tasks];

      newDestTasks.splice(destinationIndex, 0, taskToMove);

      setColumns({
        ...columns,
        [sourceColumnId]: {
          ...sourceColumn,
          tasks: newSourceTasks,
        },
        [destinationColumnId]: {
          ...destColumn,
          tasks: newDestTasks,
        },
      });
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6} size="lg">
        تخته کانبان پروژه
      </Heading>
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
