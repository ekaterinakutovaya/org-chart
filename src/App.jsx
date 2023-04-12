import { useEffect, useState } from 'react'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { OrganizationChart } from 'primereact/organizationchart';

import { OrgStructure } from "./data/data";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {

    function getNodes(obj) {
      if (obj.SubNodes.length > 0) {
        let children = [];
        for (let i = 0; i < obj.SubNodes.length; i++) {
          children.push(getNodes(obj.SubNodes[i]))
        }
        return { label: obj.Value.Name, expanded: true, id: obj.Id, children: children }
      }
      return { label: obj.Value.Name, id: obj.Id }
    }

    setData(prevState => ([...prevState, getNodes(OrgStructure)]))

    return () => {
      setData([])
    }
  }, [])


  return (
    <div className="card overflow-x-auto">
      {data.length && <OrganizationChart value={data}></OrganizationChart>}
    </div>
  )
}

export default App
