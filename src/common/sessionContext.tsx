import React,{useState,createContext,StatelessComponent} from "react"

export interface SessionContextProps{
  login: string;
  updateLogin: (value:string) => void;
}

export const createDefaultUser = ():SessionContextProps=>({
  login: "no user",
  updateLogin: value=>{
    console.warn(
      "if you are reading this, likely you forgot to add the provider on top of your app"
    );
  }
});

export const SessionContext = createContext(createDefaultUser());

export const SessionProvider: StatelessComponent = props => {
  const [login, setLogin] = useState<string>("");

  return(
    <SessionContext.Provider value={{login, updateLogin:setLogin}}>
      {props.children}
    </SessionContext.Provider>
  );
};
