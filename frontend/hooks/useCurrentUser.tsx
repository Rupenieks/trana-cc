import { useState, useEffect } from "react";
import authService from "../services/auth.service";

export function useCurrentUser() {
    const [notes, setNotes] = useState([]);
    const [id, setId] = useState();
    const [email, setEmail] = useState();
    const [user, setUser] = useState();
  
    useEffect(() => {
    const user : any = authService.getCurrentUser();

    setUser(user);
      return;
    }, [])

    useEffect(() => {
        if (user !== undefined) {
            //@ts-ignore
            setNotes(user.data.notes);
            //@ts-ignore
            setId(user.data._id);
            //@ts-ignore
            setEmail(user.data.email);
        }
          return;
        }, [user]);

    return {notes, id, email}
};