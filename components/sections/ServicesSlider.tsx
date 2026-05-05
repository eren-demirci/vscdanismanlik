import { SectionProps } from "@/types/sectionProps";
import { getAllServices } from "@/lib/services";
import ServicesSliderClient from "./ServicesSliderClient";

const ServicesSlider = async ({
    data,
    pagination 
}: {
    data: SectionProps;
    pagination: boolean;
}) => {
    const serviceList = await getAllServices();
    return <ServicesSliderClient data={data} pagination={pagination} serviceList={serviceList} />;
}

export default ServicesSlider;
