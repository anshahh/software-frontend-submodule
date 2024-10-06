import { VStack, Text, Center } from "@chakra-ui/react";
import { PreferenceForm } from './MajorPreferenceForm'
// import { NavBar } from "../../components/NavBar";

//major project guide allocation page
export const MajorAllocation = () => {
    return (
        <>
            <VStack w={'100vw'} h={'100vh'}>
                {/* <NavBar /> */}
                <PreferenceForm />
            </VStack>
        </>
    );
}
