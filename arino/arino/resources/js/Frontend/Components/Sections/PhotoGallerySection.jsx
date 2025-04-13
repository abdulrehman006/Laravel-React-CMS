import PhotoGallery from "@/Frontend/Components/PhotoGallery/PhotoGallery";

export default function PhotoGallerySection({sections_data}){
    const sectionData = sections_data.photo_gallery_section ?? {};
    return(
        <PhotoGallery sections_data={sectionData} />
    )
}
