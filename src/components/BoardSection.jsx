import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import TaskItem from "./TaskItem";
import { DragOverlay } from "@dnd-kit/core";

const BoardSection = ({ title, tasks }) => {
  return (
    <div className="bg-[#eee] p-2">
      <h4 className="text-black font-semibold">{title}</h4>
      <SortableContext
        items={tasks} // yalnız id-ləri veririk
        strategy={verticalListSortingStrategy}
      >
        {tasks?.map((task) => {
          return (
            <div key={task.id}>
              <SortableItem id={task.id}>
                <TaskItem task={task} />
              </SortableItem>
            </div>
          );
        })}
      </SortableContext>
    </div>
  );
};

export default BoardSection;
