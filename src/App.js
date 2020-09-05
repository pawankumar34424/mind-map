import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MindElixir, { E } from 'mind-elixir'


function App() {

  const [mindElixir, setMindElixir] = useState();
  const [selectedNodeId, setSelectedNodeId] = useState('root');
  
  useEffect(() => {

    const existigData=localStorage.getItem("data") && JSON.parse(localStorage.getItem("data"))
    const data=existigData || MindElixir.new("My Topic");

    const _mindElixir = new MindElixir({
      el: "#map",
      direction: MindElixir.LEFT,
      data: data,
      draggable: false, // default true
      contextMenu: false, // default true
      toolBar: false, // default true
      nodeMenu: false, // default true
      keypress: false // default true
    });
    _mindElixir.init();

    _mindElixir.bus.addListener('selectNode', node => {
      setSelectedNodeId(node.id)
    })

    _mindElixir.bus.addListener('operation', operation => {
      // console.log(operation)
      /*if(operation.name==='beginEdit'){
        operation.obj['style']= {color: "#ecf0f1", fontSize: "24", background: "#2980b9"}
      }*/
      // return {
      //   name: action name,
      //   obj: target object
      // }
    
      // name: [insertSibling|addChild|removeNode|beginEdit|finishEdit]
      // obj: target
    
      // name: moveNode
      // obj: {from:target1,to:target2}
    })
    _mindElixir.initSide()
    setMindElixir(_mindElixir)
  }, []);

  const addNewChild=()=>{
    const selectedNode=E(selectedNodeId);
    mindElixir.addChild(selectedNode)
    console.log(mindElixir)
    const { history } = mindElixir;
    const { obj } = history[history.length-1];
    //obj['style']= {color: "#ecf0f1", fontSize: "24", background: "#2980b9"};
    //mindElixir.updateNodeStyle(obj);

    const data =mindElixir.getAllData();
    localStorage.setItem("data",JSON.stringify(data))
  }
 
  const deleteSelected=()=>{
    const selectedNode=E(selectedNodeId);
    mindElixir.removeNode(selectedNode)
    setSelectedNodeId(null)
  }
  console.log("mindElixir",mindElixir);
  return (
    <div className="App">
        <button onClick={()=>addNewChild()}>Add New Child</button>
        <button onClick={()=>mindElixir.toCenter()}>Reset View</button>
        <button 
            disabled={!selectedNodeId || selectedNodeId==='root'} 
            onClick={()=>deleteSelected()}>Delete</button>
       <div id="map" style={{ height: "500px", width: "80%" }}> </div>
    </div>
  );
}

export default App;
