import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import TaskItem from "./TaskItem";
import { DragOverlay, useDroppable } from "@dnd-kit/core";

const BoardSection = ({ id, activeId, overId, title, tasks }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="bg-[#101204] p-2 rounded-lg">
      <div className="p-2">
        <h4 className="text-[#BFC1C4] uppercase font-semibold">{title}</h4>
      </div>
      <SortableContext
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        {" "}
        <div ref={setNodeRef}>
          {tasks?.map((task) => {
            return (
              <div key={task.id}>
                <SortableItem
                  overId={overId}
                  activeId={activeId}
                  id={task.id}
                >
                  <TaskItem task={task} />
                </SortableItem>
              </div>
            );
          })}
        </div>
      </SortableContext>
    </div>
  );
};

export default BoardSection;
