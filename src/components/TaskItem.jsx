import React from "react";

const TaskItem = ({ task }) => {
  return (
    <div className="bg-white p-2">
      <h4 className="font-semibold text-[black]">{task.title}</h4>
    </div>
  );
};

export default TaskItem;
