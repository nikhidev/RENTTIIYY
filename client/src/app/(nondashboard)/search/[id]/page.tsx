"use client"
import { useGetAuthUserQuery } from "@/state/api";
import { useParams } from "next/navigation"
import {useState} from "react"
import ImagePreviews from "./ImagePreviews";
import PropertyOverview from "./PropertyOverview";
import ContactWidget from "./ContactWidget";
import ApplicationModal from "./ApplicationModal";
import PropertyDetails from "./PropertyDetails";
import Propertylocation from "./Propertylocation";
const SingleListing = () =>{
    const {id} = useParams();
    const propertyId = Number(id);
    const[isModelOpen,setIdModalOpen] = useState(false);
    const {data:authUser} = useGetAuthUserQuery();

    return (
        <div>
            <ImagePreviews
            images={["/singlelisting-2.jpg","/singlelisting-3.jpg"]}/>
            <div className="flex flex-col md;flex flex-row justify-center gap-10 mx-10 md:w-2/3 md:mx-auto mt-16 mb-8">
            <div className="order-2 md:order-1">
                <PropertyOverview
                propertyId={propertyId}/>
                <PropertyDetails
                propertyId={propertyId}/>
                <Propertylocation
                propertyId={propertyId}/>

            </div>
            <div className="order-1 md:order-2">
                <ContactWidget onOpenModal={()=>setIdModalOpen(true)}/>
            </div>
            </div>
            {authUser && (
                <ApplicationModal
                isOpen={isModelOpen}
                onClose={()=>setIdModalOpen(false)}
                propertyId={propertyId}/>
            )}
        </div>
    )
}
export default SingleListing;