import { Button } from "../../components/ui/button"
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import { IoEyeOutline } from "react-icons/io5";
import { IconButton } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useRef } from "react";

const ProfileModal = ({ user, children }) => {
    const cancelRef = useRef();

    return (
        <DialogRoot>
            {children ? (
                <span>
                    <DialogTrigger asChild>
                        <span>{children}</span>
                    </DialogTrigger>
                </span>
            ) : (
                <DialogTrigger asChild>
                    <IconButton display={{ base: "flex" }}>
                        <IoEyeOutline />
                    </IconButton>
                </DialogTrigger>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle fontSize="40px" fontFamily="Work sans" d="flex" justifyContent="center">
                        {user.name}
                    </DialogTitle>
                </DialogHeader>
                <DialogBody d="flex" flexDir="column" alignItems="center" justifyContent="space-between">
                    <Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans">
                        Email: {user.email}
                    </Text>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button ref={cancelRef}>
                            Close
                        </Button>
                    </DialogActionTrigger>
                </DialogFooter>
                
            </DialogContent>
        </DialogRoot>
    );
};

export default ProfileModal;
