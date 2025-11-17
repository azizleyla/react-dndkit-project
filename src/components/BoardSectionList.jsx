import React, { useState } from "react";
import { BOARD_SECTIONS, tasks } from "../constants";
import BoardSection from "./BoardSection";
import {
  findBoardSectionContainer,
  getBoardSections,
  getTaskById,
} from "../utils";
import {
  closestCorners,
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
  const [overId, setOverId] = useState(null);

  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragOver = ({ active, over }) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id,
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id,
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id,
      );
      const overIndex = overItems.findIndex(
        (item) => item.id !== over?.id,
      );

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id,
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length,
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id,
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id,
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id,
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id,
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex,
        ),
      }));
    }
    setActiveId(null);
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const taskItem = activeId ? getTaskById(tasks, activeId) : null;

  return (
    <div className="grid grid-cols-4 gap-4 p-2">
      <DndContext
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        {Object.keys(BOARD_SECTIONS).map((boardSectionKey) => (
          <BoardSection
            overId={overId}
            activeId={activeId}
            id={boardSectionKey}
            tasks={boardSections[boardSectionKey]}
            key={boardSectionKey}
            title={boardSectionKey}
          />
        ))}
        <DragOverlay  style={{ transformOrigin: "0 0 " }}>
          {activeId && taskItem ? (
            <div
              style={{
                transform: "rotate(3deg) skewX(2deg)",
              }}
              className="bg-[#242528] opacity-80 text-white p-2 my-3 rounded-lg shadow-xl"
            >
              <TaskItem task={taskItem} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default BoardSectionList;
