import { createContext, useState } from "react";
const UIContext = createContext<any>(null);

const UiProvider = ({ children }: any) => {
  const [sidebar, setSidebar] = useState(false);
  const [crud, setCrud] = useState(false);
  
  return (
    <UIContext.Provider value={{ sidebar, setSidebar, crud, setCrud}} >
      {children}
    </UIContext.Provider>
  );
};

export { UiProvider };
export default UIContext;
