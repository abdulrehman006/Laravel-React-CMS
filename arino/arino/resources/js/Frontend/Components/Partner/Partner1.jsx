import Div from "@/Frontend/Components/Div";
import LogoList from "@/Frontend/Components/LogoList";

export default function Partner1({partner_data}) {
    return (
        <>
            <Div className="container">
                <LogoList partner_data={partner_data} />
            </Div>
        </>
    );
}
