import { IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { showAlert } from "@/Admin/Utils/SweetAlert.js";
import { router } from "@inertiajs/react";

export default function DeleteButton({ href }) {
    const handleDelete = () => {
        showAlert(
            "Are you sure?",
            "You want to delete this post?",
            "Delete" + "!",
            () => {
                router.delete(href);
            }
        );
    };
    return (
        <a
            href="#"
            onClick={() => handleDelete()}
            className="badge badge-danger"
        >
            <IonIcon
                icon={trashOutline}
                style={{
                    height: "16px",
                    width: "16px",
                }}
            />
        </a>
    );
}
