import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";

const TrashDiv = styled.div<{
  isDraggingOver: boolean;
}>``;

const Trashcan = () => {
  return (
    <div>
      <Droppable droppableId="trashcan">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <TrashDiv
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <FontAwesomeIcon
              icon={faTrash}
              style={{ color: "white", fontSize: "50px" }}
            />
          </TrashDiv>
        )}
      </Droppable>
    </div>
  );
};

export default Trashcan;
