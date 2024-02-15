import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Position,
  addEdge,
  NodeToolbar,
  ControlButton,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import Modal from "react-modal";
import "./index.css";

const initialNodes = [
  {
    id: "1",
    data: { label: "Node gốc" },
    position: { x: 100, y: 100 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    forceToolbarVisible: true,
  },
];

const initialEdges = [];

const TouchDeviceFlow = () => {
  const [nodes, seNodes, onNodesChange] = useNodesState(initialNodes);
  const [currentNode, setCurrentNode] = useNodesState(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isOpen, setIsOpen] = useState(false);
  const [nameNode, setNameNode] = useState("");
  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const addNode = () => {
    seNodes([
      ...nodes,
      {
        id: "4",
        data: { label: "Node 3" },
        position: { x: 300, y: 100 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      },
    ]);

    setEdges((eds) =>
      addEdge(
        {
          source: "1",
          sourceHandle: null,
          target: "2",
          targetHandle: null,
        },
        eds
      )
    );
  };

  const onSubmit = () => {
    const id = uuid();

    console.log(id);
    seNodes([
      ...nodes,
      {
        id: id,
        data: { label: nameNode },
        position: { x: 300, y: 100 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      },
    ]);

    setEdges((eds) =>
      addEdge(
        {
          source: currentNode.id,
          sourceHandle: null,
          target: id,
          targetHandle: null,
        },
        eds
      )
    );

    setIsOpen(false);
    setCurrentNode(null);
    setNameNode("");
  };

  const onDeleteNode = (node) => {
    console.log(node);
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        className="touchdevice-flow"
        fitView
        onNodeClick={(e, node) => {
          setCurrentNode(node);
          setIsOpen(true);
        }}
        onNodesDelete={(node) => {
          onDeleteNode(node);
        }}
      />

      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ƒ>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ marginBottom: "10px", textAlign: "center" }}>
              Thêm node
            </div>

            <input
              placeholder="Tiêu đề"
              style={{
                height: "38px",
                fontSize: "18px",
                borderRadius: "8px",
                border: "1px solid #DEDEDE",
                paddingLeft: "4px",
                paddingRight: "4px",
                marginBottom: "10px",
              }}
              type="text"
              onChange={(val) => {
                setNameNode(val.target.value);
              }}
            />
            <div
              style={{
                background: "red",
                width: 100,
                padding: "10px",
                borderRadius: "6px",
                color: "white",
                textAlign: "center",
              }}
              onClick={onSubmit}
            >
              Cập nhật
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TouchDeviceFlow;
