import { BannerWithSliderData } from '@/data/sections/bannerWithSliderData';
import { ImageText2Data } from '@/data/sections/imageText2Data';
import { OurServicesDataAccordion } from '@/data/sections/ourServicesDataAccordion';
import { WhyChooseUsGridData } from '@/data/sections/whyChooseUsGridData';
import { FaqData } from '@/data/sections/faqData';
import { FeaturedDuyurularData, FeaturedHaberlerData } from '@/data/sections/featuredBlogData';

import BannerWithSlider from "@/components/sections/BannerWithSlider";
import ImageText2 from '@/components/sections/ImageText2';
import OurServicesAccordion from '@/components/sections/OurServicesAccordion';
import WhyChooseUsGrid from '@/components/sections/WhyChooseUsGrid';
import Faq from '@/components/sections/Faq';
import FeaturedBlog from '@/components/sections/FeaturedBlog';


const Home = () => {
  return (
    <>
      <BannerWithSlider data={BannerWithSliderData} />
      <ImageText2 data={ImageText2Data} />
      <OurServicesAccordion data={OurServicesDataAccordion} />
      <WhyChooseUsGrid data={WhyChooseUsGridData} />
      <Faq data={FaqData} />
      <FeaturedBlog data={FeaturedDuyurularData} mode="duyurular" />
      <FeaturedBlog data={FeaturedHaberlerData} mode="haberler" />
    </>
  );
}

export default Home;
