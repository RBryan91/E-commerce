import { HydraAdmin, ResourceGuesser } from "@api-platform/admin";
import { Link } from "react-router-dom";
import './admin.css'

function AdminPannel() {
    return (
        <div>
        <Link className="btn-back-admin" to={"/"}>Retour</Link>
        <HydraAdmin basename="/admin" entrypoint="http://localhost:8000/api">
            <ResourceGuesser name={"articles"} />
            <ResourceGuesser name={"users"} />
            <ResourceGuesser name={"categories"} />
            <ResourceGuesser name={"pays"} />
            <ResourceGuesser name={"poids"} />
            <ResourceGuesser name={"sizes"} />
            <ResourceGuesser name={"livraisons"} />
            <ResourceGuesser name={"stocks"} />
            <ResourceGuesser name={"comments"} />
            <ResourceGuesser name={"commandes"} />
            <ResourceGuesser name={"commande_articles"} />
        </HydraAdmin>
        </div>
    )
}
export default AdminPannel;