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
  bottom: 100px;
  right: 130px;
`;

const TrashDiv = styled.div<{
  isDraggingOver: boolean;
}>``;

const Trashcan = () => {
  console.log("hey");
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
