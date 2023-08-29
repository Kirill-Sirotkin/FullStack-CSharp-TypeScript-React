import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import User from "../types/User"
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons"

interface Props { 
    user: User, 
    updateFunction: (id: string) => void,
    deleteFunction: (id: string) => void,
    itemId: string
 }
const AdminButtons = (props: Props) => {
    if (props.user.role === 0) return (
        <div style={{backgroundColor: "inherit", margin:"5px 0 0 225px"}}>
        <FontAwesomeIcon icon={faPenToSquare} className="button-highlight" 
            style={{
            color: "#c2c2c2", 
            backgroundColor: "inherit",
            width: "25px",
            height: "25px",
            }} 
            onClick={() => props.updateFunction(props.itemId)} />
        <FontAwesomeIcon icon={faXmark} className="button-highlight" 
            style={{
            color: "#c44f4f", 
            backgroundColor: "inherit",
            width: "25px",
            height: "25px",
            }} 
            onClick={() => props.deleteFunction(props.itemId)} />
        </div>
    )

    return (null)
    }
export default AdminButtons;