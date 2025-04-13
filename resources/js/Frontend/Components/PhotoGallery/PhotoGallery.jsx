import ModalImage from "react-modal-image";

export default function PhotoGallery({sections_data}){
    const gallery = sections_data.gallery;
    return(
        <div className="cs-grid_gallery_5 cs-lightgallery">
            {gallery?.map((item, index) => (
                <div className="cs-grid_gallery_item" key={index}>
                    <div className="cs-portfolio cs-style1 cs-lightbox_item cs-type2 rounded-0">
                        <div className="cs-portfolio_hover" />
                        <span className="cs-plus" />
                        <div
                            className="cs-portfolio_bg cs-bg"
                            style={{ backgroundImage: `url("${item}")` }}
                        >
                            <ModalImage small={item} large={item} alt="Gallery" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
