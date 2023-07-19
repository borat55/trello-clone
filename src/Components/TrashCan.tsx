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
            {snapshot.isDraggingOver ? (
              <FontAwesomeIcon
                icon={faTrash}
                style={{
                  color: "navy",
                  fontSize: "70px",
                  transition: "all 0.5s",
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faTrash}
                style={{
                  color: "white",
                  fontSize: "50px",
                  transition: "all 0.5s",
                }}
              />
            )}
          </TrashDiv>
        )}
      </Droppable>
    </div>
  );
};

export default Trashcan;
