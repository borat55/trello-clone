import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";

const TrashContainer = styled.div`
  position: fixed;
  bottom: -20px;
  right: -20px;
  width: 200px;
  height: 200px;
`;

const TrashDiv = styled.div<{
  isDraggingOver: boolean;
}>`
  width: 200px;
  height: 200px;
  z-index: 0;
`;

const Trashcan = () => {
  console.log("trashcan is called");
  return (
    <TrashContainer>
      <Droppable droppableId="trashcan">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <TrashDiv
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {snapshot.isDraggingOver ? (
              <FontAwesomeIcon
                icon={faTrashCan}
                style={{
                  color: "navy",
                  fontSize: "70px",
                  transition: "all 0.5s",
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faTrashCan}
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
    </TrashContainer>
  );
};

export default Trashcan;
