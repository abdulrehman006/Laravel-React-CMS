import MovingText from "@/Frontend/Components/MovingText/index.jsx";
export default function MovingTextSection({sections_data}){
    const movingText = sections_data.moving_text_section;
    const layout = movingText.layout ?? "1";
    return(
        <>
            {layout === "1" ? (
                <MovingText text={movingText.text}/>
            ) : (
                <MovingText text={movingText.text} variant="cs-type2"/>
            )}
        </>
    )
}
