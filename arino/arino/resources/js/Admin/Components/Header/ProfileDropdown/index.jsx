import { useEffect, useRef, useState } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import { showAlert } from "@/Admin/Utils/SweetAlert.js";
import gravatarUrl from "gravatar-url";
import { IonIcon } from "@ionic/react";
import { personCircle, linkOutline} from "ionicons/icons";

export default function ProfileDropdown() {
    const [isCollapse, setIsCollapse] = useState(false);
    const { props } = usePage();
    const outsideClickDetectorRef = useRef(null);

    // handle dropdown
    const handleDropdown = () => {
        setIsCollapse(!isCollapse);
    };

    // Hide on outside click
    const hideOnClickOutside = (e) => {
        if (
            outsideClickDetectorRef.current &&
            !outsideClickDetectorRef.current.contains(e.target)
        ) {
            setIsCollapse(false);
        }
    };

    // handle logout
    const handleLogout = () => {
        showAlert(
            "Are you sure?",
            "You want to logout this session?",
            "Logout!",
            () => {
                router.post(route("logout"));
            }
        );
    };

    useEffect(() => {
        // event listeners
        document.addEventListener("click", hideOnClickOutside, true);
    }, []);

    return (
        <div
            className={`yoo-toggle-body yoo-profile-nav yoo-style1 ${
                isCollapse && "active"
            }`}
            onClick={() => handleDropdown()}
        >
            <div className="yoo-toggle-btn yoo-profile-nav-btn">
                <div className="yoo-profile-nav-text">
                    <span>Welcome,</span>
                    <h4>{props.auth.user.name}</h4>
                </div>
                <div className="yoo-profile-nav-img">
                    <img
                        src={gravatarUrl(props.auth.user.email)}
                        alt="profile"
                    />
                </div>
            </div>
            <ul
                className={`yoo-dropdown yoo-style1 ${isCollapse && "active"}`}
                ref={outsideClickDetectorRef}
            >
                <li>
                    <a href="/" target="_blank">
                        <IonIcon
                            icon={linkOutline}
                            style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "6px",
                            }}
                        />
                        Visit Site
                    </a>
                </li>
                <li>
                    <Link href={route("admin.profile")}>
                        <IonIcon
                            icon={personCircle}
                            style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "6px",
                            }}
                        />
                        My Profile
                    </Link>
                </li>
                <li className="yoo-dropdown-cta">
                    <a href="#" onClick={handleLogout}>
                        Sign Out
                    </a>
                </li>
            </ul>
        </div>
    );
}
