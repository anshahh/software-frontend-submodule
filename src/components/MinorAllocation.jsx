import { Center, VStack } from "@chakra-ui/react";
import { PreferenceForm } from './MinorPreferenceForm'
// import { NavBar } from "../../components/NavBar";

//minor project guide allocation page
export const MinorAllocation = () => {
    return (
        <>
            <VStack w={'100vw'} h={'100vh'}>
                {/* <NavBar /> */}
                <PreferenceForm />
            </VStack>
        </>
    );
}
