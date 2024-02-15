import { useCallback, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import ReactFlow, {
  Position,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuid } from "uuid";
import "./index.css";

const initialEdges = [];

const TouchDeviceFlow = () => {
  const initialNodes = [
    {
      id: "1",
      data: {
        label: (
          <div>
            <div>Node gốc</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2px",
              }}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentNode("1");
                  setIsOpen(true);
                }}
              >
                <FaPlus />
              </div>
              {/* <div  onClick={() => {}}>
                <FaTrash />
              </div> */}
            </div>
          </div>
        ),
      },
      position: { x: 100, y: 100 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      forceToolbarVisible: true,
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [currentNode, setCurrentNode] = useNodesState(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isOpen, setIsOpen] = useState(false);
  const [nameNode, setNameNode] = useState("");
  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const onSubmit = () => {
    const id = uuid();

    setNodes([
      ...nodes,
      {
        id: id,
        data: {
          label: (
            <div>
              <div>{nameNode}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2px",
                }}
              >
                <div
                  style={{ cursor: "pointer", marginRight: "5px" }}
                  onClick={() => {
                    setCurrentNode(id);
                    setIsOpen(true);
                  }}
                >
                  <FaPlus />
                </div>
                <div
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                  onClick={() => {
                    onDeleteNode(id);
                  }}
                >
                  <FaTrash />
                </div>
              </div>
            </div>
          ),
        },
        position: {
          x: 300 + Math.floor(Math.random() * 130),
          y: 100 + Math.floor(Math.random() * 100),
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      },
    ]);

    setEdges((eds) =>
      addEdge(
        {
          source: currentNode,
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

  const onDeleteNode = (idNode) => {
    setNodes((nds) => nodes.filter((node) => node.id !== idNode));
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
        // onNodeClick={(e, node) => {
        //   setCurrentNode(node);
        //   setIsOpen(true);
        // }}
        // onNodesDelete={(node) => {
        //   onDeleteNode(node);
        // }}
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
