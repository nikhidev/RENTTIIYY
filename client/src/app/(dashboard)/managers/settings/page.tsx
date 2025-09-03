"use client"
import SettingForm from "@/components/SettingForm";
import { useGetAuthUserQuery,useUpdateManagerSettingsMutation } from "@/state/api";

const ManagerSettings = () =>{
    const{data:authUser,isLoading} = useGetAuthUserQuery();
    const [updateTenantSettings] = useUpdateManagerSettingsMutation();

    if(isLoading) {
        return <div>Loading...</div>;
    }
  console.log("authUser",authUser)


  const initialData = {
    name: authUser?.cognitoInfo.username ,
    email: authUser?.userInfo.email,
    phoneNumber: authUser?.userInfo.phoneNumber,
  };


    const handleSubmit = async (data: typeof initialData) => {
        await updateTenantSettings({
            cognitoId: authUser?.cognitoInfo.userId,
            ...data,
        })
    }
return (
    <SettingForm
    initialData={initialData}
    onSubmit={handleSubmit}
    userType="manager"/>
)

}
export default ManagerSettings;