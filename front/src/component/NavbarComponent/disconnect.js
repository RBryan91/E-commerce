import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Disconnect() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        localStorage.removeItem('id_panier');
        navigate('/')
    })
}