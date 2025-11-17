import { BOARD_SECTIONS } from "../constants"

export const getBoardSections = (tasks) => {
    const boardSections = {}
    Object.keys(BOARD_SECTIONS).forEach((key) => {
        boardSections[key] = getTasksByStatus(tasks, key)
    })
    return boardSections
}

export const getTasksByStatus = (tasks, status) => {
    return tasks.filter((task) => task.status === status);
};
export const getTaskById = (tasks, id) => {
    return tasks.find((task) => task.id === id);
};
export const findBoardSectionContainer = (
    boardSections,
    id
) => {
    if (id in boardSections) {
        return id;
    }

    const container = Object.keys(boardSections).find((key) =>
        boardSections[key].find((item) => item.id === id)
    );
    console.log(container)
    return container;
};
