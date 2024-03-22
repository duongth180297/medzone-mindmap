import { useCallback, useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import { useParams, useSearchParams } from "react-router-dom";
import ReactFlow, {
  Position,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuid } from "uuid";
import "./index.css";
import apiClient from "./services/apiClient";
import CircularJSON from "circular-json";
import { getEdge, getNode, setEdge, setNode } from "./helpers/storage";

const initialEdges = [];

const TouchDeviceFlow = () => {
  const initialNodes = [
    {
      id: "1",
      data: {
        label: "Node gốc",
        // (
        //   <div>
        //     <div>Node gốc</div>
        //     <div
        //       style={{
        //         display: "flex",
        //         justifyContent: "center",
        //         marginTop: "2px",
        //       }}
        //     >
        //       <div
        //         style={{ cursor: "pointer" }}
        //         onClick={() => {
        //           setCurrentNode("1");
        //           setIsOpen(true);
        //         }}
        //       >
        //         <FaPlus size={10} />
        //       </div>
        //       {/* <div  onClick={() => {}}>
        //         <FaTrash />
        //       </div> */}
        //     </div>
        //   </div>
        // ),
      },
      position: { x: 100, y: 100 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      forceToolbarVisible: true,
    },
  ];
  const [queryParameters] = useSearchParams();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const [nodeCustom, setNodeCustom] = useState([]);
  const [currentNode, setCurrentNode] = useNodesState(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isOpen, setIsOpen] = useState(false);
  const [nameNode, setNameNode] = useState("");
  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const userId = "1"; //queryParameters.get("userId");
  const id = "1"; //queryParameters.get("id");
  const uuidMindMap = "6e822e7b-e672-4bff-97b9-1480ed118453"; //queryParameters.get("uuid");

  useEffect(() => {
    const node = CircularJSON.parse(getNode());
    const edge = CircularJSON.parse(getEdge());
    // setNodes(node);
    setEdges(edge);

    // setEdges(edge)
    // if (node) {
    //   setNodes(node);
    // }
    console.log(node);
    console.log(edges);
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
                  <FaPlus size={10} />
                </div>
                <div
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                  onClick={() => {
                    onDeleteNode(id);
                  }}
                >
                  <FaTrash size={10} />
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

  const saveNode = () => {
    console.log(edges);
    // console.log(JSON.stringify(nodes));
    // console.log(edges);
    // setNode(CircularJSON.stringify(nodes));
    // setEdge(CircularJSON.stringify(edges));
    // console.log(CircularJSON.stringify(nodes));
    // console.log(getNode());
    // if (uuidMindMap && id) {
    //   apiClient.post(
    //     "/api/user-mind-map/update",
    //     {
    //       data_node: CircularJSON.stringify(nodes),
    //       data_edge: CircularJSON.stringify(nodes),
    //       id: id,
    //     },
    //     {
    //       headers: {
    //         uuid: uuidMindMap,
    //         user_id: userId,
    //       },
    //     }
    //   );
    //   return;
    // }
    // apiClient.post(
    //   "/api/user-mind-map/create",
    //   {
    //     data_node: CircularJSON.stringify(nodes),
    //     data_edge: CircularJSON.stringify(nodes),
    //   },
    //   {
    //     headers: {
    //       user_id: userId,
    //     },
    //   }
    // );
  };
  return (
    <>
      <div style={{ background: "red", width: "200px" }} onClick={saveNode}>
        Cập nhật
      </div>
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
