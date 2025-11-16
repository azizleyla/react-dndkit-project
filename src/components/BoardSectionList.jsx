import React, { useState } from "react";
import { BOARD_SECTIONS, tasks } from "../constants";
import BoardSection from "./BoardSection";
import { getBoardSections, getTaskById } from "../utils";
import {
  closestCorners,
  defaultDropAnimation,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";

const BoardSectionList = () => {
  const initalBoardSections = getBoardSections(tasks);
  const [boardSections, setBoardSections] = useState(initalBoardSections);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const getPosition = (id) => {
    const itemId = tasks.findIndex((item) => item.id === id);
    return itemId;
  };

  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over.id === active.id) return;
    setActiveId(activeId);
    setBoardSections((prev) => {
      const oldIndex = getPosition(active.id);
      const lastIndex = getPosition(over.id);
      const statusKey = tasks[oldIndex].status;

      return {
        ...prev,
        [statusKey]: arrayMove(
          boardSections[statusKey],
          oldIndex,
          lastIndex,
        ),
      };
    });
    setActiveId(null);
  };
  const dropAnimation = {
    ...defaultDropAnimation,
  };
  const taskItem = activeId ? getTaskById(tasks, activeId) : null;

  return (
    <div className="grid grid-cols-4 gap-4">
      <DndContext
        onDragStart={handleDragStart}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        {Object.keys(BOARD_SECTIONS).map((boardSectionKey) => (
          <BoardSection
            id={boardSectionKey}
            tasks={boardSections[boardSectionKey]}
            key={boardSectionKey}
            title={boardSectionKey}
          />
        ))}
        <DragOverlay dropAnimation={dropAnimation}>
          {taskItem ? <TaskItem task={taskItem} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default BoardSectionList;
